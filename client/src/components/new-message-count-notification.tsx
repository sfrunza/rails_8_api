import { cn } from "@/lib/utils";

interface NewMessageCountNotificationProps {
  count: number;
  className?: string;
}

export default function NewMessageCountNotification({
  count,
  className,
}: NewMessageCountNotificationProps) {
  return (
    <span
      className={cn(
        "flex size-4 items-center justify-center rounded-full bg-destructive p-2 text-xs text-destructive-foreground",
        className,
      )}
    >
      {count}
    </span>
  );
}
