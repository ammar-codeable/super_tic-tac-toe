import { motion } from "framer-motion";
import { Button } from "./ui/button";

function Square({ value, onSquareClick, cellId, boardId, activeSubBoard }) {
	return (
		<motion.div whileTap={{ scale: 0.9 }}>
			<Button
				disabled={!activeSubBoard || value}
				variant="outline"
				className="size-16 text-5xl"
				onClick={() => {
					onSquareClick(cellId, boardId);
				}}
			>
				{value}
			</Button>
		</motion.div>
	);
}

export default Square;
