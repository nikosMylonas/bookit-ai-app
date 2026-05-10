'use client';

import { updateUserPassword } from '@/actions/authActions';
import { Loader2, UserPen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function UpdatePasswordForm() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const router = useRouter();

    const [state, formAction, isPending] = useActionState(
        updateUserPassword,
        null,
    );

    const errorCurrentPassword = state?.error?.errorCurrentPassword;
    const errorNewPassword = state?.error?.errorNewPassword;
    const errorConfirmNewPassword = state?.error?.errorConfirmNewPassword;
    const errorUser = state?.error.errorUser;
    const errorCompareCurrentPassword =
        state?.error?.errorCompareCurrentPassword;
    const errorGeneric = state?.error?.errorGeneric;

    useEffect(() => {
        if (state && !state.error.errorState) {
            toast.success('Password updated successfully!');
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
                    htmlFor="current-password"
                    className="block text-sm font-medium text-gray-100"
                >
                    Current Password
                </label>
                <input
                    id="current-password"
                    name="currentPassword"
                    type="password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Your Current Password..."
                    className="block rounded-md w-full bg-background px-2 py-1.5 placeholder:text-muted text-foreground outline-1 outline-white/10  focus:outline-indigo-500"
                />
            </div>
            {errorCurrentPassword && (
                <p className="text-destructive mb-2 text-center">
                    {errorCurrentPassword}
                </p>
            )}
            {errorCompareCurrentPassword && (
                <p className="text-destructive mb-2 text-center">
                    {errorCompareCurrentPassword}
                </p>
            )}
            <div className="flex flex-col gap-1.5 w-full md:w-sm">
                <label
                    htmlFor="new-password"
                    className="block text-sm font-medium text-gray-100"
                >
                    New Password
                </label>
                <input
                    id="new-password"
                    name="newPassword"
                    type="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Your New Password..."
                    className="block rounded-md w-full bg-background px-2 py-1.5 placeholder:text-muted text-foreground outline-1 outline-white/10  focus:outline-indigo-500"
                />
            </div>
            {errorNewPassword && (
                <p className="text-destructive mb-2 text-center">
                    {errorNewPassword}
                </p>
            )}
            <div className="flex flex-col gap-1.5 w-full md:w-sm">
                <label
                    htmlFor="confirm-new-password"
                    className="block text-sm font-medium text-gray-100"
                >
                    Confirm New Password
                </label>
                <input
                    id="confirm-new-password"
                    name="confirmNewPassword"
                    type="password"
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Confirm New Password..."
                    className="block rounded-md w-full bg-background px-2 py-1.5 placeholder:text-muted text-foreground outline-1 outline-white/10  focus:outline-indigo-500"
                />
            </div>
            {errorConfirmNewPassword && (
                <p className="text-destructive mb-2 text-center">
                    {errorConfirmNewPassword}
                </p>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="flex w-full md:w-sm items-center gap-x-4 justify-center rounded-md bg-accent mt-4 px-3 py-2.5 text-base font-semibold text-background hover:bg-accent/80 hover:cursor-pointer disabled:cursor-not-allowed"
            >
                {isPending ? (
                    <>
                        Updating Password...
                        <Loader2 className="w-6 h-6 text-background animate-spin" />
                    </>
                ) : (
                    <>
                        Update Password
                        <UserPen />
                    </>
                )}
            </button>
            {errorUser && (
                <p className="text-destructive my-2 text-center">{errorUser}</p>
            )}
            {errorGeneric && (
                <p className="text-destructive my-2 text-center">
                    {errorGeneric}
                </p>
            )}
        </form>
    );
}
