import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    console.log('ミドルウェア - セッショントークン:', req.nextauth.token);
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log('認証コールバック - トークン:', token);
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    '/api/customers/:path*',
    '/api/projects/:path*',
    '/api/tasks/:path*',
    '/customers/:path*',
    '/projects/:path*',
    '/tasks/:path*',
  ],
}; 