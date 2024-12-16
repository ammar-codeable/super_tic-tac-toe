import GameOverModal from "@/components/game-over-modal";
import GridLines from "@/components/grid-lines";
import SubBoard from "@/components/sub-board";
import calculateResult from "@super-tic-tac-toe/utils/calculate-result";
import { useState } from "react";

function ClassicGame() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const gameResult = calculateResult(board);

  const handlePlay = (boardId: number, cellId: number) => {
    if (board[cellId] || gameResult) return;

    const newBoard = [...board];
    newBoard[cellId] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
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
