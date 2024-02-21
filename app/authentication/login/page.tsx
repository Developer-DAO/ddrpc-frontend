import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Icons } from "@/components/ui/icons"
import UserLoginForm from '@/app/authentication/_components/user-login-form'
import { redirect } from "next/navigation";
import { getSession, login, logout } from "@/app/auth";
import { SubmitButton } from "@/components/form-submit-button"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Login or register into D_D RPC.",
}

export default async function AuthenticationPage() {
  const session = await getSession();
  return (
    <>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0" data-testid="loginpage">
        <Link
          href="/authentication"
          className="absolute right-4 top-4 md:right-8 md:top-8 flex items-center justify-center gap-1 rounded-full border-2 transition-all h-12 px-6 text-lg text-black border-white bg-white font-paragraph font-semibold tracking-wider hover:drop-shadow-[10px_0_20px_rgba(254,254,254,0.472)]"
        >
          Register
        </Link>
        <div className="relative hidden h-screen flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1621109246687-10ae613f2d8e?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "50%" }} />
          <Link href="/" className="relative z-20 flex items-center text-lg font-medium">
            <Icons.logo className="h-12 w-12 mr-2" />
            <span className="hidden font-bold sm:inline-block">
              RPC
            </span>
          </Link>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Developer DAO RPC has saved me countless hours of work and
                improved resilience of my project.&rdquo;
              </p>
              <footer className="text-sm">Patrick Skinner</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          {!session ? (
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight text-white">
                  Login to your account
                </h1>
                <p className="text-sm text-neutral-500">
                  Connect wallet or enter your email and password below to log in.
                </p>
              </div>
              <UserLoginForm />
              <p className="px-8 text-center text-sm text-neutral-500">
                By logging in, you agree to our{" "}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-neutral-100"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-neutral-100"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          ) : (
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Log out from your account
                </h1>
                <p className="text-sm text-neutral-500">
                  After you log out, you will be able to log in again via your email and password or wallet.
                </p>
              </div>
              <form className="flex justify-center w-full px-8"
                action={async () => {
                  "use server";
                  await logout();
                  redirect("/");
                }}
              >
                <Button type="submit">Log Out</Button>
              </form>

            </div>
          )}
        </div>
      </div>
    </>
  )
}
