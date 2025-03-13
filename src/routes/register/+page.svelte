<script lang="ts">
	import { fade } from 'svelte/transition';
	import Button from '$lib/components/button.svelte';
	import type { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
	import axiosDefault from 'axios';
	import { onMount } from 'svelte';
	const axios: AxiosInstance = axiosDefault;

	type RegisterUser = {
		email: string;
		password: string;
		passwordConfirmation: string;
		wallet: string;
	};

	type ActivationRequest = {
		code: string;
	};

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
		return () => {
			mounted = false;
		};
	});

	let { registerFormValues, activationFormValues, showRegisterForm, showActivationForm } = $state({
		registerFormValues: { email: '', password: '', passwordConfirmation: '', wallet: '' },
		activationFormValues: { code: '' },
		showRegisterForm: true,
		showActivationForm: false
	});

	const register = async (userInfo: RegisterUser): Promise<void> => {
		console.log('Registering user...', userInfo);
		try {
			const ret: AxiosResponse = await axios.post('http://localhost:3000/api/register', {
				email: userInfo.email,
				password: userInfo.password,
				wallet: userInfo.wallet
			});

			if (ret.status === 200) {
				console.log('Successfully registered user');
				showRegisterForm = false;
				showActivationForm = true;
			}
		} catch (error) {
			console.error(error as AxiosError);
		}
	};

	const activate = async (activationInfo: ActivationRequest): Promise<void> => {
		try {
			const ret: AxiosResponse = await axios.post('http://localhost:3000/api/activate', {
				email: registerFormValues.email,
				code: activationInfo.code
			});

			if (ret.status === 200) {
				window.location.href = '/login';
			}
		} catch (error) {
			console.error(error as AxiosError);
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
				{#if showRegisterForm}
					<form
						class="max-w-xl mx-auto space-y-2"
						name="register"
						on:submit|preventDefault={() => {
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
						<div class="flex flex-col">
							<label for="wallet" class="text-neutral-500">Ethereum Wallet</label>
							<input
								bind:value={registerFormValues.wallet}
								class="flex w-full items-center justify-center gap-1 rounded-full border-2 tracking-wider transition-all h-12 px-6 text-sm text-neutral-500 hover:text-primary-white border-neutral-600 hover:border-primary-white bg-neutral-800 hover:bg-neutral-700 font-paragraph font-semibold"
								type="text"
								placeholder="0x..."
								required
							/>
						</div>
						<div class="flex space-x-2 justify-end">
							<Button type="submit" variant="primary" class="mt-5">Register</Button>
						</div>
					</form>
				{/if}

				{#if showActivationForm}
					<form
						class="max-w-xl mx-auto space-y-2"
						name="activate"
						on:submit|preventDefault={() => {
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
						<div class="flex space-x-2 justify-end">
							<Button type="submit" variant="primary" class="mt-5">Activate</Button>
						</div>
					</form>
				{/if}
				<div class="mt-3 max-w-xl mx-auto text-center">
					<span class="text-neutral-500">Do you have an account?</span> 
					<a href="/login" class="text-primary-white hover:underline">Login Here</a>
				</div>
			</div>
		</section>
	{/if}
{/key} 