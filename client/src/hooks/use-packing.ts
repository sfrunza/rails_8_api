import { useState } from "react";
import toast from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";
import { TPackingService } from "@/types/packing";
import { bulkUpdatePackings, createPacking, deletePacking, updatePacking } from "@/actions/packing";


export default function usePacking() {
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

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isBulkUpdating, setIsBulkUpdating] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  async function add(newPacking: Partial<TPackingService>) {
    setIsAdding(true);
    try {
      await createPacking(newPacking);
      mutate('/packing_services');
      toast.success('Service added');
    } catch (err) {
      toast.error('Failed to add service');
    } finally {
      setIsAdding(false);
    }
  };

  async function update(packingId: number, values: Partial<TPackingService>) {
    setIsUpdating(true);
    try {
      await updatePacking(packingId, values);
      mutate('/packing_services');
      toast.success('Changes saved');
    } catch (err) {
      toast.error('Failed to update');
    } finally {
      setIsUpdating(false);
    }
  }

  async function bulkUpdate(packings: TPackingService[]) {
    setIsBulkUpdating(true);
    try {
      await bulkUpdatePackings(packings);
      mutate('/packing_services');
      toast.success('Changes saved');
    } catch (err) {
      toast.error('Failed to update');
    } finally {
      setIsBulkUpdating(false);
    }
  };

  async function remove(id: number) {
    setIsDeleting(true);
    try {
      await deletePacking(id);
      // Update indexes of remaining services
      const newList = packingServices!.filter(
        (service) => service.id !== id)
        .map((service, index) => ({ ...service, index })
        )
      await bulkUpdatePackings(newList)
      mutate('/packing_services');
      toast.success('Service deleted');
    } catch (err) {
      toast.error('Failed to delete service');
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    packingServices,
    error,
    isLoading,
    isAdding,
    isUpdating,
    isBulkUpdating,
    isDeleting,
    add,
    update,
    bulkUpdate,
    remove,
  };
}
