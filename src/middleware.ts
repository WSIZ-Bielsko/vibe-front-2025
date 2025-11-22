import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const session = request.cookies.get('session')?.value;
    const isProtectedRoute =
        request.nextUrl.pathname.startsWith('/bmi') ||
        request.nextUrl.pathname.startsWith('/drive') ||
        request.nextUrl.pathname === '/';

    if (isProtectedRoute && !session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/bmi', '/drive'],
};
