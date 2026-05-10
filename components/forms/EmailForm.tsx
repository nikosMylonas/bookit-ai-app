'use client';

import { emailPlan } from '@/actions/emailActions';
import { Loader2, Mail } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function EmailForm() {
    const [email, setEmail] = useState('');

    const [state, formAction, isPending] = useActionState(emailPlan, null);

    const errorEmail = state?.error.errorEmail;
    const errorGeneric = state?.error.errorGeneric;

    useEffect(() => {
        if (state && !state.error.errorState) {
            toast.success('Your plan has been emailed!');
            setTimeout(() => setEmail(''));
        } else if (state && state.error.errorGeneric) {
            toast.error(state.error.errorGeneric);
        }
    }, [state]);

    return (
        <form
            action={formAction}
            className="flex flex-col gap-5 items-center justify-center bg-background/50"
        >
            <div>
                <h1 className="mt-10 text-center text-2xl/9 font-semibold text-foreground">
                    Send Your Plan to an Email
                </h1>
            </div>

            <div className="w-full flex flex-col gap-1.5">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground"
                >
                    Email Address
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
            {errorEmail && (
                <p className="text-destructive mb-2 text-center">
                    {errorEmail}
                </p>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="flex w-full items-center justify-center gap-x-2 rounded-md bg-accent mt-4 px-3 py-2.5 text-base font-semibold text-background hover:bg-accent/80 hover:cursor-pointer disabled:cursor-not-allowed"
            >
                {isPending ? (
                    <>
                        Sending plan...{' '}
                        <Loader2 className="w-6 h-6 text-background animate-spin" />
                    </>
                ) : (
                    <>
                        Send Plan
                        <Mail />
                    </>
                )}
            </button>
        </form>
    );
}
