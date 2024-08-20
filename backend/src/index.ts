import express from "express";
import { WebSocket, WebSocketServer } from "ws";
import { Game } from "./types/game.js";

// TODO: Organize all backend code into separate files
// TODO: Implement game logic on the server
// TODO: Make sure client doesn't lose state on refresh
// TODO: Fix the bug where the mainBoardStateHistory and currentMove are updated incorrectly after opponent's move
// TODO: Move all state logic to server

const app = express();
const port = 8080;

const httpServer = app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

const wss = new WebSocketServer({ server: httpServer });

const gameManager: Game[] = [];

let waiting = false;

wss.on("connection", (ws) => {
	ws.on("error", console.error);

	if (
		gameManager.length === 0 ||
		gameManager[gameManager.length - 1].players.length === 2
	) {
		gameManager.push({
			players: [""],
			socket: [ws],
			roomId: gameManager.length,
			mainBoardState: Array(9).fill(Array(9).fill(null)),
		});
		waiting = true;
	} else if (waiting && ws !== gameManager[gameManager.length - 1].socket[0]) {
		gameManager[gameManager.length - 1].players.push("");
		gameManager[gameManager.length - 1].socket.push(ws);
		waiting = false;
	}

	ws.on("message", (data) => {
		const player = JSON.parse(data.toString()).player;

		let currentPlayer: WebSocket = ws;
		let opponent: WebSocket = ws;
		gameManager.forEach((game) => {
			if (
				game.socket.includes(currentPlayer) &&
				game.socket.includes(opponent)
			) {
				opponent = game.socket.find((client) => client !== ws);
			}
		});

		if (JSON.parse(data.toString()).player) {
			gameManager.forEach((game) => {
				if (game.socket.includes(ws)) {
					game.players[game.socket.indexOf(currentPlayer)] = player;
					game.players[game.socket.indexOf(opponent)] =
						player === "X" ? "O" : "X";
				}
			});
			return;
		}

		if (
			JSON.parse(data.toString()).boardId &&
			JSON.parse(data.toString()).cellId
		) {
			const boardId = JSON.parse(data.toString()).boardId;
			const cellId = JSON.parse(data.toString()).cellId;

			gameManager.forEach((game) => {
				if (game.socket.includes(currentPlayer)) {
					game.mainBoardState[boardId][cellId] = player;
					opponent.send(game.mainBoardState);
				}
			});
		}
	});
	console.log(gameManager);
});
