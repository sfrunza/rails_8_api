// import { debounce } from "@/lib/utils";
// import { setRequest } from "@/slices/requestSlice";
import { debounce } from "@/lib/helpers";
// import { useAppDispatch } from "@/store";
import { TCalendarRateData } from "@/types/rates";
import { format } from "date-fns";
import toast from "react-hot-toast";
import useSWR from "swr";

export default function useCalendarRates() {
  const { data, error, isLoading, mutate } = useSWR<TCalendarRateData | null | undefined>("/calendar_rates", null, {
    onError: () => {
      if (!navigator.onLine) {
        toast.error(
          "You are offline. Please check your internet connection.",
        );
      }
    },
  });

  const updateRate = debounce(
    (movingDate: Date | undefined, crewSize: number, rate: number) => {
      if (!data || !movingDate) return;

      if (movingDate && crewSize > 1) {
        const dayRate = data[format(movingDate, "MM-dd-yyyy")];
        let newRate = rate;
        let newHourlyRate = dayRate.rate.movers_rates[crewSize]?.hourly_rate;

        if (newHourlyRate) {
          if (crewSize > 4) {
            const extraMoverRate = dayRate.rate.extra_mover_rate * (crewSize - 4);
            newHourlyRate = dayRate.rate.movers_rates[4].hourly_rate;
            newRate = newHourlyRate + extraMoverRate;
          } else {
            newRate = newHourlyRate;
          }
        }

        console.log(newRate);

        // dispatch(setRequest({ rate: newRate }));
      }
    },
    1000,
  );

  return { calendarRates: data, error, isLoading, mutate, updateRate };
}