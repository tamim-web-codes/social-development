import {
    ArrowRight,
    CalendarDays,
   
    Settings,
    UsersRound,
} from "lucide-react";


const features = [
    {
        icon: CalendarDays,
        title: "Create Events",
        description:
            "Organize your own community service events and bring people together for a cause.",
    },
    {
        icon: UsersRound,
        title: "Join Events",
        description:
            "Find and join events near you. Be a part of something meaningful.",
    },
    {
        icon: Settings,
        title: "Manage Events",
        description:
            "Easily manage your events, track participation, and measure the impact of your community service efforts.",
    },
];

function LeafDecoration({ className }: { className: string }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 160 160"
            fill="none"
            className={className}
        >
            <path
                d="M75 143C86 103 104 70 145 24"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
            />
            <path
                d="M112 60C112 35 127 17 151 12C151 37 137 55 112 60Z"
                fill="currentColor"
            />
            <path
                d="M92 93C70 82 62 62 69 39C92 51 101 71 92 93Z"
                fill="currentColor"
            />
            <path
                d="M105 105C111 81 130 69 154 71C147 96 128 108 105 105Z"
                fill="currentColor"
            />
            <path
                d="M67 130C44 120 34 101 39 77C63 88 74 107 67 130Z"
                fill="currentColor"
            />
        </svg>
    );
}

export function FeatureSection() {
    return (
        <section
            aria-labelledby="features-heading"
            className="relative isolate mx-auto mt-14 max-w-7xl overflow-hidden px-1 py-2 sm:mt-16 sm:px-2"
        >
            <LeafDecoration className="pointer-events-none absolute -left-20 bottom-0 -z-10 hidden h-40 w-40 text-emerald-100 dark:text-emerald-950 sm:block" />
            <LeafDecoration className="pointer-events-none absolute -right-10 -top-8 -z-10 hidden h-40 w-40 rotate-12 text-emerald-100 dark:text-emerald-950 sm:block" />

            <div className="relative z-10">
                <p className="text-xs font-bold tracking-[0.18em] text-emerald-700 dark:text-emerald-400 sm:text-sm">
                    WHY CHOOSE US
                </p>
                <h2
                    id="features-heading"
                    className="mt-1 text-3xl font-extrabold tracking-tight text-[#123b2a] dark:text-emerald-50 sm:text-4xl"
                >
                    Our Mission &amp; Features
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base sm:leading-7">
                    We make it easy to find, create and join community service
                    events that create real impact in your local area.
                </p>
            </div>

            <div className="relative z-10 mt-8 grid gap-5 md:grid-cols-3">
                {features.map(({ icon: Icon, title, description }) => (
                    <article
                        key={title}
                        className="relative min-h-60 rounded-2xl bg-[#f1faf6] px-6 py-6 dark:bg-slate-900 dark:ring-1 dark:ring-slate-800 sm:px-7 sm:py-7"
                    >
                        <div className="flex size-14 items-center justify-center rounded-full bg-[#def4e7] text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                            <Icon aria-hidden="true" className="size-8" strokeWidth={2.8} />
                        </div>
                        <h3 className="mt-4 text-xl font-bold text-[#123b2a] dark:text-slate-100">
                            {title}
                        </h3>
                        <p className="mt-2 max-w-[19rem] pr-10 text-base leading-6 text-slate-600 dark:text-slate-400">
                            {description}
                        </p>
                        <span
                            aria-hidden="true"
                            className="absolute right-6 bottom-7 flex size-11 items-center justify-center rounded-full bg-[#e2f6e9] text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 sm:right-7"
                        >
                            <ArrowRight className="size-5" strokeWidth={2.5} />
                        </span>
                    </article>
                ))}
            </div>
        </section>
    );
}