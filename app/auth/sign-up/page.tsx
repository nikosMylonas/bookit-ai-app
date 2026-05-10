import SignUpForm from '@/components/forms/SignUpForm';
import { attributes } from '@/config/attr';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: attributes.signUp.title,
    description: attributes.signUp.description,
};

export default async function SignUpPage() {
    return (
        <main>
            <div className="div-container pt-8">
                <div className="h-screen flex flex-col items-center justify-center">
                    <div className="max-w-md w-full">
                        <SignUpForm />
                    </div>
                    <p className="max-w-md w-full mt-6 text-foreground text-center">
                        Already having an account? Then try to{' '}
                        <Link href="/auth/sign-in" className="link">
                            Signing In
                        </Link>
                        !
                    </p>
                </div>
            </div>
        </main>
    );
}
