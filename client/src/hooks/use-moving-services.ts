import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";

import { api } from "@/api";
import { TMovingService } from "@/types/moving-services";



interface TOptions {
  onSuccess?: () => void;
  onError?: (err: any) => void;
}

export default function useMovingServices() {
  const { mutate } = useSWRConfig()
  const { data: movingServices, error, isLoading } = useSWR<TMovingService[]>('/moving_services');
  // const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  async function addNewService(): Promise<void> {
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

  async function updateMovingServices(
    services: TMovingService[],
    { onSuccess, onError }: TOptions,
  ): Promise<void> {
    setIsUpdating(true);
    try {

      await api.post('/moving_services/bulk_update', { services });

      mutate(
        "/moving_services",
        services,
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
    movingServices,
    error,
    isLoading,
    isUpdating,
    addNewService,
    updateMovingServices,
  };
}
