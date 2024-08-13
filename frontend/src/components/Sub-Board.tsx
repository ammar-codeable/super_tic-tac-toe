import calculateResult from "../utils/calculateResult";
import Square from "./Square";

function SubBoard({ subBoardState, boardId, onPlay, playerTurn }) {
	function handleSquareClick(cellId: number, boardId: number) {
		const nextSquares = subBoardState.slice();
		nextSquares[cellId] = playerTurn;
		onPlay(nextSquares, boardId);
	}

	let result = calculateResult(subBoardState);
	let status;
	if (result === "X") {
		status = "Player X wins!";
	} else if (result === "O") {
		status = "Player O wins!";
	} else if (result === "Tie") {
		status = "It's a tie!";
	}

	return (
		<div>
			<div className="grid size-48 grid-cols-3 gap-1">
				{Array(9)
					.fill(null)
					.map((_, i) => (
						<Square
							key={i}
							value={subBoardState[i]}
							onSquareClick={
								subBoardState[i]
									? () => {
											console.log("Square already filled");
										}
									: handleSquareClick
							}
							cellId={i}
							boardId={boardId}
						/>
					))}
			</div>
			<div>{status}</div>
		</div>
	);
}

export default SubBoard;
