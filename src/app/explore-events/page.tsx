
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
    Search,
    MapPin,
    CalendarDays,
    Users,
    Plus,
    ArrowUpRight,
    Leaf,
    ArrowRight,
    Sparkles,
} from "lucide-react";
import Image from "next/image";

type Event = {
    _id: string;
    title: string;
    description: string;
    type: string;
    thumbnailUrl: string;
    location: string;
    date: string;
    joinedCount?: number;
};

const categories = [
    { label: "All Events", value: "all" },
    { label: "Community Cleanup", value: "community-cleanup" },
    { label: "Clothing Distribution", value: "clothing-distribution" },
    { label: "Food Drive", value: "food-drive" },
    { label: "Volunteer Event", value: "volunteer" },
];

const ExploreEvent = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/explore-event`,
                    {
                        method: "GET",
                    }
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch events");
                }

                const data = await res.json();
                setEvents(Array.isArray(data) ? data : data.events || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const filteredEvents = useMemo(() => {
        return events.filter((event) => {
            const matchesSearch = [
                event.title,
                event.location,
                event.type,
                event.description,
            ].some((value) =>
                value?.toLowerCase().includes(search.toLowerCase())
            );

            const matchesCategory =
                activeCategory === "all" ||
                event.type?.toLowerCase() === activeCategory;

            const isUpcoming =
                new Date(event.date).getTime() >=
                new Date(new Date().toDateString()).getTime();

            return matchesSearch && matchesCategory && isUpcoming;
        });
    }, [events, search, activeCategory]);

    return (
        <section className="min-h-screen overflow-hidden bg-[#f8faf8] px-4 py-12 dark:bg-[#080f0c] md:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">

                {/* Top Heading */}
                <div className="mb-12 grid grid-cols-1 gap-8 border-b border-slate-200 pb-10 dark:border-slate-800 lg:grid-cols-[1fr_auto] lg:items-end">

                    <div>
                   
                    
                    </div>

                    <Link
                        href="/add-create-events"
                        className="inline-flex h-fit items-center justify-center gap-3 rounded-2xl bg-emerald-600 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-emerald-600/15 transition duration-300 hover:-translate-y-1 hover:bg-emerald-700"
                    >
                        <Plus size={19} />
                        Create an Event
                        <ArrowUpRight size={17} />
                    </Link>
                </div>

                {/* Search and Filters */}
                <div className="mb-10">

                    <div className="mb-6 flex flex-col justify-between gap-5 md:flex-row md:items-center">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                                Find Your Purpose
                            </p>

                            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-3xl">
                              Upcomming Events
                            </h2>
                        </div>

                        <div className="relative w-full md:max-w-sm">
                            <Search
                                size={19}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by event, place or keyword..."
                                className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Category Navigation */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category.value}
                                onClick={() =>
                                    setActiveCategory(category.value)
                                }
                                className={`rounded-xl px-4 py-3 text-xs font-bold transition-all duration-300 sm:text-sm ${
                                    activeCategory === category.value
                                        ? "bg-slate-950 text-white shadow-lg dark:bg-emerald-600"
                                        : "border border-slate-200 bg-white text-slate-500 hover:border-emerald-400 hover:text-emerald-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
                                }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Header */}
                <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                            <Leaf size={19} />
                        </div>

                        <div>
                            <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                                Upcoming Initiatives
                            </p>
                            <p className="text-xs text-slate-500">
                                Discover and participate in community events
                            </p>
                        </div>
                    </div>

                    <p className="rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm dark:bg-slate-900 dark:text-slate-300">
                        {filteredEvents.length} Events Available
                    </p>
                </div>

                {/* Event Cards */}
                {loading ? (
                    <div className="space-y-6">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-64 animate-pulse rounded-[28px] bg-slate-200 dark:bg-slate-800"
                            />
                        ))}
                    </div>
                ) : filteredEvents.length === 0 ? (
                    <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-5 py-24 text-center dark:border-slate-800 dark:bg-slate-900">
                        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                            <Search size={27} />
                        </div>

                        <h3 className="mt-5 text-2xl font-extrabold text-slate-900 dark:text-white">
                            Nothing Found
                        </h3>

                        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                            We couldn't find any upcoming events matching your
                            search. Try another category or keyword.
                        </p>

                        <button
                            onClick={() => {
                                setSearch("");
                                setActiveCategory("all");
                            }}
                            className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredEvents.map((event, index) => (
                            <article
                                key={event._id}
                                className="group relative grid overflow-hidden rounded-[28px] border border-slate-200/80 bg-white transition-all duration-500 hover:border-emerald-300 hover:shadow-[0_20px_60px_-25px_rgba(16,185,129,0.25)] dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-[360px_1fr]"
                            >
                                {/* Image Section */}
                                <div className="relative min-h-[260px] overflow-hidden lg:min-h-[290px]">
                                    <Image
                                        src={event.thumbnailUrl}
                                        alt={event.title}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 360px"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                                    {/* Category */}
                                    <div className="absolute left-5 top-5">
                                        <span className="rounded-lg bg-white px-3 py-2 text-[11px] font-extrabold uppercase tracking-wide text-emerald-700 shadow-xl">
                                            {categories.find(
                                                (category) =>
                                                    category.value === event.type
                                            )?.label || event.type}
                                        </span>
                                    </div>

                                    {/* Image Index */}
                                    <div className="absolute bottom-5 left-5 flex items-center gap-2 text-white">
                                        <span className="text-4xl font-black tracking-tighter">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <span className="h-8 w-px bg-white/60" />
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                                            Community
                                            <br />
                                            Initiative
                                        </span>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="flex flex-col justify-between p-6 md:p-8 lg:p-9">

                                    <div>
                                        {/* Top Meta */}
                                        <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                                            <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                                <CalendarDays
                                                    size={16}
                                                    className="text-emerald-600"
                                                />
                                                {new Date(event.date).toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        month: "long",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    }
                                                )}
                                            </span>

                                            <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                                <MapPin
                                                    size={16}
                                                    className="text-emerald-600"
                                                />
                                                {event.location}
                                            </span>
                                        </div>
                                      
                                        <h3 className="max-w-2xl text-2xl font-black leading-tight tracking-tight text-slate-900 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400 md:text-3xl">
                                            {event.title}
                                        </h3>
                                      
                                        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                                            {event.description}
                                        </p>
                                    </div>
                                 
                                    <div className="mt-8 flex flex-col justify-between gap-5 border-t border-slate-100 pt-6 dark:border-slate-800 sm:flex-row sm:items-center">

                                        <div className="flex items-center gap-3">
                                            <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                                                <Users size={21} />
                                            </div>

                                            <div>
                                                <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                                                    {event.joinedCount ?? 0} Volunteers
                                                </p>
                                                <p className="mt-0.5 text-[11px] text-slate-500">
                                                    People joining this initiative
                                                </p>
                                            </div>
                                        </div>

                                        <Link
                                            href={`/explore-events/${event._id}`}
                                            className="inline-flex items-center justify-center gap-3 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-slate-950 dark:hover:bg-emerald-500"
                                        >
                                            View Event
                                            <ArrowRight
                                                size={17}
                                                className="transition-transform group-hover:translate-x-1"
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
              
                {!loading && filteredEvents.length > 0 && (
                    <div className="mt-12 flex flex-col items-center justify-center gap-3 border-t border-slate-200 py-8 text-center dark:border-slate-800">
                        <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                            <HeartIcon />
                        </div>

                        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                            Every small contribution creates a meaningful impact.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

function HeartIcon() {
    return <Leaf size={18} />;
}

export default ExploreEvent;
