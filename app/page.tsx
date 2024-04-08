import { useState } from "react";
import { Navigation } from "@/components/navigation";
const sendgrid = require("@sendgrid/client");
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default function Example() {
  async function submitForm(formData: FormData) {
    "use server";

    const email = formData.get("email");

    const listId =
      process.env.NODE_END === "production"
        ? process.env.SENDGRID_LIVE_LIST_ID
        : process.env.SENDGRID_TEST_LIST_ID;

    const data = {
      list_ids: [listId],
      contacts: [
        {
          email: email,
        },
      ],
    };

    const request = {
      url: `/v3/marketing/contacts`,
      method: "PUT",
      body: data,
    };

    sendgrid
      .request(request)
      // @ts-ignore
      .then(([response, body]) => {
        console.log(response.statusCode);
        console.log(response.body);
      })
      // @ts-ignore
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-50">
        <Navigation />
      </header>

      <div className="relative isolate overflow-hidden pt-24">
        <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-24">
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
              <form
                action={submitForm}
                className="mt-6 flex max-w-md gap-x-4 mx-auto"
              >
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
              </form>

              <div>
                <a
                  href="https://developerdao.notion.site/Become-an-RPC-Partner-f6d3ffdc3c414bbcbc1f2ca8aea4f61f?pvs=4"
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
        <h2 className="text-center text-lg leading-8 text-white">
          Built on POKT Network. Access 60+ chains with unbeatable uptime.
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="ethereum-logo.svg"
            alt="Transistor"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 p-4"
            src="solana-wordmark-white.svg"
            alt="Reform"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 p-2"
            src="polygon-white-logo.svg"
            alt="Tuple"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1 p-3"
            src="scroll-logo.svg"
            alt="SavvyCal"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1 p-2"
            src="sui-logo-white.svg"
            alt="Statamic"
            width={158}
            height={48}
          />
        </div>
      </div>
    </div>
  );
}
