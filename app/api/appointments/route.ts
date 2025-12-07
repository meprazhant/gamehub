import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Appointment from '@/models/Appointment';

export async function GET() {
    try {
        await dbConnect();
        const appointments = await Appointment.find({}).sort({ date: -1 });
        return NextResponse.json({ success: true, data: appointments });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const appointment = await Appointment.create(body);
        return NextResponse.json({ success: true, data: appointment }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}
