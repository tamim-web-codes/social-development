import React from "react";

const Loading = () => {
    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-[#0a0a0a]">
            <div className="mx-auto max-w-7xl animate-pulse">

                {/* Header */}
                <div className="mb-10 text-center">
                    <div className="mx-auto mb-4 h-4 w-28 rounded-full bg-emerald-100 dark:bg-emerald-900/40" />
                    <div className="mx-auto mb-3 h-9 w-64 max-w-full rounded-lg bg-gray-200 dark:bg-gray-800" />
                    <div className="mx-auto h-4 w-80 max-w-full rounded-lg bg-gray-200 dark:bg-gray-800" />
                </div>

                {/* Search and Filter */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row">
                    <div className="h-12 flex-1 rounded-xl bg-gray-200 dark:bg-gray-800" />
                    <div className="h-12 w-full rounded-xl bg-gray-200 dark:bg-gray-800 sm:w-44" />
                </div>

                {/* Event Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-[#151515]"
                        >
                            {/* Image Skeleton */}
                            <div className="h-52 w-full bg-gray-200 dark:bg-gray-800" />

                            {/* Card Content */}
                            <div className="space-y-4 p-5">
                                <div className="h-3 w-24 rounded-full bg-emerald-100 dark:bg-emerald-900/40" />

                                <div className="h-6 w-3/4 rounded-lg bg-gray-200 dark:bg-gray-800" />

                                <div className="space-y-2">
                                    <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-800" />
                                    <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-gray-800" />
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="size-9 rounded-full bg-gray-200 dark:bg-gray-800" />
                                    <div className="h-3 w-28 rounded bg-gray-200 dark:bg-gray-800" />
                                </div>

                                <div className="h-11 w-full rounded-xl bg-emerald-100 dark:bg-emerald-900/40" />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Loading;