import { ChatMessage } from "@repo/types/chat-schemas";
import { validateMessage } from "@repo/utils/validate-message";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { readFileSync } from "fs";
import https from "https";
import ws, { WebSocketServer } from "ws";
import {
	addGame,
	addMessage,
	createNewGame,
	getGame,
	getOpponent,
	getPlayerInGame,
	handleResign,
	removeGame,
	resetGame,
	swapPlayerMarks,
	updateGameState,
	handleDisconnect,
} from "./managers/game-manager";
import { ClientMessageSchema } from "./schemas/socket-schemas";
import { assignMark } from "./utils/assign-mark";

config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;

let server;
if (process.env.NODE_ENV === "production") {
	const certPath = process.env.SSL_CERT_PATH;
	const keyPath = process.env.SSL_KEY_PATH;

	if (!certPath || !keyPath) {
		throw new Error(
			"SSL certificate paths not configured in environment variables"
		);
	}

	const httpsOptions = {
		cert: readFileSync(certPath),
		key: readFileSync(keyPath),
	};

	server = https.createServer(httpsOptions, app).listen(port);
} else {
	server = app.listen(port);
}

const wss = new WebSocketServer({ server });

app.get("/player-count", (_, res) => {
	res.json({ count: wss.clients.size });
});

const pendingPlayers: ws[] = [];

wss.on("connection", (ws) => {
	pendingPlayers.push(ws);
	ws.send(JSON.stringify({ type: "waiting", waiting: true }));

	if (pendingPlayers.length >= 2) {
		const player1Socket = pendingPlayers.shift()!;
		const player2Socket = pendingPlayers.shift()!;

		const [gameId, game] = createNewGame(player1Socket, player2Socket);
		addGame(gameId, game);

		player1Socket.send(JSON.stringify({ type: "init", gameId }));
		player2Socket.send(JSON.stringify({ type: "init", gameId }));
		player1Socket.send(JSON.stringify({ type: "waiting", waiting: false }));
		player2Socket.send(JSON.stringify({ type: "waiting", waiting: false }));
	}

	ws.on("message", (data) => {
		const message = validateMessage(data.toString(), ClientMessageSchema);
		const game = getGame(message.gameId);
		if (!game) {
			ws.send(
				JSON.stringify({
					type: "error",
					error: "Game not found",
				})
			);
			return;
		}

		const currentPlayer = getPlayerInGame(message.gameId, ws);
		const opponent = getOpponent(message.gameId, ws);

		if (!currentPlayer || !opponent) {
			ws.send(
				JSON.stringify({
					type: "error",
					error: "Player not found in game",
				})
			);
			return;
		}

		switch (message.type) {
			case "player":
				if (!game.players.player1 || !game.players.player2) {
					currentPlayer.socket.send(
						JSON.stringify({
							type: "error",
							error: "Both players must be connected before selecting a mark.",
						})
					);
					return;
				}

				assignMark(currentPlayer, opponent, message.player);

				if (currentPlayer.mark && opponent.mark) {
					currentPlayer.socket.send(
						JSON.stringify({ type: "mark", mark: currentPlayer.mark })
					);
					opponent.socket.send(
						JSON.stringify({ type: "mark", mark: opponent.mark })
					);
				}
				break;

			case "move":
				const result = updateGameState(message.gameId, ...message.move);

				opponent.socket!.send(
					JSON.stringify({
						type: "game",
						game,
					})
				);

				if (result) {
					currentPlayer.socket!.send(
						JSON.stringify({ type: "result", result })
					);
					opponent.socket!.send(JSON.stringify({ type: "result", result }));
				}
				break;

			case "resign":
				const resignResult = handleResign(message.gameId, ws);

				currentPlayer.socket!.send(
					JSON.stringify({ type: "result", result: resignResult })
				);
				opponent.socket!.send(
					JSON.stringify({ type: "result", result: resignResult })
				);
				break;

			case "chat":
				const senderRole =
					currentPlayer === game.players.player1 ? "player1" : "player2";
				const chatMessage: ChatMessage = {
					text: message.chat.text,
					sender: senderRole,
				};
				addMessage(message.gameId, chatMessage);
				opponent.socket.send(
					JSON.stringify({ type: "chat", chat: [chatMessage] })
				);
				break;

			case "draw-offer":
				switch (message.action) {
					case "offer":
						opponent.socket.send(JSON.stringify({ type: "draw-offer" }));
						break;

					case "accept":
						const result = "DRAW";
						currentPlayer.socket.send(
							JSON.stringify({ type: "result", result })
						);
						opponent.socket.send(JSON.stringify({ type: "result", result }));
						game.result = result;
						break;
				}
				break;

			case "rematch":
				if (opponent.socket.readyState !== ws.OPEN) {
					currentPlayer.socket.send(
						JSON.stringify({
							type: "error",
							error: "Opponent has disconnected",
						})
					);
					break;
				}

				switch (message.action) {
					case "request":
						opponent.socket.send(JSON.stringify({ type: "rematch-request" }));
						break;

					case "accept": {
						resetGame(message.gameId);
						swapPlayerMarks(message.gameId);

						[currentPlayer, opponent].forEach((player) => {
							player.socket.send(JSON.stringify({ type: "rematch-accepted" }));
						});
						break;
					}

					case "decline":
						opponent.socket.send(JSON.stringify({ type: "rematch-declined" }));
						break;
				}
				break;
		}
	});

	ws.on("close", () => {
		const index = pendingPlayers.indexOf(ws);
		if (index !== -1) {
			pendingPlayers.splice(index, 1);
		}

		const opponentSocket = handleDisconnect(ws);
		if (opponentSocket) {
			opponentSocket.close();
		}
	});
});
