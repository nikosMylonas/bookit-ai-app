import TripProfileForm from '@/components/forms/TripProfileForm';
import { attributes } from '@/config/attr';
import { getTripProfile } from '@/data-access-layer/getTripProfile';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: attributes.onboarding.title,
    description: attributes.onboarding.description,
};

export default async function OnboardingPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect(attributes.signIn.path);
    }

    // Get trip profile from DB:
    const tripProfile = (await getTripProfile()) || {
        destination: '',
        fromDate: '',
        toDate: '',
        goal: '',
        budget: '',
        primaryTicket: '',
        insurance: '',
        comments: null,
        location: '',
        numberPersons: 0,
        numberKids: 0,
        accommodationType: '',
    };
    return (
        <main>
            <div className="div-container pt-8 min-h-screen">
                <div className="max-w-xl lg:max-w-4xl mx-auto">
                    <div className="flex flex-col items-center justify-center">
                        <div>
                            <h1 className="text-2xl font-semibold mb-2">
                                Tell Us About Your Upcoming Trip
                            </h1>
                            <div className="text-muted mb-6">
                                Create the perfect travel plan for you.
                            </div>
                        </div>
                        <TripProfileForm tripProfile={tripProfile} />
                    </div>
                </div>
            </div>
        </main>
    );
}
