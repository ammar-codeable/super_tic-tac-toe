function resetGame(
	setMoveHistory: (moveHistory: number[][]) => void,
	setCurrentMove: (currentMove: number) => void,
) {
	setMoveHistory([[-1, -1]]);
	setCurrentMove(0);
}

export default resetGame;