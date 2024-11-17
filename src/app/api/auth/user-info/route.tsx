// route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDb } from '../../../db/connectDb';
import { UserModel } from "../../../models/userModel";
import jwt from "jsonwebtoken";

// Mark route as dynamic to handle cookies
export const dynamic = 'force-dynamic';

interface JwtPayload {
  _id: string;
  email: string;
}

interface ErrorResponse {
  error: string;
  details?: any;
}

export async function GET(req: NextRequest) {
  try {
    // 1. Check token
    const tokenCookie = cookies().get("token");
    
    if (!tokenCookie?.value) {
      return NextResponse.json<ErrorResponse>(
        { error: "לא נמצא טוקן הזדהות" },
        { status: 401 }
      );
    }

    // 2. Connect to DB
    await connectDb();

    // 3. Verify token
    const decoded = jwt.verify(tokenCookie.value, process.env.JWT_SECRET!) as JwtPayload;
    
    // 4. Get user data
    const user = await UserModel.findOne({ _id: decoded._id }, { password: 0 });
    
    if (!user) {
      return NextResponse.json<ErrorResponse>(
        { error: "משתמש לא נמצא" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json<ErrorResponse>(
      { 
        error: "שגיאת שרת",
        details: process.env.NODE_ENV === 'development' ? error : undefined 
      },
      { status: 500 }
    );
  }
}
