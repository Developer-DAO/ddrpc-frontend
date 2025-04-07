import { user, authorized, type User } from '$lib/stores';
import { get } from 'svelte/store';

// API base URL
const API_BASE_URL = 'http://localhost:3000/api';

export const authService = {
    /**
     * Refresh a non-expired JWT with updated information and extend it's expiry
     */
    async refresh(): Promise<boolean> {
        await fetch(`${API_BASE_URL}/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then(async (res) => {
                const contentType = res.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const userData: User = await res.json().catch((e) => console.error(`failed to parse JSON: ${e}`));
                    user.set({
                        email: userData.email,
                        wallet: userData.wallet,
                        isAuthenticated: true
                    });
                    authorized.set(true);
                }
            })
            .catch(async (e) => {
                const errorData = await e.text();
                throw new Error(errorData || `Refresh failed with status: ${e.status}`);
            })

         return true;
    },


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
            await fetch(`${API_BASE_URL} / logout`, {
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
