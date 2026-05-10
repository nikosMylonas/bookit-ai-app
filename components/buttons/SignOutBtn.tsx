'use client';

import { logoutUser } from '@/actions/authActions';
import { LogOut } from 'lucide-react';

export default function SignOutBtn() {
    return (
        <button
            onClick={logoutUser}
            className="flex items-center justify-between gap-x-2 hover:cursor-pointer text-destructive"
        >
            <LogOut />
            Sign Out
        </button>
    );
}
