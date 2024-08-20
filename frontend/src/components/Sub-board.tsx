import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
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
	let result = calculateResult(subBoardState);

	const draw = {
		hidden: { pathLength: 0, opacity: 0 },
		visible: () => {
			return {
				pathLength: 1,
				opacity: 1,
				transition: {
					pathLength: { type: "spring", duration: 3.2 },
					opacity: { duration: 1.6 },
				},
			};
		},
	};

	return (
		<div
			className={cn("group flex size-64 items-center justify-center border-2", {
				"border-t-0": subBoardId < 3,
				"border-l-0": subBoardId % 3 === 0,
				"border-r-0": subBoardId % 3 === 2,
				"border-b-0": subBoardId > 5,
			})}
		>
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				id="subBoard"
				className={cn(
					"absolute grid size-48 grid-cols-3 items-center justify-center gap-2 group-hover:grid",
					{
						hidden: result,
					},
				)}
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
			<>
				{result === "X" ? (
					<motion.svg
						width="256"
						height="256"
						initial="hidden"
						animate="visible"
						className={"stroke-[5px] group-hover:hidden"}
					>
						<motion.line
							x1="25%"
							y1="25%"
							x2="75%"
							y2="75%"
							stroke="currentColor"
							variants={draw}
						/>
						<motion.line
							x1="25%"
							y1="75%"
							x2="75%"
							y2="25%"
							stroke="currentColor"
							variants={draw}
						/>
					</motion.svg>
				) : result === "O" ? (
					<motion.svg
						width="256"
						height="256"
						initial="hidden"
						animate="visible"
						className={"fill-transparent stroke-[5px] group-hover:hidden"}
					>
						<motion.circle
							cy="128"
							cx="128"
							r="64"
							stroke="currentColor"
							variants={draw}
						/>
					</motion.svg>
				) : result === "Tie" ? (
					<motion.svg
						width="256"
						height="256"
						initial="hidden"
						animate="visible"
						className={"stroke-2 group-hover:hidden"}
					>
						<motion.line
							x1="0%"
							y1="0%"
							x2="100%"
							y2="100%"
							stroke="#fff"
							variants={draw}
						/>
						<motion.line
							x1="100%"
							y1="0%"
							x2="0%"
							y2="100%"
							stroke="currentColor"
							variants={draw}
						/>
					</motion.svg>
				) : null}
			</>
		</div>
	);
}

export default SubBoard;
