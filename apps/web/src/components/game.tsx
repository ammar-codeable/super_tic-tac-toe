import calculateResult from "@repo/utils/calculate-result";
import getActiveBoards from "@repo/utils/get-active-boards";
import getMainBoardState from "@repo/utils/get-main-board-state";
import GameOverModal from "./game-over-modal";
import MainBoard from "./main-board";
import MoveNavigator from "./move-navigator";

function Game({
  currentMove,
  setCurrentMove,
  moveHistory,
  setMoveHistory,
  handlePlay,
  gameResult,
  playerMark,
  onResign,
}: {
  currentMove: number;
  setCurrentMove: (currentMove: number) => void;
  moveHistory: number[][];
  setMoveHistory: (moveHistory: number[][]) => void;
  handlePlay: (boardId: number, cellId: number, yourMove: boolean) => void;
  gameResult?: string | null;
  playerMark?: string | null;
  onResign?: () => void;
}) {
  const currentPlayerTurn = currentMove % 2 === 0 ? "X" : "O";

  const mainBoardState: (string | null)[][] = getMainBoardState(
    currentMove,
    moveHistory,
  );
  const reducedMainBoardState = mainBoardState.map(calculateResult);

  if (gameResult === undefined) {
    gameResult = calculateResult(reducedMainBoardState);
  }

  const isOnlineGame = !!playerMark;
  const canPlay = !isOnlineGame || currentMove === moveHistory.length - 1;

  return (
    <div className="grid h-full lg:grid-cols-6">
      <div className="flex w-11/12 flex-col gap-y-4 self-center lg:col-span-4 xl:col-span-3">
        <MainBoard
          mainBoardState={mainBoardState}
          currentPlayerTurn={currentPlayerTurn}
          lastClickedBoardId={moveHistory[currentMove][0]}
          lastClickedCellId={moveHistory[currentMove][1]}
          nextActiveBoard={getActiveBoards(
            !canPlay || !!gameResult,
            reducedMainBoardState,
            moveHistory,
            currentMove,
            isOnlineGame ? playerMark === currentPlayerTurn : undefined,
          )}
          handlePlay={handlePlay}
        />
        <MoveNavigator
          moveHistory={moveHistory}
          currentMove={currentMove}
          setCurrentMove={setCurrentMove}
          setMoveHistory={setMoveHistory}
          isOnlineGame={isOnlineGame}
          onResign={onResign}
        />
      </div>
      <div></div>
      {gameResult && <GameOverModal gameResult={gameResult} />}
    </div>
  );
}

export default Game;
