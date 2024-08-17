import { motion } from "framer-motion";
import { Button } from "./ui/button";

function Square({
	value,
	handlePlay,
	cellId,
	boardId,
	activeSubBoard,
	currentPlayerTurn,
}: {
	value: string;
	handlePlay: (boardId: number, cellId: number, serverData: boolean) => void;
	cellId: number;
	boardId: number;
	activeSubBoard: boolean;
	currentPlayerTurn: string;
}) {
	return (
		<motion.div whileTap={{ scale: 0.9 }}>
			<Button
				disabled={!!(!activeSubBoard || value)}
				variant={activeSubBoard ? "secondary" : "outline"}
				className="size-16 text-5xl"
				onClick={() => {
					handlePlay(boardId, cellId, true);
				}}
			>
				{!activeSubBoard || value ? (
					value
				) : (
					<motion.div className="text-base opacity-50">
						{currentPlayerTurn}
					</motion.div>
				)}
			</Button>
		</motion.div>
	);
}

export default Square;
