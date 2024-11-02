import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import PageContainer from '@/components/page-container';

export const messagesData = [
  {
    request_id: 1234,
    date: new Date(),
    customer: {
      first_name: 'Sergiu',
      last_name: 'Frunza',
    },
    has_unread_messages: true,
    color: 'bg-green-500',
    last_message:
      "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive.",
  },
  {
    request_id: 2345,
    date: new Date(),
    customer: {
      first_name: 'Sergiu',
      last_name: 'Frunza',
    },
    has_unread_messages: true,
    color: 'bg-sky-500',
    last_message:
      "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive.",
  },
  {
    request_id: 3456,
    date: new Date(),
    customer: {
      first_name: 'Sergiu',
      last_name: 'Frunza',
    },
    has_unread_messages: true,
    color: 'bg-indigo-500',
    last_message:
      "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive.",
  },
  {
    request_id: 4567,
    date: new Date(),
    customer: {
      first_name: 'Sergiu',
      last_name: 'Frunza',
    },
    has_unread_messages: true,
    color: 'bg-slate-800',
    last_message:
      "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive.",
  },
  {
    request_id: 5678,
    date: new Date(),
    customer: {
      first_name: 'Sergiu',
      last_name: 'Frunza',
    },
    has_unread_messages: true,
    color: 'bg-amber-500',
    last_message:
      "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive.",
  },
  {
    request_id: 2342,
    date: new Date(),
    customer: {
      first_name: 'Sergiu',
      last_name: 'Frunza',
    },
    has_unread_messages: true,
    color: 'bg-amber-500',
    last_message:
      "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive.",
  },
  {
    request_id: 5458,
    date: new Date(),
    customer: {
      first_name: 'Sergiu',
      last_name: 'Frunza',
    },
    has_unread_messages: true,
    color: 'bg-amber-500',
    last_message:
      "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive.",
  },
  {
    request_id: 5578,
    date: new Date(),
    customer: {
      first_name: 'Sergiu',
      last_name: 'Frunza',
    },
    has_unread_messages: true,
    color: 'bg-amber-500',
    last_message:
      "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive.",
  },
  {
    request_id: 3433,
    date: new Date(),
    customer: {
      first_name: 'Sergiu',
      last_name: 'Frunza',
    },
    has_unread_messages: true,
    color: 'bg-amber-500',
    last_message:
      "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive.",
  },
  {
    request_id: 5756,
    date: new Date(),
    customer: {
      first_name: 'Sergiu',
      last_name: 'Frunza',
    },
    has_unread_messages: true,
    color: 'bg-amber-500',
    last_message:
      "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive.",
  },
  {
    request_id: 5567,
    date: new Date(),
    customer: {
      first_name: 'Sergiu',
      last_name: 'Frunza',
    },
    has_unread_messages: true,
    color: 'bg-amber-500',
    last_message:
      "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive.",
  },
  {
    request_id: 5556,
    date: new Date(),
    customer: {
      first_name: 'Sergiu',
      last_name: 'Frunza',
    },
    has_unread_messages: true,
    color: 'bg-amber-500',
    last_message:
      "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive.",
  },
  {
    request_id: 2424,
    date: new Date(),
    customer: {
      first_name: 'Sergiu',
      last_name: 'Frunza',
    },
    has_unread_messages: true,
    color: 'bg-amber-500',
    last_message:
      "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive.",
  },
  {
    request_id: 3542,
    date: new Date(),
    customer: {
      first_name: 'Sergiu',
      last_name: 'Frunza',
    },
    has_unread_messages: true,
    color: 'bg-amber-500',
    last_message:
      "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive.",
  },
];

export default function MessagesPage() {
  const { requestId } = useParams();
  const { pathname } = useLocation();
  const pageUrl = '/crm/messages';

  return (
    <div className="grid lg:rounded-tl-2xl lg:grid-cols-[20rem_1fr] h-full overflow-hidden bg-muted">
      <PageContainer
        className={cn('pb-28 hidden lg:block border-r', {
          block: pathname === pageUrl,
        })}
      >
        <div className="flex w-full flex-col divide-y">
          {messagesData.map((item) => {
            return <MessageItem item={item} key={item.request_id} />;
          })}
        </div>

        <p className="text-xs text-center text-muted-foreground mt-2">
          End of messages
        </p>
      </PageContainer>
      {requestId ? (
        <Outlet />
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <p className="font-semibold">Select a request</p>
        </div>
      )}
    </div>
  );
}

function MessageItem({ item }: { item: any }) {
  const { requestId } = useParams();
  const isActive = requestId === item.request_id.toString();
  return (
    <button
      className={cn(
        'flex flex-col relative items-start gap-2 p-3 text-left text-sm transition-all hover:bg-accent',
        {
          'bg-muted': isActive,
        }
      )}
    >
      <Link to={`/crm/messages/${item.request_id}`}>
        <div className="flex gap-2 items-center">
          <div>
            <div
              className={`${item.color} flex justify-center items-center shadow-lg size-10 rounded-full text-white font-semibold ring-background ring-2`}
            >
              {item.customer.first_name[0]}
              {item.customer.last_name[0]}
            </div>
          </div>
          <div>
            <div className="flex w-full flex-col px-2">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">
                    Request #{item.request_id}
                  </div>
                  {item.has_unread_messages && (
                    <span className="flex size-2 rounded-full bg-blue-600"></span>
                  )}
                </div>
                <div className="ml-auto text-xs text-foreground">
                  {format(item.date, 'dd MMM yyyy')}
                </div>
              </div>
              <div className="text-xs font-medium">{`${item.customer.first_name} ${item.customer.last_name}`}</div>
            </div>
            <div className="px-2 line-clamp-1 text-xs text-muted-foreground">
              {item.last_message}
            </div>
          </div>
        </div>
      </Link>
      {isActive && (
        <div className="absolute right-0 bottom-0 w-[3px] h-full bg-primary"></div>
      )}
    </button>
  );
}
