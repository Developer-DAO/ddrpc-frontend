import { user, authorized, type User } from '$lib/stores';
import { get } from 'svelte/store';

// API base URL
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Authentication service for handling user login, logout, and session management
 */
export const authService = {
    /**
     * Login a user with email and password
     */
    async login(email: string, password: string): Promise<boolean> {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include' // Important for cookies
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || `Login failed with status: ${response.status}`);
            }

            // Check content type to determine how to parse the response
            const contentType = response.headers.get('content-type');
            let userData: User = {
                email: '',
                wallet: '',
                isAuthenticated: false
            };
            
            if (contentType && contentType.includes('application/json')) {
                userData = await response.json();
            } else {
                // Handle text response - just log it and continue
                const textResponse = await response.text();
                console.log('Login successful:', textResponse);
            }
            
            // Update both stores
            user.set({
                email: userData.email || email,
                wallet: userData.wallet || '',
                isAuthenticated: true
            });
            authorized.set(true);
            
            // Store authentication state in localStorage
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userEmail', email);
            
            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    },

    /**
     * Logout the current user
     */
    async logout(): Promise<void> {
        try {
            // Call logout endpoint if available
            await fetch(`${API_BASE_URL}/logout`, {
                method: 'POST',
                credentials: 'include'
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear authentication state regardless of API success
            user.set({
                email: '',
                wallet: '',
                isAuthenticated: false
            });
            authorized.set(false);
            
            // Clear localStorage
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('userEmail');
        }
    },

    /**
     * Check if the user is authenticated
     */
    isAuthenticated(): boolean {
        return get(user).isAuthenticated || localStorage.getItem('isAuthenticated') === 'true';
    },

    /**
     * Restore user session from localStorage or cookies
     */
    restoreSession(): void {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        const email = localStorage.getItem('userEmail') || '';
        
        if (isAuthenticated && email) {
            user.set({
                email,
                wallet: '',
                isAuthenticated: true
            });
            authorized.set(true);
        }
    }
}; 