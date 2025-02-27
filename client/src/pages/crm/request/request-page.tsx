import { useParams } from "react-router";
import useRequest from "@/hooks/use-request";
import useRequestSubscription from "@/hooks/use-request-subscription";
import useSyncWithRedux from "@/hooks/use-sync-with-redux";
import Spinner from "@/components/spinner";
import TabsNav from "./_components/tabs-nav";
import TopNav from "./_components/top-nav";

export default function RequestPage() {
  const { id } = useParams();
  const { data, error, isLoading } = useRequest(Number(id));
  // Sync with Redux
  useSyncWithRedux(data);

  // subscribe to the request channel
  useRequestSubscription(data?.id);

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center md:h-[calc(100vh-40px)]">
        <Spinner />
        {/* <p>Loading</p> */}
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center py-80 md:py-96">
        <p>{error.message}</p>
      </div>
    );

  return (
    <>
      <TopNav />
      <TabsNav />
    </>
  );
}
