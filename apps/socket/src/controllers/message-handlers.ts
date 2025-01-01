import {
  DrawOfferMessage,
  Mark,
  MoveMessage,
  RematchMessage,
} from "@super-tic-tac-toe/types/client-message-schemas";
import ws from "ws";
import {
  getGame,
  handleResign,
  resetGame,
  swapPlayerMarks,
  updateGameState,
} from "../managers/game-manager";
import { Game, Player } from "../types/game-types";
import { assignMark } from "../utils/assign-mark";
import { sendSocketMessage } from "../utils/socket-utils";

export function handlePlayerMarkSelection(
  currentPlayer: Player,
  opponent: Player,
  player: Mark,
) {
  assignMark(currentPlayer, opponent, player);

  if (currentPlayer.mark && opponent.mark) {
    sendSocketMessage([currentPlayer.socket], {
      type: "mark",
      mark: currentPlayer.mark,
    });
    sendSocketMessage([opponent.socket], { type: "mark", mark: opponent.mark });
  }
}

export function handleMove(
  message: MoveMessage,
  game: Game,
  currentPlayer: Player,
  opponent: Player,
) {
  const result = updateGameState(message.gameId, ...message.move);
  sendSocketMessage([opponent.socket], { type: "game", game });

  if (result) {
    sendSocketMessage([currentPlayer.socket, opponent.socket], {
      type: "result",
      result,
    });
  }
}

export function handleResignGame(
  gameId: string,
  currentPlayer: Player,
  opponent: Player,
) {
  const resignResult = handleResign(gameId, currentPlayer.socket);
  sendSocketMessage([currentPlayer.socket, opponent.socket], {
    type: "result",
    result: resignResult!,
  });
}

export function handleChatMessage(
  message: { chat: string },
  opponent: Player,
) {
  sendSocketMessage([opponent.socket], { 
    type: "chat", 
    chat: message.chat 
  });
}

export function handleDrawOffer(
  message: DrawOfferMessage,
  currentPlayer: Player,
  opponent: Player,
) {
  switch (message.action) {
    case "offer":
      sendSocketMessage([opponent.socket], { type: "draw-offer" });
      break;
    case "accept":
      const result = "DRAW";
      sendSocketMessage([currentPlayer.socket, opponent.socket], {
        type: "result",
        result,
      });
      getGame(message.gameId)!.result = result;
      break;
  }
}

export function handleRematch(
  message: RematchMessage,
  currentPlayer: Player,
  opponent: Player,
) {
  if (opponent.socket.readyState !== ws.OPEN) {
    sendSocketMessage([currentPlayer.socket], {
      type: "error",
      error: "Opponent has disconnected",
    });
    return;
  }

  switch (message.action) {
    case "request":
      sendSocketMessage([opponent.socket], { type: "rematch-request" });
      break;
    case "accept":
      resetGame(message.gameId);
      swapPlayerMarks(message.gameId);
      sendSocketMessage([currentPlayer.socket, opponent.socket], {
        type: "rematch-accepted",
      });
      break;
    case "decline":
      sendSocketMessage([opponent.socket], { type: "rematch-declined" });
      break;
  }
}
