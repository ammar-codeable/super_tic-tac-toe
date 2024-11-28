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
	findGameByPlayer,
	getPlayersByGame,
	handleResign,
	removeGame,
	updateGameState,
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

		const game = createNewGame(player1Socket, player2Socket);
		addGame(game);

		// Notify both players that the game is starting
		player1Socket.send(JSON.stringify({ type: "waiting", waiting: false }));
		player2Socket.send(JSON.stringify({ type: "waiting", waiting: false }));
	}

	ws.on("message", (data) => {
		const message = validateMessage(data.toString(), ClientMessageSchema);

		const game = findGameByPlayer(ws);
		if (!game) {
			ws.send(
				JSON.stringify({
					type: "error",
					error: "Waiting for an opponent to connect.",
				})
			);
			return;
		}

		const [currentPlayer, opponent] = getPlayersByGame(game, ws);
		if (!currentPlayer || !opponent) return;

		if (
			["move", "resign", "chat"].includes(message.type) &&
			!currentPlayer.mark
		) {
			currentPlayer.socket.send(
				JSON.stringify({ type: "error", error: "Player not initialized." })
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
				const [boardId, cellId] = message.move;
				const result = updateGameState(game, boardId, cellId);

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
				const resignResult = handleResign(game, ws);

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
				addMessage(game, chatMessage);
				opponent.socket.send(
					JSON.stringify({ type: "chat", chat: [chatMessage] })
				);
				break;

			case "draw-offer":
				switch (message.action) {
					case "offer":
						opponent.socket.send(
							JSON.stringify({ type: "draw-offer" })
						);
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
		}
	});

	ws.on("close", () => {
		const index = pendingPlayers.indexOf(ws);
		if (index !== -1) {
			pendingPlayers.splice(index, 1);
		}

		const game = findGameByPlayer(ws);
		if (game) {
			const [_, opponent] = getPlayersByGame(game, ws);

			removeGame(game.gameId);

			if (opponent) {
				opponent.socket.close();
			}
		}
	});
});
