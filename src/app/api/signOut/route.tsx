import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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
