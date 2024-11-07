import { Link, useParams } from "react-router-dom";
import { ChevronLeftIcon, SendHorizontalIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import PageContainer from "@/components/page-container";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const messages = [
  {
    id: 1,
    sender: "Alice",
    message: "Hey there! How's it going?",
    timestamp: "2023-10-27T10:15:00",
  },
  {
    id: 2,
    sender: "Bob",
    message: "Hi Alice! I'm doing well, just busy with work. How about you?",
    timestamp: "2023-10-27T10:16:30",
  },
  {
    id: 3,
    sender: "Alice",
    message: "Same here, just trying to keep up. Any plans for the weekend?",
    timestamp: "2023-10-27T10:17:15",
  },
  {
    id: 4,
    sender: "Bob",
    message: "Not much planned yet. Maybe just relax a bit. You?",
    timestamp: "2023-10-27T10:18:00",
  },
  {
    id: 5,
    sender: "Alice",
    message: "I might go hiking if the weather's nice!",
    timestamp: "2023-10-27T10:19:10",
  },
  {
    id: 6,
    sender: "Bob",
    message: "Sounds awesome! Hope you get good weather!",
    timestamp: "2023-10-27T10:20:05",
  },
  {
    id: 7,
    sender: "Bob",
    message: "Sounds awesome! Hope you get good weather!",
    timestamp: "2023-10-27T10:20:05",
  },
  {
    id: 8,
    sender: "Bob",
    message: "Sounds awesome! Hope you get good weather!",
    timestamp: "2023-10-27T10:20:05",
  },
  {
    id: 9,
    sender: "Bob",
    message: "Sounds last awesome! Hope you get good weather!",
    timestamp: "2023-10-27T10:20:05",
  },
];

export default function MessagePage() {
  const { requestId } = useParams();
  const currentUser = "Bob";

  return (
    <PageContainer className="grid h-[calc(100%-64px)] grid-rows-[3rem_auto_7rem] bg-muted">
      <div className="flex w-full items-center justify-between border-b bg-background px-4">
        <Link to="/crm/messages" className="text-blue-500 md:hidden">
          <ChevronLeftIcon className="size-6" />
        </Link>
        <p className="text-sm font-medium">Request #{requestId}</p>
        <Button>Open request</Button>
      </div>
      <div className="overflow-y-auto px-4">
        {messages.map((msg) => (
          <Message
            key={msg.id}
            sender={msg.sender}
            message={msg.message}
            timestamp={msg.timestamp}
            isSender={msg.sender === currentUser}
          />
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Message sent");
        }}
        className="flex items-center justify-center gap-4 bg-background p-4 pb-8"
      >
        <Textarea placeholder="Type a message..." />
        <Button type="submit" className="uppercase">
          <SendHorizontalIcon />
          <span className="hidden sm:block">Send</span>
        </Button>
      </form>
    </PageContainer>
  );
}

interface MessageProps {
  sender: string;
  message: string;
  timestamp: string;
  isSender: boolean;
}

function Message({ sender, message, timestamp, isSender }: MessageProps) {
  return (
    <div
      className={cn("mb-4 flex justify-start", {
        "justify-end": isSender,
      })}
    >
      <div
        className={cn(
          "max-w-xs rounded-3xl bg-background p-3 text-accent-foreground shadow-md",
          {
            "rounded-tl-none": !isSender,
            "rounded-br-none bg-primary text-primary-foreground": isSender,
          },
        )}
      >
        <p className="text-sm">{sender}</p>
        <p className="text-sm">{message}</p>
        <p
          className={cn("mt-1 text-right text-xs text-muted-foreground", {
            "text-muted": isSender,
          })}
        >
          {format(new Date(timestamp), "Pp")}
        </p>
      </div>
    </div>
  );
}
