import ws from "ws";

export type Game = {
	players: string[];
	socket: ws[];
	roomId: number;
	mainBoardState: string[][];
};
