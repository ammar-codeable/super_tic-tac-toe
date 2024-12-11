import { ServerMessage } from "@repo/types/server-message-schemas";
import ws from "ws";

export function sendSocketMessage(sockets: ws[], message: ServerMessage) {
	sockets.forEach((socket) => {
		if (socket.readyState === ws.OPEN) {
			socket.send(JSON.stringify(message));
		}
	});
}
