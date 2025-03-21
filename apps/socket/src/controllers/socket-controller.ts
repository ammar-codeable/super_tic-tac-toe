import {
	ClientMessage,
	ClientMessageSchema,
} from "@super-tic-tac-toe/types/client-message-schemas";
import { validateMessage } from "@super-tic-tac-toe/utils/validate-message";
import { WebSocket } from "ws";
import {
	addGame,
	createNewGame,
	findPlayerGame,
	getGame,
	getOpponent,
	getPlayerInGame,
	removeGame,
} from "../managers/game-manager";
import {
	addPendingPlayer,
	getPendingPlayers,
	removePendingPlayer,
} from "../managers/pending-players-manager";
import { sendSocketMessage } from "../utils/socket-utils";
import {
	handleChatMessage,
	handleDrawOffer,
	handleMove,
	handlePlayerMarkSelection,
	handleRematch,
	handleResignGame,
} from "./message-handlers";

export function handlePlayerConnection(ws: WebSocket) {
	addPendingPlayer(ws);

	const players = getPendingPlayers();
	if (players) {
		const [player1Socket, player2Socket] = players;
		const [gameId, game] = createNewGame(player1Socket, player2Socket);
		addGame(gameId, game);

		sendSocketMessage([player1Socket, player2Socket], { type: "init", gameId });
		sendSocketMessage([player1Socket, player2Socket], {
			type: "waiting",
			waiting: false,
		});
	}
}

export function handleMessage(ws: WebSocket, data: any) {
	try {
		const message: ClientMessage = validateMessage(
			data.toString(),
			ClientMessageSchema
		);

		const game = getGame(message.gameId);
		if (!game) {
			sendSocketMessage([ws], { type: "error", error: "Game not found" });
			return;
		}

		const currentPlayer = getPlayerInGame(message.gameId, ws);
		const opponent = getOpponent(message.gameId, ws);

		if (!currentPlayer || !opponent) {
			sendSocketMessage([ws], {
				type: "error",
				error: "Player not found in game",
			});
			return;
		}

		switch (message.type) {
			case "player":
				handlePlayerMarkSelection(currentPlayer, opponent, message.player);
				break;
			case "move":
				handleMove(message, game, currentPlayer, opponent);
				break;
			case "resign":
				handleResignGame(message.gameId, currentPlayer, opponent);
				break;
			case "chat":
				handleChatMessage(message, opponent);
				break;
			case "draw-offer":
				handleDrawOffer(message, currentPlayer, opponent);
				break;
			case "rematch":
				handleRematch(message, currentPlayer, opponent);
				break;
		}
	} catch (error) {
		// Instead of crashing, send an error message back to the client
		console.error("Error processing message:", error);
		sendSocketMessage([ws], {
			type: "error",
			error: "Invalid message format or schema",
		});
	}
}

export function handleDisconnect(ws: WebSocket) {
	removePendingPlayer(ws);

	const gameInfo = findPlayerGame(ws);
	if (!gameInfo) return;

	const [gameId, _] = gameInfo;
	const opponent = getOpponent(gameId, ws);

	removeGame(gameId);

	if (opponent) {
		opponent.socket.close();
	}
}
