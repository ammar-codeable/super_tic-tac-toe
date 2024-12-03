import { ChatMessageSchema } from "@repo/types/chat-schemas";
import { z } from "zod";

export const MarkSchema = z.enum(["X", "O"]);

export const ClientMessageSchema = z.discriminatedUnion("type", [
	z.object({
		type: z.literal("player"),
		player: MarkSchema,
	}),
	z.object({
		type: z.literal("move"),
		move: z.tuple([z.number(), z.number()]),
	}),
	z.object({
		type: z.literal("resign"),
	}),
	z.object({
		type: z.literal("chat"),
		chat: z.object({
			text: z.string(),
		}),
	}),
	z.object({
		type: z.literal("draw-offer"),
		action: z.enum(["offer", "accept"]),
	}),
	z.object({
		type: z.literal("rematch"),
		action: z.enum(["request", "accept", "decline"]),
	}),
]);