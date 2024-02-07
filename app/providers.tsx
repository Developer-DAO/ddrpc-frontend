'use client'

import { type ReactNode, useState } from 'react'
import { State, WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '../wagmi.config'

export function Providers(props: {
    children: ReactNode
    initialState?: State
}) {
    const [queryClient] = useState(() => new QueryClient())
    return (
        <WagmiProvider config={config} initialState={props.initialState}>
            <QueryClientProvider client={queryClient}>
                {props.children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}