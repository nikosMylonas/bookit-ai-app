import { onboardingOptions } from '@/data-static/data-provider';
import { z } from 'zod';

export const signupSchema = z
    .object({
        name: z
            .string()
            .min(1, { error: 'Name is required' })
            .max(40, { error: 'Name must have 40 characters at most.' }),
        email: z.email({ error: 'Please provide a valid email address.' }),
        password: z
            .string()
            .min(6, {
                error: 'Passwords must be between 6 and 12 characters long.',
            })
            .max(12, {
                error: 'Passwords must be between 6 and 12 characters long.',
            }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        error: 'Passwords do not match.',
        path: ['confirmPassword'],
    });

export const signinSchema = z.object({
    email: z.email(),
    password: z.string().min(1, { error: 'Please provide your password' }),
});

export const updateUserNameSchema = z.object({
    name: z
        .string()
        .min(1, { error: 'Name is required' })
        .max(40, { error: 'Name must have 40 characters at most.' }),
});

export const updateUserPasswordSchema = z
    .object({
        currentPassword: z
            .string()
            .min(6, {
                error: 'Please provide your current password.',
            })
            .max(12, {
                error: 'Please provide your current password.',
            }),
        newPassword: z
            .string()
            .min(6, {
                error: 'Passwords must be between 6 and 12 characters long.',
            })
            .max(12, {
                error: 'Passwords must be between 6 and 12 characters long.',
            }),
        confirmNewPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        error: 'Passwords do not match.',
        path: ['confirmNewPassword'],
    });

// Trip profile Schema:

const personsEnum = z.enum(
    onboardingOptions.numberPersonsOptions.map((item) => item.value),
);
const kidsEnum = z.enum(
    onboardingOptions.numberKidsOptions.map((item) => item.value),
);
const goalEnum = z.enum(
    onboardingOptions.goalOptions.map((item) => item.value),
);
const budgetEnum = z.enum(
    onboardingOptions.budgetOptions.map((item) => item.value),
);
const primaryTicketEnum = z.enum(
    onboardingOptions.primaryTicketsOptions.map((item) => item.value),
);
const accommodationEnum = z.enum(
    onboardingOptions.accommodationOptions.map((item) => item.value),
);
const insuranceEnum = z.enum(
    onboardingOptions.insuranceOptions.map((item) => item.value),
);

export const tripProfileSchema = z.object({
    startLocation: z
        .string()
        .min(1, { error: 'Please provide a precise starting location.' }),
    destination: z
        .string()
        .min(1, { error: 'Please provide a precise destination.' }),
    fromDate: z.string(),
    toDate: z.string(),
    // persons: z.string(),
    persons: personsEnum,
    kids: kidsEnum,
    goal: goalEnum,
    budget: budgetEnum,
    primaryTicket: primaryTicketEnum,
    accommodation: accommodationEnum,
    insurance: insuranceEnum,
    comments: z.optional(
        z.string().max(400, {
            error: 'Please limit your additional notes to 400 characters.',
        }),
    ),
});

export const emailPlanSchema = z.object({
    email: z.email({ error: 'Please provide a valid email address.' }),
});
