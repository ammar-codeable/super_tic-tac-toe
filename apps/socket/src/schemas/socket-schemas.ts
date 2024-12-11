import { z } from "zod";

export const MarkSchema = z.enum(["X", "O"]);

export const InitMessageSchema = z.object({
	type: z.literal("init"),
	gameId: z.string(),
});

export const PlayerMessageSchema = z.object({
	type: z.literal("player"),
	gameId: z.string(),
	player: MarkSchema,
});

export const MoveMessageSchema = z.object({
	type: z.literal("move"),
	gameId: z.string(),
	move: z.tuple([z.number(), z.number()]),
});

export const ResignMessageSchema = z.object({
	type: z.literal("resign"),
	gameId: z.string(),
});

export const ChatMessageSchema = z.object({
	type: z.literal("chat"),
	gameId: z.string(),
	chat: z.object({
		text: z.string(),
	}),
});

export const DrawOfferMessageSchema = z.object({
	type: z.literal("draw-offer"),
	gameId: z.string(),
	action: z.enum(["offer", "accept"]),
});

export const RematchMessageSchema = z.object({
	type: z.literal("rematch"),
	gameId: z.string(),
	action: z.enum(["request", "accept", "decline"]),
});

export const ClientMessageSchema = z.discriminatedUnion("type", [
	InitMessageSchema,
	PlayerMessageSchema,
	MoveMessageSchema,
	ResignMessageSchema,
	ChatMessageSchema,
	DrawOfferMessageSchema,
	RematchMessageSchema,
]);

export type Mark = z.infer<typeof MarkSchema>;
export type ClientMessage = z.infer<typeof ClientMessageSchema>;
export type InitMessage = z.infer<typeof InitMessageSchema>;
export type PlayerMessage = z.infer<typeof PlayerMessageSchema>;
export type MoveMessage = z.infer<typeof MoveMessageSchema>;
export type ResignMessage = z.infer<typeof ResignMessageSchema>;
export type ChatMessage = z.infer<typeof ChatMessageSchema>;
export type DrawOfferMessage = z.infer<typeof DrawOfferMessageSchema>;
export type RematchMessage = z.infer<typeof RematchMessageSchema>;
