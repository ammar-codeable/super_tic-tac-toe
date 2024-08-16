function calculateResult(boardState) {
	const winConditions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	const result = winConditions.map((condition) => {
		const [a, b, c] = condition;
		if (
			boardState[a] &&
			boardState[a] === boardState[b] &&
			boardState[a] === boardState[c]
		) {
			return boardState[a];
		}
	});

	if (result.includes("X")) {
		return "X";
	}
	if (result.includes("O")) {
		return "O";
	}
	if (!boardState.includes(null) && !boardState.includes(undefined)) {
		return "Tie";
	}
}

export default calculateResult;