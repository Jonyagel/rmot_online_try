"use client"
import React, { useState, useEffect, useRef } from 'react';
import './style1.css'
import { AnimatePresence, motion, useScroll, useTransform, useViewportScroll } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUsers, faSchool, faBaby, faTree, faSynagogue, faShoppingCart,
    faHospital, faRoad, faHome, faCalendarAlt, faStore, faSearch,
    faMountain, faChevronLeft, faChevronRight,
    faGraduationCap, faHeartbeat, faPlay, faPause,
    faChevronDown,
    faMapMarkerAlt,
    faTimes,
    faClock
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';
import { auto } from '@popperjs/core';

interface CounterStatisticProps {
    label: string;
    endValue: string;
    icon: IconDefinition;
}

const CounterStatistic: React.FC<CounterStatisticProps> = ({ label, endValue, icon }) => {
    const [count, setCount] = useState(0);
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            let start = 0;
            const end = parseInt(endValue.replace(/,/g, ''));
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    clearInterval(timer);
                    setCount(end);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }
    }, [inView, endValue]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="statistic-item text-center"
        >
            <FontAwesomeIcon icon={icon} className="statistic-icon" />
            <div className="statistic-value">{count.toLocaleString()}</div>
            <div className="statistic-label">{label}</div>
        </motion.div>
    );
};

interface InfoCardProps {
    icon: IconDefinition;
    title: string;
    content: string;
    link: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, content, link }) => (
    <div className="info-card">
        <div className="info-card-content">
            <FontAwesomeIcon icon={icon} className="info-card-icon" />
            <h3>{title}</h3>
            <p>{content}</p>
        </div>
        <Link href={link} className="info-card-link">גלה עוד</Link>
    </div>
);

const HomePage: React.FC = () => {
    const router = useRouter();
    // const titleRef = useRef<HTMLHeadingElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const titleWords = "ברוכים הבאים לשכונת רמות".split(' ');
    // const { scrollY } = useViewportScroll();
    // const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    // const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const wordVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            rotateX: -45,
            filter: "blur(10px)"
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const carouselItems = [
        {
            image: 'neighborhood2_irtkau',
            title: '14/08/2024',
            description: 'טקס פתיחת שנת הלימודים בבית ספר רמות.'
        },
        {
            image: 'ramot_ai1_x5bxdh',
            title: '10/08/2024',
            description: 'עבודות תשתית ברחוב הרב אויערבך - צפויים שיבושי תנועה.'
        },
        {
            image: 'neighborhood1_wcwkgs',
            title: '05/08/2024',
            description: 'פתיחת ההרשמה לחוגי הספורט העירוניים לשנת תשפ"ה.'
        }
    ];

    const statistics: CounterStatisticProps[] = [
        { label: 'תושבים', endValue: '55000', icon: faUsers },
        { label: 'בתי ספר', endValue: '15', icon: faSchool },
        { label: 'גני ילדים', endValue: '50', icon: faBaby },
        { label: 'פארקים', endValue: '10', icon: faTree },
        { label: 'בתי כנסת', endValue: '30', icon: faSynagogue },
        { label: 'מרכזי קניות', endValue: '5', icon: faShoppingCart },
        { label: 'מרפאות', endValue: '8', icon: faHospital },
        { label: 'קווי אוטובוס', endValue: '12', icon: faRoad },
        { label: 'גובה מעל פני הים', endValue: '885', icon: faMountain },
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

    return (
        <Container fluid className="px-0 py-0 home-container">
            {/* <div className="desktop-top-ad d-none d-md-block">
                <div className="ad-placeholder">פרסומת</div>
                <img className="ad-placeholder rounded" src='/images/ads1top.jpg' />
            </div> */}
                <motion.section className="video-section">
                    <div className="video-container">
                        <video
                            ref={videoRef}
                            src="/videos/panorama2.mp4"
                            autoPlay
                            loop
                            muted
                            className="video-background"
                        />
                    </div>
                    <button onClick={togglePlay} className="video-control" title="playVideo">
                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                    </button>
                    <div className="hero-overlay"></div>
                    <div className="hero-content">

                        <motion.h1
                            className="hero-title"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {titleWords.map((word, index) => (
                                <motion.span
                                    key={index}
                                    className="word"
                                    variants={wordVariants}
                                    style={{ display: 'inline-block', marginRight: '0.3em' }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </motion.h1>
                        <motion.p
                            className="hero-subtitle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                        >
                            גלו את הקהילה המיוחדת שלנו
                        </motion.p>
                        <motion.div
                            className="cta-container"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.5, duration: 0.5 }}
                        >
                            <Link href="#statistics-section" className="cta-button">גלו עוד</Link>
                        </motion.div>
                    </div>
                    {/* <motion.div
                        className="scroll-indicator d-md-none"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        <FontAwesomeIcon icon={faChevronDown} />
                    </motion.div> */}
                    <div className="info-overlay">
                        <div className="info-item">
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                            <span>ירושלים, ישראל</span>
                        </div>
                        <div className="info-item">
                            <FontAwesomeIcon icon={faClock} />
                            <span>{currentTime.toLocaleTimeString('he-IL')}</span>
                        </div>
                    </div>
                </motion.section>
            {/* <section className="content-section">
                <div className="wave-divider">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                    </svg>
                </div>
            </section> */}
            <div className="mobile-ad-space ad-space-1 d-md-none" style={{zIndex:'1', position:'relative'}}>
                {/* <div className="ad-placeholder">פרסומת</div> */}
                <img src='/images/saleAds.gif' width={auto} height={auto} alt='ads-phone' className='rounded' />
            </div>
            <Container fluid className="content-container">
                <Row>
                    <Col lg={2} className="d-none d-lg-block">
                        {/* אזור פרסומות שמאלי */}
                        <div className="ad-container">
                            <div className="ad-space">
                                <img src='/images/bookgif.webp' width={auto} height={auto} alt='ads-left' className='rounded' />
                            </div>
                        </div>
                    </Col>
                    <Col lg={8}>

                        <div className="main-content">
                            <section className="info-section">
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="section-title"
                                >
                                    מה חדש ברמות?
                                </motion.h2>
                                <Swiper
                                    spaceBetween={20}
                                    slidesPerView={3}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                    }}
                                    pagination={{ clickable: true }}
                                    navigation={true}
                                    modules={[Autoplay, Pagination, Navigation]}
                                    className="info-swiper p-3"
                                    breakpoints={{
                                        320: {
                                            slidesPerView: 1,
                                            spaceBetween: 10,
                                        },
                                        768: {
                                            slidesPerView: 2,
                                            spaceBetween: 20,
                                        },
                                        1024: {
                                            slidesPerView: 2,
                                            spaceBetween: 25,
                                        },
                                        1500: {
                                            slidesPerView: 3,
                                            spaceBetween: 25,
                                        },
                                    }}
                                >
                                    {infoCards.map((card, index) => (
                                        <SwiperSlide key={index} className='py-3'>
                                            <InfoCard {...card} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </section>
                            <div className="mobile-ad-space ad-space-2 d-md-none my-2">
                                <img src='/images/saleAds.gif' alt='ads-phone' className='rounded' />
                            </div>
                            <section className="statistics-section" id='statistics-section'>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="section-title"
                                >
                                    סטטיסטיקות שכונת רמות
                                </motion.h2>
                                <Row className="justify-content-center">
                                    {statistics.map((stat, index) => (
                                        <Col key={index} xs={6} sm={4} md={4} lg={3} className="mb-4">
                                            <CounterStatistic {...stat} />
                                        </Col>
                                    ))}
                                </Row>
                            </section>
                        </div >
                    </Col>
                    <Col lg={2} className="d-none d-lg-block ">
                        {/* אזור פרסומות ימני */}
                        <div className="ad-container">
                            <div className="ad-space">
                                <img src='/images/timegif.webp' width={auto} height={auto} alt='ads-right' className='rounded' />
                                {/* כאן תוכל להוסיף את קוד הפרסומת שלך */}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default HomePage;