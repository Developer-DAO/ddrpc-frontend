<script lang="ts">
	import { fade } from 'svelte/transition';
	import Button from '$lib/components/button.svelte';
	import { onMount } from 'svelte';
	import { authService } from '$lib/services/auth';

	type LoginRequest = {
		email: string;
		password: string;
	};

	let mounted = $state(false);
	let loginFields = $state<LoginRequest>({ email: '', password: '' });
	let formError = $state('');
	let isSubmitting = $state(false);

	onMount(() => {
		mounted = true;
		
		// If already authenticated, redirect to dashboard
		if (authService.isAuthenticated()) {
			window.location.href = '/dashboard';
		}
		
		return () => {
			mounted = false;
		};
	});

	const tryLogin = async (login: LoginRequest): Promise<void> => {
		formError = '';
		isSubmitting = true;
		
		try {
			const success = await authService.login(login.email, login.password);
			
			if (success) {
				window.location.href = '/dashboard';
			} else {
				formError = 'Login failed. Please check your credentials and try again.';
			}
		} catch (error) {
			console.error('Login error:', error);
			formError = error instanceof Error ? error.message : 'An unknown error occurred during login';
		} finally {
			isSubmitting = false;
		}
	};
</script>

{#key mounted}
	{#if mounted}
		<section class="relative z-30 flex min-h-screen w-full flex-col pt-32 gap-6" transition:fade|local>
			<div class="absolute right-0 top-0 z-20 h-screen w-screen">
				<div transition:fade={{ delay: 800, duration: 300 }}>
					<img class="h-full w-full object-contain" src="/bgBlackStars.svg" alt="" />
				</div>
			</div>

			<div class="absolute right-0 top-0 z-20 h-screen w-screen">
				<div transition:fade={{ delay: 500, duration: 500 }}>
					<img class="h-full w-full object-contain" src="/rays.svg" alt="" />
				</div>
			</div>

			<div class="container z-50 mx-auto px-5">
				{#if formError}
					<div class="bg-red-900/50 border border-red-500 text-red-200 px-4 py-2 rounded-md mb-4 max-w-xl mx-auto">
						{formError}
					</div>
				{/if}

				<form
					class="max-w-xl mx-auto space-y-2"
					name="login"
					on:submit|preventDefault={() => {
						tryLogin(loginFields);
					}}
				>
					<h1 class="font-heading text-3xl self-center text-center mb-8">Login</h1>
					<div class="flex flex-col">
						<label for="email" class="text-neutral-500">Email</label>
						<input
							bind:value={loginFields.email}
							class="flex w-full items-center justify-center gap-1 rounded-full border-2 tracking-wider transition-all h-12 px-6 text-sm text-neutral-500 hover:text-primary-white border-neutral-600 hover:border-primary-white bg-neutral-800 hover:bg-neutral-700 font-paragraph font-semibold"
							type="email"
							placeholder="your@email.com"
							required
						/>
					</div>
					<div class="flex flex-col">
						<label for="password" class="text-neutral-500">Password</label>
						<input
							bind:value={loginFields.password}
							class="flex w-full items-center justify-center gap-1 rounded-full border-2 tracking-wider transition-all h-12 px-6 text-sm text-neutral-500 hover:text-primary-white border-neutral-600 hover:border-primary-white bg-neutral-800 hover:bg-neutral-700 font-paragraph font-semibold"
							type="password"
							placeholder="Enter your password"
							required
						/>
					</div>
					<div class="flex space-x-2 justify-end">
						<Button type="submit" variant="primary" class="mt-5" disabled={isSubmitting}>
							{isSubmitting ? 'Logging in...' : 'Login'}
						</Button>
					</div>
				</form>
				<div class="mt-3 max-w-xl mx-auto text-center">
					<span class="text-neutral-500">Don't have an account?</span> 
					<a href="/register" class="text-primary-white hover:underline">Register Here</a>
				</div>
			</div>
		</section>
	{/if}
{/key} 