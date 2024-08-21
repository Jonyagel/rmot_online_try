import { cookies } from "next/headers";
import { connectDb } from "../../db/connectDb";
import { UserModel } from "../../models/userModel";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";
import { GmachModel, validateGmach } from "../../models/gmachModel";


export const dynamic = 'auto';

export async function GET(req: any, route: any) {
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get('category') || '';
    const searchExp = new RegExp(searchQuery, "i")
    try {
        await connectDb();
        const data = await GmachModel.find({category: searchExp})
            // .sort({ createdAt: -1 })
            // .limit(perPage)
            // .skip(page * perPage)
        return NextResponse.json(data);
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({ err, msg: "There problem try again later" }, { status: 502 })
    }
}


export async function POST(req: any, route: any) {
    const bodyData = await req.json();
    const validBody = validateGmach(bodyData);
    if (validBody.error) {
        return NextResponse.json(validBody.error.details, { status: 400 })
    }
    if (!cookies().has("token")) {
        return NextResponse.json({ msg: "You need send token" }, { status: 401 })
    }
    try {
        await connectDb();
        const token: any = cookies().get("token")?.value;
        const decodeToken: any = jwt.verify(token, "jonySecret")
        const user = await UserModel.findOne({ _id: decodeToken._id }, { password: 0 });
        const gmach = new GmachModel(bodyData);
        gmach.userId = user._id;
        gmach.userName = user.name;
        gmach.date = Date.now();
        await gmach.save();

        return NextResponse.json(gmach, { status: 201 })
    }
    catch (err: any) {
        if (err.code == 11000) {
            return NextResponse.json({ code: 11000, msg: "There alredy user with that email" }, { status: 400 })
        }
        console.log(err);
        return NextResponse.json({ err, msg: "There problem try again later" }, { status: 502 })
    }

} 