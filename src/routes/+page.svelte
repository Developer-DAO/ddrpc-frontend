<div class="container h-full mx-auto flex flex-col justify-center items-center">
	<div class="space-y-14 text-center items-center">
		<div>
			<h1 class="h1 mt-5">
				<span
					class="bg-primary-800 dark:bg-primary-200 bg-clip-text text-transparent box-decoration-clone md:h-1/4 md:w-1/4"
					>Build Web3 With Superior Performance and Reliability</span
				>
			</h1>
			<h2 class="h2 italic">
				<span
					class="bg-primary-800 dark:bg-primary-200 bg-clip-text text-transparent box-decoration-clone md:h-1/4 md:w-1/4"
					>Instantly access 60+ chains and Support Public Goods
				</span>
			</h2>
		</div>
		<!-- Animated Logo -->
		<div class="flex flex-col lg:flex-row justify-center items-center">
			<figure>
				<section class="img-bg" />
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="fill-token -scale-x-[100%]"
					viewBox="0 0 200 200"
					width="100"
					height="100"
				>
					<circle cx="100" cy="100" r="40" stroke="black" stroke-width="4" fill="black" />
					<text
						x="-100"
						y="100"
						textLength="2em"
						font-size="30"
						alignment-baseline="middle"
						text-anchor="middle"
						transform="scale(-1, 1)"
					>
						D_D
					</text>
				</svg>
			</figure>
			<!-- / -->
			<div class="flex flex-col space-y-4 p-4 justify-center align-center">
				<p>Come see what sets us apart from the best!</p>
				<a class="btn variant-filled" href="/payments" rel="noreferrer">
					Get Started
				</a>
			</div>
		</div>
	</div>
	<div class="logo-cloud flex flex-col lg:flex-row gap-12 lg:space-x-12 justify-center align-center mt-10 lg:mt-0">
		<a class="h-92 my-10 lg:my-0 -ml-3 lg:-ml-0" href="/">
			<img alt="ethereum" src={'../../ethereum-logo.svg'} />
		</a>
		<a class="h-32 w-32 lg:pt-2" href="/">
			<img alt="scroll" src={'../../scroll-logo.svg'} />
		</a>
		<a class="h-32 w-32 lg:pt-4" href="/">
			<img alt="solana" src={'../../solana-wordmark-white.svg'} />
		</a>
		<a class="h-32 w-32 lg:pt-2" href="/">
			<img alt="polygon" src={'../../polygon-white-logo.svg'} />
		</a>
		<a class="h-16 w-16 lg:pt-2 ml-6 lg:ml-0" href="/">
			<img alt="sui" src={'../../sui-logo-white.svg'} />
		</a>

		<!-- ... -->
	</div>
	<div class="flex flex-col lg:flex-row lg:space-x-60 mt-20 lg:mt-10">
		<p class="text-xs text-gray-600">© 2024 The Developer DAO Foundation. All rights reserved.</p>
		<p />
        <p class="text-xs text-gray-600">
        Privacy policy
        </p>
	</div>
</div>

<style lang="postcss">
	figure {
		@apply flex relative flex-col;
	}
	figure svg,
	.img-bg {
		@apply w-64 h-64 md:w-80 md:h-80;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation:
			pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
			glow 5s linear infinite;
	}
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
