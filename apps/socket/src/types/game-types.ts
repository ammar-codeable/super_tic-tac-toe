import { WebSocket } from "ws";
import { Mark } from "@super-tic-tac-toe/types/client-message-schemas";

export type Player = {
  mark?: Mark;
  socket: WebSocket;
};

export type Game = {
  players: { player1: Player; player2: Player };
  moveHistory: [number, number][];
  currentMove: number;
  mainBoardState: (Mark | null)[][];
  reducedMainBoardState: (Mark | "DRAW" | null)[];
  result: GameResult;
};

export type GameResult =
  | "X"
  | "O"
  | "DRAW"
  | "X_RESIGNED"
  | "O_RESIGNED"
  | null;
