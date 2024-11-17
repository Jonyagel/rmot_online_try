import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import './AdDisplay.css';
import Image from 'next/image';

interface Ad {
    _id: string;
    image: string;
    link: string;
    altText: string;
    timeStart: string;
    timeEnd: string;
    page: string;
    status: string;
}

const AdDisplay = (props:any) => {
    const [ads, setAds] = useState<Ad[]>([]);

    useEffect(() => {
        const fetchAds = async () => {
            const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/api/ads`);
            const data = await response.json();
            const currentDate = new Date().toISOString().split('T')[0]; // תאריך נוכחי
            const currentPage = props.page; // או כל דף אחר שאתה נמצא בו
            const activeAds = data.filter((ad: Ad) => ad.status === 'פעיל' && ad.timeStart <= currentDate && ad.timeEnd >= currentDate && ad.page === currentPage);
            setAds(activeAds);
        };

        fetchAds();
    }, []);

    return (
        <div className="ad-display-container">
            {ads.length > 0 ? (
                <Swiper
                    effect='fade'
                    modules={[Autoplay]}
                    slidesPerView={1}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    allowTouchMove={true}
                    loop={true}
                >
                    {ads.map(ad => (
                        <SwiperSlide key={ad._id}>
                            <a href={ad.link} target="_blank" rel="noopener noreferrer">
                                <Image src={ad.image} alt={ad.altText} className="ad-image rounded" width={100} height={300}/>
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p>אין פרסומות פעילות כרגע.</p>
            )}
        </div>
    );
};

export default AdDisplay; 