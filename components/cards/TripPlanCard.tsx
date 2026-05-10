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
import { Card } from '../ui/card';
import { TripPlanType } from '@/types/types';

export default function TripPlanCard({
    overview,
}: Omit<TripPlanType, 'version' | 'createdAt'>) {
    return (
        <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-4 mb-8">
                <Card className="px-4 flex items-center gap-3 md:max-w-md! border border-muted">
                    <div className="w-full h-10 flex items-center justify-center gap-x-2">
                        <Plane className="w-5 h-5 text-accent" />
                        <p className="text-muted font-medium text-base">Trip</p>
                    </div>
                    <div>
                        <p className="mb-4 text-foreground">
                            From: {overview.location} - To:{' '}
                            {overview.destination}
                        </p>
                    </div>
                </Card>
                <Card className="px-4 flex items-center gap-3 md:max-w-md! border border-muted">
                    <div className="w-full h-10 flex items-center justify-center gap-x-2">
                        <Calendar1 className="w-5 h-5 text-accent" />
                        <p className="text-base font-medium text-muted">
                            Dates
                        </p>
                    </div>
                    <div>
                        <p className="mb-4 text-foreground">{overview.dates}</p>
                    </div>
                </Card>
                <Card className="px-4 flex items-center gap-3 md:max-w-md! border border-muted">
                    <div className="w-full h-10 flex items-center justify-center gap-x-2">
                        <User className="w-5 h-5 text-accent" />
                        <p className="text-base font-medium text-muted">
                            Persons
                        </p>
                    </div>
                    <div>
                        <p className="mb-4 text-foreground">
                            Total number of travellers: {overview.persons} -
                            Children: {overview.kids}
                        </p>
                    </div>
                </Card>
                <Card className="px-4 flex items-center gap-3 md:max-w-md! border border-muted">
                    <div className="w-full h-10 flex items-center justify-center gap-x-2">
                        <Target className="w-5 h-5 text-accent" />
                        <p className="text-base font-medium text-muted">Goal</p>
                    </div>
                    <div>
                        <p className="mb-4 text-foreground">{overview.goal}</p>
                    </div>
                </Card>
            </div>
            <Card className="px-4 flex items-center gap-3 md:w-full! border border-muted">
                <div className="w-full h-10 flex items-center justify-center gap-x-2">
                    <ReceiptText className="w-5 h-5 text-accent" />
                    <p className="tetx-base font-medium text-muted">
                        Insurance
                    </p>
                </div>
                <div>
                    <p className="mb-4 text-foreground">{overview.insurance}</p>
                </div>
            </Card>
            <Card className="px-4 flex items-center gap-3 md:w-full! border border-muted">
                <div className="w-full h-10 flex items-center justify-center gap-x-2">
                    <Tickets className="w-5 h-5 text-accent" />
                    <p className="text-base font-medium text-muted">Tickets</p>
                </div>
                <div>
                    <p className="mb-4 text-foreground">
                        {overview.primaryTicket}
                    </p>
                </div>
            </Card>
            <Card className="px-4 flex items-center gap-3 md:w-full! border border-muted">
                <div className="w-full h-10 flex items-center justify-center gap-x-2">
                    <BedDouble className="w-5 h-5 text-accent" />
                    <p className="text-base font-medium text-muted">
                        Accommodation
                    </p>
                </div>
                <div>
                    <p className="mb-4 text-foreground">
                        {overview.accommodation}
                    </p>
                </div>
            </Card>
            <Card className="px-4 flex items-center gap-3 md:w-full! border border-muted">
                <div className="w-full h-10 flex items-center justify-center gap-x-2">
                    <Landmark className="w-5 h-5 text-accent" />
                    <p className="text-base font-medium text-muted">
                        Recommendations
                    </p>
                </div>
                <div>
                    <p className="mb-4 text-foreground">
                        {overview.recommendations}
                    </p>
                </div>
            </Card>
            {overview.comments && (
                <Card className="px-4 flex items-center gap-3 md:w-full! border border-muted">
                    <div className="w-full h-10 flex items-center justify-center gap-x-2">
                        <FilePlus2 className="w-5 h-5 text-accent" />
                        <p className="text-base font-medium text-muted">
                            Additional Features
                        </p>
                    </div>
                    <div>
                        <p className="mb-4 text-foreground">
                            {overview.comments}
                        </p>
                    </div>
                </Card>
            )}
            <Card className="px-4 flex items-center gap-3 md:w-full! border border-muted">
                <div className="w-full h-10 flex items-center justify-center gap-x-2">
                    <Notebook className="w-5 h-5 text-accent" />
                    <p className="text-muted font-medium text-base">
                        Trip Notes
                    </p>
                </div>
                <div>
                    <p className="mb-4 text-foreground">{overview.notes}</p>
                </div>
            </Card>
        </div>
    );
}
