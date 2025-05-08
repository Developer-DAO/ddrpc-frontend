<script lang="ts">
	import { onMount } from 'svelte';
	import { authService } from '$lib/services/auth';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	
	let { children } = $props();
	let isLoading = $state(true);
	let isAuthenticated = $state(false);
	
	onMount(async () => {
		try {
			// First try to restore session from cookies/localStorage
			const sessionRestored = await authService.restoreSession();
			
			// Check if user is authenticated after session restore
			isAuthenticated = sessionRestored || authService.isAuthenticated();
			
			// If not authenticated, redirect to login
			if (!isAuthenticated) {
				goto('/login');
			}
		} catch (error) {
			console.error('Authentication error:', error);
			goto('/login');
		} finally {
			isLoading = false;
		}
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