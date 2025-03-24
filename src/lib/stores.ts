import { writable } from 'svelte/store';

export type User = {
    email: string;
    wallet: string;
    isAuthenticated: boolean;
};

// Store for user authentication and information
export const user = writable<User>({
    email: '',
    wallet: '',
    isAuthenticated: false
});

// Legacy store - keeping for backward compatibility
export const authorized = writable(false);

// Store for API keys
export interface ApiKey {
    id?: string;
    key: string;
}

export const apiKeys = writable<ApiKey[]>([]);