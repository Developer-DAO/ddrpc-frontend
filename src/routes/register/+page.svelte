<script lang="ts">
	import { fade } from 'svelte/transition';
	import Button from '$lib/components/button.svelte';
	// import type { AxiosInstance } from 'axios';
	// import axiosDefault from 'axios';
	import { onMount } from 'svelte';
	
	// Configure axios with proper CORS settings
	// const axios: AxiosInstance = axiosDefault.create({
	// 	withCredentials: false,
	// 	timeout: 10000,
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 		'Accept': 'application/json'
	// 	}
	// });

	// API base URL
	const API_BASE_URL = 'http://localhost:3000/api';

	type RegisterUser = {
		email: string;
		password: string;
		passwordConfirmation: string;
	};

	type ActivationRequest = {
		code: string;
	};

	let mounted = $state(false);
//	let apiConnected = $state(false);

	onMount(() => {
		mounted = true;
	});

	let { registerFormValues, activationFormValues, showRegisterForm, showActivationForm } = $state({
		registerFormValues: { email: '', password: '', passwordConfirmation: '' },
		activationFormValues: { code: '' },
		showRegisterForm: true,
		showActivationForm: false
	});

	let formError = $state('');
	let isSubmitting = $state(false);

	const register = async (userInfo: RegisterUser): Promise<void> => {
		console.log('Registering user...', userInfo);
		if (userInfo.password !== userInfo.passwordConfirmation) {
			formError = 'Passwords do not match';
			return;
		}
		
		formError = '';
		isSubmitting = true;
		
		try {
			// Make a copy of the user info to avoid reactivity issues
			const userData = {
				email: userInfo.email,
				password: userInfo.password
			};
			
			console.log('Sending registration data:', userData);
			
			const response = await fetch(`${API_BASE_URL}/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify(userData)
			});
			
			if (!response.ok) {
				const errorData = await response.text();
				
				// Check if the error is because the user is already registered
				if (errorData.includes('already registered') || response.status === 409) {
					console.log('User already registered, redirecting to activation page');
					// Redirect to activation page with email pre-filled
					window.location.href = `/activate?email=${encodeURIComponent(userInfo.email)}`;
					return;
				}
				
				throw new Error(errorData || `Server responded with status: ${response.status}`);
			}
			
			const contentType = response.headers.get('content-type');
			if (contentType && contentType.includes('application/json')) {
				const data = await response.json();
				console.log('Successfully registered user:', data);
			} else {
				// Handle plain text response
				const text = await response.text();
				console.log('Successfully registered user:', text);
			}
			
			// Redirect to activation page with email
			window.location.href = `/activate?email=${encodeURIComponent(userInfo.email)}`;
		} catch (error) {
			console.error('Registration error:', error);
			formError = error instanceof Error ? error.message : 'An unknown error occurred during registration';
		} finally {
			isSubmitting = false;
		}
	};

	const activate = async (activationInfo: ActivationRequest): Promise<void> => {
		formError = '';
		isSubmitting = true;
		
		try {
			// Create activation data object
			const activationData = {
				email: registerFormValues.email,
				code: activationInfo.code
			};
			
			console.log('Sending activation data:', activationData);
			
			const response = await fetch(`${API_BASE_URL}/activate`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify(activationData)
			});
			
			if (!response.ok) {
				const errorData = await response.text();
				throw new Error(errorData || `Server responded with status: ${response.status}`);
			}
			
			console.log('Successfully activated account');
			window.location.href = '/login';
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

				{#if showRegisterForm}
					<form
						class="max-w-xl mx-auto space-y-2"
						name="register"
						onsubmit={(e) => {
                            e.preventDefault();
							register(registerFormValues);
						}}
					>
						<h1 class="font-heading text-3xl self-center text-center mb-8">Create Account</h1>
						<div class="flex flex-col">
							<label for="email" class="text-neutral-500">Email</label>
							<input
								bind:value={registerFormValues.email}
								class="flex w-full items-center justify-center gap-1 rounded-full border-2 tracking-wider transition-all h-12 px-6 text-sm text-neutral-500 hover:text-primary-white border-neutral-600 hover:border-primary-white bg-neutral-800 hover:bg-neutral-700 font-paragraph font-semibold"
								type="text"
								placeholder="vitalik@developerdao.com"
								required
								autocomplete="email"
							/>
						</div>
						<div class="flex flex-col">
							<label for="password" class="text-neutral-500">Password</label>
							<input
								bind:value={registerFormValues.password}
								class="flex w-full items-center justify-center gap-1 rounded-full border-2 tracking-wider transition-all h-12 px-6 text-sm text-neutral-500 hover:text-primary-white border-neutral-600 hover:border-primary-white bg-neutral-800 hover:bg-neutral-700 font-paragraph font-semibold"
								type="password"
								placeholder="Enter your password"
								required
							/>
						</div>
						<div class="flex flex-col">
							<label for="pwconfirm" class="text-neutral-500">Confirm Password</label>
							<input
								bind:value={registerFormValues.passwordConfirmation}
								class="flex w-full items-center justify-center gap-1 rounded-full border-2 tracking-wider transition-all h-12 px-6 text-sm text-neutral-500 hover:text-primary-white border-neutral-600 hover:border-primary-white bg-neutral-800 hover:bg-neutral-700 font-paragraph font-semibold"
								type="password"
								placeholder="Repeat your password"
								required
							/>
						</div>
						<div class="flex space-x-2 justify-end">
							<Button type="submit" variant="primary" class="mt-5" disabled={isSubmitting}>
								{isSubmitting ? 'Registering...' : 'Register'}
							</Button>
						</div>
					</form>
				{/if}

				{#if showActivationForm}
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
							We've sent a verification code to your email. Please check your inbox and enter the code below.
						</p>
						<div class="flex space-x-2 justify-end">
							<Button type="submit" variant="primary" class="mt-5" disabled={isSubmitting}>
								{isSubmitting ? 'Activating...' : 'Activate'}
							</Button>
						</div>
					</form>
				{/if}
				<div class="mt-3 max-w-xl mx-auto text-center">
					<span class="text-neutral-500">Do you have an account?</span> 
					<a href="/login" class="text-primary-white hover:underline">Login Here</a>
				</div>
				<div class="mt-1 max-w-xl mx-auto text-center">
					<span class="text-neutral-500">Already registered but not activated?</span> 
					<a href="/activate" class="text-primary-white hover:underline">Activate Here</a>
				</div>
			</div>
		</section>
	{/if}
{/key} 
