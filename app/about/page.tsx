import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import Link from "next/link";
import React from "react";

export default function HomePage() {
    return (
        <div className="relative flex min-h-screen flex-col bg-background" data-testid="aboutpage">
            <Navigation />
            <main className="flex-1">

                <section>
                    <div className="items-center w-full px-5 py-24 mx-auto md:px-12 lg:px-16 max-w-7xl">
                        <div className="text-left">
                            <div className="items-center mx-auto lg:inline-flex">
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-24">
                                    <div>
                                        <p className="text-2xl font-medium tracking-tight text-white sm:text-4xl">
                                            About D_D RPC
                                        </p>
                                    </div>
                                    <div className="lg:ml-auto">
                                        <p className="mt-4 text-lg tracking-tight text-neutral-300 lg:mt-0">
                                            We have the unique ability to seamlessly connect you to a vast network of decentralized node, while maintaining highest security and performance standards.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative items-center w-full mx-auto mt-12">
                            <img className="object-cover object-center w-full bg-neutral-300 h-96 rounded-full" src="./ethbanner1.jpg" alt="" />
                        </div>
                        <div>
                            <div className="pt-12 mx-auto lg:max-w-7xl">
                                <dl className="grid grid-cols-1 gap-6 space-y-0 lg:gap-24 lg:grid-cols-3">
                                    <div>
                                        <div>
                                            <p className="text-lg font-medium leading-6 text-neutral-200">
                                                Developer experience
                                            </p>
                                        </div>
                                        <div className="mt-2 text-base text-neutral-500">
                                            Best there is, no doubt about it. We have the best developers in the world. What else do you need?
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <p className="text-lg font-medium leading-6 text-neutral-200">
                                                Completely decentralized
                                            </p>
                                        </div>
                                        <div className="mt-2 text-base text-neutral-500">
                                            We believe in the power of decentralization. We are a completely decentralized platform. What makes us different is that we are not just a platform, we are a community.
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <p className="text-lg font-medium leading-6 text-neutral-200">
                                                Easy onboarding
                                            </p>
                                        </div>
                                        <div className="mt-2 text-base text-neutral-500">
                                            Our platform is designed to be easy to use. We have a simple onboarding process that will get you up and running in no time.
                                        </div>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="items-center w-full px-5 py-24 mx-auto md:px-12 lg:px-16 max-w-7xl">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
                            <div className="lg:pr-24 md:pr-12">
                                <h2 className="text-4xl text-neutral-100">
                                    Our team
                                </h2>
                            </div>
                            <div className="lg:col-span-2">
                                <ul role="list" className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8">
                                    <li>
                                        <Link href="/" className="flex items-center space-x-4 lg:space-x-6">
                                            <img className="object-cover w-16 h-16 rounded-full lg:h-20 lg:w-20" src="https://cdn.discordapp.com/avatars/207236182592061442/b5e51209d481affadf924f2da5140090.webp?size=128" alt="" />
                                            <div className="space-y-1">
                                                <h3 className="text-lg font-medium leading-6 text-neutral-100">
                                                    Crypdough
                                                </h3>
                                                <p className="text-base text-gray-500">
                                                    Founding Engineer @Raisin_Labs
                                                </p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/" className="flex items-center space-x-4 lg:space-x-6">
                                            <img className="object-cover w-16 h-16 rounded-full lg:h-20 lg:w-20" src="https://cdn.discordapp.com/avatars/572886672312893458/cc0f9a3e0369c27692591d49bf624540.webp?size=128" alt="" />
                                            <div className="space-y-1">
                                                <h3 className="text-lg font-medium leading-6 text-neutral-100">
                                                    Patrick Skinner
                                                </h3>
                                                <p className="text-base text-gray-500">
                                                    DevRel | POKT Socket Maintainer
                                                </p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="https://adamsobotka.deno.dev/" target="_blank" className="flex items-center space-x-4 lg:space-x-6">
                                            <img className="object-cover w-16 h-16 rounded-full lg:h-20 lg:w-20" src="https://cdn.discordapp.com/avatars/417620511791775748/fb5fbd747cbdd0de761a7066f8f31192.webp?size=128" alt="" />
                                            <div className="space-y-1">
                                                <h3 className="text-lg font-medium leading-6 text-neutral-100">
                                                    Adam Sobotka
                                                </h3>
                                                <p className="text-base text-gray-500">
                                                    Kingpin Engineer
                                                </p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/" className="flex items-center space-x-4 lg:space-x-6">
                                            <img className="object-cover w-16 h-16 rounded-full lg:h-20 lg:w-20" src="https://cdn.discordapp.com/avatars/587378166390325268/20706fb399ae033fa7ce7cd1690754c3.webp?size=128" alt="" />
                                            <div className="space-y-1">
                                                <h3 className="text-lg font-medium leading-6 text-neutral-100">
                                                    Protocolwhisper
                                                </h3>
                                                <p className="text-base text-gray-500">
                                                    Eating Protocols
                                                </p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/" className="flex items-center space-x-4 lg:space-x-6">
                                            <img className="object-cover w-16 h-16 rounded-full lg:h-20 lg:w-20" src="https://cdn.discordapp.com/avatars/300935427370778625/45bab143d8165a72b08516c2f26d3a7a.webp?size=128" alt="" />
                                            <div className="space-y-1">
                                                <h3 className="text-lg font-medium leading-6 text-neutral-100">
                                                    Kempsterrrr
                                                </h3>
                                                <p className="text-base text-gray-500">
                                                    Dir @ D_D
                                                </p>
                                            </div>
                                        </Link>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}