'use client';

import { createTripProfile } from '@/actions/tripActions';
import { onboardingOptions } from '@/data-static/data-provider';
import { TripProfileType } from '@/types/types';
import { ArrowDownToLine, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function TripProfileForm({
    tripProfile,
}: {
    tripProfile: TripProfileType;
}) {
    const today = new Date().toISOString().split('T')[0];
    const [startLocation, setStartLocation] = useState(
        tripProfile?.location || '',
    );
    const [destination, setDestination] = useState(
        tripProfile?.destination || '',
    );
    const [fromDate, setFromDate] = useState(tripProfile?.fromDate || today);
    const [toDate, setToDate] = useState(tripProfile?.toDate || today);
    const [persons, setPersons] = useState(
        tripProfile?.numberPersons.toString() || '1',
    );
    const [kids, setKids] = useState(tripProfile?.numberKids.toString() || '0');
    const [goal, setGoal] = useState(tripProfile?.goal || 'vacations');
    const [budget, setBudget] = useState(tripProfile?.budget || 'low');
    const [primaryTicket, setPrimaryTicket] = useState(
        tripProfile?.primaryTicket || 'flight',
    );
    const [accommodation, setAccommodation] = useState(
        tripProfile?.accommodationType || 'hotel',
    );
    const [insurance, setInsurance] = useState(
        tripProfile?.insurance || 'none',
    );
    const [comments, setComments] = useState(tripProfile?.comments || '');

    // const isPending = false;
    const [state, formAction, isPending] = useActionState(
        createTripProfile,
        null,
    );
    const router = useRouter();

    const errorStartLocation = state?.error.errorStartLocation;
    const errorDestination = state?.error.errorDestination;
    const errorFromDate = state?.error.errorFromDate;
    const errorToDate = state?.error.errorToDate;
    const errorPersons = state?.error.errorPersons;
    const errorKids = state?.error.errorKids;
    const errorGoal = state?.error.errorGoal;
    const errorBudget = state?.error.errorBudget;
    const errorPrimaryTicket = state?.error.errorPrimaryTicket;
    const errorAccommodation = state?.error.errorAccommodation;
    const errorInsurance = state?.error.errorInsurance;
    const errorComments = state?.error.errorComments;
    const errorValidFromDate = state?.error.errorValidFromDate;
    const errorValidToDate = state?.error.errorValidToDate;
    const errorGeneric = state?.error?.errorGeneric;

    useEffect(() => {
        if (state && !state.error.errorState) {
            toast.success('Trip Profile created successfully!');
            router.push('/profile');
            router.refresh();
        }
    }, [state, router]);

    return (
        <form action={formAction}>
            <div className="space-y-4">
                <div className="input-item">
                    <label
                        htmlFor="start-location"
                        className="block text-sm font-medium text-foreground"
                    >
                        Where your trip begins?
                    </label>
                    <input
                        id="start-location"
                        name="startLocation"
                        type="text"
                        value={startLocation}
                        onChange={(e) => setStartLocation(e.target.value)}
                        placeholder="Your Location..."
                        autoComplete="startLocation"
                        className="placeholder:text-muted"
                    />
                    {errorStartLocation && (
                        <p className="text-destructive text-sm mb-2 text-center">
                            {errorStartLocation}
                        </p>
                    )}
                </div>
                <div className="input-item">
                    <label
                        htmlFor="destination"
                        className="block text-sm font-medium text-foreground"
                    >
                        Your Destination
                    </label>
                    <input
                        id="destination"
                        name="destination"
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="Your Destination..."
                        autoComplete="destination"
                        className="placeholder:text-muted"
                    />
                    {errorDestination && (
                        <p className="text-destructive text-sm mb-2 text-center">
                            {errorDestination}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-x-2">
                    <div className="input-item">
                        <label
                            htmlFor="from-date"
                            className="block text-sm font-medium text-foreground"
                        >
                            From
                        </label>
                        <input
                            id="from-date"
                            name="fromDate"
                            type="date"
                            onChange={(e) => setFromDate(e.target.value)}
                            value={fromDate}
                        />
                        {errorFromDate && (
                            <p className="text-destructive text-sm mb-2 text-center">
                                {errorFromDate}
                            </p>
                        )}
                        {errorValidFromDate && (
                            <p className="text-destructive text-sm mb-2 text-center">
                                {errorValidFromDate}
                            </p>
                        )}
                    </div>
                    <div className="input-item">
                        <label
                            htmlFor="to-date"
                            className="block text-sm font-medium text-foreground"
                        >
                            To
                        </label>
                        <input
                            id="to-date"
                            name="toDate"
                            type="date"
                            onChange={(e) => setToDate(e.target.value)}
                            value={toDate}
                        />
                        {errorToDate && (
                            <p className="text-destructive text-sm mb-2 text-center">
                                {errorToDate}
                            </p>
                        )}
                        {errorValidToDate && (
                            <p className="text-destructive text-sm mb-2 text-center">
                                {errorValidToDate}
                            </p>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-x-2">
                    <div className="input-item">
                        <label
                            htmlFor="persons"
                            className="block text-sm font-medium text-foreground"
                        >
                            Number of Persons
                        </label>
                        <select
                            id="persons"
                            name="persons"
                            value={persons}
                            onChange={(e) => setPersons(e.target.value)}
                        >
                            {onboardingOptions.numberPersonsOptions.map(
                                (person, idx) => (
                                    <option value={person.value} key={idx}>
                                        {person.label}
                                    </option>
                                ),
                            )}
                        </select>
                        {errorPersons && (
                            <p className="text-destructive text-sm mb-2 text-center">
                                {errorPersons}
                            </p>
                        )}
                    </div>
                    <div className="input-item">
                        <label
                            htmlFor="kids"
                            className="block text-sm font-medium text-foreground"
                        >
                            Number of Children
                        </label>
                        <select
                            id="kids"
                            name="kids"
                            value={kids}
                            onChange={(e) => setKids(e.target.value)}
                        >
                            {onboardingOptions.numberKidsOptions.map(
                                (kid, idx) => (
                                    <option value={kid.value} key={idx}>
                                        {kid.label}
                                    </option>
                                ),
                            )}
                        </select>
                        {errorKids && (
                            <p className="text-destructive text-sm mb-2 text-center">
                                {errorKids}
                            </p>
                        )}
                    </div>
                </div>

                <div className="input-item">
                    <label
                        htmlFor="goal"
                        className="block text-sm font-medium text-foreground"
                    >
                        What&apos;s your trip goal?
                    </label>
                    <select
                        id="goal"
                        name="goal"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                    >
                        {onboardingOptions.goalOptions.map((goal, idx) => (
                            <option value={goal.value} key={idx}>
                                {goal.label}
                            </option>
                        ))}
                    </select>
                    {errorGoal && (
                        <p className="text-destructive text-sm mb-2 text-center">
                            {errorGoal}
                        </p>
                    )}
                </div>

                <div className="input-item">
                    <label
                        htmlFor="budget"
                        className="block text-sm font-medium text-foreground"
                    >
                        What&apos;s your trip budget?
                    </label>
                    <select
                        id="budget"
                        name="budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                    >
                        {onboardingOptions.budgetOptions.map((budget, idx) => (
                            <option value={budget.value} key={idx}>
                                {budget.label}
                            </option>
                        ))}
                    </select>
                    {errorBudget && (
                        <p className="text-destructive text-sm mb-2 text-center">
                            {errorBudget}
                        </p>
                    )}
                </div>

                <div className="input-item">
                    <label
                        htmlFor="primary-ticket"
                        className="block text-sm font-medium text-foreground"
                    >
                        What&apos;s your intended way to travel?
                    </label>
                    <select
                        id="primary-ticket"
                        name="primaryTicket"
                        value={primaryTicket}
                        onChange={(e) => setPrimaryTicket(e.target.value)}
                    >
                        {onboardingOptions.primaryTicketsOptions.map(
                            (ticket, idx) => (
                                <option value={ticket.value} key={idx}>
                                    {ticket.label}
                                </option>
                            ),
                        )}
                    </select>
                    {errorPrimaryTicket && (
                        <p className="text-destructive text-sm mb-2 text-center">
                            {errorPrimaryTicket}
                        </p>
                    )}
                </div>

                <div className="input-item">
                    <label
                        htmlFor="accommodation"
                        className="block text-sm font-medium text-foreground"
                    >
                        What type of accommodation you want to book?
                    </label>
                    <select
                        id="accommodation"
                        name="accommodation"
                        value={accommodation}
                        onChange={(e) => setAccommodation(e.target.value)}
                    >
                        {onboardingOptions.accommodationOptions.map(
                            (accommodation, idx) => (
                                <option value={accommodation.value} key={idx}>
                                    {accommodation.label}
                                </option>
                            ),
                        )}
                    </select>
                    {errorAccommodation && (
                        <p className="text-destructive text-sm mb-2 text-center">
                            {errorAccommodation}
                        </p>
                    )}
                </div>

                <div className="input-item">
                    <label
                        htmlFor="insurance"
                        className="block text-sm font-medium text-foreground"
                    >
                        Do you want to buy an insurance plan for this trip?
                    </label>
                    <select
                        id="insurance"
                        name="insurance"
                        value={insurance}
                        onChange={(e) => setInsurance(e.target.value)}
                    >
                        {onboardingOptions.insuranceOptions.map(
                            (insurance, idx) => (
                                <option value={insurance.value} key={idx}>
                                    {insurance.label}
                                </option>
                            ),
                        )}
                    </select>
                    {errorInsurance && (
                        <p className="text-destructive text-sm mb-2 text-center">
                            {errorInsurance}
                        </p>
                    )}
                </div>

                <div className="input-item">
                    <label
                        htmlFor="comments"
                        className="block text-sm font-medium text-foreground"
                    >
                        Do you have any additional comments regarding this trip?
                        (optional)
                    </label>
                    <textarea
                        id="comments"
                        placeholder="E.g., cultural events, sport events, activities, etc..."
                        name="comments"
                        value={comments}
                        rows={3}
                        onChange={(e) => setComments(e.target.value)}
                    />
                    {errorComments && (
                        <p className="text-destructive text-sm mb-2 text-center">
                            {errorComments}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex gap-3 pt-2 my-4">
                <button
                    type="submit"
                    disabled={isPending}
                    className="flex w-full items-center gap-x-4 justify-center rounded-md bg-accent px-3 py-2.5 text-base font-semibold text-background hover:bg-accent/80 hover:cursor-pointer disabled:cursor-not-allowed"
                >
                    {isPending ? (
                        <>
                            Saving Profile...
                            <Loader2 className="w-6 h-6 text-background animate-spin" />
                        </>
                    ) : (
                        <>
                            Save Profile
                            <ArrowDownToLine />
                        </>
                    )}
                </button>
            </div>
            {errorGeneric && (
                <p className="text-destructive text-sm mt-2 mb-4 text-center">
                    {errorGeneric}
                </p>
            )}
        </form>
    );
}
