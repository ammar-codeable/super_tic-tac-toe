import { z } from "zod";

export const ChatMessageSchema = z.object({
  text: z.string(),
  sender: z.enum(["player1", "player2"]),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;
