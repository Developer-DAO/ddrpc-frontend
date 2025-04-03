<script>
  import Card from './Card.svelte';
</script>

<section class="relative z-30 w-full">
  <div class="max-w-7xl mx-auto px-4 py-8 grid grid-cols-12 gap-8">
    <Card class="col-span-12">
      <div class="w-full md:w-1/2 space-y-4">
        <h2 class="font-heading text-3xl">
          High-Performance RPC Network
        </h2>
        <p class="text-neutral-600">
          Our decentralized RPC network ensures your transactions are relayed quickly and reliably across multiple chains. Built on Pocket Network's infrastructure, we provide enterprise-grade performance with 99.9% uptime.
        </p>
        <div class="flex flex-wrap gap-4">
          <div class="flex items-center gap-2">
            <svg class="h-5 w-5" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
            <span>Load balanced</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="h-5 w-5" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
            <span>Multi-chain support</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="h-5 w-5" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
            <span>DDoS protection</span>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/2 relative h-[300px]">
        <img
          src="/rpc-diagram.svg"
          alt="RPC Network Diagram"
          class="w-full h-full object-contain"
        />
      </div>
    </Card>
  </div>
</section> 