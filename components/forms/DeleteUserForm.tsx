'use client';

import { useActionState, useEffect, useState } from 'react';
import { deleteUser } from '@/actions/authActions';
import { Loader2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function DeleteUserForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [state, formAction, isPending] = useActionState(deleteUser, null);
    const router = useRouter();

    const errorValidation = state?.error?.errorValidation;
    const errorUser = state?.error?.errorUser;
    const errorCredentials = state?.error.errorCredentials;
    const errorUserDeleted = state?.error.errorUserDeleted;
    const errorGeneric = state?.error?.errorGeneric;

    useEffect(() => {
        if (state && errorGeneric) {
            toast.error(errorGeneric);
        }
    }, [state, router, errorGeneric]);

    return (
        <form
            action={formAction}
            className="flex flex-col gap-5 items-center justify-center"
        >
            <div>
                <h1 className="mt-10 text-center text-2xl/9 font-semibold text-foreground w-full">
                    Delete Your Account
                </h1>
                <p className="text-center text-foreground">
                    <span className="text-destructive">Warning!</span> All your
                    data will be deleted, including your trip profile and the
                    trip plans. In order to delete your account you need to
                    enter your account credentials.
                </p>
            </div>
            {errorValidation && (
                <p className="text-destructive mb-2 text-center">
                    {errorValidation}
                </p>
            )}
            {errorCredentials && (
                <p className="text-destructive mb-2 text-center">
                    {errorCredentials}
                </p>
            )}
            {errorUser && (
                <p className="text-destructive mb-2 text-center">{errorUser}</p>
            )}
            {errorUserDeleted && (
                <p className="text-destructive mb-2 text-center">
                    {errorUserDeleted}
                </p>
            )}

            <div className="flex flex-col gap-1.5 w-full md:w-sm">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground"
                >
                    Email address
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="john@my-company.com"
                    autoComplete="email"
                    className="block rounded-md w-full bg-background px-2 py-1.5 placeholder:text-muted text-foreground outline-1 outline-white/10  focus:outline-indigo-500"
                />
            </div>

            <div className="flex flex-col gap-1.5 w-full md:w-sm">
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-foreground"
                >
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your Password"
                    className="block rounded-md w-full bg-background px-2 py-1.5 placeholder:text-muted text-foreground outline-1 outline-white/10  focus:outline-indigo-500"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="flex w-full md:w-sm items-center justify-center gap-x-2 rounded-md bg-accent mt-4 px-3 py-2.5 text-base font-semibold text-background hover:bg-accent/80 hover:cursor-pointer disabled:cursor-not-allowed"
            >
                {isPending ? (
                    <>
                        Deleting...{' '}
                        <Loader2 className="w-6 h-6 text-background animate-spin" />
                    </>
                ) : (
                    <>
                        Delete User
                        <Trash2 />
                    </>
                )}
            </button>
        </form>
    );
}
