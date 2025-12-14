<script lang="ts">
  import Hero from '$lib/components/hero.svelte';
  import Features from '$lib/components/Features.svelte';
  import Stats from '$lib/components/Stats.svelte';
  import Pricing from '$lib/components/Pricing.svelte';
//  import Testimonials from '$lib/components/Testimonials.svelte';
  import CTA from '$lib/components/CTA.svelte';
</script>

<article id="cloud" class="text-primary-white relative overflow-hidden">
  <div class="relative w-screen overflow-hidden p-4 md:p-0">
    <Hero />
    <Features />
    <Stats />
    <Pricing />
<!-- <Testimonials /> -->
    <CTA />
  </div>
</article>
