import Link from "next/link";
import { getSession, login, logout } from "@/app/auth";
import { Icons } from "./ui/icons";

export async function Navigation() {
  const session = await getSession();
  return (
    <header className="sticky top-0 z-50 w-full  bg-zinc-900/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/60">
      <div className="container flex py-4 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link
            href="/"
            className="mr-6 flex items-center space-x-2"
            data-testid="nav-home"
          >
            <Icons.logo className="h-12 w-12" />
            <span className="hidden font-bold sm:inline-block text-white">
              Developer DAO RPC
            </span>
          </Link>
          {/* <nav className="flex items-center gap-6 text-lg font-semibold">
            <Link
              href="/about"
              className=
              " tracking-wide text-neutral-300 p-0 hover:text-white transition-colors"
              data-testid="nav-about"
            >
              About
            </Link>
            <Link
              href="/contact"
              className=
              " tracking-wide text-neutral-300 p-0 hover:text-white transition-colors"
              data-testid="nav-contact"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            {session ? (
              <Link href="/dashboard" className="flex w-fit items-center justify-center gap-1 rounded-full border-2 transition-all h-12 px-6 text-lg text-black border-white bg-white font-paragraph font-semibold tracking-wider hover:drop-shadow-[10px_0_20px_rgba(254,254,254,0.472)]" data-testid="nav-login">Application</Link>
            ) : (
              <Link href="/authentication/login" className="flex w-fit items-center justify-center gap-1 rounded-full border-2 transition-all h-12 px-6 text-lg text-black border-white bg-white font-paragraph font-semibold tracking-wider hover:drop-shadow-[10px_0_20px_rgba(254,254,254,0.472)]" data-testid="nav-login">Login</Link>
            )}
          </nav> */}
        </div>
      </div>
    </header>
  );
}
