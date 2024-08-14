"use client"
import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUsers, faSchool, faBaby, faTree, faSynagogue, faShoppingCart,
    faHospital, faRoad, faHome, faCalendarAlt, faStore, faSearch,
    faMountain, faChevronLeft, faChevronRight,
    faGraduationCap, faHeartbeat
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './style1.css'
import { gsap } from 'gsap';

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
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (titleRef.current) {
            const words = titleRef.current.querySelectorAll('.word');
            const searchIcon = titleRef.current.querySelector('.search-icon');

            // אנימציה למילים
            gsap.fromTo(words,
                {
                    y: 50,
                    opacity: 0,
                    rotation: 15,
                    scale: 0.8
                },
                {
                    y: 0,
                    opacity: 1,
                    rotation: 0,
                    scale: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "elastic.out(1, 0.3)"
                }
            );

            // אנימציה לאייקון החיפוש
            gsap.fromTo(searchIcon,
                {
                    scale: 0,
                    opacity: 0,
                    rotation: 360
                },
                {
                    scale: 1,
                    opacity: 1,
                    rotation: 0,
                    duration: 1,
                    ease: "back.out(1.7)",
                    delay: 1 // מתחיל אחרי שהמילים מסיימות להופיע
                }
            );
        }
    }, []);

    const carouselItems = [
        {
            image: 'neighborhood2_irtkau',
            title: '14/08/2024',
            description: 'טקס פתיחת שנת הלימודים בבית ספר רמות.'
        },
        {
            image: 'work_street_yith94',
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

    const infoCards: InfoCardProps[] = [
        {
            icon: faHome,
            title: "נדל\"ן חדש",
            content: "פרויקט מגורים חדשני ברמות ג' - דירות יוקרה עם נוף פנורמי לירושלים. הזדמנות להשקעה!",
            link: "/nadlan"
        },
        {
            icon: faCalendarAlt,
            title: "אירועי תרבות",
            content: "פסטיבל האביב של רמות - שבוע של מופעים, סדנאות ופעילויות לכל המשפחה. הכניסה חופשית!",
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
            content: "גן החיות הקהילתי החדש נפתח! בואו לפגוש את בעלי החיים ולהנות מפינות ליטוף ופעילויות לילדים.",
            link: "/"
        },
        {
            icon: faGraduationCap,
            title: "חינוך",
            content: "בית הספר 'אופק' זכה בפרס החינוך הארצי! תכנית הלימודים החדשנית מושכת תשומת לב ארצית.",
            link: "/"
        },
        {
            icon: faHeartbeat,
            title: "בריאות וספורט",
            content: "מרכז הספורט העירוני מציע קורסי יוגה חינמיים לגיל השלישי. הצטרפו אלינו לחיים בריאים!",
            link: "/"
        }
    ];

    return (
        <Container fluid className="px-0 py-0 home-container">
            <section className="hero-section">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="hero-image-container"
                        style={{ scale }}
                    >
                        <CldImage
                            src={carouselItems[currentSlide].image}
                            fill
                            style={{ objectFit: 'cover' }}
                            alt={carouselItems[currentSlide].description}
                            sizes="100vw"
                        />
                    </motion.div>
                </AnimatePresence>
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <motion.h1 ref={titleRef} className="hero-title">
                        <span className="word">ברוכים</span>{' '}
                        <span className="word">הבאים</span>{' '}
                        <span className="word">לאתר</span>{' '}
                        <span className="word">שכונת</span>{' '}
                        <span className="word">רמות</span>{' '}
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    </motion.h1>
                    <motion.p
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="hero-description"
                    >
                        {carouselItems[currentSlide].description}
                    </motion.p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hero-button"
                    >
                        גלה עוד
                    </motion.button>
                </div>
                <button
                    onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + carouselItems.length) % carouselItems.length)}
                    className="carousel-control carousel-control-left"
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button
                    onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length)}
                    className="carousel-control carousel-control-right"
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </section>
            <Container fluid className="content-container">
                <Row>
                    <Col lg={2} className="d-none d-lg-block">
                        {/* אזור פרסומות שמאלי */}
                        <div className="ad-container">
                            <div className="ad-space">
                                <img src='/images/bookgif.webp' className='rounded' />
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
                                    className="info-swiper"
                                    breakpoints={{
                                        640: {
                                            slidesPerView: 1,
                                            spaceBetween: 20,
                                        },
                                        768: {
                                            slidesPerView: 2,
                                            spaceBetween: 30,
                                        },
                                        1024: {
                                            slidesPerView: 3,
                                            spaceBetween: 20,
                                        },
                                    }}
                                >
                                    {infoCards.map((card, index) => (
                                        <SwiperSlide key={index}>
                                            <InfoCard {...card} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </section>

                            <section className="statistics-section">
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
                                <img src='/images/timegif.webp' className='rounded' />
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