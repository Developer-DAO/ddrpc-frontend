<script lang="ts">
	import { fade } from 'svelte/transition';
	import Button from '$lib/components/button.svelte';
	import { onMount } from 'svelte';
	
	// API base URL
	const API_BASE_URL = 'https://api.cloud.developerdao.com/api';

	type ActivationRequest = {
		email: string;
		code: string;
	};

	let mounted = $state(false);
//	let apiConnected = $state(false);
	let activationFormValues = $state({
		email: '',
		code: ''
	});

	onMount(() => {
		mounted = true;
		
		// Get email from URL if available
		const urlParams = new URLSearchParams(window.location.search);
		const emailParam = urlParams.get('email');
		if (emailParam) {
			activationFormValues.email = emailParam;
		}
	});
	
	let formError = $state('');
	let formSuccess = $state('');
	let isSubmitting = $state(false);

	const activate = async (activationInfo: ActivationRequest): Promise<void> => {
		formError = '';
		formSuccess = '';
		isSubmitting = true;
		
		try {
			console.log('Sending activation data:', activationInfo);
			
			const response = await fetch(`${API_BASE_URL}/activate`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify(activationInfo)
			});
			
			if (!response.ok) {
				const errorData = await response.text();
				throw new Error(errorData || `Server responded with status: ${response.status}`);
			}
			
			console.log('Successfully activated account');
			formSuccess = 'Account successfully activated! Redirecting to login...';
			
			// Redirect to login after a short delay
			setTimeout(() => {
				window.location.href = '/login';
			}, 2000);
		} catch (error) {
			console.error('Activation error:', error);
			formError = error instanceof Error ? error.message : 'An unknown error occurred during activation';
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

				{#if formSuccess}
					<div class="bg-green-900/50 border border-green-500 text-green-200 px-4 py-2 rounded-md mb-4 max-w-xl mx-auto">
						{formSuccess}
					</div>
				{/if}

				<form
					class="max-w-xl mx-auto space-y-2"
					name="activate"
					onsubmit={(e) => {
                        e.preventDefault();
						activate(activationFormValues);
					}}
				>
					<h1 class="font-heading text-3xl self-center text-center mb-8">Activate Your Account</h1>
					<div class="flex flex-col">
						<label for="email" class="text-neutral-500">Email</label>
						<input
							bind:value={activationFormValues.email}
							class="flex w-full items-center justify-center gap-1 rounded-full border-2 tracking-wider transition-all h-12 px-6 text-sm text-neutral-500 hover:text-primary-white border-neutral-600 hover:border-primary-white bg-neutral-800 hover:bg-neutral-700 font-paragraph font-semibold"
							type="email"
							placeholder="your@email.com"
							required
						/>
					</div>
					<div class="flex flex-col">
						<label for="code" class="text-neutral-500">Activation Code</label>
						<input
							bind:value={activationFormValues.code}
							class="flex w-full items-center justify-center gap-1 rounded-full border-2 tracking-wider transition-all h-12 px-6 text-sm text-neutral-500 hover:text-primary-white border-neutral-600 hover:border-primary-white bg-neutral-800 hover:bg-neutral-700 font-paragraph font-semibold"
							type="text"
							placeholder="00000000"
							required
						/>
					</div>
					<p class="text-neutral-400 text-sm">
						Enter the verification code that was sent to your email during registration.
					</p>
					<div class="flex space-x-2 justify-end">
						<Button type="submit" variant="primary" class="mt-5" disabled={isSubmitting}>
							{isSubmitting ? 'Activating...' : 'Activate Account'}
						</Button>
					</div>
				</form>
				
				<div class="mt-3 max-w-xl mx-auto text-center">
					<span class="text-neutral-500">Need to register?</span> 
					<a href="/register" class="text-primary-white hover:underline">Register Here</a>
				</div>
				<div class="mt-1 max-w-xl mx-auto text-center">
					<span class="text-neutral-500">Already activated?</span> 
					<a href="/login" class="text-primary-white hover:underline">Login Here</a>
				</div>
			</div>
		</section>
	{/if}
{/key} 
