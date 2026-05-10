import GeneratePlanBtn from '@/components/buttons/GeneratePlanBtn';
import TripPlanCard from '@/components/cards/TripPlanCard';
import EmailForm from '@/components/forms/EmailForm';
import { Card } from '@/components/ui/card';
import { attributes } from '@/config/attr';
import { getLatestPlanVersion } from '@/data-access-layer/getTripPlans';
import { getTripProfile } from '@/data-access-layer/getTripProfile';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import prisma from '@/lib/prisma';
import { formatDate } from '@/utils/helpers';
import {
    BedDouble,
    Calendar1,
    FilePlus2,
    Landmark,
    Notebook,
    Plane,
    ReceiptText,
    Target,
    Tickets,
    User,
} from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: attributes.plan.title,
    description: attributes.plan.description,
};

export default async function PlanPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect(attributes.signIn.path);
    }

    const tripProfile = await getTripProfile();
    // This is only for testing!!!
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

    const planResult = await getLatestPlanVersion();

    const plan = planResult?.plan_text ? JSON.parse(planResult?.plan_text) : {};

    return (
        <main>
            <div className="div-container pt-8 min-h-screen">
                <div className="max-w-xl lg:max-w-4xl mx-auto px-2">
                    <div className="flex flex-col items-center justify-center gap-y-8 mb-6">
                        <div>
                            <h1 className="text-3xl font-semibold text-center mb-4">
                                Your Trip Plan
                            </h1>
                            {planResult && (
                                <p className="text-muted">
                                    Version {planResult?.version} • Created{' '}
                                    {formatDate(
                                        planResult?.createdAt.toString() ||
                                            today,
                                    )}
                                </p>
                            )}
                        </div>
                        {planResult && (
                            <GeneratePlanBtn
                                btnText="Regenerate Plan"
                                profile={profile}
                            />
                        )}
                        <p className="text-muted">
                            Click here to see all{' '}
                            <Link href="/versions" className="link">
                                versions
                            </Link>{' '}
                            of your plan.
                        </p>
                    </div>
                    {/* Overview section */}

                    {plan.overview ? (
                        <>
                            <section className="space-y-8 my-8">
                                <TripPlanCard overview={plan.overview} />
                            </section>
                            <div className="mb-8 w-full">
                                <EmailForm />
                            </div>
                        </>
                    ) : (
                        <section>
                            <Card className="px-4 mb-6 flex items-center gap-3 md:w-full! border border-muted">
                                <div className="py-6 text-center text-muted">
                                    <h3 className="text-xl">No Plan</h3>
                                    <p className="text-lg">
                                        You don&apos;t have any plan yet.
                                        Please, create one!
                                    </p>
                                </div>
                            </Card>
                        </section>
                    )}
                </div>
            </div>
        </main>
    );
}
