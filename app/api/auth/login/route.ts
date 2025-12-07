import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { comparePassword, hashPassword, signToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json(
                { success: false, error: 'Please provide username and password' },
                { status: 400 }
            );
        }

        // Auto-seed admin user if no users exist
        const userCount = await User.countDocuments();
        if (userCount === 0) {
            const hashedPassword = await hashPassword('admin');
            await User.create({
                username: 'admin',
                password: hashedPassword,
            });
            console.log('Default admin user created');
        }

        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json(
                { success: false, error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Check password
        const isMatch = await comparePassword(password, user.password!);
        if (!isMatch) {
            return NextResponse.json(
                { success: false, error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Generate token
        const token = signToken({ id: user._id, username: user.username });

        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        return NextResponse.json({ success: true, message: 'Logged in successfully' });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
