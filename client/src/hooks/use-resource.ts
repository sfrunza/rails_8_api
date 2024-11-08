import useSWR, { useSWRConfig } from 'swr';
import { api } from '@/api';
import { TMovingService } from '@/types/moving-service';
import { TExtraService } from '@/types/extra-service';
import { TPackingService } from '@/types/packing';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { TTruck } from '@/types/trucks';
import { TRate } from '@/types/rates';

type Endpoint = 'moving_services' | 'extra_services' | 'packing_services' | 'trucks' | 'rates'

type EndpointToType = {
  moving_services: TMovingService;
  extra_services: TExtraService;
  packing_services: TPackingService;
  trucks: TTruck;
  rates: TRate;
};


// Helper functions for API calls
const fetchData = async <T>(url: string): Promise<T[]> => {
  const response = await api.get(url);
  return response.data;
};

const updateData = async <T>(url: string, data: Partial<T>): Promise<T> => {
  const response = await api.put(url, data);
  return response.data;
};

const bulkUpdateData = async <T>(url: string, data: Partial<T>): Promise<T> => {
  const response = await api.post(url, data);
  return response.data;
};

const deleteData = async (url: string) => {
  const response = await api.delete(url);
  return response.data;
};

const createData = async <T>(url: string, data: Partial<T>): Promise<T> => {
  const response = await api.post(url, data);
  return response.data;
};

// Reusable hook with generic type
export const useResource = <T extends Endpoint>(endpoint: T) => {
  const { mutate } = useSWRConfig()
  const { data, error, isLoading } = useSWR<EndpointToType[T][]>(endpoint, fetchData);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isBulkUpdating, setIsBulkUpdating] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);



  const handleUpdate = async (id: number, updatedData: Partial<EndpointToType[T]>) => {
    setIsUpdating(true);
    try {
      const resp = await updateData(`${endpoint}/${id}`, updatedData);
      mutate(endpoint, data!.map((item) => (item.id === id ? resp : item)), false);
      toast.success('Changes saved');
    } catch (err) {
      toast.error('Failed to update');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleBulkUpdate = async (updatedData: { [key in T]: EndpointToType[T][] }) => {
    setIsBulkUpdating(true);
    try {
      const newData = await bulkUpdateData(`${endpoint}/bulk_update`, updatedData);
      mutate(endpoint, newData, false);
      toast.success('Changes saved');
    } catch (err) {
      toast.error('Failed to update');
    } finally {
      setIsBulkUpdating(false);
    }
  };

  const handleCreate = async (newData: Partial<EndpointToType[T]>) => {
    setIsCreating(true);
    try {
      const resp = await createData(`${endpoint}`, newData);
      mutate(endpoint, [...data!, resp], false);
      toast.success('Saved');
    } catch (err) {
      toast.error('Failed to update');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      await deleteData(`${endpoint}/${id}`);
      const newData = data!.filter(
        (item) => item.id !== id)
        .map((prevItem, index) => ({ ...prevItem, index })
        )

      const resp = await bulkUpdateData(`${endpoint}/bulk_update`, { [endpoint]: newData });
      mutate(endpoint, resp, false);
      toast.success('Deleted successfully');
    } catch (err) {
      toast.error('Delete failed');
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    data,
    error,
    isLoading,
    isUpdating,
    isDeleting,
    isBulkUpdating,
    isCreating,
    handleUpdate,
    handleDelete,
    handleBulkUpdate,
    handleCreate
  };
};
