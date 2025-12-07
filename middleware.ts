import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define paths that are protected
    const isProtectedPath = path.startsWith('/admin');

    // Define paths that are public (within the protected area)
    const isPublicPath = path === '/admin/login';

    const token = request.cookies.get('auth_token')?.value || '';

    if (isProtectedPath && !isPublicPath && !token) {
        return NextResponse.redirect(new URL('/admin/login', request.nextUrl));
    }

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/admin', request.nextUrl));
    }
}

export const config = {
    matcher: [
        '/admin/:path*',
    ],
};
