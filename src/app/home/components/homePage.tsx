"use client"
import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './style.css';
import { motion, useAnimation } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUsers, faSchool, faBaby, faTree, faSynagogue, faShoppingCart,
    faHospital, faRoad, faHome, faCalendarAlt, faStore, faSearch,
    faMountain,
    faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Col, Row } from 'react-bootstrap';

interface CounterStatisticProps {
    label: string;
    endValue: string;
    icon: IconDefinition;
}


const CounterStatistic: React.FC<CounterStatisticProps> = ({ label, endValue, icon }) => {
    const [count, setCount] = useState(0);


    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });



    useEffect(() => {
        if (inView) {
            controls.start({
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 }
            });

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
    }, [inView, endValue, controls]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            className="statistic-item text-center"
        >
            <div className="statistic-icon">
                <FontAwesomeIcon icon={icon} />
            </div>
            <h2>{count.toLocaleString()}</h2>
            <p>{label}</p>
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
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="info-card"
        style={{ height: '250px' }} // או כל גובה אחר שמתאים לתוכן שלך
    >
        <FontAwesomeIcon icon={icon} className="info-icon" />
        <h3>{title}</h3>
        <p>{content}</p>
        <a href={link} className="info-link">קרא עוד</a>
    </motion.div>
);

interface CarouselItem {
    image: string;
    title: string;
    description: string;
}

const StripCarousel: React.FC = () => {
    const [showStatistics, setShowStatistics] = useState(false);

    useEffect(() => {
        setShowStatistics(true);
    }, []);

    const carouselItems: CarouselItem[] = [
        {
            image: 'school_m7feau',
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
            description: 'פתיחת ההרשמה לחוגי הספורט העירוניים לשנת תשפ\"ה.'
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
        { label: 'גובה מעל פני הים', endValue: '885', icon: faMountain }
    ];

    const infoCards: InfoCardProps[] = [
        {
            icon: faHome,
            title: "נדל\"ן",
            content: "דירת 4 חדרים למכירה ברחוב הרב קוק, קומה 3, נוף מרהיב.",
            link: "/real-estate"
        },
        {
            icon: faCalendarAlt,
            title: "אירועים",
            content: "הרצאה בנושא 'חינוך ילדים בעידן הדיגיטלי' במתנ\"ס רמות ביום שלישי הקרוב.",
            link: "/events"
        },
        {
            icon: faStore,
            title: "עסקים מקומיים",
            content: "פיצרייה 'טעם של פעם' - מבצע השבוע: קנה פיצה משפחתית וקבל שתייה חינם!",
            link: "/local-businesses"
        },
        {
            icon: faSearch,
            title: "אבידות ומציאות",
            content: "נמצא צרור מפתחות ליד גן השעשועים ברחוב הרצוג. לפרטים פנו למשרד השכונתי.",
            link: "/lost-and-found"
        }
    ];

    return (
        <div className='container-fluid strip px-0' style={{ minHeight: '100vh' }}>
            <Row className="mx-0">
                {/* מקום לפרסומת בצד שמאל */}
                <Col md={2} className="d-none d-md-block">
                    <div style={{
                        position: 'sticky',
                        top: '100px',
                        overflowY: 'auto'
                    }}>
                        <div className="p-3 mt-2">
                            <img
                                src="/images/bookgif.gif"
                                alt="תיאור הפרסומת"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>
                    </div>
                </Col>
                <Col md={8}>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className='title text-center my-5'
                    >
                        <h1 className='display-4 fw-bold home-title'>ברוכים הבאים לאתר שכונת רמות</h1>
                        {/* <p className='lead text-muted'>המקום לכל המידע והשירותים לתושבי השכונה</p> */}
                    </motion.div>

                    <div className='mt-2 w-100 p-0 rounded'>
                        <Carousel className=' rounded shadow w-100' style={{width:'100%'}}>
                            {carouselItems.map((item, index) => (
                                <Carousel.Item key={index}>
                                    <div className="carousel-image-container w-100">
                                        <CldImage
                                            src={item.image}
                                            width="600"
                                            height="400"
                                            sizes="100vw"
                                            crop="fill"
                                            className="d-block rounded carousel-image"
                                            alt='נוף שכונת רמות'
                                            placeholder="blur"
                                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
                                            format="auto"
                                            quality="auto"
                                        />
                                    </div>
                                    <Carousel.Caption className='bg-light bg-opacity-75 rounded text-dark'>
                                        <h3 className='font-bold text-4xl'>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                    {showStatistics && (
                        <div className='mt-5 statistics-section bg-white'>
                            <h2 className='text-center text-4xl mb-4 statistics-title'>סטטיסטיקות שכונת רמות</h2>
                            <div className='statistics-container'>
                                {statistics.map((stat, index) => (
                                    <CounterStatistic key={index} {...stat} />
                                ))}
                            </div>
                        </div>
                    )}
                    <div className='mt-5 info-section bg-white'>
                        <h2 className='text-center text-4xl mb-4 info-title'>מה חדש ברמות?</h2>
                        <div className='info-container'>
                            {infoCards.map((card, index) => (
                                <InfoCard key={index} {...card} />
                            ))}
                        </div>
                    </div>
                </Col>
                <Col md={2} className="d-none d-md-block px-0">
                    <div style={{
                        position: 'sticky',
                        top: '100px',
                        overflowY: 'auto'
                    }}>
                        <div className="p-3 mt-2">
                            <img
                                src="/images/timegif.gif"
                                alt="תיאור הפרסומת השנייה"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default StripCarousel;