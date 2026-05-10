import TripPlanCard from '@/components/cards/TripPlanCard';
import EmailForm from '@/components/forms/EmailForm';
import { Card } from '@/components/ui/card';
import { attributes } from '@/config/attr';
import { getPlanByVersion } from '@/data-access-layer/getTripPlans';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
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
import Link from 'next/link';
import { redirect } from 'next/navigation';

type Props = {
    params: Promise<{ version: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { version } = await params;

    return {
        title: `BookIt | Trip Plan Version: ${version}`,
        description: `Trip plan version ${version} page.`,
    };
}

export default async function VersionsPage({ params }: Props) {
    const user = await getCurrentUser();

    if (!user) {
        redirect(attributes.signIn.path);
    }

    const { version } = await params;
    const today = new Date().toISOString().split('T')[0];
    const plan = await getPlanByVersion(parseInt(version));

    return (
        <main>
            <div className="div-container pt-8 min-h-screen">
                <div className="max-w-xl lg:max-w-4xl mx-auto">
                    <div className="flex flex-col items-center justify-center gap-y-8 mb-6">
                        <div>
                            <h1 className="text-3xl font-semibold text-center mb-4">
                                Your Trip Plan Version {plan?.version}
                            </h1>
                            {plan && (
                                <p className="text-muted text-center">
                                    Version {plan?.version} • Created{' '}
                                    {formatDate(
                                        plan?.createdAt.toString() || today,
                                    )}
                                </p>
                            )}
                        </div>
                        <p className="text-muted">
                            Click here to return to{' '}
                            <Link href="/versions" className="link">
                                all versions
                            </Link>{' '}
                            page.
                        </p>
                    </div>
                    {/* Overview section */}

                    <section className="space-y-8 my-8">
                        <TripPlanCard overview={plan?.overview} />
                    </section>
                    <div className="mb-8 w-full">
                        <EmailForm />
                    </div>
                </div>
            </div>
        </main>
    );
}
