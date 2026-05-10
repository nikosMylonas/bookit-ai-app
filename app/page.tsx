import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { features } from '@/data-static/data-provider';
import { ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

export default async function HomePage() {
    return (
        <main>
            <div className="div-container pt-8">
                {/* Hero Section */}
                <section className="relative">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-linear-to-b from-accent/5 via-transparent to-transparent" />
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-200 h-200 bg-accent/10 rounded-full blur-3xl" />
                    <div className="relative max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-8 mt-16">
                            <Zap className="w-4 h-4 text-accent" />
                            <span className="text-sm text-muted">
                                AI-powered trip plans
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
                            Your Perfect
                            <br />
                            <span className="text-accent">Trip Plan</span> in
                            Seconds
                        </h1>
                        <p className="text-lg text-muted max-w-2xl mx-auto mb-10">
                            Stop searching in different apps. Get a personalized
                            trip program built by AI, tailored to your
                            destination, budget, trip preferences, and schedule.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
                            <Link href="/auth/sign-up">
                                <Button
                                    size="authLg"
                                    variant="auth"
                                    className="gap-2 hover:cursor-pointer"
                                >
                                    Get Started Free{' '}
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href="/auth/sign-in">
                                <Button
                                    variant="authSecondary"
                                    size="authLg"
                                    className="hover:cursor-pointer"
                                >
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                Why Use AI?
                            </h2>
                            <p className="text-muted text-lg max-w-2xl mx-auto">
                                We combine travel expertise with AI to create
                                programs that actually fit your expectations.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {features.map((feature, idx) => (
                                <Card
                                    key={idx}
                                    className="p-6 hover:bg-accent/20 transition-colors"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-2 hover:bg-accent/20 transition-colors">
                                        <feature.icon className="w-6 h-6 text-accent" />
                                    </div>
                                    <h3 className="font-semibold text-foreground text-lg mb-2 ">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted text-sm ">
                                        {feature.description}
                                    </p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
