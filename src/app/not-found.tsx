import Link from 'next/link';
import { ArrowLeft, Compass, Search } from 'lucide-react';

const Notfound = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f6faf7] px-4">

            {/* Background effects */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-200/40 blur-3xl rounded-full" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-200/40 blur-3xl rounded-full" />

            <div className="relative w-full max-w-xl text-center">

                {/* Icon */}
                <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-3xl bg-white shadow-lg shadow-green-900/5 border border-green-100">
                    <Compass className="size-10 text-green-600" />
                </div>

                {/* 404 */}
                <h1 className="text-[110px] sm:text-[150px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-green-600 to-emerald-400">
                    404
                </h1>

                <h2 className="mt-5 text-2xl sm:text-3xl font-bold text-gray-900">
                    Oops! Page Not Found
                </h2>

                <p className="mx-auto mt-4 max-w-md text-sm sm:text-base leading-7 text-gray-500">
                    দুঃখিত! তুমি যে পেজটি খুঁজছো সেটি হয়তো সরানো হয়েছে অথবা এর অস্তিত্ব নেই।
                </p>

                {/* Buttons */}
                <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        href="/"
                        className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-green-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-600/20 transition-all hover:-translate-y-1 hover:bg-green-700"
                    >
                        <ArrowLeft size={18} />
                        Back to Home
                    </Link>

                    <Link
                        href="/explore-events"
                        className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 transition-all hover:-translate-y-1 hover:border-green-300 hover:text-green-600"
                    >
                        <Search size={18} />
                        Explore Events
                    </Link>
                </div>

                <p className="mt-12 text-xs text-gray-400">
                    ERROR CODE: 404 — PAGE NOT FOUND
                </p>
            </div>
        </div>
    );
};

export default Notfound;