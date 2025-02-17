<script>
  import Button from './button.svelte';
</script>

<nav class="relative z-40">
  <div class="container mx-auto py-5 flex justify-between items-center">
    <a class="font-heading text-2xl uppercase" href="/">D_D RPC</a>
    
    <div class="flex items-center gap-10">
      <a class="text-xs md:text-sm tracking-wide text-neutral-500 p-0 hover:text-primary-white transition-colors" href="/features">
        Features
      </a>
      <a class="text-xs md:text-sm tracking-wide text-neutral-500 p-0 hover:text-primary-white transition-colors" href="/features">
        Features
      </a>
      <a class="text-xs md:text-sm tracking-wide text-neutral-500 p-0 hover:text-primary-white transition-colors" href="/features">
        Features
      </a>
    </div>

    <div>
      <a href="/login">
        <Button variant="secondary">
          Login
        </Button>
      </a>
    </div>
  </div>
  <div class="h-[1px] w-full bg-neutral-800"></div>
</nav>
