import { apiRequest } from '@/core/services/apiService';

// Function to submit the form and fetch the downloadable file
export const qrCodeService = {
    async submitForm(selectedItems: number[], layout: boolean): Promise<Blob> {
        try {
            // Use apiRequest for making the API call
            return await apiRequest('/qr-code/generate', {
                method: 'POST',
                body: JSON.stringify({ items: selectedItems, layout: layout }), // Include layout in the request
            }, 'blob');

        } catch (error) {
            console.error('Error submitting form:', error);
            throw new Error('Error submitting form to server.');
        }
    },
};
