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
}: {
  currentMove: number;
  setCurrentMove: (currentMove: number) => void;
  moveHistory: number[][];
  setMoveHistory: (moveHistory: number[][]) => void;
  handlePlay: (boardId: number, cellId: number, yourMove: boolean) => void;
  gameResult?: string | null;
  playerMark?: string;
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
  return (
    <div className="grid size-full content-start gap-x-8 p-4 lg:grid-cols-6">
      <div className="flex flex-col items-center gap-y-2 lg:col-span-4 xl:col-span-3">
        <MainBoard
          mainBoardState={mainBoardState}
          nextActiveBoard={getActiveBoards(
            !!gameResult,
            reducedMainBoardState,
            moveHistory,
            currentMove,
            isOnlineGame ? playerMark === currentPlayerTurn : undefined,
          )}
          currentPlayerTurn={currentPlayerTurn}
          handlePlay={handlePlay}
        />
        {!isOnlineGame && (
          <MoveNavigator
            moveHistory={moveHistory}
            setMoveHistory={setMoveHistory}
            currentMove={currentMove}
            setCurrentMove={setCurrentMove}
          />
        )}
      </div>
      <div></div>
      {gameResult && <GameOverModal gameResult={gameResult} />}
    </div>
  );
}
export default Game;
