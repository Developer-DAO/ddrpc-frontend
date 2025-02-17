<script>
  let className = '';
  export { className as class };
</script>

<div class={`border-gray-200/20 relative overflow-hidden rounded-4xl p-6 col-span-12 border-2 border-primary-grey backdrop-blur-lg p-8 flex flex-col md:flex-row gap-8 items-center ${className}`}>
  <slot />
</div> 