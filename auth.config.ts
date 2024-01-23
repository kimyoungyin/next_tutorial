import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  // next 미들웨어를 통해 페이지를 엑세스할 권한이 있는지 확인하는데 사용됨
  // request가 complete 되기 전에 호출됨
  // 콜백 함수는 auth, request 객체 prop을 받음.
  // - auth: user's session
  // - request: incoming request
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPrivatePage = nextUrl.pathname.startsWith('/dashboard');
      if (isPrivatePage) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // 당장은 일단 empty provider로
  // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html
} satisfies NextAuthConfig;
