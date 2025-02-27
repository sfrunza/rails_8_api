import useSWR from "swr";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageContainer from "@/components/page-container";
import {
  statusBgColors,
  statusTextColors,
  tabOptions,
} from "@/constants/request";
import RequestsTable from "./requests-table";
import { useAppDispatch, useAppSelector } from "@/store";
import { setFilter, TFilter } from "@/slices/requests-slice";
import { TablePagination } from "./table-pagination";
import { TFullRequest } from "@/types/request";

export type StatusCounts = Record<TFilter, number>;

type RequestData = {
  requests: TFullRequest[];
  total_pages: number;
};

export default function RequestsPage() {
  const dispatch = useAppDispatch();
  const { filter, page } = useAppSelector((state) => state.requests);
  const { data } = useSWR<StatusCounts>(`/requests/status_counts`);

  const { data: requestsData } = useSWR<RequestData>(
    `/requests?filter=${filter}&page=${page}`,
  );

  return (
    <PageContainer className="p-4 pb-28 lg:rounded-tl-2xl">
      <Tabs
        value={filter}
        onValueChange={(val) => {
          dispatch(setFilter(val as TFilter));
        }}
      >
        <ScrollArea className="pb-2">
          <TabsList className="h-12">
            {tabOptions.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={`${statusTextColors[tab.value]} data-[state=active]:${statusTextColors[tab.value]} h-full w-[190px] space-x-2`}
              >
                <span>{tab.label}</span>
                <span
                  className={`${statusBgColors[tab.value]} rounded-full px-1 text-xs font-semibold text-muted`}
                >
                  {data?.[tab.value] ?? "0"}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Tabs>
      {requestsData && <RequestsTable requests={requestsData.requests} />}
      {requestsData && (
        <TablePagination totalPages={requestsData.total_pages} />
      )}
    </PageContainer>
  );
}
