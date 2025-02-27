import useSWR from "swr";
import { TStatus } from "@/types/request";
import { AxiosError } from "axios";

export type TMessage = {
  id: number;
  body: string;
  request_id: number;
  user_id: number;
  sender_role: string;
  viewed_by: string[];
  created_at: string;
  user: {
    first_name: string;
    last_name: string;
  };
  status: TStatus;
};

export const useMessages = (requestId: number) => {
  const url = `/requests/${requestId}/messages`
  const { data, isLoading, error, mutate } = useSWR<TMessage[], AxiosError>(requestId ? url : null);

  return {
    messages: data,
    isLoading,
    error,
    mutate,
  };
};
