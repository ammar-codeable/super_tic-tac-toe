import ChoosePlayerModal from "@/components/choose-player-modal";
import DisconnectModal from "@/components/disconnect-modal";
import Game from "@/components/game";
import ResignConfirmationModal from "@/components/resign-confirmation-modal";
import { useSocket } from "@/hooks/use-socket";
import { useState } from "react";

function OnlineGame() {
  const [waiting, setWaiting] = useState<boolean | undefined>();
  const [disconnected, setDisconnected] = useState(false);
  const [showResignModal, setShowResignModal] = useState(false);

  const [playerMark, setPlayerMark] = useState<string | null>(null);

  const [currentMove, setCurrentMove] = useState(0);
  console.log(currentMove);

  const [moveHistory, setMoveHistory] = useState<number[][]>([[-1, -1]]);

  const [gameResult, setGameResult] = useState<string | null>(null);

  function handleOnlinePlay(
    boardId: number,
    cellId: number,
    yourMove: boolean = true,
  ) {
    setCurrentMove((currentMove) => currentMove + 1);
    setMoveHistory((moveHistory: number[][]) => [
      ...moveHistory,
      [boardId, cellId],
    ]);

    if (yourMove) {
      socket!.send(JSON.stringify({ move: [boardId, cellId] }));
    }
  }

  const handleResign = () => {
    socket?.send(JSON.stringify({ resign: true }));
    setGameResult(playerMark === "X" ? "O" : "X");
  };

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
        currentMove={currentMove}
        setCurrentMove={setCurrentMove}
        moveHistory={moveHistory}
        setMoveHistory={setMoveHistory}
        handlePlay={handleOnlinePlay}
        gameResult={gameResult}
        playerMark={playerMark}
        onResign={() => setShowResignModal(true)}
      />
      {disconnected && !gameResult && <DisconnectModal />}
      <ResignConfirmationModal
        open={showResignModal}
        onOpenChange={setShowResignModal}
        handleResign={handleResign}
      />
    </>
  );
}

export default OnlineGame;
