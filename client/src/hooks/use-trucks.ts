import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";

import { api } from "@/api";
import toast from "react-hot-toast";
import { TTruck } from "@/types/trucks";



interface TOptions {
  onSuccess?: () => void;
  onError?: (err: any) => void;
}

export default function useTrucks() {
  const { mutate } = useSWRConfig()
  const { data: trucks, error, isLoading } = useSWR<TTruck[]>('/trucks', null, {
    onError: () => {
      if (!navigator.onLine) {
        toast.error(
          "You are offline. Please check your internet connection.",
        );
      }
    },
  });
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  async function addNewTruck(name: string, { onSuccess, onError }: TOptions): Promise<void> {
    setIsAdding(true);
    try {
      await api.post("/trucks", { truck: { name } })
      mutate(
        "/trucks",
        false, // Do not re-fetch
      );

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      if (error instanceof Error) {
        if (onError) {
          onError(error);
        }
      }
    } finally {
      setIsAdding(false);
    }
  }

  async function updateTrucks(
    trucks: TTruck[],
    { onSuccess, onError }: TOptions,
  ): Promise<void> {
    setIsUpdating(true);
    try {

      await api.post('/trucks/bulk_update', { trucks });

      mutate(
        "/trucks",
        trucks,
        false, // Do not re-fetch
      );

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      if (error instanceof Error) {
        if (onError) {
          onError(error);
        }
      }
    } finally {
      setIsUpdating(false);
    }
  }

  return {
    trucks,
    error,
    isAdding,
    isLoading,
    isUpdating,
    addNewTruck,
    updateTrucks,
  };
}
