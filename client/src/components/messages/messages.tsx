import { useMessages } from "@/hooks/use-messages";
import MessageForm from "./message-form";
import MessageList from "./message-list";
import useRoomSubscription from "@/hooks/use-room-subscription";
import Spinner from "../spinner";

interface MessageProps {
  requestId: number;
}

export default function Messages({ requestId }: MessageProps) {
  const { messages, isLoading, error } = useMessages(requestId);

  useRoomSubscription(requestId);

  return (
    <>
      {isLoading && (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner />
        </div>
      )}
      {error && (
        <div className="flex h-full w-full items-center justify-center">
          <p>{error.message}</p>
        </div>
      )}
      {messages && <MessageList messages={messages ?? []} />}
      <MessageForm requestId={requestId} />
    </>
  );
}
