import { api } from "@/api";
import { TExtraService } from "@/types/extra-service";

export const bulkUpdateExtraServices = async (services: TExtraService[]) => {
  try {
    const response = await api.post(`/extra_services/bulk_update`, { services });
    return response.data;
  } catch (error) {
    console.error('Failed to update services', error);
    throw error;
  }
};

export const deleteExtraService = async (id: number) => {
  try {
    const response = await api.delete(`/extra_services/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete service with ID ${id}:`, error);
    throw error;
  }
};

export const createExtraService = async (newService: Partial<TExtraService>) => {
  try {
    const response = await api.post('/extra_services', newService);
    return response.data;
  } catch (error) {
    console.error('Failed to add service:', error);
    throw error;
  }
}
