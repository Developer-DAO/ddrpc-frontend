"use client"

import * as React from "react"
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { LoginButton } from "@/components/wallet-buttons"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function UserLoginForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  const loginButtons = connectors.map((connector) =>
    connector.name.toLowerCase() === "injected" ? null : (
      <LoginButton
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
          {loginButtons}
        </div>
      )}
      <div className="relative">
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-neutral-500">
            Or continue with
          </span>
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
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
              placeholder="******"
              type="password"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading} className="mt-2">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>


    </div>
  )
}
