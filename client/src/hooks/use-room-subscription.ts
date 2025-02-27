import { useEffect } from "react";

import cable from "@/api/WebSocketConnection";
import { useSWRConfig } from "swr";

export default function useRoomSubscription(
  requestId: number | undefined,
) {
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (!requestId) return;

    const channel = cable.subscriptions.create(
      { channel: "ChatChannel", request_id: requestId },
      {
        connected() {
          console.log("Connected to ChatChannel");
        },
        disconnected() {
          console.log("Disconnected from ChatChannel");
        },
        received(data) {
          console.log("ChatChannel-----------------------");
          console.log("ChatChannel", data);
          mutate(`/requests/${requestId}/messages`);
        },
      },
    );

    return () => {
      channel.unsubscribe();
      console.log("Disconnected from ChatChannel");
    };
  }, [requestId, mutate]);
}
