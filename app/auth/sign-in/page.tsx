import SignInForm from '@/components/forms/SignInForm';
import { attributes } from '@/config/attr';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: attributes.signIn.title,
    description: attributes.signIn.description,
};

export default async function SignInPage() {
    return (
        <main>
            <div className="div-container pt-8">
                <div className="h-screen flex flex-col items-center justify-center">
                    <div className="max-w-md w-full">
                        <SignInForm />
                    </div>
                    <p className="max-w-md w-full mt-6 text-foreground text-center">
                        If you don&apos;t have already an account please create
                        one by{' '}
                        <Link href="/auth/sign-up" className="link">
                            Signing Up
                        </Link>
                        !
                    </p>
                </div>
            </div>
        </main>
    );
}
