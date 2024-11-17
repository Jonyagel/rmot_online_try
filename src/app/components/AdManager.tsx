import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import './AdManager.css';

interface Ad {
    _id: string;
    image: string;
    link: string;
    altText: string;
    timeStart: string;
    timeEnd: string;
    price: number;
    page: string;
    status: string;
    userName: string;
    userId: string;
    createdAt?: string;
}

const AdManager: React.FC = () => {
    const [ads, setAds] = useState<Ad[]>([]);
    const [filteredAds, setFilteredAds] = useState<Ad[]>([]);
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [filterUser, setFilterUser] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [sortBy, setSortBy] = useState<string>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const initialAdState: Ad = {
        _id: '',
        image: '',
        link: '',
        altText: '',
        timeStart: '',
        timeEnd: '',
        price: 0,
        page: '',
        status: 'פעיל',
        userName: '',
        userId: '',
    };

    const [newAd, setNewAd] = useState<Ad>(initialAdState);
    const [editAd, setEditAd] = useState<Ad | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const fetchAds = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ads`);
            if (!response.ok) throw new Error('Failed to fetch ads');
            const data = await response.json();
            setAds(data);
            setFilteredAds(data);
        } catch (error) {
            toast.error('שגיאה בטעינת הפרסומות');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAds();
    }, [fetchAds]);

    const handleSort = useCallback((adsToSort: Ad[]) => {
        return [...adsToSort].sort((a, b) => {
            switch (sortBy) {
                case 'date':
                    return sortOrder === 'asc' 
                        ? new Date(a.timeStart).getTime() - new Date(b.timeStart).getTime()
                        : new Date(b.timeStart).getTime() - new Date(a.timeStart).getTime();
                case 'price':
                    return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
                case 'status':
                    return sortOrder === 'asc' 
                        ? a.status.localeCompare(b.status)
                        : b.status.localeCompare(a.status);
                default:
                    return 0;
            }
        });
    }, [sortBy, sortOrder]);

    useEffect(() => {
        let filtered = ads;
        if (filterStatus !== 'all') {
            filtered = filtered.filter(ad => ad.status === filterStatus);
        }
        if (filterUser) {
            filtered = filtered.filter(ad => 
                ad.userId.toLowerCase().includes(filterUser.toLowerCase()) ||
                ad.userName.toLowerCase().includes(filterUser.toLowerCase())
            );
        }
        const sorted = handleSort(filtered);
        setFilteredAds(sorted);
    }, [filterStatus, filterUser, ads, handleSort]);

    const handleAddAd = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAd),
            });
            
            if (!response.ok) throw new Error('Failed to add ad');
            
            const addedAd = await response.json();
            setAds(prev => [...prev, addedAd]);
            setNewAd(initialAdState);
            toast.success('פרסומת נוספה בהצלחה!');
        } catch (error) {
            toast.error('שגיאה בהוספת פרסומת');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteAd = async (id: string) => {
        if (!window.confirm('האם אתה בטוח שברצונך למחוק את הפרסומת?')) return;
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ads`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            
            if (!response.ok) throw new Error('Failed to delete ad');
            
            setAds(prev => prev.filter(ad => ad._id !== id));
            toast.success('פרסומת נמחקה בהצלחה!');
        } catch (error) {
            toast.error('שגיאה במחיקת הפרסומת');
            console.error(error);
        }
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editAd) return;

        try {
            setIsSubmitting(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ads`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editAd),
            });
            
            if (!response.ok) throw new Error('Failed to update ad');
            
            const updatedAd = await response.json();
            setAds(prev => prev.map(ad => ad._id === updatedAd._id ? updatedAd : ad));
            setEditAd(null);
            toast.success('פרסומת עודכנה בהצלחה!');
        } catch (error) {
            toast.error('שגיאה בעדכון הפרסומת');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div className="loading-spinner">טוען...</div>;
    }

    return (
        <div className="ad-manager-container">
            <h2 className="ad-manager-title">ניהול פרסומות</h2>
            
            <div className="controls-container">
                <div className="filter-container">
                    <select 
                        className="filter-select"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">כל הפרסומות</option>
                        <option value="פעיל">פעיל</option>
                        <option value="ממתין">ממתין</option>
                        <option value="פקע">פקע</option>
                    </select>
                    
                    <input
                        type="text"
                        className="filter-input"
                        placeholder="חיפוש לפי שם/ID משתמש"
                        value={filterUser}
                        onChange={(e) => setFilterUser(e.target.value)}
                    />
                    
                    <div className="sort-controls">
                        <select 
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-select"
                        >
                            <option value="date">תאריך</option>
                            <option value="price">מחיר</option>
                            <option value="status">סטטוס</option>
                        </select>
                        <button 
                            className="sort-button"
                            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                        >
                            {sortOrder === 'asc' ? '↑' : '↓'}
                        </button>
                    </div>
                </div>
            </div>

            <form className="ad-form" onSubmit={handleAddAd}>
                <input
                    type="text"
                    className="ad-input"
                    placeholder="URL לתמונה"
                    value={newAd.image}
                    onChange={(e) => setNewAd({ ...newAd, image: e.target.value })}
                />
                <input
                    type="text"
                    className="ad-input"
                    placeholder="קישור"
                    value={newAd.link}
                    onChange={(e) => setNewAd({ ...newAd, link: e.target.value })}
                />
                <input
                    type="text"
                    className="ad-input"
                    placeholder="טקסט חלופי"
                    value={newAd.altText}
                    onChange={(e) => setNewAd({ ...newAd, altText: e.target.value })}
                />
                <input
                    type="date"
                    className="ad-input"
                    placeholder="תאריך התחלה"
                    value={newAd.timeStart}
                    onChange={(e) => setNewAd({ ...newAd, timeStart: e.target.value })}
                />
                <input
                    type="date"
                    className="ad-input"
                    placeholder="תאריך סיום"
                    value={newAd.timeEnd}
                    onChange={(e) => setNewAd({ ...newAd, timeEnd: e.target.value })}
                />
                <input
                    type="number"
                    className="ad-input"
                    placeholder="מחיר"
                    value={newAd.price}
                    onChange={(e) => setNewAd({ ...newAd, price: Number(e.target.value) })}
                />
                <input
                    type="text"
                    className="ad-input"
                    placeholder="דף באתר"
                    value={newAd.page}
                    onChange={(e) => setNewAd({ ...newAd, page: e.target.value })}
                />
                <button 
                    type="submit" 
                    className="ad-button" 
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'מוסיף...' : 'הוסף פרסומת'}
                </button>
            </form>

            {filteredAds.length === 0 ? (
                <div className="no-results">לא נמצאו פרסומות</div>
            ) : (
                <ul className="ad-list">
                    {filteredAds.map(ad => (
                        <li key={ad._id} className="ad-list-item">
                            <div className="ad-status-badge" data-status={ad.status}>
                                {ad.status}
                            </div>
                            <img 
                                src={ad.image} 
                                alt={ad.altText} 
                                className="ad-image"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/placeholder-image.png';
                                }}
                            />
                            <div className="ad-details">
                                <p>תאריך התחלה: {new Date(ad.timeStart).toLocaleDateString('he-IL')}</p>
                                <p>תאריך סיום: {new Date(ad.timeEnd).toLocaleDateString('he-IL')}</p>
                                <p>מחיר: ₪{ad.price.toLocaleString()}</p>
                                <p>סטטוס: {ad.status}</p>
                                <p>מעלה: {ad.userName}</p>
                            </div>
                            <div className="ad-actions">
                                <button 
                                    className="ad-button" 
                                    onClick={() => setEditAd(ad)}
                                >
                                    ערוך
                                </button>
                                <button 
                                    className="ad-button" 
                                    onClick={() => handleDeleteAd(ad._id)}
                                >
                                    מחק
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {editAd && (
                <div className="modal-overlay" onClick={() => setEditAd(null)}>
                    <div className="edit-ad-form" onClick={e => e.stopPropagation()}>
                        <h3>עריכת פרסומת</h3>
                        <form onSubmit={handleEditSubmit}>
                            {/* ... existing edit form inputs ... */}
                            <div className="form-actions">
                                <button 
                                    type="submit" 
                                    className="ad-button" 
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'שומר...' : 'שמור שינויים'}
                                </button>
                                <button 
                                    type="button" 
                                    className="ad-button" 
                                    onClick={() => setEditAd(null)}
                                >
                                    ביטול
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdManager;
