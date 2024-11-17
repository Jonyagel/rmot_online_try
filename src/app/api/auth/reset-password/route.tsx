// src/app/api/auth/reset-password/route.ts
import { NextResponse } from 'next/server';
import { connectDb } from '@/src/app/db/connectDb';
import { UserModel } from '@/src/app/models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic';

interface DecodedToken {
  email: string;
  id: string;
}

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
    
    await connectDb();
    const user = await UserModel.findOne({ email: decoded.email });

    if (!user) {
      return NextResponse.json({ message: 'משתמש לא נמצא' }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({ message: 'הסיסמה שונתה בהצלחה' });
  } catch (error) {
    return NextResponse.json(
      { message: 'קישור לא תקין או שפג תוקפו' },
      { status: 400 }
    );
  }
}
