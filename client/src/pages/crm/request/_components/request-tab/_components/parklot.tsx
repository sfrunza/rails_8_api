import { useState } from "react";

import { format } from "date-fns";
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import useSWR from "swr";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TTruck } from "@/types/truck";

const startTime = new Date();
startTime.setHours(7, 0); // Start at 7:00 AM
const endTime = new Date();
endTime.setHours(21, 0); // End at 9:00 PM
const interval = 60;

const timeSlots = generateTimeSlots(startTime, endTime, interval); // From 7 AM to 9 PM

export default function Parklot() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const { data: parklotTruks } = useSWR<TTruck[]>("/parklots/trucks");

  return (
    <>
      <div className="border-b bg-background pb-2">
        <div className="mx-auto flex max-w-lg items-center justify-between bg-background px-4">
          <Button size="icon" variant="ghost" onClick={() => {}}>
            <ChevronLeftIcon className="size-5 text-primary" />
          </Button>
          <div className="flex items-center gap-4">
            <p className="text-sm font-medium sm:space-x-1">
              <span className="block sm:inline-block">
                {format(new Date(), "eeee,")}
              </span>
              <span className="block sm:inline-block">
                {format(new Date(), "MMMM do, yyyy")}
              </span>
            </p>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button size="icon" variant="ghost">
                  <CalendarDaysIcon className="size-5 text-primary" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0"
                align="start"
              ></PopoverContent>
            </Popover>
          </div>
          <Button size="icon" variant="ghost" onClick={() => {}}>
            <ChevronRightIcon className="size-6 text-primary" />
          </Button>
        </div>
      </div>
      <div className="bg-background">
        <ScrollArea
        // className="relative h-full w-full"
        >
          <div className="grid-cols-16 grid h-full w-full auto-rows-min">
            <div className="mb-2 flex items-end justify-center text-muted-foreground">
              loading
            </div>

            <div className="row-span-3 grid grid-rows-subgrid">
              <div className="grid-cols-15-custom grid h-14 -translate-x-2 items-end">
                {timeSlots.map((time, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center gap-1 pb-2">
                      <div className="text-xs font-semibold">{time.digit}</div>
                      <div className="text-xs text-muted-foreground">
                        {time.suffix}
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-[7px] h-1.5 border-l"></div>
                  </div>
                ))}
              </div>
              <div className="flex-1 overflow-hidden border-t">
                {parklotTruks?.map((_, truckIndex) => {
                  return (
                    <div key={truckIndex} className="relative flex">
                      {Array(30)
                        .fill(null)
                        .map((_, index) => (
                          <div
                            key={index}
                            className="h-14 w-20 flex-none border-b border-r"
                          />
                        ))}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="sticky left-0 z-20 border-t">
              <div>
                {parklotTruks?.map((truck, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex h-14 cursor-pointer items-center justify-center border-b border-r bg-muted text-sm font-semibold",
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {truck.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
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
