<script lang="ts">
  import Button from './button.svelte';
  import { user } from '$lib/stores';
  import { authService } from '$lib/services/auth';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  let showUserMenu = $state(false);
  
  onMount(() => {
    // Restore user session on mount
    authService.restoreSession();
  });
  
  function toggleUserMenu() {
    showUserMenu = !showUserMenu;
  }
  
  async function handleLogout() {
    await authService.logout();
    window.location.href = '/';
  }
</script>

<nav class="relative z-40">
  <div class="container mx-auto py-5 flex justify-between items-center">
    <a class="font-heading text-2xl uppercase" href="/">
      <img src="/logo.png" alt="D_D RPC" class="w-[70px] h-[70px]" />
    </a>
    
    <div class="flex items-center gap-10">
      <a class="text-xs md:text-sm tracking-wide text-neutral-500 p-0 hover:text-primary-white transition-colors" href="/">
        Home
      </a>
      <a class="text-xs md:text-sm tracking-wide text-neutral-500 p-0 hover:text-primary-white transition-colors" href="/features">
        Features
      </a>
      {#if $user.isAuthenticated}
        <a class="text-xs md:text-sm tracking-wide text-neutral-500 p-0 hover:text-primary-white transition-colors" href="/dashboard">
          Dashboard
        </a>
      {/if}
    </div>

    <div>
      {#if $user.isAuthenticated}
        <div class="relative">
          <button 
            onclick={toggleUserMenu}
            class="flex items-center gap-2 text-sm text-neutral-300 hover:text-primary-white transition-colors py-2 px-4 rounded-full border border-neutral-700 hover:border-neutral-500"
          >
            <span class="hidden sm:inline">{$user.email}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </button>
          
          {#if showUserMenu}
            <div 
              transition:fade={{ duration: 150 }}
              class="absolute right-0 mt-2 w-48 bg-neutral-800 border border-neutral-700 rounded-md shadow-lg py-1 z-50"
            >
              <div class="px-4 py-2 text-sm text-neutral-400 border-b border-neutral-700">
                Signed in as <span class="font-semibold text-primary-white">{$user.email}</span>
              </div>
              <a href="/dashboard" class="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700 hover:text-primary-white">
                Dashboard
              </a>
              <a href="/dashboard/api-keys" class="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700 hover:text-primary-white">
                API Keys
              </a>
              <button 
                onclick={handleLogout}
                class="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-neutral-700 hover:text-red-300"
              >
                Sign out
              </button>
            </div>
          {/if}
        </div>
      {:else}
        <a href="/login">
          <Button variant="secondary">
            Login
          </Button>
        </a>
      {/if}
    </div>
  </div>
  <div class="h-[1px] w-full bg-neutral-800"></div>
</nav>
