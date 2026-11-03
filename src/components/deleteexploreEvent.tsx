import { Trash2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';

type EventType = {
    _id: string;
};

type DeleteExplorepageProps = {
    event: EventType;
};

const DeleteExplorepage = ({ event }: DeleteExplorepageProps) => {
    const [openDelete, setOpenDelete] = useState(false);

    const handleDelete = async () => {

        const res = await fetch(`http://localhost:5000/manage-my-events/${event._id}`, {
            method: 'DELETE'
        })
        await res.json()
        redirect('/manage-my-events')
    }

    return (
        <div>
            <button
                type="button"
                onClick={() => setOpenDelete(true)}
                title="Delete Event"
                className="flex size-10 items-center justify-center rounded-xl border border-slate-200 text-red-500 transition hover:border-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:hover:bg-red-950"
            >
                <Trash2 size={16} />
            </button>
            {openDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">

                        <div className="flex items-center justify-center">
                            <div className="flex size-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950">
                                <Trash2 size={26} />
                            </div>
                        </div>

                        <h2 className="mt-4 text-center text-xl font-bold text-slate-900 dark:text-white">
                            Delete Event?
                        </h2>

                        <p className="mt-2 text-center text-sm text-slate-500">
                            Are you sure you want to delete this event? This action cannot be undone.
                        </p>

                        <div className="mt-6 flex justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => setOpenDelete(false)}
                                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={async () => {
                                    await handleDelete();
                                    setOpenDelete(false);
                                }}
                                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteExplorepage;