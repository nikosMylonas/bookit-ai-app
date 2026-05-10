import { NextRequest, NextResponse } from 'next/server';
import { getAuthCookie } from './lib/auth/auth';

export default async function proxy(req: NextRequest) {
    const tokenValue = await getAuthCookie();
    const baseProtectedPage = process.env.BASE_PROTECTED_URL || '/onboarding';
    const basePublicPage = process.env.BASE_PUBLIC_URL || '/';
    const isSignInPage = req.nextUrl.pathname.startsWith('/auth/sign-in');
    const isSignUpPage = req.nextUrl.pathname.startsWith('/auth/sign-up');

    // If user is loged in don't allow sign-in and sign-up pages.
    // Instead, redirect to base protected page.
    if ((isSignInPage || isSignUpPage) && tokenValue) {
        return NextResponse.redirect(new URL(baseProtectedPage, req.url));
    }

    // If user is loged in don't allow home page.
    // Instead, redirect to base protected page.
    if (tokenValue && req.nextUrl.pathname === basePublicPage) {
        return NextResponse.redirect(new URL(baseProtectedPage, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
