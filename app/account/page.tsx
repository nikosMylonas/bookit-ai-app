import DeleteUserForm from '@/components/forms/DeleteUserForm';
import UpdateNameForm from '@/components/forms/UpdateNameForm';
import UpdatePasswordForm from '@/components/forms/UpdatePasswordForm';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { attributes } from '@/config/attr';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: attributes.account.title,
    description: attributes.account.description,
};

export const dynamic = 'force-dynamic';
export default async function AccountPage() {
    const user = await getCurrentUser();
    if (!user) {
        redirect(attributes.signIn.path);
    }

    return (
        <main>
            <div className="div-container pt-8 min-h-screen">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-semibold text-foreground mb-8">
                        User Profile
                    </h1>
                    <Tabs defaultValue="profile" className="max-w-md w-full">
                        <TabsList className="space-x-2 bg-accent">
                            <TabsTrigger
                                value="profile"
                                className="hover:cursor-pointer"
                            >
                                Profile
                            </TabsTrigger>
                            <TabsTrigger
                                value="security"
                                className="hover:cursor-pointer"
                            >
                                Security
                            </TabsTrigger>
                            <TabsTrigger
                                value="account"
                                className="hover:cursor-pointer"
                            >
                                Account
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="profile">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg text-foreground">
                                        Change Name
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted">
                                    <UpdateNameForm name={user.name} />
                                </CardContent>
                                <CardFooter className="bg-card text-foreground">
                                    <div>
                                        If you you want to go back without
                                        update your name, please click{' '}
                                        <Link
                                            href="/onboarding"
                                            className="link"
                                        >
                                            here
                                        </Link>
                                        .
                                    </div>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="security">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg text-foreground">
                                        Change Password
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted">
                                    <UpdatePasswordForm />
                                </CardContent>
                                <CardFooter className="bg-card text-foreground">
                                    <div>
                                        If you you want to go back without
                                        update your password, please click{' '}
                                        <Link
                                            href="/onboarding"
                                            className="link"
                                        >
                                            here
                                        </Link>
                                        .
                                    </div>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="account">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg text-foreground">
                                        Delete User
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted">
                                    <DeleteUserForm />
                                </CardContent>
                                <CardFooter className="bg-card text-foreground">
                                    <div>
                                        Please note that you{' '}
                                        <strong>can&apos;t undo</strong> this
                                        action! If you you want to go back
                                        please click{' '}
                                        <Link
                                            href="/onboarding"
                                            className="link"
                                        >
                                            here
                                        </Link>
                                        .
                                    </div>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </main>
    );
}
