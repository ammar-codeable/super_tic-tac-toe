import calculateResult from "@repo/utils/calculate-result";
import ws from "ws";
import { Game, Player, GameResult } from "../types/game-types";

const games: Game[] = [];

function addGame(player: ws) {
	const game: Game = {
		gameId: games.length,
		players: {
			player1: { mark: undefined, socket: player },
			player2: { mark: undefined, socket: undefined },
		},
		moveHistory: [[-1, -1]],
		currentMove: 0,
		mainBoardState: Array(9)
			.fill(null)
			.map(() => Array(9).fill(null)),
		reducedMainBoardState: Array(9).fill(null),
		result: null,
	};
	games.push(game);
}

function removeGame(gameId: number) {
	const index = games.findIndex((game) => game.gameId === gameId);
	if (index !== -1) games.splice(index, 1);
}

function hasAvailableGame(): boolean {
	const current = getCurrentGame();
	return Boolean(
		current?.players.player1.socket && !current?.players.player2.socket
	);
}

function getCurrentGame(): Game | undefined {
	return games[games.length - 1];
}

function findGameByPlayer(player: ws): Game | undefined {
	return games.find(
		(game) =>
			game.players.player1.socket === player ||
			game.players.player2.socket === player
	);
}

function getPlayersByGame(game: Game, currentPlayer: ws): [Player, Player] {
	return game.players.player1.socket === currentPlayer
		? [game.players.player1, game.players.player2]
		: [game.players.player2, game.players.player1];
}

function updateGameState(game: Game, boardId: number, cellId: number) {
	game.moveHistory = [
		...game.moveHistory.slice(0, game.currentMove + 1),
		[boardId, cellId],
	];

	game.currentMove++;

	game.mainBoardState[boardId][cellId] = game.currentMove % 2 === 0 ? "X" : "O";

	game.reducedMainBoardState = game.mainBoardState.map(calculateResult);
	game.result = calculateResult(game.reducedMainBoardState);

	return game.result;
}

function handleResign(game: Game, resigningPlayer: ws): GameResult {
  const [player] = getPlayersByGame(game, resigningPlayer);
  return player.mark === "X" ? "X_RESIGNED" : "O_RESIGNED";
}

export {
	addGame,
	findGameByPlayer,
	games,
	getCurrentGame,
	getPlayersByGame,
	hasAvailableGame,
	removeGame,
	updateGameState,
	handleResign
};

