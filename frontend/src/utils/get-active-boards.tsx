function getActiveBoards(
	result: string | null,
	reducedMainBoardState: (string | null)[],
	moveHistory: number[][],
	currentMove: number,
	player: string | null,
	currentPlayerTurn: string,
	online: boolean | null,
): number | null {
	let ActiveBoard;
	if (
		result ||
		(player !== currentPlayerTurn && online) ||
		online === null
	) {
		return null;
	}
	if (currentMove === 0 || reducedMainBoardState[moveHistory[currentMove][1]]) {
		return -1;
	}

	const [_, cellId] = moveHistory[currentMove];
	ActiveBoard = cellId;

	return ActiveBoard;
}

export default getActiveBoards;
