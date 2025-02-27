import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";
import { CalendarDaysIcon, ClockIcon } from "lucide-react";
import { statusBgColors } from "@/constants/request";
import { useAppSelector } from "@/store";
import { timeWindowToString } from "@/lib/helpers";
import { useNavigate, useParams } from "react-router";
import StatusMessages from "./status-messages";
import Locations from "./locations";

export default function DateTimeCard() {
  const { id: currentPageId } = useParams();
  const navigate = useNavigate();
  const request = useAppSelector((state) => state.request.request);

  if (!request) return null;

  const {
    id,
    moving_date,
    status,
    start_time_window,
    end_time_window,
    can_edit_request,
    is_moving_from_storage,
    paired_request_id,
    service,
  } = request;

  const onDateAction = () => {};

  const onTimeAction = () => {};

  return (
    <Card>
      <CardHeader className="p-1.5 pb-0">
        <div
          className={`${
            statusBgColors[status]
          } relative flex flex-row items-center justify-between rounded-sm p-4 text-white`}
        >
          <div className="absolute left-4">
            <CardTitle>Request #{id}</CardTitle>
            <CardDescription className="text-white">
              {service?.name}
            </CardDescription>
          </div>
          <p className="flex-1 text-right text-xl font-bold lg:text-center lg:text-2xl">
            {status}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <StatusMessages />
        {paired_request_id && (
          <div className="border-b p-4">
            <div
              className={cn(
                "inline-flex h-12 w-full items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
              )}
            >
              <button
                className={cn(
                  "inline-flex h-full w-full items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
                  {
                    "bg-background font-semibold text-primary shadow":
                      !is_moving_from_storage,
                  },
                )}
                onClick={() =>
                  navigate(`/account/requests/${paired_request_id}`)
                }
                disabled={
                  !is_moving_from_storage && id === Number(currentPageId)
                }
              >
                Move to storage
              </button>
              <button
                className={cn(
                  "inline-flex h-full w-full items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
                  {
                    "bg-background font-semibold text-primary shadow":
                      is_moving_from_storage,
                  },
                )}
                onClick={() =>
                  navigate(`/account/requests/${paired_request_id}`)
                }
                disabled={
                  is_moving_from_storage && id === Number(currentPageId)
                }
              >
                Move from storage
              </button>
            </div>
          </div>
        )}
        {/* Moving Date/Time */}
        <div className="grid grid-cols-2 border-b p-4">
          <DateItem
            date={moving_date}
            label="Move Date"
            canEditRequest={can_edit_request}
            onClick={() => onDateAction()}
          />
          <TimeItem
            startTimeWindow={start_time_window}
            endTimeWindow={end_time_window}
            label="Start Time Window"
            canEditRequest={can_edit_request}
            onClick={() => onTimeAction()}
          />
        </div>
        {/* Delivery Date/Time */}
        <div className="grid grid-cols-2 border-b p-4">
          <DateItem
            date={"2025-01-01"}
            label="Delivery Date"
            canEditRequest={can_edit_request}
            onClick={() => onDateAction()}
          />
          <TimeItem
            startTimeWindow={start_time_window}
            endTimeWindow={end_time_window}
            label="Delivery Time Window"
            canEditRequest={can_edit_request}
            onClick={() => onTimeAction()}
          />
        </div>
        <Locations />
      </CardContent>
    </Card>
  );
}

function DateItem({
  date,
  label,
  canEditRequest,
  onClick,
}: {
  date: string | null;
  label: string;
  canEditRequest: boolean | undefined;
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <div className="col-span-1 flex flex-col items-baseline gap-2 space-y-1 lg:flex-row lg:items-center lg:gap-6">
      <div className="text-sm">
        <p className="text-muted-foreground">{label}</p>
        <p className="font-medium">{formatDate(date)}</p>
      </div>
      {canEditRequest && (
        <Button variant="outline" size="sm" onClick={onClick}>
          <CalendarDaysIcon />
          Edit date
        </Button>
      )}
    </div>
  );
}

function TimeItem({
  startTimeWindow,
  endTimeWindow,
  label,
  canEditRequest,
  onClick,
}: {
  startTimeWindow: number | null;
  endTimeWindow: number | null;
  label: string;
  canEditRequest: boolean | undefined;
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <div className="col-span-1 flex flex-col items-baseline gap-2 space-y-1 lg:flex-row lg:items-center lg:gap-6">
      <div className="text-sm">
        <p className="text-muted-foreground">{label}</p>
        <p className="font-medium">
          {timeWindowToString(startTimeWindow, endTimeWindow)}
        </p>
      </div>
      {canEditRequest && (
        <Button variant="outline" size="sm" onClick={onClick}>
          <ClockIcon />
          Edit Time
        </Button>
      )}
    </div>
  );
}
