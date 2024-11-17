// src/app/api/auth/verify/route.ts
import { connectDb } from '../../../db/connectDb';
import { UserModel } from "../../../models/userModel";
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Token is missing' }, { status: 400 });
    }

    await connectDb();

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
    
    // Find and update user
    const user = await UserModel.findOneAndUpdate(
      { email: decoded.email },
      { 
        $set: { 
          verified: true,
          verificationToken: null 
        }
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Redirect to success page
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-success`);

  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }
}