import ws from "ws";
import { ChatMessage } from "@repo/types/chat-schemas";

export type Mark = "X" | "O";

export type Player = {
    mark?: Mark;
	socket: ws;
};

export type Game = {
	players: { player1: Player; player2: Player };
	gameId: number;
	moveHistory: number[][];
	currentMove: number;
	mainBoardState: (string | null)[][];
	reducedMainBoardState: (string | null)[];
    result: GameResult;
    messages: ChatMessage[];
};

export type GameResult = "X" | "O" | "DRAW" | "X_RESIGNED" | "O_RESIGNED" | null;
