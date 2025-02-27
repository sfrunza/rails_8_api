import { statusBgColors } from "@/constants/request";
import { timeWindowToString } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { TFullRequest } from "@/types/request";

type ParklotRequestProps = {
  request: TFullRequest;
  selectedId: number | null;
  handleRequestClick: (id: number) => void;
};

export default function ParklotRequest({
  request,
  selectedId,
  handleRequestClick,
}: ParklotRequestProps) {
  return (
    <div
      className={cn(
        "absolute top-1/2 flex h-5/6 -translate-y-1/2 transform flex-col justify-between rounded border-2 border-transparent px-2 py-1 text-xs font-semibold text-muted/85 hover:cursor-pointer",
        statusBgColors[request.status],
        {
          "border-dashed border-background": selectedId === request.id,
        },
      )}
      style={{
        left: `${calculateLeftOffset(request)}px`,
        width: `${calculateWidth(request)}px`,
      }}
      onClick={() => handleRequestClick(request.id)}
    >
      <p className="text-white">{`${request.customer?.first_name} ${request.customer?.last_name}`}</p>
      <div className="grid grid-cols-2">
        <p>Request #{request.id}</p>
        <p className="line-clamp-1">{request.size}</p>
      </div>
      <p>
        {timeWindowToString(request.start_time_window, request.end_time_window)}
      </p>
      <div className="flex items-center gap-2">
        <p>
          {request.origin?.city}, {request.origin?.state}
        </p>
        <p>&#8594;</p>
        <p>
          {request.origin?.city}, {request.origin?.state}
        </p>
      </div>
    </div>
  );
}

function calculateLeftOffset(request: TFullRequest) {
  const startTime = request.start_time_window;
  if (!startTime) return 0;

  // Convert the start time to a Date object
  const start = new Date(startTime * 1000);

  // Extract the hour and minute of the start time
  const startHour = start.getHours();
  const startMinute = start.getMinutes();

  // Calculate the total minutes from 7:00 AM to the start time
  const minutesFrom7AM = (startHour - 7) * 60 + startMinute;

  // If the start time is before 7:00 AM, return 0
  if (minutesFrom7AM < 0) return 0;

  // Convert the minutes to pixels (80 pixels per hour = 80px / 60 minutes)
  const pixelsPerMinute = 80 / 60;
  const offset = minutesFrom7AM * pixelsPerMinute;

  return offset;
}

function calculateWidth(request: TFullRequest) {
  const totalTimeMinutes = request.total_time?.max ?? 0;
  const pixelsPerMinute = 80 / 60;
  const width = totalTimeMinutes * pixelsPerMinute;
  return width;
}
