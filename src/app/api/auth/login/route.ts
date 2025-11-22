import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials, setSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
    const { username, passphrase } = await request.json();

    if (verifyCredentials(username, passphrase)) {
        await setSession(username);
        return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ success: false }, { status: 401 });
}
