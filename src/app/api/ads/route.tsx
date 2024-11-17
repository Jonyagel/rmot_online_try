import { cookies } from "next/headers";
import { connectDb } from "../../db/connectDb";
import { UserModel } from "../../models/userModel";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";
import { adsModel, validateAds } from "../../models/adsModel";
import { ObjectId } from 'mongodb';

export const dynamic = 'auto';

export async function GET(req: any, route: any) {
    try {
        await connectDb();
        const data = await adsModel.find({});
        return NextResponse.json(data);
    } catch (err) {
        console.log(err);
        return NextResponse.json({ err, msg: "There problem try again later" }, { status: 502 });
    }
}

export async function POST(req: any, route: any) {
    const bodyData = await req.json();
    const validBody = validateAds(bodyData);
    if (validBody.error) {
        return NextResponse.json(validBody.error.details, { status: 400 });
    }
    if (!cookies().has("token")) {
        return NextResponse.json({ msg: "You need send token" }, { status: 401 });
    }
    try {
        await connectDb();
        const token: any = cookies().get("token")?.value;
        const decodeToken: any = jwt.verify(token, "jonySecret");
        const user = await UserModel.findOne({ _id: decodeToken._id }, { password: 0 });
        const ads = new adsModel(bodyData);
        ads.userId = user._id;
        ads.userName = user.name;
        ads.date = Date.now();
        
        const currentDate = new Date();
        if (new Date(bodyData.timeStart) > currentDate) {
            ads.status = 'ממתין';
        } else if (new Date(bodyData.timeEnd) < currentDate) {
            ads.status = 'פקע';
        } else {
            ads.status = 'פעיל';
        }
        
        await ads.save();

        return NextResponse.json(ads, { status: 201 });
    } catch (err: any) {
        if (err.code == 11000) {
            return NextResponse.json({ code: 11000, msg: "There already user with that email" }, { status: 400 });
        }
        console.log(err);
        return NextResponse.json({ err, msg: "There problem try again later" }, { status: 502 });
    }
}

export async function PUT(req: any, route: any) {
    const { id, ...updatedData } = await req.json();

    try {
        await connectDb();
        const currentDate = new Date();
        if (new Date(updatedData.timeStart) > currentDate) {
            updatedData.status = 'ממתין';
        } else if (new Date(updatedData.timeEnd) < currentDate) {
            updatedData.status = 'פקע';
        } else {
            updatedData.status = 'פעיל';
        }

        const updatedAd = await adsModel.findByIdAndUpdate(id, updatedData, { new: true });
        return NextResponse.json(updatedAd, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ err, msg: "There problem try again later" }, { status: 502 });
    }
}

export async function DELETE(req: any, route: any) {
    const { id } = await req.json();
    try {
        await connectDb();
        await adsModel.deleteOne({ _id: new ObjectId(id) });
        return NextResponse.json({ msg: "Ad deleted successfully" }, { status: 204 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ err, msg: "There problem try again later" }, { status: 502 });
    }
}