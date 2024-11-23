import { ChatMessage } from "@repo/types/chat-types";
import { config } from "dotenv";
import express from "express";
import cors from 'cors';
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

		ws.send(JSON.stringify({ waiting: false }));
		game.players.player1.socket!.send(JSON.stringify({ waiting: false }));
	} else {
		addGame(ws);
		ws.send(JSON.stringify({ waiting: true }));
	}

	ws.on("message", (data) => {
		const message = JSON.parse(data.toString());

		const game = findGameByPlayer(ws);
		if (!game) return;

		const [currentPlayer, opponent] = getPlayersByGame(game, ws);

		if (!currentPlayer || !opponent) return;

		if (message.player) {
			assignMark(currentPlayer, opponent, message.player);

			if (currentPlayer.mark && opponent.mark) {
				currentPlayer.socket!.send(
					JSON.stringify({ mark: currentPlayer.mark })
				);
				opponent.socket!.send(JSON.stringify({ mark: opponent.mark }));
			}
		}

		if (message.move) {
			const [boardId, cellId] = message.move;
			const result = updateGameState(game, boardId, cellId);

			opponent.socket!.send(
				JSON.stringify({
					game,
				})
			);

			if (result) {
				currentPlayer.socket!.send(
					JSON.stringify({
						result,
					})
				);
				opponent.socket!.send(
					JSON.stringify({
						result,
					})
				);
			}
		}

		if (message.resign) {
			const result = handleResign(game, ws);

			currentPlayer.socket!.send(
				JSON.stringify({
					result,
				})
			);

			opponent.socket!.send(
				JSON.stringify({
					result,
				})
			);
		}

		if (message.chat) {
			const senderRole =
				currentPlayer === game.players.player1 ? "player1" : "player2";
			const chatMessage: ChatMessage = {
				text: message.chat.text,
				sender: senderRole,
			};
			addMessage(game, chatMessage);
			opponent.socket.send(JSON.stringify({ chat: [chatMessage] }));
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
