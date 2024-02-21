import { Metadata } from "next"
import Link from "next/link"
import { Icons } from "@/components/ui/icons"
import UserRegForm from "@/app/authentication/_components/user-reg-form"


export const metadata: Metadata = {
  title: "Registration",
  description: "Register into D_D RPC.",
}

export default function RegistrationPage() {
  return (
    <>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/authentication/login"
          className="absolute right-4 top-4 md:right-8 md:top-8 flex items-center justify-center gap-1 rounded-full border-2 transition-all h-12 px-6 text-lg text-black border-white bg-white font-paragraph font-semibold tracking-wider hover:drop-shadow-[10px_0_20px_rgba(254,254,254,0.472)]"
        >
          Login
        </Link>
        <div className="relative hidden h-screen flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1599089245397-ba66755081f4?q=80&w=2236&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "50%" }} />
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
              <footer className="text-sm">Adam Sobotka</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-neutral-500">
                Connect wallet and enter your email below to create your account
              </p>
            </div>
            <UserRegForm />
            <p className="px-8 text-center text-sm text-neutral-500">
              By clicking continue, you agree to our{" "}
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
        </div>
      </div>
    </>
  )
}
