<script>
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
    import Button from './button.svelte';
  
  let fontsLoaded = false;
  
  onMount(() => {
    fontsLoaded = true;
  });
</script>

<section class="relative z-30 flex min-h-[50vh] w-full flex-col items-center justify-center gap-6">
  <div class="absolute right-0 top-0 z-20 h-screen w-screen">
    <div transition:fade={{ delay: 800, duration: 300 }}>
      <img 
        class="h-full w-full object-contain"
        src="/bgBlackStars.svg" 
        alt="" 
      />
    </div>
  </div>
  
  <div class="absolute right-0 top-0 z-20 h-screen w-screen">
    <div transition:fade={{ delay: 500, duration: 500 }}>
      <img 
        class="h-full w-full object-contain"
        src="/rays.svg" 
        alt="" 
      />
    </div>
  </div>

  {#if fontsLoaded}
    <div class="z-50 m-6 max-w-5xl flex w-full flex-col items-center justify-center gap-2 text-center">
      <div class="relative">
        <div transition:fade={{ delay: 2000, duration: 300 }}>
          <img
            class="absolute hidden md:block md:-right-1 md:-top-12 w-[70px] h-[70px]"
            src="/shine.svg"
            alt=""
          />
        </div>
        <h1 class="font-heading text-4xl md:text-6xl">
          HIGH PERFORMANCE CLOUD INFRASTRUCTURE
        </h1>
      </div>

      <p class="font-paragraph font-normal mb-6 px-10 md:px-0 text-neutral-600">
        Lightning-fast, reliable infrastructure by Futex Labs 
      </p>

      <div class="flex flex-col gap-4 md:flex-row">
        <a href="/login" target="_blank">
          <Button variant="primary">
            <svg class="h-5 w-5" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
            <a href="/login">Login</a>
          </Button>
        </a>

        <a href="https://docs.cloud.developerdao.com/">
          <Button variant="secondary">
            Documentation
          </Button>
        </a>
      </div>
    </div>
  {/if}
</section>
