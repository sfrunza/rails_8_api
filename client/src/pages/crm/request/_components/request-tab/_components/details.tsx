// import {
//   convertMinutesToHoursAndMinutes,
//   formatDate,
//   formatMoney,
//   formatPhone,
// } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/store";
import {
  convertMinutesToHoursAndMinutes,
  formatMoney,
  priceObjectToString,
  timeObjectToString,
  timeWindowToString,
} from "@/lib/helpers";
import { formatDate, formatPhone } from "@/lib/utils";

export default function Details() {
  const request = useAppSelector((state) => state.request.request);
  if (!request) return null;

  const {
    id,
    moving_date,
    customer,
    origin,
    destination,
    stops,
    start_time_window,
    end_time_window,
    crew_size,
    travel_time,
    rate,
    work_time,
    total_time,
    total_price,
    details,
    packing,
  } = request;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="text-sm md:col-span-1">
          <div className="flex items-baseline justify-between">
            <p className="font-medium">Request</p>
            <p>#{id}</p>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="font-medium">Client</p>
            <div className="text-right">
              <p>
                {customer?.first_name} {customer?.last_name}
              </p>
              <p>{formatPhone(customer?.phone)}</p>
              <p>{customer?.email}</p>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="font-medium">Date</p>
            <p>{formatDate(moving_date)}</p>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="font-medium">Start time</p>
            <p>{timeWindowToString(start_time_window, end_time_window)}</p>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="font-medium">Hourly rate</p>
            <p>{formatMoney(rate || 0)}</p>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="font-medium">Crew size</p>
            <p>{crew_size} movers</p>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="font-medium">Travel time</p>
            <p>{convertMinutesToHoursAndMinutes(travel_time || 0)}</p>
          </div>

          <div className="flex items-baseline justify-between">
            <p className="font-medium">Estimated labor time</p>
            <p>{timeObjectToString(work_time)}</p>
          </div>

          <div className="flex items-baseline justify-between">
            <p className="font-medium">Estimated total time</p>
            <p>{timeObjectToString(total_time)}</p>
          </div>

          <div className="flex items-baseline justify-between">
            <p className="font-medium">Estimated quote</p>
            <p>{priceObjectToString(total_price)}</p>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="font-medium">Paid deposit</p>
            <p>0</p>
          </div>
        </div>
      </div>
      <Separator />
      <div className="grid gap-6 text-sm md:grid-cols-2">
        <div>
          <p>
            <span className="mr-2 font-bold">Origin</span>({origin?.floor})
          </p>
          <div>
            <p>{origin?.street}</p>
            <p>
              {origin?.city}, {origin?.state} {origin?.zip}
            </p>
          </div>
        </div>
        <div>
          <p>
            <span className="mr-2 font-bold">Destination</span>(
            {destination?.floor})
          </p>
          <div>
            <p>{destination?.street}</p>
            <p>
              {destination?.city}, {destination?.state} {destination?.zip}
            </p>
          </div>
        </div>
        {stops?.map((stop, i) => (
          <div key={i}>
            <p>
              <span className="mr-2 font-bold">
                {stop.type === "pick_up" && "Extra pickup"}
                {stop.type === "drop_off" && "Extra dropoff"}
              </span>
              ({stop.floor})
            </p>
            <div>
              <p>{stop.street}</p>
              <p>
                {stop.city}, {stop.state} {stop.zip}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Separator />
      <div className="grid text-sm md:grid-cols-2">
        <p className="font-bold uppercase">Additional Details</p>
        <p className="text-right">{details?.comments}</p>
      </div>
      <Separator />
      <div className="flex justify-between text-sm">
        <p className="font-bold uppercase">Packing</p>
        <p>{packing?.name}</p>
        {/* <p>packing</p> */}
      </div>
      <Separator />
    </div>
  );
}
