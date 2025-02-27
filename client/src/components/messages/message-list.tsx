import { useAppSelector } from "@/store";
import { useEffect, useRef } from "react";
import { MessageItem } from "./message-item";
import { TMessage } from "@/hooks/use-messages";
import { ScrollArea } from "../ui/scroll-area";

interface MessageItemProps {
  messages: TMessage[];
}

export default function MessageList({ messages }: MessageItemProps) {
  const user = useAppSelector((state) => state.auth.user);

  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, [messages]);

  return (
    // <div className="space-y-4 overflow-y-auto p-4">
    <ScrollArea className="space-y-4 px-4">
      {messages?.map((msg, index) => {
        const isSender = msg.user_id === user?.id;
        return (
          <MessageItem
            key={index}
            message={msg}
            isSender={isSender}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          />
        );
      })}
    </ScrollArea>
    // </div>
  );
}
