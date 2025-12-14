import { apiKeys, type ApiKey } from '$lib/stores';

// API base URL
const API_BASE_URL = 'https://api.cloud.developerdao.com/api';

/**
 * API service for managing API keys
 */
export const apiService = {
    /**
     * Fetch all API keys for the current user
     */
    async fetchApiKeys(): Promise<ApiKey[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/keys`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch API keys: ${response.status}`);
            }

            // Parse the response as JSON
            const responseData = await response.json();
            
            // Map the response format to the simplified ApiKey format
            const mappedKeys: ApiKey[] = responseData.map((item: { apikey: string }) => ({
                key: item.apikey
            }));
            
            apiKeys.set(mappedKeys);
            return mappedKeys;
        } catch (error) {
            console.error('Error fetching API keys:', error);
            return [];
        }
    },

    /**
     * Generate a new API key
     */
    async generateApiKey(): Promise<ApiKey | null> {
        try {
            const response = await fetch(`${API_BASE_URL}/keys`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            
            if (!response.ok) {
                throw new Error(`Failed to generate API key: ${response.status}`);
            }

            // Get the response as text
            const keyString = await response.text();
            
            // Create a simplified ApiKey object
            const newKey: ApiKey = {
                key: keyString.trim()
            };
            
            // Refresh the API keys list to get the server-side data
            await this.fetchApiKeys();
            
            return newKey;
        } catch (error) {
            console.error('Error generating API key:', error);
            throw error;
        }
    },

    /**
     * Delete an API key
     */
    async deleteApiKey(keyId: string): Promise<boolean> {
        try {
            const response = await fetch(`${API_BASE_URL}/keys/${keyId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Failed to delete API key: ${response.status}`);
            }

            // Update the store by removing the deleted key
            apiKeys.update(keys => keys.filter(key => key.key !== keyId));
            
            return true;
        } catch (error) {
            console.error('Error deleting API key:', error);
            return false;
        }
    }
}; 
