import { user, authorized, type User } from '$lib/stores';
import { get } from 'svelte/store';

// API base URL
const API_BASE_URL = 'https://api.cloud.developerdao.com/api';

import { createSiweMessage } from 'viem/siwe';
import { getAddress } from 'viem';

type EthereumProvider = {
    request: (args: {method: string; params?: unknown[]}) => Promise<unknown>;
};

export const authService = {
    /**
     * Refresh a non-expired JWT with updated information and extend it's expiry
     */
    async refresh(): Promise<boolean> {
        try {
            const response = await fetch(`${API_BASE_URL}/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            
            if (!response.ok) {
                throw new Error(`Refresh failed with status: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const userData: User = await response.json();
                this.updateAuthState(userData.email, userData.wallet);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Refresh error:', error);
            return false;
        }
    },

    /**
     * Login a user with email and password
     */
    async login(email: string, password: string): Promise<boolean> {
        try {
            document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            
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

            // Handle successful login
            this.updateAuthState(email);
            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    },
    
    /**
     * Login with Ethereum wallet using Sign-In with Ethereum (SIWE)
     */
    async loginWithWallet(walletAddress: string, ethereum: EthereumProvider): Promise<boolean> {
        try {
            const checksummedWallet = getAddress(walletAddress);
            
            const nonceResponse = await fetch(`${API_BASE_URL}/siwe/nonce/${checksummedWallet}`);
            
            if (!nonceResponse.ok) {
                const errorText = await nonceResponse.text();
                throw new Error(errorText || `Failed to get nonce with status: ${nonceResponse.status}`);
            }
            
            let nonce: string;
            const contentType = nonceResponse.headers.get('content-type');
            
            if (contentType && contentType.includes('application/json')) {
                const jsonData = await nonceResponse.json();
                nonce = jsonData.nonce;
            } else {
                nonce = await nonceResponse.text();
            }
            
            console.log('Got nonce:', nonce);
            
            const domain = "cloud.developerdao.com";
            const uri = "https://cloud.developerdao.com";
            
            const messageToSign = createSiweMessage({
                domain,
                address: checksummedWallet, // Already checksummed
                statement: "Sign in to verify wallet ownership",
                uri,
                version: "1",
                chainId: 1,
                nonce,
            });

            
            const signature = await ethereum.request({
                method: 'personal_sign',
                params: [messageToSign, checksummedWallet]
            }) as string;
            
            const cleanSig = signature.startsWith('0x') ? signature.slice(2) : signature;
            
            const signatureBytes = Array.from(
                new Uint8Array(
                    cleanSig
                        .match(/.{1,2}/g)
                        ?.map((byte) => parseInt(byte, 16)) || [],
                ),
            );
            
            const loginResponse = await fetch(`${API_BASE_URL}/login/siwe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    message: messageToSign, 
                    signature: signatureBytes,
                    wallet: checksummedWallet 
                }),
                credentials: 'include'
            });
            
            if (!loginResponse.ok) {
                const errorData = await loginResponse.text().catch(() => null);
                console.error('Server error response:', errorData);
                throw new Error(errorData || `Wallet login failed with status: ${loginResponse.status}`);
            }
            
            // Get the email from the response if available
            const email = await loginResponse.text();
            this.updateAuthState(email, checksummedWallet);
            
            return true;
        } catch (error) {
            console.error('Wallet login error:', error);
            return false;
        }
    },

    /**
     * Update authentication state consistently across all methods
     */
    updateAuthState(email = '', wallet = ''): void {
        user.set({
            email,
            wallet,
            isAuthenticated: true
        });
        authorized.set(true);

        localStorage.setItem('isAuthenticated', 'true');
        if (email) localStorage.setItem('userEmail', email);
        if (wallet) localStorage.setItem('userWallet', wallet);
    },

    /**
     * Logout the current user
     */
    async logout(): Promise<void> {
        try {
            await fetch(`${API_BASE_URL}/logout`, {
                method: 'POST',
                credentials: 'include'
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            user.set({
                email: '',
                wallet: '',
                isAuthenticated: false
            });
            authorized.set(false);

            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userWallet');
        }
    },

    /**
     * Check if the user is authenticated
     */
    isAuthenticated(): boolean {
        const cookies = document.cookie.split(';').map(c => c.trim());
        const jwtCookies = cookies.filter(c => c.startsWith('jwt='));
            
        if (jwtCookies.length > 0) {
            if (jwtCookies.length > 1) {
                console.warn('Multiple JWT cookies found:', jwtCookies);
            }
            return true;
        }
        
        if (get(user).isAuthenticated || get(authorized)) {
            return true;
        }
        
        return localStorage.getItem('isAuthenticated') === 'true';
    },

    /**
     * Restore user session from cookies or localStorage
     */
    async restoreSession(): Promise<boolean> {
        const refreshResult = await this.refresh();
        if (refreshResult) {
            return true;
        }
        
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        const email = localStorage.getItem('userEmail') || '';
        const wallet = localStorage.getItem('userWallet') || '';

        if (isAuthenticated && (email || wallet)) {
            user.set({
                email,
                wallet,
                isAuthenticated: true
            });
            authorized.set(true);
            return true;
        }
        
        return false;
    }
}; 
