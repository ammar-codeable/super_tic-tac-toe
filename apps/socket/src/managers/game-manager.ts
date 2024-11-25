import { ChatMessage } from "@repo/types/chat-schemas";
import calculateResult from "@repo/utils/calculate-result";
import ws from "ws";
import { Game, GameResult, Player } from "../types/game-types";

const games: Game[] = [];

function createNewGame(player1Socket: ws, player2Socket: ws): Game {
	return {
		gameId: games.length,
		players: {
			player1: { mark: undefined, socket: player1Socket },
			player2: { mark: undefined, socket: player2Socket },
		},
		moveHistory: [[-1, -1]],
		currentMove: 0,
		mainBoardState: Array(9)
			.fill(null)
			.map(() => Array(9).fill(null)),
		reducedMainBoardState: Array(9).fill(null),
		result: null,
		messages: [],
	};
}

function addGame(game: Game) {
	games.push(game);
}

function removeGame(gameId: number) {
	const index = games.findIndex((game) => game.gameId === gameId);
	if (index !== -1) games.splice(index, 1);
}

function findGameByPlayer(player: ws): Game | undefined {
	return games.find(
		(game) =>
			game.players.player1.socket === player ||
			game.players.player2?.socket === player
	);
}

function getPlayersByGame(
	game: Game,
	currentPlayer: ws
): [Player | undefined, Player | undefined] {
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
	return player!.mark === "X" ? "X_RESIGNED" : "O_RESIGNED";
}

function addMessage(game: Game, message: ChatMessage) {
	game.messages.push(message);
}

export {
	addGame,
	addMessage,
	findGameByPlayer,
	games,
	getPlayersByGame,
	handleResign,
	removeGame,
	updateGameState,
	createNewGame,
};
