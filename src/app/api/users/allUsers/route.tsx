import { NextResponse } from "next/server";
import { UserModel, validateUser } from "@/src/app/models/userModel";
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { connectDb } from "@/src/app/db/connectDb";

export async function GET(req: any, route: any) {
    // לבדוק שבכלל נשלח קוקיס עם קיי בשם טוקן
    try {
        await connectDb();
        const data = await UserModel.find({});
        return NextResponse.json(data)
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({ err, msg: "There problem try again later" }, { status: 502 })
    }

}