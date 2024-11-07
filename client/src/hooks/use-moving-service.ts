import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import toast from "react-hot-toast";
import { TMovingService } from "@/types/moving-service";
import { bulkUpdateMovingServices, createMovingService, deleteMovingService } from "@/actions/moving-service";


export default function useMovingServices() {
  const { mutate } = useSWRConfig()
  const { data: movingServices, error, isLoading } = useSWR<TMovingService[]>('/moving_services', null, {
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
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  async function add(newService: Partial<TMovingService>) {
    setIsAdding(true);
    try {
      await createMovingService(newService);
      mutate('/moving_services');
      toast.success('Service added');
    } catch (err) {
      toast.error('Failed to add service');
    } finally {
      setIsAdding(false);
    }
  };

  async function update(services: TMovingService[]) {
    setIsUpdating(true);
    try {
      await bulkUpdateMovingServices(services);
      mutate('/moving_services');
      toast.success('Changes saved');
    } catch (err) {
      toast.error('Failed to update service');
    } finally {
      setIsUpdating(false);
    }
  };

  async function remove(id: number) {
    setIsDeleting(true);
    try {
      await deleteMovingService(id);
      // Update indexes of remaining services
      const newList = movingServices!.filter(
        (service) => service.id !== id)
        .map((service, index) => ({ ...service, index })
        )
      await bulkUpdateMovingServices(newList)
      mutate('/moving_services');
      toast.success('Service deleted');
    } catch (err) {
      toast.error('Failed to delete service');
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    movingServices,
    error,
    isLoading,
    isAdding,
    isUpdating,
    isDeleting,
    add,
    update,
    remove,
  };
}
