import useSWR, { useSWRConfig } from "swr";
import { format } from "date-fns";
import { api } from "@/api";
import { debounce } from "@/lib/helpers";
import { TCalendarRate, TCalendarRateData } from "@/types/rates";
import { useState } from "react";

// Helper functions for API calls
const fetchData = async (url: string): Promise<{}> => {
  const response = await api.get(url);
  return response.data;
};

const updateData = async (url: string, data: Partial<TCalendarRate>): Promise<TCalendarRate> => {
  const response = await api.put(url, { calendar_rate: data });
  return response.data;
};

export default function useCalendarRates() {
  const endpoint = "calendar_rates";
  const { mutate } = useSWRConfig()
  const { data, error, isLoading } = useSWR<TCalendarRateData>(endpoint, fetchData);

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

  return { calendarRates: data, error, isLoading, isUpdating, updateCalendarRate, updateRate };
}