// src/app/api/auth/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json(
      { message: 'לא מחובר' },
      { status: 401 }
    );
  }

  try {
    verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch {
    return NextResponse.json(
      { message: 'טוקן לא תקין' },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: [
    '/api/user/:path*',
    '/api/protected/:path*'
  ]
};