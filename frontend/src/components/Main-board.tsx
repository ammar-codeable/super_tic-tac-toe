import { motion } from "framer-motion";
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
		<motion.div
			initial={{ scale: 0.75, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ duration: 1 }}
			className="grid min-w-[768px] max-w-[80vw] grid-cols-3 bg-blend-normal"
		>
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
		</motion.div>
	);
}

export default MainBoard;
