<script lang="ts">
	import { fade } from 'svelte/transition';
	import Button from '$lib/components/button.svelte';
	import { authorized } from '$lib/stores';
	import type { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
	import axiosDefault from 'axios';
	import { onMount } from 'svelte';
	const axios: AxiosInstance = axiosDefault;

	type LoginRequest = {
		email: string;
		password: string;
	};

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
		return () => {
			mounted = false;
		};
	});

	let loginFields = $state<LoginRequest>({ email: '', password: '' });

	const tryLogin = async (login: LoginRequest): Promise<void> => {
		try {
			const res: AxiosResponse = await axios.post(
				'http://localhost:3000/api/login',
				{
					email: login.email,
					password: login.password
				},
				{
					withCredentials: true
				}
			);

			if (res.status === 200) {
				authorized.update(() => true);
				window.location.href = '/dashboard';
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
							type="text"
							placeholder="vitalik@developerdao.com"
							required
							autocomplete="email"
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
					<div class="flex justify-between mt-5">
						<a href="/recovery">
							<Button variant="secondary">Forgot Password</Button>
						</a>
						<Button type="submit" variant="primary">Sign In</Button>
					</div>
				</form>
			</div>
			<div class="container z-50 mx-auto px-5 mt-3">
				<div class="max-w-xl mx-auto text-center">
					<span class="text-neutral-500">You don't have an account?</span> 
					<a href="/register" class="text-primary-white hover:underline">Register Here</a>
				</div>
			</div>
		</section>
	{/if}
{/key} 