'use client';

import { useActionState, useEffect, useState } from 'react';
import { loginUser } from '@/actions/authActions';
import { Loader2, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [state, formAction, isPending] = useActionState(loginUser, null);
    const router = useRouter();

    const errorValidation = state?.error?.errorValidation;
    const errorLogin = state?.error?.errorLogin;
    const errorUser = state?.error?.errorUser;
    const errorGeneric = state?.error?.errorGeneric;

    useEffect(() => {
        if (state && !state.error.errorState) {
            toast.success('User Signed In succesfully!');
            router.push('/onboarding');
            router.refresh();
        } else if (errorGeneric) {
            toast.error(errorGeneric);
        }
    }, [state, router, errorGeneric]);

    return (
        <form
            action={formAction}
            className="flex flex-col gap-5 items-center justify-center bg-background/50"
        >
            <div className="w-sm">
                <h1 className="mt-10 text-center text-2xl/9 font-semibold text-foreground">
                    Sign In to Your Account
                </h1>
            </div>
            {errorValidation && (
                <p className="text-destructive mb-2 text-center">
                    {errorValidation}
                </p>
            )}
            {errorLogin && (
                <p className="text-destructive mb-2 text-center">
                    {errorLogin}
                </p>
            )}
            {errorUser && (
                <p className="text-destructive mb-2 text-center">{errorUser}</p>
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
                    className="block rounded-md w-full bg-white/5 px-2 py-1.5 placeholder:text-muted text-foreground outline-1 outline-white/10  focus:outline-indigo-500"
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
                    className="block rounded-md w-full bg-white/5 px-2 py-1.5 placeholder:text-muted text-foreground outline-1 outline-white/10  focus:outline-indigo-500"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="flex w-full md:w-sm items-center justify-center gap-x-2 rounded-md bg-accent mt-4 px-3 py-2.5 text-base font-semibold text-background hover:bg-accent/80 hover:cursor-pointer disabled:cursor-not-allowed"
            >
                {isPending ? (
                    <>
                        Signing In...{' '}
                        <Loader2 className="w-6 h-6 text-background animate-spin" />
                    </>
                ) : (
                    <>
                        Sign In
                        <LogIn />
                    </>
                )}
            </button>
        </form>
    );
}
