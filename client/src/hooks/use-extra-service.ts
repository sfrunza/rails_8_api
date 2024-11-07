import { useState } from "react";
import toast from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";
import { TExtraService } from "@/types/extra-service";
import { bulkUpdateExtraServices, deleteExtraService, createExtraService } from "@/actions/extra-service";


export default function useMovingServices() {
  const { mutate } = useSWRConfig()
  const { data: extraServices, error, isLoading } = useSWR<TExtraService[]>('/extra_services', null, {
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

  async function add(newService: Partial<TExtraService>) {
    setIsAdding(true);
    try {
      await createExtraService(newService);
      mutate('/extra_services');
      toast.success('Service added');
    } catch (err) {
      toast.error('Failed to add service');
    } finally {
      setIsAdding(false);
    }
  };

  async function update(services: TExtraService[]) {
    setIsUpdating(true);
    try {
      await bulkUpdateExtraServices(services);
      mutate('/extra_services');
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
      await deleteExtraService(id);
      // Update indexes of remaining services
      const newList = extraServices!.filter(
        (service) => service.id !== id)
        .map((service, index) => ({ ...service, index })
        )
      await bulkUpdateExtraServices(newList)
      mutate('/extra_services');
      toast.success('Service deleted');
    } catch (err) {
      toast.error('Failed to delete service');
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    extraServices,
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
