import { BedDouble, Settings } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { initialsGenerator } from '@/utils/helpers';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import SignOutBtn from './buttons/SignOutBtn';
import { attributes } from '@/config/attr';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import NavBarMobileBtn from './buttons/NavBarMobileBtn';

export default async function Header() {
    const user = await getCurrentUser();

    const fallBackInitials = user?.name ? initialsGenerator(user?.name) : '';

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="relative div-container h-16 flex items-center justify-between">
                <Link
                    href={user ? '/onboarding' : '/'}
                    id="logo"
                    className="flex items-center gap-2 text-foreground"
                >
                    <BedDouble className="w-6 h-6 text-accent" />
                    <span className="font-semibold text-lg">BookIt</span>
                </Link>
                <nav>
                    {user ? (
                        <div className="flex items-center justify-between gap-x-2">
                            <div className="hidden md:block">
                                <Link href={attributes.onboarding.path}>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="hover:cursor-pointer"
                                    >
                                        {attributes.onboarding.name}
                                    </Button>
                                </Link>
                                <Link href={attributes.profile.path}>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="hover:cursor-pointer"
                                    >
                                        {attributes.profile.name}
                                    </Button>
                                </Link>
                                <Link href={attributes.plan.path}>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="hover:cursor-pointer"
                                    >
                                        {attributes.plan.name}
                                    </Button>
                                </Link>
                            </div>
                            <NavBarMobileBtn />

                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar className="hover:cursor-pointer">
                                        <AvatarImage src="" />
                                        <AvatarFallback className="bg-accent text-background">
                                            {fallBackInitials}
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        <Link
                                            href={attributes.account.path}
                                            className="flex items-center justify-between gap-x-2 hover:cursor-pointer text-muted"
                                        >
                                            <Settings />
                                            {attributes.account.name}
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <SignOutBtn />
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : (
                        <div className="space-x-2">
                            <Link href={attributes.signIn.path}>
                                <Button
                                    variant="ghost"
                                    size="authSm"
                                    className="hover:cursor-pointer"
                                >
                                    {attributes.signIn.name}
                                </Button>
                            </Link>
                            <Link href={attributes.signUp.path}>
                                <Button
                                    variant="auth"
                                    size="authSm"
                                    className="hover:cursor-pointer"
                                >
                                    {attributes.signUp.name}
                                </Button>
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}
