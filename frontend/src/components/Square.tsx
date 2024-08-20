import { motion } from "framer-motion";
import { Circle, X } from "lucide-react";
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
	const placeHolderMark =
		currentPlayerTurn === "X" ? (
			<X className="size-4" />
		) : (
			<Circle className="size-4" />
		);

	const mark =
		value === "X" ? <X className="size-12" /> : <Circle className="size-10" />;
		
	return (
		<motion.div whileTap={{ scale: 0.9 }}>
			<Button
				disabled={!!(!activeSubBoard || value)}
				variant={activeSubBoard ? "secondary" : "outline"}
				className="size-16"
				onClick={() => {
					handlePlay(boardId, cellId, true);
				}}
			>
				{activeSubBoard && value ? (
					<div className="opacity-80">{mark}</div>
				) : !activeSubBoard && value ? (
					<div className="opacity-50">{mark}</div>
				) : activeSubBoard && !value ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.5 }}
						className="opacity-50"
					>
						{placeHolderMark}
					</motion.div>
				) : null}
			</Button>
		</motion.div>
	);
}

export default Square;
