"use client"
import React, { useState, useEffect, useRef } from 'react';
import './homePage.css'
import { motion } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTree, faHome, faCalendarAlt, faStore,
    faGraduationCap, faHeartbeat, faPlay, faPause,
    faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap-icons/font/bootstrap-icons.css';
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
    icon: string;
    title: string;
    content: string;
    link: string;
}



const HomePage: React.FC = () => {

    const images = [
        'Asset_5_1.5x_ltbaw3',
        'Asset_6_1.5x_fjwvvo',
        'Asset_7_1.5x_tutyuo',
        'Asset_8_1.5x_yj5pm0',
        'Asset_9_1.5x_feu4ow',
    ];

    const neighborhoodInfo = [
        {
            title: "מידע",
            description: "עמוד המידע הוא המקום המרכזי לכל המידע השימושי על השכונה. כאן תמצאו פרטים מקיפים על חנויות מקומיות, עסקים שכונתיים, מוסדות ציבור וגמ\"חים. זהו המקור המהימן ביותר למידע עדכני ומדויק על כל השירותים והמשאבים הזמינים לתושבי השכונה."
        },
        {
            title: "פורומים",
            description: "הפורומים הם הלב הפועם של הקהילה המקוונת שלנו. כאן תושבי השכונה יכולים לתקשר זה עם זה, לשתף מידע, לשאול שאלות ולהציע עצות. זו פלטפורמה מצוינת ליצירת קשרים, לפתרון בעיות משותפות ולחיזוק תחושת הקהילתיות בשכונה."
        },
        {
            title: "קהילה",
            description: "עמוד הקהילה מוקדש לחיי הקהילה העשירים בשכונה. כאן תמצאו מידע חיוני כמו זמני תפילות בבתי הכנסת, מתכונים מסורתיים, סיפורי השגחה פרטית מרגשים, הלכות יומיות ועוד תכנים רוחניים ותרבותיים. זהו המקום לחגוג את המורשת והמסורת המשותפת שלנו."
        },
        {
            title: "נדל\"ן",
            description: "עמוד הנדל\"ן הוא המקום המרכזי לכל ענייני הדיור בשכונה. כאן תוכלו למצוא מידע מקיף על בתים למכירה והשכרה, לעקוב אחר מגמות שוק הנדל\"ן המקומי, ולקבל טיפים מועילים בנושאי דיור. זו הכתובת הראשונה לכל מי שמחפש את ביתו הבא בשכונה."
        },
        {
            title: "לוח",
            description: "הלוח הוא המרכז הווירטואלי לכל הקניות והמכירות בשכונה. כאן תוכלו למצוא מגוון רחב של פריטים יד שנייה, לפרסם או להירשם לקורסים מקומיים, למסור חפצים שאינכם זקוקים להם, לדווח על אבידות ומציאות ועוד. זהו המקום האידיאלי לחסוך כסף ולתרום לכלכלה המעגלית של הקהילה."
        }
    ];
    // מקסימום 80 תווים 3 שורות בתוכן פירוט של הכרטיס לא יותר של יגלוש
    const infoCards: InfoCardProps[] = [
        {
            icon: 'house',
            title: "נדל\"ן חדש",
            content: "פרויקט  חדשני ברמות ג' - דירות יוקרה עם נוף פנורמי לירושלים. הזדמנות להשקעה!",
            link: "/nadlan"
        },
        {
            icon: 'calendar',
            title: "אירועי תרבות",
            content: "פסטיבל  של רמות - שבוע של מופעים, סדנאות ופעילויות לכל המשפחה. הכניסה חופשית!",
            link: "/allFamily"
        },
        {
            icon: 'shop-window',
            title: "עסקים מקומיים",
            content: "חנות הספרים 'קריאה מהנה' - מבצע השבוע: קנו שני ספרים וקבלו את השלישי במתנה!",
            link: "/neighborhoodInfo"
        },
        {
            icon: 'tree',
            title: "פארקים וטבע",
            content: "גן החיות   נפתח! בואו לפגוש את בעלי החיים ולהנות מפינות ליטוף ופעילויות לילדים.",
            link: "/"
        },
        {
            icon: 'book',
            title: "חינוך",
            content: "בית הספר 'אופק'  החינוך הארצי! תכנית הלימודים החדשנית מושכת תשומת לב ארצית.",
            link: "/"
        },
        {
            icon: 'heart-pulse',
            title: "בריאות וספורט",
            content: "מרכז  העירוני מציע קורסי יוגה חינמיים לגיל השלישי. הצטרפו אלינו לחיים לחיים לחיים בריאים!",
            link: "/"
        }
    ];

    const NeighborhoodInfo: React.FC<{ title: string; description: string }> = ({ title, description }) => {
        const [isVisible, setIsVisible] = useState(false);
        const titleRef = useRef<HTMLHeadingElement>(null);

        useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                },
                { threshold: 0.1 }
            );

            if (titleRef.current) {
                observer.observe(titleRef.current);
            }

            return () => {
                if (titleRef.current) {
                    observer.unobserve(titleRef.current);
                }
            };
        }, []);

        return (
            <motion.div
                className="neighborhood-info"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h3 ref={titleRef} className={isVisible ? 'visible' : ''}>
                    {title}
                </h3>
                <p>{description}</p>
            </motion.div>
        );
    };

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
        <Container fluid className="px-0 py-0">
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
                    <h1 className="hero-title">ברוכים הבאים לקהילאפ</h1>
                </motion.div>
                <button onClick={togglePlay} className="video-control">
                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                </button>
                {/* <div className="diagonal-cut">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="#ffffff" fill-opacity="1" d="M0,160L48,138.7C96,117,192,75,288,69.3C384,64,480,96,576,122.7C672,149,768,171,864,165.3C960,160,1056,128,1152,117.3C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div> */}
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
                        <div className='main-content-container rounded-t mx-auto'>
                            <div className='main-content rounded-t'>
                                <section className="info-cards-section rounded mb-5">
                                    <h2 className="section-title mb-3">מה חדש ברמות?</h2>
                                    <Swiper
                                        slidesPerView={3}
                                        spaceBetween={20}
                                        autoplay={{
                                            delay: 5000,
                                            disableOnInteraction: false,
                                        }}
                                        pagination={{
                                            el: '.custom-pagination',
                                            clickable: true,
                                            type: 'bullets',
                                            renderBullet: function (index, className) {
                                                return '<span class="' + className + ' custom-bullet"></span>';
                                            },
                                        }}
                                        navigation={true}
                                        modules={[Autoplay, Pagination, Navigation]}
                                        className="info-cards-slider pb-3 px-4 custom-arrows-swiper w-75"
                                        breakpoints={{
                                            320: {
                                                slidesPerView: 1,
                                                spaceBetween: 10
                                            },
                                            640: {
                                                slidesPerView: 2,
                                                spaceBetween: 15
                                            },
                                            1225: {
                                                slidesPerView: 3,
                                                spaceBetween: 5
                                            }
                                        }}
                                    >
                                        {infoCards.map((card, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="info-card mt-3 mx-4 p-2 rounded shadow-sm">
                                                    <div className="card-content">
                                                        <div className="card-icon flex align-items-center mb-2">
                                                            <i className={`bi bi-${card.icon} me-2`} style={{color:'#0d6efd '}}></i>
                                                            <h3>{card.title}</h3>
                                                        </div>
                                                        <p>{card.content}</p>
                                                    </div>
                                                    <div className="home-info-card-footer mt-auto my-2">
                                                        <button className='btn btn-link-home-card w-75 mx-auto my-auto'>
                                                            <Link href={card.link} className="link no-underline">
                                                                גלה עוד
                                                                {/* <FontAwesomeIcon icon={faArrowLeft} className="arrow-icon" /> */}
                                                            </Link>
                                                        </button>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                        <div className="custom-pagination"></div>
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

                                    {[0, 1, 2, 3, 4].map((rowIndex) => (
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
                                                    className="mx-auto"
                                                />
                                            </motion.div>
                                            {neighborhoodInfo[rowIndex] && (
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