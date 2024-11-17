import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDb } from '../../../db/connectDb';
import { UserModel } from "../../../models/userModel";

const favoriteFields = {
  shops: 'favoriteShops',
  forum: 'favoriteForums',
  board: 'favoriteBoards'
};

export async function PUT(req: Request) {
    if (!cookies().has("token")) {
        return NextResponse.json({ error: "נדרשת הרשאה" }, { status: 401 });
    }

    try {
        const { type, itemId } = await req.json();
        
        if (!type || !itemId || !favoriteFields[type as keyof typeof favoriteFields]) {
            return NextResponse.json({ error: "נתונים לא תקינים" }, { status: 400 });
        }

        await connectDb();
        
        const token:any = cookies().get("token")?.value;
        const decoded:any = jwt.verify(token!, process.env.JWT_SECRET!);
        
        const field = favoriteFields[type as keyof typeof favoriteFields];
        
        const updatedUser = await UserModel.findByIdAndUpdate(
            decoded.userId,
            { $addToSet: { [field]: itemId } },
            { 
                new: true,
                select: 'favoriteShops favoriteForums favoriteBoards'
            }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: "משתמש לא נמצא" }, { status: 404 });
        }

        const favorites = {
            shops: updatedUser.favoriteShops || [],
            forum: updatedUser.favoriteForums || [],
            board: updatedUser.favoriteBoards || []
        };

        return NextResponse.json({ favorites });

    } catch (err) {
        console.error('Favorite update error:', err);
        return NextResponse.json({ error: "שגיאה בעדכון המועדפים" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    if (!cookies().has("token")) {
        return NextResponse.json({ error: "נדרשת הרשאה" }, { status: 401 });
    }

    try {
        const { type, itemId } = await req.json();
        
        if (!type || !itemId || !favoriteFields[type as keyof typeof favoriteFields]) {
            return NextResponse.json({ error: "נתונים לא תקינים" }, { status: 400 });
        }

        await connectDb();
        
        const token:any = cookies().get("token")?.value;
        const decoded:any = jwt.verify(token!, process.env.JWT_SECRET!);
        
        const field = favoriteFields[type as keyof typeof favoriteFields];
        
        const updatedUser = await UserModel.findByIdAndUpdate(
            decoded.userId,
            { $pull: { [field]: itemId } },
            { 
                new: true,
                select: 'favoriteShops favoriteForums favoriteBoards'
            }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: "משתמש לא נמצא" }, { status: 404 });
        }

        const favorites = {
            shops: updatedUser.favoriteShops || [],
            forum: updatedUser.favoriteForums || [],
            board: updatedUser.favoriteBoards || []
        };

        return NextResponse.json({ favorites });

    } catch (err) {
        console.error('Favorite delete error:', err);
        return NextResponse.json({ error: "שגיאה בהסרה מהמועדפים" }, { status: 500 });
    }
}