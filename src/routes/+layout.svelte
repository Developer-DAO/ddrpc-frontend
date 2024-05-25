<script lang="ts">
	import '../app.postcss';

	import { initializeStores, Modal, Toast } from '@skeletonlabs/skeleton';
	import Navbar from '../components/navbar.svelte';

	initializeStores();
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
</svelte:head>

<!-- App Shell -->
<Toast/>
<Modal />
<Navbar />
<div class="mt-10">
	<slot />
</div>
