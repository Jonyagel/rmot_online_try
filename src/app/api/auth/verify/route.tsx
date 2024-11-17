// src/app/api/auth/verify/route.ts
import { NextResponse } from 'next/server';
import { connectDb } from '@/src/app/db/connectDb';
import { UserModel } from '@/src/app/models/userModel';
import jwt from 'jsonwebtoken';

// סימון הנתיב כדינמי
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { message: 'לא נמצא טוקן אימו��' },
        { status: 400 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
    await connectDb();

    const user = await UserModel.findOneAndUpdate(
      { email: decoded.email },
      { verified: true },
      { new: true }
    );

    if (!user) {
      return NextResponse.json(
        { message: 'לא נמצא משתמש' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'המשתמש אומת בהצלחה' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { message: 'שגיאה באימות המשתמש' },
      { status: 500 }
    );
  }
}