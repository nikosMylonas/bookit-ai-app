export type TripProfileType = {
    location: string;
    destination: string;
    fromDate: string;
    toDate: string;
    numberPersons: number;
    numberKids: number;
    goal: string;
    budget: string;
    primaryTicket: string;
    accommodationType: string;
    insurance: string;
    comments: string | null;
} | null;

export type TripPlanType = {
    overview: {
        goal: string;
        kids: string;
        dates: string;
        notes: string;
        persons: string;
        location: string;
        insurance: string;
        destination: string;
        accommodation: string;
        primaryTicket: string;
        recommendations: string;
        comments: string;
    };
    version: number;
    createdAt: string;
};
