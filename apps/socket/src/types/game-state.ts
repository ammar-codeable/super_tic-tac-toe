import ws from "ws";

type Player = {
	mark?: string;
	socket?: ws;
};

class Game {
	players: { player1: Player; player2: Player };
	gameId: number;
	moveHistory: number[][];
	currentMove: number;
	mainBoardState: (string | null)[][];
	reducedMainBoardState: (string | null)[];
	result: string | null;

	constructor(currentPlayer: ws, gameId: number) {
		this.gameId = gameId;
		this.players = {
			player1: { mark: undefined, socket: currentPlayer },
			player2: { mark: undefined, socket: undefined },
		};
		this.moveHistory = [[-1, -1]];
		this.currentMove = 0;
		this.mainBoardState = Array(9)
			.fill(null)
			.map(() => Array(9).fill(null));
		this.reducedMainBoardState = Array(9).fill(null);
		this.result = null;
	}

	static getGame(gameManager: Game[], currentPlayer: ws): Game | undefined {
		return gameManager.find(
			(game) =>
				game.players.player1.socket === currentPlayer ||
				game.players.player2.socket === currentPlayer
		);
	}

	getPlayers(currentPlayer: ws): [Player, Player] {
		if (this.players.player1.socket === currentPlayer) {
			return [this.players.player1, this.players.player2];
		} else {
			return [this.players.player2, this.players.player1];
		}
	}
}

export { Game };
