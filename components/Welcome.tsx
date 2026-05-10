import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { nameFormatter } from '@/utils/helpers';

export default async function Welcome() {
    const user = await getCurrentUser();

    return (
        <>
            {user ? (
                <div className="pt-20 pb-4 text-center">
                    Welcome back{' '}
                    <span className="italic capitalize">
                        {nameFormatter(user.name)}
                    </span>
                    !
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
