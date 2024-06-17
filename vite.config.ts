import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), purgeCss()],
	build: {
    rollupOptions: {
      external: [
        'http', 'https', 'zlib', 'stream', 'events', 'path', 'fs', 'util', 'url', 'tty', 'os'
      ]
    }
  }
});