<script lang="ts">
  import { toasts } from '$lib/stores/toast';
  import Toast from './Toast.svelte';
</script>

{#if $toasts.length > 0}
  {#each $toasts as toast (toast.id)}
    <Toast 
      type={toast.type}
      message={toast.message}
      duration={toast.duration || 3000}
      position={toast.position || 'top-right'}
      onClose={() => toasts.remove(toast.id)}
    />
  {/each}
{/if} 