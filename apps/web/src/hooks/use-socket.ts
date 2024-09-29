import React, { useEffect, useState } from "react";

export function useSocket(
  setWaiting: React.Dispatch<React.SetStateAction<boolean | undefined>>,
  setPlayerMark: React.Dispatch<React.SetStateAction<string | null>>,
  setDisconnected: React.Dispatch<React.SetStateAction<boolean>>,
  setGameResult: React.Dispatch<React.SetStateAction<string | null>>,
  handlePlay: (boardId: number, cellId: number, yourMove: boolean) => void,
) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(import.meta.env.VITE_WEBSOCKET_SERVER_URL);

    socket.onopen = () => {
      setSocket(socket);
    };

    socket.onmessage = (message) => {
      const messageData = JSON.parse(message.data);
      if (messageData.waiting !== undefined) {
        setWaiting(messageData.waiting);
      }

      if (messageData.mark !== undefined) {
        setPlayerMark(messageData.mark);
      }

      if (messageData.game !== undefined) {
        const gameState = messageData.game;
        const [boardId, cellId] = gameState.moveHistory[gameState.currentMove];

        handlePlay(boardId, cellId, false);
      }

      if (messageData.result !== undefined) {
        setGameResult(messageData.result);
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
