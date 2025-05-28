<script lang="ts">
    import { fade } from "svelte/transition";
    import Button from "$lib/components/button.svelte";
    import { onMount } from "svelte";
    import { authService } from "$lib/services/auth";
    import { toasts } from "$lib/stores/toast";
    import { goto } from "$app/navigation";
    import { type EthWindow, type EthereumProvider } from "$lib/types";

    //	const API_BASE_URL = 'http://localhost:3000/api';

    type LoginRequest = {
        email: string;
        password: string;
    };

    let mounted = $state(false);
    let loginFields = $state<LoginRequest>({ email: "", password: "" });
    let isSubmitting = $state(false);
    let activeTab = $state("email"); // 'email' or 'wallet'
    let walletAddress = $state("");
    let isConnecting = $state(false);

    // Type definition for ethereum provider
    // Separate the init logic from onMount
    async function initAuth() {
        // Check if already authenticated
        const isAuth = authService.isAuthenticated();
        if (isAuth) {
            goto("/dashboard");
            return;
        }

        // Attempt to restore session
        const sessionRestored = await authService.restoreSession();
        if (sessionRestored) {
            goto("/dashboard");
        }
    }

    onMount(() => {
        mounted = true;

        // Run the auth init
        initAuth();

        return () => {
            mounted = false;
        };
    });

    const tryLogin = async (login: LoginRequest): Promise<void> => {
        isSubmitting = true;

        try {
            const success = await authService.login(
                login.email,
                login.password,
            );

            if (success) {
                toasts.success("Login successful! Redirecting to dashboard...");
                goto("/dashboard");
            } else {
                toasts.error(
                    "Login failed. Please check your credentials and try again.",
                );
            }
        } catch (error) {
            console.error("Login error:", error);
            toasts.error(
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred during login",
            );
        } finally {
            isSubmitting = false;
        }
    };

    const connectWallet = async () => {
        if (!("ethereum" in window)) {
            toasts.error(
                "MetaMask not detected. Please install MetaMask and try again.",
            );
            return;
        }

        const ethereum = (window as EthWindow).ethereum!;
        isConnecting = true;
        try {
            // Request account access
            const accounts = (await ethereum.request({
                method: "eth_requestAccounts",
            })) as string[];
            walletAddress = accounts[0];
        } catch (error) {
            console.error("Error connecting to wallet:", error);
            toasts.error("Failed to connect wallet");
        } finally {
            isConnecting = false;
        }
    };

    const loginWithWallet = async () => {
        if (!walletAddress) {
            toasts.error("Please connect your wallet first");
            return;
        }
        if (!("ethereum" in window)) {
            toasts.error("MetaMask not detected");
            return;
        }

        const ethereum = (window as EthWindow).ethereum as EthereumProvider;
        isSubmitting = true;
        try {
            const success = await authService.loginWithWallet(
                walletAddress,
                ethereum,
            );

            if (success) {
                toasts.success(
                    "Wallet login successful! Redirecting to dashboard...",
                );
                goto("/dashboard");
            } else {
                toasts.error(
                    "Wallet login failed. Make sure your wallet is linked to your account.",
                );
            }
        } catch (error) {
            console.error("Wallet login error:", error);
            toasts.error(
                error instanceof Error
                    ? error.message
                    : "Failed to login with wallet",
            );
        } finally {
            isSubmitting = false;
        }
    };
</script>

{#key mounted}
    {#if mounted}
        <section
            class="relative z-30 flex min-h-screen w-full flex-col pt-32 gap-6"
            transition:fade|local
        >
            <div class="absolute right-0 top-0 z-20 h-screen w-screen">
                <div transition:fade={{ delay: 800, duration: 300 }}>
                    <img
                        class="h-full w-full object-contain"
                        src="/bgBlackStars.svg"
                        alt=""
                    />
                </div>
            </div>

            <div class="absolute right-0 top-0 z-20 h-screen w-screen">
                <div transition:fade={{ delay: 500, duration: 500 }}>
                    <img
                        class="h-full w-full object-contain"
                        src="/rays.svg"
                        alt=""
                    />
                </div>
            </div>

            <div class="container z-50 mx-auto px-5">
                <div class="max-w-xl mx-auto space-y-6">
                    <h1
                        class="font-heading text-3xl self-center text-center mb-2"
                    >
                        Login
                    </h1>

                    <div class="flex flex-col items-center">
                        <div
                            class="w-full max-w-md h-12 flex rounded-full border-2 border-neutral-700 p-0.5 bg-neutral-800/60 backdrop-blur-sm"
                        >
                            <button
                                class={`flex-1 transition-all rounded-full text-sm font-paragraph font-semibold cursor-pointer ${
                                    activeTab === "email"
                                        ? "bg-primary-white text-primary-black"
                                        : "text-neutral-500 hover:text-neutral-300"
                                }`}
                                onclick={() => (activeTab = "email")}
                            >
                                Email
                            </button>
                            <button
                                class={`flex-1 transition-all rounded-full text-sm font-paragraph font-semibold cursor-pointer ${
                                    activeTab === "wallet"
                                        ? "bg-primary-white text-primary-black"
                                        : "text-neutral-500 hover:text-neutral-300"
                                }`}
                                onclick={() => (activeTab = "wallet")}
                            >
                                ETH Wallet
                            </button>
                        </div>
                    </div>

                    <div class="mt-6">
                        {#if activeTab === "email"}
                            <div in:fade={{ duration: 200 }}>
                                <form
                                    class="space-y-4"
                                    name="login"
                                    onsubmit={(e) => {
                                        e.preventDefault();
                                        tryLogin(loginFields);
                                    }}
                                >
                                    <div class="flex flex-col">
                                        <label
                                            for="email"
                                            class="text-neutral-500"
                                            >Email</label
                                        >
                                        <input
                                            bind:value={loginFields.email}
                                            class="flex w-full items-center justify-center gap-1 rounded-full border-2 tracking-wider transition-all h-12 px-6 text-sm text-neutral-500 hover:text-primary-white border-neutral-600 hover:border-primary-white bg-neutral-800 hover:bg-neutral-700 font-paragraph font-semibold"
                                            type="email"
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>
                                    <div class="flex flex-col">
                                        <label
                                            for="password"
                                            class="text-neutral-500"
                                            >Password</label
                                        >
                                        <input
                                            bind:value={loginFields.password}
                                            class="flex w-full items-center justify-center gap-1 rounded-full border-2 tracking-wider transition-all h-12 px-6 text-sm text-neutral-500 hover:text-primary-white border-neutral-600 hover:border-primary-white bg-neutral-800 hover:bg-neutral-700 font-paragraph font-semibold"
                                            type="password"
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </div>
                                    <div class="flex space-x-2 justify-end">
                                        <Button
                                            type="submit"
                                            variant="secondary"
                                            class="mt-2"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting
                                                ? "Logging in..."
                                                : "Login"}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        {:else}
                            <div in:fade={{ duration: 200 }} class="space-y-4">
                                <div
                                    class="bg-neutral-800 p-4 rounded-lg border border-neutral-700"
                                >
                                    <p class="text-neutral-400 text-sm">
                                        To use wallet login, you must first
                                        create an account with email and then
                                        link your wallet from the dashboard.
                                    </p>
                                </div>

                                {#if !walletAddress}
                                    <div class="flex justify-center">
                                        <Button
                                            variant="secondary"
                                            on:click={connectWallet}
                                            disabled={isConnecting}
                                        >
                                            {isConnecting
                                                ? "Connecting..."
                                                : "Connect Wallet"}
                                        </Button>
                                    </div>
                                {:else}
                                    <div
                                        class="bg-neutral-800 p-4 rounded-lg border border-neutral-700"
                                    >
                                        <p class="text-neutral-400 mb-2">
                                            Connected Wallet:
                                        </p>
                                        <p
                                            class="text-primary-white font-mono text-sm break-all"
                                        >
                                            {walletAddress}
                                        </p>
                                    </div>

                                    <div class="flex justify-center mt-4">
                                        <Button
                                            variant="secondary"
                                            on:click={loginWithWallet}
                                            disabled={isSubmitting}
                                            class="w-full max-w-xs"
                                        >
                                            {isSubmitting
                                                ? "Signing in..."
                                                : "Sign In With Ethereum"}
                                        </Button>
                                    </div>
                                {/if}
                            </div>
                        {/if}
                    </div>

                    <div class="text-center">
                        <span class="text-neutral-500"
                            >Don't have an account?</span
                        >
                        <a
                            href="/register"
                            class="text-primary-white hover:underline"
                            >Register Here</a
                        >
                    </div>
                </div>
            </div>
        </section>
    {/if}
{/key}
