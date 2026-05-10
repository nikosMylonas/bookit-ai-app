'use client';

import { generateTripPlan } from '@/actions/tripActions';
import { TripProfileType } from '@/types/types';
import { Loader2, SquareArrowRightEnter } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function GeneratePlanBtn({
    btnText,
    profile,
}: {
    btnText: string;
    profile: TripProfileType;
}) {
    const router = useRouter();
    const [errorState, setErrorState] = useState(true);
    const [errorAIContent, setErrorAIContent] = useState('');
    const [errorMaxVersion, setErrorMaxVersion] = useState('');
    const [errorPlanCreated, setErrorPlanCreated] = useState('');
    const [errorGeneric, setErrorGeneric] = useState('');
    const [isPending, setIsPending] = useState(false);

    const handleGenerateTripPlan = async () => {
        setIsPending(true);
        const generateTripPlanResult = await generateTripPlan(profile);

        if (
            generateTripPlanResult.error.errorState &&
            generateTripPlanResult.error.errorAIContent
        ) {
            setIsPending(false);
            return setErrorAIContent(
                generateTripPlanResult.error.errorAIContent,
            );
        } else if (
            generateTripPlanResult.error.errorState &&
            generateTripPlanResult.error.errorMaxVersion
        ) {
            setIsPending(false);
            return setErrorMaxVersion(
                generateTripPlanResult.error.errorMaxVersion,
            );
        } else if (
            generateTripPlanResult.error.errorState &&
            generateTripPlanResult.error.errorPlanCreated
        ) {
            setIsPending(false);
            return setErrorPlanCreated(
                generateTripPlanResult.error.errorPlanCreated,
            );
        } else if (
            generateTripPlanResult.error.errorState &&
            generateTripPlanResult.error.errorGeneric
        ) {
            setIsPending(false);
            return setErrorGeneric(generateTripPlanResult.error.errorGeneric);
        } else {
            setIsPending(false);
            return setErrorState(false);
        }
    };

    useEffect(() => {
        if (errorState && errorAIContent) {
            toast.error(errorAIContent);
        } else if (errorState && errorMaxVersion) {
            toast.error(errorMaxVersion);
        } else if (errorState && errorPlanCreated) {
            toast.error(errorPlanCreated);
        } else if (errorState && errorGeneric) {
            toast.error(errorGeneric);
        } else if (!errorState) {
            toast.success('Your Trip Plan has been generated!');
            router.push('/plan');
            router.refresh();
        }
    }, [
        errorAIContent,
        errorMaxVersion,
        errorPlanCreated,
        errorGeneric,
        errorState,
        router,
    ]);

    return (
        <button
            className="flex w-full items-center gap-x-4 justify-center rounded-md bg-accent px-3 py-4 text-base font-semibold text-background hover:bg-accent/80 hover:cursor-pointer disabled:cursor-not-allowed"
            onClick={handleGenerateTripPlan}
        >
            {isPending ? (
                <>
                    Generating Plan...{' '}
                    <Loader2 className="w-6 h-6 text-background animate-spin" />
                </>
            ) : (
                <>
                    <div>{btnText}</div>
                    <SquareArrowRightEnter />
                </>
            )}
        </button>
    );
}
