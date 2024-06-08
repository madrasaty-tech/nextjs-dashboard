import { User } from '@/app/lib/definitions';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { authConfig } from './auth.config';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
const AuthCredentials = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        /*
        this function is called when authenticate action is fired, in the login form or something,
        meaning it is being called by me , not Nextjs, 
        in the other hand middleware callbacks are being called by nextjs everytime a request is made
        */
        const parsedCredentials = AuthCredentials.safeParse(credentials);
        if (parsedCredentials.success) {
          const { password, email } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        console.log('invalid credentials');

        return null;
      },
    }),
  ],
});

/* 
  solo is not here nor there, but soon, he will be everywhere 
*/
