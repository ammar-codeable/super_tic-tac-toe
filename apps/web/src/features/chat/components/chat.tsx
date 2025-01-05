import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useRef } from "react";

type Message = {
  text: string;
  fromSelf: boolean;
};

function MessageBubble({ message }: { message: Message }) {
  return (
    <div className={`flex ${message.fromSelf ? "justify-end" : "justify-start"}`}>
      <div
        className={`break-words rounded-2xl px-4 py-2 ${
          message.fromSelf
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}

function ChatInput({
  onSendMessage,
}: {
  onSendMessage: (text: string) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = textareaRef.current?.value.trim();
    if (text) {
      textareaRef.current!.value = "";
      onSendMessage(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
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
  );
}

function Chat({
  messages,
  setMessages,
  sendMessage,
}: {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  sendMessage: (message: any) => void;
}) {
  const handleSendMessage = (text: string) => {
    setMessages((prev) => [...prev, { text, fromSelf: true }]);
    sendMessage({ type: "chat", chat: text });
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
              <MessageBubble key={index} message={message} />
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="shrink-0 border-t bg-muted/30 p-3">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default Chat;
