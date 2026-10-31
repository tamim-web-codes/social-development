import { ArrowRight, Leaf, Play } from "lucide-react";
import { Button } from "./ui/button";

export function Banner() {
    return (
        <section
            className="relative isolate overflow-hidden rounded-2xl mt-5"
            style={{
                background:
                    "linear-gradient(100deg, #0d2c1c 0%, #124a2f 55%, #17603e 100%)",
            }}
        >
            {/* Faux "photo" panel — layered gradients, no background image */}
            <div
                aria-hidden="true"
                className="absolute inset-y-0 right-0 hidden w-[58%] sm:block"
            >
                <div
                    className="absolute inset-0"
                    style={{
                        background: [
                            "radial-gradient(90% 120% at 85% 12%, rgba(163,230,53,0.35) 0%, rgba(163,230,53,0) 45%)",
                            "radial-gradient(70% 90% at 96% 85%, rgba(190,242,100,0.22) 0%, rgba(190,242,100,0) 50%)",
                            "radial-gradient(110% 100% at 55% 45%, rgba(6,40,24,0.55) 0%, rgba(6,40,24,0) 60%)",
                            "linear-gradient(115deg, #1c7a45 0%, #57a05f 40%, #7aaf60 70%, #a3bf6a 100%)",
                        ].join(", "),
                    }}
                />
                {/* soft foliage blobs */}
                <div className="absolute top-[12%] right-[10%] size-40 rounded-full bg-lime-400/20 blur-3xl" />
                <div className="absolute bottom-[8%] left-[18%] size-52 rounded-full bg-emerald-900/50 blur-3xl" />
                <div className="absolute top-[45%] right-[30%] size-28 rounded-full bg-lime-200/15 blur-2xl" />
                {/* blend the photo edge into the dark panel */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(90deg, #124a2f 0%, rgba(18,74,47,0) 42%)",
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-xl px-6 py-12 sm:px-12 sm:py-16">
                <span className="inline-flex items-center gap-2 rounded-full border border-lime-200/30 bg-lime-200/10 px-4 py-1.5 text-xs font-medium text-lime-100">
                    <Leaf className="size-3.5" />
                    Community &bull; Driven &bull; social development platform
                </span>

                <h1 className="mt-5 text-4xl leading-tight font-extrabold text-white sm:text-5xl">
                    Together for a
                    <br />
                    Better <span className="text-lime-300">Tommorrow</span>
                </h1>

                <p className="mt-4 max-w-md text-sm/relaxed text-white/85">
                    Join community events, create positive change, and build a
                    stronger, greener, and healthier society.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full bg-[#1f6b41] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2b7d50]"
                    >
                        Explore Events
                        <ArrowRight className="size-4" />
                    </button>
                    <Button
                        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-5 text-sm font-semibold light text-[#1f6b41] transition-colors hover:bg-[#f0f0f0]"

                    >

                        Create an Event

                    </Button>
                </div>
            </div>
        </section>
    );
}
