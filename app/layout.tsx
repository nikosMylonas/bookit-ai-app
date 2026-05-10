import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { attributes } from '@/config/attr';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Welcome from '@/components/Welcome';
import { Toaster } from 'sonner';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: attributes.home.title,
    description: attributes.home.description,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <Header />
                <Welcome />
                {children}
                <Footer />
                <Toaster position="top-center" richColors />
            </body>
        </html>
    );
}
