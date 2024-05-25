<script lang="ts">
  import { authorized } from '$lib/stores';

  function logout() {
    authorized.update(() => false);
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/api;';
    window.location.href = "/";
  }
</script>

<nav>
  <div class="container mx-auto py-5 flex justify-between items-center">
    <a class="text-xl uppercase w-[100px]" href={$authorized ? '/dashboard' : '/'}>D_D RPC</a>
    <div class="flex items-center gap-10">
      {#if $authorized}
        <a class="text-sm" href="/dashboard" rel="noreferrer">
        </a>
      {:else}
        <a class="text-sm" href="/pricing" rel="noreferrer">
          Features
        </a>
        <a class="text-sm" href="/pricing" rel="noreferrer">
          Cool Stuff
        </a>
        <a class="text-sm" href="/pricing" rel="noreferrer">
          Pricing
        </a>
      {/if}
    </div>
    <div class="w-[100px]">
      {#if $authorized}
        <button class="text-sm button-outline ml-auto" on:click={() => logout()}>
          Log out
        </button>
      {:else}
        <a class="text-sm button-outline ml-auto" href="/login" rel="noreferrer">
          Login
        </a>
      {/if}
    </div>
  </div>
  <div class="divider"></div>
</nav>
