
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
    CalendarDays,
    MapPin,
    Eye,
    Pencil,
    Trash2,
    Users,
    ArrowUpRight,
    CalendarCheck,
} from "lucide-react";

type Event = {
    _id: string;
    title: string;
    type: string;
    thumbnailUrl: string;
    location: string;
    date: string;
    description: string;
    joinedCount?: number;
};

type MyManageEventProps = {
    result: Event[];
    onDelete?: (id: string) => void;
};

const MyManageEvent = ({
    result,
    onDelete,
}: MyManageEventProps) => {
    const router = useRouter();

    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [deletingEvent, setDeletingEvent] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        type: "",
        thumbnailUrl: "",
        location: "",
        date: "",
        description: "",
    });

    // Open Edit Dialog
    const openEditDialog = (event: Event) => {
        setEditingEvent(event);

        setFormData({
            title: event.title,
            type: event.type,
            thumbnailUrl: event.thumbnailUrl,
            location: event.location,
            date: event.date,
            description: event.description,
        });
    };

    // Update Event
    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!editingEvent) return;

        try {
            setIsUpdating(true);

            const res = await fetch(
                `http://localhost:5000/update-event/${editingEvent._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!res.ok) {
                throw new Error("Event update failed");
            }

            setEditingEvent(null);
            router.refresh();

            alert("Event updated successfully!");
        } catch (error) {
            console.error(error);
            alert("Event update failed!");
        } finally {
            setIsUpdating(false);
        }
    };

    // Delete Event
    const handleDelete = async () => {
        if (!deletingEvent) return;

        try {
            setIsDeleting(true);

            const res = await fetch(
                `http://localhost:5000/delete-event/${deletingEvent}`,
                {
                    method: "DELETE",
                }
            );

            if (!res.ok) {
                throw new Error("Event delete failed");
            }

            onDelete?.(deletingEvent);
            setDeletingEvent(null);

            router.refresh();

            alert("Event deleted successfully!");
        } catch (error) {
            console.error(error);
            alert("Event delete failed!");
        } finally {
            setIsDeleting(false);
        }
    };

    // Format Date
    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

    // Format Event Type
    const formatType = (type: string) =>
        type
            .split("-")
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join(" ");

    // Empty Event
    if (!result || result.length === 0) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-5 text-center dark:border-slate-700 dark:bg-slate-900">

                <div className="flex size-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950">
                    <CalendarCheck size={30} />
                </div>

                <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                    No Events Created Yet
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    You haven't published any community events. Create your
                    first event and start making a difference.
                </p>

                <Link
                    href="/add-create-events"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                    Create Your First Event
                    <ArrowUpRight size={17} />
                </Link>
            </div>
        );
    }

    return (
        <section className="space-y-6">

            {/* Summary */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Total Published Events
                            </p>

                            <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
                                {result.length}
                            </h2>
                        </div>

                        <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                            <CalendarDays size={23} />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Total Volunteers
                            </p>

                            <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
                                {result.reduce(
                                    (total, event) =>
                                        total + (event.joinedCount ?? 0),
                                    0
                                )}
                            </h2>
                        </div>

                        <div className="flex size-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                            <Users size={23} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Event List */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

                <div className="flex flex-col justify-between gap-3 border-b border-slate-200 p-5 dark:border-slate-800 sm:flex-row sm:items-center">

                    <div>
                        <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                            Your Published Events
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                            Manage and track your community initiatives
                        </p>
                    </div>

                    <span className="w-fit rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                        {result.length} Total Events
                    </span>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800">

                    {result.map((event) => {
                        const isUpcoming =
                            new Date(event.date).getTime() >=
                            new Date(new Date().toDateString()).getTime();

                        return (
                            <article
                                key={event._id}
                                className="group flex flex-col gap-5 p-5 transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40 md:flex-row md:items-center"
                            >

                                {/* Thumbnail */}
                                <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-2xl bg-slate-100 md:h-28 md:w-40">

                                    <Image
                                        src={event.thumbnailUrl}
                                        alt={event.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 160px"
                                        className="object-cover transition duration-500 group-hover:scale-110"
                                    />

                                </div>

                                {/* Event Details */}
                                <div className="min-w-0 flex-1">

                                    <div className="mb-2 flex flex-wrap items-center gap-2">

                                        <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                                            {formatType(event.type)}
                                        </span>

                                        <span
                                            className={`rounded-md px-2.5 py-1 text-[10px] font-bold ${
                                                isUpcoming
                                                    ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                                                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                                            }`}
                                        >
                                            {isUpcoming ? "Upcoming" : "Completed"}
                                        </span>

                                    </div>

                                    <h3 className="truncate text-lg font-extrabold text-slate-900 dark:text-white">
                                        {event.title}
                                    </h3>

                                    <p className="mt-1 line-clamp-1 text-xs leading-5 text-slate-500">
                                        {event.description}
                                    </p>

                                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">

                                        <span className="flex items-center gap-1.5 text-xs text-slate-500">
                                            <MapPin size={14} className="text-emerald-600" />
                                            {event.location}
                                        </span>

                                        <span className="flex items-center gap-1.5 text-xs text-slate-500">
                                            <CalendarDays size={14} className="text-emerald-600" />
                                            {formatDate(event.date)}
                                        </span>

                                        <span className="flex items-center gap-1.5 text-xs text-slate-500">
                                            <Users size={14} className="text-emerald-600" />
                                            {event.joinedCount ?? 0} Joined
                                        </span>

                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex shrink-0 items-center gap-2 md:flex-col lg:flex-row">

                                    {/* View */}
                                    <Link
                                        href={`/explore-events/${event._id}`}
                                        title="View Event"
                                        className="flex size-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-emerald-950"
                                    >
                                        <Eye size={17} />
                                    </Link>

                                    {/* Edit */}
                                    <button
                                        type="button"
                                        title="Edit Event"
                                        onClick={() => openEditDialog(event)}
                                        className="flex size-10 items-center justify-center rounded-xl border border-slate-200 text-blue-600 transition hover:border-blue-500 hover:bg-blue-50 dark:border-slate-700 dark:hover:bg-blue-950"
                                    >
                                        <Pencil size={16} />
                                    </button>

                                    {/* Delete */}
                                    <button
                                        type="button"
                                        title="Delete Event"
                                        onClick={() => setDeletingEvent(event._id)}
                                        className="flex size-10 items-center justify-center rounded-xl border border-slate-200 text-red-500 transition hover:border-red-500 hover:bg-red-50 dark:border-slate-700 dark:hover:bg-red-950"
                                    >
                                        <Trash2 size={16} />
                                    </button>

                                </div>
                            </article>
                        );
                    })}

                </div>
            </div>

            {/* Edit Dialog */}
            {editingEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">

                    <div className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900">

                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            Edit Event
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Update your event information.
                        </p>

                        <form onSubmit={handleUpdate} className="mt-5 space-y-4">

                            <input
                                required
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        title: e.target.value,
                                    })
                                }
                                placeholder="Event Title"
                                className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800"
                            />

                            <select
                                required
                                value={formData.type}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        type: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800"
                            >
                                <option value="community-cleanup">
                                    Community Cleanup
                                </option>

                                <option value="clothing-distribution">
                                    Clothing Distribution
                                </option>

                                <option value="food-drive">
                                    Food Drive
                                </option>

                                <option value="volunteer">
                                    Volunteer Event
                                </option>
                            </select>

                            <input
                                required
                                type="url"
                                value={formData.thumbnailUrl}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        thumbnailUrl: e.target.value,
                                    })
                                }
                                placeholder="Thumbnail Image URL"
                                className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800"
                            />

                            <input
                                required
                                value={formData.location}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        location: e.target.value,
                                    })
                                }
                                placeholder="Location"
                                className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800"
                            />

                            <input
                                required
                                type="date"
                                value={formData.date}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        date: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800"
                            />

                            <textarea
                                required
                                rows={4}
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                                placeholder="Event Description"
                                className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800"
                            />

                            <div className="flex justify-end gap-3">

                                <button
                                    type="button"
                                    disabled={isUpdating}
                                    onClick={() => setEditingEvent(null)}
                                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isUpdating ? "Updating..." : "Update Event"}
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            {deletingEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900">

                        <div className="flex size-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950">
                            <Trash2 size={24} />
                        </div>

                        <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                            Delete Event?
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Are you sure you want to delete this event? This action cannot be undone.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">

                            <button
                                type="button"
                                disabled={isDeleting}
                                onClick={() => setDeletingEvent(null)}
                                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                disabled={isDeleting}
                                onClick={handleDelete}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isDeleting ? "Deleting..." : "Yes, Delete"}
                            </button>

                        </div>
                    </div>
                </div>
            )}

        </section>
    );
};

export default MyManageEvent;
