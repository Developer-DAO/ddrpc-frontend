import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Navigation } from "@/components/navigation";

export default function Example() {
  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-50">
        <Navigation />
      </header>

      <div className="relative isolate overflow-hidden pt-14">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-24">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
              Announcing Developer DAO's RPC Gateway.{" "}
              <a href="#" className="font-semibold text-white">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Access Blockchain Data. Fund Public Goods.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              High-performance and censorship-resistant access to Blockchain
              data from the first DAO-owned RPC Gateway.
            </p>
            <div className="mt-10 flex-col space-y-8 px-4">
              <div className="mt-6 flex max-w-md gap-x-4 mx-auto">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-gray-400focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Get Notified
                </button>
              </div>

              <div>
                <a
                  href="#"
                  className="text-sm font-semibold leading-6 text-white"
                >
                  Become a launch partner <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Logo cloud */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-white">
          Support for over 60 chains including
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="https://tailwindui.com/img/logos/158x48/transistor-logo-white.svg"
            alt="Transistor"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="https://tailwindui.com/img/logos/158x48/reform-logo-white.svg"
            alt="Reform"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="https://tailwindui.com/img/logos/158x48/tuple-logo-white.svg"
            alt="Tuple"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
            src="https://tailwindui.com/img/logos/158x48/savvycal-logo-white.svg"
            alt="SavvyCal"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
            src="https://tailwindui.com/img/logos/158x48/statamic-logo-white.svg"
            alt="Statamic"
            width={158}
            height={48}
          />
        </div>
      </div>
    </div>
  );
}

// import { Footer } from "@/components/footer";
// import { Navigation } from "@/components/navigation";
// import React from "react";

// export default function HomePage() {
//   return (
//     <div className="relative flex min-h-screen flex-col ">
//       <Navigation />
//       <main className="flex-1">
//         <section>
//           <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
//             <div className="flex flex-wrap items-center mx-auto max-w-7xl">
//               <div className="w-full lg:max-w-lg lg:w-1/2 rounded-xl">
//                 <div>
//                   <div className="relative w-full max-w-lg">
//                     <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full opacity-70  filter blur-xl animate-blob"></div>
//                     <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full opacity-70  filter blur-xl animate-blob animation-delay-2000"></div>
//                     <div className="absolute -bottom-8 left-28 w-72 h-72 bg-blue-500 rounded-full opacity-70  filter blur-xl animate-blob animation-delay-4000"></div>
//                     <div className="relative">
//                       <img
//                         className="object-cover object-center mx-auto mix-blend-color-dodge"
//                         alt="hero"
//                         src="eth-diamond-purple.svg"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div
//                 className="flex flex-col items-start mt-12 mb-16 text-left lg:flex-grow lg:w-1/2 lg:pl-6 xl:pl-24 md:mb-0 xl:mt-0"
//                 data-testid="mainhero"
//               >
//                 <span className="mb-8 text-xs font-bold tracking-widest text-neutral-600 uppercase">
//                   An RPC Gateway By Developer DAO
//                 </span>
//                 <h1 className="mb-8 text-4xl font-bold leading-none tracking-tighter text-neutral-100 md:text-7xl lg:text-5xl">
//                   Access Blockchain Data. Fund Public Goods.
//                 </h1>
//                 <p className="mb-8 text-base leading-relaxed text-left text-neutral-500">
//                   High-performance and censorship-resistant access to Blockchain
//                   data from the first DAO-owned RPC Gateway.
//                 </p>
//                 <div className="flex-col mt-0 lg:mt-6 max-w-7xl sm:flex">
//                   <CaptureForm />
//                   <div className="sm:max-w-lg sm:flex">
//                     <p className="mt-3 text-xs text-neutral-500">
//                       By subscribing, you agree with Developer DAO RPC gateway
//                       <a target="_blank" href="https://developerdao.com/terms">
//                         {" "}
//                         Terms of Service{" "}
//                       </a>
//                       and
//                       <a
//                         target="_blank"
//                         href="https://developerdao.com/privacy"
//                       >
//                         {" "}
//                         Privacy Policy
//                       </a>
//                       .
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// const CaptureForm = () => {
//   return (
//     <form
//       method="post"
//       id="ddrpc-form"
//       name="ddrpc-form"
//       target="_blank"
//       className="p-2 mt-8 transition duration-500 ease-in-out transform border2 bg-neutral-50 rounded-xl sm:max-w-lg sm:flex"
//     >
//       <div className="flex-1 min-w-0 ddrpc-form-group">
//         <label htmlFor="member_email" className="sr-only">
//           Email address
//         </label>
//         <input
//           id="member_email"
//           type="email"
//           className="block w-full px-5 py-3 text-base placeholder-neutral-300 dark:placeholder-neutral-500 transition duration-500 ease-in-out transform bg-transparent border border-transparent rounded-md text-neutral-600 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-300"
//           placeholder="Enter your email  "
//         />
//       </div>
//       <div className="mt-4 sm:mt-0 sm:ml-3 ddrpc-form-actions">
//         <button
//           type="submit"
//           value="Subscribe"
//           name="member[subscribe]"
//           id="member_submit"
//           className="block w-full px-5 py-3 text-base font-medium text-white bg-neutral-600 border border-transparent rounded-full shadow hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-300 sm:px-10"
//         >
//           Notify me
//         </button>
//       </div>
//     </form>
//   );
// };
