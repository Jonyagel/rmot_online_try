import { NextResponse } from "next/server";
import { ForumModel, validateForum } from "@/src/app/models/forumModel";
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { connectDb } from "@/src/app/db/connectDb";

export async function GET(req: any, route: any) {
    // לבדוק שבכלל נשלח קוקיס עם קיי בשם טוקן
    try {
        await connectDb();
        const data = await ForumModel.find({});
        return NextResponse.json(data)
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({ err, msg: "There problem try again later" }, { status: 502 })
    }

}