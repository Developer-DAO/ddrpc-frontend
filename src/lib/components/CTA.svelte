<script>
  import Button from './button.svelte';
</script>

<section class="relative w-full bg-neutral-900">
  <div class="max-w-7xl mx-auto px-4 py-16 grid grid-cols-12">
    <div class="col-span-12 flex flex-col items-center text-center gap-8">
      <h2 class="font-heading text-3xl">Ready to Start Building?</h2>
      <p class="text-neutral-600 max-w-2xl">
        Get your API key in seconds and start building with Developer DAO Cloud's high-performance RPC infrastructure 
      </p>
      <a href="https://cloud.developerdao.com/signup">
        <Button variant="primary" class="font-paragraph font-medium drop-shadow-[3px_0_30px_rgba(254,254,254,0.472)] transition-all hover:drop-shadow-[10px_0_40px_rgba(254,254,254,0.472)]">
          <svg class="h-5 w-5" viewBox="0 0 24 24">
            <path d="M3.24 6.15C2.51 6.43 2 7.17 2 8V16C2 16.83 2.51 17.57 3.24 17.85L8.97 20.85L11.04 19.62L7.86 17.5L13 14.35L13 9.65L7.86 6.5L11.04 4.38L8.97 3.15L3.24 6.15M21 16.5L21 7.5L16 4.5L16 7.09L19 8.91L19 15.09L16 16.91L16 19.5L21 16.5M15 4L9 8L15 12L15 4M9 20L15 16L9 12L9 20Z" fill="currentColor"/>
          </svg>
          Get Your API Key
        </Button>
      </a>
    </div>
  </div>
</section> 
