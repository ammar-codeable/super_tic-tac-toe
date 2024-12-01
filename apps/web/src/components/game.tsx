import { ChatMessage } from "@repo/types/chat-schemas";
import calculateResult from "@repo/utils/calculate-result";
import getActiveBoards from "@repo/utils/get-active-boards";
import getMainBoardState from "@repo/utils/get-main-board-state";
import { useRef } from "react";
import Chat from "./chat";
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
  onDrawOffer,
  messages,
  setMessages,
  socket,
}: {
  currentMove: number;
  setCurrentMove: (currentMove: number) => void;
  moveHistory: number[][];
  setMoveHistory: (moveHistory: number[][]) => void;
  handlePlay: (boardId: number, cellId: number, yourMove: boolean) => void;
  gameResult?: string | null;
  playerMark?: string | null;
  onResign?: () => void;
  onDrawOffer?: () => void;
  messages?: ChatMessage[] | undefined;
  setMessages?: React.Dispatch<React.SetStateAction<ChatMessage[]>> | undefined;
  socket?: WebSocket | null;
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

  const mainBoardKey = useRef(0);
  const handleRestart = () => {
    mainBoardKey.current += 1;
    setMoveHistory([[-1, -1]]);
    setCurrentMove(0);
  };

  return (
    <div className="grid gap-y-4 w-full lg:grid-cols-6">
      <div className="flex w-full max-w-[100vw] flex-col items-center gap-y-3 md:max-w-[800px] lg:col-span-4 xl:col-span-3">
        <MainBoard
          key={mainBoardKey.current}
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
          isOnlineGame={isOnlineGame}
          onResign={onResign}
          onRestart={handleRestart}
          onDrawOffer={onDrawOffer}
        />
      </div>
      {isOnlineGame && messages && setMessages && socket && (
        <div className="h-96 w-full px-4 lg:col-span-2 lg:h-full">
          <Chat
            messages={messages}
            setMessages={setMessages}
            socket={socket}
            playerMark={playerMark!}
          />
        </div>
      )}
      {gameResult && (
        <GameOverModal 
          gameResult={gameResult} 
          onRestart={handleRestart} 
          isOnlineGame={isOnlineGame} 
        />
      )}
    </div>
  );
}

export default Game;
