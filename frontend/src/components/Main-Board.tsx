import { useRef } from "react";
import SubBoard from "./Sub-Board";

function MainBoard({
	currentPlayer,
	reducedMainBoardState,
	mainBoardState,
	onPlay,
	result,
}) {
	let nextActiveBoard = useRef(-1);
	function handlePlay(nextSquares, boardId: number, cellId: number) {
		nextActiveBoard.current = cellId;
		if (
			reducedMainBoardState[cellId] === "X" ||
			reducedMainBoardState[cellId] === "O" ||
			reducedMainBoardState[cellId] === "Tie"
		) {
			nextActiveBoard.current = -1;
		}
		onPlay(nextSquares, boardId);
	}

	return (
		<div>
			<div className="grid grid-cols-3 gap-0">
				{Array(9)
					.fill(null)
					.map((_, i) => (
						<SubBoard
							key={i}
							subBoardState={mainBoardState[i]}
							subBoardId={i}
							handlePlay={handlePlay}
							playerTurn={currentPlayer}
							activeSubBoard={
								result
									? false
									: nextActiveBoard.current === i ||
										  nextActiveBoard.current === -1
										? true
										: null
							}
						/>
					))}
			</div>
		</div>
	);
}

export default MainBoard;
