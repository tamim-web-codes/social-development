import React from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

type Event = {
    _id: string;
    title: string;
    thumbnailUrl: string;
    type: string;
};

const CommunityInAction = async () => {
    let events: Event[] = [];

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/recent-upcoming-events`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch events");
        }

        const data = await res.json();
        events = Array.isArray(data) ? data.slice(0, 6) : [];
    } catch (error) {
        console.error("Gallery error:", error);
    }

    return (
        <section className="px-4 py-16 md:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">

                {/* Section Heading */}
                <div className="mb-12 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                        <Camera size={16} />
                        Our Community Gallery
                    </div>

                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
                        Community in{" "}
                        <span className="text-emerald-600">Action</span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 dark:text-gray-400 sm:text-base">
                        Explore the inspiring events happening in our
                        communities. Every event represents kindness,
                        teamwork, and a positive change.
                    </p>
                </div>

                {/* Gallery */}
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {events.map((event, index) => (
                            <div
                                key={event._id}
                                className={`group relative overflow-hidden rounded-2xl ${index === 0
                                        ? "sm:col-span-2 sm:row-span-2 min-h-[350px] sm:min-h-[500px]"
                                        : "min-h-[250px]"
                                    }`}
                            >
                                <Image
                                    src={event.thumbnailUrl}
                                    alt={event.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Image Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                {/* Image Text */}
                                <div className="absolute bottom-0 left-0 p-5">
                                    <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                                        {event.type}
                                    </span>

                                    <h3 className="mt-3 text-xl font-bold text-white">
                                        {event.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="py-10 text-center text-gray-500">
                        No gallery images available.
                    </p>
                )}
            </div>
        </section>
    );
};

export default CommunityInAction;



