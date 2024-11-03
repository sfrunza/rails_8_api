import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";

import { api } from "@/api";
import toast from "react-hot-toast";
import { TPackingService } from "@/types/packing-services";



interface TOptions {
  onSuccess?: () => void;
  onError?: (err: any) => void;
}

export default function useMovingServices() {
  const { mutate } = useSWRConfig()
  const { data: packingServices, error, isLoading } = useSWR<TPackingService[]>('/packing_services', null, {
    onError: () => {
      if (!navigator.onLine) {
        toast.error(
          "You are offline. Please check your internet connection.",
        );
      }
    },
  });
  // const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  async function addNewPackingService(): Promise<void> {
    // setIsAdding(true);
    // const nextDroppableIndex: number = services
    //   ? Math.max(...services.map(service => service.droppable_index)) + 1
    //   : 0;

    // const newService = {
    //   name: name,
    //   droppable_index: nextDroppableIndex,
    // };

    // try {
    //   const service = await addServiceAction(newService);
    //   if (service) {
    //     mutate(
    //       "/services",
    //       [...(services || []), service],
    //       false, // Do not re-fetch
    //     );

    //     if (onSuccess) {
    //       onSuccess();
    //     }
    //   } else {
    //     throw new Error("Failed to add service");
    //   }
    // } catch (error) {
    //   if (error instanceof Error) {
    //     if (onError) {
    //       onError(error);
    //     }
    //   }
    // } finally {
    //   setIsAdding(false);
    // }
  }

  async function updatePackingServices(
    packings: TPackingService[],
    { onSuccess, onError }: TOptions,
  ): Promise<void> {
    setIsUpdating(true);
    try {

      await api.post('/packing_services/bulk_update', { packings });

      mutate(
        "/packing_services",
        packings,
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
    packingServices,
    error,
    isLoading,
    isUpdating,
    addNewPackingService,
    updatePackingServices,
  };
}
