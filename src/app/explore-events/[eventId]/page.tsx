
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    CalendarDays,
    MapPin,
    Users,
    Clock,
    Heart,
    Share2,
    CheckCircle2,
    Sparkles,
} from "lucide-react";
import JoindeEventsCard from "@/components/joindeEventsCard";

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

const EventDetails = async ({
    params,
}: {
    params: Promise<{ eventId: string }>;
}) => {
    const { eventId } = await params;

    const res = await fetch(
        `http://localhost:5000/explore-event/${eventId}`,
        {
            method: "GET",
            cache: "no-store",
        }
    );

    if (!res.ok) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Event Not Found
                    </h2>
                    <p className="mt-2 text-slate-500">
                        This event may have been removed or does not exist.
                    </p>
                    <Link
                        href="/explore-events"
                        className="mt-6 inline-flex rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white"
                    >
                        Back to Events
                    </Link>
                </div>
            </div>
        );
    }

    const event: Event = await res.json();

    const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const eventType = event.type
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    return (
        <>
            <main className="min-h-screen bg-[#f6f8f7] px-4 py-8 dark:bg-slate-950 md:px-8 lg:px-12">
                <div className="mx-auto max-w-7xl">

                    {/* Back Navigation */}
                    <div className="mb-7 flex items-center justify-between">
                        <Link
                            href="/explore-events"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-emerald-600 dark:text-slate-300"
                        >
                            <ArrowLeft size={18} />
                            Explore Events
                        </Link>

                        <span className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-xs font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-slate-900 dark:text-emerald-400">
                            <Sparkles size={14} />
                            Community Initiative
                        </span>
                    </div>

                    {/* Hero Section */}
                    <section className="relative overflow-hidden rounded-[28px] bg-slate-900 shadow-xl">
                        <div className="relative h-[380px] md:h-[500px]">
                            <Image
                                src={event.thumbnailUrl}
                                alt={event.title}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 1200px"
                                className="object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                            <div className="absolute left-6 top-6 md:left-10 md:top-10">
                                <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-md">
                                    {eventType}
                                </span>
                            </div>

                            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                                <span className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-300">
                                    <Sparkles size={16} />
                                    Make a Difference Together
                                </span>

                                <h1 className="max-w-4xl text-3xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
                                    {event.title}
                                </h1>

                                <div className="mt-6 flex flex-wrap gap-5 text-sm text-white/90">
                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="text-emerald-400" size={18} />
                                        {formattedDate}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <MapPin className="text-emerald-400" size={18} />
                                        {event.location}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Information Cards */}
                    <section className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950">
                                <Users size={23} />
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Volunteers Joined
                            </p>
                            <h3 className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">
                                {event.joinedCount ?? 0}
                            </h3>
                        </div>

                        <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950">
                                <CalendarDays size={23} />
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Event Date
                            </p>
                            <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                                {new Date(event.date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </h3>
                        </div>

                        <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-950">
                                <Clock size={23} />
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Event Status
                            </p>
                            <h3 className="mt-1 text-lg font-bold text-emerald-600">
                                Upcoming Event
                            </h3>
                        </div>
                    </section>

                    {/* Main Content */}
                    <section className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">

                        {/* About Event */}
                        <div className="space-y-7 lg:col-span-2">

                            <div className="rounded-2xl border border-slate-200/70 bg-white p-6 md:p-8 dark:border-slate-800 dark:bg-slate-900">
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="h-8 w-1.5 rounded-full bg-emerald-500" />
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        About This Event
                                    </h2>
                                </div>

                                <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
                                    {event.description}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-slate-200/70 bg-white p-6 md:p-8 dark:border-slate-800 dark:bg-slate-900">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950">
                                        <CheckCircle2 size={22} />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                        Event Information
                                    </h2>
                                </div>

                                <div className="space-y-5">
                                    <div className="flex items-start gap-4">
                                        <CalendarDays className="mt-1 text-emerald-600" size={20} />
                                        <div>
                                            <p className="font-semibold text-slate-800 dark:text-white">
                                                Scheduled Date
                                            </p>
                                            <p className="mt-1 text-sm text-slate-500">
                                                {formattedDate}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <MapPin className="mt-1 text-emerald-600" size={20} />
                                        <div>
                                            <p className="font-semibold text-slate-800 dark:text-white">
                                                Event Location
                                            </p>
                                            <p className="mt-1 text-sm text-slate-500">
                                                {event.location}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <Users className="mt-1 text-emerald-600" size={20} />
                                        <div>
                                            <p className="font-semibold text-slate-800 dark:text-white">
                                                Event Category
                                            </p>
                                            <p className="mt-1 text-sm text-slate-500">
                                                {eventType}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Join Event Sidebar */}
                        <aside className="h-fit rounded-3xl border border-emerald-100 bg-white p-6 shadow-lg shadow-emerald-900/5 dark:border-slate-800 dark:bg-slate-900 md:p-7">
                            <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                                <Heart size={27} />
                            </div>

                            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                                Be Part of Something Good!
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                Your participation can make a real difference. Join
                                this initiative and help create a positive impact
                                in the community.
                            </p>

                            <div className="my-6 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/40">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-600 dark:text-slate-300">
                                        Current Volunteers
                                    </span>
                                    <span className="font-bold text-emerald-700 dark:text-emerald-400">
                                        {event.joinedCount ?? 0}
                                    </span>
                                </div>
                            </div>

                            <JoindeEventsCard event={event} />

                            <button
                                type="button"
                                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                                <Share2 size={17} />
                                Share Event
                            </button>

                            <p className="mt-5 text-center text-xs leading-5 text-slate-400">
                                Together, small actions can create a big impact.
                            </p>
                        </aside>
                    </section>
                </div>

            </main>

        </>
    );
};

export default EventDetails;
