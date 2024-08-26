"use client"
import React, { useState, useEffect, useRef } from 'react';
import './style1.css'
import { motion } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUsers, faSchool, faBaby, faTree, faSynagogue, faShoppingCart,
    faHospital, faRoad, faHome, faCalendarAlt, faStore,
    faMountain,
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

interface CounterStatisticProps {
    label: string;
    endValue: string;
    icon: IconDefinition;
}

// const CounterStatistic: React.FC<CounterStatisticProps> = ({ label, endValue, icon }) => {
//     const [count, setCount] = useState(0);
//     const [ref, inView] = useInView({
//         triggerOnce: true,
//         threshold: 0.1,
//     });

//     useEffect(() => {
//         if (inView) {
//             let start = 0;
//             const end = parseInt(endValue.replace(/,/g, ''));
//             const duration = 2000;
//             const increment = end / (duration / 16);

//             const timer = setInterval(() => {
//                 start += increment;
//                 if (start >= end) {
//                     clearInterval(timer);
//                     setCount(end);
//                 } else {
//                     setCount(Math.floor(start));
//                 }
//             }, 16);

//             return () => clearInterval(timer);
//         }
//     }, [inView, endValue]);

//     return (
//         <motion.div
//             ref={ref}
//             initial={{ opacity: 0, y: 20 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.5 }}
//             className="statistic-item text-center"
//         >
//             <FontAwesomeIcon icon={icon} className="statistic-icon" />
//             <div className="statistic-value">{count.toLocaleString()}</div>
//             <div className="statistic-label">{label}</div>
//         </motion.div>
//     );
// };

interface InfoCardProps {
    icon: IconDefinition;
    title: string;
    content: string;
    link: string;
}

// const InfoCard: React.FC<InfoCardProps> = ({ icon, title, content, link }) => (
//     <div className="info-card">
//         <div className="info-card-content">
//             <FontAwesomeIcon icon={icon} className="info-card-icon" />
//             <h3>{title}</h3>
//             <p>{content}</p>
//         </div>
//         <Link href={link} className="info-card-link">גלה עוד</Link>
//     </div>
// );

const HomePage: React.FC = () => {
    const router = useRouter();
    // const titleRef = useRef<HTMLHeadingElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const titleWords = "ברוכים הבאים לשכונת רמות".split(' ');
    // const { scrollY } = useViewportScroll();
    // const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    // const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

    const images = [
        'hose1_qejtcw',
        'ramot_view2_bwqqhu',
        'ramot_view3_yojt8w',
        'house2_vd8yke',
    ];

    const neighborhoodInfo = [
        {
            title: "היסטוריה של רמות",
            description: "שכונת רמות הוקמה ב-1970 ומאז התפתחה להיות אחת השכונות המובילות בעיר..."
        },
        {
            title: "חינוך ברמות",
            description: "רמות מתגאה במוסדות חינוך מצוינים, כולל בתי ספר יסודיים, תיכונים וגני ילדים..."
        },
        // הוסף עוד פריטי מידע כנדרש
    ];

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
                                        <div className="content-container">
                                            {rowIndex % 2 === 0 ? (
                                                <div className="statistics-group">
                                                    {statistics.slice(rowIndex * 2, (rowIndex * 2) + 4).map((stat, index) => (
                                                        <motion.div
                                                            key={index}
                                                            className="statistic-item"
                                                            initial={{ opacity: 0, y: 20 }}
                                                            whileInView={{ opacity: 1, y: 0 }}
                                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                                        >
                                                            <FontAwesomeIcon icon={stat.icon} className="statistic-icon" />
                                                            <div className="statistic-value">{stat.endValue}</div>
                                                            <div className="statistic-label">{stat.label}</div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <motion.div
                                                    className="neighborhood-info"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <h3>{neighborhoodInfo[Math.floor(rowIndex / 2)].title}</h3>
                                                    <p>{neighborhoodInfo[Math.floor(rowIndex / 2)].description}</p>
                                                </motion.div>
                                            )}
                                        </div>
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