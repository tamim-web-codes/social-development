
import JoindemanageCard from '@/components/joinde-manage-card';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';

import {
    CheckCircle2,
    Sparkles,
    ArrowUpRight,
    CalendarDays,
} from 'lucide-react';

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

const JoinedEvents = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    if (!user?.email) {
        return (
            <section className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
                <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">

                    <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950">
                        <CheckCircle2 className="size-8 text-emerald-600 dark:text-emerald-400" />
                    </div>

                    <h2 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">
                        Please Login First
                    </h2>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Login to see your joined events.
                    </p>

                    <Link
                        href="/signin"
                        className="mt-6 inline-flex rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                    >
                        Login Now
                    </Link>
                </div>
            </section>
        );
    }

    const res = await fetch(
        `http://localhost:5000/joinde-events/${encodeURIComponent(user.email)}`,
        {
            cache: 'no-store',
        }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch joined events');
    }

    const data: JoinedEvent[] = await res.json();

    return (
        <section className="min-h-screen bg-slate-50 px-4 py-12 transition-colors duration-300 sm:px-6 lg:px-10 dark:bg-slate-950">

            <div className="mx-auto max-w-7xl">

                {/* Page Header */}
                <div className="mb-10">

                    {/* Badge */}
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-400">
                        <CheckCircle2 className="size-4" />
                        My Volunteer Activities
                    </div>

                    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

                        {/* Title */}
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                                My Joined Events
                            </h1>

                            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                                Keep track of the events you've joined and
                                continue making a positive impact in your community.
                            </p>
                        </div>

                        {/* Event Count */}
                        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                            <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                                <CalendarDays className="size-6" />
                            </div>

                            <div>
                                <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
                                    {data.length}
                                </p>

                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                    Joined Events
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Divider */}
                    <div className="mt-8 h-px bg-slate-200 dark:bg-slate-800" />
                </div>

                {/* Events */}
                {data.length > 0 ? (

                    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">

                        {data.map((event) => (
                            <JoindemanageCard
                                key={event._id}
                                data={event}
                            />
                        ))}

                    </div>

                ) : (

                    /* Empty State */
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center dark:border-slate-700 dark:bg-slate-900">

                        <div className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-emerald-50 dark:bg-emerald-950">
                            <Sparkles className="size-10 text-emerald-500" />
                        </div>

                        <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
                            No Joined Events Yet
                        </h2>

                        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400">
                            You haven't joined any events yet. Explore events
                            and become part of your community.
                        </p>

                        <Link
                            href="/events"
                            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
                        >
                            Explore Events
                            <ArrowUpRight className="size-4" />
                        </Link>

                    </div>
                )}

            </div>
        </section>
    );
};

export default JoinedEvents;
