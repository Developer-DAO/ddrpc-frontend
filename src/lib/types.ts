
export interface PaymentMethod {
	id: string;
	type: 'card' | 'crypto';
	last4?: string;
	expMonth?: number;
	expYear?: number;
	createdAt: string;
}

export interface Transaction {
	id: string;
	date: string;
	amount: number;
	status: 'success' | 'failed' | 'pending';
	description: string;
	paymentMethodId: string;
} 

export interface EthWindow extends Window {
    ethereum?: EthereumProvider;
}

export type EthereumProvider = {
	request: (args: {method: string; params?: unknown[]}) => Promise<unknown>;
};


