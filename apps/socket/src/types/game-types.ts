import ws from "ws";

export type Player = {
    mark?: "X" | "O";
	socket?: ws;
};

export type Game = {
	players: { player1: Player; player2: Player };
	gameId: number;
	moveHistory: number[][];
	currentMove: number;
	mainBoardState: (string | null)[][];
	reducedMainBoardState: (string | null)[];
    result: GameResult;
};

export type GameResult = "X" | "O" | "DRAW" | "X_RESIGNED" | "O_RESIGNED" | null;
