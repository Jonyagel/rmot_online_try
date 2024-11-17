// src/app/api/auth/signup/route.tsx
import { NextResponse } from 'next/server';
import { connectDb } from '../../../db/connectDb';
import { UserModel } from "../../../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req: Request): Promise<Response> {
  try {
    const { name, email, password, provider } = await req.json();
    
    // אם המשתמש מנסה להתחבר עם גוגל
    if (provider === 'google') {
      // מעביר את המשתמש לדף ההתחברות של גוגל
      return NextResponse.redirect(new URL('/api/auth/signin/google', req.url));
    }
    
    await connectDb();

    // בודק אם המשתמש קיים
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'האימייל כבר קיים במערכת' },
        { status: 400 }
      );
    }

    // מצפין את הסיסמה
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // יוצר טוקן אימות
    const verificationToken = jwt.sign(
      { email },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    // יוצר משתמש חדש
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      verified: false,
      verificationToken
    });

    return NextResponse.json({ 
      message: 'User created successfully',
      token: verificationToken 
    });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'שגיאה בהרשמה' },
      { status: 500 }
    );
  }
}
