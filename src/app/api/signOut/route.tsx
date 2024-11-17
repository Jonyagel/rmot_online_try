// src/app/api/signOut/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(req: any, route: any) {
    try {
        if (cookies().has("token")) {
            cookies().delete("token");
            return NextResponse.json({ msg: "התנתקת בהצלחה", status: 200 }, { status: 200 });
        }
        return NextResponse.json({ msg: "אתה צריך לשלוח אסימון (token)", status: 401 }, { status: 401 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ err, msg: "יש בעיה, נסה שוב מאוחר יותר" }, { status: 502 });
    }
}