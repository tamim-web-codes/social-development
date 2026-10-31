"use client";

import {
    Bell,
    CalendarDays,
    ChevronDown,
    Moon,
    Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";

function LeafLogo() {
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

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background ">
            <nav className="relative flex h-16 items-center px-6">
                <div className="flex items-center gap-2">
                    <LeafLogo />
                    <span className="text-lg font-bold tracking-tight text-foreground">
                        Events Platform
                    </span>
                </div>

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
                            size="sm"
                            checked={isDark}
                            onCheckedChange={(checked) =>
                                setTheme(checked ? "dark" : "light")
                            }
                            aria-label="Toggle theme"
                        />
                    </div>

                    <button
                        type="button"
                        aria-label="Notifications"
                        className="relative p-1 text-foreground transition-colors hover:text-primary"
                    >
                        <Bell className="size-5" />
                        <span className="absolute top-0.5 right-0.5 size-2 rounded-full bg-red-500" />
                    </button>

                    <div className="flex items-center gap-1">
                        <Avatar size="default">
                            <AvatarImage
                                src="https://i.pravatar.cc/64?img=12"
                                alt="Profile"
                            />
                            <AvatarFallback>CC</AvatarFallback>
                        </Avatar>
                        <ChevronDown className="size-4 text-muted-foreground" />
                    </div>
                </div>
            </nav>
        </header>
    );
}
