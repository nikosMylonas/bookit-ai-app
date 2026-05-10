'use client';

import { attributes } from '@/config/attr';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function NavBarMobileBtn() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <div className="w-full md:hidden">
            <button
                className="p-2"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
                {isMobileMenuOpen ? (
                    <X
                        size={26}
                        className="absolute top-4 left-[77%] sm:left-[87%] z-100"
                    />
                ) : (
                    <Menu size={26} />
                )}
            </button>
            {isMobileMenuOpen && (
                <div className="w-full min-h-24 mx-auto p-6 mr-2">
                    <div className="absolute top-0 left-0 w-full">
                        <div className="w-full flex flex-col bg-card/80 z-100 py-8">
                            <Link
                                href={attributes.onboarding.path}
                                onClick={() =>
                                    setIsMobileMenuOpen((prev) => !prev)
                                }
                            >
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="hover:cursor-pointer"
                                >
                                    {attributes.onboarding.name}
                                </Button>
                            </Link>
                            <Link
                                href={attributes.profile.path}
                                onClick={() =>
                                    setIsMobileMenuOpen((prev) => !prev)
                                }
                            >
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="hover:cursor-pointer"
                                >
                                    {attributes.profile.name}
                                </Button>
                            </Link>
                            <Link
                                href={attributes.plan.path}
                                onClick={() =>
                                    setIsMobileMenuOpen((prev) => !prev)
                                }
                            >
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="hover:cursor-pointer"
                                >
                                    {attributes.plan.name}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
