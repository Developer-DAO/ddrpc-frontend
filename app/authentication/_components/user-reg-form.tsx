"use client"

import * as React from "react"
import { useFormStatus } from "react-dom";
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { WalletButton } from "@/components/wallet-buttons"
import { SubmitButton } from "@/components/form-submit-button";
import { registerUser } from "../authbfe";


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function UserRegForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()



  const walletButtons = connectors.map((connector) =>
    connector.name.toLowerCase() === "injected" ? null : (
      <WalletButton
        connector={connector}
        isLoading={isLoading}
        connect={connect}
        key={connector.uid}
      />
    )
  );


  return (
    <div className={cn("grid gap-6", className)} {...props}>

      {account.status === 'connected' ? (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="destructive" onClick={() => disconnect()}>Disconnect</Button>
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
        <div className="grid gap-1">
          {walletButtons}
        </div>
      )}
      <div className="relative">
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-neutral-500">
            And continue with
          </span>
        </div>
      </div>

      <form action={registerUser}>
        <input type="hidden" name="wallet" id="wallet" value={account.addresses?.[0]} />
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              placeholder="******"
              type="password"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <SubmitButton />
        </div>
      </form>


    </div>
  )
}
