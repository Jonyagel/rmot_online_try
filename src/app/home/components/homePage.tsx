"use client"
import React, { useState, useEffect, useRef } from 'react';
import './style1.css'
import { motion } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTree, faHome, faCalendarAlt, faStore,
    faGraduationCap, faHeartbeat, faPlay, faPause,
    faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useRouter } from 'next/navigation';
import Statistic from './statistic';

interface InfoCardProps {
    icon: IconDefinition;
    title: string;
    content: string;
    link: string;
}



const HomePage: React.FC = () => {

    const images = [
        'hose1_qejtcw',
        'ramot_view2_bwqqhu',
        'ramot_view3_yojt8w',
        'house2_vd8yke',
    ];

    const neighborhoodInfo = [
        {
            title: "היסטוריה של רמות",
            description: "שכונת רמות הוקמה ב-1970 ומאז התפתחה להיות אחת השכונות המובילות בעיר. השכונה נבנתה כחלק מתוכנית התרחבות עירונית וכוללת מספר אזורים תושבים משכבות סוציו-אקונומיות שונות. לאורך השנים התפתחו בשכונה מרכזים קהילתיים, בתי כנסת, פארקים ציבוריים ומוסדות תרבות. השכונה ידועה בסביבה הירוקה שלה ובשילוב המעניין של ארכיטקטורה מודרנית עם שימור מרקם החיים המסורתי."
        },
        {
            title: "חינוך ברמות",
            description: "רמות מתגאה במוסדות חינוך מצוינים, כולל בתי ספר יסודיים, תיכונים וגני ילדים. בתי הספר בשכונה מדורגים מהגבוהים בעיר במבחני מיצ\"ב וישנם גם מספר מוסדות חינוך ייחודיים המציעים תוכניות חינוך מיוחדות ואינטגרטיביות. בנוסף, השכונה מציעה חוגים שונים לתלמידים ובני נוער, החל מפעילות ספורטיבית ועד למרכזי למידה מתקדמים."
        },
        {
            title: "שירותים קהילתיים ותרבות",
            description: "שכונת רמות מציעה מגוון רחב של שירותים קהילתיים ותרבותיים לכל הגילאים. במרכז השכונה נמצא המרכז הקהילתי הגדול אשר מארגן פעילויות לכל המשפחה, חוגים וסדנאות בתחומים מגוונים כמו אמנות, ספורט, מוזיקה וריקוד. בנוסף, ישנם מספר בתי כנסת בשכונה המציעים שירותי דת, שיעורי תורה ופעילויות קהילתיות נוספות. פארקים ציבוריים וגני משחקים פזורים ברחבי השכונה ומציעים אפשרויות רבות לפעילות פנאי ובילוי בטבע."
        },
        {
            title: "תחבורה ונגישות",
            description: "שכונת רמות נהנית ממערכת תחבורה נוחה המאפשרת גישה מהירה לכל חלקי העיר. השכונה מחוברת לרשת התחבורה הציבורית עם מספר קווי אוטובוסים המגיעים לאזורי מפתח בעיר, כמו גם לרכבת הקלה המתוכננת להגיע לשכונה בעתיד הקרוב. בנוסף, השכונה ממוקמת בסמוך לכבישים מרכזיים המאפשרים גישה נוחה ברכב פרטי. ישנם שבילי אופניים המקשרים בין חלקי השכונה ומהווים אפשרות נהדרת לתחבורה ירוקה."
        }
    ];
    // מקסימום 80 תווים 3 שורות בתוכן פירוט של הכרטיס לא יותר של יגלוש
    const infoCards: InfoCardProps[] = [
        {
            icon: faHome,
            title: "נדל\"ן חדש",
            content: "פרויקט  חדשני ברמות ג' - דירות יוקרה עם נוף פנורמי לירושלים. הזדמנות להשקעה!",
            link: "/nadlan"
        },
        {
            icon: faCalendarAlt,
            title: "אירועי תרבות",
            content: "פסטיבל  של רמות - שבוע של מופעים, סדנאות ופעילויות לכל המשפחה. הכניסה חופשית!",
            link: "/allFamily"
        },
        {
            icon: faStore,
            title: "עסקים מקומיים",
            content: "חנות הספרים 'קריאה מהנה' - מבצע השבוע: קנו שני ספרים וקבלו את השלישי במתנה!",
            link: "/neighborhoodInfo"
        },
        {
            icon: faTree,
            title: "פארקים וטבע",
            content: "גן החיות   נפתח! בואו לפגוש את בעלי החיים ולהנות מפינות ליטוף ופעילויות לילדים.",
            link: "/"
        },
        {
            icon: faGraduationCap,
            title: "חינוך",
            content: "בית הספר 'אופק'  החינוך הארצי! תכנית הלימודים החדשנית מושכת תשומת לב ארצית.",
            link: "/"
        },
        {
            icon: faHeartbeat,
            title: "בריאות וספורט",
            content: "מרכז  העירוני מציע קורסי יוגה חינמיים לגיל השלישי. הצטרפו אלינו לחיים בריאים!",
            link: "/"
        }
    ];

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };




    return (
        <Container fluid className="px-0 py-0 home-container">
            <section className="hero-section">
                <div className="video-container">
                    <video
                        ref={videoRef}
                        src="/videos/panorama2.mp4"
                        autoPlay
                        loop
                        muted
                        className="video-background"
                    />
                    <div className="video-overlay" />
                </div>
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="hero-title">ברוכים הבאים לשכונת רמות</h1>
                </motion.div>
                <button onClick={togglePlay} className="video-control">
                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                </button>
                <div className="diagonal-cut">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="#ffffff" fill-opacity="1" d="M0,160L48,138.7C96,117,192,75,288,69.3C384,64,480,96,576,122.7C672,149,768,171,864,165.3C960,160,1056,128,1152,117.3C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </section>

            <Container fluid className="content-container">
                <Row>
                    <Col lg={2} className="d-none d-lg-block">
                        <div className="sticky-ad-container">
                            <div className="ad-space">
                                <img src='/images/bookgif.webp' width="auto" height="auto" alt='ads-left' className='rounded' />
                            </div>
                        </div>
                    </Col>
                    <Col lg={8}>
                        <div className='main-content'>
                            <section className="info-cards-section">
                                <h2 className="section-title">מה חדש ברמות?</h2>
                                <Swiper
                                    slidesPerView={3}
                                    spaceBetween={20}
                                    autoplay={{
                                        delay: 5000,
                                        disableOnInteraction: false,
                                    }}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    navigation={true}
                                    modules={[Autoplay, Pagination, Navigation]}
                                    className="info-cards-slider"
                                    breakpoints={{
                                        320: {
                                            slidesPerView: 1,
                                            spaceBetween: 10
                                        },
                                        640: {
                                            slidesPerView: 2,
                                            spaceBetween: 15
                                        },
                                        1024: {
                                            slidesPerView: 3,
                                            spaceBetween: 20
                                        }
                                    }}
                                >
                                    {infoCards.map((card, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="info-card">
                                                <div className="card-content">
                                                    <div className="card-icon">
                                                        <FontAwesomeIcon icon={card.icon} />
                                                    </div>
                                                    <h3>{card.title}</h3>
                                                    <p>{card.content}</p>
                                                </div>
                                                <Link href={card.link} className="card-link">
                                                    גלה עוד
                                                    <FontAwesomeIcon icon={faArrowLeft} className="arrow-icon" />
                                                </Link>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </section>
                            <div className="mobile-ad-space ad-space-2 d-md-none my-2">
                                <img src='/images/saleAds.gif' alt='ads-phone' className='rounded' />
                            </div>
                            <section className="statistics-section">
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="section-title"
                                >
                                    שכונת רמות - נתונים ומידע
                                </motion.h2>

                                <Statistic />

                                {[0, 1, 2, 3].map((rowIndex) => (
                                    <div key={rowIndex} className={`info-row ${rowIndex % 2 === 0 ? 'row-reverse' : ''}`}>
                                        <motion.div
                                            className="image-container"
                                            initial={{ opacity: 0, x: rowIndex % 2 === 0 ? -50 : 50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <CldImage
                                                src={images[rowIndex]}
                                                width={500}
                                                height={300}
                                                alt={`Image ${rowIndex + 1}`}
                                                className="diagonal-cut-image"
                                            />
                                        </motion.div>
                                        {neighborhoodInfo[rowIndex] && ( // בדיקה אם הערך קיים
                                            <motion.div
                                                className="neighborhood-info"
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <h3>{neighborhoodInfo[rowIndex].title}</h3>
                                                <p>{neighborhoodInfo[rowIndex].description}</p>
                                            </motion.div>
                                        )}
                                    </div>
                                ))}
                            </section>


                        </div>
                    </Col>
                    <Col lg={2} className="d-none d-lg-block">
                        <div className="sticky-ad-container">
                            <div className="ad-space">
                                <img src='/images/timegif.webp' width="auto" height="auto" alt='ads-right' className='rounded' />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
        // </Container >
    );
};

export default HomePage;