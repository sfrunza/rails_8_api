import { Link, useParams } from "react-router";
import { ChevronLeftIcon } from "lucide-react";
import Messages from "@/components/messages/messages";
import PageContainer from "@/components/page-container";
import { Button } from "@/components/ui/button";

export default function MessagePage() {
  const { requestId } = useParams();

  return (
    <PageContainer className="grid h-[calc(100%-64px)] grid-rows-[4rem_auto_7rem] bg-muted">
      <div className="relative flex w-full items-center justify-center border-b bg-background px-2">
        <Link
          to="/crm/messages"
          className="absolute left-2 text-blue-600 lg:hidden"
          viewTransition
        >
          <ChevronLeftIcon className="size-8" />
        </Link>
        <p className="font-semibold">Request #{requestId}</p>
        <Button className="absolute right-2" asChild>
          <Link to={`/crm/requests/${requestId}`}>
            <span className="hidden md:inline-block">Open request</span>
            <span className="md:hidden">Open</span>
          </Link>
        </Button>
      </div>
      <Messages requestId={Number(requestId)} />
    </PageContainer>
  );
}
