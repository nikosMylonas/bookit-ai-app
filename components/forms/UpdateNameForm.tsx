'use client';

import { updateUserName } from '@/actions/authActions';
import { Loader2, UserPen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function UpdateNameForm({ name }: { name: string }) {
    const [newName, setNewName] = useState(name);
    const router = useRouter();

    const [state, formAction, isPending] = useActionState(updateUserName, null);

    const errorName = state?.error?.errorName;
    const errorGeneric = state?.error?.errorGeneric;

    useEffect(() => {
        if (state && !state.error.errorState) {
            toast.success('Name updated successfully!');
            router.push('/account');
            router.refresh();
        }
    }, [state, router]);

    return (
        <form
            action={formAction}
            className="flex flex-col gap-5 items-center justify-center"
        >
            <div className="flex flex-col gap-1.5 w-full md:w-sm">
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground w-full"
                >
                    Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder={`${newName}...`}
                    className="block rounded-md w-full bg-background px-2 py-1.5 placeholder:text-muted text-foreground outline-1 outline-white/10 focus:outline-indigo-500"
                />
            </div>
            {errorName && (
                <p className="text-destructive mb-2 text-center">{errorName}</p>
            )}
            <button
                type="submit"
                disabled={isPending}
                className="w-full md:w-sm flex items-center gap-x-4 justify-center rounded-md bg-accent mt-4 px-3 py-2.5 text-base font-semibold text-background hover:bg-accent/80 hover:cursor-pointer disabled:cursor-not-allowed"
            >
                {isPending ? (
                    <>
                        Updating Name...
                        <Loader2 className="w-6 h-6 text-background animate-spin" />
                    </>
                ) : (
                    <>
                        Update Name
                        <UserPen />
                    </>
                )}
            </button>
            {errorGeneric && (
                <p className="text-destructive my-2 text-center">
                    {errorGeneric}
                </p>
            )}
        </form>
    );
}
