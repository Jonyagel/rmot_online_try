// src/app/api/auth/reset-password/route.ts
import { NextResponse } from 'next/server';
import { connectDb } from '@/src/app/db/connectDb';
import { UserModel } from '@/src/app/models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Mark route as dynamic
export const dynamic = 'force-dynamic';

interface DecodedToken {
  email: string;
  id: string;
}

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { message: 'נדרשים טוקן וסיסמה חדשה' },
        { status: 400 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    } catch (error) {
      return NextResponse.json(
        { message: 'טוקן לא תקין או שפג תוקפו' },
        { status: 401 }
      );
    }
    
    await connectDb();
    const user = await UserModel.findOne({ email: decoded.email });

    if (!user) {
      return NextResponse.json(
        { message: 'משתמש לא נמצא' },
        { status: 404 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    await user.save();

    const response = NextResponse.json(
      { message: 'הסיסמה שונתה בהצלחה' },
      { status: 200 }
    );

    // Add security headers
    response.headers.set('Cache-Control', 'no-store');
    response.headers.set('Content-Type', 'application/json');

    return response;

  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { message: 'שגיאה באיפוס הסיסמה' },
      { status: 500 }
    );
  }
}