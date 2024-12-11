import ws from "ws";
import { ChatMessage } from "@repo/types/chat-schemas";
import { Mark } from "../schemas/socket-schemas";

export type Player = {
    mark?: Mark;
	socket: ws;
};

export type Game = {
    players: { player1: Player; player2: Player };
    moveHistory: number[][];
    currentMove: number;
    mainBoardState: (Mark | null)[][];
    reducedMainBoardState: (Mark | null)[];
    result: GameResult;
    messages: ChatMessage[];
};

export type GameResult = "X" | "O" | "DRAW" | "X_RESIGNED" | "O_RESIGNED" | null;
