'use server';

import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import prisma from '@/lib/prisma';
import { TripPlanType, TripProfileType } from '@/types/types';
import { tripProfileSchema } from '@/utils/validation';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import OpenAI from 'openai';
import { formatNumberOfPersons } from '@/utils/helpers';

export async function createTripProfile(
    prevState: unknown,
    formData: FormData,
) {
    // Confirm user exists.
    const user = await getCurrentUser();

    if (!user) {
        redirect('/auth/sign-in');
    }

    const inputTripProfile = Object.fromEntries(formData.entries());
    console.log('Input Trip Profile:', inputTripProfile);

    // Validate Trip Profile:
    const validateTripProfile = tripProfileSchema.safeParse(inputTripProfile);

    if (!validateTripProfile.success) {
        const fieldErrors = validateTripProfile.error;
        const flattenedErrors = z.flattenError(fieldErrors);

        return {
            error: {
                errorState: true,
                errorStartLocation: flattenedErrors.fieldErrors?.startLocation,
                errorDestination: flattenedErrors.fieldErrors?.destination,
                errorFromDate: flattenedErrors.fieldErrors?.fromDate,
                errorToDate: flattenedErrors.fieldErrors?.toDate,
                errorPersons: flattenedErrors.fieldErrors?.persons,
                errorKids: flattenedErrors.fieldErrors?.kids,
                errorGoal: flattenedErrors.fieldErrors?.goal,
                errorBudget: flattenedErrors.fieldErrors?.budget,
                errorPrimaryTicket: flattenedErrors.fieldErrors?.primaryTicket,
                errorAccommodation: flattenedErrors.fieldErrors?.accommodation,
                errorInsurance: flattenedErrors.fieldErrors?.insurance,
                errorComments: flattenedErrors.fieldErrors?.comments,
            },
        };
    }

    // Validate that fromDate is not today or in the past
    // and the toDate is after the fromDate:
    const today = new Date().toISOString().split('T')[0];
    if (validateTripProfile.data.fromDate <= today) {
        return {
            error: {
                errorState: true,
                errorValidFromDate: 'Please select a day after today!',
            },
        };
    } else if (
        validateTripProfile.data.toDate <= validateTripProfile.data.fromDate
    ) {
        return {
            error: {
                errorState: true,
                errorValidToDate:
                    'The return day cannot be set before the beginning of the trip!',
            },
        };
    }

    try {
        // Test Trip Profile Form functionality:
        console.log('Trip Profile:', validateTripProfile.data);
        console.log('User ID:', user.id);

        // Save trip profile in DB:
        await prisma.tripProfile.upsert({
            where: { userId: user.id },
            update: {
                location: validateTripProfile.data.startLocation,
                destination: validateTripProfile.data.destination,
                fromDate: validateTripProfile.data.fromDate,
                toDate: validateTripProfile.data.toDate,
                numberPersons: parseInt(validateTripProfile.data.persons),
                numberKids: parseInt(validateTripProfile.data.kids),
                goal: validateTripProfile.data.goal,
                budget: validateTripProfile.data.budget,
                primaryTicket: validateTripProfile.data.primaryTicket,
                accommodationType: validateTripProfile.data.accommodation,
                insurance: validateTripProfile.data.insurance,
                comments: validateTripProfile.data.comments || '',
            },
            create: {
                userId: user.id,
                location: validateTripProfile.data.startLocation,
                destination: validateTripProfile.data.destination,
                fromDate: validateTripProfile.data.fromDate,
                toDate: validateTripProfile.data.toDate,
                numberPersons: parseInt(validateTripProfile.data.persons),
                numberKids: parseInt(validateTripProfile.data.kids),
                goal: validateTripProfile.data.goal,
                budget: validateTripProfile.data.budget,
                primaryTicket: validateTripProfile.data.primaryTicket,
                accommodationType: validateTripProfile.data.accommodation,
                insurance: validateTripProfile.data.insurance,
                comments: validateTripProfile.data.comments || '',
            },
        });

        return { error: { errorState: false } };
    } catch (err) {
        console.log('Error creating Trip Profile:', err);
        return {
            error: {
                errorState: true,
                errorGeneric: 'Uknown error. Please try again.',
            },
        };
    }
}

export async function deleteTripProfile() {
    // Confirm user exists.
    const user = await getCurrentUser();

    if (!user) {
        redirect('/auth/sign-in');
    }

    // Confirm that user has a trip profile associated with his ID.
    // Users can have only one trip profile, which then can be updated
    // through the upsert Prisma method.
    try {
        const tripProfileExists = await prisma.tripProfile.findUnique({
            where: { userId: user.id },
        });

        if (!tripProfileExists) {
            return {
                error: {
                    errorState: true,
                    errorTripProfile:
                        "You don't have any trip profile to delete!",
                },
            };
        }

        // IMPORTANT NOTE: Delete first any generated plans for this profile.
        // The generated plans have a maximum number (versions) of 5.
        const versions = await prisma.plans.findMany({
            where: { userId: user.id },
        });

        if (versions) {
            await prisma.plans.deleteMany({ where: { userId: user.id } });
        }

        await prisma.tripProfile.delete({ where: { userId: user.id } });
        return { error: { errorState: false } };
    } catch (err) {
        console.log('Error fetching Trip Profile:', err);
        return {
            error: {
                errorState: true,
                errorGeneric: 'Uknown error. Please try again.',
            },
        };
    }
}

export async function generateTripPlan(profile: TripProfileType) {
    // Confirm user exists.
    const user = await getCurrentUser();

    if (!user) {
        redirect('/auth/sign-in');
    }

    const today = new Date().toISOString().split('T')[0];
    const normalizedProfile = {
        location: profile?.location || '',
        destination: profile?.destination || '',
        fromDate: profile?.fromDate || today,
        toDate: profile?.toDate || today,
        numberPersons: profile?.numberPersons || 1,
        numberKids: profile?.numberKids || 0,
        goal: profile?.goal || 'vacations',
        budget: profile?.budget || 'low',
        primaryTicket: profile?.primaryTicket || 'flight',
        accommodationType: profile?.accommodationType || 'hotel',
        insurance: profile?.insurance || 'none',
        comments: profile?.comments ? profile?.comments : '',
    };

    const apiKey = process.env.OPEN_ROUTER_KEY;

    if (!apiKey) {
        throw new Error('OPEN_ROUTER_KEY not found.');
    }

    const openAi = new OpenAI({
        apiKey,
        baseURL: 'https://openrouter.ai/api/v1',
    });

    // Build the prompt:
    const prompt = buildPrompt(normalizedProfile);

    try {
        const completion = await openAi.chat.completions.create({
            model: 'nvidia/nemotron-3-nano-30b-a3b:free',
            messages: [
                {
                    role: 'system',
                    content:
                        'You are an expert trip organizator. You must respond with valid JSON only. Do not include any markdown, reasoning, or additional text.',
                },
                { role: 'user', content: prompt },
            ],
            temperature: 0.6,
            response_format: { type: 'json_object' },
        });

        const content = completion.choices[0].message.content;

        if (!content) {
            console.error(
                '[AI] No content in response:',
                JSON.stringify(completion, null, 2),
            );
            return {
                error: {
                    errorState: true,
                    errorAIContent: 'No content in AI response.',
                },
            };
        }

        const planData = JSON.parse(content);
        const formatedPlanResponse = formatPlanResponse(
            planData,
            normalizedProfile,
        );
        const planText = JSON.stringify(formatedPlanResponse, null, 2);

        // Fetch latest plan
        const latestPlan = await prisma.plans.findFirst({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
            select: { version: true },
        });

        const nextVersion = latestPlan ? latestPlan.version + 1 : 1;

        if (nextVersion > 5) {
            return {
                error: {
                    errorState: true,
                    errorMaxVersion:
                        'You have exceeded the maximum number of versions. Please delete the trip profile and start again.',
                },
            };
        }

        const planCreated = await prisma.plans.create({
            data: {
                userId: user.id,
                plan_json: formatedPlanResponse,
                plan_text: planText,
                version: nextVersion,
            },
        });

        if (!planCreated) {
            return {
                error: {
                    errorState: true,
                    errorPlanCreated:
                        'The plan has not been generated. Please try again',
                },
            };
        }
        return { error: { errorState: false } };
    } catch (err) {
        console.error('[AI] Error generating trip plan:', err);
        return {
            error: {
                errorState: true,
                errorGeneric: 'Uknown error. Please try again.',
            },
        };
    }
}

function formatPlanResponse(
    aiResponse: TripPlanType,
    profile: TripProfileType,
) {
    const plan: Omit<TripPlanType, 'version' | 'createdAt'> = {
        overview: {
            location:
                aiResponse?.overview.location ||
                `Customized location: ${profile?.location}`,
            destination:
                aiResponse?.overview.destination ||
                `Customized destination: ${profile?.destination}`,
            dates:
                aiResponse?.overview.dates ||
                `Customized dates: From ${profile?.fromDate} to ${profile?.toDate}`,
            persons:
                `${aiResponse?.overview.persons}` ||
                `Customized number of persons: ${formatNumberOfPersons(profile?.numberPersons || 1)}`,
            kids:
                `${aiResponse?.overview.kids}` ||
                `Customized number of children: ${formatNumberOfPersons(profile?.numberKids || 0)}`,
            goal:
                aiResponse?.overview.goal ||
                `Customized goal: ${profile?.goal}`,
            primaryTicket:
                aiResponse?.overview.primaryTicket ||
                `Customized transportation type: ${profile?.primaryTicket}`,
            recommendations:
                aiResponse?.overview.recommendations ||
                `No places of interest for this trip`,
            accommodation:
                aiResponse?.overview.accommodation ||
                `Customized a   ccommodation type: ${profile?.accommodationType}`,
            insurance:
                aiResponse?.overview.insurance ||
                `Customized insurance: ${profile?.insurance}`,
            comments: aiResponse?.overview.comments || 'No additional features',
            notes:
                aiResponse?.overview.notes ||
                'No additional requests for this trip',
        },
    };

    return plan;
}

function buildPrompt(tripProfile: TripProfileType): string {
    const goalMap: Record<string, string> = {
        cultural: 'Travel focuses mainly on cultural activities.',
        adventure: 'Travel focuses mainly on adventure.',
        vacations: ' Travel focuses mainly on vacations or holidays.',
        personal: 'Travel focuses mainly on visiting family or friends.',
        professional:
            'Travel focuses mainly on professional or business goals.',
        wellness: 'Travel focuses mainly on wellnessor relaxation.',
        solo: 'Travel focuses mainly on solo traveling and exploring.',
        other: 'Travel does not have a specific goal, please give general recommendations.',
    };

    const budgetMap: Record<string, string> = {
        low: 'Please give advice focusing on best prices and offers, for both transportation tickets, and accommodation.',
        medium: 'Please give advice mixing best prices with some more high end options for both transportation tickets, and accommodation.',
        high: 'Please give advice focusing on high end or luxury options for both transportation tickets, and accommodation.',
    };

    const primaryTicketsMap: Record<string, string> = {
        flight: 'Please find flight tickets whenever is possible, otherwise give the best alternative.',
        bus: 'Please find bus tickets whenever is possible, otherwise give the best alternative.',
        train: 'Please find train tickets whenever is possible, otherwise give the best alternative.',
        boat: 'Please find boat tickets whenever is possible, otherwise give the best alternative.',
        ferry: 'Please find ferry tickets whenever is possible including vehicle, otherwise give the best alternative.',
        hireAuto: 'Please find hiring auto options',
        ai: 'Give best recommendation given the starting and destination location.',
        none: 'Do not give any transportation recommendation.',
    };

    const accommodationTypeOptionsMap: Record<string, string> = {
        hotel: 'Please find best accommodation options for hotels. Give alternatives only if there is no hotel option.',
        airbnb: 'Please find best accommodation options for airbnb. Give alternatives only if there is no airbnb option.',
        room: 'Please find best accommodation options for room or house to let. Give alternatives only if there is no room or house to let option.',
        ai: 'Please find best accommodation options without any preferences for the type of accommodation. Follow though the budget option.',
        none: 'Do not give any accommodation recommendation.',
    };
    const insuranceOptionsMap: Record<string, string> = {
        full: 'Give recommendation for a full insurance plan covering this trip.',
        basic: 'Give recommendation for a basic insurance plan covering this trip.',
        none: 'Do not give any insurance plan recommendation',
    };

    return `Create a personalized trip plan with the following profile:
Starting place for this trip: ${tripProfile?.location}
Destination: ${tripProfile?.destination}
Starting date: ${tripProfile?.fromDate} - the day the trip should start
Return date: ${tripProfile?.toDate} - the day I should be back in the starting location
Number of adult persons: ${tripProfile?.numberPersons}
From which ${tripProfile?.numberKids} are children
Goal: ${goalMap[tripProfile?.goal || 'vacations']}
Budget: ${budgetMap[tripProfile?.budget || 'low']}
Transport Tickets: ${primaryTicketsMap[tripProfile?.primaryTicket || 'flight']} tickets
Accommodation: ${accommodationTypeOptionsMap[tripProfile?.accommodationType || 'hotel']}
Insurance: ${insuranceOptionsMap[tripProfile?.insurance || 'none']}
${tripProfile?.comments ? `Additional Requests: ${tripProfile.comments}` : ''}

Generate a complete trip plan in JSON format with this exact structure:
{
    "overview": {
    "location": "Where the trip starts",
    "destination": "The trips's destination",
    "dates": "Give the starting and ending dates of trh trip in human readable form, using the computer's system locale",
    "persons": "Number of persons for this trip",
    "kids": "number of kids, if any, otherwise return 'None'",
    "goal": "brief description of the trip's goal",
    "primaryTicket": "Recommended transportation tickets. If the provided option doesn't apply entirely to the provided route, give also additional instructions, e.g if there isn't a direct flight for this route, provide provide additional ways, as bus or train tickets from the nearest airport to the final destination",
    "recommendations": "Based on the trip's goal, provide some recommendations, e.g cultural events, concerts, or museums to visit, if the goal is Cultural Travel"
    "accommodation": "Recommended accommodation, based on the accommodation option, but also, if it is relevant, the trip's goal",
    "insurance": "Recommended insurance plan covering the trip",
    "notes": "additional requests regarding the trip (2-3 sentences)",
  },
}

  Requirements:
  - Create plan for the exact trip itinerary: From ${tripProfile?.location} to ${tripProfile?.destination}.
  - If ${tripProfile?.location} or ${tripProfile?.destination} are not clear, return the following JSON:
  {
    "overview": {
    "location": "Please specify a correct starting point of the trip",
    "destination": "Please specify a correct  destination",
    "dates": "-",
    "persons": "-",
    "kids": "-",
    "goal": "-",
    "primaryTicket": "-",
    "recommendations": "-"
    "accommodation": "-",
    "insurance": "-",
    "notes": "-",
  },
  - Create plan for the exact days: From ${tripProfile?.fromDate} to ${tripProfile?.toDate}.
  - Return the closer answer to what was asked.
  - Include 2-3 alternative plans, only for transportation and accommodation.
  - Whether possible, return links to book either transportation, or accommodation tickets.
  - If among people travelling there are children, give children-friendly accommodation recommendations first.
  - The same requirements apply for any adittional requests asked in the comments section.
  
  Return ONLY the JSON object (no markdown, no extra text).`;
}
