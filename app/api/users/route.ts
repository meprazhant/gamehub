import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword, verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        // Verify auth
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token');
        if (!token || !verifyToken(token.value)) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json(
                { success: false, error: 'Please provide username and password' },
                { status: 400 }
            );
        }

        // Check if user exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return NextResponse.json(
                { success: false, error: 'Username already exists' },
                { status: 400 }
            );
        }

        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            username,
            password: hashedPassword,
        });

        return NextResponse.json({ success: true, data: { username: user.username } }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
