import SubBoard from "./Sub-board";

function MainBoard({
	mainBoardState,
	handlePlay,
	nextActiveBoard,
	currentPlayerTurn,
}: {
	mainBoardState: string[][];
	handlePlay: (boardId: number, cellId: number, yourMove: boolean) => void;
	nextActiveBoard: number | null;
	currentPlayerTurn: string;
}) {
	return (
		<div className="grid min-w-[768px] max-w-[80vw] grid-cols-3 gap-0 second">
			{Array(9)
				.fill(null)
				.map((_, i) => (
					<SubBoard
						key={i}
						subBoardState={mainBoardState[i]}
						subBoardId={i}
						handlePlay={handlePlay}
						activeSubBoard={
							nextActiveBoard === i || nextActiveBoard === -1 ? true : false
						}
						currentPlayerTurn={currentPlayerTurn}
					/>
				))}
		</div>
	);
}

export default MainBoard;
