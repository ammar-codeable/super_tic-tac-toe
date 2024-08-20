export function resetGame(
	setMainBoardStateHistory: (mainBoardStateHistory: string[][][]) => void,
	setMoveHistory: (moveHistory: number[][]) => void,
	setCurrentMove: (currentMove: number) => void,
	setPlayer: (player: string | null) => void,
) {
	setMainBoardStateHistory([Array(9).fill(Array(9).fill(null))]);
	setMoveHistory([[-1, -1]]);
	setCurrentMove(0);
	setPlayer(null);
}
