
import React from "react";
import Link from "next/link";
import {
    Heart,
    MapPin,
    Mail,
    Phone,
} from "lucide-react";

import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaXTwitter,
} from "react-icons/fa6";

import LeafLogo from "./navber";

const Footer = () => {
    return (
        <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-[#101D16]">
            <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 md:px-8">

                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <Link href="/" className="inline-flex items-center gap-3">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-green-50 dark:bg-green-900/30">
                                <LeafLogo />
                            </div>

                            <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                                Community<span className="text-green-600">Connect</span>
                            </span>
                        </Link>

                        <p className="mt-5 max-w-xs text-sm leading-7 text-gray-500 dark:text-gray-400">
                            Bringing people together through meaningful events,
                            community activities, and social initiatives.
                            Together, we can make a difference.
                        </p>

                        {/* Social Icons */}
                        <div className="mt-6 flex items-center gap-3">
                            {[FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter].map(
                                (Icon, index) => (
                                    <div
                                        key={index}
                                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:border-green-600 hover:bg-green-600 hover:text-white dark:border-gray-700 dark:text-gray-400"
                                    >
                                        <Icon size={18} />
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-6 text-base font-bold text-gray-900 dark:text-white">
                            Quick Links
                        </h3>

                        <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                            <li>
                                <Link href="#top" className="transition hover:text-green-600">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/explore-events" className="transition hover:text-green-600">
                                    Upcoming Events
                                </Link>
                            </li>
                            <li>
                                <Link href="/add-create-events" className="transition hover:text-green-600">
                                    Create Event
                                </Link>
                            </li>
                            <li>
                                <Link href="/joined-events" className="transition hover:text-green-600">
                                    Joined Events
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Explore Events */}
                    <div>
                        <h3 className="mb-6 text-base font-bold text-gray-900 dark:text-white">
                            Explore Events
                        </h3>

                        <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                            <li>Community Service</li>
                            <li>Environmental Care</li>
                            <li>Education & Learning</li>
                            <li>Health & Wellness</li>
                            <li>Social Awareness</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-6 text-base font-bold text-gray-900 dark:text-white">
                            Get in Touch
                        </h3>

                        <ul className="space-y-5 text-sm text-gray-500 dark:text-gray-400">
                            <li className="flex items-start gap-3">
                                <MapPin size={19} className="mt-0.5 shrink-0 text-green-600" />
                                <span>Dhaka, Bangladesh</span>
                            </li>

                            <li className="flex items-center gap-3">
                                <Mail size={19} className="shrink-0 text-green-600" />
                                <span>hello@communityconnect.com</span>
                            </li>

                            <li className="flex items-center gap-3">
                                <Phone size={19} className="shrink-0 text-green-600" />
                                <span>+880 1234-567890</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-7 text-center dark:border-gray-800 sm:flex-row sm:text-left">

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        © 2026 CommunityConnect. All rights reserved.
                    </p>

                    <p className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                        Made with
                        <Heart size={15} className="fill-red-500 text-red-500" />
                        for a better community
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
