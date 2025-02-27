import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { MessageCircleMore } from "lucide-react";
import { api } from "@/api";
import { useAppSelector } from "@/store";
import cable from "@/api/WebSocketConnection";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import NewMessageCountNotification from "@/components/new-message-count-notification";

export default function MessageNotification() {
  const [unviewedCount, setUnviewedCount] = useState<number>(0);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    async function fetchUnviewedCount() {
      try {
        const { data } = await api.get("/notifications");
        setUnviewedCount(data.notifications_count);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUnviewedCount();

    const channel = cable.subscriptions.create(
      { channel: "NotificationsChannel", user_id: user?.id },
      {
        connected() {
          // console.log("Connected to RequestChannel");
        },
        disconnected() {
          // console.log("Disconnected from RequestChannel");
        },
        received(data) {
          setUnviewedCount(data.notifications_count);
        },
      },
    );

    return () => {
      channel.unsubscribe();
    };
  }, [setUnviewedCount]);

  return (
    <div className="relative">
      <NavLink
        to="messages"
        viewTransition
        className={({ isActive }) =>
          cn(
            buttonVariants({ variant: isActive ? "outline" : "ghost" }),
            "size-10 rounded-[36%] [&_svg]:size-7",
            !isActive && "text-white",
          )
        }
      >
        {/* <div className="relative"> */}
        <MessageCircleMore />
        {/* </div> */}
      </NavLink>
      {unviewedCount > 0 && (
        <span className="absolute -right-0.5 -top-0.5">
          <NewMessageCountNotification count={unviewedCount} />
        </span>
      )}
    </div>
  );
}
