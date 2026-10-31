"use client";

import Link from "next/link";
import { Check, X } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BlobButton from "@/components/BlobButton";
import LeafLogo from "@/components/navber";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast"



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
                title: "Registration successful",
                description: "You can now log in with your new account.",
            });
            console.log("Registration successful:", data);
        } else {
            toast.add({
                title: "Registration failed",
                description: error?.message || "An error occurred during registration.",

            });
            console.log(error);
        }

    }

    return (
        <section className="flex flex-1 items-center justify-center px-6 py-15">
            <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-sm">
                <div className="flex justify-center ">
                    <LeafLogo />
                </div>
                <div className="flex justify-center">

                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Create an account
                    </h1>
                </div>
                <div className="flex justify-center">

                    <p className="mt-1 text-sm text-muted-foreground">
                        Join the community — it takes a minute.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your full name"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Photo URL</Label>
                        <Input
                            id="image"
                            name="image"
                            type="url"
                            placeholder="https://example.com/photo.jpg"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Choose a strong password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="space-y-1.5 pt-1" aria-live="polite">
                            {conditions.map(({ label, valid }) => (
                                <p
                                    key={label}
                                    className={`flex items-center gap-1.5 text-xs ${valid
                                        ? "font-medium text-green-600"
                                        : "text-red-500"
                                        }`}
                                >
                                    {valid ? (
                                        <Check className="size-3.5" />
                                    ) : (
                                        <X className="size-3.5" />
                                    )}
                                    {label}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <BlobButton className="py-3 font-bold text-xl" type="submit" >
                            Register
                        </BlobButton>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-primary hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </section>
    );
}
