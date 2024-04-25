<script lang="ts">
	import { AxiosError, type AxiosResponse } from 'axios';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { apiKeys, authorized, type Keys } from '$lib/stores';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();
	const newKey = async (): Promise<void> => {
		await axios('http://localhost:3000/api/keys', { withCredentials: true, method: 'post' })
			.then((ret: AxiosResponse) => {
				if (ret.status === 200) {
					let key: Keys = { apikey: ret.data };
					apiKeys.update((arr) => {
						arr.push(key);
						return arr;
					});
				}
			})
			.catch((e: AxiosError) => {
				console.error(e);
			});
	};

	const getKeys = async (): Promise<void> => {
		await axios
			.get('http://localhost:3000/api/keys', { withCredentials: true })
			.then((ret: AxiosResponse) => {
				if (ret.status === 200) {
					apiKeys.set(ret.data);
					authorized.update(() => {
						return true;
					});
				}
			})
			.catch((e: AxiosError) => {
				console.error(e);
			});
	};

	const removeKey = async (key: string): Promise<void> => {
		await axios
			.delete(`http://localhost:3000/api/keys/${key}`, { withCredentials: true })
			.then((ret: AxiosResponse) => {
				if (ret.status === 200) {
					apiKeys.update((arr) => {
						arr = arr.filter((e) => e.apikey !== key);
						return arr;
					});
				}
			})
			.catch((e: AxiosError) => {
				console.error(e);
			});
	};

    function onConfirm(key: string): void {
		new Promise<boolean>((resolve) => {
			const modal: ModalSettings = {
				type: 'confirm',
				title: 'Please Confirm',
				body: 'Are you sure you wish to proceed?',
				response: (r: boolean) => {
					resolve(r);
				}
			};
			modalStore.trigger(modal);
		}).then((r: boolean) => {
			if (r  === true) {
				removeKey(key);
			}
		});
	}

	onMount(async () => {
		if ($apiKeys.length === 0) {
			await getKeys();
		}
	});
</script>

<div class="h-screen flex flex-col justify-center items-center">
	{#if $authorized}
		<div class="flex table-container w-2/3">
			<table class="table table-hover">
				<thead>
					<tr>
						<th>Number</th>
						<th>API Key</th>
					</tr>
				</thead>
				<tbody>
					{#each $apiKeys as row, i}
						<tr>
							<td>{i + 1}</td>
							<td>{row.apikey}</td>
							<td
								class="btn-icon variant-ghost text-red-400 hover:bg-black hover:font-extrabold"
								on:click={() => onConfirm(row.apikey)}>del</td
							>
						</tr>
					{/each}
				</tbody>
				<tfoot>
					<tr>
						<th colspan="3">Create Key</th>
						{#if $apiKeys.length === 10}
							<btn disabled clas="variant-ghost">new</btn>
						{:else}
							<td
								on:click={() => newKey()}
								class="btn variant-filled hover:bg-slate-600 hover:font-extrabold">new</td
							>
						{/if}
					</tr>
				</tfoot>
			</table>
		</div>
	{:else}
		<a href="/login" class="btn variant-filled mb-5">Login</a>
		<p>or</p>
		<a href="/register" class="btn variant-ghost mt-5">Register</a>
	{/if}
</div>
