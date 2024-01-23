import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// authConfig가 여기서 NextAuth 객체를 초기화하고 auth 프로퍼티를 export함
export default NextAuth(authConfig).auth;

// matcher 옵션에 해당되는 path로 접근 시 미들웨어가 실행됨
// 장점: 미들웨어가 인증을 확인하기 전까지는 해당 경로가 렌더링을 시작하지 않음
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
