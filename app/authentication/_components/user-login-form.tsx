"use client"

import * as React from "react"
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { WalletButton } from "@/components/wallet-buttons"
import { loginUser } from "../authbfe";
import { useFormState } from "react-dom";
import Link from "next/link"
import { Sub } from "@radix-ui/react-dropdown-menu"
import { SubmitButton } from "@/components/form-submit-button"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }


export default function UserRegForm({ className, ...props }: UserAuthFormProps) {

  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  const [state, formAction] = useFormState(loginUser, null);

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
      {!state ? (
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
                Or continue with
              </span>
            </div>
          </div>

          <form action={formAction}>
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
                />
              </div>
              <SubmitButton text="Log In" />
            </div>
          </form>
        </div>
      ) : (<>
        {state.success === false && (<>
          <div className="relative items-center w-full py-12 mx-auto max-w-7xl">
            <div className="flex w-full mx-auto">
              <div className="relative inline-flex items-center m-auto align-middle">
                <div className="relative max-w-6xl p-6 overflow-hidden bg-white rounded-3xl">
                  <div className="relative max-w-lg">
                    <div><p className="text-2xl font-medium tracking-tight text-red-500 sm:text-4xl">
                      This is an Error
                    </p>
                      <p className="max-w-xl mt-4 text-base tracking-tight text-neutral-600">
                        We failed to log you in:{state.message}. Please <Link href="/contact">contact us</Link> if the problem persists.
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3 mt-10 lg:flex-row lg:justify-start">
                      <a href="/authentication/reset" className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full inline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none lg:w-auto focus-visible:outline-black text-sm focus-visible:ring-black">
                        Reset password &nbsp; →
                      </a>
                      <a href="/contact" className="inline-flex items-center justify-center text-sm font-semibold text-black duration-200 hover:text-neutral-500 focus:outline-none focus-visible:outline-gray-600">
                        Contact us &nbsp; →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>)}
      </>)}
    </>
  )
}
