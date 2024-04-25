<script lang="ts">
	import { AxiosError, type AxiosResponse } from 'axios';
	import axios from 'axios';
	import { Stepper, Step, type ToastSettings } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';

	let passwordConfirmation: string = '';
	type RegisterUser = {
		email: string;
		password: string;
		wallet: string;
	};

	type ActivationRequest = {
		email: string;
		code: string;
	};

	let registration: RegisterUser = { email: '', password: '', wallet: '' };
	let activation: ActivationRequest = { email: '', code: '' };

	const register = async (userInfo: RegisterUser): Promise<void> => {
		console.log('Registering user...');
		await axios
			.post('http://localhost:3000/api/register', {
				email: userInfo.email,
				password: userInfo.password,
				wallet: userInfo.wallet
			})
			.then((ret: AxiosResponse) => {
				if (ret.status === 200) {
					console.log('Successfully registered user');
				}
			})
			.catch((error: AxiosError) => {
				console.error(error);
			});
	};

	const activate = async (activationInfo: ActivationRequest): Promise<void> => {
		await axios
			.post('http://localhost:3000/api/activate', {
				email: activationInfo.email,
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
				console.error(error);
			});
	};

	const toastSettings: ToastSettings = {
		message: 'The activation code you entered was incorrect. Please try again.',
	    background: 'variant-filled-error',
	};

	const tryActivate = async (activation: ActivationRequest): Promise<void> => {
		if (activation.code.length === 8) {
			console.log(`Code sent: ${activation.code}`);
			await activate(activation);
		} 
	};

	$: tryActivate(activation);

	$: {
		activation.email = registration.email;
	}
</script>

<div>
	<Stepper on:next={async () => await register(registration)}>
		<Step
			class="ml-5 mr-5"
			locked={!(
				passwordConfirmation === registration.password &&
				registration.password !== '' &&
				registration.password.length >= 8 &&
				registration.email !== '' &&
				passwordConfirmation !== '' &&
				registration.wallet !== '' &&
				registration.email.includes('@') &&
				registration.wallet.startsWith('0x') &&
				registration.wallet.length === 42
			)}
		>
			<svelte:fragment slot="header">Create Account</svelte:fragment>
			<form name="register" class="flex h-3/4 justify-center items-middle align-middle">
				<div class="flex flex-col justify-center items-center">
					<section class="mt-5 space-y-2">
						<label class="label">
							<span>Email</span>
							<input
								id="email"
								bind:value={registration.email}
								class="input"
								type="text"
								placeholder="emailaddress@aim.com"
								required
								autocomplete="email"
							/>
						</label>
						<label class="label">
							<span>Password</span>
							<input
								id="password"
								bind:value={registration.password}
								class="input"
								type="password"
								placeholder="..."
								required
							/>
						</label>
						<label class="label">
							<span>Confirm Password</span>
							<input
								id="pwconfirm"
								bind:value={passwordConfirmation}
								class="input"
								type="password"
								placeholder="..."
								required
							/>
						</label>

						<label id="wallet" class="label">
							<span>Ethereum Wallet</span>
							<input
								id="wallet"
								bind:value={registration.wallet}
								class="input"
								type="text"
								placeholder="0x..."
								required
							/>
						</label>
					</section>
				</div>
			</form>
		</Step>
		<Step class="ml-5">
			<svelte:fragment slot="header">{`Time to activate your account! Please check ${registration.email} for the activation code. `}</svelte:fragment>
			<form name="activate" class="flex h-3/4 justify-center items-middle align-middle">
				<div class="flex flex-col justify-center items-center">
					<section class="mt-5 space-y-2">
						<label class="label">
							<span>Activation Code</span>
							<input
								id="code"
								bind:value={activation.code}
								class="input"
								type="text"
								placeholder="00000000"
								required
							/>
						</label>
					</section>
				</div>
			</form>
		</Step>
		<!-- ... -->
	</Stepper>
</div>
