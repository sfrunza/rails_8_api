import { useState } from "react";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch, useAppSelector } from "@/store";

import { Separator } from "./ui/separator";
import { updateField } from "@/slices/request-slice";

const generateTimeOptions = (
  movingDate: string | null,
): { label: string; value: number }[] => {
  const options = [];
  let startOfDay = new Date().setHours(0, 0, 0, 0);

  if (movingDate) {
    startOfDay = new Date(movingDate).setHours(0, 0, 0, 0);
  }

  for (let i = 0; i < 48; i++) {
    // 48 intervals in a day (24 hours * 2)
    const time = new Date(startOfDay + i * 30 * 60 * 1000); // Add 30 minutes
    const label = time.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    const value = Math.floor(time.getTime() / 1000);
    options.push({ label, value });
  }

  return options;
};

export default function StartTimeRangeSelect() {
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);
  const [valueStart, setValueStart] = useState<string>("");
  const [valueEnd, setValueEnd] = useState<string>("");

  const dispatch = useAppDispatch();
  const { request, changes } = useAppSelector((state) => state.request);

  if (!request) return null;

  const surrentStartTimeWindow =
    changes.start_time_window ?? request.start_time_window;

  const surrentEndTimeWindow =
    changes.end_time_window ?? request.end_time_window;

  const currentMovingDate = changes.moving_date ?? request.moving_date;

  const timeOptions = generateTimeOptions(currentMovingDate);

  return (
    <div className="flex gap-[1px] rounded-md border shadow-sm">
      <Popover open={openStart} onOpenChange={setOpenStart}>
        <PopoverTrigger
          asChild
          className="rounded-r-none border-none shadow-none"
          id="startTime"
        >
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openStart}
            className="w-full justify-between p-2"
          >
            <span>
              {surrentStartTimeWindow
                ? timeOptions.find(
                    (framework) => framework.value === surrentStartTimeWindow,
                  )?.label
                : ""}
            </span>
            <CaretSortIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput />
            <CommandList>
              <CommandEmpty>No time found.</CommandEmpty>
              <CommandGroup>
                {timeOptions.map((framework) => (
                  <CommandItem
                    itemType="tel"
                    key={framework.value}
                    value={framework.label}
                    onSelect={(currentValue: string) => {
                      const newStartTimeValue = timeOptions.find(
                        (time) => time.label === currentValue,
                      )?.value;
                      dispatch(
                        updateField({ start_time_window: newStartTimeValue }),
                      );
                      setValueStart(
                        currentValue === valueStart ? "" : currentValue,
                      );
                      setOpenStart(false);
                    }}
                  >
                    {framework.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto",
                        valueStart === framework.label
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Separator className="h-9" orientation="vertical" />
      <Popover open={openEnd} onOpenChange={setOpenEnd}>
        <PopoverTrigger
          asChild
          className="rounded-l-none border-none shadow-none"
        >
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openEnd}
            className="w-full justify-between gap-0 p-2"
          >
            <span>
              {surrentEndTimeWindow
                ? timeOptions.find(
                    (framework) => framework.value === surrentEndTimeWindow,
                  )?.label
                : ""}
            </span>
            <span className="flex">
              <CaretSortIcon />
              <XIcon
                onClick={(e) => {
                  e.stopPropagation();
                  setValueEnd("");
                  dispatch(updateField({ end_time_window: null }));
                }}
              />
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput />
            <CommandList>
              <CommandEmpty>No time found.</CommandEmpty>
              <CommandGroup>
                {timeOptions.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.label}
                    onSelect={(currentValue: string) => {
                      const newStartTimeValue = timeOptions.find(
                        (time) => time.label === currentValue,
                      )?.value;
                      dispatch(
                        updateField({ end_time_window: newStartTimeValue }),
                      );
                      setValueEnd(
                        currentValue === valueEnd ? "" : currentValue,
                      );
                      setOpenEnd(false);
                    }}
                  >
                    {framework.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto",
                        valueEnd === framework.label
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
