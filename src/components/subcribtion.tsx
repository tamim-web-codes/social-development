import React from "react";
import {
    ArrowRight,
    Mail,
    Sparkles,
    Send,
    CheckCircle2,
} from "lucide-react";

const Subscriton = () => {
    return (
        <section className="px-4 py-16 md:px-8 lg:py-24">
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-green-100 bg-[#F1F8F2] dark:border-green-900/40 dark:bg-[#101D16]">

                {/* Background Decorations */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-green-300/30 blur-[100px] dark:bg-green-500/10" />
                <div className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-emerald-300/30 blur-[100px] dark:bg-emerald-500/10" />

                <div className="relative grid items-center gap-12 px-6 py-12 md:px-12 md:py-16 lg:grid-cols-2 lg:gap-16 lg:px-16">

                    {/* Left Content */}
                    <div>
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-semibold text-green-700 shadow-sm dark:border-green-800 dark:bg-green-950/50 dark:text-green-400">
                            <Sparkles size={16} />
                            Stay in the Loop
                        </div>

                        <h2 className="max-w-xl text-3xl font-extrabold leading-[1.2] tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
                            Make a Difference,
                            <span className="block text-green-600 dark:text-green-400">
                                One Event at a Time.
                            </span>
                        </h2>

                        <p className="mt-6 max-w-lg text-base leading-8 text-gray-600 dark:text-gray-400">
                            Be part of something meaningful. Get updates about
                            upcoming events, inspiring community stories, and
                            opportunities to make a real difference.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                <CheckCircle2 size={18} className="text-green-600" />
                                Upcoming Events
                            </div>

                            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                <CheckCircle2 size={18} className="text-green-600" />
                                Community Stories
                            </div>
                        </div>
                    </div>

                    {/* Right Subscription Card */}
                    <div className="relative">
                        <div className="absolute -right-3 -top-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-600 text-white shadow-lg shadow-green-600/20 sm:-right-5 sm:-top-5">
                            <Send size={27} />
                        </div>

                        <div className="rounded-[28px] border border-gray-100 bg-white p-7 shadow-[0_20px_60px_-20px_rgba(22,101,52,0.18)] dark:border-gray-800 dark:bg-[#17251C] sm:p-9">

                            <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700 dark:bg-green-900/40 dark:text-green-400">
                                <Mail size={27} />
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Join Our Newsletter
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-gray-500 dark:text-gray-400">
                                Get the latest updates delivered directly to
                                your inbox. Stay inspired and stay involved.
                            </p>

                            {/* Input UI Only */}
                            <div className="mt-8">
                                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Email Address
                                </label>

                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        className="h-14 min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10 dark:border-gray-700 dark:bg-[#101D16] dark:text-white dark:placeholder:text-gray-500"
                                    />

                                    <button
                                        type="button"
                                        className="flex h-14 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 text-sm font-bold text-white shadow-lg shadow-green-600/20 transition hover:-translate-y-0.5 hover:bg-green-700"
                                    >
                                        Subscribe
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-2 border-t border-gray-100 pt-5 dark:border-gray-800">
                                <CheckCircle2 size={16} className="shrink-0 text-green-600" />
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    No spam. No noise. Just updates that matter.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Subscriton;