import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// סימון הנתיב כדינמי - חשוב!
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json(
        { message: "לא נמצא טוקן" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { isLoggedIn: true },
      { status: 200 }
    );

  } catch (error) {
    console.error('Check login error:', error);
    return NextResponse.json(
      { message: "שגיאת שרת" },
      { status: 500 }
    );
  }
}