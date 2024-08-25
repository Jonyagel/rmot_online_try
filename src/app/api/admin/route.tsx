import { NextResponse } from "next/server";
import { connectDb } from "../../db/connectDb";
import { UserModel, validateUser } from "@/src/app/models/userModel";
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

export async function GET(req: any, route: any) {
  // לבדוק שבכלל נשלח קוקיס עם קיי בשם טוקן
  if (!cookies().has("token")) {
    return NextResponse.json({ msg: "You need send token" }, { status: 401 })
  }
  try {
    const token: any = cookies().get("token")?.value;
    const decodeToken: any = jwt.verify(token, "jonySecret")
    return NextResponse.json(decodeToken)
  }
  catch (err) {
    console.log(err);
    return NextResponse.json({ err, msg: "There problem try again later" }, { status: 502 })
  }

}