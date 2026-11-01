"use client";

import Link from "next/link";
import {
    Check,
    ImagePlus,
    LockKeyhole,
    Mail,
    UserRound,
    X,
} from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LeafLogo from "@/components/navber";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
    const [password, setPassword] = useState("");

    const conditions = [
        { label: "At least one uppercase letter (A-Z)", valid: /[A-Z]/.test(password) },
        { label: "At least one lowercase letter (a-z)", valid: /[a-z]/.test(password) },
        { label: "Minimum 6 characters length", valid: password.length >= 6 },
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (
            password.length < 6 ||
            !/[A-Z]/.test(password) ||
            !/[a-z]/.test(password)
        ) {
            toast.add({
                title: "Invalid password",
                description: "Password must contain uppercase, lowercase and at least 6 characters.",
            });
            return; // Signup বন্ধ করবে
        }
        const formData = new FormData(e.currentTarget)
        const user = Object.fromEntries(formData.entries())
        const { data, error } = await authClient.signUp.email({
            email: user.email as string,
            password: user.password as string,
            name: user.name as string,
            image: user.image as string,
        })
        if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
            toast.add({
                title: "Invalid password",
                description: "Password must contain uppercase, lowercase and at least 6 characters.",
            })
        };



        if (data) {
            toast.add({
                type: "success",

                title: "Registration successful",
                description: "You can now log in with your new account.",
            });
            redirect('/')
            console.log("Registration successful:", data);
        } else {
            toast.add({
                type: "error",
                title: "Registration failed",
                description: error?.message || "An error occurred during registration.",

            });
            console.log(error);
        }

    }
    const handlesigningoogle = async () => {
        const { data, error } = await authClient.signIn.social({
            provider: 'google'
        })
        if (data) {
            toast.add({
                title: 'Google SignIn success'
            })
        }
        if (error) {
            toast.add({
                title: 'error'
            })
        }


    }
    const { data: session } = authClient.useSession()
    const user = session?.user

    return (
        <section className="flex flex-1 items-center justify-center px-6 py-15">
            <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-emerald-100 bg-white p-7 shadow-[0_24px_70px_-35px_rgba(16,90,58,0.35)] dark:border-emerald-900/60 dark:bg-slate-900 sm:p-9">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-20 -right-16 size-48 rounded-full bg-emerald-100/70 blur-3xl dark:bg-emerald-900/30"
                />
                <div className="relative">
                    <div className="mb-5 flex justify-center">
                        <span className="flex size-14 items-center justify-center rounded-2xl bg-emerald-50 ring-1 ring-emerald-100 dark:bg-emerald-950 dark:ring-emerald-900">
                            <LeafLogo />
                        </span>
                    </div>
                    <h1 className="text-center text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                        Create an account
                    </h1>
                    <p className="mt-1 text-center text-sm text-slate-500 dark:text-slate-400">
                        Join the community — it takes a minute.
                    </p>
                    <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                                Your name
                            </Label>
                            <div className="group relative">
                                <UserRound aria-hidden="true" className="absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-emerald-700 transition-colors group-focus-within:text-emerald-900 dark:text-emerald-400 dark:group-focus-within:text-emerald-300" />
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    placeholder="Your Name?"
                                    className="h-12 rounded-xl border-slate-200 bg-slate-50/70 pl-11 text-sm shadow-none placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus-visible:border-emerald-400 dark:focus-visible:bg-slate-800 dark:focus-visible:ring-emerald-400/15"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                                Email address
                            </Label>
                            <div className="group relative">
                                <Mail aria-hidden="true" className="absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-sky-700 transition-colors group-focus-within:text-sky-900 dark:text-sky-400 dark:group-focus-within:text-sky-300" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="you@example.com"
                                    className="h-12 rounded-xl border-slate-200 bg-slate-50/70 pl-11 text-sm shadow-none placeholder:text-slate-400 focus-visible:border-sky-500 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus-visible:border-sky-400 dark:focus-visible:bg-slate-800 dark:focus-visible:ring-sky-400/15"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between gap-3">
                                <Label htmlFor="image" className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                                    Profile photo
                                </Label>
                                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                    OPTIONAL
                                </span>
                            </div>
                            <div className="group relative">
                                <ImagePlus aria-hidden="true" className="absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-violet-700 transition-colors group-focus-within:text-violet-900 dark:text-violet-400 dark:group-focus-within:text-violet-300" />
                                <Input
                                    id="image"
                                    name="image"
                                    type="url"
                                    placeholder="Paste an image link"
                                    className="h-12 rounded-xl border-slate-200 bg-slate-50/70 pl-11 text-sm shadow-none placeholder:text-slate-400 focus-visible:border-violet-500 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus-visible:border-violet-400 dark:focus-visible:bg-slate-800 dark:focus-visible:ring-violet-400/15"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                                Create password
                            </Label>
                            <div className="group relative">
                                <LockKeyhole aria-hidden="true" className="absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-amber-700 transition-colors group-focus-within:text-amber-900 dark:text-amber-400 dark:group-focus-within:text-amber-300" />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    placeholder="Choose a strong password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-12 rounded-xl border-slate-200 bg-slate-50/70 pl-11 text-sm shadow-none placeholder:text-slate-400 focus-visible:border-amber-500 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-amber-500/10 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus-visible:border-amber-400 dark:focus-visible:bg-slate-800 dark:focus-visible:ring-amber-400/15"
                                />
                            </div>
                            <div className="grid gap-1.5 rounded-xl bg-slate-50 px-3 py-2.5 dark:bg-slate-800/70" aria-live="polite">
                                {conditions.map(({ label, valid }) => (
                                    <p
                                        key={label}
                                        className={`flex items-center gap-2 text-xs ${valid
                                            ? "font-medium text-emerald-700 dark:text-emerald-400"
                                            : "text-slate-500 dark:text-slate-400"
                                            }`}
                                    >
                                        {valid ? (
                                            <Check className="size-3.5 rounded-full bg-emerald-100 p-0.5 dark:bg-emerald-900" />
                                        ) : (
                                            <X className="size-3.5 rounded-full bg-slate-200 p-0.5 dark:bg-slate-700" />
                                        )}
                                        {label}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="pt-1">
                            <button className="w-full rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-600 py-3 font-bold text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:from-emerald-800 hover:to-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700" type="submit">
                                Register
                            </button>
                        </div>
                    </form>

                </div>
                <div className="my-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
                    <span className="text-xs font-medium text-slate-400">OR CONTINUE WITH</span>
                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
                </div>

                <button

                    onClick={handlesigningoogle}

                    className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                >
                    <FcGoogle aria-hidden="true" className="size-5" />
                    Register with Google

                </button>
                <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-emerald-700 hover:text-emerald-800 hover:underline dark:text-emerald-400 dark:hover:text-emerald-300"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </section>
    );
}
