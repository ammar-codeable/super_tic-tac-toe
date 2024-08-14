import { motion } from "framer-motion";
import { useRef } from "react";
import calculateResult from "../utils/calculateResult";
import Square from "./Square";

function SubBoard({
	subBoardState,
	subBoardId,
	handlePlay,
	playerTurn,
	activeSubBoard,
}) {
	function handleSquareClick(cellId: number, boardId: number) {
		const nextSquares = subBoardState.slice();
		nextSquares[cellId] = playerTurn;
		handlePlay(nextSquares, boardId, cellId);
	}

	let result = calculateResult(subBoardState);

	const winO = useRef<HTMLDivElement | null>(null);
	const winX = useRef<HTMLDivElement | null>(null);
	const subBoard = useRef<HTMLDivElement | null>(null);
	const subBoardContainer = useRef<HTMLDivElement | null>(null);

	if (result === "X") {
		winX.current?.classList.remove("hidden");
		subBoard.current?.classList.add("hidden");
	} else if (result === "O") {
		winO.current?.classList.remove("hidden");
		subBoard.current?.classList.add("hidden");
	}

	if (activeSubBoard  || !subBoardState.includes("null")) {
		subBoardContainer.current?.classList.remove("opacity-50");
	} else {
		subBoardContainer.current?.classList.add("opacity-50");
	}

	return (
		<div
			ref={subBoardContainer}
			className="flex size-64 items-center justify-center border"
		>
			<div
				ref={subBoard}
				className="absolute grid size-48 grid-cols-3 items-center justify-center gap-2"
			>
				{Array(9)
					.fill(null)
					.map((_, i) => (
						<Square
							key={i}
							value={subBoardState[i]}
							onSquareClick={handleSquareClick}
							cellId={i}
							boardId={subBoardId}
							activeSubBoard={activeSubBoard}
						/>
					))}
			</div>
			<motion.div layoutId="underline" 
				ref={winO}
				className="absolute flex hidden items-center justify-center text-9xl"
			>
				O
			</motion.div>
			<div
				ref={winX}
				className="absolute flex hidden items-center justify-center text-9xl"
			>
				X
			</div>
		</div>
	);
}

export default SubBoard;
