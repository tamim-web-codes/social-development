'use client'

import { authClient } from '@/lib/auth-client';
import { Heart } from 'lucide-react';
import React from 'react';

const JoindeEventsCard = ({ event }) => {

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const Data = {
            userId: user?.id,
            eventId: event._id,
            userEmail: user?.email,
            eventTitle: event.title,
            image: user?.image,
            eventEmail: event.email,
            ...event
        }
        const res = await fetch(`http://localhost:5000/joinde-events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Data)
        })
        const result = await res.json();
        console.log(result);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <button
                    type='submit'
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-4 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
                >
                    <Heart size={18} />
                    Join This Event
                </button>
            </form>
        </div>
    );
};

export default JoindeEventsCard;