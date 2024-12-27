import Game from "@/features/game/components/game";
import { useState } from "react";

function OfflineGame() {
  const [currentMove, setCurrentMove] = useState(0);
  const [moveHistory, setMoveHistory] = useState<[number, number][]>([
    [-1, -1],
  ]);

  function handleOfflinePlay(boardId: number, cellId: number) {
    setCurrentMove(currentMove + 1);
    setMoveHistory((moveHistory: [number, number][]) => [
      ...moveHistory.slice(0, currentMove + 1),
      [boardId, cellId],
    ]);
  }

  return (
    <Game
      currentMove={currentMove}
      setCurrentMove={setCurrentMove}
      moveHistory={moveHistory}
      setMoveHistory={setMoveHistory}
      handlePlay={handleOfflinePlay}
    />
  );
}

export default OfflineGame;
