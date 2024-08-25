'use server';

import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // if (token && pathname === '/' && !searchParams.toString()) {
  //   return NextResponse.redirect(new URL('/profile', req.url));
  // }

  if (!token && pathname !== '/') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ['/', '/profile', '/maintainer/:path*'] };
