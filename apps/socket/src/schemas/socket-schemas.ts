import { z } from "zod";

export const MarkSchema = z.enum(["X", "O"]);

export const ClientMessageSchema = z.discriminatedUnion("type", [
	z.object({
		type: z.literal("init"),
		gameId: z.string(),
	}),
	z.object({
		type: z.literal("player"),
		gameId: z.string(),
		player: MarkSchema,
	}),
	z.object({
		type: z.literal("move"),
		gameId: z.string(),
		move: z.tuple([z.number(), z.number()]),
	}),
	z.object({
		type: z.literal("resign"),
		gameId: z.string(),
	}),
	z.object({
		type: z.literal("chat"),
		gameId: z.string(),
		chat: z.object({
			text: z.string(),
		}),
	}),
	z.object({
		type: z.literal("draw-offer"),
		gameId: z.string(),
		action: z.enum(["offer", "accept"]),
	}),
	z.object({
		type: z.literal("rematch"),
		gameId: z.string(),
		action: z.enum(["request", "accept", "decline"]),
	}),
]);