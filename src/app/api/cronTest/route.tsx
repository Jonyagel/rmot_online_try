import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET}`) {
        return new NextResponse('Unauthorized', {
            status: 401,
        });
    }
    try {
        const currentTime = new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' });
        
        // כאן תוכל להוסיף לוגיקה לשמירת זמן הריצה

        return NextResponse.json({ msg: `הפעולה התקופתית הופעלה בתאריך: ${currentTime}` });
    }
    catch (err) {
        console.error(err);
        return NextResponse.json({ error: "אירעה שגיאה, נסה שוב מאוחר יותר" }, { status: 502 });
    }
}