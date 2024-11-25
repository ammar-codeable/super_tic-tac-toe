import { z } from "zod";
import { ChatMessageSchema } from "./chat-schemas";

export const ServerMessageSchema = z.discriminatedUnion("type", [
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
		result: z.string().nullable(),
	}),
	z.object({
		type: z.literal("chat"),
		chat: z.array(ChatMessageSchema),
	}),
]);

export type ServerMessage = z.infer<typeof ServerMessageSchema>;
