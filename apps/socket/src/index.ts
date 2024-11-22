import { config } from "dotenv";
import { readFileSync } from "fs";
import http from "http";
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

	server = https.createServer({
		cert: readFileSync(certPath),
		key: readFileSync(keyPath),
	});
} else {
	server = http.createServer();
}

const wss = new WebSocketServer({ server });

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
			console.log(message.chat);
			addMessage(game, message.chat);

			opponent.socket.send(JSON.stringify({ chat: game.messages }));
		}
	});
	
	ws.on("close", () => {
		const game = findGameByPlayer(ws);
		if (!game) return;
		
		const [_, opponent] = getPlayersByGame(game, ws);
		
		removeGame(game.gameId);

		if (opponent) {
			opponent.socket.close();
		}
	});
});

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

