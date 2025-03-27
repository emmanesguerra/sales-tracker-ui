import { apiRequest } from '@/core/services/apiService';

export const salesService = {
  async fetchSales(date: string | null) {
    try {
      const url = date 
        ? `/sales-orders?date=${encodeURIComponent(date)}`
        : `/sales-orders`; 

      const response = await apiRequest(url, {
        method: 'GET',
      });

      return response;
    } catch (error) {
      console.error('Error fetching sales data:', error);
      return [];
    }
  }
};