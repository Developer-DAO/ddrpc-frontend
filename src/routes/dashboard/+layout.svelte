<script lang="ts">
	import { onMount } from 'svelte';
	import { authService } from '$lib/services/auth';
	import { fade } from 'svelte/transition';
	
	let { children } = $props();
	let isLoading = $state(true);
	let isAuthenticated = $state(false);
	
	onMount(() => {
		// Check if user is authenticated
		isAuthenticated = authService.isAuthenticated();
		
		// If not authenticated, redirect to login
		if (!isAuthenticated) {
			window.location.href = '/login';
		}
		
		isLoading = false;
	});
</script>

{#if isLoading}
	<div class="flex justify-center items-center min-h-screen">
		<div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-white"></div>
	</div>
{:else if isAuthenticated}
	<div class="container mx-auto px-4 py-8" transition:fade={{ duration: 200 }}>
		{@render children()}
	</div>
{/if} 