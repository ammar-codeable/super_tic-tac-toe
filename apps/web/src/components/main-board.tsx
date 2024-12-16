import SubBoard from "@/components/sub-board";
import GridLines from "@/components/grid-lines";
import { motion } from "framer-motion";

function MainBoard({
  mainBoardState,
  currentPlayerTurn,
  lastClickedBoardId,
  lastClickedCellId,
  nextActiveBoard,
  handlePlay,
}: {
  mainBoardState: (string | null)[][];
  currentPlayerTurn: string;
  lastClickedBoardId: number | null;
  lastClickedCellId: number | null;
  nextActiveBoard: (number | null)[] | null;
  handlePlay: (boardId: number, cellId: number, yourMove: boolean) => void;
}) {
  const ANIMATION_DURATION = 0.95;
  const TOTAL_SQUARES = 81;
  const STAGGER_DELAY = 0.015;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: STAGGER_DELAY,
        duration: ANIMATION_DURATION,
        staggerDelay: ANIMATION_DURATION / TOTAL_SQUARES,
      },
    },
  };

  const getGlobalSquareIndex = (boardId: number, squareId: number) => {
    return boardId * 9 + squareId;
  };

  return (
    <motion.div
      className="relative grid aspect-square w-full grid-cols-3 gap-0 xl:min-h-[33rem] xl:min-w-[33rem]"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <GridLines />

      {Array(9)
        .fill(null)
        .map((_, boardId) => (
          <SubBoard
            key={boardId}
            boardId={boardId}
            subBoardState={mainBoardState[boardId]}
            lastClickedCellId={
              lastClickedBoardId === boardId ? lastClickedCellId : null
            }
            isActiveSubBoard={
              (nextActiveBoard && nextActiveBoard.includes(boardId))!
            }
            currentPlayerTurn={currentPlayerTurn}
            handlePlay={handlePlay}
            getGlobalSquareIndex={getGlobalSquareIndex}
          />
        ))}
    </motion.div>
  );
}

export default MainBoard;
