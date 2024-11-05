import { Link, useParams } from 'react-router-dom';
import { ChevronLeftIcon, SendHorizontalIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import PageContainer from '@/components/page-container';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const messages = [
  {
    id: 1,
    sender: 'Alice',
    message: "Hey there! How's it going?",
    timestamp: '2023-10-27T10:15:00',
  },
  {
    id: 2,
    sender: 'Bob',
    message: "Hi Alice! I'm doing well, just busy with work. How about you?",
    timestamp: '2023-10-27T10:16:30',
  },
  {
    id: 3,
    sender: 'Alice',
    message: 'Same here, just trying to keep up. Any plans for the weekend?',
    timestamp: '2023-10-27T10:17:15',
  },
  {
    id: 4,
    sender: 'Bob',
    message: 'Not much planned yet. Maybe just relax a bit. You?',
    timestamp: '2023-10-27T10:18:00',
  },
  {
    id: 5,
    sender: 'Alice',
    message: "I might go hiking if the weather's nice!",
    timestamp: '2023-10-27T10:19:10',
  },
  {
    id: 6,
    sender: 'Bob',
    message: 'Sounds awesome! Hope you get good weather!',
    timestamp: '2023-10-27T10:20:05',
  },
  {
    id: 7,
    sender: 'Bob',
    message: 'Sounds awesome! Hope you get good weather!',
    timestamp: '2023-10-27T10:20:05',
  },
  {
    id: 8,
    sender: 'Bob',
    message: 'Sounds awesome! Hope you get good weather!',
    timestamp: '2023-10-27T10:20:05',
  },
  {
    id: 9,
    sender: 'Bob',
    message: 'Sounds last awesome! Hope you get good weather!',
    timestamp: '2023-10-27T10:20:05',
  },
];

export default function MessagePage() {
  const { requestId } = useParams();
  const currentUser = 'Bob';

  return (
    <PageContainer className="bg-muted grid grid-rows-[3rem_auto_7rem] h-[calc(100%-64px)]">
      <div className="flex bg-background w-full justify-between items-center border-b px-4">
        <Link to="/crm/messages" className="md:hidden text-blue-500">
          <ChevronLeftIcon className="size-6" />
        </Link>
        <p className="font-medium text-sm">Request #{requestId}</p>
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
          console.log('Message sent');
        }}
        className="p-4 pb-8 bg-background flex justify-center items-center gap-4"
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
      className={cn('flex justify-start mb-4', {
        'justify-end': isSender,
      })}
    >
      <div
        className={cn(
          'p-3 rounded-3xl max-w-xs bg-background text-accent-foreground shadow-md',
          {
            'rounded-tl-none': !isSender,
            'bg-primary text-primary-foreground rounded-br-none': isSender,
          }
        )}
      >
        <p className="text-sm">{sender}</p>
        <p className="text-sm">{message}</p>
        <p
          className={cn('text-xs text-right mt-1 text-muted-foreground', {
            'text-muted': isSender,
          })}
        >
          {format(new Date(timestamp), 'Pp')}
        </p>
      </div>
    </div>
  );
}
