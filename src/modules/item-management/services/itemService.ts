// src/modules/items/services/itemService.js
import { apiRequest } from '@/core/services/apiService';

const itemService = {
    async fetchItems() {
        return apiRequest('/items', {
          method: 'GET'
        })
    },

    async deleteItem(id: number): Promise<void> {
        return apiRequest(`/items/${id}`, {
          method: 'DELETE'
        })
    },
};

export default itemService;
