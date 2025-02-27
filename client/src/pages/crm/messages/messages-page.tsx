import { useEffect } from "react";
import { useSWRConfig } from "swr";
import { Outlet, useLocation, useParams } from "react-router";
import cable from "@/api/WebSocketConnection";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store";
import RequestList from "./request-list";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function MessagesPage() {
  const { requestId } = useParams();
  const { pathname } = useLocation();
  const user = useAppSelector((state) => state.auth.user);
  const pageUrl = "/crm/messages";
  const { mutate } = useSWRConfig();

  useEffect(() => {
    const channel = cable.subscriptions.create(
      { channel: "ChatsChannel", user_id: user?.id },
      {
        connected() {
          console.log("Connected to ChatsChannel");
        },
        disconnected() {
          console.log("Disconnected from ChatsChannel");
        },
        received(data) {
          console.log("ChatsChannel-----------------------");
          console.log("ChatsChannel", data);

          mutate("/requests_messages", data.data, false);
        },
        ensureActiveConnection() {
          console.log("sukaaaa");
        },
      },
    );

    return () => {
      channel.unsubscribe();
      console.log("Disconnected from ChatsChannel");
    };
  }, []);

  return (
    <div className="grid h-full overflow-hidden bg-muted lg:grid-cols-[20rem_1fr] lg:rounded-tl-2xl">
      <ScrollArea
        className={cn(
          "hidden h-[calc(100vh-64px)] overflow-y-auto border-r bg-background lg:block",
          {
            block: pathname === pageUrl,
          },
        )}
      >
        <RequestList />

        <p className="py-2 text-center text-xs text-muted-foreground">
          End of messages
        </p>
      </ScrollArea>
      {requestId ? (
        <Outlet />
      ) : (
        <div className="hidden h-full w-full items-center justify-center lg:flex">
          <p className="font-semibold">Select a request</p>
        </div>
      )}
    </div>
  );
}
