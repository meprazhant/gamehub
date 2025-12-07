import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import HallOfShame from '@/models/HallOfShame';

export async function GET() {
    try {
        await dbConnect();
        const entries = await HallOfShame.find({}).sort({ date: -1 });
        return NextResponse.json({ success: true, data: entries });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const entry = await HallOfShame.create(body);
        return NextResponse.json({ success: true, data: entry }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}
