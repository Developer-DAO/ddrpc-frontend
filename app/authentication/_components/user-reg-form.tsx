"use client"

import * as React from "react"
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
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

  const loginButtons = connectors.map((connector) => (
    <Button variant="outline" type="button" disabled={isLoading} className="p-2"
      key={connector.uid}
      onClick={() => connect({ connector })}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-6 w-6 animate-spin" />
      ) : (
        <Icons.ethereum className="mr-2 h-6 w-6" />
      )}{" "}
      {connector.name}
    </Button>
  ))

  return (
    <div className={cn("grid gap-6", className)} {...props}>

      {account.status === 'connected' ? (<div> {JSON.stringify(account.addresses)}</div>) : (
        <div className="grid gap-1">
          {loginButtons}
        </div>
      )}
      <div className="relative">
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-neutral-500">
            And continue with
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
          <Button disabled={isLoading}>
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
