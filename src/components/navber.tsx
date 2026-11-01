"use client";

import {
    CalendarDays,
    ChevronDown,
    Moon,
    Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"
import { FaArrowRightToBracket } from "react-icons/fa6";
import Link from "next/link";

import {
    PlusCircle,
    Settings,
    CircleCheck,
    LogOut,
} from "lucide-react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";


export default function LeafLogo() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 32 32"
            className="size-7 shrink-0"
        >
            <path
                d="M16 29c0-8.8-5.3-13.6-13.6-14.4C3 24 8.8 28.8 16 29z"
                fill="#22c55e"
            />
            <path
                d="M16 29c0-10 5-15.3 13.6-16.4C29 24 23 28.2 16 29z"
                fill="#15803d"
            />
        </svg>
    );
}

export function Navber() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch: theme is only known on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- canonical next-themes mounted pattern
    useEffect(() => setMounted(true), []);

    const isDark = mounted && theme === "dark";

    const { data: session } = authClient.useSession()
    const user = session?.user

    const handleSignOut = async () => {
        await authClient.signOut()
    }

    return (
        <>

            < header className="sticky top-0 z-50 w-full border-b border-border bg-background " >
                <nav className="relative flex h-16 items-center px-6">
                    <Link href="/">
                        <div className="flex items-center gap-2">
                            <LeafLogo />
                            <span className="text-lg font-bold tracking-tight text-foreground">
                                Events Platform
                            </span>
                        </div>
                    </Link>

                    <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 text-sm font-medium text-foreground">
                        <CalendarDays className="size-4" />
                        <span>Upcoming Events</span>
                    </div>

                    <div className="ml-auto flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            {isDark ? (
                                <Moon className="size-4 text-muted-foreground" />
                            ) : (
                                <Sun className="size-4 text-muted-foreground" />
                            )}
                            <Switch
                                size='default'
                                checked={isDark}
                                onCheckedChange={(checked) =>
                                    setTheme(checked ? "dark" : "light")
                                }
                                aria-label="Toggle theme"
                            />
                        </div>

                        <div className="flex items-center gap-1">

                            {user ? <>
                                <Popover>
                                    <PopoverTrigger
                                        render={
                                            <Avatar size="default" className="cursor-pointer">
                                                <AvatarImage
                                                    referrerPolicy="no-referrer"
                                                    src={user?.image as string}
                                                    alt="Profile"
                                                />
                                                <AvatarFallback>
                                                    {user?.name?.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                        }
                                    />

                                    <PopoverContent className="w-64 p-0" align="end">
                                        <PopoverHeader className="border-b p-3">
                                            <PopoverTitle className="text-sm">
                                                {user?.name}
                                            </PopoverTitle>

                                            <PopoverDescription className="text-xs">
                                                {user?.email}
                                            </PopoverDescription>
                                        </PopoverHeader>

                                        <div className="flex flex-col p-2">
                                            <Link
                                                href="/add-create-events"
                                                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted"
                                            >
                                                <PlusCircle className="h-4 w-4 text-emerald-500" />
                                                Create Event
                                            </Link>

                                            <Link
                                                href="/manage-events"
                                                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted"
                                            >
                                                <Settings className="h-4 w-4 text-indigo-500" />
                                                Manage Events
                                            </Link>

                                            <Link
                                                href="/joined-events"
                                                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted"
                                            >
                                                <CircleCheck className="h-4 w-4 text-emerald-500" />
                                                Joined Events
                                            </Link>

                                            <div className="my-1 border-t" />

                                            <button
                                                onClick={handleSignOut}
                                                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-red-500 hover:bg-red-50"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                Logout
                                            </button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </> : <>
                                <Link href='/login'>
                                    <Button className='py-2 px-6'>
                                        <FaArrowRightToBracket />
                                        Login
                                    </Button>
                                </Link>
                            </>}
                        </div>
                    </div>
                </nav>
            </header >
        </>
    );
}
