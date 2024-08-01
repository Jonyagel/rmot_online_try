import { cookies } from "next/headers";
import { connectDb } from "../../db/connectDb";
import { UserModel } from "../../models/userModel";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";
import { AlertMachingNadlanModel, validateAlertMachingNadlan } from "../../models/alertMachingNadlanModel";


export const dynamic = 'auto';

export async function GET(req: any, route: any) {
    const { searchParams } = new URL(req.url);
    const roomsQuery = searchParams.get('rooms');
    const priceQuery = searchParams.get('price');
    try {
        await connectDb();
        const data = await AlertMachingNadlanModel.find({$or:[{rooms:{$gte:roomsQuery}},{price:{$lte: priceQuery}},{}]})
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
    const validBody = validateAlertMachingNadlan(bodyData);
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
        const forum = new AlertMachingNadlanModel(bodyData);
        forum.userId = user._id;
        forum.userName = user.name;
        forum.date = Date.now();
        await forum.save();

        return NextResponse.json(forum, { status: 201 })
    }
    catch (err: any) {
        if (err.code == 11000) {
            return NextResponse.json({ code: 11000, msg: "There alredy user with that email" }, { status: 400 })
        }
        console.log(err);
        return NextResponse.json({ err, msg: "There problem try again later" }, { status: 502 })
    }

} 