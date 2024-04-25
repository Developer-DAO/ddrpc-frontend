<script lang="ts">
	import { authorized } from '$lib/stores';
	import { AxiosError, type AxiosResponse } from 'axios';
	import axios from 'axios';

	let recoveryRequest: RecoveryRequest = { email: undefined };
	let stepOne: boolean = false;
	let recoveryCode: string | undefined = undefined;

	type RecoveryRequest = {
		email?: string;
	};

	const requestRecovery = async (req: RecoveryRequest): Promise<void> => {
		await axios
			.get(`http://localhost:3000/api/recovery/${req.email}`)
			.then((res: AxiosResponse) => {
				if (res.status === 200) {
					authorized.update(() => {
						return true;
					});
					stepOne = true;
				}
			})
			.catch((e: AxiosError) => {
				console.error(e);
			});
	};

	type UpdatePassword = {
		code?: string;
		email?: string;
	};

	const updatePassword = async (req: UpdatePassword): Promise<void> => {
		if (req.code?.length === 8) {
			await axios
				.post('http://localhost:3000/api/recovery', { req })
				.then((res: AxiosResponse) => {
					if (res.status === 200) {
						authorized.update(() => {
							return true;
						});
						location.href = '/login';
					}
				})
				.catch((e: AxiosError) => {
					console.error(e);
				});
		}
	};

	$: updatePassword({ code: recoveryCode, email: recoveryRequest.email });
</script>

<div class="flex mx-auto h-screen justify-center items-center align-middle">
	<form
		name="login"
		on:submit={() => {
			requestRecovery(recoveryRequest);
		}}
		class="h-1/2 w-1/2 flex flex-col"
	>
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
					</form>
					<div class="flex flex-row justify-end space-x-2">
						<button type="submit" class="btn variant-filled mt-5"> Recover Password </button>
					</div>
				</label>
			{:else}
				<label class="label">
					<span>Email</span>
					<input
						id="email"
						bind:value={recoveryCode}
						class="input"
						type="text"
						placeholder="Input"
						required
						autocomplete="email"
					/>
				</label>
			{/if}
		</section>
	</form>
</div>
