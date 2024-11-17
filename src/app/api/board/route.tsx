import { cookies } from "next/headers";
import { connectDb } from "../../db/connectDb";
import { UserModel } from "../../models/userModel";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";
import { BoardModel, validateBoard } from "../../models/boardModel";


export const dynamic = 'auto';

export async function GET(req: any, route: any) {

    try {
        await connectDb();
        const data = await BoardModel.find({})
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
    const validBody = validateBoard(bodyData);
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
        const board = new BoardModel(bodyData);
        board.userId = user._id;
        board.userName = user.name;
        board.date = Date.now();
        await board.save();

        return NextResponse.json(board, { status: 201 })
    }
    catch (err: any) {
        if (err.code == 11000) {
            return NextResponse.json({ code: 11000, msg: "There alredy user with that email" }, { status: 400 })
        }
        console.log(err);
        return NextResponse.json({ err, msg: "There problem try again later" }, { status: 502 })
    }

} 