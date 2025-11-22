import { cookies } from 'next/headers';

type UserCredentials = {
    username: string;
    passphrase: string;
};

const allowedUsers: UserCredentials[] = [
    { username: 'admin', passphrase: 'admin123' },
    { username: 'user', passphrase: 'user456' },
];

export function verifyCredentials(username: string, passphrase: string): boolean {
    return allowedUsers.some(
        (user) => user.username === username && user.passphrase === passphrase
    );
}

export async function setSession(username: string) {
    const cookieStore = await cookies();
    cookieStore.set('session', username, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
    });
}

export async function getSession(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get('session')?.value;
}

export async function clearSession() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
}
