"use client";

import {
    CalendarDays,
    Menu,
    Moon,
    Sun,
    PlusCircle,
    Settings,
    CircleCheck,
    LogOut,
    X,
    UserRound,
} from "lucide-react";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";

import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import { Switch } from "@/components/ui/switch";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { FaArrowRightToBracket } from "react-icons/fa6";

export default function LeafLogo() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 32 32"
            className="size-8 shrink-0"
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
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    const isDark = mounted && theme === "dark";

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        await authClient.signOut();
        setMenuOpen(false);
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/90 shadow-sm backdrop-blur-xl">
            <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link
                    href="/"
                    onClick={closeMenu}
                    className="flex shrink-0 items-center gap-2.5"
                >
                    <div className="flex size-11 items-center justify-center rounded-xl bg-green-50 dark:bg-green-900/30">
                        <LeafLogo />
                    </div>

                    <span className="text-base font-extrabold tracking-tight text-foreground sm:text-lg">
                        Events <span className="text-green-600">Platform</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-2 md:flex">
                    <Link
                        href="/explore-events"
                        className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-muted-foreground transition hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-900/30 dark:hover:text-green-400"
                    >
                        <CalendarDays className="size-4" />
                        Upcoming Events
                    </Link>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3">

                    {/* Theme Toggle */}
                    <div className="flex items-center gap-2 rounded-full border border-border px-3 py-2">
                        {isDark ? (
                            <Moon className="size-4 text-muted-foreground" />
                        ) : (
                            <Sun className="size-4 text-amber-500" />
                        )}

                        <Switch
                            size="default"
                            checked={isDark}
                            onCheckedChange={(checked) =>
                                setTheme(checked ? "dark" : "light")
                            }
                            aria-label="Toggle theme"
                            disabled={!mounted}
                        />
                    </div>

                    {/* Desktop User */}
                    <div className="hidden md:block">
                        {user ? (
                            <Popover>
                                <PopoverTrigger
                                    render={
                                        <Avatar className="size-10 cursor-pointer border-2 border-green-500 transition hover:ring-4 hover:ring-green-500/15">
                                            <AvatarImage
                                                referrerPolicy="no-referrer"
                                                src={user.image || ""}
                                                alt="Profile"
                                            />
                                            <AvatarFallback>
                                                {user.name?.charAt(0)?.toUpperCase() || "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                    }
                                />

                                <PopoverContent
                                    className="w-64 rounded-xl p-0"
                                    align="end"
                                >
                                    <PopoverHeader className="border-b p-4">
                                        <PopoverTitle className="text-sm font-bold">
                                            {user.name}
                                        </PopoverTitle>

                                        <PopoverDescription className="text-xs">
                                            {user.email}
                                        </PopoverDescription>
                                    </PopoverHeader>

                                    <div className="flex flex-col p-2">
                                        <Link
                                            href="/add-create-events"
                                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition hover:bg-muted"
                                        >
                                            <PlusCircle className="size-4 text-emerald-500" />
                                            Create Event
                                        </Link>

                                        <Link
                                            href="/manage-my-events"
                                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition hover:bg-muted"
                                        >
                                            <Settings className="size-4 text-indigo-500" />
                                            Manage Events
                                        </Link>

                                        <Link
                                            href="/joined-events"
                                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition hover:bg-muted"
                                        >
                                            <CircleCheck className="size-4 text-emerald-500" />
                                            Joined Events
                                        </Link>

                                        <div className="my-1 border-t" />

                                        <button
                                            onClick={handleSignOut}
                                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                                        >
                                            <LogOut className="size-4" />
                                            Logout
                                        </button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        ) : (
                            <Link href="/login">
                                <Button className="gap-2 rounded-xl bg-green-600 px-5 font-semibold text-white hover:bg-green-700">
                                    <FaArrowRightToBracket />
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        className="flex size-10 items-center justify-center rounded-xl border border-border transition hover:bg-muted md:hidden"
                    >
                        {menuOpen ? (
                            <X className="size-5" />
                        ) : (
                            <Menu className="size-5" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`overflow-hidden border-t border-border bg-background transition-all duration-300 md:hidden ${menuOpen
                    ? "max-h-[600px] opacity-100"
                    : "max-h-0 border-transparent opacity-0"
                    }`}
            >
                <div className="mx-auto max-w-7xl space-y-2 px-4 py-4 sm:px-6">

                    {/* Upcoming Events */}
                    <Link
                        href="/explore-events"
                        onClick={closeMenu}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-900/30"
                    >
                        <CalendarDays className="size-5 text-green-600" />
                        Upcoming Events
                    </Link>

                    {user ? (
                        <>
                            {/* Mobile Profile */}
                            <div className="my-3 flex items-center gap-3 rounded-xl bg-muted/50 p-3">
                                <Avatar className="size-11 border-2 border-green-500">
                                    <AvatarImage
                                        referrerPolicy="no-referrer"
                                        src={user.image || ""}
                                        alt="Profile"
                                    />
                                    <AvatarFallback>
                                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-bold text-foreground">
                                        {user.name}
                                    </p>
                                    <p className="truncate text-xs text-muted-foreground">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            <Link
                                href="/add-create-events"
                                onClick={closeMenu}
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition hover:bg-muted"
                            >
                                <PlusCircle className="size-5 text-emerald-500" />
                                Create Event
                            </Link>

                            <Link
                                href="/manage-my-events"
                                onClick={closeMenu}
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition hover:bg-muted"
                            >
                                <Settings className="size-5 text-indigo-500" />
                                Manage Events
                            </Link>

                            <Link
                                href="/joined-events"
                                onClick={closeMenu}
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition hover:bg-muted"
                            >
                                <CircleCheck className="size-5 text-emerald-500" />
                                Joined Events
                            </Link>

                            <div className="border-t border-border pt-2">
                                <button
                                    onClick={handleSignOut}
                                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                                >
                                    <LogOut className="size-5" />
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            onClick={closeMenu}
                            className="block pt-2"
                        >
                            <Button className="h-11 w-full gap-2 rounded-xl bg-green-600 font-semibold text-white hover:bg-green-700">
                                <FaArrowRightToBracket />
                                Login to Your Account
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
