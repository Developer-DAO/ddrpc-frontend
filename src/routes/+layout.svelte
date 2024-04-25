<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { authorized } from '$lib/stores';
	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
    import { LightSwitch } from '@skeletonlabs/skeleton';
    import { initializeStores, Modal, Toast } from '@skeletonlabs/skeleton';
    initializeStores();
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- App Shell -->

<Toast/>
<Modal />
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar class="opacity-80">
			<svelte:fragment slot="lead">
				<a class="text-3xl uppercase ml-4" href="/">Developer DAO</a></svelte:fragment
			>
			<svelte:fragment slot="trail">
                <LightSwitch />
				<a
					class="btn btn-sm variant-ghost-surface"
					href="/dashboard"
					rel="noreferrer"
				>
					Pricing
				</a>
				{#if $authorized}
					<a
						class="btn btn-sm variant-ghost-surface"
						href="/dashboard"
						rel="noreferrer"
					>
						Dashboard
					</a>
				{:else}
					<a
						class="btn btn-sm variant-ghost-surface"
						href="/login"
						rel="noreferrer"
					>
						Login
					</a>
					<a
						class="btn btn-sm variant-ghost-surface"
						href="/register"
						rel="noreferrer"
					>
						Register
					</a>

				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
