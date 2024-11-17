// src/app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import { connectDb } from '../../../db/connectDb';
import { UserModel } from "../../../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req: Request): Promise<Response> {
  try {
    const { name, email, password, provider } = await req.json();
    
    // Redirect Google auth to appropriate endpoint
    if (provider === 'google') {
      return NextResponse.redirect(
        new URL('/api/auth/signin/google', req.url)
      );
    }
    
    await connectDb();

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'האימייל כבר קיים במערכת' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    const verificationToken = jwt.sign(
      { email },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      verified: false,
      verificationToken
    });

    return NextResponse.json({
      success: true,
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