import { useEffect } from "react";

import cable from "@/api/WebSocketConnection";
import { useAppDispatch } from "@/store";
import { setRequest } from "@/slices/request-slice";
import { TFullRequest } from "@/types/request";

export default function useRequestSubscription(
  requestId: number | undefined,
) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!requestId) return;

    const channel = cable.subscriptions.create(
      { channel: "RequestChannel", request_id: requestId },
      {
        connected() {
          console.log("Connected to RequestChannel");
        },
        disconnected() {
          console.log("Disconnected from RequestChannel");
        },
        received(data: TFullRequest) {
          console.log("AdminRequestChannel", data);
          dispatch(setRequest(data));
        },
        ensureActiveConnection() {
          console.log("sukaaaa");
        },
      },
    );

    return () => {
      channel.unsubscribe();
      console.log("Disconnected from RequestChannel");
    };
  }, [requestId]);
}
