// src/modules/qr-code/services/qrCodeService.ts
import { apiRequest } from '@/core/services/apiService';

// Function to submit the form and fetch the downloadable file
export const qrCodeService = {
    async submitForm(selectedItems: number[]): Promise<Blob> {
        try {
            // Use apiRequest for making the API call
            return await apiRequest('/qr-code/generate', {
                method: 'POST',
                body: JSON.stringify({ items: selectedItems }),
            }, 'blob');

        } catch (error) {
            console.error('Error submitting form:', error);
            throw new Error('Error submitting form to server.');
        }
    },
};
