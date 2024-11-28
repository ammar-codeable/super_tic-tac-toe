import { ChatMessage } from "@repo/types/chat-schemas";
import { ServerMessageSchema } from "@repo/types/server-message-schemas";
import { validateMessage } from "@repo/utils/validate-message";
import React, { useEffect, useRef } from "react";

export function useSocket(
  setWaiting: React.Dispatch<React.SetStateAction<boolean | undefined>>,
  setPlayerMark: React.Dispatch<React.SetStateAction<"X" | "O" | null>>,
  setDisconnected: React.Dispatch<React.SetStateAction<boolean>>,
  setGameResult: React.Dispatch<React.SetStateAction<string | null>>,
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  handlePlay: (boardId: number, cellId: number, yourMove: boolean) => void,
) {
  const socketRef = useRef<WebSocket | null>(null);

  const handleMessage = (message: MessageEvent) => {
      try {
        const msg = validateMessage(message.data, ServerMessageSchema);

        switch (msg.type) {
          case "waiting":
            setWaiting(msg.waiting);
            break;

          case "mark":
            setPlayerMark(msg.mark);
            break;

          case "game": {
            const { moveHistory, currentMove } = msg.game;
            const [boardId, cellId] = moveHistory[currentMove];
            handlePlay(boardId, cellId, false);
            break;
          }

          case "result":
            setGameResult(msg.result);
            break;

          case "chat":
            setMessages((prev) => [...prev, ...msg.chat]);
            break;

          case "error":
            console.error("Server error:", msg.error);
            break;
        }
      } catch (error) {
        console.error('Invalid message received:', error);
        throw error;
      }
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

  return socketRef.current;
}
