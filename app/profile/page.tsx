import DeleteTripProfileBtn from '@/components/buttons/DeleteTripProfileBtn';
import GeneratePlanBtn from '@/components/buttons/GeneratePlanBtn';
import TripProfileCard from '@/components/cards/TripProfileCard';
import { attributes } from '@/config/attr';
import { getTripProfile } from '@/data-access-layer/getTripProfile';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: attributes.profile.title,
    description: attributes.profile.description,
};

export const dynamic = 'force-dynamic';
export default async function TripProfilePage() {
    const user = await getCurrentUser();
    if (!user) {
        redirect(attributes.signIn.path);
    }

    const tripProfile = await getTripProfile();

    const today = new Date().toISOString().split('T')[0];
    const profile = {
        location: tripProfile?.location || '',
        destination: tripProfile?.destination || '',
        fromDate: tripProfile?.fromDate || today,
        toDate: tripProfile?.toDate || today,
        numberPersons: tripProfile?.numberPersons || 1,
        numberKids: tripProfile?.numberKids || 0,
        goal: tripProfile?.goal || 'vacations',
        budget: tripProfile?.budget || 'low',
        primaryTicket: tripProfile?.primaryTicket || 'flight',
        accommodationType: tripProfile?.accommodationType || 'hotel',
        insurance: tripProfile?.insurance || 'none',
        comments: tripProfile?.comments || '',
    };

    return (
        <main>
            <div className="div-container pt-8 min-h-screen">
                <div className="max-w-xl lg:max-w-4xl mx-auto">
                    <div className="max-w-lg mx-auto">
                        <div className="flex flex-col items-center justify-start space-y-4 lg:space-y-8">
                            <>
                                <h1 className="text-2xl font-semibold mb-2">
                                    Trip Profile
                                </h1>
                                <div className="text-muted mb-8">
                                    Here&apos;s your trip preferences. Now you
                                    can generate your plan.
                                </div>
                            </>
                            <TripProfileCard tripProfile={tripProfile} />
                            {tripProfile && (
                                <>
                                    <GeneratePlanBtn
                                        btnText="Generate Plan"
                                        profile={profile}
                                    />

                                    <div className="flex flex-col items-center justify-center space-y-4">
                                        <p className="text-muted">
                                            If you want to delete your Trip
                                            Profile entirely, click the
                                            following button. You can always
                                            create a new one in the{' '}
                                            <Link
                                                href="/onboarding"
                                                className="link"
                                            >
                                                Onboarding Page
                                            </Link>{' '}
                                            or edit it, if you already have a
                                            Trip Profile.
                                        </p>
                                        <DeleteTripProfileBtn />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
