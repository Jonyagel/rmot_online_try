import { connectDb } from "@/src/app/db/connectDb";
import { ForumModel } from "@/src/app/models/forumModel";
import { NextResponse } from "next/server";

export async function GET(req: any, route: any) {
    try {
        await connectDb();

        const topics = await ForumModel.distinct("topic");

        return NextResponse.json({ topics });
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({ err, msg: "There was a problem, try again later" }, { status: 502 })
    }
}