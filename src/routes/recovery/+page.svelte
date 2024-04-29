<script lang="ts">
	import { AxiosError, type AxiosResponse } from 'axios';
	import axios from 'axios';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	let recoveryRequest: RecoveryRequest = { email: '' };
	let stepOne: boolean = false;
	let updatePassReq: UpdatePassword = { code: '', email: '', password: '' };
	const toast = getToastStore();

	const getActivationToast = (email: string): ToastSettings => {
		return {
			message: `An email with your reset code was sent to ${email}.`,
			background: 'variant-filled'
		};
	};

	$: {
		updatePassReq.email = recoveryRequest.email;
	}

	type UpdatePassword = {
		code: string;
		email: string;
		password: string;
	};

	type RecoveryRequest = {
		email: string;
	};

	const requestRecovery = async (req: RecoveryRequest): Promise<void> => {
		console.log('recovery request sent...');
		await axios
			.get(`http://localhost:3000/api/recovery/${req.email}`)
			.then((res: AxiosResponse) => {
				if (res.status === 200) {
					stepOne = true;
					toast.trigger(getActivationToast(recoveryRequest.email));
				}
			})
			.catch((e: AxiosError) => {
				console.error(e);
			});
	};

	const updatePassword = async (req: UpdatePassword): Promise<void> => {
		console.log('attempting to update password ...');
		console.log(req);
		await axios
			.post('http://localhost:3000/api/recovery', {
				code: req.code,
				email: req.email,
				password: req.password
			})
			.then((res: AxiosResponse) => {
				if (res.status === 200) {
					location.href = '/login';
				}
			})
			.catch((e: AxiosError) => {
				console.error(e);
			});
	};
</script>

<div class="flex mx-auto h-screen justify-center items-center align-middle">
	<container name="login" class="h-1/2 w-1/2 flex flex-col">
		<header class="font-bold text-xl self-center">Recover Account</header>
		<hr class="!border-t-8 mt-5" />
		<section class="mt-5 space-y-2">
			{#if !stepOne}
				<label class="label">
					<span>Email</span>
					<form on:submit={() => requestRecovery(recoveryRequest)}>
						<input
							id="email"
							bind:value={recoveryRequest.email}
							class="input"
							type="text"
							placeholder="Input"
							required
							autocomplete="email"
						/>
						<div class="flex flex-row justify-end space-x-2">
							<button type="submit" class="btn variant-filled mt-5"> Recover Password </button>
						</div>
					</form>
				</label>
			{:else}
				<label class="label">
					<span>Code</span>
					<form class="flex flex-col gap-4" on:submit={() => updatePassword(updatePassReq)}>
						<input
							id="code"
							bind:value={updatePassReq.code}
							class="input"
							type="text"
							placeholder="Input"
							required
						/>
						<span>New Password</span>
						<input
							id="password"
							bind:value={updatePassReq.password}
							class="input"
							type="text"
							placeholder="Input"
							required
						/>
						<div class="flex flex-row justify-end space-x-2">
							<button type="submit" class="btn variant-filled mt-5"> Complete </button>
						</div>
					</form>
				</label>
			{/if}
		</section>
	</container>
</div>
