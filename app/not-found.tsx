import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export default async function NotFound() {
    const user = await getCurrentUser();

    return (
        <main>
            <div className="div-container pt-20">
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <h2 className="mb-12 text-2xl font-semibold text-accent">
                        <span className="text-3xl pr-4 border-r border-r-accent">
                            404
                        </span>
                        <span className="pl-4">Not Found</span>
                    </h2>
                    <p className="mb-6 text-muted">
                        This page couldn&apos; be found.
                    </p>
                    <div>
                        <Link
                            href={user ? '/onboarding' : '/'}
                            className="link"
                        >
                            Return
                        </Link>{' '}
                        to starting page.
                    </div>
                </div>
            </div>
        </main>
    );
}
