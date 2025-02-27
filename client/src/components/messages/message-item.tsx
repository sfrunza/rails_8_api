import { statusBgColors } from "@/constants/request";
import { TMessage } from "@/hooks/use-messages";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { forwardRef } from "react";

interface TMessageItemProps {
  message: TMessage;
  isSender: boolean;
}

export const MessageItem = forwardRef<HTMLDivElement, TMessageItemProps>(
  ({ message, isSender }, ref) => {
    return (
      <div
        className={cn("flex justify-start gap-2 py-2", {
          "justify-end": isSender,
        })}
        ref={ref}
      >
        {!isSender && (
          <div>
            <div
              className={`${statusBgColors[message.status]} flex min-h-11 min-w-11 items-center justify-center rounded-full border-2 border-muted font-semibold uppercase text-white shadow-icon`}
            >
              {message.user.first_name[0]}
              {message.user.last_name[0]}
            </div>
          </div>
        )}
        <div className="w-8/12 space-y-2 md:w-72">
          {!isSender && (
            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">
                  {message.user.first_name} {message.user.last_name}
                </p>
              </div>
            </div>
          )}
          <div
            className={cn(
              "rounded-3xl bg-background px-4 pb-1 pt-3 text-accent-foreground shadow",
              {
                "rounded-tl-none": !isSender,
                "rounded-br-none bg-primary text-primary-foreground": isSender,
              },
            )}
          >
            <p className="whitespace-pre-line text-sm">{message.body}</p>
            <p
              className={cn("mt-6 text-right text-xs text-muted-foreground", {
                "text-muted": isSender,
              })}
            >
              {format(new Date(message.created_at), "Pp")}
            </p>
          </div>
        </div>
      </div>
    );
  },
);
