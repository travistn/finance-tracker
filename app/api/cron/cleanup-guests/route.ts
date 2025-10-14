import { NextResponse } from 'next/server';
import { cleanupExpiredGuests } from '@/lib/cleanupExpiredGuests';

export const GET = async () => {
  try {
    const cleanup = await cleanupExpiredGuests();
    NextResponse.json(cleanup, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' });
  }
};
