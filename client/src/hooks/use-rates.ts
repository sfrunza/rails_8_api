import { TRate } from "@/types/rates";
import toast from "react-hot-toast";
import useSWR from "swr";

export default function useRates() {
  const { data, error, isLoading, mutate } = useSWR<TRate[] | null | undefined>("/rates", null, {
    onError: () => {
      if (!navigator.onLine) {
        toast.error(
          "You are offline. Please check your internet connection.",
        );
      }
    },
  });

  return { dbRates: data, error, isLoading, mutate };
}