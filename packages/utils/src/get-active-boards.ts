function getActiveBoards(
	isGameOver: boolean,
	reducedMainBoardState: (string | null)[],
	moveHistory: number[][],
	currentMove: number,
	isCurrentPlayerTurn?: boolean
) {
	if (isGameOver || isCurrentPlayerTurn === false) {
		return null;
	}
	
	const lastClickedCellId = moveHistory[currentMove][1];

	if (currentMove === 0 || reducedMainBoardState[lastClickedCellId]) {
		return [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) =>
			reducedMainBoardState[i] ? null : i
		);
	}
	return [lastClickedCellId];
}

export default getActiveBoards;
