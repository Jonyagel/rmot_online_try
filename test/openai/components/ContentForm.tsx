'use client'
import React, { useState } from 'react';

const ContentForm: React.FC = () => {
    const [content, setContent] = useState<string>('');
    const [isAppropriate, setIsAppropriate] = useState<boolean | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/openai`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input: 'טקסט לבדיקה' }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
                // טפל בשגיאה
            } else {
                const data = await response.json();
                // טפל בתגובה
            }

            const data = await response.json();
            const isFlagged = data.results[0].flagged;

            setIsAppropriate(!isFlagged);

            if (!isFlagged) {
                console.log('Content is appropriate');
            } else {
                console.log('Content is inappropriate');
            }
        } catch (error) {
            console.error('Error:', error);
            setIsAppropriate(null);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="הזן את התוכן כאן"
            />
            <button type="submit">בדוק תוכן</button>
            {isAppropriate !== null && (
                <p>
                    {isAppropriate
                        ? 'התוכן תקין'
                        : 'התוכן אינו תקין'}
                </p>
            )}
        </form>
    );
};

export default ContentForm;