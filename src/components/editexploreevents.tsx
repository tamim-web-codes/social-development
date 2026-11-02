
"use client";

import React, { useState } from "react";
import {
    Pencil,
    X,
    CalendarDays,
    MapPin,
    Image as ImageIcon,
    Type,
    FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "./ui/toast";
import { todo } from "node:test";

type EventData = {
    _id: string;
    title: string;
    type: string;
    thumbnailUrl: string;
    location: string;
    date: string;
    description: string;
};

const EditexploreEvents = ({ event }: { event: EventData }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const router = useRouter()
    const [eventData, setEventData] = useState({
        title: "",
        type: "",
        thumbnailUrl: "",
        location: "",
        date: "",
        description: "",
    });

    // Open dialog with existing event data
    const handleOpenEdit = () => {
        if (!event) {
            console.error("Event data is missing");
            return;
        }

        setEventData({
            title: event.title || "",
            type: event.type || "",
            thumbnailUrl: event.thumbnailUrl || "",
            location: event.location || "",
            date: event.date ? event.date.slice(0, 10) : "",
            description: event.description || "",

        });

        setOpenEdit(true);
    };
    // Edit function
    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch(`http://localhost:5000/manage-my-events/${event._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        });
        if (!res.ok) {
            throw new Error("Failed to update event");
        }

        const data = await res.json();

        if (data.modifiedCount > 0) {
            toast.add({
                type: "success",
                title: "Event updated successfully!",
            });

            setOpenEdit(false);
            router.refresh();
        } else {
            toast.add({
                type: "error",
                title: "No changes were made!",
            });
        }



    };
    const today = new Date().toLocaleDateString("en-CA", {
        timeZone: "Asia/Dhaka",
    });
    return (
        <div>
            {/* Edit Button */}
            <button
                type="button"
                title="Edit Event"
                onClick={handleOpenEdit}
                className="flex size-10 items-center justify-center rounded-xl border border-slate-200 text-blue-600 transition hover:border-blue-500 hover:bg-blue-50 dark:border-slate-700 dark:hover:bg-blue-950"
            >
                <Pencil size={16} />
            </button>

            {/* Edit Dialog */}
            {openEdit && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm">

                    <div className="my-auto w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">

                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-5 dark:border-slate-800 dark:bg-slate-800/50">

                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="flex size-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                                        <Pencil size={19} />
                                    </span>

                                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                                        Edit Event
                                    </h2>
                                </div>

                                <p className="mt-2 text-sm text-slate-500">
                                    Update your event information below.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setOpenEdit(false)}
                                className="flex size-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-700 dark:hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleEdit} className="space-y-5 p-6">

                            {/* Title */}
                            <div>
                                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    <Type size={16} />
                                    Event Title
                                </label>

                                <input
                                    type="text"
                                    required
                                    value={eventData.title}
                                    onChange={(e) =>
                                        setEventData({
                                            ...eventData,
                                            title: e.target.value,
                                        })
                                    }
                                    placeholder="Enter event title"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            {/* Type */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    Event Type
                                </label>

                                <select
                                    required
                                    value={eventData.type}
                                    onChange={(e) =>
                                        setEventData({
                                            ...eventData,
                                            type: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                >
                                    <option value="community-cleanup">Community Cleanup</option>
                                    <option value="clothing-distribution">Clothing Distribution</option>
                                    <option value="food-drive">Food Drive</option>
                                    <option value="volunteer">Volunteer Event</option>
                                </select>
                            </div>

                            {/* Image */}
                            <div>
                                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    <ImageIcon size={16} />
                                    Thumbnail Image URL
                                </label>

                                <input
                                    type="url"
                                    required
                                    value={eventData.thumbnailUrl}
                                    onChange={(e) =>
                                        setEventData({
                                            ...eventData,
                                            thumbnailUrl: e.target.value,
                                        })
                                    }
                                    placeholder="Enter image URL"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            {/* Location and Date */}
                            <div className="grid gap-4 sm:grid-cols-2">

                                <div>
                                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        <MapPin size={16} />
                                        Location
                                    </label>

                                    <input
                                        type="text"
                                        required
                                        value={eventData.location}
                                        onChange={(e) =>
                                            setEventData({
                                                ...eventData,
                                                location: e.target.value,
                                            })
                                        }
                                        placeholder="Enter location"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        <CalendarDays size={16} />
                                        Event Date
                                    </label>

                                    <input
                                        type="date"
                                        required
                                        min={today}
                                        value={eventData.date}
                                        onChange={(e) =>
                                            setEventData({
                                                ...eventData,
                                                date: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    <FileText size={16} />
                                    Description
                                </label>

                                <textarea
                                    required
                                    rows={4}
                                    value={eventData.description}
                                    onChange={(e) =>
                                        setEventData({
                                            ...eventData,
                                            description: e.target.value,
                                        })
                                    }
                                    placeholder="Describe your event..."
                                    className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">

                                <button
                                    type="button"
                                    onClick={() => setOpenEdit(false)}
                                    className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                                >
                                    <Pencil size={16} />
                                    Save Changes
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditexploreEvents;
