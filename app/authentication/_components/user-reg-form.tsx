"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerUser } from "../register";
import Wallet from "./wallet";
import { useAccount } from "wagmi";
import { useFormState } from "react-dom";



export default function UserRegForm() {
  const account = useAccount();
  const initialState = {
    message: '',
    success: false
  }
  const [state, formAction] = useFormState(registerUser, initialState)
  return (
    <>
      {state.message==='' ? (
        <div className="grid gap-6">
          <div className="relative">
            <Wallet />
            <div className="relative flex justify-start text-xs uppercase">
              <span className=" px-2 text-neutral-500">
                And continue with
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
              <Button type="submit">Register</Button>
            </div>
          </form>
        </div>
      ) : (<>
        {state && (state as { success: boolean }).success ? (<>
          <div className="relative items-center w-full py-12 mx-auto max-w-7xl">
            <div className="flex w-full mx-auto">
              <div className="relative inline-flex items-center m-auto align-middle">
                <div className="relative max-w-6xl p-6 overflow-hidden bg-white rounded-3xl">
                  <div className="relative max-w-lg">
                    <div><p className="text-2xl font-medium tracking-tight text-black sm:text-4xl">
                      Welcome on board!
                    </p>
                      <p className="max-w-xl mt-4 text-base tracking-tight text-neutral-600">
                        Check your email for a confirmation link. If you don't see it, check your spam folder please.
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3 mt-10 lg:flex-row lg:justify-start">
                      <a href="/authentication/login" className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full inline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none lg:w-auto focus-visible:outline-black text-sm focus-visible:ring-black">
                        Login &nbsp; →
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
        </>) : (<>
          <div className="relative items-center w-full py-12 mx-auto max-w-7xl">
            <div className="flex w-full mx-auto">
              <div className="relative inline-flex items-center m-auto align-middle">
                <div className="relative max-w-6xl p-6 overflow-hidden bg-white rounded-3xl">
                  <div className="relative max-w-lg">
                    <div><p className="text-2xl font-medium tracking-tight text-red-500 sm:text-4xl">
                      This is an Error
                    </p>
                      <p className="max-w-xl mt-4 text-base tracking-tight text-neutral-600">
                        We failed to register you. Error is: {state.message} Please contact us if the problem persists.
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
