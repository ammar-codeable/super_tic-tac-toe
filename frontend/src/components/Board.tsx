import Square from "./Square";

function calculateResult(boardState) {
	const winConditions = [
		[3, 4, 5],
		[0, 1, 2],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	const result = winConditions.reduce((_, condition) => {
		const [a, b, c] = condition;
		if (
			boardState[a] &&
			boardState[a] === boardState[b] &&
			boardState[a] === boardState[c]
		) {
			1;
			return boardState[a];
		} else if (!boardState.includes(null)) {
			return "Tie";
		}
	}, null);

	return result;
}

function Board({ xIsNext, boardState, onPlay }) {
	function handleSquareClick(i) {
		if (calculateResult(boardState)) {
			return;
		}

		const nextSquares = boardState.slice();
		if (xIsNext) {
			nextSquares[i] = "X";
		} else {
			nextSquares[i] = "O";
		}
		onPlay(nextSquares);
	}

	const result = calculateResult(boardState);

	let status;

	if (result === "Tie") {
		status = "It's a draw....";
	} else if (result) {
		status = "Winner: " + result;
	} else {
		status = "Next player: " + (xIsNext ? "X" : "O");
	}

	return (
		<div>
			<div>{status}</div>
			{Array(9)
				.fill(null)
				.map((_, i) => (
					<Square
						key={i}
						value={boardState[i]}
						onSquareClick={() => {
							boardState[i] ? null : handleSquareClick(i);
						}}
					/>
				))}
		</div>
	);
}

export default Board;
