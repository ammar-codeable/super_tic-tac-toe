function getActiveBoards(
	result: string | null,
	moveHistory: number[][],
	currentMove: number,
): number | null {
	let ActiveBoard;
	if (result) {
		return null;
	}
	if (currentMove === 0) {
		return -1;
	}

	const [_, cellId] = moveHistory[currentMove];
	ActiveBoard = cellId;

	return ActiveBoard;
}

export default getActiveBoards;
