
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowUpRight,
    CalendarDays,
    MapPin,
    CheckCircle2,
    Heart,
    Sparkles,
} from "lucide-react";

type JoinedEvent = {
    _id: string;
    eventId: string;
    eventTitle?: string;
    title?: string;
    description?: string;
    image?: string;
    thumbnailUrl?: string;
    location?: string;
    date?: string;
    type?: string;
    userEmail?: string;
};

const JoindemanageCard = ({ data }: { data: JoinedEvent }) => {
    const title = data.eventTitle || data.title || "Untitled Event";


    const formattedDate = data.date
        ? new Date(data.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })
        : "Date not available";

    return (
        <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-700">

            {/* Image Section */}
            <div className="relative h-60 overflow-hidden bg-slate-100 dark:bg-slate-800">

                <Image
                    src={data.thumbnailUrl || "/default-event-image.jpg"}
                    alt=''
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/10" />

                {/* Category */}
                <div className="absolute left-5 top-5">
                    <span className="rounded-full border border-white/30 bg-white/90 px-4 py-2 text-xs font-bold capitalize text-emerald-700 shadow-lg backdrop-blur-md">
                        {data.type?.replace("-", " ") || "Community Event"}
                    </span>
                </div>

                {/* Favorite Icon */}
                <div className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full border border-white/30 bg-white/90 text-rose-500 shadow-lg backdrop-blur-md">
                    <Heart className="size-5" />
                </div>

                {/* Joined Badge */}
                <div className="absolute bottom-5 left-5">
                    <div className="flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-lg">
                        <CheckCircle2 className="size-4" />
                        Successfully Joined
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">

                <h3 className="line-clamp-1 text-xl font-extrabold text-slate-800 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                    {title}
                </h3>

                <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {data.description ||
                        "Join this amazing community initiative and become a part of something meaningful."}
                </p>

                {/* Event Information */}
                <div className="mt-6 grid grid-cols-2 gap-3">

                    {/* Date */}
                    <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/40">
                        <CalendarDays className="mb-3 size-5 text-emerald-600 dark:text-emerald-400" />

                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            Event Date
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-800 dark:text-slate-200">
                            {formattedDate}
                        </p>
                    </div>

                    {/* Location */}
                    <div className="rounded-2xl bg-blue-50 p-4 dark:bg-blue-950/40">
                        <MapPin className="mb-3 size-5 text-blue-600 dark:text-blue-400" />

                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            Location
                        </p>

                        <p className="mt-1 line-clamp-1 text-sm font-bold text-slate-800 dark:text-slate-200">
                            {data.location || "Not available"}
                        </p>
                    </div>

                </div>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">

                    <div>
                        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="size-4" />

                            <span className="text-xs font-bold">
                                Registration Confirmed
                            </span>
                        </div>

                        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                            You're part of this event
                        </p>
                    </div>

                    <Link
                        href={`/explore-events/${data.eventId}`}
                        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                    >
                        Explore
                        <ArrowUpRight className="size-4" />
                    </Link>

                </div>
            </div>
        </article>
    );
};

export default JoindemanageCard;
