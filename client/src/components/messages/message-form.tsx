import { useState } from "react";
import { SendHorizontalIcon } from "lucide-react";
import { api } from "@/api";
import { useAppSelector } from "@/store";
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/components/loading-button";

interface MessageFormProps {
  requestId: number;
}

export default function MessageForm({ requestId }: MessageFormProps) {
  const user = useAppSelector((state) => state.auth.user);
  const [body, setBody] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);

  async function handleSend() {
    if (!body || !user) return;
    setIsSending(true);
    try {
      const newMessage = {
        body: body,
        sender_role: user?.role,
        user_id: user?.id,
      };
      await api.post(`/requests/${requestId}/messages`, {
        message: newMessage,
      });
      setBody("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSend();
      }}
      className="flex gap-4 bg-background p-4 pb-8"
    >
      <Textarea
        placeholder="Type your message..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        wrap="off"
        className="resize-none"
      />
      <LoadingButton
        disabled={isSending}
        loading={isSending}
        type="submit"
        className="uppercase"
      >
        <span className="flex items-center gap-2">
          <SendHorizontalIcon />
          <span className="hidden sm:block">Send</span>
        </span>
      </LoadingButton>
    </form>
  );
}
