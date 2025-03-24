<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Button from '$lib/components/button.svelte';
	import { createWalletClient, custom } from 'viem';
	import { createSiweMessage } from 'viem/siwe';
	
	let mounted = $state(false);
	let loading = $state(false);
	let transactions = $state<Transaction[]>([]);
	let selectedChain = $state('Optimism');
	let txHash = $state('');
	let verifyingWallet = $state(false);

	interface Transaction {
		customerEmail: string;
		transactionHash: string;
		asset: 'USDC' | 'Ether';
		amount: string;
		chain: 'Arbitrum' | 'Base' | 'Polygon' | 'Optimism';
		date: string;
		usdValue: number;
	}

	async function submitPayment(hash: string, chain: string) {
		loading = true;
		try {
			const res = await fetch('/api/pay', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ hash, chain })
			});
			if (!res.ok) throw new Error(await res.text());
			await fetchTransactions();
		} catch (error) {
			console.error('Payment error:', error);
			alert(error.message);
		}
		loading = false;
	}

	async function fetchTransactions() {
		loading = true;
		try {
			const res = await fetch('/api/payments/transactions');
			transactions = await res.json();
		} catch (error) {
			console.error('Failed to fetch transactions:', error);
		}
		loading = false;
	}

	async function verifyWalletOwnership() {
		verifyingWallet = true;
		try {
			// Get wallet client
			const walletClient = createWalletClient({
				transport: custom(window.ethereum)
			});
			
			// Get address
			const [address] = await walletClient.requestAddresses();

			// Get nonce from backend
			const nonceRes = await fetch('http://localhost:3000/api/siwe/nonce', {
				method: 'GET',
				credentials: 'include'
			});
			
			if (!nonceRes.ok) throw new Error(`Failed to retrieve nonce: ${await nonceRes.text()}`);
			const nonce = await nonceRes.text();

			// Create SIWE message
			const message = createSiweMessage({
				domain: window.location.host,
				address,
				statement: 'Sign in to verify wallet ownership',
				uri: window.location.origin,
				version: '1',
				chainId: 1,
				nonce
			});

			// Sign message
			const signature = await walletClient.signMessage({
				message,
				account: address
			});

			// Convert hex signature to byte array
			const signatureBytes = Array.from(
				new Uint8Array(
					signature.slice(2).match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []
				)
			);

			// Verify with backend
			const verifyRes = await fetch('http://localhost:3000/api/siwe/add_wallet', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({
					message,
					signature: signatureBytes
				})
			});

			if (!verifyRes.ok) throw new Error(await verifyRes.text());
			
			alert('Wallet verified successfully!');
		} catch (error) {
			console.error('Wallet verification error:', error);
			alert(error.message);
		}
		verifyingWallet = false;
	}

	onMount(() => {
		mounted = true;
		fetchTransactions();
		return () => {
			mounted = false;
		};
	});
</script>

{#key mounted}
	{#if mounted}
		<div class="max-w-4xl mx-auto" transition:fade={{ duration: 300 }}>
			<h1 class="font-heading text-4xl mb-6">Payments</h1>

			<div class="grid gap-6">
				<!-- Submit Payment Section -->
				<div class="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6">
					<h2 class="font-heading text-2xl mb-4">Submit Payment</h2>
					<p class="text-neutral-400 mb-4">
						Send USDC to <code class="bg-neutral-900 px-2 py-1 rounded">0b2C639c533813f4Aa9D7837CAf62653d097Ff85</code> on any
						supported network and submit your transaction hash below.
					</p>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						<select
							class="bg-neutral-900 border border-neutral-700 rounded-lg p-2"
							bind:value={selectedChain}
						>
							<option value="Optimism">Optimism</option>
							<option value="Arbitrum">Arbitrum</option>
							<option value="Base">Base</option>
							<option value="Polygon">Polygon</option>
						</select>
						<input
							type="text"
							placeholder="Transaction Hash"
							class="bg-neutral-900 border border-neutral-700 rounded-lg p-2"
							bind:value={txHash}
						/>
					</div>
					<Button
						variant="primary"
						on:click={() => submitPayment(txHash, selectedChain)}
						disabled={loading || !txHash}
					>
						{loading ? 'Processing...' : 'Submit Payment'}
					</Button>
				</div>

				<!-- Transaction History Section -->
				<div class="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6">
					<h2 class="font-heading text-2xl mb-4">Transaction History</h2>
					{#if loading}
						<p class="text-neutral-400">Loading transactions...</p>
					{:else if transactions.length === 0}
						<p class="text-neutral-400">No transactions yet.</p>
					{:else}
						<div class="overflow-x-auto">
							<table class="w-full">
								<thead>
									<tr class="text-left border-b border-neutral-700">
										<th class="pb-2">Date</th>
										<th class="pb-2">Network</th>
										<th class="pb-2">Amount</th>
										<th class="pb-2">USD Value</th>
										<th class="pb-2">Hash</th>
									</tr>
								</thead>
								<tbody>
									{#each transactions as tx}
										<tr class="border-b border-neutral-700/50">
											<td class="py-3">{new Date(tx.date).toLocaleDateString()}</td>
											<td class="py-3">{tx.chain}</td>
											<td class="py-3">
												{tx.amount} {tx.asset}
											</td>
											<td class="py-3">${(tx.usdValue / 100).toFixed(2)}</td>
											<td class="py-3">
												<a
													href={`https://${tx.chain.toLowerCase()}.etherscan.io/tx/${tx.transactionHash}`}
													target="_blank"
													rel="noopener noreferrer"
													class="text-primary-white hover:underline truncate block max-w-[200px]"
												>
													{tx.transactionHash}
												</a>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					{/if}
				</div>

				<!-- Wallet Verification Section -->
				<div class="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6">
					<h2 class="font-heading text-2xl mb-4">Verify Wallet Ownership</h2>
					<Button
						variant="secondary"
						on:click={verifyWalletOwnership}
						disabled={verifyingWallet}
					>
						{verifyingWallet ? 'Verifying...' : 'Verify Wallet Ownership'}
					</Button>
				</div>
			</div>
		</div>
	{/if}
{/key} 