'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';
import { emailPlanSchema } from '@/utils/validation';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { redirect } from 'next/navigation';
import Template from '@/components/template/template';
import prisma from '@/lib/prisma';

export async function emailPlan(prevState: unknown, formData: FormData) {
    // Confirm user exists.
    const user = await getCurrentUser();

    if (!user) {
        redirect('/auth/sign-in');
    }

    const planResult = await prisma.plans.findFirst({
        where: { userId: user.id },
        orderBy: { version: 'desc' },
    });

    const planPartial = planResult?.plan_text
        ? JSON.parse(planResult?.plan_text)
        : {};
    const plan = { ...planPartial, version: planResult?.version };

    const userEmail = Object.fromEntries(formData.entries());
    console.log('User Email:', userEmail);

    const validateUserEmail = emailPlanSchema.safeParse(userEmail);

    if (!validateUserEmail.success) {
        const fieldErrors = validateUserEmail.error;
        const flattenedErrors = z.flattenError(fieldErrors);

        return {
            error: {
                errorState: true,
                errorEmail: flattenedErrors.fieldErrors?.email,
            },
        };
    }

    // Create a transporter
    const smtpServerHost = process.env.SMTP_SERVER_HOST;
    const smtpServerUsername = process.env.SMTP_SERVER_USERNAME;
    const smtpServerPsw = process.env.EMAIL_TEST_APP_PSW;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: smtpServerHost,
        port: 587,
        secure: true,
        auth: {
            user: smtpServerUsername,
            pass: smtpServerPsw,
        },
    });

    try {
        // console.log('Validated User Email:', validateUserEmail.data);
        const emailSend = await transporter.sendMail({
            from: validateUserEmail.data.email, // sender address
            to: validateUserEmail.data.email, // list of recipients,
            subject: 'Your AI Generated Trip Plan', // subject line
            // text: validateUserInput.data.msg, // plain text body
            // html: '<b>Hello world?</b>', // HTML body
            html: Template(plan), // HTML body
        });
        if (emailSend) {
            return { error: { errorStatus: false } };
        } else {
            return {
                error: {
                    errorStatus: true,
                    errorGeneric:
                        'Failed to send message. Please try again later.',
                },
            };
        }

        return {
            error: {
                errorState: false,
            },
        };
    } catch (err) {
        console.log('Error during emailing plan:', err);
        return {
            error: {
                errorState: true,
                errorGeneric: 'Uknown error. Please try again.',
            },
        };
    }
}
