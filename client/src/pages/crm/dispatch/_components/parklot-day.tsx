import { format } from "date-fns";
import { useNavigate } from "react-router";
import useSWR from "swr";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TFullRequest } from "@/types/request";
import ParklotRequest from "./parklot-request";
import Spinner from "@/components/spinner";
import { useAppDispatch, useAppSelector } from "@/store";
import { setOpen, setSelectedId } from "@/slices/parklot-slice";
import { useIsMobile } from "@/hooks/use-mobile";
import { TTruck } from "@/types/truck";

const startTime = new Date();
startTime.setHours(7, 0); // Start at 7:00 AM
const endTime = new Date();
endTime.setHours(21, 0); // End at 9:00 PM
const interval = 60;

const timeSlots = generateTimeSlots(startTime, endTime, interval);

export default function ParklotDay() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const { selectedDate, selectedId } = useAppSelector((state) => state.parklot);
  const { data: trucks } = useSWR<TTruck[]>("/trucks?is_active=true");
  const { data: requests, isLoading } = useSWR<TFullRequest[]>(
    selectedDate
      ? `/requests/requests_by_date?moving_date=${format(selectedDate, "yyyy-MM-dd'T'05:00:00.000'Z'")}`
      : null,
  );

  function handleRequestClick(id: number) {
    if (selectedId === id) {
      navigate(`/crm/requests/${id}`);
      dispatch(setSelectedId(null));
    } else {
      dispatch(setSelectedId(id));
      if (isMobile) {
        dispatch(setOpen(true));
      }
    }
  }

  return (
    <ScrollArea className="relative h-fit w-full">
      <div className="grid grid-cols-[100px_auto] grid-rows-[45px_auto] lg:grid-cols-[140px_auto]">
        <div className="flex items-center justify-center border-b">
          {isLoading && <Spinner className="size-4" />}
        </div>
        <div className="row-span-2 grid grid-rows-[45px_auto]">
          <div className="grid grid-cols-[repeat(15,80px)] border-b">
            {timeSlots.map((time, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[8px] bottom-0 flex items-center gap-1 pb-2">
                  <div className="text-xs font-semibold">{time.digit}</div>
                  <div className="text-xs text-muted-foreground">
                    {time.suffix}
                  </div>
                </div>
                <div className="absolute -left-[1px] bottom-0 h-1 border-l"></div>
              </div>
            ))}
          </div>
          <div className="">
            {trucks?.map((truck, index) => {
              const truckRequests =
                requests?.filter((r) => r.truck_ids.includes(truck.id)) ?? [];
              return (
                <div
                  className="relative grid grid-cols-[repeat(15,80px)]"
                  key={index}
                >
                  {/* paint empty boxes start */}
                  {Array(15)
                    .fill("")
                    .map((_, i) => (
                      <div key={i} className="h-24 w-full border-b"></div>
                    ))}{" "}
                  {/* end */}
                  {truckRequests.map((request, index) => (
                    <ParklotRequest
                      key={index}
                      request={request}
                      selectedId={selectedId}
                      handleRequestClick={handleRequestClick}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={`sticky left-0 z-20 grid border-r [&_*]:h-24 [&_*]:border-b`}
        >
          {trucks?.map((truck, index) => (
            <div
              className="flex items-center justify-center bg-muted text-sm font-semibold"
              key={index}
            >
              {truck.name}
            </div>
          ))}
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

type TimeSlot = {
  digit: string;
  suffix: string;
};

function generateTimeSlots(
  startTime: Date,
  endTime: Date,
  interval: number,
): TimeSlot[] {
  const times = [];
  let current = startTime;

  while (current <= endTime) {
    const formattedTime = current.toLocaleString("en-US", {
      hour: "2-digit",
      hour12: true,
    });

    const [digit, suffix] = formattedTime.split(" ");
    times.push({ digit, suffix });
    current.setMinutes(current.getMinutes() + interval);
  }

  return times;
}
