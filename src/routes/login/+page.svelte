<script lang="ts">
	import { authorized } from '$lib/stores';
	import { AxiosError, type AxiosResponse } from 'axios';
	import axios from 'axios';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	let loginFields: LoginRequest = { email: '', password: '' };

	const toast = getToastStore();

	type LoginRequest = {
		email: string;
		password: string;
	};

	const toastSettings: ToastSettings = {
		message: 'Email or password is invalid',
		background: 'variant-filled-error'
	};

	const tryLogin = async (login: LoginRequest): Promise<void> => {
		await axios
			.post(
				'http://localhost:3000/api/login',
				{
					email: login.email,
					password: login.password
				},
				{
					withCredentials: true
				}
			)
			.then((res: AxiosResponse) => {
				if (res.status === 200) {
					authorized.update(() => {
						return true;
					});
					location.href = '/dashboard';
				} else {
					toast.trigger(toastSettings);
				}
			})
			.catch((e: AxiosError) => {
				toast.trigger(toastSettings);
				console.error(e);
			});
	};
</script>

<div class="container mx-auto px-5">
	<form
		class="max-w-xl mx-auto"
		name="login"
		on:submit={() => {
			tryLogin(loginFields);
		}}
	>
		<h1 class="font-bold text-xl self-center">Login</h1>
		<div class="mt-5 space-y-2">
			<div class="flex flex-col">
				<label for="email">Email</label>
				<input
					id="email"
					bind:value={loginFields.email}
					class="input"
					type="text"
					placeholder="vitalik@developerdao.com"
					required
					autocomplete="email"
				/>
			</div>
			<div class="flex flex-col">
				<label for="password">Password</label>
				<input
					id="password"
					bind:value={loginFields.password}
					class="input"
					type="password"
					placeholder="Enter your password"
					required
				/>
			</div>
		</div>
		
		<div class="flex flex-row justify-between space-x-2">
			<a href="/recovery" class="button-outline mt-5"> Forgot Password </a>
			<button type="submit" class="button-primary mt-5"> Sign-In </button>
		</div>
		<div class="mt-3">
			You don't have an account? <a href="/register" class="underline">Register Here</a>
		</div>

	</form>
</div>
