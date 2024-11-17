// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { connectDb } from '../../../db/connectDb';
import { UserModel } from "../../../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    
    await connectDb();

    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'אימייל או סיסמה שגויים' },
        { status: 401 }
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: 'אימייל או סיסמה שגויים' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    if (!cookies().has("token")) {
      const cookieTime = Date.now() + (1000 * 60 * 60 * 24)
      cookies().set("token", token, {
        expires: cookieTime
      })
    }

    return NextResponse.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'שגיאה בהתחברות' },
      { status: 500 }
    );
  }
}