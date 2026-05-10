import { TripPlanType } from '@/types/types';

export default function Template(plan: TripPlanType) {
    return ` 
        <div style="font-family: system-ui, sans-serif, Arial; font-size: 16px">
            <h3>
                Your AI Generated Trip Plan
            </h3>
            <div style="margin-top: 20px;padding: 15px;">

                <table role="presentation" style="border-collapse: collapse;">
                <tbody>
                    <tr>
                        <td style="border: 1px solid #2c3e50;padding-left: 4px;">
                            <strong>Version:</strong>
                        </td>
                        <td style="border: 1px solid #2c3e50;padding-left: 4px;">
                            <span style="color: #2c3e50;">${plan.version}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #2c3e50;padding-left: 4px;">
                            <strong>Trip:</strong>
                        </td>
                        <td style="border: 1px solid #2c3e50;padding-left: 4px;">
                            From: <span style="color: #2c3e50;">${plan.overview.location}</span> - 
                            To: <span style="color: #2c3e50;">${plan.overview.destination}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #2c3e50;padding-left: 4px;">
                            <strong>Dates:</strong>
                        </td>
                        <td style="border: 1px solid #2c3e50;padding-left: 4px;">
                            <span style="color: #2c3e50;">${plan.overview.dates}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #2c3e50;padding-left: 4px;">
                            <strong>Persons:</strong>
                        </td>
                        <td style="border: 1px solid #2c3e50;padding-left: 4px;">
                            <span style="color: #2c3e50;">${plan.overview.persons}</span> - Children: 
                            <span style="color: #2c3e50;">${plan.overview.kids}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #2c3e50;padding-left: 4px;">
                            <strong>Goal:</strong>
                        </td>
                        <td style="border: 1px solid #2c3e50;padding-left: 4px;">
                            <span style="color: #2c3e50;">${plan.overview.goal}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #2c3e50;padding-left: 4px;">
                            <strong>Insurance:</strong>
                        </td>
                        <td style="border: 1px solid #2c3e50;padding-left: 4px;">
                            <span style="color: #2c3e50;">${plan.overview.insurance}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #2c3e50;padding-left: 4px;">
                            <strong>Tickets:</strong>
                        </td>
                        <td style="border: 1px solid #2c3e50;padding-left: 4px;">
                            <span style="color: #2c3e50;">${plan.overview.primaryTicket}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #2c3e50;padding-left: 4px;">
                            <strong>Accommodation:</strong>
                        </td>
                        <td style="border: 1px solid #2c3e50;padding-left: 4px;">
                            <span style="color: #2c3e50;">${plan.overview.accommodation}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #2c3e50;padding-left: 4px;">
                            <strong>Insurance:</strong>
                        </td>
                        <td style="border: 1px solid #2c3e50;padding-left: 4px;">
                            <span style="color: #2c3e50;">${plan.overview.insurance}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #2c3e50;padding-left: 4px;">
                            <strong>Additional Feautures:</strong>
                        </td>
                        <td style="border: 1px solid #2c3e50;padding-left: 4px;">
                            <span style="color: #2c3e50;">${plan.overview.comments}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #2c3e50;padding-left: 4px;">
                            <strong>Notes:</strong>
                        </td>
                        <td style="border: 1px solid #2c3e50;padding-left: 4px;">
                            <span style="color: #2c3e50;">${plan.overview.notes}</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        `;
}
