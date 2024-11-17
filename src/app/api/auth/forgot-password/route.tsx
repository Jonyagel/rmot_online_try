// src/app/api/auth/forgot-password/route.ts
import { NextResponse } from 'next/server';
import { connectDb } from '../../../db/connectDb';
import { UserModel } from '../../../models/userModel';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    await connectDb();
    // תיקון: שליפת האימייל מה-body
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: 'נדרש אימייל' },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'משתמש לא נמצא'},
        { status: 404 }
      );
    }

    // Generate reset token
    const resetToken = jwt.sign(
      { 
        email: user.email,
        id: user._id.toString()
      },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    // Save reset token to user
    user.resetToken = resetToken;
    user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    return NextResponse.json({
      message: 'נשלח מייל לאיפוס סיסמה',
      resetToken // For testing only, should be sent via email
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { message: 'שגיאה בשליחת בקשת איפוס סיסמה' },
      { status: 500 }
    );
  }
}