import { connectDb } from "@/src/app/db/connectDb";
import { UserModel, validateLogin } from "@/src/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
import { generateToken } from "@/src/app/lib/auth";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  }
}

export async function GET(req: any, route: any) {
  try {
    return NextResponse.json({ msg: 'its login work' })
  }
  catch (err) {
    console.log(err);
    return NextResponse.json({ err, msg: "There problem try again later" }, { status: 502 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const bodyData: LoginRequest = await req.json();
    const validBody = validateLogin(bodyData);
    
    if (validBody.error) {
      return NextResponse.json(
        { message: validBody.error.details[0].message },
        { status: 400 }
      );
    }
    
    await connectDb();
    const user = await UserModel.findOne({ email: bodyData.email });
    
    if (!user) {
      return NextResponse.json(
        { message: "משתמש לא קיים" },
        { status: 401 }
      );
    }

    const validPassword = await bcrypt.compare(bodyData.password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "סיסמה שגויה" },
        { status: 401 }
      );
    }

    const token = generateToken(user._id);
    
    // Set HTTP-only cookie
    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    });

    const response: LoginResponse = {
      message: "התחברת בהצלחה",
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email
      }
    };

    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: "אירעה שגיאה בהתחברות" },
      { status: 500 }
    );
  }
}

const createToken = (user_id: any, role: String) => {
  const token = jwt.sign({ _id: user_id, role }, "jonySecret", { expiresIn: "24h" })
  return token;
}