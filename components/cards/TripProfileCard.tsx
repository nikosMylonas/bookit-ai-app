import { TripProfileType } from '@/types/types';
import { Card, CardContent, CardDescription, CardHeader } from '../ui/card';
import Link from 'next/link';

export default function TripProfileCard({
    tripProfile,
}: {
    tripProfile: TripProfileType;
}) {
    return (
        <Card className="w-full mb-8">
            <CardHeader>
                <CardDescription className="text-foreground text-center text-xl">
                    Trip Profile Overview
                </CardDescription>
            </CardHeader>
            <CardContent className="py-4 px-8">
                {tripProfile ? (
                    <table className="table-fixed border-collapse border border-muted/20 w-full">
                        <tbody>
                            <tr className="text-foreground">
                                <td className="border border-muted/20 p-3">
                                    Start Location:{' '}
                                </td>
                                <td className="border border-muted/20 p-3">
                                    {tripProfile.location}
                                </td>
                            </tr>
                            <tr className="text-foreground">
                                <td className="border border-muted/20 p-3">
                                    Destination:{' '}
                                </td>
                                <td className="border border-muted/20 p-3">
                                    {tripProfile.destination}
                                </td>
                            </tr>
                            <tr className="text-foreground">
                                <td className="border border-muted/20 p-3">
                                    From Date:{' '}
                                </td>
                                <td className="border border-muted/20 p-3">
                                    {tripProfile.fromDate}
                                </td>
                            </tr>
                            <tr className="text-foreground">
                                <td className="border border-muted/20 p-3">
                                    To Date:{' '}
                                </td>
                                <td className="border border-muted/20 p-3">
                                    {tripProfile.toDate}
                                </td>
                            </tr>
                            <tr className="text-foreground">
                                <td className="border border-muted/20 p-3">
                                    Number of Persons:{' '}
                                </td>
                                <td className="border border-muted/20 p-3">
                                    {tripProfile.numberPersons}
                                </td>
                            </tr>
                            <tr className="text-foreground">
                                <td className="border border-muted/20 p-3">
                                    Number of Children:{' '}
                                </td>
                                <td className="border border-muted/20 p-3">
                                    {tripProfile.numberKids}
                                </td>
                            </tr>
                            <tr className="text-foreground">
                                <td className="border border-muted/20 p-3">
                                    Trip&apos;s Goal:{' '}
                                </td>
                                <td className="border border-muted/20 p-3 capitalize">
                                    {tripProfile.goal}
                                </td>
                            </tr>
                            <tr className="text-foreground">
                                <td className="border border-muted/20 p-3">
                                    Intended Budget:{' '}
                                </td>
                                <td className="border border-muted/20 p-3 capitalize">
                                    {tripProfile.budget}
                                </td>
                            </tr>
                            <tr className="text-foreground">
                                <td className="border border-muted/20 p-3">
                                    Primary Tickets:{' '}
                                </td>
                                <td className="border border-muted/20 p-3 capitalize">
                                    {tripProfile.primaryTicket}
                                </td>
                            </tr>
                            <tr className="text-foreground">
                                <td className="border border-muted/20 p-3">
                                    Accommodation:{' '}
                                </td>
                                <td className="border border-muted/20 p-3 capitalize">
                                    {tripProfile.accommodationType}
                                </td>
                            </tr>
                            <tr className="text-foreground">
                                <td className="border border-muted/20 p-3">
                                    Travel Insurance:{' '}
                                </td>
                                <td className="border border-muted/20 p-3 capitalize">
                                    {tripProfile.insurance}
                                </td>
                            </tr>
                            <tr className="text-foreground">
                                <td className="border border-muted/20 p-3">
                                    Additional Notes:{' '}
                                </td>
                                <td className="border border-muted/20 p-3 capitalize">
                                    {tripProfile.comments
                                        ? tripProfile.comments
                                        : '-'}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p className="text-muted text-base text-center">
                        You haven&apos;t added yet a Trip Profile. Please go to
                        the{' '}
                        <Link href="/onboarding" className="link">
                            Onboarding Page
                        </Link>{' '}
                        and cretate your Trip Profile.
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
