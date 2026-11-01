
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
    Search,
    MapPin,
    CalendarDays,
    Users,
    Plus,
    ArrowRight,
    Leaf,
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
    { label: "All", value: "all" },
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
                const res = await fetch("http://localhost:5000/explore-event", {
                    method: "GET",
                });

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
        <section className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 md:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="flex flex-col justify-between gap-5 border-b border-slate-200 pb-6 dark:border-slate-800 sm:flex-row sm:items-center">
                    <div>
                        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                            <Leaf size={14} />
                            Future Community Drives
                        </span>

                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
                            Upcoming Events
                        </h1>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Discover verified volunteer initiatives scheduled for
                            upcoming dates. Past events are automatically excluded
                            so you can focus on active drives that need support.
                        </p>
                    </div>

                    <Link
                        href="/add-create-events"
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                    >
                        <Plus size={18} />
                        Create Event
                    </Link>
                </div>

                {/* Categories and Search */}
                <div className="my-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                        {categories.map((category) => (
                            <button
                                key={category.value}
                                onClick={() => setActiveCategory(category.value)}
                                className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                                    activeCategory === category.value
                                        ? "border-emerald-600 bg-emerald-600 text-white"
                                        : "border-slate-200 bg-white text-slate-600 hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                                }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full lg:max-w-xs">
                        <Search
                            size={17}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search events or areas..."
                            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-emerald-950"
                        />
                    </div>
                </div>

                {/* Result Count */}
                <div className="mb-5 flex items-center justify-between">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Showing{" "}
                        <span className="font-bold text-slate-900 dark:text-white">
                            {filteredEvents.length}
                        </span>{" "}
                        upcoming events
                    </p>
                </div>

                {/* Event Cards */}
                {loading ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div
                                key={item}
                                className="h-[420px] animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800"
                            />
                        ))}
                    </div>
                ) : filteredEvents.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 py-20 text-center dark:border-slate-700">
                        <Leaf className="mx-auto mb-4 text-emerald-600" size={40} />

                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                            No Events Found
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            Try searching with another keyword or category.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredEvents.map((event) => (
                            <article
                                key={event._id}
                                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                            >
                                {/* Image */}
                                <div className="relative h-56 overflow-hidden">
                                    <Image
                                        width={400}
                                        height={300}
                                        src={event.thumbnailUrl}
                                        alt={event.title}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />

                                    {/* Category Badge */}
                                    <span className="absolute right-4 top-4 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow">
                                        {categories.find(
                                            (category) => category.value === event.type
                                        )?.label || event.type}
                                    </span>

                                    {/* Date Badge */}
                                    <div className="absolute bottom-4 left-4 rounded-xl border border-white/60 bg-white/95 px-3 py-2 text-center shadow-md backdrop-blur">
                                        <CalendarDays
                                            size={18}
                                            className="mx-auto mb-1 text-emerald-600"
                                        />

                                        <p className="text-sm font-bold text-slate-900">
                                            {new Date(event.date).toLocaleDateString(
                                                "en-US",
                                                { month: "short", day: "numeric" }
                                            )}
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            {new Date(event.date).getFullYear()}
                                        </p>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="flex min-h-[220px] flex-col p-5">
                                    <h2 className="line-clamp-1 text-xl font-bold text-slate-900 transition group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                                        {event.title}
                                    </h2>

                                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        {event.description}
                                    </p>

                                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                        <MapPin size={17} className="shrink-0 text-emerald-600" />
                                        <span className="truncate">{event.location}</span>
                                    </div>

                                    {event.joinedCount !== undefined && (
                                        <div className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                            <Users size={17} className="text-emerald-600" />
                                            {event.joinedCount} People Joined
                                        </div>
                                    )}

                                    <div className="mt-auto pt-5">
                                        <Link
                                            href={`/event/${event._id}`}
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                        >
                                            View Details
                                            <ArrowRight size={17} />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ExploreEvent;
