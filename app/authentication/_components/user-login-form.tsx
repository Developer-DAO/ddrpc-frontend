import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getSession, login, logout } from "@/app/auth";
import Link from "next/link"
import { redirect } from "next/navigation"


export default function UserRegForm() {
  return (
    <>
      <div className="grid gap-6">
        <div className="flex justify-center">
          <Link href="/authentication/walletlogin" className="flex w-fit items-center justify-center gap-1 rounded-full border-2 transition-all h-12 px-6 text-lg text-black border-white bg-white font-paragraph font-semibold tracking-wider hover:drop-shadow-[10px_0_20px_rgba(254,254,254,0.472)]">Wallet Login</Link>
        </div>
        <div className="relative">
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-neutral-500">
              Or continue with
            </span>
          </div>
        </div>

        <form
          action={async (formData) => {
            "use server";
            await login(formData);
            redirect("/dashboard");
          }}
        >
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
            <Button type="submit" >Log In</Button>
          </div>
        </form>
      </div>
    </>)
}

