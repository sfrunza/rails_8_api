import useSWR, { useSWRConfig } from "swr";
import { format } from "date-fns";
import { api } from "@/api";
import { debounce } from "@/lib/helpers";
import { TCalendarRate, TCalendarRateData } from "@/types/rate";
import { useState } from "react";
import { updateField } from "@/slices/request-slice";
import { useAppDispatch } from "@/store";


const updateData = async (url: string, data: Partial<TCalendarRate>): Promise<TCalendarRate> => {
  const response = await api.put(url, { calendar_rate: data });
  return response.data;
};

export default function useCalendarRates() {
  const endpoint = "calendar_rates";
  const dispatch = useAppDispatch();
  const { mutate } = useSWRConfig()
  const { data, error, isLoading } = useSWR<TCalendarRateData>(endpoint);

  const [isUpdating, setIsUpdating] = useState<boolean>(false);


  const updateCalendarRate = async (id: number, newRateId: number) => {
    setIsUpdating(true);
    const newData: Partial<TCalendarRate> = {}
    if (newRateId === 0) {
      newData["is_blocked"] = true;
      newData["rate_id"] = null;
    } else {
      newData["rate_id"] = newRateId;
      newData["is_blocked"] = false;
    }

    try {
      await updateData(`${endpoint}/${id}`, newData);
      mutate(endpoint);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const updateRate = debounce(
    (movingDate: string | null, crewSize: number, rate: number) => {
      if (!data || !movingDate) return;

      if (movingDate && crewSize > 1) {
        const dayRate = data[format(movingDate, "MM-dd-yyyy")];
        let newRate = rate;
        let newHourlyRate = dayRate.rate.movers_rates[crewSize]?.hourly_rate;

        console.log(dayRate);

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

        dispatch(updateField({ rate: newRate }));
      }
    },
    1000,
  );

  return { calendarRates: data, error, isLoading, isUpdating, updateCalendarRate, updateRate };
}