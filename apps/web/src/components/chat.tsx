import { ChatMessage } from "@repo/types/chat-types";
import { useRef } from "react";
import { Textarea } from "./ui/textarea";

function Chat({
  messages,
  setMessages,
  socket,
  playerMark,
}: {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  socket: WebSocket | null;
  playerMark: string | null;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = textareaRef.current?.value.trim();
    if (text && socket) {
      textareaRef.current!.value = "";
      const newMessage = {
        text,
        sender:
          playerMark === "X" ? "player1" : ("player2" as "player1" | "player2"),
      };
      setMessages((prev) => [...prev, newMessage]);
      socket.send(JSON.stringify({ chat: { text } }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex h-full flex-col gap-2 rounded-md border p-2">
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`max-w-[80%] break-words rounded-lg p-2 ${
                (playerMark === "X" ? "player1" : "player2") === message.sender
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "mr-auto bg-secondary text-secondary-foreground"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
      </div>
      <div className="h-24 shrink-0">
        <form onSubmit={handleSubmit} className="flex h-full gap-2">
          <Textarea
            ref={textareaRef}
            placeholder="Type your message..."
            className="resize-none"
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            className="rounded-md bg-primary px-4 text-primary-foreground hover:bg-primary/90"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
