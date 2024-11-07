import { api } from "@/api";
import { TMovingService } from "@/types/moving-service";

export const bulkUpdateMovingServices = async (services: TMovingService[]) => {
  try {
    const response = await api.post(`/moving_services/bulk_update`, { services });
    return response.data;
  } catch (error) {
    console.error('Failed to update services', error);
    throw error;
  }
};

export const deleteMovingService = async (id: number) => {
  try {
    const response = await api.delete(`/moving_services/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete service with ID ${id}:`, error);
    throw error;
  }
};

export const createMovingService = async (newService: Partial<TMovingService>) => {
  try {
    const response = await api.post('/moving_services', newService);
    return response.data;
  } catch (error) {
    console.error('Failed to add service:', error);
    throw error;
  }
}
