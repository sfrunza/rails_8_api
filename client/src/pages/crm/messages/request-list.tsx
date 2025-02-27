import { Link, useParams } from "react-router";
import useSWR from "swr";
import { format } from "date-fns";
import { statusBgColors } from "@/constants/request";
import { cn } from "@/lib/utils";
import { TStatus } from "@/types/request";
import NewMessageCountNotification from "@/components/new-message-count-notification";

export type ResponseData = {
  id: number;
  customer: {
    first_name: string;
    last_name: string;
  };
  status: TStatus;
  last_message_at: Date;
  last_message: string;
  new_messages_count: number;
};

export default function RequestList() {
  const { data, isLoading, error } =
    useSWR<ResponseData[]>(`/requests_messages`);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      // className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden"
      className="flex w-full flex-col divide-y"
    >
      {data?.map((item) => {
        return <MessageItem item={item} key={item.id} />;
      })}
    </div>
  );
}

function MessageItem({ item }: { item: ResponseData }) {
  const { requestId } = useParams();
  const isActive = requestId === item.id.toString();
  return (
    <Link to={`${item.id}`} viewTransition>
      <div
        className={cn(
          "relative grid grid-cols-[3rem_auto] items-center gap-2 px-4 py-2 text-left transition-all hover:bg-accent",
          {
            "bg-muted": isActive,
            "after:absolute after:bottom-0 after:right-0 after:top-0 after:h-full after:w-[3px] after:bg-primary after:content-['']":
              isActive,
          },
        )}
      >
        <div>
          <div
            className={`${statusBgColors[item.status]} flex h-11 w-11 items-center justify-center rounded-full border-2 border-muted font-semibold uppercase text-white shadow-icon`}
          >
            {item.customer.first_name[0]}
            {item.customer.last_name[0]}
          </div>
        </div>
        <div className="text-sm leading-5">
          <div className="flex items-center justify-between">
            <p className="font-bold">Request #{item.id}</p>
            <p className="text-xs text-foreground">
              {format(item.last_message_at, "dd MMM yyyy")}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">{`${item.customer.first_name} ${item.customer.last_name}`}</p>
          </div>
          <div className="grid grid-cols-[auto_auto] items-center justify-between">
            <p className="truncate pr-4 text-muted-foreground">
              {item.last_message}
            </p>
            {item.new_messages_count > 0 && (
              <NewMessageCountNotification count={item.new_messages_count} />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
