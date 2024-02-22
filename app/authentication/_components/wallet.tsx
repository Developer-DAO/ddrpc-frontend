import { Button } from "@/components/ui/button";
import { WalletButton } from "@/components/wallet-buttons";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@radix-ui/react-hover-card";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Wallet() {
    const account = useAccount()
    const { connectors, connect, status, error } = useConnect()
    const { disconnect } = useDisconnect()

  

    const walletButtons = connectors.map((connector) =>
        connector.name.toLowerCase() === "injected" ? null : (
            <WalletButton
                connector={connector}
                isLoading={status === 'pending'}
                connect={connect}
                key={connector.uid}
            />
        )
    );
    return (
        <>
            {account.status === 'connected' ? (
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <div className="flex flex-col mb-4">
                            <Button variant="destructive" onClick={() => disconnect()}>Disconnect</Button>
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                        <div className="flex justify-between space-x-4">
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold">connected as</h4>
                                <div className="text-xs">
                                    {JSON.stringify(account.addresses[0].replaceAll(account.addresses[0].slice(8, 36), '...'))}
                                </div>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            ) : (
                <div className="flex flex-col mb-4">
                    {walletButtons}
                </div>
            )}
        </>
    )

}