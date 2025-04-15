<script lang="ts">
    import { authService } from "$lib/services/auth";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import Button from "$lib/components/button.svelte";
    import { toasts } from "$lib/stores/toast";
    import {
        createWalletClient,
        custom,
        parseUnits,
        getContract,
        createPublicClient,
        http,
        type Address,
    } from "viem";
    import { createSiweMessage } from "viem/siwe";
    import { optimism, arbitrum, base, polygon, sepolia } from "viem/chains";
    import { preventDefault } from "svelte/legacy";

    interface Transaction {
        customeremail: string;
        transactionhash: string;
        asset: "USDC";
        amount: string;
        chain: "Arbitrum" | "Base" | "Polygon" | "Optimism" | "Sepolia";
        date: string;
        usdvalue: number;
        decimals: number;
    }

    let mounted = $state(false);
    let loading = $state(false);
    let transactions = $state<Transaction[]>([]);
    let selectedPlan = $state<keyof typeof plans>("tier1");
    let selectedDuration = $state(1);
    let selectedChain = $state<keyof typeof chains>("Optimism");
    let verifyingWallet = $state(false);
    let paymentInProgress = $state(false);
    let waitingForConfirmations = $state(false);
    let txHash = $state("");
    let currentBlock = $state(0);
    let targetBlock = $state(0);
    let manualTxHash = $state("");
    let manualChain = $state<keyof typeof chains>("Optimism");
    let manualSubmitting = $state(false);

    const chainConfirmations = {
        Optimism: 15,
        Base: 15,
        Arbitrum: 15,
        Polygon: 256,
        Sepolia: 15,
    } as const;

    const plans = {
        tier1: { name: "Tier 1", price: 50, requests: "30M" },
        tier2: { name: "Tier 2", price: 200, requests: "125M" },
        tier3: { name: "Tier 3", price: 875, requests: "500M" },
    };

    const RECIPIENT_ADDRESS =
        "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85" as const;

    const chains = {
        Optimism: {
            address: "0xaf88d065e77c8cc2239327c5edb3a432268e5831" as const,
            decimals: 6,
            chain: optimism,
            safeConfirmations: 15, // ~2 minutes
            timeEstimate: "2 minutes",
        },
        Arbitrum: {
            address: "0xaf88d065e77c8cc2239327c5edb3a432268e5831" as const,
            decimals: 6,
            chain: arbitrum,
            safeConfirmations: 15, // ~3-4 minutes
            timeEstimate: "3-4 minutes",
        },
        Base: {
            address: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913" as const,
            decimals: 6,
            chain: base,
            safeConfirmations: 15, // ~2 minutes
            timeEstimate: "2 minutes",
        },
        Polygon: {
            address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359" as const,
            decimals: 6,
            chain: polygon,
            safeConfirmations: 256, // ~8 minutes
            timeEstimate: "8 minutes",
        },
        Sepolia: {
            address: "0x53f3A63f4e5239AeFa97390F6334aE41E20a6fb5" as const,
            decimals: 18,
            chain: sepolia,
            safeConfirmations: 30, // ~3 minutes
            timeEstimate: "6 minutes",
        },
    };

    const durations = [1, 3, 6, 12];

    // ERC20 ABI (minimal for transfer function)
    const erc20Abi = [
        {
            name: "transfer",
            type: "function",
            stateMutability: "nonpayable",
            inputs: [
                { name: "recipient", type: "address" },
                { name: "amount", type: "uint256" },
            ],
            outputs: [{ name: "success", type: "bool" }],
        },
        {
            name: "balanceOf",
            type: "function",
            stateMutability: "view",
            inputs: [{ name: "account", type: "address" }],
            outputs: [{ name: "balance", type: "uint256" }],
        },
    ] as const;

    function calculateTotal() {
        const planPrice = plans[selectedPlan].price;
        return planPrice * selectedDuration;
    }

    async function trackConfirmations(publicClient: any, txBlock: bigint) {
        const chainConfig = chains[selectedChain];
        const required = chainConfig.safeConfirmations;
        targetBlock = required;
        let attempts = 0;
        const maxAttempts = Math.max(180, required * 2); // At least 3 minutes or 2x required blocks

        while (attempts < maxAttempts) {
            try {
                // Get both latest and safe block
                const [latestBlock, safeBlock] = await Promise.all([
                    publicClient.getBlockNumber(),
                    publicClient.getBlock({ blockTag: "safe" }),
                ]);

                // Update current confirmations based on latest block
                currentBlock = Number(latestBlock - txBlock);

                console.log(`Chain: ${selectedChain}`);
                console.log("Current block:", currentBlock);
                console.log("Safe block:", safeBlock?.number);
                console.log("Tx block:", txBlock);
                console.log(`Required confirmations: ${required}`);

                // Check if transaction block is less than safe block
                if (
                    safeBlock &&
                    safeBlock.number &&
                    txBlock < safeBlock.number
                ) {
                    console.log(
                        "Transaction is in safe block, proceeding with backend call",
                    );
                    return true;
                }

                attempts++;
                await new Promise((resolve) => setTimeout(resolve, 2000));
            } catch (error) {
                console.error("Error checking block status:", error);
                attempts++;
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
        }
        return false;
    }

    async function waitForReceipt(
        publicClient: any,
        hash: string,
        maxAttempts = 30,
    ) {
        for (let i = 0; i < maxAttempts; i++) {
            try {
                const receipt = await publicClient.getTransactionReceipt({
                    hash,
                });
                if (receipt && receipt.blockNumber) {
                    return receipt;
                }
            } catch (error) {
                console.log("Waiting for transaction to be finalized...");
            }
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds between attempts
        }
        throw new Error("Transaction not mined within the expected timeframe");
    }

    async function processPayment() {
        paymentInProgress = true;
        currentBlock = 0;
        targetBlock = 0;

        try {
            // Get chain details
            const chainConfig = chains[selectedChain];
            const tokenAddress = chainConfig.address;

            // Create wallet client
            const walletClient = createWalletClient({
                chain: chainConfig.chain,
                transport: custom((window as any).ethereum),
            });

            // Get address
            const [address] = await walletClient.requestAddresses();

            // Create public client
            const publicClient = createPublicClient({
                chain: chainConfig.chain,
                transport: custom((window as any).ethereum),
            });

            // Calculate amount based on plan and duration
            const total = calculateTotal();
            const amount = parseUnits(total.toString(), chainConfig.decimals);

            // Check if chain is correct, if not switch
            try {
                await walletClient.switchChain({ id: chainConfig.chain.id });
            } catch (switchError) {
                console.error("Failed to switch chain:", switchError);
                throw new Error(
                    `Please manually switch to ${selectedChain} network in your wallet`,
                );
            }

            // Check user balance with proper formatting
            const balance = await publicClient.readContract({
                address: tokenAddress,
                abi: erc20Abi,
                functionName: "balanceOf",
                args: [address],
            });

            const divisor = 10n ** BigInt(chainConfig.decimals);
            const formattedBalance = Number(balance.toString()) / Number(divisor.toString());

            if (balance < amount) {
                throw new Error(
                    `Insufficient USDC balance. You need ${total} USDC but have ${formattedBalance.toFixed(2)} USDC.`,
                );
            }

            // Execute token transfer
            const hash = await walletClient.writeContract({
                address: tokenAddress,
                abi: erc20Abi,
                functionName: "transfer",
                args: [RECIPIENT_ADDRESS, amount],
                account: address,
            });

            // Store transaction hash and start tracking
            txHash = hash;
            waitingForConfirmations = true;

            // Wait for transaction to be mined and get initial receipt
            const initialReceipt = await waitForReceipt(publicClient, hash);
            console.log(
                "Transaction mined in block:",
                initialReceipt.blockNumber,
            );

            // Start tracking confirmations until we reach a safe block
            const isSafe = await trackConfirmations(
                publicClient,
                initialReceipt.blockNumber,
            );

            if (!isSafe) {
                throw new Error(
                    "Timeout waiting for safe block. Please try submitting the transaction again.",
                );
            }

            console.log("Proceeding with backend call...");

            // Now try to communicate with backend
            const applyRes = await fetch("http://localhost:3000/api/pay/eth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    hash: hash,
                    chain: selectedChain,
                }),
            });

            if (!applyRes.ok) {
                const errorText = await applyRes.text();
                throw new Error(errorText);
            }

            // Update plan with duration
            const planRes = await fetch("http://localhost:3000/api/pay/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    plan: selectedPlan,
                    duration: selectedDuration,
                }),
            });

            if (!planRes.ok) {
                throw new Error(await planRes.text());
            }

            toasts.success("Payment processed successfully!");
            await fetchTransactions();
        } catch (error: unknown) {
            console.error("Payment error:", error);
            toasts.error(
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred"
            );
        } finally {
            paymentInProgress = false;
            waitingForConfirmations = false;
            currentBlock = 0;
            targetBlock = 0;
        }
    }

    async function fetchTransactions() {
        loading = true;
        try {
            const res = await fetch(
                "http://localhost:3000/api/payments?page=0&per_page=20",
                {
                    method: "GET",
                    credentials: "include",
                },
            );
            transactions = await res.json();
        } catch (error: unknown) {
            console.error("Failed to fetch transactions:", error);
        }
        loading = false;
    }

    async function verifyWalletOwnership() {
        verifyingWallet = true;
        try {
            // Get wallet client
            const walletClient = createWalletClient({
                transport: custom((window as any).ethereum),
            });

            // Get address
            const [address] = await walletClient.requestAddresses();

            // Get nonce from backend
            const nonceRes = await fetch(
                "http://localhost:3000/api/siwe/nonce",
                {
                    method: "GET",
                    credentials: "include",
                },
            );

            if (!nonceRes.ok)
                throw new Error(
                    `Failed to retrieve nonce: ${await nonceRes.text()}`,
                );
            const nonce = await nonceRes.text();

            // Create SIWE message
            const message = createSiweMessage({
                domain: window.location.host,
                address,
                statement: "Sign in to verify wallet ownership",
                uri: window.location.origin,
                version: "1",
                chainId: 1,
                nonce,
            });

            // Sign message
            const signature = await walletClient.signMessage({
                message,
                account: address,
            });

            // Convert hex signature to byte array
            const signatureBytes = Array.from(
                new Uint8Array(
                    signature
                        .slice(2)
                        .match(/.{1,2}/g)
                        ?.map((byte) => parseInt(byte, 16)) || [],
                ),
            );

            // Verify with backend
            const verifyRes = await fetch(
                "http://localhost:3000/api/siwe/add_wallet",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        message,
                        signature: signatureBytes,
                    }),
                },
            );

            if (!verifyRes.ok) throw new Error(await verifyRes.text());

            toasts.success("Wallet verified successfully!");
            await authService.refresh().catch(() => {
                toasts.error("Failed to refresh JWT");
            });
        } catch (error: unknown) {
            console.error("Wallet verification error:", error);
            toasts.error(
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred"
            );
        }
        verifyingWallet = false;
    }

    async function submitManualTransaction() {
        if (!manualTxHash) {
            toasts.error("Please enter a transaction hash");
            return;
        }

        manualSubmitting = true;
        try {
            const applyRes = await fetch("http://localhost:3000/api/pay/eth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    hash: manualTxHash,
                    chain: manualChain,
                }),
            });

            if (!applyRes.ok) {
                throw new Error(await applyRes.text());
            }

            toasts.success("Transaction processed successfully!");
            await fetchTransactions();
            manualTxHash = "";
        } catch (error) {
            console.error("Manual submission error:", error);
            toasts.error(
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred"
            );
        } finally {
            manualSubmitting = false;
        }
    }

    onMount(() => {
        mounted = true;
        fetchTransactions();
        return () => {
            mounted = false;
        };
    });
</script>

{#key mounted}
    {#if mounted}
        <div class="max-w-4xl mx-auto" transition:fade={{ duration: 300 }}>
            <h1 class="font-heading text-4xl mb-6">Payments</h1>

            <div class="grid gap-6">
                <!-- Plan Selection Section -->
                <div
                    class="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6"
                >
                    <h2 class="font-heading text-2xl mb-4">Select Plan</h2>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {#each Object.entries(plans) as [id, plan]}
                            <div
                                class="border rounded-lg p-4 cursor-pointer transition-all {selectedPlan ===
                                id
                                    ? 'border-primary-white bg-neutral-700/50'
                                    : 'border-neutral-700 hover:border-neutral-600'}"
                                onclick={() =>
                                    (selectedPlan = id as keyof typeof plans)}
                            >
                                <h3 class="font-heading text-xl mb-2">
                                    {plan.name}
                                </h3>
                                <p class="text-2xl font-bold mb-2">
                                    ${plan.price}/mo
                                </p>
                                <p class="text-neutral-400">
                                    {plan.requests} requests/month
                                </p>
                            </div>
                        {/each}
                    </div>

                    <div class="mb-6">
                        <h3 class="font-heading text-xl mb-4">
                            Select Duration
                        </h3>
                        <div class="grid grid-cols-4 gap-4">
                            {#each durations as duration}
                                <div
                                    class="border rounded-lg p-4 text-center cursor-pointer transition-all {selectedDuration ===
                                    duration
                                        ? 'border-primary-white bg-neutral-700/50'
                                        : 'border-neutral-700 hover:border-neutral-600'}"
                                    onclick={() =>
                                        (selectedDuration = duration)}
                                >
                                    <p class="font-heading">
                                        {duration}
                                        {duration === 1 ? "Month" : "Months"}
                                    </p>
                                </div>
                            {/each}
                        </div>
                    </div>

                    <div class="mb-6">
                        <h3 class="font-heading text-xl mb-4">
                            Select Network
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {#each Object.entries(chains) as [id, chain]}
                                <div
                                    class="border rounded-lg p-4 cursor-pointer transition-all {selectedChain ===
                                    id
                                        ? 'border-primary-white bg-neutral-700/50'
                                        : 'border-neutral-700 hover:border-neutral-600'}"
                                    onclick={() =>
                                        (selectedChain =
                                            id as keyof typeof chains)}
                                >
                                    <p class="font-heading text-lg">{id}</p>
                                    <p class="text-xs text-neutral-400 mt-1">
                                        Required Safe Blocks: {chain.safeConfirmations}
                                        <span class="block"
                                            >~{chain.timeEstimate} for finality</span
                                        >
                                    </p>
                                </div>
                            {/each}
                        </div>
                    </div>

                    <div class="border-t border-neutral-700 pt-4">
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-xl">Total Cost:</span>
                            <span class="text-2xl font-bold"
                                >${calculateTotal()}</span
                            >
                        </div>
                        <Button
                            variant="primary"
                            onclick={processPayment}
                            disabled={paymentInProgress}
                        >
                            {paymentInProgress
                                ? "Processing..."
                                : "Pay with USDC"}
                        </Button>

                        {#if txHash}
                            <div class="mt-4 p-3 bg-neutral-900 rounded-lg">
                                <p class="text-sm text-neutral-400">
                                    Transaction Hash:
                                </p>
                                <a
                                    href={`${selectedChain.toLowerCase()}.etherscan.io/tx/${txHash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-primary-white hover:underline text-sm break-all"
                                >
                                    {txHash}
                                </a>
                                {#if waitingForConfirmations}
                                    <div class="mt-4">
                                        <div
                                            class="flex justify-between text-sm text-neutral-400 mb-1"
                                        >
                                            <span
                                                >Block Confirmations ({currentBlock}/{targetBlock})</span
                                            >
                                            <span
                                                >{targetBlock
                                                    ? Math.min(
                                                          Math.round(
                                                              (currentBlock /
                                                                  targetBlock) *
                                                                  100,
                                                          ),
                                                          100,
                                                      )
                                                    : 0}%</span
                                            >
                                        </div>
                                        <div
                                            class="w-full bg-neutral-700 rounded-full h-2"
                                        >
                                            <div
                                                class="bg-white/50 h-2 rounded-full transition-all duration-500"
                                                style="width: {targetBlock
                                                    ? Math.min(
                                                          Math.max(
                                                              (currentBlock /
                                                                  targetBlock) *
                                                                  100,
                                                              1,
                                                          ),
                                                          100,
                                                      )
                                                    : 1}%"
                                            ></div>
                                        </div>
                                        <p
                                            class="text-xs text-neutral-400 mt-2"
                                        >
                                            Waiting for transaction to be in a
                                            safe block (may take ~{chains[
                                                selectedChain
                                            ].timeEstimate})
                                        </p>
                                    </div>
                                {/if}
                            </div>
                        {/if}
                    </div>
                </div>

                <!-- Add this before the transaction history section -->
                <div
                    class="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6 mb-6"
                >
                    <h2 class="font-heading text-2xl mb-4">
                        Manual Transaction Submission
                    </h2>
                    <form
                        class="space-y-4"
                        onsubmit={(e) => {
                            e.preventDefault();
                            submitManualTransaction();
                        }}
                    >
                        <div>
                            <label class="block text-sm text-neutral-400 mb-2"
                                >Transaction Hash</label
                            >
                            <input
                                type="text"
                                bind:value={manualTxHash}
                                placeholder="0x..."
                                class="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-primary-white"
                            />
                        </div>

                        <div>
                            <label class="block text-sm text-neutral-400 mb-2"
                                >Network</label
                            >
                            <select
                                bind:value={manualChain}
                                class="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-primary-white"
                            >
                                {#each Object.entries(chains) as [id, chain]}
                                    <option value={id}>
                                        {id}
                                    </option>
                                {/each}
                            </select>
                        </div>

                        <div class="flex items-center justify-between">
                            <p class="text-xs text-neutral-400">
                                Directly submit a transaction hash to the
                                backend
                            </p>
                            <Button
                                type="submit"
                                variant="secondary"
                                disabled={manualSubmitting}
                            >
                                {manualSubmitting
                                    ? "Submitting..."
                                    : "Submit Transaction"}
                            </Button>
                        </div>
                    </form>
                </div>

                <!-- Transaction History Section -->
                <div
                    class="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6"
                >
                    <h2 class="font-heading text-2xl mb-4">
                        Transaction History
                    </h2>
                    {#if loading}
                        <p class="text-neutral-400">Loading transactions...</p>
                    {:else if transactions.length === 0}
                        <p class="text-neutral-400">No transactions yet.</p>
                    {:else}
                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead>
                                    <tr
                                        class="text-left border-b border-neutral-700"
                                    >
                                        <th class="pb-2">Date</th>
                                        <th class="pb-2">Network</th>
                                        <th class="pb-2">Amount</th>
                                        <th class="pb-2">USD Value</th>
                                        <th class="pb-2">Hash</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each transactions as tx}
                                        <tr
                                            class="border-b border-neutral-700/50"
                                        >
                                            <td class="py-3">{tx.date}</td>
                                            <td class="py-3">{tx.chain}</td>
                                            <td class="py-3">
                                                {(
                                                    Number(tx.amount) /
                                                    10 ** tx.decimals
                                                ).toFixed(2)}
                                                {tx.asset}
                                            </td>
                                            <td class="py-3"
                                                >${(tx.usdvalue / 100).toFixed(
                                                    2,
                                                )}</td
                                            >
                                            <td class="py-3">
                                                <a
                                                    href={`https://${tx.chain.toLowerCase()}.etherscan.io/tx/0x${tx.transactionhash}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    class="text-primary-white hover:underline truncate block max-w-[200px]"
                                                >
                                                    0x{tx.transactionhash}
                                                </a>
                                            </td>
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    {/if}
                </div>

                <!-- Wallet Verification Section -->
                <div
                    class="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6"
                >
                    <h2 class="font-heading text-2xl mb-4">
                        Verify Wallet Ownership
                    </h2>
                    <Button
                        variant="secondary"
                        onclick={verifyWalletOwnership}
                        disabled={verifyingWallet}
                    >
                        {verifyingWallet
                            ? "Verifying..."
                            : "Verify Wallet Ownership"}
                    </Button>
                </div>
            </div>
        </div>
    {/if}
{/key}

