'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import {
    getAuthCookie,
    removeAuthCookie,
    setAuthCookie,
    signAuthToken,
} from '@/lib/auth/auth';
import {
    signinSchema,
    signupSchema,
    updateUserNameSchema,
    updateUserPasswordSchema,
} from '@/utils/validation';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';

// Use a custom JWT auth instead of Better Auth by Neon DB!!!
// Use the Job Tracker App as a model!!!

export async function registerUser(prevState: unknown, formData: FormData) {
    const inputUser = Object.fromEntries(formData.entries());

    // Validate user input:
    const validateUser = signupSchema.safeParse(inputUser);

    if (!validateUser.success) {
        const fieldErrors = validateUser.error;
        const flattenedErrors = z.flattenError(fieldErrors);

        return {
            error: {
                errorState: true,
                errorName: flattenedErrors.fieldErrors?.name,
                errorEmail: flattenedErrors.fieldErrors?.email,
                errorPassword: flattenedErrors.fieldErrors?.password,
                errorConfirmPassword:
                    flattenedErrors.fieldErrors?.confirmPassword,
            },
        };
    }

    // Check if email address already exists in DB - Email must be unique:
    try {
        const emailExists = await prisma.user.findUnique({
            where: { email: validateUser.data.email },
        });

        if (emailExists) {
            return {
                error: {
                    errorState: true,
                    errorUniqueEmail:
                        'The provided email already exists. Please provide another email.',
                },
            };
        }
    } catch (err) {
        console.log('Error fetching Unique Email during Sign Up:', err);
        return {
            error: {
                errorState: true,
                errorGeneric: 'Uknown error. Please try again.',
            },
        };
    }

    // On valid input (user credentials), hash the password:
    const hash = await bcrypt.hash(validateUser.data.password, 10);

    // Create entry in DB for new user:
    try {
        await prisma.user.create({
            data: {
                name: validateUser.data.name,
                email: validateUser.data.email,
                password: hash,
            },
        });

        return {
            error: { errorState: false },
        };
    } catch (err) {
        console.log('Error during user registration:', err);

        return {
            error: {
                errorState: true,
                errorGeneric: 'Uknown error. Please try again.',
            },
        };
    }
}

export async function loginUser(prevState: unknown, formData: FormData) {
    const inputUser = Object.fromEntries(formData.entries());

    // Validate user input:
    const validateUser = signinSchema.safeParse(inputUser);

    if (!validateUser.success) {
        return {
            error: {
                errorState: true,
                errorValidation: 'Invalid Credentials. Please try again!',
            },
        };
    }

    try {
        // Fetch user password from database:
        const user = await prisma.user.findUnique({
            where: { email: validateUser.data.email },
            select: { id: true, password: true },
        });

        if (user) {
            // Compare provided password with hashed password in DB:
            const isCorrectPassword = await bcrypt.compare(
                validateUser.data.password,
                user.password,
            );

            if (!isCorrectPassword) {
                return {
                    error: {
                        errorState: true,
                        errorLogin: 'Invalid credentials. Please try again!',
                    },
                };
            }
        } else {
            return {
                error: { errorState: true, errorUser: 'User not found.' },
            };
        }

        // Create session for user:
        const token = await signAuthToken({ userId: user.id });
        await setAuthCookie(token);
        return {
            error: {
                errorState: false,
            },
        };
    } catch (err) {
        console.log('Error during user login:', err);

        return {
            error: {
                errorState: true,
                errorGeneric: 'Error during sign in. Please try again.',
            },
        };
    }
}

export async function logoutUser() {
    // Confirm user exists.
    const user = await getCurrentUser();

    if (!user) {
        redirect('/auth/sign-in');
    }

    // Retrieve cookie:
    const cookie = await getAuthCookie();

    if (!cookie) return { error: 'No JWT cookie found' };

    await removeAuthCookie();

    redirect('/auth/sign-in');
}

export async function updateUserName(prevState: unknown, formData: FormData) {
    // Confirm user exists.
    const user = await getCurrentUser();

    if (!user) {
        redirect('/auth/sign-in');
    }

    const inputName = Object.fromEntries(formData.entries());

    // Validate name:
    const validateName = updateUserNameSchema.safeParse(inputName);

    if (!validateName.success) {
        const fieldErrors = validateName.error;
        const flattenedErrors = z.flattenError(fieldErrors);

        return {
            error: {
                errorState: true,
                errorName: flattenedErrors.fieldErrors?.name,
            },
        };
    }

    try {
        const updateName = await prisma.user.update({
            where: { id: user.id },
            data: { name: validateName.data.name },
        });

        if (!updateName) {
            return {
                error: {
                    errorState: true,
                    errorName: 'Your name was not updated. Please try again.',
                },
            };
        }

        return { error: { errorState: false } };
    } catch (err) {
        console.log('Error during User Name Update:', err);

        return {
            error: {
                errorState: true,
                errorGeneric: 'Uknown error. Please try again.',
            },
        };
    }
}

export async function updateUserPassword(
    prevState: unknown,
    formData: FormData,
) {
    // Confirm user exists.
    const user = await getCurrentUser();

    if (!user) {
        redirect('/auth/sign-in');
    }

    const inputData = Object.fromEntries(formData.entries());

    // Validate password:
    const validateData = updateUserPasswordSchema.safeParse(inputData);

    if (!validateData.success) {
        const fieldErrors = validateData.error;
        const flattenedErrors = z.flattenError(fieldErrors);

        return {
            error: {
                errorState: true,
                errorCurrentPassword:
                    flattenedErrors.fieldErrors?.currentPassword,
                errorNewPassword: flattenedErrors.fieldErrors?.newPassword,
                errorConfirmNewPassword:
                    flattenedErrors.fieldErrors?.confirmNewPassword,
            },
        };
    }

    // Check current password against user's password in DB:
    try {
        const userCurrentPassword = await prisma.user.findUnique({
            where: { id: user.id },
            select: { password: true },
        });

        if (!userCurrentPassword) {
            return {
                error: {
                    errorState: true,
                    errorUser: 'User Password not found.',
                },
            };
        }

        // Compare provided current password with hashed current password in DB:
        const isCorrectPassword = await bcrypt.compare(
            validateData.data.currentPassword,
            userCurrentPassword.password,
        );

        if (!isCorrectPassword) {
            return {
                error: {
                    errorState: true,
                    errorCompareCurrentPassword:
                        'Invalid current password. Please try again!',
                },
            };
        }

        // On valid input (user current password), hash the new password:
        const hash = await bcrypt.hash(validateData.data.newPassword, 10);

        // Update the database:
        const updatePassword = await prisma.user.update({
            where: { id: user.id },
            data: { password: hash },
        });

        if (!updatePassword) {
            return {
                error: {
                    errorState: true,
                    errorNewPassword:
                        'Your password was not updated. Please try again.',
                },
            };
        }
        return { error: { errorState: false } };
    } catch (err) {
        console.log('Error during User Name Update:', err);

        return {
            error: {
                errorState: true,
                errorGeneric: 'Uknown error. Please try again.',
            },
        };
    }
}

export async function deleteUser(prevState: unknown, formData: FormData) {
    // Confirm user exists.
    const user = await getCurrentUser();

    if (!user) {
        redirect('/auth/sign-in');
    }

    // Retrieve cookie:
    const cookie = await getAuthCookie();

    if (!cookie) return { error: { errorGeneric: 'No JWT cookie found' } };

    const inputUser = Object.fromEntries(formData.entries());

    // Validate user input:
    const validateUser = signinSchema.safeParse(inputUser);

    if (!validateUser.success) {
        return {
            error: {
                errorState: true,
                errorValidation: 'Invalid Credentials. Please try again!',
            },
        };
    }

    try {
        // Fetch user password from database:
        const userCredentials = await prisma.user.findUnique({
            where: { id: user.id },
            select: { email: true, password: true },
        });

        if (!userCredentials) {
            return {
                error: {
                    errorState: true,
                    errorUser: 'User credentials not found.',
                },
            };
        }

        // Check user input password against DB hash value:
        const isCorrectPassword = await bcrypt.compare(
            validateUser.data.password,
            userCredentials.password,
        );

        if (
            validateUser.data.email !== userCredentials.email ||
            !isCorrectPassword
        ) {
            return {
                error: {
                    errorState: true,
                    errorCredentials:
                        'Invalid user credentials. Please try again!',
                },
            };
        }

        // Delete entry from TripProfile and Plans in DB, associated with this user ID:
        const plans = await prisma.plans.findMany({
            where: { userId: user.id },
        });

        if (plans) {
            await prisma.plans.deleteMany({ where: { userId: user.id } });
        }

        const tripProfile = await prisma.tripProfile.findUnique({
            where: { userId: user.id },
        });

        if (tripProfile) {
            await prisma.tripProfile.delete({ where: { userId: user.id } });
        }

        // Delete user:
        const isUserDeleted = await prisma.user.delete({
            where: { id: user.id },
        });

        if (!isUserDeleted) {
            return {
                error: {
                    errorState: true,
                    errorUserDeleted: 'User was not deleted. Please try again!',
                },
            };
        }

        await removeAuthCookie();
        return { error: { errorState: false } };
    } catch (err) {
        console.log('Error during User Delete:', err);
        return {
            error: {
                errorState: true,
                errorGeneric: 'Uknown error. Please try again.',
            },
        };
    }
}
