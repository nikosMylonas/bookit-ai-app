'use client';

import { useActionState, useEffect, useState } from 'react';
import { registerUser } from '@/actions/authActions';
import { Loader2, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function SignUpForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [state, formAction, isPending] = useActionState(registerUser, null);
    const router = useRouter();

    const errorName = state?.error?.errorName;
    const errorEmail = state?.error?.errorEmail;
    const errorUniqueEmail = state?.error?.errorUniqueEmail;
    const errorPassword = state?.error?.errorPassword;
    const errorConfirmPassword = state?.error?.errorConfirmPassword;
    const errorGeneric = state?.error?.errorGeneric;

    useEffect(() => {
        if (state && !state.error.errorState) {
            toast.success('User created successfully!');
            router.push('/auth/sign-in');
            router.refresh();
        }
    }, [state, router]);

    return (
        <form
            action={formAction}
            className="flex flex-col gap-5 items-center justify-center bg-background/50"
        >
            <div className="w-sm">
                <h1 className="mt-10 text-center text-2xl/9 font-semibold text-foreground">
                    Create New Account
                </h1>
            </div>

            <div className="flex flex-col gap-1.5 w-full md:w-sm">
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground"
                >
                    Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="John Doe"
                    autoComplete="name"
                    className="block rounded-md w-full bg-white/5 px-2 py-1.5 placeholder:text-muted text-foreground outline-1 outline-white/10 focus:outline-indigo-500"
                />
                {errorName && (
                    <p className="text-destructive mb-2 text-center">
                        {errorName}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-1.5 w-full md:w-sm">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-100"
                >
                    Email address
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    autoComplete="email"
                    placeholder="john@my-company.com"
                    className="block rounded-md w-full bg-white/5 px-2 py-1.5 placeholder:text-muted text-foreground outline-1 outline-white/10  focus:outline-indigo-500"
                />
            </div>
            {errorEmail && (
                <p className="text-destructive mb-2 text-center">
                    {errorEmail}
                </p>
            )}
            {errorUniqueEmail && (
                <p className="text-destructive mb-2 text-center w-5/6">
                    {errorUniqueEmail}
                </p>
            )}
            <div className="flex flex-col gap-1.5 w-full md:w-sm">
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-100"
                >
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your Password..."
                    className="block rounded-md w-full bg-white/5 px-2 py-1.5 placeholder:text-muted text-foreground outline-1 outline-white/10  focus:outline-indigo-500"
                />
            </div>
            {errorPassword && (
                <p className="text-destructive mb-2 text-center">
                    {errorPassword}
                </p>
            )}
            <div className="flex flex-col gap-1.5 w-full md:w-sm">
                <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-100"
                >
                    Confirm Password
                </label>
                <input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password..."
                    className="block rounded-md w-full bg-white/5 px-2 py-1.5 placeholder:text-muted text-foreground outline-1 outline-white/10  focus:outline-indigo-500"
                />
            </div>
            {errorConfirmPassword && (
                <p className="text-destructive mb-2 text-center">
                    {errorConfirmPassword}
                </p>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="flex w-full md:w-sm items-center gap-x-4 justify-center rounded-md bg-accent mt-4 px-3 py-2.5 text-base font-semibold text-background hover:bg-accent/80 hover:cursor-pointer disabled:cursor-not-allowed"
            >
                {isPending ? (
                    <>
                        Creating account...
                        <Loader2 className="w-6 h-6 text-background animate-spin" />
                    </>
                ) : (
                    <>
                        Create Account
                        <UserPlus />
                    </>
                )}
            </button>
            {errorGeneric && (
                <p className="text-destructive mt-2 mb-4 text-center">
                    {errorGeneric}
                </p>
            )}
        </form>
    );
}
