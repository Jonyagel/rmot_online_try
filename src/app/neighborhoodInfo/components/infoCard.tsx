import React, { useState, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ModalInfoCard from './modalInfoCard';
import { IoShareSocialOutline } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import { CldImage } from 'next-cloudinary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons';

type TimeSlot = { open: string; close: string; note?: string };

type Day = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

// type OpeningHours = { [key in Day]: TimeSlot[] };

interface Card {
    _id: string;
    name: string;
    description: string;
    logo?: string;
    hours: OpeningHours;
    address: string;
    phone: string;
    email: string;
    website?: string;
    images: string[];
    category: string;
    type: string;
    ad: string;
    adImage: string;
}

// Types
type DayOfWeek = 
  | 'sunday' 
  | 'monday' 
  | 'tuesday' 
  | 'wednesday' 
  | 'thursday' 
  | 'friday' 
  | 'saturday';

type OpeningHours = {
  [K in DayOfWeek]: Array<{
    open: string;
    close: string;
  }>;
}

interface BusinessHours {
  open: string;
  close: string;
}

// Utilities
const isDayOfWeek = (day: string): day is DayOfWeek => {
  const validDays: DayOfWeek[] = [
    'sunday', 'monday', 'tuesday', 
    'wednesday', 'thursday', 'friday', 'saturday'
  ];
  return validDays.includes(day as DayOfWeek);
};

// Memoized hook with better type safety
const calculateIsOpenNow = (hours: OpeningHours): boolean => {
    try {
        const now = new Date();
        const currentDay = now.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();

        if (!isDayOfWeek(currentDay)) {
            console.error(`Invalid day: ${currentDay}`);
            return false;
        }

        const currentTime = now.toTimeString().slice(0, 5);
        const todayHours: TimeSlot[] = hours[currentDay] || [];

        return todayHours.some(hour =>
            hour.open <= currentTime && hour.close >= currentTime
        );
    } catch (error) {
        console.error('Error checking opening hours:', error);
        return false;
    }
};

// Testing utility
export const createMockHours = (): OpeningHours => ({
  sunday: [{ open: '09:00', close: '17:00' }],
  monday: [{ open: '09:00', close: '17:00' }],
  tuesday: [{ open: '09:00', close: '17:00' }],
  wednesday: [{ open: '09:00', close: '17:00' }],
  thursday: [{ open: '09:00', close: '17:00' }],
  friday: [{ open: '09:00', close: '13:00' }],
  saturday: []
});

// Optimize favorite toggle function
const useFavoriteToggle = (updateFavorites: (id: string) => Promise<void>) => {
    return useCallback(async (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            await updateFavorites(id);
        } catch (error) {
            toast.error('שגיאה בעדכון המועדפים', {
                role: 'alert',
                toastId: 'favorites-error'
            });
        }
    }, [updateFavorites]);
};

const InfoCard = memo((props: any) => {
    const [showModalDetailShop, setShowModalDetailShop] = useState(false);
    const [favorites, setFavorites] = useState<string[]>(() => {
        if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem('favorites') || '[]');
        }
        return [];
    });

    const notifyLogin = () => toast.error("אתה צריך להירשם", {
        position: 'top-left',
        theme: 'light'
    });

    const handleShopClick = (card: any) => {
        props.setSelectedCard(card);
        setShowModalDetailShop(true)
        // עדכון ה-URL בלי לטעון מחדש את הדף
        const url = new URL(window.location.href);
        url.searchParams.set('cardId', card._id);
        window.history.pushState({}, '', url.toString());
    };

    const handleShare = async (cardId: string, cardName: string) => {
        const url = `${window.location.origin}${window.location.pathname}?cardId=${cardId}`;

        if (navigator.share) {
            // שיתוף דרך Web Share API אם זמין (בעיקר במובייל)
            try {
                await navigator.share({
                    title: cardName,
                    text: `בוא לראות את ${cardName}`,
                    url: url
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // העתקה ללוח אם Web Share API לא זמין
            navigator.clipboard.writeText(url).then(() => {
                alert('הקישור הועתק ללוח');
            });
        }
    };

    const updateFavorites = async (itemId: string) => {
        const isFavorite = favorites.includes(itemId);
        const method = isFavorite ? 'DELETE' : 'PUT';

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/favorite`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'shops',
                    itemId
                }),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 401) {
                    notifyLogin();
                    return;
                }
                throw new Error(errorData.error || 'שגיאה בעדכון המועדפים');
            }

            const data = await response.json();

            // Update local state with server data
            setFavorites(data.favorites.shops || []);

            // Update localStorage
            localStorage.setItem('favorites', JSON.stringify(data.favorites.shops || []));

            // Show success message
            toast.success(isFavorite ? 'הוסר מהמועדפים' : 'נוסף למועדפים');

        } catch (error) {
            console.error('Error updating favorites:', error);
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('שגיאה בעדכון המועדפים');
            }
        }
    };

    const handleFavoriteToggle = useFavoriteToggle(updateFavorites);

    // const isOpenNow = useIsOpenNow(props.hours);

    return (
        <div role="region" aria-label="כרטיסי מידע">
            <AnimatePresence>
                <motion.div
                    className="shop-grid px-1 px-md-0"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.05, // Reduced from 0.1 for better performance
                                when: "beforeChildren"
                            }
                        }
                    }}
                    role="list"
                    aria-label="רשימת חנויות"
                >
                    {(props.activeTab === 'shops' ? props.filteredCards :
                        props.activeTab === 'gmach' ? props.filteredGmach :
                            props.activeTab === 'mosads' ? props.filteredMosads :
                                []).map((card: Card, index: number) => (
                                    <React.Fragment key={card._id}>
                                        <motion.div variants={{
                                            hidden: { y: 20, opacity: 0 },
                                            visible: {
                                                y: 0,
                                                opacity: 1,
                                                transition: {
                                                    type: "spring",
                                                    stiffness: 100,
                                                    damping: 12
                                                }
                                            }
                                        }}
                                            className=''>
                                            <div
                                                className="shop-card shadow-sm rounded mb-2"
                                                onClick={() => handleShopClick(card)}
                                            >
                                                <div className="shop-card-content relative" style={{ flex: 1 }}>
                                                    <div className="shop-card-header p-2">
                                                        {card.logo ? (
                                                            <CldImage
                                                                src={card.logo}
                                                                width="100"
                                                                height="50"
                                                                className="shop-image rounded"
                                                                alt={`${card.name} logo`}
                                                                loading='lazy'
                                                                format="auto"
                                                                quality="auto"
                                                                placeholder="blur"
                                                                blurDataURL={`data:image/svg+xml;base64,...`} // Add placeholder
                                                            />
                                                        ) : (
                                                            <div className="w-full bg-gray-100 rounded flex items-center justify-center" style={{ height: '150px' }}>
                                                                <FontAwesomeIcon icon={faFontAwesome} size="3x" color="#dce0e3" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="shop-description px-2">
                                                        <div className='flex justify-content-between items-center'>
                                                            <h3 className='font-bold'>{card.name}</h3>
                                                            <div className='top-3 left-3 absolute rounded'>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation(); // מונע פתיחת המודל בלחיצה על כפתור השיתוף
                                                                        handleShare(card._id, card.name);
                                                                    }}
                                                                    className="text-gray-600 hover:text-gray-800 transition-colors me-1"
                                                                    title="שתף"
                                                                >
                                                                    <IoShareSocialOutline size={16} />
                                                                </button>
                                                                <button onClick={(e) => handleFavoriteToggle(e, card._id)}
                                                                    className={`favorite-btn ${favorites.includes(card._id) ? 'active' : ''}`}
                                                                    aria-label={favorites.includes(card._id) ? 'הסר ממועדפים' : 'הוסף למועדפים'}>
                                                                    {favorites.includes(card._id) ? <i className="bi bi-heart-fill text-red-500"></i> : <i className="bi bi-heart"></i>}
                                                                </button>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <div className="align-self-start" style={{ fontSize: '13px' }}>
                                                                    {calculateIsOpenNow(card.hours) ? (
                                                                        <span className="font-bold px-1" style={{ color: '#00a35b', fontSize: '10px' }}>
                                                                            פתוח
                                                                        </span>
                                                                    ) : (
                                                                        <span className="font-bold px-1" style={{ color: '#f78d8d', fontSize: '10px' }}>
                                                                            סגור
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p>
                                                            {card.description.length > 100
                                                                ? `${card.description.substring(0, 100)}...`
                                                                : card.description}
                                                        </p>
                                                    </div>

                                                </div>
                                                <div className="shop-card-footer mt-auto">
                                                    <button className="more-info-btn btn border w-100" onClick={() => handleShopClick(card)}>למידע נוסף</button>
                                                </div>
                                            </div>
                                        </motion.div>
                                        {(index + 1) % 7 === 0 && (
                                            <motion.div
                                                key={`ad-${index}`}
                                                variants={{
                                                    hidden: { y: 20, opacity: 0 },
                                                    visible: {
                                                        y: 0,
                                                        opacity: 1,
                                                        transition: {
                                                            type: "spring",
                                                            stiffness: 100,
                                                            damping: 12
                                                        }
                                                    }
                                                }}
                                                className="rounded"
                                            >
                                                <div className="ad-content">
                                                    <img src="/images/20off.gif" alt="פרסומת" className="shadow-sm rounded object-contain" />
                                                </div>
                                            </motion.div>
                                        )}
                                    </React.Fragment>
                                ))}
                </motion.div>
            </AnimatePresence>

            {/* Add loading state */}
            {props.isLoading && (
                <div
                    role="status"
                    aria-live="polite"
                    className="loading-indicator"
                >
                    טוען...
                </div>
            )}

            {/* Add error state */}
            {props.error && (
                <div
                    role="alert"
                    className="error-message"
                >
                    {props.error}
                </div>
            )}
            <ModalInfoCard
                showModalDetailShop={showModalDetailShop}
                setShowModalDetailShop={setShowModalDetailShop}
                setSelectedCard={props.setSelectedCard}
                selectedCard={props.selectedCard}
                // isOpenNow={isOpenNow}
            />
            <ToastContainer />
        </div>
    );
});

InfoCard.displayName = 'InfoCard';

export default InfoCard;