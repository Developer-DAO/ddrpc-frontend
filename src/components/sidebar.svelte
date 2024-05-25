<script lang="ts">
  import { onMount } from 'svelte';

  const links = [
    { url: '/dashboard', text: 'API Keys' },
    { url: '/billing', text: 'Billing' }
  ];

  let currentPath = '';

  onMount(() => {
    currentPath = window.location.pathname;
  });
</script>

<aside class="flex-col gap-5 w-56 hidden md:flex">
  {#each links as link}
    <a href={link.url}
       class="button-link w-full justify-left"
       class:button-link-active={link.url === currentPath}
    >
      {link.text}
    </a>
  {/each}
</aside>
