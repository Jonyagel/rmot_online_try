// src/app/api/auth/reset-password/route.ts
import { NextResponse } from 'next/server';
import { connectDb } from '../../../db/connectDb';
import { UserModel } from '../../../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  email: string;
  id: string;
}

export async function POST(req: Request) {
  try {
    await connectDb();
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { message: 'חסרים פרטים נדרשים' },
        { status: 400 }
      );
    }

    // אימות הטוקן
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    // מציאת המשתמש לפי הטוקן
    const user = await UserModel.findOne({
      email: decoded.email,
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() }
    });

    if (!user) {
      return NextResponse.json(
        { message: 'קישור לא תקין או שפג תוקפו' },
        { status: 404 }
      );
    }

    // הצפנת הסיסמה החדשה
    const hashedPassword = await bcrypt.hash(password, 12);

    // עדכון המשתמש
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'הסיסמה שונתה בהצלחה'
    });

  } catch (error: any) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { message: error.message || 'שגיאה באיפוס הסיסמה' },
      { status: 500 }
    );
  }
}