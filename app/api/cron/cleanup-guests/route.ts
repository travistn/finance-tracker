import { NextResponse } from 'next/server';

import connectToDatabase from '@/lib/mongoose';
import { cleanupExpiredGuests } from '@/lib/cleanupExpiredGuests';

export const GET = async () => {
  try {
    await connectToDatabase();
    await cleanupExpiredGuests();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
};
