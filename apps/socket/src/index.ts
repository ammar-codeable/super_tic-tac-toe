import express from "express";
import { WebSocketServer } from "ws";
import {
	addGame,
	findGameByPlayer,
	getCurrentGame,
	getPlayersByGame,
	hasAvailableGame,
	removeGame,
	updateGameState,
	handleResign,
} from "./managers/game-manager";
import { assignMark } from "./utils/assign-mark";

const app = express();
const port = 8080;

const httpServer = app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", (ws) => {
	if (hasAvailableGame()) {
		const game = getCurrentGame()!;

		game.players.player2.socket = ws;

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
	});

	ws.on("close", () => {
		const game = findGameByPlayer(ws);
		if (!game) return;

		const [_, opponent] = getPlayersByGame(game, ws);

		removeGame(game.gameId);

		if (opponent.socket) {
			opponent.socket.close();
		}
	});
});
