import { useState } from "react";
import toast from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";
import { TFullRequest } from "@/types/request";
import { api } from "@/api";
import { resetChanges } from "@/slices/request-slice";
import { useAppDispatch, useAppSelector } from "@/store";

export default function useRequest(requestId?: number | undefined) {
  const { mutate } = useSWRConfig();
  const dispatch = useAppDispatch();
  const endpoint = "/requests";

  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const { data, error, isLoading } = useSWR<TFullRequest>(
    requestId ? `${endpoint}/${requestId}` : null
  );

  const reduxRequest = useAppSelector((state) => state.request.request);

  // Merged data preference: SWR data > Redux data
  const requestData = data || reduxRequest;

  const handleRequestUpdate = async (id: number, updatedData: Partial<TFullRequest>) => {
    if (!requestData) {
      toast.error("Request data not found");
      return;
    }

    setIsUpdating(true);
    try {
      await api.put(`${endpoint}/${id}`, { request: updatedData });

      mutate(`${endpoint}/${id}`, { ...requestData, ...updatedData }, false);

      dispatch(resetChanges());

      toast.success('Changes saved');
      return;
    } catch (err) {
      toast.error('Failed to update');
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    data,
    error,
    isLoading,
    mutate,
    isUpdating,
    handleRequestUpdate,
  };
}
