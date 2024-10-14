"use client"
import React, { useState, useEffect, useRef } from 'react';
import './homePage.css'
import { motion } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Statistic from './statistic';
import Lottie from './lottie';
import infoLottie from "@/public/images/icon-logo/מידע לוטי 3.json";
import forumLottie from "@/public/images/icon-logo/פורומים.json";
import familyLottie from "@/public/images/icon-logo/קהילה.json";
import nadlanLottie from "@/public/images/icon-logo/נדלן.json";
import boardLottie from "@/public/images/icon-logo/לוח.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';


interface InfoCardProps {
    icon: string;
    title: string;
    content: string;
    link: string;
}



const HomePage: React.FC = () => {



    const images = [
        infoLottie,
        forumLottie,
        familyLottie,
        nadlanLottie,
        boardLottie,
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
            content: "פרויקט  חדשני ברמות ג' - דירות יוקרה עם נוף פנורמי פרויקט  חדשנ יו   רושלים. הזדמנות להשקעה!",
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

    const heroImages = [
        'neighborhood1_wcwkgs',
        'neighborhood2_irtkau',
        'sport_m04xaa',
        'work_street_mo1w1b',
        'school_v0elcf',
    ];

    const [isAnimationVisible, setIsAnimationVisible] = useState(false);
    const animationRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsAnimationVisible(true);
                    observer.unobserve(entry.target); // הסר את המאזין לאחר שהאנימציה הופעלה
                }
            },
            { threshold: 0.1 }
        );

        if (animationRef.current) {
            observer.observe(animationRef.current);
        }

        return () => {
            if (animationRef.current) {
                observer.unobserve(animationRef.current);
            }
        };
    }, []);

    return (
        <Container fluid className="px-0 py-0">
            <section className="hero-section">
                {/* <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={false}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="hero-swiper"
                >
                    {heroImages.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="hero-slide">
                                <CldImage
                                    src={image}
                                    alt={`תמונת גיבור ${index + 1}`}
                                    layout="fill"
                                    objectFit="cover"
                                    quality={100}
                                />
                                <div className="hero-overlay" />
                                <div className="hero-content-wrapper">
                                    <motion.div
                                        className="hero-content"
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                    >
                                        <h1 className="hero-title">ברוכים הבאים לקהילאפ</h1>
                                        <p className="hero-subtitle">המקום שלך לחיבור, מידע ושיתוף בקהילת רמות</p>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.8 }}
                                        >
                                            <Link href="/about" className="hero-cta-button">
                                                גלה עוד על הקהילה שלנו
                                            </Link>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper> */}
                <div className="video-container">
                    <video
                        ref={videoRef}
                        src="/videos/videoHome.mp4"
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
                        <h1 className='' style={{ fontSize: '50px' }}>ברוכים הבאים</h1>
                        <p className="hero-title font-extrabold" style={{background:'#00a35b'}}>רמות - רמת שלמה</p>
                </motion.div>
                <button onClick={togglePlay} className="video-control">
                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                </button>
            </section>

            <Container fluid className="content-container">
                <Row>
                    <Col lg={2} className="d-none d-lg-block">
                        <div className="sticky-ad-container">
                            <div className="ad-space">
                                <img src='/images/ads gif new 4.gif' width="auto" height="auto" alt='ads-left' className='rounded' />
                            </div>
                        </div>
                    </Col>
                    <Col lg={8}>
                        <div className='main-content-container rounded-t mx-auto'>
                            <div className='main-content'>
                                {/* <div>
                                    <svg width="100" height="100" viewBox="0 0 3493 3092" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3459.11 2716.15C3555.34 2882.81 3435.06 3091.15 3242.61 3091.15L251.103 3091.15C58.6527 3091.15 -61.6281 2882.81 34.597 2716.15L1530.35 125.428C1626.57 -41.2382 1867.14 -41.2378 1963.36 125.429L3459.11 2716.15Z" fill="#D9D9D9" />
                                    </svg>
                                </div> */}
                                <section className="info-cards-section pb-0 rounded mb-5 mx-auto" style={{ width: '85%' }}>
                                    {/* <h2 className="section-title text-white mb-3">מה חדש ברמות?</h2> */}
                                    <Swiper
                                        slidesPerView={3}
                                        spaceBetween={20}
                                        autoplay={{
                                            delay: 5000,
                                            disableOnInteraction: false,
                                        }}
                                        // pagination={{
                                        //     el: '.custom-pagination',
                                        //     clickable: true,
                                        //     type: 'bullets',
                                        //     renderBullet: function (index, className) {
                                        //         return '<span class="' + className + ' custom-bullet"></span>';
                                        //     },
                                        // }}
                                        // navigation={true}
                                        modules={[Autoplay, Pagination, Navigation]}
                                        className="info-cards-slider p-3 custom-arrows-swiper"
                                        breakpoints={{
                                            320: {
                                                slidesPerView: 1,
                                                // spaceBetween: 10
                                            },
                                            640: {
                                                slidesPerView: 2,
                                                // spaceBetween: 15
                                            },
                                            1225: {
                                                slidesPerView: 3,
                                                // spaceBetween: 5
                                            }
                                        }}
                                    >
                                        {infoCards.map((card, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="info-card p-4 rounded shadow-sm">
                                                    {/* <div className="bg-danger"> */}
                                                    <div className="card-icon flex align-items-center">
                                                        {/* <i className={`bi bi-${card.icon} me-2`} style={{ color: '#00a35b ' }}></i> */}
                                                        <h3 className='font-bold mb-2'>{card.title}</h3>
                                                    </div>
                                                    <div className="">
                                                        <p>{card.content}</p>
                                                    </div>
                                                    {/* </div> */}
                                                    {/* <div className="home-info-card-footer mt-auto">
                                                        <button className='btn btn-link-home-card w-75 border mx-auto my-auto'>
                                                            <Link href={card.link} className="link no-underline">
                                                                גלה עוד
                                                        
                                                            </Link>
                                                        </button>
                                                    </div> */}
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                        {/* <div className="custom-pagination"></div> */}
                                    </Swiper>
                                </section>
                                {/* <div className="grid-container">
                                    <div className="grid-item item1 rounded"><div className='inside1 rounded text-center'><i className='bi bi-car-front'></i>
                                    <p>hfhbfchb</p>
                                    </div></div>
                                    <div className="grid-item item2">חיים טכנולוגיים</div>
                                    <div className="grid-item item3">מעניין</div>
                                    <div className="grid-item item4">אוטומטית</div>
                                    <div className="grid-item item5">תוכן נוסף</div>
                                </div> */}
                                <div className="mobile-ad-space ad-space-2 d-md-none my-2">
                                    <img src='/images/saleAds.gif' alt='ads-phone' className='rounded' />
                                </div>
                                <section className="statistics-section">
                                    {/* <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="section-title"
                                    >
                                        שכונת רמות - נתונים ומידע
                                    </motion.h2> */}

                                    {/* <Statistic /> */}

                                    {[0, 1, 2, 3, 4].map((rowIndex) => (
                                        <div key={rowIndex} className={`info-row ${rowIndex % 2 === 0 ? 'row-reverse' : ''}`}>
                                            <motion.div
                                                className="image-container"
                                            >
                                                <Lottie lottieNmae={images[rowIndex]} />
                                            </motion.div>
                                            {neighborhoodInfo[rowIndex] && (
                                                <div
                                                    className="neighborhood-info rounded"
                                                // initial={{ opacity: 0, y: 20 }}
                                                // whileInView={{ opacity: 1, y: 0 }}
                                                // transition={{ duration: 0.5 }}
                                                >
                                                    <h4 className='font-bold text-2xl'>{neighborhoodInfo[rowIndex].title}</h4>
                                                    <p>{neighborhoodInfo[rowIndex].description}</p>
                                                </div>
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
                                <img src='/images/ads gif new 3.gif' width="auto" height="auto" alt='ads-right' className='rounded' />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default HomePage;