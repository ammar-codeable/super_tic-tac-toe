import { ServerMessageSchema } from "@super-tic-tac-toe/types/server-message-schemas";
import { validateMessage } from "@super-tic-tac-toe/utils/validate-message";
import React, { useEffect, useRef } from "react";
import { toast } from "sonner";

export function useSocket(
  setWaiting: React.Dispatch<React.SetStateAction<boolean | undefined>>,
  setPlayerMark: React.Dispatch<React.SetStateAction<"X" | "O" | null>>,
  setDisconnected: React.Dispatch<React.SetStateAction<boolean>>,
  setGameResult: React.Dispatch<React.SetStateAction<string | null>>,
  setMessages: React.Dispatch<React.SetStateAction<{text: string, fromSelf: boolean }[]>>,
  handlePlay: (boardId: number, cellId: number, yourMove: boolean) => void,
  resetGame: () => void,
  setRematchDeclined: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const socketRef = useRef<WebSocket | null>(null);
  const gameIdRef = useRef<string>("");

  const handleMessage = (message: MessageEvent) => {
    try {
      const msg = validateMessage(message.data, ServerMessageSchema);

      switch (msg.type) {
        case "init":
          gameIdRef.current = msg.gameId;
          break;

        case "waiting":
          setWaiting(msg.waiting);
          break;

        case "mark":
          setPlayerMark(msg.mark);
          break;

        case "game": {
          const { moveHistory, currentMove } = msg.game;
          if (moveHistory.length === 1) {
            // This is a new game (rematch)
            resetGame();
          } else {
            const [boardId, cellId] = moveHistory[currentMove];
            handlePlay(boardId, cellId, false);
          }
          break;
        }

        case "result":
          setGameResult(msg.result);
          break;

        case "chat":
          setMessages((prev) => [...prev, { text: msg.chat, fromSelf: false }]);
          break;

        case "error":
          console.error("Server error:", msg.error);
          break;

        case "draw-offer":
          toast("Draw Offer", {
            description: "Your opponent is offering a draw",
            action: {
              label: "Accept",
              onClick: () => {
                socketRef.current?.send(
                  JSON.stringify({
                    type: "draw-offer",
                    action: "accept",
                    gameId: gameIdRef.current,
                  }),
                );
              },
            },
            duration: 10000,
          });
          break;

        case "rematch-request":
          toast("Rematch Request", {
            description: "Your opponent wants a rematch",
            action: {
              label: "Accept",
              onClick: () => {
                socketRef.current?.send(
                  JSON.stringify({
                    type: "rematch",
                    action: "accept",
                    gameId: gameIdRef.current,
                  }),
                );
              },
            },
            cancel: {
              label: "Decline",
              onClick: () => {
                socketRef.current?.send(
                  JSON.stringify({
                    type: "rematch",
                    action: "decline",
                    gameId: gameIdRef.current,
                  }),
                );
              },
            },
            duration: 10000,
          });
          break;

        case "rematch-accepted":
          resetGame();
          setPlayerMark((mark) => (mark === "X" ? "O" : "X"));
          break;

        case "rematch-declined":
          toast.error("Rematch request declined");
          setRematchDeclined(true);
          break;
      }
    } catch (error) {
      console.error("Invalid message received:", error);
      throw error;
    }
  };

  const sendMessage = (message: any) => {
    if (gameIdRef.current) {
      message.gameId = gameIdRef.current;
    }
    socketRef.current?.send(JSON.stringify(message));
  };

  useEffect(() => {
    socketRef.current = new WebSocket(
      import.meta.env.VITE_WEBSOCKET_SERVER_URL,
    );
    const socket = socketRef.current;

    socket.onmessage = handleMessage;

    socket.onclose = () => {
      setDisconnected(true);
    };

    return () => {
      socket.close();
    };
  }, []);

  return {
    socket: socketRef.current,
    sendMessage,
    gameId: gameIdRef.current,
  };
}
