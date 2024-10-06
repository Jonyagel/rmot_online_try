import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const authHeader = req.headers.get('Authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', {
            status: 401,
        });
    }
    try {
        // כאן תוכל להוסיף את הלוגיקה שאתה רוצה שתרוץ מדי יום
        const currentTime = new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' });
        
        // לדוגמה, נשמור את זמן הריצה בקובץ או במסד נתונים
        // כאן אתה יכול להוסיף קוד לשמירת המידע

        return NextResponse.json({ msg: `הפעולה התקופתית הופעלה בתאריך: ${currentTime}` });
    }
    catch (err) {
        console.error(err);
        return NextResponse.json({ error: "אירעה שגיאה, נסה שוב מאוחר יותר" }, { status: 502 });
    }
}
