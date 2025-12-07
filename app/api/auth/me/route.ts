import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');

    if (!token) {
        return NextResponse.json({ success: false, user: null }, { status: 401 });
    }

    const decoded = verifyToken(token.value);

    if (!decoded) {
        return NextResponse.json({ success: false, user: null }, { status: 401 });
    }

    return NextResponse.json({ success: true, user: decoded });
}
