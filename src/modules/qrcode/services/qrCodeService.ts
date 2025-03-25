// src/modules/qr-code/services/qrCodeService.ts
import { apiRequest } from '@/core/services/apiService';

// Function to submit the form and fetch the downloadable file
export const qrCodeService = {
    async submitForm(selectedItems: number[]): Promise<Blob> {
        try {
            // Use apiRequest for making the API call
            const response = await apiRequest('/qr-code/generate', {
                method: 'POST',
                body: JSON.stringify({ items: selectedItems }),
            });

            // Assuming the server returns a file as a blob (or you can use `response.blob()` if it's a raw file)
            // If your API returns the file as part of the response body, you can use this approach:
            const fileBlob = await fetch(response.fileUrl).then(res => res.blob());
            return fileBlob;
        } catch (error) {
            console.error('Error submitting form:', error);
            throw new Error('Error submitting form to server.');
        }
    },
};
