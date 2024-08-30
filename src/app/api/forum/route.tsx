import { NextResponse } from "next/server";
import { connectDb } from "../../db/connectDb";
import { ForumModel, validateForum } from "@/src/app/models/forumModel";
import { cookies } from "next/headers";
import { UserModel } from "@/src/app/models/userModel";
import jwt from 'jsonwebtoken';
import { CommentsForumModel } from "../../models/commentForumModel";


export const dynamic = 'auto';

export async function GET(req: any, route: any) {
    const { searchParams } = new URL(req.url);
    const topicQuery = searchParams.get('topic') || '';
    const pageQuery = searchParams.get('page');
    const perPage = 10;
    const page = pageQuery ? parseInt(pageQuery) : 1;
    const searchQuery = searchParams.get('search') || '';
    const searchExp = new RegExp(searchQuery, "i")

    try {
        await connectDb();

        // בניית אובייקט החיפוש
        let searchObject:any = {};
        if (searchQuery) {
            searchObject.$or = [{ title: searchExp }, { description: searchExp }];
        }
        if (topicQuery) {
            searchObject.topic = topicQuery;
        }

        // חישוב מספר המסמכים הכולל לפי החיפוש
        const totalDocuments = await ForumModel.countDocuments(searchObject);

        // ביצוע החיפוש עם הסינון
        const data = await ForumModel.find(searchObject)
            .sort({ createdAt: -1 })
         //   .skip((page - 1) * perPage)
            .limit((page - 1) * perPage);

        return NextResponse.json({
            data,
            totalPages: Math.ceil(totalDocuments / perPage),
            currentPage: page,
            totalDocuments: totalDocuments
        });
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({ err, msg: "There was a problem, try again later" }, { status: 502 })
    }
}

export async function POST(req: any, route: any) {
    const bodyData = await req.json();
    const validBody = validateForum(bodyData);
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
        const forum = new ForumModel(bodyData);
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



// export async function GET(req: any, route: any) {
//     const { searchParams } = new URL(req.url);
//     const topicQuery = searchParams.get('topic') || '';
//     const pageQuery = searchParams.get('page');
//     const perPage = 10;
//     const page = pageQuery ? parseInt(pageQuery) : 1;
//     const searchQuery = searchParams.get('search') || '';
//     const searchExp = new RegExp(searchQuery, "i")
//     // route.setHeader('Access-Control-Allow-Origin', '*');
//     try {
//         await connectDb();
//         const totalDocuments = await ForumModel.countDocuments();

//         const data = await ForumModel.find({ $or: [{ title: searchExp }, { description: searchExp } , {topic: topicQuery}] })
//             .sort({ createdAt: -1 })
//             .limit(perPage * page)
//             return NextResponse.json({ data, totalPages: totalDocuments, });
//     }
//     catch (err) {
//         console.log(err);
//         return NextResponse.json({ err, msg: "There problem try again later" }, { status: 502 })
//     }
// }