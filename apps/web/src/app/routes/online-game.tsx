import ChoosePlayerModal from "@/components/choose-player-modal";
import DisconnectModal from "@/components/disconnect-modal";
import Game from "@/components/game";
import { useSocket } from "@/hooks/use-socket";
import { useRef, useState } from "react";

function OnlineGame() {
  const [waiting, setWaiting] = useState<boolean | undefined>();
  const [disconnected, setDisconnected] = useState(false);

  const [playerMark, setPlayerMark] = useState<string | null>(null);

  const currentMove = useRef(0);
  const [moveHistory, setMoveHistory] = useState([[-1, -1]]);

  const [gameResult, setGameResult] = useState<string | null>(null);

  function handleOnlinePlay(
    boardId: number,
    cellId: number,
    yourMove: boolean = true,
  ) {
    currentMove.current++;
    setMoveHistory((moveHistory) => [
      ...moveHistory.slice(0, currentMove.current + 1),
      [boardId, cellId],
    ]);

    if (yourMove) {
      socket!.send(JSON.stringify({ move: [boardId, cellId] }));
    }
  }

  const socket = useSocket(
    setWaiting,
    setPlayerMark,
    setDisconnected,
    setGameResult,
    handleOnlinePlay,
  );

  if (waiting !== false) {
    return (
      <p className="flex w-full items-center justify-center">
        {waiting === undefined
          ? "Waiting for Connection"
          : "Waiting for player 2"}
      </p>
    );
  }
  
  if (!disconnected && !playerMark) {
    return <ChoosePlayerModal socket={socket} />;
  }

  return (
    <>
      <Game
        currentMove={currentMove.current}
        setCurrentMove={(newMove: number) => {
          currentMove.current = newMove;
        }}
        moveHistory={moveHistory}
        setMoveHistory={setMoveHistory}
        handlePlay={handleOnlinePlay}
        gameResult={gameResult}
        playerMark={playerMark}
      />
      {disconnected && !gameResult && <DisconnectModal />}
    </>
  );
}

export default OnlineGame;
