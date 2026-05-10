import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function getTripProfile() {
    // Get user from session:
    const user = await getCurrentUser();

    // Check user exists:
    if (!user) {
        redirect('/auth/sign-in');
    }

    try {
        const tripProfile = await prisma.tripProfile.findUnique({
            where: { userId: user.id },
            select: {
                location: true,
                destination: true,
                fromDate: true,
                toDate: true,
                numberPersons: true,
                numberKids: true,
                goal: true,
                budget: true,
                primaryTicket: true,
                accommodationType: true,
                insurance: true,
                comments: true,
            },
        });

        // console.log('Trip Profile:', tripProfile);
        return tripProfile;
    } catch (err) {
        console.log('Error fetching Trip Profile:', err);
        throw new Error('Unknown Error. Please try again');
    }
}
