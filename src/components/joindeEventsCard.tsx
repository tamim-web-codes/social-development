'use client'

import { authClient } from '@/lib/auth-client';
import { Heart } from 'lucide-react';
import React from 'react';
import { toast } from './ui/toast';
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
        try {
            const Data = {
                ...event,
                userId: user?.id,
                eventId: event._id,
                userEmail: user?.email,
                eventTitle: event.title,
                image: user?.image,
                eventEmail: event.email,
            };

            const res = await fetch('http://localhost:5000/joinde-events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Data),
            });

            const result = await res.json();

            if (res.ok) {
                toast.add({
                    type: 'success',
                    title: '🎉 You’re Part of the Event!',
                    description: 'You have successfully joined this event!',
                });
            } else {
                toast.add({
                    type: 'error',
                    title: '❌Already Joined!',
                    description: 'You have already joined this event.',
                });
            }

            console.log('Status:', res.status);
            console.log('Response:', result);

        } catch (error) {
            console.error('Join Event Error:', error);

            toast.add({
                type: 'error',
                title: '❌ Already Joined!',
                description: 'You have already joined this event.',
            });
        }
    }

    if (!session?.user) return null;
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