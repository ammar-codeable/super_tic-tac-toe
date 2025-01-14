import GameOverModal from "@/features/game/components/game-over-modal";
import GridLines from "@/features/game/components/grid-lines";
import SubBoard from "@/features/game/components/sub-board";
import calculateResult from "@super-tic-tac-toe/utils/calculate-result";
import { useState } from "react";

function ClassicGame() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const currentPlayer = board.filter(Boolean).length % 2 === 0 ? "X" : "O";
  const gameResult = calculateResult(board);

  const handlePlay = (_: number, cellId: number) => {
    if (gameResult) return;

    const newBoard = [...board];
    newBoard[cellId] = currentPlayer;
    setBoard(newBoard);
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="relative w-full max-w-md">
        <GridLines />
        <SubBoard
          boardId={0}
          subBoardState={board}
          lastClickedCellId={null}
          isActiveSubBoard={true}
          currentPlayerTurn={currentPlayer}
          handlePlay={handlePlay}
          getGlobalSquareIndex={(_, i) => i}
          showWinAnimation={false}
        />
      </div>

      {gameResult && (
        <GameOverModal
          gameResult={gameResult}
          onRestart={handleRestart}
          isOnlineGame={false}
        />
      )}
    </div>
  );
}

export default ClassicGame;
