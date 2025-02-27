import useSWR from "swr";
import { format } from "date-fns";
import { api } from "@/api";
import { useAppDispatch, useAppSelector } from "@/store";
import { Calendar } from "@/components/ui/calendar";
import { setOpen, setSelectedDate } from "@/slices/parklot-slice";
import { useState } from "react";

async function fetchDates(url: string) {
  const res = await api.get(url);
  return res.data;
}

export default function CalendarWithRequests() {
  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector((state) => state.parklot.selectedDate);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date(selectedDate) ?? new Date(),
  );
  const { data: dates } = useSWR<string[]>(
    selectedMonth
      ? `/requests/dates_with_requests?date=${format(selectedMonth, "yyyy-MM-dd")}`
      : null,
    fetchDates,
  ); //["2024-11-26", "2024-11-27", ...]

  function handleDateChange(date: Date) {
    dispatch(setSelectedDate(date.toISOString()));
    dispatch(setOpen(false));
  }

  const highlightDates =
    dates?.map((date) => {
      const dateArray = date.split("-").map(Number); //[2024, 11, 26]
      return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
    }) ?? [];

  return (
    <div className="w-fit rounded-xl border bg-card text-card-foreground shadow">
      <Calendar
        selected={new Date(selectedDate)}
        month={new Date(selectedMonth)}
        onMonthChange={setSelectedMonth}
        onDayClick={handleDateChange}
        modifiers={{
          highlight: highlightDates,
        }}
        modifiersClassNames={{
          highlight: "bg-primary text-primary-foreground",
        }}
        classNames={{
          day_selected:
            "bg-muted-foreground text-white hover:bg-muted-foreground hover:text-white focus:bg-muted-foreground focus:text-muted",
        }}
      />
    </div>
  );
}
