// bycrpt을 통한 비밀번호 해싱을 위한 separate file 생성
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { User } from '@/app/lib/definitions';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

async function getUser(email: string): Promise<User | null> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  // credentials: 이를 통해 username과 password로 로그인이 가능함.
  // 이 배열에 Google이나 Github와 같은 다양한 로그인 옵션을 나열하여 사용 가능
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const isPasswordMatch = await bcrypt.compare(password, user.password);

          if (isPasswordMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  // 공식 문서 궈고: Credentials provider보다 일반적으로 OAuth나 email provider를 사용하길 권장한다
  // https://authjs.dev/getting-started/providers
});
