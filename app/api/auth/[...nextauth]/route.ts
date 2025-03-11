import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { compare } from 'bcryptjs';
import { randomUUID } from 'crypto';

import connectToDatabase from '@/lib/mongoose';
import User from '@/models/User';

const handler = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        await connectToDatabase();

        if (credentials?.email === 'guest') {
          const guestId = randomUUID();

          await User.create({
            email: `guest_${guestId}`,
            username: 'Guest User',
            expireAt: new Date(Date.now() + 30 * 60 * 1000),
          });
          return {
            id: guestId,
            email: `guest_${guestId}`,
            name: 'Guest User',
          };
        } else if (!credentials?.email && !credentials?.password) {
          throw new Error('Missing email and password');
        } else if (!credentials?.email) {
          throw new Error('Missing email');
        } else if (!credentials?.password) {
          throw new Error('Missing password');
        }

        const user = await User.findOne({ email: credentials?.email });

        if (!user) {
          throw new Error('No user found with this email');
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Invalid password');
        }

        return { id: user._id, email: user.email };
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        await connectToDatabase();

        if (profile) {
          const existingUser = await User.findOne({ email: profile.email });

          if (!existingUser) {
            await User.create({
              email: profile.email,
              username: profile.name,
            });
          }
        }
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
