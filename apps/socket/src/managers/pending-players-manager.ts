import ws from "ws";
import { sendSocketMessage } from "../utils/socket-utils";

const pendingPlayers: ws[] = [];

function addPendingPlayer(socket: ws) {
	pendingPlayers.push(socket);
	sendSocketMessage([socket], { type: "waiting", waiting: true });
}

function removePendingPlayer(socket: ws) {
	const index = pendingPlayers.indexOf(socket);
	if (index !== -1) {
		pendingPlayers.splice(index, 1);
	}
}

function getPendingPlayers(): [ws, ws] | null {
	if (pendingPlayers.length >= 2) {
		const player1Socket = pendingPlayers.shift()!;
		const player2Socket = pendingPlayers.shift()!;
		return [player1Socket, player2Socket];
	}
	return null;
}

export { addPendingPlayer, getPendingPlayers, removePendingPlayer };
