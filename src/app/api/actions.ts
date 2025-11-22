'use server';

import { clearSession, getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function logout() {
    await clearSession();
    redirect('/login');
}

export async function checkSession() {
    const session = await getSession();
    return !!session;
}
