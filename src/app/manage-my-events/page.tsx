import MyManageEvent from "@/components/my-manage-events";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";

const ManageMyEventContent = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    if (!user?.email) {
        return <div>Please login first.</div>;
    }

    const res = await fetch(
        `http://localhost:5000/manage-my-events/${encodeURIComponent(user.email)}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch events");
    }

    const result = await res.json();

    return <MyManageEvent result={result} />;
};

const ManageMyEvent = () => {
    return (
        <div className="mt-5">
            <Suspense
                fallback={
                    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
                        <div className="relative flex size-14 items-center justify-center">
                            <div className="absolute inset-0 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600 dark:border-emerald-950 dark:border-t-emerald-500" />
                            <span className="size-3 rounded-full bg-emerald-600 dark:bg-emerald-500" />
                        </div>

                        <div className="text-center">
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                                Loading your events...
                            </p>
                            <p className="mt-1 text-xs text-gray-400">
                                Please wait a moment
                            </p>
                        </div>
                    </div>
                }
            >
                <ManageMyEventContent />
            </Suspense>
        </div>
    );
};

export default ManageMyEvent;