import { NextResponse } from 'next/server';

import connectToDatabase from '@/lib/mongoose';
import { cleanupExpiredGuests } from '@/lib/cleanupExpiredGuests';

export const GET = async () => {
  try {
    await connectToDatabase();
    const cleanup = await cleanupExpiredGuests();
    return NextResponse.json(cleanup, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' });
  }
};
