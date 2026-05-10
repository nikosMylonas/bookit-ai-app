'use client';

import { deleteTripProfile } from '@/actions/tripActions';
import { Loader2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function DeleteTripProfileBtn() {
    const router = useRouter();
    const [errorState, setErrorState] = useState(true);
    const [errorTripProfile, setErrorTripProfile] = useState('');
    const [errorGeneric, setErrorGeneric] = useState('');
    const [isPending, setIsPending] = useState(false);

    const handleDelete = async () => {
        setIsPending(true);
        const deleteResult = await deleteTripProfile();

        if (
            deleteResult.error.errorState &&
            deleteResult.error.errorTripProfile
        ) {
            setIsPending(false);
            return setErrorTripProfile(deleteResult.error.errorTripProfile);
        } else if (
            deleteResult.error.errorState &&
            deleteResult.error.errorGeneric
        ) {
            setIsPending(false);
            return setErrorGeneric(deleteResult.error.errorGeneric);
        } else {
            setIsPending(false);
            return setErrorState(false);
        }
    };
    useEffect(() => {
        if (errorState && errorTripProfile) {
            toast.error(errorTripProfile);
        } else if (errorState && errorGeneric) {
            toast.error(errorGeneric);
        } else if (!errorState) {
            toast.success('Your Trip Profile has been deleted successfully!');
            router.push('/onboarding');
            router.refresh();
        }
    }, [errorTripProfile, errorGeneric, errorState, router]);
    return (
        <button
            className="mb-8 flex w-full items-center gap-x-4 justify-center rounded-md bg-destructive px-3 py-4 text-base font-semibold text-foreground hover:bg-destructive/80 hover:cursor-pointer disabled:cursor-not-allowed"
            onClick={handleDelete}
        >
            {isPending ? (
                <>
                    Dleting Trip...{' '}
                    <Loader2 className="w-6 h-6 text-background animate-spin" />
                </>
            ) : (
                <>
                    <div>Delete Trip Profile</div>
                    <Trash2 />
                </>
            )}
        </button>
    );
}
