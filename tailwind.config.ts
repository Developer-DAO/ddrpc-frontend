import { join } from 'path'
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {
			colors: {
				'blue': {
					'50': '#edf2ff',
					'100': '#dde7ff',
					'200': '#c3d1ff',
					'300': '#9eb2ff',
					'400': '#7789ff',
					'500': '#5761fd',
					'600': '#3e3af2',
					'700': '#332cd6',
					'800': '#2a27ac',
					'900': '#282788',
					'950': '#19174f',
				},
				background: 'var(--background)',
				description: 'var(--description)',
			}
		},
		animation: {
			carrousel: "carrousel 20s linear infinite"
		},
		keyframes: {
			carrousel: {
				from: {
					transform: 'translateX(0)',
				},
				to: {
					transform: 'translateX(calc(-100% - 2.5rem))',
				},
			}
		}
	},
	plugins: [
		forms,
		typography
	],
} satisfies Config;

