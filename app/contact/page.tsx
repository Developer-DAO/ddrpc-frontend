import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import React from "react";

export default function HomePage() {
    return (
        <div className="relative flex min-h-screen flex-col bg-background" data-testid="contactpage">
            <Navigation />
            <main className="flex-1">

                <section>
                    <div className="relative flex justify-center max-h-full overflow-hidden lg:px-0 md:px-12">
                        <div className="relative z-10 flex flex-col flex-1 px-4 py-10 shadow-2xl lg:py-24 md:flex-none md:px-28 sm:justify-center">
                            <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
                                <div className="flex flex-col">
                                    <div>
                                        <h2 className="text-4xl text-white">Let's get started!</h2>
                                        <p className="mt-2 text-sm text-neutral-400">
                                            Complete the details below so I can process your request and then
                                            schedule a time to discuss your goals.
                                        </p>
                                    </div>
                                </div>
                                <form>
                                    <div className="mt-4 space-y-6">
                                        <div>
                                            <label className="block mb-3 text-sm font-medium text-neutral-300" id="name">
                                                First name
                                            </label>
                                            <input className="block w-full px-6 py-3 text-black bg-white border border-neutral-200 appearance-none rounded-xl placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" placeholder="Your name" />
                                        </div>
                                        <div className="col-span-full">
                                            <label className="block mb-3 text-sm font-medium text-neutral-300" id="company">
                                                What is the name of your company / organisation?
                                            </label>
                                            <input className="block w-full px-6 py-3 text-black bg-white border border-neutral-200 appearance-none rounded-xl placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" placeholder="Company name" />
                                        </div>
                                        <div className="col-span-full">
                                            <label className="block mb-3 text-sm font-medium text-neutral-300" id="email">
                                                How shall we contact you?
                                            </label>
                                            <input className="block w-full px-6 py-3 text-black bg-white border border-neutral-200 appearance-none rounded-xl placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" placeholder="email@example.com" type="email" />
                                        </div>
                                        <div>
                                            <div>
                                                <label className="block mb-3 text-sm font-medium text-neutral-300" id="message">
                                                    Project details
                                                </label>
                                                <div className="mt-1">
                                                    <textarea className="block w-full px-6 py-3 text-black bg-white border border-neutral-200 appearance-none rounded-xl placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" placeholder="What are you working on?" rows={4}></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-full">
                                            <button className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-white text-lg hover:border-black hover:text-black focus:outline-none focus-visible:outline-black font-paragraph font-semibold tracking-wider transition-all hover:drop-shadow-[10px_0_20px_rgba(254,254,254,0.472)] focus-visible:ring-black" type="submit">
                                                Submit your request
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="hidden lg:block lg:flex-1 lg:relative sm:contents py-10 lg:py-24 lg:pr-10">
                            <div className="object-cover w-full">
                                <img className="object-center w-full h-auto bg-neutral-200 rounded-full" src="ethbanner2.jpg" alt="" width="1310" height="873" />
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}