import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { readFileSync } from "fs";
import https from "https";
import { WebSocketServer } from "ws";
import {
	handleDisconnect,
	handleMessage,
	handlePlayerConnection,
} from "./controllers/socket-controller";

config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT;

let server;
if (process.env.NODE_ENV === "development") {
  server = app.listen(port);
}

if (process.env.NODE_ENV === "production") {
	const certPath = process.env.SSL_CERT_PATH;
	const keyPath = process.env.SSL_KEY_PATH;

	if (!certPath || !keyPath) {
		throw new Error(
			"SSL certificate paths not configured in environment variables"
		);
	}

	const httpsOptions = {
		cert: readFileSync(certPath),
		key: readFileSync(keyPath),
	};

	server = https.createServer(httpsOptions, app).listen(port);
}

const wss = new WebSocketServer({ server });

app.get("/player-count", (_, res) => {
	res.json({ count: wss.clients.size });
});

wss.on("connection", (ws) => {
	handlePlayerConnection(ws);

	ws.on("message", (data) => handleMessage(ws, data));
	ws.on("close", () => handleDisconnect(ws));
});
