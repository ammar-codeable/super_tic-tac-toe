import express from "express";
import { WebSocketServer, WebSocket } from "ws";

const app = express();
const port = 8080;

const httpServer = app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", (ws) => {
	ws.on("error", console.error);

	ws.on("message", (data) => {
		wss.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN && client !== ws) {
				console.log(data.toString());
				client.send(data.toString());
			}
		});
	});
});
