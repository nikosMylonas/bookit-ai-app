import { Card, CardContent } from '@/components/ui/card';
import { attributes } from '@/config/attr';
import { getPlanVersions } from '@/data-access-layer/getTripPlans';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { formatDate } from '@/utils/helpers';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: attributes.versions.title,
    description: attributes.versions.description,
};

export const dynamic = 'force-dynamic';
export default async function VersionsPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect(attributes.signIn.path);
    }

    const versions = await getPlanVersions();

    return (
        <main>
            <div className="div-container pt-8 min-h-screen">
                <div className="max-w-xl lg:max-w-4xl mx-auto">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-3xl font-semibold mb-4">
                            Versions Page
                        </h1>
                        <p className="mb-8 text-center text-muted">
                            You can have at most 5 plan versions for a given
                            trip profile. If you want to generate more plans,
                            please delete first your current trip profile, then
                            create a new one. You can email each version to an
                            email address so you can keep track of your plans!
                        </p>
                        <div>
                            {versions ? (
                                <table className="table-fixed border-collapse border border-muted/20 w-full">
                                    <tbody>
                                        {versions?.map((version, idx) => (
                                            <tr
                                                key={idx}
                                                className="text-foreground"
                                            >
                                                <td className="border border-muted/20 p-3">
                                                    <Link
                                                        href={`/versions/${version.version}`}
                                                        className="link"
                                                    >
                                                        Version:{' '}
                                                        {version.version}
                                                    </Link>
                                                </td>
                                                <td className="border border-muted/20 p-3">
                                                    Created At:{' '}
                                                    {formatDate(
                                                        version.createdAt.toString(),
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <Card className="py-4 px-2 md:max-w-md! border border-muted">
                                    <CardContent className="space-y-4">
                                        <h2 className="text-xl font-semibold text-center text-foreground">
                                            No Plan
                                        </h2>
                                        <p className="text-center text-muted text-base">
                                            There&apos;s no plan for your trip
                                            profile. Please{' '}
                                            <Link
                                                href="/onboarding"
                                                className="link"
                                            >
                                                create one
                                            </Link>
                                            , first!
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
