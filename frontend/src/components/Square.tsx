import { motion } from "framer-motion";
import { Button } from "./ui/button";

function Square({ value, handleSquareClick, cellId, boardId, activeSubBoard } : {
	value: string,
	handleSquareClick: (cellId: number, boardId: number) => void,
	cellId: number,
	boardId: number,
	activeSubBoard: boolean
}) {
	return (
		<motion.div whileTap={{ scale: 0.9 }}>
			<Button
				disabled={!activeSubBoard || value}
				variant={activeSubBoard ? "secondary" : "outline"}
				className="size-16 text-5xl"
				onClick={() => {
					handleSquareClick(cellId, boardId);
				}}
			>
				{value}
			</Button>
		</motion.div>
	);
}

export default Square;
