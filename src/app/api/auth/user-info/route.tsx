// route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDb } from '../../../db/connectDb';
import { UserModel } from "../../../models/userModel";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId(userId: any): unknown;
  _id: string;
  email: string;
}

interface ErrorResponse {
  error: string;
  details?: any;
}

export async function GET(req: NextRequest) {
  try {
    // 1. בדיקת טוקן
    const tokenCookie = cookies().get("token");
    
    if (!tokenCookie?.value) {
      return NextResponse.json<ErrorResponse>(
        { error: "לא נמצא טוקן הזדהות" },
        { status: 401 }
      );
    }

    // 2. התחברות למסד נתונים
    await connectDb();

    // 3. אימות הטוקן
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(
        tokenCookie.value, 
        process.env.JWT_SECRET || "jonySecret"
      ) as JwtPayload;
    } catch (jwtError) {
      console.error("JWT Verification failed:", jwtError);
      return NextResponse.json<ErrorResponse>(
        { error: "טוקן לא תקין או פג תוקף" },
        { status: 403 }
      );
    }

    // 4. שליפת נתוני משתמש
    const user = await UserModel.findById(decoded.userId)
    //   .select('-password -resetToken -resetTokenExpiry')
    //   .lean();

    if (!user) {
      return NextResponse.json<ErrorResponse>(
        { error: "משתמש לא נמצא במערכת" , details: decoded },
        { status: 404 }
      );
    }

    // 5. החזרת המידע
    return NextResponse.json(user);

  } catch (error) {
    // 6. טיפול בשגיאות
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