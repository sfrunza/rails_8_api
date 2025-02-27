import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, InfoIcon } from "lucide-react";
import { format } from "date-fns";
import { DayPicker, DayProps } from "react-day-picker";
import { cn } from "@/lib/utils";
import { formatMoney, hexToRgb } from "@/lib/helpers";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TCalendarRate } from "@/types/rate";
import { useResource } from "@/hooks/use-resource";
import { Skeleton } from "./ui/skeleton";
import useCalendarRates from "@/hooks/use-calendar-rates";

const getEndOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  onSelectDate: (date: Date, rateData: TCalendarRate) => void;
  showFooter?: boolean;
};

function CalendarWithRates({
  onSelectDate,
  className,
  classNames,
  showOutsideDays = false,
  showFooter = true,
  ...props
}: CalendarProps) {
  const { calendarRates } = useCalendarRates();

  const [selectedMonth, setSelectedMonth] = useState(props.today ?? new Date());

  const today = new Date();
  const elevenMonthsAhead = new Date();
  elevenMonthsAhead.setMonth(today.getMonth() + 11);

  return (
    <>
      <DayPicker
        month={selectedMonth}
        onMonthChange={setSelectedMonth}
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        fromDate={props.fromDate || today}
        toDate={getEndOfMonth(elevenMonthsAhead)}
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: cn(
            "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
            props.mode === "range"
              ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
              : "[&:has([aria-selected])]:rounded-md",
          ),
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
          ),
          day_range_start: "day-range-start",
          day_range_end: "day-range-end",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside:
            "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: () => <ChevronLeftIcon className="h-4 w-4" />,
          IconRight: () => <ChevronRightIcon className="h-4 w-4" />,
          Day: (props: DayProps) => {
            const { date } = props;

            if (!calendarRates) {
              return <Skeleton className="h-8 w-8 p-0" />;
            }

            const isSameMonth = date.getMonth() === selectedMonth.getMonth();

            const formattedDate = format(date, "MM-dd-yyyy") as string;
            const rateData = calendarRates[formattedDate];
            const rate = rateData?.rate ?? null;

            const styles = {
              color: "inherit",
              backgroundColor: "inherit",
              opacity: 1,
            };

            if (rateData?.is_blocked) {
              styles.color = "black";
              styles.backgroundColor = "#dcdcdc";
            }

            if (rate) {
              styles.color = rate.color;
              styles.backgroundColor = `rgba(${hexToRgb(rate?.color)}, 0.1)`;
            }

            if (!isSameMonth) {
              styles.backgroundColor = "#f3f3f3";
              styles.color = "#7e7e7e";
              styles.opacity = 0.5;
            }

            return (
              <button
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-8 w-8 p-0 font-semibold aria-selected:opacity-100",
                )}
                disabled={!isSameMonth}
                style={styles}
                onClick={() => {
                  onSelectDate(date, rateData);
                }}
              >
                {date.getDate()}
              </button>
            );
          },
        }}
        {...props}
      />
      {showFooter && <CalendarFooter />}
    </>
  );
}
CalendarWithRates.displayName = "CalendarWithRates";

export { CalendarWithRates };

function CalendarFooter() {
  const { data: dbRates } = useResource("rates");
  return (
    <div className="max-w-[248px] border-t bg-muted">
      <div className="flex w-full flex-wrap items-center justify-center gap-2 px-6 py-4 text-xs font-semibold">
        {dbRates?.map((rate, i) => {
          return (
            <TooltipProvider key={i}>
              <Tooltip delayDuration={20}>
                <TooltipTrigger asChild className="cursor-help">
                  <div
                    key={rate.id}
                    className="flex items-center gap-2 rounded-md px-1.5 py-1"
                    style={{
                      color: rate.color,
                      backgroundColor: `rgba(${hexToRgb(rate.color)}, 0.1)`,
                    }}
                  >
                    {rate.name}
                    <InfoIcon className="size-4" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="min-w-md min-w-60 divide-y border bg-background text-foreground shadow-lg">
                  {Object.keys(rate.movers_rates)
                    .slice(0, 3)
                    .map((key, i) => {
                      const hRate = rate.movers_rates[key].hourly_rate;
                      return (
                        <div
                          key={i}
                          className="flex justify-between py-1 font-medium"
                        >
                          <span>{key} movers & truck</span>
                          <span>{formatMoney(hRate)}</span>
                        </div>
                      );
                    })}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}

        <div
          className="flex items-center gap-2 rounded-md px-1.5 py-1"
          style={{
            color: "#000000",
            backgroundColor: "#dcdcdc",
          }}
        >
          Blocked
          <span
            className="size-1.5 rounded-full"
            style={{
              backgroundColor: "#000000",
            }}
          />
        </div>
      </div>
    </div>
  );
}
