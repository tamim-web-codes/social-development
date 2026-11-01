"use client";

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

import { LockKeyhole, Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import LeafLogo from "@/components/navber";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { da } from "date-fns/locale";

export default function LoginPage() {



    const handleEmailLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const user = Object.fromEntries(formData.entries())
        const { data, error } = await authClient.signIn.email({
            email: user.email as string,
            password: user.password as string,

        })
        if (data) {

            toast.add({
                type: 'success',
                title: 'Login Successfuly',


            })
            redirect('/')
        }

        if (error) {
            toast.add({
                title: "Invalid password"
            })
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
                        Welcome back
                    </h1>
                    <p className="mt-1 text-center text-sm text-slate-500 dark:text-slate-400">
                        Log in to continue to the community.
                    </p>

                    <form autoComplete="off" onSubmit={handleEmailLogin} className="mt-7 space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                                Email address
                            </Label>
                            <div className="group relative">
                                <Mail className="absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-sky-700 transition-colors group-focus-within:text-sky-900 dark:text-sky-400 dark:group-focus-within:text-sky-300" />
                                <Input

                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    required

                                    className="h-12 rounded-xl border-slate-200 bg-slate-50/70 pl-11 text-sm shadow-none placeholder:text-slate-400 focus-visible:border-sky-500 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus-visible:border-sky-400 dark:focus-visible:bg-slate-800 dark:focus-visible:ring-sky-400/15"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                                Password
                            </Label>
                            <div className="group relative">
                                <LockKeyhole aria-hidden="true" className="absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-amber-700 transition-colors group-focus-within:text-amber-900 dark:text-amber-400 dark:group-focus-within:text-amber-300" />
                                <Input

                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="password"
                                    placeholder="Enter your password"
                                    required

                                    className="h-12 rounded-xl border-slate-200 bg-slate-50/70 pl-11 text-sm shadow-none placeholder:text-slate-400 focus-visible:border-amber-500 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-amber-500/10 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus-visible:border-amber-400 dark:focus-visible:bg-slate-800 dark:focus-visible:ring-amber-400/15"
                                />
                            </div>
                        </div>

                        <button
                            className="w-full rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-600 py-3 font-bold text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:from-emerald-800 hover:to-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"

                            type="submit"


                        > Login

                        </button>
                    </form>

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
                        Login with Google
                    </button>

                    <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="font-semibold text-emerald-700 hover:text-emerald-800 hover:underline dark:text-emerald-400 dark:hover:text-emerald-300"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};