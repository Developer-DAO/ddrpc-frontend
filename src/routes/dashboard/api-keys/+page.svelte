<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import Button from '$lib/components/button.svelte';
	import { apiService } from '$lib/services/api';
	import { apiKeys, type ApiKey } from '$lib/stores';
	
	let mounted = $state(false);
	let isLoading = $state(true);
	let error = $state('');
	let isGenerating = $state(false);
	let showCopySuccess = $state(false);
	let selectedKeyForDeletion: ApiKey | null = $state(null);
	let showDeleteConfirm = $state(false);
	
	onMount(() => {
		mounted = true;
		
		// Load API keys
		loadApiKeys();
		
		return () => {
			mounted = false;
		};
	});
	
	async function loadApiKeys() {
		isLoading = true;
		error = '';
		
		try {
			await apiService.fetchApiKeys();
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to load API keys';
			console.error('Error loading API keys:', err);
		} finally {
			isLoading = false;
		}
	}
	
	async function generateApiKey() {
		isGenerating = true;
		error = '';
		
		try {
			const newKey = await apiService.generateApiKey();
			
			// Show success message
			showCopySuccess = true;
			setTimeout(() => {
				showCopySuccess = false;
			}, 2000);
			
			// Copy the new key to clipboard
			if (newKey) {
				navigator.clipboard.writeText(newKey.key);
			}
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to generate API key';
			console.error('Error generating API key:', err);
		} finally {
			isGenerating = false;
		}
	}
	
	function confirmDeleteKey(key: ApiKey) {
		selectedKeyForDeletion = key;
		showDeleteConfirm = true;
	}
	
	function cancelDelete() {
		selectedKeyForDeletion = null;
		showDeleteConfirm = false;
	}
	
	async function deleteApiKey() {
		if (!selectedKeyForDeletion) return;
		
		error = '';
		
		try {
			const success = await apiService.deleteApiKey(selectedKeyForDeletion.key);
			if (!success) {
				throw new Error('Failed to delete API key');
			}
			showDeleteConfirm = false;
			selectedKeyForDeletion = null;
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to delete API key';
			console.error('Error deleting API key:', err);
		}
	}
	
	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text).then(() => {
			showCopySuccess = true;
			setTimeout(() => {
				showCopySuccess = false;
			}, 2000);
		});
	}
	
	function formatDate(dateString: string) {
		if (!dateString) return 'Never';
		const date = new Date(dateString);
		return date.toLocaleString();
	}
</script>

{#key mounted}
	{#if mounted}
		<div class="max-w-4xl mx-auto" transition:fade={{ duration: 300 }}>
			<div class="flex justify-between items-center mb-6">
				<h1 class="font-heading text-4xl">API Keys</h1>
				<a href="/dashboard">
					<Button variant="secondary">Back to Dashboard</Button>
				</a>
			</div>
			
			{#if error}
				<div class="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-md mb-6">
					{error}
				</div>
			{/if}
			
			{#if showCopySuccess}
				<div class="fixed top-4 right-4 bg-green-900/80 border border-green-500 text-green-200 px-4 py-3 rounded-md z-50" transition:fade={{ duration: 200 }}>
					API key copied to clipboard!
				</div>
			{/if}
			
			<div class="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6 mb-8">
				<p class="text-neutral-300 mb-4">
					API keys allow you to access the Developer DAO RPC services. Each key can be used to make requests to the RPC endpoints.
				</p>
				<div class="flex justify-end">
					<button 
						on:click={generateApiKey}
						class="bg-primary-white text-neutral-900 px-4 py-2 rounded-full hover:bg-neutral-200 transition-colors disabled:opacity-50"
						disabled={isGenerating}
					>
						{isGenerating ? 'Generating...' : 'Generate New API Key'}
					</button>
				</div>
			</div>
			
			{#if isLoading}
				<div class="flex justify-center items-center py-12">
					<div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-white"></div>
				</div>
			{:else if $apiKeys.length === 0}
				<div class="bg-neutral-800/30 border border-neutral-700 rounded-lg p-8 text-center">
					<p class="text-neutral-400 mb-4">You don't have any API keys yet.</p>
				</div>
			{:else}
				<div class="bg-neutral-800/30 border border-neutral-700 rounded-lg overflow-hidden">
					<table class="w-full">
						<thead class="bg-neutral-800">
							<tr>
								<th class="px-4 py-3 text-left text-sm font-medium text-neutral-300">API Key</th>
								<th class="px-4 py-3 text-right text-sm font-medium text-neutral-300">Actions</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-neutral-700">
							{#each $apiKeys as key}
								<tr class="hover:bg-neutral-800/50 transition-colors">
									<td class="px-4 py-3 text-sm font-mono">
										<div class="flex items-center">
											<span class="truncate max-w-[180px]">{key.key}</span>
											<button 
												class="ml-2 text-neutral-400 hover:text-primary-white"
												on:click={() => copyToClipboard(key.key)}
											>
												<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
												</svg>
											</button>
										</div>
									</td>
									<td class="px-4 py-3 text-right">
										<button 
											class="text-red-400 hover:text-red-300 transition-colors"
											on:click={() => confirmDeleteKey(key)}
										>
											<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
											</svg>
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
			
			{#if showDeleteConfirm}
				<div 
					class="fixed inset-0 bg-black/70 flex items-center justify-center z-50" 
					transition:fade={{ duration: 200 }}
				>
					<div class="bg-neutral-800 border border-neutral-700 rounded-lg p-6 max-w-md w-full mx-4" transition:slide={{ duration: 200 }}>
						<h3 class="font-heading text-xl mb-4">Delete API Key</h3>
						<p class="text-neutral-300 mb-6">
							Are you sure you want to delete this API key? This action cannot be undone and any applications using this key will no longer work.
						</p>
						{#if selectedKeyForDeletion}
							<div class="bg-neutral-900 p-3 rounded mb-6 font-mono text-sm overflow-x-auto">
								{selectedKeyForDeletion.key}
							</div>
						{/if}
						<div class="flex justify-end space-x-3">
							<button on:click={cancelDelete}>Cancel</button>
							<button on:click={deleteApiKey}>Delete</button>
						</div>
					</div>
				</div>
			{/if}
		</div>
	{/if}
{/key} 