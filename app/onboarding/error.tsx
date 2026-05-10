'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';

export default function ErrorPage({
    error,
    unstable_retry,
}: {
    error: Error & { digest?: string };
    unstable_retry: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <main>
            <div className="div-container pt-8 min-h-screen">
                <div className="max-w-xl lg:max-w-4xl mx-auto">
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-2xl text-center mb-4">
                            Something went wrong!
                        </h2>
                        <button
                            className="bg-muted px-3 py-2 rounded-lg hover:bg-muted/60 hover:cursor-pointer"
                            onClick={
                                // Attempt to recover by re-fetching and re-rendering the segment
                                () => unstable_retry()
                            }
                        >
                            Try again
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
