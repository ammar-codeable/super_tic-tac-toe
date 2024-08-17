import { motion } from "framer-motion";
import { useRef } from "react";
import calculateResult from "../utils/calculate-result";
import Square from "./Square";

function SubBoard({
	subBoardState,
	subBoardId,
	handlePlay,
	activeSubBoard,
	currentPlayerTurn,
}: {
	subBoardState: string[];
	subBoardId: number;
	handlePlay: (boardId: number, cellId: number, yourMove: boolean) => void;
	activeSubBoard: boolean;
	currentPlayerTurn: string;
}) {
	const gameEndedSubBoard = useRef<HTMLDivElement | null>(null);
	const subBoard = useRef<HTMLDivElement | null>(null);

	let result = calculateResult(subBoardState);

	if (result) {
		subBoard.current?.classList.add("hidden");
		gameEndedSubBoard.current?.classList.remove("hidden");
	} else {
		subBoard.current?.classList.remove("hidden");
		gameEndedSubBoard.current?.classList.add("hidden");
	}

	return (
		<div className="flex size-64 items-center justify-center border-2">
			<motion.div
				ref={subBoard}
				id="subBoard"
				className="absolute grid size-48 grid-cols-3 items-center justify-center gap-2 peer-hover:visible"
			>
				{Array(9)
					.fill(null)
					.map((_, i) => (
						<Square
							key={i}
							value={subBoardState[i]}
							handlePlay={handlePlay}
							cellId={i}
							boardId={subBoardId}
							activeSubBoard={activeSubBoard}
							currentPlayerTurn={currentPlayerTurn}
						/>
					))}
			</motion.div>
			<motion.div
				ref={gameEndedSubBoard}
				className="peer absolute text-9xl hover:hidden"
			>
				{result}
			</motion.div>
		</div>
	);
}

export default SubBoard;
