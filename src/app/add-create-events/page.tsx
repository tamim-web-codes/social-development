
'use client'
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import {
    ArrowRight,
    CalendarDays,
    ChevronDown,
    FileText,
    Gift,
    Image as ImageIcon,
    Leaf,
    MapPin,
    Type,
} from "lucide-react";


const fieldClassName =
    "h-10 w-full rounded-xl border border-slate-200 bg-white/80 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-emerald-400 dark:focus:ring-emerald-900/50";

function RequiredLabel({
    htmlFor,
    children,
}: {
    htmlFor: string;
    children: React.ReactNode;
}) {
    return (
        <label
            htmlFor={htmlFor}
            className="mb-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-200"
        >
            {children} <span className="text-red-500">*</span>
        </label>
    );
}

function FieldIcon({ children }: { children: React.ReactNode }) {
    return (
        <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 flex w-9 items-center justify-center border-r border-slate-100 text-slate-500 dark:border-slate-700 dark:text-slate-400"
        >
            {children}
        </span>
    );
}

export default function CreateEventPage() {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const eventData = {
            ...Object.fromEntries(formData.entries()),
            email: user?.email,
        };

        const res = await fetch('http://localhost:5000/add-create-events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        });

        const data = await res.json();

        toast.add({
            title: 'Event create successfully',
        });

        console.log(data);
    };
    const today = new Date().toLocaleDateString("en-CA", {
        timeZone: "Asia/Dhaka",
    });



    return (
        <main className="relative isolate flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top,#f0faf5_0%,#f8fcfa_52%,#ffffff_100%)] px-4 py-10 sm:px-6 dark:bg-none dark:bg-slate-950">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-20 bottom-10 -z-10 size-56 rounded-full bg-emerald-100/60 blur-3xl dark:bg-emerald-900/20"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 top-8 -z-10 size-64 rounded-full bg-green-100/60 blur-3xl dark:bg-green-900/20"
            />

            <section
                aria-labelledby="create-event-heading"
                className="w-full max-w-xl rounded-[1.75rem] border border-emerald-100/80 bg-white/90 p-6 shadow-[0_24px_70px_-35px_rgba(16,90,58,0.3)] backdrop-blur-sm dark:border-emerald-900/60 dark:bg-slate-900/95 sm:p-8"
            >
                <header className="mb-7 flex items-center gap-4">
                    <span
                        aria-hidden="true"
                        className="relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                    >
                        <Gift className="size-8" strokeWidth={2.5} />
                        <Leaf className="absolute -top-1 -right-1 size-4 fill-emerald-500 text-emerald-600" />
                    </span>
                    <div>
                        <h1
                            id="create-event-heading"
                            className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl"
                        >
                            Create Event
                        </h1>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                            Fill in the details to create your community event.
                        </p>
                    </div>
                </header>

                <form onSubmit={handlesubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <RequiredLabel htmlFor="event-title">
                                Event Title
                            </RequiredLabel>
                            <div className="relative">
                                <FieldIcon>
                                    <Type className="size-4" />
                                </FieldIcon>
                                <input
                                    id="event-title"
                                    name="title"
                                    type="text"
                                    required
                                    placeholder="e.g. Winter Clothes Distribution"
                                    className={`${fieldClassName} pl-11 pr-3`}
                                />
                            </div>
                        </div>

                        <div>
                            <RequiredLabel htmlFor="event-type">
                                Event Type
                            </RequiredLabel>
                            <div className="relative">
                                <FieldIcon>
                                    <Leaf className="size-4 fill-emerald-600 text-emerald-600 dark:fill-emerald-400 dark:text-emerald-400" />
                                </FieldIcon>
                                <select
                                    id="event-type"
                                    name="type"
                                    required
                                    defaultValue=""
                                    className={`${fieldClassName} appearance-none pl-11 pr-9 [color-scheme:light] dark:[color-scheme:dark]`}
                                >
                                    <option value="" disabled>
                                        Select Event Type
                                    </option>
                                    <option value="community-cleanup">
                                        Community Cleanup
                                    </option>
                                    <option value="clothing-distribution">
                                        Clothing Distribution
                                    </option>
                                    <option value="food-drive">Food Drive</option>
                                    <option value="volunteer">Volunteer Event</option>
                                </select>
                                <ChevronDown
                                    aria-hidden="true"
                                    className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-slate-600 dark:text-slate-400"
                                />
                            </div>
                        </div>

                        <div>
                            <RequiredLabel htmlFor="thumbnail-url">
                                Thumbnail Image URL
                            </RequiredLabel>
                            <div className="relative">
                                <FieldIcon>
                                    <ImageIcon className="size-4" />
                                </FieldIcon>
                                <input
                                    id="thumbnail-url"
                                    name="thumbnailUrl"
                                    type="url"
                                    required
                                    placeholder="https://example.com/image.jpg"
                                    className={`${fieldClassName} pl-11 pr-3`}
                                />
                            </div>
                        </div>

                        <div>
                            <RequiredLabel htmlFor="event-location">
                                Location
                            </RequiredLabel>
                            <div className="relative">
                                <FieldIcon>
                                    <MapPin className="size-4 fill-slate-500 text-slate-500 dark:fill-slate-400 dark:text-slate-400" />
                                </FieldIcon>
                                <input
                                    id="event-location"
                                    name="location"
                                    type="text"
                                    required
                                    placeholder="e.g. Mirpur 10, Dhaka"
                                    className={`${fieldClassName} pl-11 pr-3`}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <RequiredLabel htmlFor="event-date">
                            Event Date
                        </RequiredLabel>
                        <div className="relative">
                            <FieldIcon>
                                <CalendarDays className="size-4" />
                            </FieldIcon>
                            <input
                                id="event-date"
                                name="date"
                                type="date"
                                required
                                min={today}
                                className={`${fieldClassName} px-11 [color-scheme:light] dark:[color-scheme:dark]`}
                            />
                            <CalendarDays
                                aria-hidden="true"
                                className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-slate-500 dark:text-slate-400"
                            />
                        </div>
                    </div>

                    <div>
                        <RequiredLabel htmlFor="event-description">
                            Description
                        </RequiredLabel>
                        <div className="relative">
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute top-0 left-0 flex h-10 w-9 items-center justify-center border-r border-slate-100 text-slate-500 dark:border-slate-700 dark:text-slate-400"
                            >
                                <FileText className="size-4" />
                            </span>
                            <textarea
                                id="event-description"
                                name="description"
                                required
                                rows={3}
                                placeholder="Describe your event..."
                                className={`${fieldClassName} min-h-14 resize-y py-2.5 pl-11 pr-3`}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-600 px-4 text-sm font-bold text-white shadow-md shadow-emerald-900/15 transition hover:from-emerald-800 hover:to-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                    >
                        <CalendarDays className="size-4" />
                        Create Event
                        <ArrowRight className="size-4" />
                    </button>
                </form>
            </section>
        </main>
    );
}