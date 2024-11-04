import calculateResult from "@repo/utils/calculate-result";
import express from "express";
import { WebSocketServer } from "ws";
import { Game } from "./types/game-state";

const app = express();
const port = 8080;

const httpServer = app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

const wss = new WebSocketServer({ server: httpServer });

const gameManager: Game[] = [];

wss.on("connection", (ws) => {
	let waiting = false;

	if (
		gameManager.length === 0 ||
		(gameManager[gameManager.length - 1].players.player1.socket !== undefined &&
			gameManager[gameManager.length - 1].players.player2.socket !== undefined)
	) {
		gameManager.push(new Game(ws, gameManager.length));
		waiting = true;

		ws.send(JSON.stringify({ waiting: true }));
	} else {
		gameManager[gameManager.length - 1].players.player2.socket = ws;

		ws.send(JSON.stringify({ waiting: false }));
		gameManager[gameManager.length - 1].players.player1.socket!.send(
			JSON.stringify({ waiting: false })
		);
	}

	ws.on("message", (data) => {
		const game = Game.getGame(gameManager, ws);
		const [currentPlayer, opponent] = game!.getPlayers(ws);

		const message = JSON.parse(data.toString());

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

			if (game === undefined) {
				return;
			}

			game.moveHistory = [
				...game.moveHistory.slice(0, game.currentMove + 1),
				[boardId, cellId],
			];

			game.currentMove++;

			game.mainBoardState[boardId][cellId] =
				game.currentMove % 2 === 0 ? "X" : "O";

			game.reducedMainBoardState = game.mainBoardState.map(calculateResult);

			game.result = calculateResult(game.reducedMainBoardState);
			const result = game.result;

			opponent.socket!.send(
				JSON.stringify({
					game,
				})
			);

			if (game.result) {
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
	});

	ws.on("close", () => {
		const game = Game.getGame(gameManager, ws);
		if (!game) {
			return;
		}

		const opponent = game.getPlayers(ws)[1];
		gameManager.splice(game.gameId, 1);

		if (!opponent.socket) {
			return;
		}
		opponent.socket!.close();
	});
});

function assignMark(
	currentPlayer: Player,
	opponent: Player,
	requestedMark: string
) {
	if (!opponent.mark) {
		currentPlayer.mark = requestedMark;
		return;
	}

	if (opponent.mark === requestedMark) {
		currentPlayer.mark = Math.random() > 0.5 ? "X" : "O";
		opponent.mark = currentPlayer.mark === "X" ? "O" : "X";
		return;
	}

	if (opponent.mark !== requestedMark) {
		currentPlayer.mark = requestedMark;
		opponent.mark = currentPlayer.mark === "X" ? "O" : "X";
	}
}
