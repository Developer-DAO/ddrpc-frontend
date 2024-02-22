import { Metadata } from "next"
import UserRegForm from "@/app/authentication/_components/user-reg-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"


export const metadata: Metadata = {
  title: "Registration",
  description: "Register into D_D RPC.",
}

export default function RegistrationPage() {
  return (

    <main className="flex-1">
      <section>
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
          <div className="justify-center mx-auto text-left align-bottom transition-all transform bg-white/5 rounded-lg sm:align-middle sm:max-w-3xl sm:w-full">
            <div className="grid flex-wrap items-center justify-center grid-cols-1 mx-auto shadow-xl lg:grid-cols-2 rounded-xl">
              <div className="w-full px-6 py-3">
                <div>
                  <div className="mt-3 text-left sm:mt-5">
                    <div className="inline-flex items-center w-full">
                      <h3 className="text-lg font-bold text-neutral-50 l eading-6 lg:text-5xl">Sign up</h3>
                    </div>
                    <div className="mt-4 text-base text-gray-500">
                      <p>Sign up to DeveloperDAO RPC service.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <UserRegForm />
                </div>
                <div className="flex flex-col mt-4 lg:space-y-2">
                <Link href="/authentication/login" type="button" className="inline-flex justify-center py-4 text-base font-medium text-gray-500 focus:outline-none hover:text-neutral-600 focus:text-blue-600 sm:text-sm"> Log in instead? </Link>
                </div>
              </div>
              <div className="order-first hidden w-full lg:block h-[600px]">
                <img className="object-cover h-full bg-cover rounded-l-lg" src="https://images.unsplash.com/photo-1601494520586-180d84c259a2?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
