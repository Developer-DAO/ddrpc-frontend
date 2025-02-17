<script lang="ts">
  export let variant = 'primary';
  
  const styles = {
    primary: 'flex w-fit items-center justify-center gap-1 rounded-full border-2 tracking-wider transition-all h-12 px-6 text-sm text-primary-black border-primary-white bg-primary-white shadow-3xl   shadow-white/80 font-paragraph  font-medium drop-shadow-[3px_0_30px_rgba(254,254,254,0.472)] transition-all hover:drop-shadow-[10px_0_40px_rgba(254,254,254,0.472)] cursor-pointer',
    secondary: 'flex w-fit items-center justify-center gap-1 rounded-full border-2 tracking-wider transition-all h-12 px-6 text-sm text-neutral-500 hover:text-primary-white border-neutral-600 hover:border-primary-white bg-neutral-800 hover:bg-neutral-700 font-paragraph font-semibold tracking-wider cursor-pointer'
  };
</script>

<button
  class={styles[variant as keyof typeof styles]}
  {...$$restProps}
>
  <slot />
</button>
