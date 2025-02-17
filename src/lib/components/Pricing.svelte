<script>
  import Card from './Card.svelte';
  import Button from './button.svelte';
</script>

<section class="relative z-30 w-full">
  <div class="max-w-7xl mx-auto px-4 py-8 grid grid-cols-12 gap-8">
    <div class="col-span-12 text-center mb-16">
      <h2 class="font-heading text-3xl">Simple, Transparent Pricing</h2>
      <p class="text-neutral-600">Start building for free, scale as you grow</p>
    </div>

    <div class="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Basic Plan -->
      <Card class="md:col-span-4 p-6 flex-col justify-between">
        <div>
          <h3 class="text-xl mb-2 font-heading">Basic</h3>
          <div class="mb-6">
            <span class="text-3xl font-bold">$0</span>
            <span class="text-neutral-600">/month</span>
          </div>
          <ul class="space-y-3 mb-6">
            <li class="flex items-center">
              <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              <span>100K requests/day</span>
            </li>
            <li class="flex items-center">
              <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              <span>3 networks</span>
            </li>
            <li class="flex items-center">
              <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              <span>Basic support</span>
            </li>
          </ul>
        </div>
        <a href="https://rpc.developerdao.com/signup">
          <Button variant="secondary" class="w-full">Get Started</Button>
        </a>
      </Card>

      <!-- Premier Plan -->
      <Card class="md:col-span-4 p-6 flex-col justify-between">
        <div class="absolute -right-12 top-6 bg-primary-white text-primary-black px-12 py-1 rotate-45">
          <span class="text-black">Popular</span>
        </div>
        <div>
          <h3 class="text-xl mb-2 font-heading">Premier</h3>
          <div class="mb-6">
            <span class="text-3xl font-bold">$99</span>
            <span class="text-neutral-600">/month</span>
          </div>
          <ul class="space-y-3 mb-6">
            <li class="flex items-center">
              <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              <span>1M requests/day</span>
            </li>
            <li class="flex items-center">
              <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              <span>All networks</span>
            </li>
            <li class="flex items-center">
              <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              <span>Priority support</span>
            </li>
            <li class="flex items-center">
              <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              <span>Advanced analytics</span>
            </li>
          </ul>
        </div>
        <a href="https://rpc.developerdao.com/signup">
          <Button variant="primary" class="w-full">Get Started</Button>
        </a>
      </Card>

      <!-- Gigachad Plan -->
      <Card class="md:col-span-4 p-6 flex-col justify-between">
        <div>
          <h3 class="text-xl mb-2 font-heading">Gigachad</h3>
          <div class="mb-6">
            <span class="text-3xl font-bold">$499</span>
            <span class="text-neutral-600">/month</span>
          </div>
          <ul class="space-y-3 mb-6">
            <li class="flex items-center">
              <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              <span>Unlimited requests</span>
            </li>
            <li class="flex items-center">
              <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              <span>All networks</span>
            </li>
            <li class="flex items-center">
              <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              <span>24/7 dedicated support</span>
            </li>
            <li class="flex items-center">
              <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              <span>Custom analytics</span>
            </li>
            <li class="flex items-center">
              <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              <span>SLA guarantee</span>
            </li>
            <li class="flex items-center">
              <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              <span>Self-managed infrastructure option (Pay as you go)</span>
            </li>
          </ul>
        </div>
        <a href="https://rpc.developerdao.com/signup">
          <Button variant="secondary" class="w-full">Contact Sales</Button>
        </a>
      </Card>
    </div>
  </div>
</section> 