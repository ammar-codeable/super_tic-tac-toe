import calculateResult from "../utils/calculateResult";
import SubBoard from "./Sub-Board";

function MainBoard({ playerTurn, mainBoardState, onPlay }) {
	const reducedMainBoardState = mainBoardState.map((subBoard) => {
		return calculateResult(subBoard);
	});

	let result = calculateResult(reducedMainBoardState);
	let status;
	if (result === "X") {
		status = "Player X wins!";
	} else if (result === "O") {
		status = "Player O wins!";
	} else if (result === "Tie") {
		status = "It's a tie!";
	} else {
		status = `Player ${playerTurn}'s turn`;
	}

	return (
		<div>
			<div className="grid grid-cols-3 gap-12">
				{Array(9)
					.fill(null)
					.map((_, i) => (
						<SubBoard
							key={i}
							subBoardState={mainBoardState[i]}
							boardId={i}
							onPlay={onPlay}
							playerTurn={playerTurn}
						/>
					))}
			</div>
			<div>{status}</div>
		</div>
	);
}

export default MainBoard;
