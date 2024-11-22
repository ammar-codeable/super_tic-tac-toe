import { useRef } from "react";
import { Textarea } from "./ui/textarea";

function Chat({
  messages,
  setMessages,
  socket,
}: {
  messages: string[];
  setMessages: React.Dispatch<React.SetStateAction<string[]>>;
  socket: WebSocket | null;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = textareaRef.current?.value.trim();
    if (message) {
      textareaRef.current!.value = "";
      setMessages((messages) => [...messages, message]);
      socket!.send(JSON.stringify({ chat: message }));
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
              className="player ml-auto max-w-[80%] break-words rounded-lg bg-primary p-2 text-primary-foreground"
            >
              {message}
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
