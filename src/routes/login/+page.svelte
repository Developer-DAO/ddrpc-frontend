<script lang="ts">
	import { authorized } from '$lib/stores';
	import { AxiosError, type AxiosResponse } from 'axios';
	import axios from 'axios';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	let ep: LoginRequest = { email: undefined, password: undefined };
	const toast = getToastStore();
	type LoginRequest = {
		email?: string;
		password?: string;
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
					email: login?.email,
					password: login?.password
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
					location.href = './dashboard';
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

<div class="flex mx-auto h-screen justify-center items-center align-middle">
	<form
		name="login"
		on:submit={() => {
			tryLogin(ep);
		}}
		class="h-1/2 w-1/2 flex flex-col"
	>
		<header class="font-bold text-xl self-center">Login</header>
		<hr class="!border-t-8 mt-5" />
		<section class="mt-5 space-y-2">
			<label class="label">
				<span>Email</span>
				<input
					id="email"
					bind:value={ep.email}
					class="input"
					type="text"
					placeholder="Input"
					required
					autocomplete="email"
				/>
			</label>
			<label class="label">
				<span>Password</span>
				<input
					id="password"
					bind:value={ep.password}
					class="input"
					type="password"
					placeholder="Input"
					required
				/>
			</label>
		</section>
		<div class="flex flex-row justify-end space-x-2">
			<a href="/recovery" class="btn variant-ghost mt-5"> Forgot Password </a>
			<button type="submit" class="btn variant-filled mt-5"> Sign-In </button>
		</div>
	</form>
</div>
