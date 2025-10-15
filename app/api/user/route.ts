import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';

import connectToDatabase from '@/lib/mongoose';
import User from '@/models/User';
import { seedUserData } from '@/lib/seedUserData';

export const POST = async (req: Request) => {
  try {
    await connectToDatabase();

    const body = await req.json();

    const { username, email, password } = body.formData;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    const hashedPassword = await hash(password, 12);

    const newUser = new User({ username, email, password: hashedPassword });

    await seedUserData(newUser._id.toString());

    if (newUser) {
      await newUser.save();
      return NextResponse.json(newUser, { status: 201 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 400 });
  }
};
