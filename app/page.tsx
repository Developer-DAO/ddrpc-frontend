import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import React from "react";

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navigation />
      <main className="flex-1">

        <section>
          <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
            <div className="flex flex-wrap items-center mx-auto max-w-7xl">
              <div className="w-full lg:max-w-lg lg:w-1/2 rounded-xl">
                <div>
                  <div className="relative w-full max-w-lg">
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full opacity-70  filter blur-xl animate-blob"></div>
                    <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full opacity-70  filter blur-xl animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-28 w-72 h-72 bg-blue-500 rounded-full opacity-70  filter blur-xl animate-blob animation-delay-4000"></div>
                    <div className="relative">
                      <img className="object-cover object-center mx-auto mix-blend-color-dodge" alt="hero" src="eth-diamond-purple.svg" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start mt-12 mb-16 text-left lg:flex-grow lg:w-1/2 lg:pl-6 xl:pl-24 md:mb-0 xl:mt-0">
                <span className="mb-8 text-xs font-bold tracking-widest text-neutral-600 uppercase"> remote procedure call gateway by D_D </span>
                <h1 className="mb-8 text-4xl font-bold leading-none tracking-tighter text-neutral-100 md:text-7xl lg:text-5xl">Your gateway to the decentrlaized world.</h1>
                <p className="mb-8 text-base leading-relaxed text-left text-neutral-500">Some other claim why we are building this,  other claim why we are building this. Perfecto! </p>
                <p className="mb-2 text-base leading-relaxed text-left text-neutral-500">Don't miss the opportunity, register now!</p>
                <div className="flex-col mt-0 lg:mt-6 max-w-7xl sm:flex">
                  <form method="post" id="ddrpc-form" name="ddrpc-form" target="_blank" className="p-2 mt-8 transition duration-500 ease-in-out transform border2 bg-gray-50 rounded-xl sm:max-w-lg sm:flex">
                    <div className="flex-1 min-w-0 ddrpc-form-group">
                      <label htmlFor="member_email" className="sr-only">Email address</label>
                      <input id="member_email" type="email" className="block w-full px-5 py-3 text-base placeholder-gray-300 dark:placeholder-gray-500 transition duration-500 ease-in-out transform bg-transparent border border-transparent rounded-md text-neutral-600 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" placeholder="Enter your email  " />
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-3 ddrpc-form-actions">
                      <button type="submit" value="Subscribe" name="member[subscribe]" id="member_submit" className="block w-full px-5 py-3 text-base font-medium text-white bg-gray-600 border border-transparent rounded-full shadow hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 sm:px-10">Notify me</button>
                    </div>
                  </form>
                  <div className="sm:max-w-lg sm:flex">
                    <p className="mt-3 text-xs text-neutral-500">
                      By subscribing, you agree with Developer DAO RPC gateway
                      <a target="_blank" href="https://developerdao.com/terms"> Terms of Service </a>
                      and
                      <a target="_blank" href="https://developerdao.com/privacy"> Privacy Policy</a>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
