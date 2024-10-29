import { cookies } from "next/headers";
import { connectDb } from "../../../db/connectDb";
import { UserModel } from "../../../models/userModel";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

export async function PUT(req: any) {
    const bodyData = await req.json();
    if (!cookies().has("token")) {
        return NextResponse.json({ msg: "You need to send a token" }, { status: 401 });
    }
    
    try {
        await connectDb();
        const token: any = cookies().get("token")?.value;
        const decodeToken: any = jwt.verify(token, "jonySecret");
        const user = await UserModel.findOne({ _id: decodeToken._id }, { password: 0 });

        // עדכון הערך favoriteShope
        const updatedUser = await UserModel.findByIdAndUpdate(
            user._id, // מזהה המשתמש שצריך לעדכן
            { $addToSet: { favoriteShope: bodyData.shopId } }, // הוספת ה-ID של החנות למערך
            { new: true } // מחזיר את המסמך המעודכן
        );

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ err, msg: "There was a problem, try again later" }, { status: 502 });
    }
}

export async function DELETE(req: any) {
    const bodyData = await req.json();
    if (!cookies().has("token")) {
        return NextResponse.json({ msg: "You need to send a token" }, { status: 401 });
    }

    try {
        await connectDb();
        const token: any = cookies().get("token")?.value;
        const decodeToken: any = jwt.verify(token, "jonySecret");
        const user = await UserModel.findOne({ _id: decodeToken._id }, { password: 0 });

        // עדכון הערך favoriteShope
        const updatedUser = await UserModel.findByIdAndUpdate(
            user._id,
            { $pull: { favoriteShope: bodyData.shopId } }, // הסרת ה-ID של החנות מהמועדפים
            { new: true }
        );

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ err, msg: "There was a problem, try again later" }, { status: 502 });
    }
}