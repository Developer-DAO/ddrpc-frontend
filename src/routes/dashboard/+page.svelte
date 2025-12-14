<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '$lib/stores';
	import { fade } from 'svelte/transition';
	import Button from '$lib/components/button.svelte';
	
	let mounted = $state(false);
	
	onMount(() => {
		mounted = true;
		return () => {
			mounted = false;
		};
	});
</script>

{#key mounted}
	{#if mounted}
		<div class="max-w-4xl mx-auto" transition:fade={{ duration: 300 }}>
			<h1 class="font-heading text-4xl mb-6">Dashboard</h1>
			
			<div class="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6 mb-8">
				<h2 class="font-heading text-2xl mb-4">Welcome, {$user.email}!</h2>
				<p class="text-neutral-300 mb-4">
					This is your Developer DAO RPC dashboard. From here, you can manage your API keys and access the RPC services.
				</p>
			</div>
			
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div class="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6 hover:border-neutral-500 transition-colors">
					<h3 class="font-heading text-xl mb-3">API Keys</h3>
					<p class="text-neutral-400 mb-4">
						Create and manage your API keys to access the RPC services.
					</p>
					<a href="/dashboard/api-keys">
						<Button variant="primary">Manage API Keys</Button>
					</a>
				</div>
				
				<div class="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6 hover:border-neutral-500 transition-colors">
					<h3 class="font-heading text-xl mb-3">Payments</h3>
					<p class="text-neutral-400 mb-4">
						Manage your payment methods and view transaction history.
					</p>
					<a href="/dashboard/payments">
						<Button variant="primary">Manage Payments</Button>
					</a>
				</div>
			</div>
			
			<div class="mt-8 bg-neutral-800/50 border border-neutral-700 rounded-lg p-6">
				<h3 class="font-heading text-xl mb-3">Quick Start</h3>
				<p class="text-neutral-400 mb-4">
					To use the RPC service, you'll need to:
				</p>
				<ol class="list-decimal list-inside space-y-2 text-neutral-300">
					<li>Create an API key in the <a href="/dashboard/api-keys" class="text-primary-white hover:underline">API Keys</a> section</li>
					<li>Use your API key in your requests to the RPC endpoint</li>
					<li>Format your requests as: <code class="bg-neutral-900 px-2 py-1 rounded">http://api.cloud.developerdao.com/rpc/&#123;chain_id&#125;/&#123;api_key&#125;</code></li>
				</ol>
			</div>
		</div>
	{/if}
{/key} 
