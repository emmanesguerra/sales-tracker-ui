import { vi } from 'vitest';
import { qrCodeService } from '@/modules/qrcode/services/qrCodeService';
import { apiRequest } from '@/core/services/apiService';

vi.mock('@/core/services/apiService'); // Mock the apiRequest function

describe('qrCodeService', () => {
  it('should submit the form and return a file blob', async () => {
    const mockBlob = new Blob(['test content'], { type: 'application/csv' }); // Create a mock Blob

    // Mock the apiRequest function to return a fake response
    apiRequest.mockResolvedValue({
      fileUrl: 'http://example.com/fake-file.csv',
    });

    // Mock the fetch response for the file URL
    global.fetch = vi.fn().mockResolvedValue({
      blob: () => Promise.resolve(mockBlob),
    });

    const selectedItems = [1, 2, 3]; // Example selected items

    const result = await qrCodeService.submitForm(selectedItems);

    // Check that the result is a Blob
    expect(result).toBeInstanceOf(Blob);
    expect(result.size).toBeGreaterThan(0); // The Blob should have content

    // Check if apiRequest was called with the correct parameters
    expect(apiRequest).toHaveBeenCalledWith('/qr-code/generate', {
      method: 'POST',
      body: JSON.stringify({ items: selectedItems }),
    });

    // Check if fetch was called to get the file blob
    expect(global.fetch).toHaveBeenCalledWith('http://example.com/fake-file.csv');
  });

  it('should throw an error if the API call fails', async () => {
    // Mock the apiRequest function to throw an error
    apiRequest.mockRejectedValue(new Error('API request failed'));

    const selectedItems = [1, 2, 3];

    try {
      await qrCodeService.submitForm(selectedItems);
    } catch (error) {
      // Check that the error is thrown
      expect(error.message).toBe('Error submitting form to server.');
    }
  });
});
