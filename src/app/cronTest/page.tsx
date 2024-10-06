'use client';

import { useState, useEffect } from 'react';

export default function CronTestPage() {
    const [lastRunTime, setLastRunTime] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchLastRunTime = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/cronTest', {
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET}`
                }
            });
            if (!response.ok) {
                throw new Error('בקשה נכשלה');
            }
            const data = await response.json();
            setLastRunTime(data.msg);
        } catch (err) {
            setError('אירעה שגיאה בטעינת הנתונים');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLastRunTime();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">בדיקת פעולה תקופתית</h1>
            {loading && <p>טוען...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {lastRunTime && (
                <div>
                    <p>זמן הריצה האחרון של הפעולה התקופתית:</p>
                    <p className="font-bold">{lastRunTime}</p>
                </div>
            )}
            <button
                onClick={fetchLastRunTime}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                רענן נתונים
            </button>
        </div>
    );
}
