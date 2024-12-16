import { ChatMessageSchema } from "@super-tic-tac-toe/types/chat-schemas";
import { z } from "zod";

export const ServerInitMessageSchema = z.object({
  type: z.literal("init"),
  gameId: z.string(),
});

export const ServerWaitingMessageSchema = z.object({
  type: z.literal("waiting"),
  waiting: z.boolean(),
});

export const ServerMarkMessageSchema = z.object({
  type: z.literal("mark"),
  mark: z.enum(["X", "O"]),
});

export const ServerGameMessageSchema = z.object({
  type: z.literal("game"),
  game: z.object({
    moveHistory: z.array(z.tuple([z.number(), z.number()])),
    currentMove: z.number(),
  }),
});

export const ServerResultMessageSchema = z.object({
  type: z.literal("result"),
  result: z.enum(["X", "O", "DRAW", "X_RESIGNED", "O_RESIGNED"]),
});

export const ServerChatMessageSchema = z.object({
  type: z.literal("chat"),
  chat: z.array(ChatMessageSchema),
});

export const ServerErrorMessageSchema = z.object({
  type: z.literal("error"),
  error: z.string(),
});

export const ServerDrawOfferMessageSchema = z.object({
  type: z.literal("draw-offer"),
});

export const ServerRematchRequestMessageSchema = z.object({
  type: z.literal("rematch-request"),
  data: z.object({}).optional(),
});

export const ServerRematchDeclinedMessageSchema = z.object({
  type: z.literal("rematch-declined"),
  data: z.object({}).optional(),
});

export const ServerRematchAcceptedMessageSchema = z.object({
  type: z.literal("rematch-accepted"),
});

export const ServerMessageSchema = z.discriminatedUnion("type", [
  ServerInitMessageSchema,
  ServerWaitingMessageSchema,
  ServerMarkMessageSchema,
  ServerGameMessageSchema,
  ServerResultMessageSchema,
  ServerChatMessageSchema,
  ServerErrorMessageSchema,
  ServerDrawOfferMessageSchema,
  ServerRematchRequestMessageSchema,
  ServerRematchDeclinedMessageSchema,
  ServerRematchAcceptedMessageSchema,
]);

export type ServerMessage = z.infer<typeof ServerMessageSchema>;
export type ServerInitMessage = z.infer<typeof ServerInitMessageSchema>;
export type ServerWaitingMessage = z.infer<typeof ServerWaitingMessageSchema>;
export type ServerMarkMessage = z.infer<typeof ServerMarkMessageSchema>;
export type ServerGameMessage = z.infer<typeof ServerGameMessageSchema>;
export type ServerResultMessage = z.infer<typeof ServerResultMessageSchema>;
export type ServerChatMessage = z.infer<typeof ServerChatMessageSchema>;
export type ServerErrorMessage = z.infer<typeof ServerErrorMessageSchema>;
export type ServerDrawOfferMessage = z.infer<
  typeof ServerDrawOfferMessageSchema
>;
export type ServerRematchRequestMessage = z.infer<
  typeof ServerRematchRequestMessageSchema
>;
export type ServerRematchDeclinedMessage = z.infer<
  typeof ServerRematchDeclinedMessageSchema
>;
export type ServerRematchAcceptedMessage = z.infer<
  typeof ServerRematchAcceptedMessageSchema
>;
