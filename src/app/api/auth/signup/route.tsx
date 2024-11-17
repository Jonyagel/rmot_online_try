// src/app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import { connectDb } from '../../../db/connectDb';
import { UserModel } from "../../../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { signIn } from 'next-auth/react';

export async function POST(req: Request): Promise<Response> {
  try {
    const { name, email, password, provider } = await req.json();
    
    if (provider === 'google') {
      return await signIn('google', { 
        callbackUrl: '/prfile'
      });
    }
    
    await connectDb();

    // בדיקה אם המשתמש קיים
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'האימייל כבר קיים במערכת' },
        { status: 400 }
      );
    }

    // הצפנת הסיסמה
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // יצירת טוקן אימות
    const verificationToken = jwt.sign(
      { email },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    // יצירת משתמש חדש
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      verified: false,
      verificationToken
    });

    // Return token with response for email sending
    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      token: verificationToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'שגיאה בהרשמה' },
      { status: 500 }
    );
  }
}
