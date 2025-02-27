import { useState } from "react";

import {
  CalendarIcon,
  Clock4Icon,
  DollarSignIcon,
  MapIcon,
  TruckIcon,
  UserRoundIcon,
} from "lucide-react";

import { formatDate, updateDateKeepingTime } from "@/lib/utils";

import { TIME_OPTIONS } from "@/constants/request";

import { CalendarWithRates } from "@/components/calendar-with-rates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SelectWithSearch from "@/components/ui/select-with-search";
import { useAppDispatch, useAppSelector } from "@/store";
import useCalendarRates from "@/hooks/use-calendar-rates";
import { updateField } from "@/slices/request-slice";
import { centsToDollars } from "@/lib/helpers";
import { TCalendarRate } from "@/types/rate";
import StartTimeRangeSelect from "@/components/start-time-range-select";
import WorkTimeRangeSelect from "@/components/work-time-range-select";

export default function DateTime() {
  const dispatch = useAppDispatch();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { request, changes } = useAppSelector((state) => state.request);
  const { updateRate } = useCalendarRates();

  if (!request) return null;

  const currentMovingDate = changes.moving_date ?? request.moving_date;
  const currentStartTimeWindow =
    changes.start_time_window ?? request.start_time_window;
  const currentEndTimeWindow =
    changes.end_time_window ?? request.end_time_window;
  const currentTravelTime = changes.travel_time ?? request.travel_time;
  const currentCrewSize = changes.crew_size ?? request.crew_size;
  const currentMinTotalTime = changes.min_total_time ?? request.min_total_time;
  const currentServiceId = changes.service_id ?? request.service_id;
  const currentRate = changes.rate ?? request.rate;

  async function handleSelectDate(selectedDate: Date, _: TCalendarRate) {
    const newStartTime = updateDateKeepingTime(
      currentStartTimeWindow,
      selectedDate!,
    );

    const newEndTime = updateDateKeepingTime(
      currentEndTimeWindow,
      selectedDate!,
    );

    dispatch(
      updateField({
        moving_date: new Date(selectedDate!).toISOString(),
        start_time_window: newStartTime,
        end_time_window: newEndTime,
      }),
    );

    updateRate(selectedDate.toISOString(), currentCrewSize, currentRate);

    setIsCalendarOpen(false);
  }

  function handleSelectCrewSize(crewSize: number) {
    dispatch(updateField({ crew_size: crewSize }));

    updateRate(currentMovingDate, crewSize, currentRate);
  }

  return (
    <div className="flex flex-wrap justify-start gap-4 bg-background p-4 shadow">
      <div className="w-48">
        <Label className="ml-8" htmlFor="movingDate">
          Move date
        </Label>
        <div className="flex items-center gap-2">
          <CalendarIcon className="size-5 min-w-5 text-muted-foreground" />
          <div className="flex-grow">
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-full border border-input p-2 font-normal shadow-sm"
                  id="movingDate"
                >
                  {currentMovingDate ? (
                    formatDate(currentMovingDate)
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarWithRates
                  mode="single"
                  selected={
                    currentMovingDate ? new Date(currentMovingDate) : undefined
                  }
                  onSelectDate={handleSelectDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <div className="w-60">
        <Label className="ml-8" htmlFor="startTime">
          Start time window
        </Label>
        <div className="flex items-center gap-2">
          <Clock4Icon className="ml-auto size-5 min-w-5 text-muted-foreground" />
          <div className="flex-grow">
            <StartTimeRangeSelect />
          </div>
        </div>
      </div>
      <div className="w-52">
        <Label className="ml-8" htmlFor="workTime">
          Work time
        </Label>
        <div className="flex items-center gap-2">
          <TruckIcon className="size-5 min-w-5 text-muted-foreground" />
          <div className="flex-grow">
            <WorkTimeRangeSelect />
          </div>
        </div>
      </div>
      <div className="w-28">
        <Label className="ml-8" htmlFor="travelTime">
          Travel time
        </Label>
        <div className="flex items-center gap-2">
          <MapIcon className="size-5 min-w-5 text-muted-foreground" />
          <div className="flex-grow">
            <SelectWithSearch
              options={TIME_OPTIONS}
              value={currentTravelTime}
              handleSelect={(val) =>
                dispatch(updateField({ travel_time: val }))
              }
              id="travelTime"
            />
          </div>
        </div>
      </div>
      <div className="w-28">
        <Label className="ml-8" htmlFor="crewSize">
          Crew size
        </Label>
        <div className="flex items-center gap-2">
          <UserRoundIcon className="size-5 min-w-5 text-muted-foreground" />
          <div className="flex-grow">
            <Input
              id="crewSize"
              pattern="[0-9]+"
              inputMode="numeric"
              value={currentCrewSize || ""}
              onChange={(e) => {
                const value = e.target.value;

                if (value === "") {
                  handleSelectCrewSize(0);
                }

                if (/^\d*$/.test(value)) {
                  handleSelectCrewSize(parseInt(value));
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-24">
        <Label className="ml-8" htmlFor="rate">
          {currentServiceId === 2 && "Flat "}Rate
        </Label>
        <div className="flex items-center gap-2">
          <DollarSignIcon className="size-5 min-w-5 text-muted-foreground" />
          <div className="flex-grow">
            <Input
              id="rate"
              pattern="[0-9]+"
              inputMode="numeric"
              value={centsToDollars(currentRate!) || ""}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  dispatch(
                    updateField({
                      rate: Math.round(parseFloat(value) * 100),
                    }),
                  );
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-28">
        <Label className="ml-8" htmlFor="minTotalTime">
          Min. hours
        </Label>
        <div className="flex items-center gap-2">
          <Clock4Icon className="size-5 min-w-5 text-muted-foreground" />
          <div className="flex-grow">
            <SelectWithSearch
              options={TIME_OPTIONS}
              value={currentMinTotalTime}
              handleSelect={(val: number) =>
                dispatch(updateField({ min_total_time: val }))
              }
              id="minTotalTime"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
