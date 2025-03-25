// src/modules/items/store/itemStore.js
import { defineStore } from 'pinia';
import itemService from '../services/itemService';

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  created_at: string;
  updated_at: string;
}

export const useItemStore = defineStore('itemStore', {
  state: () => ({
    items: [] as Item[],
  }),
  actions: {
    async fetchItems() {
      try {
        // You can replace this with API call later
        this.items = [
          {
            id: 1,
            name: 'Item 1',
            description: 'This is item 1',
            price: 10.99,
            stock: 50,
            created_at: '2025-01-01T10:00:00Z',
            updated_at: '2025-01-01T10:00:00Z',
          },
          {
            id: 2,
            name: 'Item 2',
            description: 'This is item 2',
            price: 20.99,
            stock: 30,
            created_at: '2025-02-01T11:00:00Z',
            updated_at: '2025-02-01T11:00:00Z',
          },
          {
            id: 3,
            name: 'Item 3',
            description: 'This is item 3',
            price: 30.99,
            stock: 20,
            created_at: '2025-03-01T12:00:00Z',
            updated_at: '2025-03-01T12:00:00Z',
          },
          {
            id: 4,
            name: 'Item 4',
            description: 'This is item 4',
            price: 40.99,
            stock: 10,
            created_at: '2025-04-01T13:00:00Z',
            updated_at: '2025-04-01T13:00:00Z',
          },
          {
            id: 5,
            name: 'Item 5',
            description: 'This is item 5',
            price: 50.99,
            stock: 5,
            created_at: '2025-05-01T14:00:00Z',
            updated_at: '2025-05-01T14:00:00Z',
          },
        ];
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },
    async deleteItem(id: number): Promise<void> {
      try {
        // Mock delete
        this.items = this.items.filter((item: Item) => item.id !== id);
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    },
  },
});
