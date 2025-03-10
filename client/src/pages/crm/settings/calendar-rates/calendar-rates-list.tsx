import { useState } from "react";
import { format } from "date-fns";
import { useResource } from "@/hooks/use-resource";
import useCalendarRates from "@/hooks/use-calendar-rates";
import { hexToRgb } from "@/lib/helpers";
import { TCalendarRate } from "@/types/rate";

import { CalendarWithRates } from "@/components/calendar-with-rates";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const getNextSixMonths = (): Date[] => {
  const months: Date[] = [];
  const currentDate = new Date();

  for (let i = 0; i <= 11; i++) {
    const month = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + i,
      1,
    ); // First day of each month
    months.push(month);
  }

  return months;
};

export default function CalendarRatesList() {
  const months = getNextSixMonths();
  const { updateCalendarRate } = useCalendarRates();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDateInfo, setSelectedDateInfo] = useState<TCalendarRate>();

  async function handleSaveRate(id: number, newRateId: number) {
    await updateCalendarRate(id, newRateId);
  }

  function handleSelectDate(date: Date, rateData: TCalendarRate): void {
    setIsOpen(true);
    setSelectedDate(date);
    setSelectedDateInfo(rateData);
  }

  return (
    <>
      <div className="grid justify-items-center gap-y-6 lg:grid-cols-2">
        {months.map((monthDate, i) => {
          return (
            <div className="rounded-xl border shadow" key={i}>
              <CalendarWithRates
                onSelectDate={handleSelectDate}
                mode="single"
                today={monthDate}
                disableNavigation
                showFooter={false}
              />
            </div>
          );
        })}
      </div>
      {isOpen && (
        <SelectRateDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedDate={selectedDate}
          selectedDateInfo={selectedDateInfo}
          handleSaveRate={handleSaveRate}
        />
      )}
    </>
  );
}

function SelectRateDialog({
  isOpen,
  setIsOpen,
  selectedDate,
  selectedDateInfo,
  handleSaveRate,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedDate: Date | null;
  selectedDateInfo: TCalendarRate | undefined;
  handleSaveRate: (id: number, newRateId: number) => void;
}) {
  const { data: dbRates } = useResource("rates");

  if (!isOpen || !selectedDateInfo) return null;

  const { id: calendarDateId, rate, is_blocked } = selectedDateInfo;
  const selectedRateId = rate?.id ?? 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-xs">
        <DialogHeader>
          <DialogTitle>
            {selectedDate && format(selectedDate, "PPP")}
          </DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <RadioGroup
          defaultValue={is_blocked ? "0" : selectedRateId.toString()}
          onValueChange={(value) => {
            handleSaveRate(calendarDateId, parseInt(value));
          }}
          className="gap-4"
        >
          {dbRates?.map((rate, i) => (
            <Label
              htmlFor={rate.id.toString()}
              className="flex w-full cursor-pointer items-center gap-6 rounded-md p-3 hover:shadow"
              style={{
                color: rate.color,
                backgroundColor: `rgba(${hexToRgb(rate.color)}, 0.1)`,
              }}
              key={i}
            >
              <RadioGroupItem
                value={rate.id.toString()}
                id={rate.id.toString()}
              />
              <span className="flex flex-grow items-center gap-2">
                {rate.name}
                <span
                  className="size-2 rounded-full"
                  style={{
                    backgroundColor: rate.color,
                  }}
                ></span>
              </span>
            </Label>
          ))}
          <div className="flex items-center space-x-2">
            <Label
              htmlFor="0"
              className="flex w-full cursor-pointer items-center gap-6 rounded-md bg-foreground/20 p-3 text-foreground hover:shadow"
            >
              <RadioGroupItem value="0" id="0" />
              <span className="flex flex-grow items-center gap-2">
                Blocked
                <span className="size-2 rounded-full bg-black"></span>
              </span>
            </Label>
          </div>
        </RadioGroup>
      </DialogContent>
    </Dialog>
  );
}
