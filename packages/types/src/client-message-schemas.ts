import { z } from "zod";

export const MarkSchema = z.enum(["X", "O"]);

export const ClientInitMessageSchema = z.object({
  type: z.literal("init"),
  gameId: z.string(),
});

export const ClientPlayerMessageSchema = z.object({
  type: z.literal("player"),
  gameId: z.string(),
  player: MarkSchema,
});

export const ClientMoveMessageSchema = z.object({
  type: z.literal("move"),
  gameId: z.string(),
  move: z.tuple([z.number(), z.number()]),
});

export const ClientResignMessageSchema = z.object({
  type: z.literal("resign"),
  gameId: z.string(),
});

export const ClientChatMessageSchema = z.object({
  type: z.literal("chat"),
  gameId: z.string(),
  chat: z.object({
    text: z.string(),
  }),
});

export const ClientDrawOfferMessageSchema = z.object({
  type: z.literal("draw-offer"),
  gameId: z.string(),
  action: z.enum(["offer", "accept"]),
});

export const ClientRematchMessageSchema = z.object({
  type: z.literal("rematch"),
  gameId: z.string(),
  action: z.enum(["request", "accept", "decline"]),
});

export const ClientMessageSchema = z.discriminatedUnion("type", [
ClientInitMessageSchema,
ClientPlayerMessageSchema,
ClientMoveMessageSchema,
ClientResignMessageSchema,
ClientChatMessageSchema,
ClientDrawOfferMessageSchema,
ClientRematchMessageSchema,
]);

export type Mark = z.infer<typeof MarkSchema>;
export type ClientMessage = z.infer<typeof ClientMessageSchema>;
export type InitMessage = z.infer<typeof ClientInitMessageSchema>;
export type PlayerMessage = z.infer<typeof ClientPlayerMessageSchema>;
export type MoveMessage = z.infer<typeof ClientMoveMessageSchema>;
export type ResignMessage = z.infer<typeof ClientResignMessageSchema>;
export type ChatMessage = z.infer<typeof ClientChatMessageSchema>;
export type DrawOfferMessage = z.infer<typeof ClientDrawOfferMessageSchema>;
export type RematchMessage = z.infer<typeof ClientRematchMessageSchema>;
