"use client"
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
    <div className="info-card border">
        <div>
            <FontAwesomeIcon icon={icon} className="info-card-icon" />
            <h3>{title}</h3>
            <p>{content}</p>
        </div>
        <Link href={link} className="info-card-link text-center">גלה עוד</Link>
    </div>
);

const HomePage: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const carouselItems = [
        {
            image: 'panorama1_exutgv',
            title: '14/08/2024',
            description: 'טקס פתיחת שנת הלימודים בבית ספר רמות.'
        },
        {
            image: 'work_street_yith94',
            title: '10/08/2024',
            description: 'עבודות תשתית ברחוב הרב אויערבך - צפויים שיבושי תנועה.'
        },
        {
            image: 'sport_ytyyfu',
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
        <Container fluid className="px-4 py-4" style={{ backgroundColor: '#f0f2f5' }}>
            <Row>
                <Col md={2} className="d-none d-md-block">
                    <div className="sticky pt-3" style={{ top: '110px', overflowY: 'auto' }}>
                        <div className="ad-space">
                            {/* <h5>פרסומת</h5> */}
                            <img src="/images/bookgif.webp" alt="פרסומת 1" className="img-fluid rounded" />
                        </div>
                        {/* <div className="ad-space">
                            <h5>פרסומת</h5>
                            <img src="/ads/ad2.jpg" alt="פרסומת 2" className="img-fluid" />
                        </div> */}
                    </div>
                </Col>
                <Col md={8}>
                    <div className="main-content">
                        <motion.section
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="hero-section flex items-center justify-center"
                        >
                            <AnimatePresence initial={false}>
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0"
                                >
                                    <CldImage
                                        src={carouselItems[currentSlide].image}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        alt={carouselItems[currentSlide].description}
                                        sizes="100vw"
                                    />
                                    <div className="absolute inset-0 bg-black opacity-40"></div>
                                </motion.div>
                            </AnimatePresence>
                            <div className="hero-content">
                                <motion.h1
                                    initial={{ y: -50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                    className="hero-title"
                                >
                                    ברוכים הבאים לאתר שכונת רמות
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
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none"
                            >
                                <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
                            </button>
                            <button
                                onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none"
                            >
                                <FontAwesomeIcon icon={faChevronRight} className="text-xl" />
                            </button>
                        </motion.section>

                        <section className="py-8">
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
                                className="mySwiper p-4"
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

                        <section className="py-8">
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
                    </div>
                </Col>
                <Col md={2} className="d-none d-md-block">
                    <div className="sticky pt-3" style={{ top: '110px', overflowY: 'auto' }}>
                        <div className="ad-space">
                            {/* <h5>פרסומת</h5> */}
                            <img src="/images/timegif.webp" alt="פרסומת 3" className="img-fluid rounded" />
                        </div>
                        {/* <div className="ad-space">
                            <h5>פרסומת</h5>
                            <img src="/ads/ad4.jpg" alt="פרסומת 4" className="img-fluid" />
                        </div> */}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;