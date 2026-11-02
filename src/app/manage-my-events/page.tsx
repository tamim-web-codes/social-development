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
        `http://localhost:5000/manage-my-events/${user.email}`,
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
            <Suspense fallback={<p>Loading your events...</p>}>
                <ManageMyEventContent />
            </Suspense>
        </div>
    );
};

export default ManageMyEvent;