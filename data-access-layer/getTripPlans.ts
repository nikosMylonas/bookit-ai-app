import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function getPlanVersions() {
    // Get user from session:
    const user = await getCurrentUser();

    // Check user exists:
    if (!user) {
        redirect('/auth/sign-in');
    }

    try {
        const versions = await prisma.plans.findMany({
            where: { userId: user.id },
            select: { version: true, createdAt: true },
        });
        if (versions.length === 0) {
            return null;
        }

        return versions;
    } catch (err) {
        console.log('Error fetching Trip Profile:', err);
        throw new Error('Unknown Error. Please try again');
    }
}

export async function getPlanByVersion(version: number) {
    // Get user from session:
    const user = await getCurrentUser();

    // Check user exists:
    if (!user) {
        redirect('/auth/sign-in');
    }

    try {
        const planVersion = await prisma.plans.findFirst({
            where: { userId: user.id, version: version },
            select: { version: true, plan_text: true, createdAt: true },
        });

        if (!planVersion) {
            return null;
        }

        const overviewConverted = JSON.parse(planVersion.plan_text);

        // console.log('Plan converted from text:', overviewConverted);

        // const plan = {
        //     goal: overviewConverted.overview.goal,
        //     kids: overviewConverted.overview.kids,
        //     dates: overviewConverted.overview.dates,
        //     notes: overviewConverted.overview.notes,
        //     persons: overviewConverted.overview.persons,
        //     location: overviewConverted.overview.location,
        //     insurance: overviewConverted.overview.insurance,
        //     destination: overviewConverted.overview.destination,
        //     accommodation: overviewConverted.overview.accommodation,
        //     primaryTicket: overviewConverted.overview.primaryTicket,
        //     recommendations: overviewConverted.overview.recommendations,
        //     comments: overviewConverted.overview.comments,
        //     version: planVersion.version,
        //     createdAt: planVersion.createdAt,
        // };

        const plan = {
            ...overviewConverted,
            version: planVersion.version,
            createdAt: planVersion.createdAt,
        };

        return plan;
    } catch (err) {
        console.log('Error fetching plan by version:', err);
        // throw new Error('Unknown Error. Please try again');
    }
}

export async function getLatestPlanVersion() {
    // Get user from session:
    const user = await getCurrentUser();

    // Check user exists:
    if (!user) {
        redirect('/auth/sign-in');
    }

    try {
        const planResult = await prisma.plans.findFirst({
            where: { userId: user.id },
            orderBy: { version: 'desc' },
        });

        if (!planResult) {
            return null;
        }

        return planResult;
    } catch (err) {
        console.log('Error fetching latest plan version:', err);
        throw new Error('Unknown Error. Please try again');
    }
}
