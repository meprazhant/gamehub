import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import HallOfShame from '@/models/HallOfShame';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await request.json();

        const entry = await HallOfShame.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!entry) {
            return NextResponse.json({ success: false, error: 'Entry not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: entry });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const deletedEntry = await HallOfShame.deleteOne({ _id: id });

        if (!deletedEntry) {
            return NextResponse.json({ success: false, error: 'Entry not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}
