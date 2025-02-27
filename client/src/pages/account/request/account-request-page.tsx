// import Spinner from '@/components/Spinner';
// import { useParams } from "react-router-dom";

// import useRequest from "@/hooks/useRequest";
// import useRequestSubscription from "@/hooks/useRequestSubscription";
// import useSyncWithRedux from "@/hooks/useSyncWithRedux";

import { useParams } from "react-router";
import Spinner from "@/components/spinner";
import useRequest from "@/hooks/use-request";
import useRequestSubscription from "@/hooks/use-request-subscription";
import useSyncWithRedux from "@/hooks/use-sync-with-redux";
import DateTimeCard from "./_components/date-time-card";
// import DateTimeCard from "./date-time-card";

export default function AccountRequestPage() {
  const { id } = useParams();
  const { data, error, isLoading } = useRequest(Number(id));

  // Sync with Redux
  useSyncWithRedux(data);

  // Setup live updates with ActionCable
  useRequestSubscription(data?.id);

  // if (!request) return null;

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center gap-1 py-80 text-muted-foreground md:py-96">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center py-80 md:py-96">
        <p>{error.message}</p>
      </div>
    );

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12">
        <DateTimeCard />
        some card
      </div>
      <div className="col-span-12 lg:col-span-6">{/* <MoveSizeCard /> */}</div>

      <div className="col-span-12 lg:col-span-6">{/* <PackingCard /> */}</div>
      <div className="col-span-12">
        {/* {service && service?.name === "Flat Rate" ? (
        <QuoteDetailsCardFlatRate />
      ) : (
        <QuoteDetailsCard />
      )} */}
      </div>
    </div>
  );
}
