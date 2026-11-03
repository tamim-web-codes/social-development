'use client'

import { authClient } from '@/lib/auth-client';
import { Heart } from 'lucide-react';
import React from 'react';
import { toast } from './ui/toast';

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
        if (res.ok) {
            toast.add({
                type: 'success',
                title: '🎉 You’re Part of the Event!',
                description: 'You have successfully joined this event. Thank you for being part of the community!',
            });
        } else if (result.message === 'Already joined') {
            toast.add({
                type: 'warning',
                title: 'Already Joined! 👋',
                description: 'You have already joined this event. We’re excited to have you as part of the community!',
            });
        } else {
            toast.add({
                type: 'error',
                title: '❌ Unable to Join Event',
                description: 'Something went wrong. Please try again later.',
            });
        }
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