import ChoosePlayerModal from "@/components/choose-player-modal";
import DisconnectModal from "@/components/disconnect-modal";
import Game from "@/components/game";
import Loader from "@/components/loader";
import ResignConfirmationModal from "@/components/resign-confirmation-modal";
import { useSocket } from "@/hooks/use-socket";
import { ChatMessage } from "@super-tic-tac-toe/types/chat-schemas";
import { useState } from "react";
import { toast } from "sonner";

function OnlineGame() {
  const [waiting, setWaiting] = useState<boolean | undefined>();
  const [disconnected, setDisconnected] = useState(false);
  const [showResignModal, setShowResignModal] = useState(false);

  const [playerMark, setPlayerMark] = useState<"X" | "O" | null>(null);

  const [currentMove, setCurrentMove] = useState(0);

  const [moveHistory, setMoveHistory] = useState<[number, number][]>([
    [-1, -1],
  ]);

  const [gameResult, setGameResult] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [rematchDeclined, setRematchDeclined] = useState(false);

  function handleOnlinePlay(
    boardId: number,
    cellId: number,
    yourMove: boolean = true,
  ) {
    setCurrentMove((currentMove) => currentMove + 1);
    setMoveHistory((moveHistory: [number, number][]) => [
      ...moveHistory,
      [boardId, cellId],
    ]);

    if (yourMove) {
      sendMessage({
        type: "move",
        move: [boardId, cellId],
      });
    }
  }

  const handleResign = () => {
    sendMessage({ type: "resign" });
    setGameResult(playerMark === "X" ? "O" : "X");
  };

  const handleDrawOffer = () => {
    sendMessage({
      type: "draw-offer",
      action: "offer",
    });
    toast.info("Draw offer sent to opponent");
  };

  const handleRematch = () => {
    sendMessage({
      type: "rematch",
      action: "request",
    });
    toast.info("Rematch request sent to opponent");
  };

  const resetGame = () => {
    setCurrentMove(0);
    setMoveHistory([[-1, -1]]);
    setGameResult(null);
    setMessages([]);
  };

  const { socket, sendMessage, gameId } = useSocket(
    setWaiting,
    setPlayerMark,
    setDisconnected,
    setGameResult,
    setMessages,
    handleOnlinePlay,
    resetGame,
    setRematchDeclined,
  );

  if (waiting === undefined) {
    return <Loader message="Connecting to server..." />;
  }

  if (waiting === true) {
    return <Loader message="Waiting for another player..." />;
  }

  if (!disconnected && !playerMark) {
    return <ChoosePlayerModal socket={sendMessage} gameId={gameId} />;
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
        messages={messages}
        setMessages={setMessages}
        socket={socket}
        onDrawOffer={handleDrawOffer}
        onRematch={handleRematch}
        disconnected={disconnected}
        rematchDeclined={rematchDeclined}
        sendMessage={sendMessage}
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
