<script lang="ts">
	import { AxiosError, type AxiosResponse } from 'axios';
	import axios from 'axios';
	import { Stepper, Step, type ToastSettings } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';

	type RegisterUser = {
		email: string;
		password: string;
		passwordConfirmation: string;
		wallet: string;
	};

	type ActivationRequest = {
		code: string;
	};

	let registerFormValues: RegisterUser = { email: '', password: '', passwordConfirmation: '', wallet: '' };
	let activationFormValues: ActivationRequest = { code: '' };

	let showRegisterForm = true;
	let showActivationForm = false;

	const register = async (userInfo: RegisterUser): Promise<void> => {
		console.log('Registering user...', userInfo);
		await axios
			.post('http://localhost:3000/api/register', {
				email: userInfo.email,
				password: userInfo.password,
				wallet: userInfo.wallet
			})
			.then((ret: AxiosResponse) => {
				if (ret.status === 200) {
					console.log('Successfully registered user');
					showRegisterForm = false;
					showActivationForm = true;
				}
			})
			.catch((error: AxiosError) => {
				console.error(error);
			});
	};

	const activate = async (activationInfo: ActivationRequest): Promise<void> => {
		await axios
			.post('http://localhost:3000/api/activate', {
				email: registerFormValues.email,
				code: activationInfo.code
			})
			.then((ret: AxiosResponse) => {
				if (ret.status === 200) {
					location.href = './login';
				} else {
					getToastStore().trigger(toastSettings);
        }
			})
			.catch((error: AxiosError) => {
					getToastStore().trigger(toastSettings);
			});
	};

	const toastSettings: ToastSettings = {
		message: 'The activation code you entered was incorrect. Please try again.',
	    background: 'variant-filled-error',
	};

</script>

<div class="container mx-auto px-5">
	{#if showRegisterForm}
		<form class="max-w-xl mx-auto space-y-2" name="register" on:submit={() => {register(registerFormValues)}}>
				<h1 class="font-bold text-xl self-center">Create Account</h1>
				<div class="flex flex-col">
						<label for="email">Email</label>
						<input 
							bind:value={registerFormValues.email}
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
							bind:value={registerFormValues.password}
							class="input"
							type="password"
							placeholder="Enter your password"
							required
						/>
				</div>
				<div class="flex flex-col">
						<label for="pwconfirm">Confirm Password</label>
						<input 
							bind:value={registerFormValues.passwordConfirmation}
							class="input"
							type="password"
							placeholder="Repeat your password"
							required
						/>
				</div>
				<div class="flex flex-col">
						<label for="wallet">Ethereum Wallet</label>
						<input 
							bind:value={registerFormValues.wallet}
							class="input"
							type="text"
							placeholder="0x..."
							required
						/>
				</div>
				<div class="flex space-x-2 justify-end">
					<button type="submit" class="button-primary mt-5">Register</button>
				</div>
		</form>
		{/if}

		{#if showActivationForm}
		<form class="max-w-xl mx-auto space-y-2" name="activate" on:submit={() => {activate(activationFormValues)}}>
				<h1 class="font-bold text-xl self-center">Activate Your Account</h1>
				<div class="flex flex-col">
						<label for="code">Activation Code</label>
						<input bind:value={activationFormValues.code} class="input" type="text" placeholder="00000000" required/>
				</div>
				<div class="flex space-x-2 justify-end">
					<button type="submit" class="button-primary mt-5">Activate</button>
				</div>
		</form>
		{/if}
	<div class="mt-3 max-w-xl mx-auto">
		Do you have an account? <a href="/login" class="underline">Login Here</a>
	</div>
</div>