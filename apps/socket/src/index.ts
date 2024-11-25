import { ChatMessage } from "@repo/types/chat-schemas";
import { validateMessage } from "@repo/utils/validate-message";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { readFileSync } from "fs";
import https from "https";
import { WebSocketServer } from "ws";
import {
	addGame,
	addMessage,
	findGameByPlayer,
	getCurrentGame,
	getPlayersByGame,
	handleResign,
	hasAvailableGame,
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

wss.on("connection", (ws) => {
	if (hasAvailableGame()) {
		const game = getCurrentGame()!;

		game.players.player2 = {
			mark: undefined,
			socket: ws,
		};

		ws.send(JSON.stringify({ type: "waiting", waiting: false }));
		game.players.player1.socket!.send(
			JSON.stringify({ type: "waiting", waiting: false })
		);
	} else {
		addGame(ws);
		ws.send(JSON.stringify({ type: "waiting", waiting: true }));
	}

	ws.on("message", (data) => {
		const message = validateMessage(data.toString(), ClientMessageSchema);

		const game = findGameByPlayer(ws);
		if (!game) return;

		const [currentPlayer, opponent] = getPlayersByGame(game, ws);
		if (!currentPlayer || !opponent) return;

		// Add check for player's mark before processing game actions
		if (["move", "resign", "chat"].includes(message.type) && !currentPlayer.mark) {
			currentPlayer.socket.send(
				JSON.stringify({ type: "error", error: "Player not initialized." })
			);
			return;
		}

		switch (message.type) {
			case "player":
				assignMark(currentPlayer, opponent, message.player);

				if (currentPlayer.mark && opponent.mark) {
					currentPlayer.socket!.send(
						JSON.stringify({ type: "mark", mark: currentPlayer.mark })
					);
					opponent.socket!.send(
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
		}
	});

	ws.on("close", () => {
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
