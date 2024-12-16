import { WebSocket } from "ws";
import { sendSocketMessage } from "../utils/socket-utils";

const pendingPlayers: WebSocket[] = [];

function addPendingPlayer(socket: WebSocket) {
  pendingPlayers.push(socket);
  sendSocketMessage([socket], { type: "waiting", waiting: true });
}

function removePendingPlayer(socket: WebSocket) {
  const index = pendingPlayers.indexOf(socket);
  if (index !== -1) {
    pendingPlayers.splice(index, 1);
  }
}

function getPendingPlayers(): [WebSocket, WebSocket] | null {
  if (pendingPlayers.length >= 2) {
    const player1Socket = pendingPlayers.shift()!;
    const player2Socket = pendingPlayers.shift()!;
    return [player1Socket, player2Socket];
  }
  return null;
}

export { addPendingPlayer, getPendingPlayers, removePendingPlayer };
