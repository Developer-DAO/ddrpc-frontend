<script>
  import Card from './Card.svelte';
</script>

<section class="relative z-30 w-full">
  <div class="max-w-7xl mx-auto px-4 py-8 grid grid-cols-12 gap-8">
    <div class="col-span-12 text-center mb-16">
      <h2 class="font-heading text-3xl">Trusted by Builders</h2>
      <p class="text-neutral-600">See what developers are saying about our RPC infrastructure</p>
    </div>

    <div class="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Testimonial 1 -->
      <Card class="md:col-span-4 p-6 flex-col">
        <div class="flex flex-col gap-4">
          <p class="text-neutral-600">
            "Developer DAO Cloud's RPC infrastructure has been a game-changer for our dApp. The performance and reliability are unmatched."
          </p>
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-full bg-neutral-800" />
            <div>
              <p class="font-bold">Alex Chen</p>
              <p class="text-neutral-600">Lead Developer, DeFi Protocol</p>
            </div>
          </div>
        </div>
      </Card>

      <!-- Testimonial 2 -->
      <Card class="md:col-span-4 p-6 flex-col">
        <div class="flex flex-col gap-4">
          <p class="text-neutral-600">
            "The multi-chain support and consistent API made it incredibly easy to scale our application across different networks."
          </p>
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-full bg-neutral-800" />
            <div>
              <p class="font-bold">Sarah Williams</p>
              <p class="text-neutral-600">CTO, NFT Marketplace</p>
            </div>
          </div>
        </div>
      </Card>

      <!-- Testimonial 3 -->
      <Card class="md:col-span-4 p-6 flex-col">
        <div class="flex flex-col gap-4">
          <p class="text-neutral-600">
            "Switching to Developer DAO Cloud reduced our infrastructure costs by 40% while improving our dApp's performance."
          </p>
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-full bg-neutral-800" />
            <div>
              <p class="font-bold">Michael Rodriguez</p>
              <p class="text-neutral-600">Founder, Web3 Gaming</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</section> 