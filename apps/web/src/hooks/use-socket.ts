import { ChatMessage } from "@repo/types/chat-schemas";
import { ServerMessageSchema } from "@repo/types/server-message-schemas";
import React, { useEffect, useState } from "react";

export function useSocket(
  setWaiting: React.Dispatch<React.SetStateAction<boolean | undefined>>,
  setPlayerMark: React.Dispatch<React.SetStateAction<"X" | "O" | null>>,
  setDisconnected: React.Dispatch<React.SetStateAction<boolean>>,
  setGameResult: React.Dispatch<React.SetStateAction<string | null>>,
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  handlePlay: (boardId: number, cellId: number, yourMove: boolean) => void,
) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(import.meta.env.VITE_WEBSOCKET_SERVER_URL);

    socket.onopen = () => {
      setSocket(socket);
    };

    socket.onmessage = (message) => {
      try {
        const messageData = JSON.parse(message.data);
        const msg = ServerMessageSchema.parse(messageData);

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
        }
      } catch (error) {
        console.error('Invalid message received:', error);
        throw error;
      }
    };

    socket.onclose = () => {
      setDisconnected(true);
    };

    return () => {
      socket.close();
    };
  }, []);

  return socket;
}
