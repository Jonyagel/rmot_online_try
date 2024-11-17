// components/ChatBot/SearchResults.tsx
import { CldImage } from 'next-cloudinary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faHome, faComments, faImage } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import styles from './ChatBot.module.css';
import { useAppContext } from '../../context/appContext';
import ModalInfoCard from '../../neighborhoodInfo/components/modalInfoCard';
import { useState } from 'react';

interface SearchResult {
    text: string;
    type: 'shops' | 'nadlan' | 'forum';
    data: any;
    source?: 'AI' | 'search'; // Add this line
}

export const SearchResultCard = ({ result }: { result: SearchResult }) => {
    const [selectedCard, setSelectedCard] = useState<any>();
    const { setOpenModalFromChat } = useAppContext();
    const { openModalFromChat } = useAppContext();

    const renderImage = (imageUrl?: string, type: string = 'shops') => (
        <div className={styles.imageWrapper}>
            {imageUrl ? (
                <CldImage
                    width="400"
                    height="300"
                    src={imageUrl}
                    alt={result.data.name || result.data.type || 'תמונה'}
                    className={styles.cardImage}
                />
            ) : (
                <div className={styles.placeholderImage}>
                    <FontAwesomeIcon icon={faImage} />
                </div>
            )}
        </div>
    );

    switch (result.type) {
        case 'shops':
            return (
                <div className={styles.resultCard}>
                    {renderImage(result.data.logo)}
                    <div className={styles.contentWrapper}>
                        <div className={styles.cardHeader}>
                            <FontAwesomeIcon icon={faStore} className={styles.cardIcon} />
                            <h4>{result.data.name}</h4>
                        </div>
                        <div className={styles.sourceIndicator}>
                            {result.source === 'AI' ? 
                                <span className={styles.aiSource}>תשוב�� AI</span> : 
                                <span className={styles.searchSource}>תוצאות חיפוש</span>
                            }
                        </div>
                        <div className={styles.cardBody}>
                            <p><strong>סוג:</strong> {result.data.type}</p>
                            <p><strong>כתובת:</strong> {result.data.address}</p>
                            <p><strong>טלפון:</strong> {result.data.phone}</p>
                        </div>
                        <button
                            onClick={() => {
                                // setOpenModalFromChat(true);
                                // <ModalInfoCard
                                //     showModalDetailShop={openModalFromChat}
                                //     setShowModalDetailShop={setOpenModalFromChat}
                                //     selectedCard={result.data}
                                //     setSelectedCard={setSelectedCard}
                                // />;
                                // setOpenModalFromChat(true);
                                // console.log(openModalFromChat);
                                // const url = new URL(window.location.href);
                                // url.searchParams.set('cardId', result.data._id);
                                // window.history.pushState({}, '', url.toString());
                            }}
                            className={styles.cardLink}
                        >
                            פרטים נוספים →
                        </button>
                    </div>
                </div >
            );

        case 'nadlan':
            return (
                <div className={styles.resultCard}>
                    {renderImage(result.data.imgUrl)}
                    <div className={styles.contentWrapper}>
                        <div className={styles.cardHeader}>
                            <FontAwesomeIcon icon={faHome} className={styles.cardIcon} />
                            <h4>{result.data.type}</h4>
                        </div>
                        <div className={styles.sourceIndicator}>
                            {result.source === 'AI' ? 
                                <span className={styles.aiSource}>תשובת AI</span> : 
                                <span className={styles.searchSource}>תוצאות חיפוש</span>
                            }
                        </div>
                        <div className={styles.cardBody}>
                            <p><strong>מיקום:</strong> {result.data.address}</p>
                            <p><strong>מחיר:</strong> ₪{result.data.price?.toLocaleString()}</p>
                            <p><strong>חדרים:</strong> {result.data.rooms}</p>
                        </div>
                        <Link href={`/nadlan?id=${result.data._id}`} className={styles.cardLink}>
                            פרטים נוספים →
                        </Link>
                    </div>
                </div>
            );

        case 'forum':
            return (
                <div className={styles.resultCard}>
                    {renderImage(result.data.imgUrl)}
                    <div className={styles.contentWrapper}>
                        <div className={styles.cardHeader}>
                            <FontAwesomeIcon icon={faComments} className={styles.cardIcon} />
                            <h4>{result.data.title}</h4>
                        </div>
                        <div className={styles.sourceIndicator}>
                            {result.source === 'AI' ? 
                                <span className={styles.aiSource}>תשובת AI</span> : 
                                <span className={styles.searchSource}>תוצאות חיפוש</span>
                            }
                        </div>
                        <div className={styles.cardBody}>
                            <p><strong>נושא:</strong> {result.data.topic}</p>
                        </div>
                        <Link href={`/forum?id=${result.data._id}`} className={styles.cardLink}>
                            לצפייה בדיון →
                        </Link>
                    </div>
                </div>
            );
    }
};