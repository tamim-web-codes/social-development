import {
    ArrowRight,
    CalendarDays,
    Heart,
    Leaf,
    MapPin,
    Users,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const stats = [
    { icon: CalendarDays, value: "120+", label: "Events Organized" },
    { icon: Users, value: "8K+", label: "Volunteers" },
    { icon: MapPin, value: "45", label: "Districts Covered" },
    { icon: Heart, value: "25K+", label: "Lives Impacted", filled: true },
];

export function Banner() {
    return (
        <div>
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
                        <Link href='/explore-events'>
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-full bg-[#1f6b41] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2b7d50]"
                            >
                                Explore Events
                                <ArrowRight className="size-4" />
                            </button>
                        </Link>
                        <Link href='/add-create-events'>

                            <Button
                                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-5 text-sm font-semibold light text-[#1f6b41] transition-colors hover:bg-[#f0f0f0]"

                            >

                                Create an Event

                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats strip */}
            <div className="relative z-10 mx-auto grid -mt-8 max-w-5xl grid-cols-2 gap-y-8 rounded-2xl border border-[#dcebe2] bg-[#eef6f1] px-4 py-8 shadow-lg dark:border-emerald-900/70 dark:bg-[#10251b] sm:grid-cols-4 sm:px-8 md:-mt-10">
                {stats.map(({ icon: Icon, value, label, filled }, i) => (
                    <div
                        key={label}
                        className={`flex flex-col items-center gap-3 px-2 text-center ${i < stats.length - 1
                            ? "sm:border-r sm:border-[#d5e6dc] dark:sm:border-emerald-900"
                            : ""
                            }`}
                    >
                        <Icon
                            className={`size-8 text-green-600 dark:text-green-400 ${filled ? "fill-current" : ""}`}
                        />
                        <p className="text-2xl font-extrabold text-[#123b2a] dark:text-emerald-50 sm:text-3xl">
                            {value}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-slate-400">{label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
