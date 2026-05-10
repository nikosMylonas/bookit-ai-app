import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
const cookieName = 'auth-token';

// Encrypt and sign token:
export async function signAuthToken(paylod: JWTPayload | undefined) {
    try {
        const token = await new SignJWT(paylod)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('24h')
            .sign(secret);

        return token;
    } catch (err) {
        console.log('Error:', err);
        throw new Error('Token signing failed');
    }
}

// Decrypt and verify token:
export async function verifyAuthToken<T>(token: string): Promise<T> {
    try {
        const { payload } = await jwtVerify(token, secret);

        return payload as T;
    } catch (err) {
        console.log('Error:', err);
        throw new Error('Token decryption failed');
    }
}

// Set the auth cookie:
export async function setAuthCookie(token: string) {
    try {
        const cookieStore = await cookies();
        cookieStore.set(cookieName, token, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24,
            secure: process.env.NODE_ENV === 'production',
        });
    } catch (err) {
        console.log('Error:', err);
    }
}

// Get auth token from cookie:
export async function getAuthCookie() {
    const cookieStore = await cookies();
    const token = cookieStore.get(cookieName);

    return token?.value;
}

// Remove auth token cookie:
export async function removeAuthCookie() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete(cookieName);
    } catch (err) {
        console.log('Error:', err);
    }
}
