<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { onMount, onDestroy } from 'svelte';

  // Toast props
  export let type: 'success' | 'error' | 'info' | 'warning' = 'info';
  export let message: string = '';
  export let duration: number = 3000;
  export let position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center' = 'top-right';
  export let onClose: () => void = () => {};

  // Internal state
  let timer: ReturnType<typeof setTimeout>;
  let visible = true;

  // Calculate styles based on position
  const getPositionClass = () => {
    switch (position) {
      case 'top-right': return 'top-4 right-4';
      case 'top-left': return 'top-4 left-4';
      case 'bottom-right': return 'bottom-4 right-4';
      case 'bottom-left': return 'bottom-4 left-4';
      case 'top-center': return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-center': return 'bottom-4 left-1/2 transform -translate-x-1/2';
      default: return 'top-4 right-4';
    }
  };

  // Get color theme based on toast type
  const getTypeStyles = () => {
    switch (type) {
      case 'success': return 'bg-green-900/80 border-green-500 text-green-200';
      case 'error': return 'bg-red-900/50 border border-red-500 text-red-200';
      case 'warning': return 'bg-yellow-900/80 border-yellow-500 text-yellow-200';
      case 'info': return 'bg-blue-900/80 border-blue-500 text-blue-200';
      default: return 'bg-neutral-900/80 border-neutral-500 text-neutral-200';
    }
  };

  // Set timer to auto-close the toast
  onMount(() => {
    if (duration > 0) {
      timer = setTimeout(() => {
        close();
      }, duration);
    }
  });

  // Clean up timer
  onDestroy(() => {
    if (timer) clearTimeout(timer);
  });

  // Close the toast
  function close() {
    visible = false;
    if (timer) clearTimeout(timer);
    setTimeout(() => {
      onClose();
    }, 300); // Wait for transition to complete
  }
</script>

{#if visible}
  <div 
    class="fixed z-50 {getPositionClass()} {getTypeStyles()} px-4 py-3 rounded-md shadow-lg border"
    transition:fly={{ y: position.startsWith('top') ? -20 : 20, duration: 300 }}
    role="alert"
  >
    <div class="flex items-center">
      <!-- Icon based on type -->
      {#if type === 'success'}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
      {:else if type === 'error'}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
      {:else if type === 'warning'}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>
      {/if}
      
      <!-- Message -->
      <div class="mr-8">{message}</div>
      
      <!-- Close button -->
      <button 
        class="absolute top-3 right-3 text-current hover:text-white transition-colors"
        on:click={close}
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
{/if} 