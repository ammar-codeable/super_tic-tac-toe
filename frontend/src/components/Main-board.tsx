import { useRef } from "react";
import SubBoard from "./Sub-board";

function MainBoard({
	currentPlayerTurn,
	mainBoardState,
	onPlay,
	nextActiveBoard,
} : {
	currentPlayerTurn: string,
	mainBoardState: string[][],
	onPlay: (nextSquares: string[], boardId: number, cellId: number, serverData: boolean) => void,
	nextActiveBoard: number;
}) {
	
	return (
		<div className="grid grid-cols-3 gap-0 min-w-[768px] max-w-[80vw]">
			{Array(9)
				.fill(null)
				.map((_, i) => (
					<SubBoard
						key={i}
						subBoardState={mainBoardState[i]}
						subBoardId={i}
						handlePlay={onPlay}
						currentPlayerTurn={currentPlayerTurn}
						activeSubBoard={
							nextActiveBoard === i || nextActiveBoard === -1
								? true
								: false
						}
					/>
				))}
		</div>
	);
}

export default MainBoard;
