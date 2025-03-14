import { apiKeys, type ApiKey } from '$lib/stores';

// API base URL
const API_BASE_URL = 'http://localhost:3000/api';

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
                credentials: 'include' // Important for cookies
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch API keys: ${response.status}`);
            }

            const keys = await response.json();
            apiKeys.set(keys);
            return keys;
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

            const newKey = await response.json();
            
            // Update the store with the new key
            apiKeys.update(keys => [...keys, newKey]);
            
            return newKey;
        } catch (error) {
            console.error('Error generating API key:', error);
            return null;
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
            apiKeys.update(keys => keys.filter(key => key.id !== keyId));
            
            return true;
        } catch (error) {
            console.error('Error deleting API key:', error);
            return false;
        }
    }
}; 