import { api } from "@/api";
import { TPackingService } from "@/types/packing";

export const updatePacking = async (packingId: number, values: Partial<TPackingService>) => {
  try {
    const response = await api.put(`/packing_services/${packingId}`, values);
    return response.data;
  } catch (error) {
    console.error('Failed to update', error);
    throw error;
  }
}

export const bulkUpdatePackings = async (packings: TPackingService[]) => {
  try {
    const response = await api.post(`/packing_services/bulk_update`, { packings });
    return response.data;
  } catch (error) {
    console.error('Failed to update', error);
    throw error;
  }
};

export const deletePacking = async (id: number) => {
  try {
    const response = await api.delete(`/packing_services/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete packings with ID ${id}:`, error);
    throw error;
  }
};

export const createPacking = async (newService: Partial<TPackingService>) => {
  try {
    const response = await api.post('/packing_services', newService);
    return response.data;
  } catch (error) {
    console.error('Failed to add packing:', error);
    throw error;
  }
}
