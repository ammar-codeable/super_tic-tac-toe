import ws from "ws";

export type Player = {
	mark?: string;
	socket?: ws;
};

export type Game = {
	players: { player1: Player; player2: Player };
	gameId: number;
	moveHistory: number[][];
	currentMove: number;
	mainBoardState: (string | null)[][];
	reducedMainBoardState: (string | null)[];
	result: string | null;
};
