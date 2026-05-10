import { Calendar, Sparkles, Target, TreePalm } from 'lucide-react';

export const features = [
    {
        icon: Sparkles,
        title: 'AI-Powered Plans',
        description:
            'Get a trip plan tailored to your destination, budget, and preferences.',
    },
    {
        icon: Target,
        title: 'Goal-Oriented',
        description:
            'Whether you want to go for vacations, or for a professional trip.',
    },
    {
        icon: Calendar,
        title: 'Flexible Scheduling',
        description: 'Plans that fit your schedule.',
    },
    {
        icon: TreePalm,
        title: 'Efficiency',
        description: 'No matter your budget, enjoy your trip to the fullest.',
    },
];

export const onboardingOptions = {
    numberPersonsOptions: [
        { value: '1', label: 'Single Person' },
        { value: '2', label: 'Two Persons' },
        { value: '3', label: 'Three Persons' },
        { value: '4', label: 'More than Three Persons' },
    ],
    numberKidsOptions: [
        { value: '0', label: 'No children' },
        { value: '1', label: 'One Child' },
        { value: '2', label: 'Two Children' },
        { value: '3', label: 'Three Children' },
        { value: '4', label: 'More than Three Children' },
    ],

    goalOptions: [
        { value: 'vacations', label: 'Vacations/Holidays' },
        { value: 'cultural', label: 'Cultural Travel' },
        { value: 'adventure', label: 'Adventure Travel' },
        { value: 'personal', label: 'Visit Family/Friends' },
        { value: 'professional', label: 'Professional/Business' },
        { value: 'wellness', label: 'Wellness/Relaxation' },
        { value: 'solo', label: 'Solo Travel' },
        { value: 'other', label: 'Other' },
    ],

    budgetOptions: [
        { value: 'low', label: 'Low Budget' },
        { value: 'medium', label: 'Medium Budget' },
        { value: 'high', label: 'High Budget' },
    ],

    primaryTicketsOptions: [
        { value: 'flight', label: 'Flight Tickets' },
        { value: 'bus', label: 'Bus Tickets' },
        { value: 'train', label: 'Train Tickets' },
        { value: 'boat', label: 'Boat Tickets' },
        { value: 'ferry', label: 'Ferry Tickets' },
        { value: 'hireAuto', label: 'Hire Auto' },
        { value: 'ai', label: 'Let AI decide' },
        { value: 'none', label: 'None' },
    ],

    accommodationOptions: [
        { value: 'hotel', label: 'Hotel Room/Suite' },
        { value: 'airbnb', label: 'Airbnb' },
        { value: 'room', label: 'Room/House' },
        { value: 'ai', label: 'Let AI decide' },
        { value: 'none', label: 'None' },
    ],

    insuranceOptions: [
        { value: 'none', label: 'Without Insurance' },
        { value: 'basic', label: 'Basic' },
        { value: 'full', label: 'Full' },
    ],
};
