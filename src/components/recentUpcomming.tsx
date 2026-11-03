import React from "react";
import Link from "next/link";
import {
    ArrowUpRight,
    CalendarDays,
    MapPin,
    Sparkles,
} from "lucide-react";
import Image from "next/image";

type Event = {
    _id: string;
    title: string;
    type: string;
    thumbnailUrl: string;
    location: string;
    date: string;
    description: string;
};

const RecentUpcomming = async () => {
    let events: Event[] = [];

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/recent-upcoming-events`,
            {
                cache: "no-store",
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch events");
        }

        const data = await res.json();
        events = Array.isArray(data) ? data.slice(0, 6) : [];
    } catch (error) {
        console.error("Upcoming events error:", error);
    }

    const typeNames: Record<string, string> = {
        "food-drive": "Food Drive",
        plantation: "Plantation",
        cleanup: "Cleanup",
        donation: "Donation",
    };

    const accents = [
        "from-emerald-500 to-teal-500",
        "from-orange-500 to-amber-500",
        "from-sky-500 to-blue-500",
        "from-violet-500 to-purple-500",
        "from-rose-500 to-pink-500",
        "from-lime-500 to-green-500",
    ];

    return (
        <section className="bg-[#F7FAF7] px-4 py-20 dark:bg-[#0A0F0C] sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Section Heading */}
                <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                            <Sparkles size={16} />
                            Make a Difference
                        </div>

                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
                            Recent Upcoming{" "}
                            <span className="text-emerald-600">
                                Events
                            </span>
                        </h2>

                        <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500 dark:text-gray-400 sm:text-base">
                            Join hands with your community and be part of
                            something meaningful. Every small action
                            creates a big impact.
                        </p>
                    </div>

                    <Link
                        href="/events"
                        className="group inline-flex w-fit items-center gap-2 rounded-xl border border-emerald-600 px-5 py-3 font-semibold text-emerald-700 transition-all hover:bg-emerald-600 hover:text-white dark:text-emerald-400 dark:hover:text-white"
                    >
                        Explore All Events
                        <ArrowUpRight
                            size={18}
                            className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                        />
                    </Link>
                </div>

                {/* Events Grid */}
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {events.map((event, index) => (
                            <article
                                key={event._id}
                                className={`group overflow-hidden rounded-3xl border border-gray-200/70 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:border-gray-800 dark:bg-[#121A15] ${index === 0
                                    ? "md:col-span-2 lg:col-span-2"
                                    : ""
                                    }`}
                            >
                                {/* Image */}
                                <div
                                    className={`relative overflow-hidden ${index === 0
                                        ? "h-64 sm:h-80"
                                        : "h-56"
                                        }`}
                                >
                                    <Image
                                        src={event.thumbnailUrl}
                                        alt={event.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                                    {/* Event Type */}
                                    <span
                                        className={`absolute left-5 top-5 rounded-full bg-gradient-to-r ${accents[index % accents.length]} px-4 py-2 text-xs font-bold text-white shadow-lg`}
                                    >
                                        {typeNames[event.type] || event.type}
                                    </span>

                                    {/* Number */}
                                    <div className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full border border-white/40 bg-black/30 text-sm font-bold text-white backdrop-blur-md">
                                        0{index + 1}
                                    </div>

                                    {/* Image Title */}
                                    <div className="absolute bottom-5 left-5 right-5">
                                        <p className="mb-2 text-xs font-semibold uppercase tracking-[3px] text-emerald-300">
                                            Community Initiative
                                        </p>

                                        <h3 className="max-w-xl text-2xl font-bold leading-snug text-white sm:text-3xl">
                                            {event.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-5 sm:p-6">
                                    <p className="mb-5 line-clamp-2 min-h-12 text-sm leading-6 text-gray-500 dark:text-gray-400">
                                        {event.description}
                                    </p>

                                    <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-gray-600 dark:text-gray-300">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays
                                                size={17}
                                                className="text-emerald-600"
                                            />
                                            {new Date(
                                                `${event.date}T00:00:00`
                                            ).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                                timeZone: "Asia/Dhaka",
                                            })}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <MapPin
                                                size={17}
                                                className="text-emerald-600"
                                            />
                                            <span className="line-clamp-1">
                                                {event.location}
                                            </span>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/explore-events/${event._id}`}
                                        className="group/btn flex w-full items-center justify-between rounded-xl bg-[#F0F7F1] px-5 py-3.5 font-bold text-emerald-700 transition-all hover:bg-emerald-600 hover:text-white dark:bg-emerald-950/40 dark:text-emerald-400 dark:hover:bg-emerald-600 dark:hover:text-white"
                                    >
                                        Explore Event
                                        <ArrowUpRight
                                            size={19}
                                            className="transition-transform group-hover/btn:rotate-45"
                                        />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-3xl border border-dashed border-gray-300 py-20 text-center dark:border-gray-700">
                        <CalendarDays
                            size={42}
                            className="mx-auto mb-4 text-emerald-600"
                        />
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                            No Upcoming Events
                        </h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            There are no upcoming events right now.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default RecentUpcomming;