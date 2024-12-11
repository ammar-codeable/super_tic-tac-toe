import { ServerMessage } from "@repo/types/server-message-schemas";
import { WebSocket } from "ws";

export function sendSocketMessage(
	sockets: WebSocket[],
	message: ServerMessage
) {
	sockets.forEach((socket) => {
		if (socket.readyState === WebSocket.OPEN) {
			socket.send(JSON.stringify(message));
		}
	});
}
