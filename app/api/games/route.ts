import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Game from '@/models/Game';

export async function GET() {
    try {
        await dbConnect();
        const games = await Game.find({}).sort({ name: 1 });
        return NextResponse.json({ success: true, data: games });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        // Ensure key is slugified if not provided or just to be safe
        if (body.name && !body.key) {
            body.key = body.name.toLowerCase().replace(/\s+/g, '');
        }

        const game = await Game.create(body);
        return NextResponse.json({ success: true, data: game }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}
