import { motion } from "framer-motion";
import { useRef } from "react";
import calculateResult from "../utils/calculate-result";
import Square from "./Square";

function SubBoard({
	subBoardState,
	subBoardId,
	handlePlay,
	currentPlayerTurn,
	activeSubBoard,
}: {
	subBoardState: string[];
	subBoardId: number;
	handlePlay: (nextSquares: string[], boardId: number, cellId: number, serverData: boolean) => void;
	currentPlayerTurn: string;
	activeSubBoard: boolean;
}) {
	function handleSquareClick(cellId: number, boardId: number) {
		const nextSquares = structuredClone(subBoardState);
		nextSquares[cellId] = currentPlayerTurn;
		handlePlay(nextSquares, boardId, cellId, false);
	}

	const gameEndedSubBoard = useRef<HTMLDivElement | null>(null);
	const subBoard = useRef<HTMLDivElement | null>(null);

	let result = calculateResult(subBoardState);

	if (result) {
		subBoard.current?.classList.add("hidden");
		gameEndedSubBoard.current?.classList.remove("hidden");
	}

	return (
		<div className="flex size-64 items-center justify-center border-2">
			<motion.div
				ref={subBoard}
				className="absolute grid size-48 grid-cols-3 items-center justify-center gap-2"
			>
				{Array(9)
					.fill(null)
					.map((_, i) => (
						<Square
							key={i}
							value={subBoardState[i]}
							handleSquareClick={handleSquareClick}
							cellId={i}
							boardId={subBoardId}
							activeSubBoard={activeSubBoard}
						/>
					))}
			</motion.div>
			<motion.div ref={gameEndedSubBoard} className="absolute hidden text-9xl">
				{result}
			</motion.div>
		</div>
	);
}

export default SubBoard;
