import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // ייבוא אייקוני הלב
import './ShopCardsLove.css'

export default function ShopCards(props: any) {
    const [favorites, setFavorites] = useState<string[]>(() => {
        if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem('favorites') || '[]');
        }
        return [];
    });

    const toggleFavorite = (shopId: string) => {
        setFavorites(prev => {
            const newFavorites = prev.includes(shopId)
                ? prev.filter(id => id !== shopId)
                : [...prev, shopId];
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    return (
        <div>
            <div className="shop-list">
                {props.shopsData.map((shop:any) => (
                    <div key={shop.id} className="shop-item flex justify-between items-center p-2 border-b">
                        <span>{shop.name}</span>
                        <div className="flex items-center">
                            <button onClick={() => toggleFavorite(shop.id)}>
                                {favorites.includes(shop.id) ? <FaHeart color="red" /> : <FaRegHeart />}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}