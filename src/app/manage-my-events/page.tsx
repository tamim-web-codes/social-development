import MyManageEvent from "@/components/my-manage-events";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ManageMyEvent = async () => {
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

    console.log(result);

    return (
        <div className="mt-5">
          
            <MyManageEvent result={result} />
          
        </div>
    );
};

export default ManageMyEvent;