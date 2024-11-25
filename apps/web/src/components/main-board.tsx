import SubBoard from "@/components/sub-board";
import { motion } from "framer-motion";

function GridLines() {
  const pathVariants = {
    initial: { pathLength: 0 },
    animate: {
      pathLength: 1,
      transition: {
        duration: 0.95,
        ease: "linear",
      },
    },
  };

  return (
    <svg
      className="pointer-events-none absolute stroke-border"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M 33.34 0 L 33.34 100"
        strokeWidth="0.6"
        fill="none"
        variants={pathVariants}
        initial="initial"
        animate="animate"
      />
      <motion.path
        d="M 66.66 0 L 66.66 100"
        strokeWidth="0.6"
        fill="none"
        variants={pathVariants}
        initial="initial"
        animate="animate"
      />
      <motion.path
        d="M 0 33.34 L 100 33.34"
        strokeWidth="0.6"
        fill="none"
        variants={pathVariants}
        initial="initial"
        animate="animate"
      />
      <motion.path
        d="M 0 66.66 L 100 66.66"
        strokeWidth="0.6"
        fill="none"
        variants={pathVariants}
        initial="initial"
        animate="animate"
      />
    </svg>
  );
}

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
      className="relative grid w-full aspect-square grid-cols-3 gap-0 xl:min-h-[33rem] xl:min-w-[33rem]"
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
