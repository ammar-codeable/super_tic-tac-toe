import { ChatMessageSchema } from "@repo/types/chat-schemas";
import { z } from "zod";

export const ServerMessageSchema = z.discriminatedUnion("type", [
	z.object({
		type: z.literal("init"),
		gameId: z.string(),
	}),
	z.object({
		type: z.literal("waiting"),
		waiting: z.boolean(),
	}),
	z.object({
		type: z.literal("mark"),
		mark: z.enum(["X", "O"]),
	}),
	z.object({
		type: z.literal("game"),
		game: z.object({
			moveHistory: z.array(z.tuple([z.number(), z.number()])),
			currentMove: z.number(),
		}),
	}),
	z.object({
		type: z.literal("result"),
		result: z.enum(["X", "O", "DRAW", "X_RESIGNED", "O_RESIGNED"]),
	}),
	z.object({
		type: z.literal("chat"),
		chat: z.array(ChatMessageSchema),
	}),
	z.object({
		type: z.literal("error"),
		error: z.string(),
	}),
	z.object({
		type: z.literal("draw-offer"),
	}),
	z.object({
		type: z.literal("rematch-request"),
		data: z.object({}).optional(),
	}),
	z.object({
		type: z.literal("rematch-declined"),
		data: z.object({}).optional(),
	}),
	z.object({
		type: z.literal("rematch-accepted"),
	}),
]);

export type ServerMessage = z.infer<typeof ServerMessageSchema>;
