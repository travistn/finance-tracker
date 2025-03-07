import connectToDatabase from '@/lib/mongoose';
import User from '@/models/User';

export const POST = async (req: Request) => {
  try {
    await connectToDatabase();

    const body = await req.json();

    const { username, email, password } = body.formData;

    const user = new User({ username, email, password });

    await user.save();
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to create user', { status: 400 });
  }
};
