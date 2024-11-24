import Square from "@/components/square";
import { cn } from "@/lib/utils";
import calculateResult from "@repo/utils/calculate-result";
import { motion } from "framer-motion";
import { useState } from "react";

function SubBoardResult({
  subGameResult,
  setIsAnimationComplete,
}: {
  subGameResult: string;
  setIsAnimationComplete: (arg0: boolean) => void;
}) {
  const draw = {
    initial: { opacity: 0, pathLength: 0 },
    draw: { opacity: 1, pathLength: 1, transition: { duration: 1.6 } },
  };

  return subGameResult === "Tie" ? null : (
    <motion.svg
      width="140"
      height="140"
      initial="initial"
      animate="draw"
      stroke="currentColor"
      onAnimationComplete={() => setIsAnimationComplete(true)}
      className="m-5 stroke-[5px]"
    >
      {subGameResult === "X" ? (
        <>
          <motion.line x1="10%" y1="10%" x2="90%" y2="90%" variants={draw} />
          <motion.line x1="10%" y1="90%" x2="90%" y2="10%" variants={draw} />
        </>
      ) : (
        <motion.circle
          cy="50%"
          cx="50%"
          r="40%"
          variants={draw}
          className="fill-transparent"
        />
      )}
    </motion.svg>
  );
}

function SubBoard({
  boardId,
  subBoardState,
  lastClickedCellId,
  isActiveSubBoard,
  currentPlayerTurn,
  handlePlay,
  getGlobalSquareIndex,
}: {
  boardId: number;
  subBoardState: (string | null)[];
  lastClickedCellId: number | null;
  isActiveSubBoard: boolean;
  currentPlayerTurn: string;
  handlePlay: (boardId: number, cellId: number, yourMove: boolean) => void;
  getGlobalSquareIndex: (boardId: number, squareId: number) => number;
}) {
  const subGameResult = calculateResult(subBoardState);

  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  return (
    <div className="group relative flex items-center justify-center">
      <div
        className={cn("grid size-full grid-cols-3 gap-1 p-2 2xl:gap-2", {
          hidden: subGameResult && subGameResult !== "DRAW",
          "group-hover:grid": subGameResult && isAnimationComplete,
        })}
      >
        {Array(9)
          .fill(null)
          .map((_, i) => (
            <Square
              key={i}
              handlePlay={handlePlay}
              cellId={i}
              cellValue={subBoardState[i]}
              boardId={boardId}
              isActiveSquare={isActiveSubBoard && !subBoardState[i]}
              isLastClickedSquare={lastClickedCellId === i}
              currentPlayerTurn={currentPlayerTurn}
              globalIndex={getGlobalSquareIndex(boardId, i)}
            />
          ))}
      </div>
      {subGameResult && (
        <div
          className={cn({
            "group-hover:hidden": isAnimationComplete,
          })}
        >
          <SubBoardResult
            subGameResult={subGameResult}
            setIsAnimationComplete={setIsAnimationComplete}
          />
        </div>
      )}
    </div>
  );
}

export default SubBoard;
