import calculateResult from "@super-tic-tac-toe/utils/calculate-result";
import { v4 as uuidv4 } from "uuid";
import { WebSocket } from "ws";
import { Game, GameResult, Player } from "../types/game-types";

const games: Record<string, Game> = {};

function createNewGame(
  player1Socket: WebSocket,
  player2Socket: WebSocket,
): [string, Game] {
  const gameId = uuidv4();
  const game: Game = {
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
  };
  return [gameId, game];
}

function addGame(gameId: string, game: Game) {
  games[gameId] = game;
}

function removeGame(gameId: string) {
  delete games[gameId];
}

function getGame(gameId: string): Game | undefined {
  return games[gameId];
}

function getPlayerInGame(
  gameId: string,
  socket: WebSocket,
): Player | undefined {
  const game = getGame(gameId);
  if (!game) return undefined;
  return Object.values(game.players).find((player) => player.socket === socket);
}

function getOpponent(gameId: string, socket: WebSocket): Player | undefined {
  const game = getGame(gameId);
  if (!game) return undefined;
  return Object.values(game.players).find((player) => player.socket !== socket);
}

function updateGameState(
  gameId: string,
  boardId: number,
  cellId: number,
): GameResult | null {
  const game = getGame(gameId);
  if (!game) return null;

  game.moveHistory = [
    ...game.moveHistory.slice(0, game.currentMove + 1),
    [boardId, cellId],
  ];

  game.currentMove++;

  game.mainBoardState[boardId][cellId] = game.currentMove % 2 === 0 ? "O" : "X";

  game.reducedMainBoardState = game.mainBoardState.map(calculateResult);
  game.result = calculateResult(game.reducedMainBoardState);

  return game.result;
}

function handleResign(
  gameId: string,
  resigningSocket: WebSocket,
): GameResult | null {
  const game = getGame(gameId);
  const player = getPlayerInGame(gameId, resigningSocket);
  if (!game || !player) return null;

  const result = player.mark === "X" ? "X_RESIGNED" : "O_RESIGNED";
  game.result = result;
  return result;
}

function resetGame(gameId: string) {
  const game = getGame(gameId);
  if (!game) return;

  game.moveHistory = [[-1, -1]];
  game.currentMove = 0;
  game.mainBoardState = Array(9)
    .fill(null)
    .map(() => Array(9).fill(null));
  game.reducedMainBoardState = Array(9).fill(null);
  game.result = null;
}

function swapPlayerMarks(gameId: string) {
  const game = getGame(gameId);
  if (!game) return;

  const { player1, player2 } = game.players;
  [player1.mark, player2.mark] = [player2.mark, player1.mark];
}

function findPlayerGame(socket: WebSocket): [string, Game] | undefined {
  for (const [gameId, game] of Object.entries(games)) {
    if (Object.values(game.players).some((p) => p.socket === socket)) {
      return [gameId, game];
    }
  }
  return undefined;
}

export {
  addGame,
  createNewGame,
  findPlayerGame,
  getGame,
  getOpponent,
  getPlayerInGame,
  handleResign,
  removeGame,
  resetGame,
  swapPlayerMarks,
  updateGameState,
};
