// src/components/FavoriteButton.tsx
import { useState } from 'react';
import { toast } from 'react-toastify';

interface FavoriteButtonProps {
    itemId: string;
    type: 'shops' | 'forum' | 'board' | 'nadlan';
    initialIsFavorite: boolean;
}

export function FavoriteButton({ itemId, type, initialIsFavorite }: FavoriteButtonProps) {
    const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

    const toggleFavorite = async () => {
        try {
            const response = await fetch(`/api/users/favorite`, {
                method: isFavorite ? 'DELETE' : 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ type, itemId })
            });

            if (!response.ok) {
                throw new Error();
            }

            setIsFavorite(!isFavorite);
            toast.success(isFavorite ? 'הוסר מהמועדפים' : 'נוסף למועדפים');

        } catch (err) {
            toast.error('שגיאה בעדכון המועדפים');
            console.error(err);
        }
    };

    return (
        <button
            onClick={toggleFavorite}
            className="text-yellow-500 hover:text-yellow-600 text-xl"
            aria-label={isFavorite ? 'הסר ממועדפים' : 'הוסף למועדפים'}
        >
            {isFavorite ? '★' : '☆'}
        </button>
    );
}