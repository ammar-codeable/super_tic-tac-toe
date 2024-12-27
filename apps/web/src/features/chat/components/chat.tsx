import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { ChatMessage } from "@super-tic-tac-toe/types/chat-schemas";
import { useRef } from "react";

function Chat({
  messages,
  setMessages,
  socket,
  playerMark,
}: {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  socket: (message: any) => void;
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
      socket({ type: "chat", chat: { text } });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="mb-3 flex h-full flex-col rounded-md border bg-background/60 shadow-md">
      <div className="shrink-0 border-b p-3">
        <h2 className="font-semibold">Chat</h2>
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-3 p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  (playerMark === "X" ? "player1" : "player2") ===
                  message.sender
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`break-words rounded-2xl px-4 py-2 ${
                    (playerMark === "X" ? "player1" : "player2") ===
                    message.sender
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="shrink-0 border-t bg-muted/30 p-3">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            ref={textareaRef}
            placeholder="Type your message..."
            className="max-h-[100px] min-h-[50px] resize-none rounded-xl bg-background"
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-primary px-4 text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;