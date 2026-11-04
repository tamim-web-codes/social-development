'use client';

import { authClient } from '@/lib/auth-client';
import { Heart } from 'lucide-react';
import React from 'react';
import { toast } from './ui/toast';
import { getTokenFromClient } from '@/lib/getTokenFromClient';

type EventType = {
    _id: string;
    title: string;
    email: string;
};

type JoindeEventsCardProps = {
    event: EventType;
};

const JoindeEventsCard = ({ event }: JoindeEventsCardProps) => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user) {
            toast.add({
                type: 'error',
                title: 'Please log in',
                description: 'You need to be logged in to join an event.',
            });
            return;
        }

        // No ...event spread, so event._id is not sent as the document _id
        const data = {
            userId: user.id,
            userEmail: user.email,
            image: user.image,
            eventId: event._id,
            eventTitle: event.title,
            eventEmail: event.email,
        };

        try {
            const token = await getTokenFromClient();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/joinde-events`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                },
            );

            const result = await res.json();
            console.log(result);

            if (res.ok) {
                toast.add({
                    type: 'success',
                    title: '🎉 You’re Part of the Event!',
                    description: 'You have successfully joined this event!',
                });
            } else {
                toast.add({
                    type: 'error',
                    title: '❌ Already Joined!',
                    description:
                        result?.message || 'You have already joined this event.',
                });
            }
        } catch (error) {
            console.error(error);
            toast.add({
                type: 'error',
                title: 'Something went wrong',
                description: 'Failed to connect to the server.',
            });
        }
    };

    // if (!session?.user) return null;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <button
                    type="submit"
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