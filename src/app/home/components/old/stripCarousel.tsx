// "use client"
// import React from 'react';
// import Carousel from 'react-bootstrap/Carousel';
// import './style.css';


// export default function StripCarousel() {
//     return (
//         <div className='container strip'>
//             <div className='mt-2' >
//             <Carousel className='w-75 rounded shadow mx-auto' >
//                 <Carousel.Item>
//                     <img src='/images/strip/neighborhood1.jpg' className='d-block w-100 rounded' style={{height:"50vh" }}></img>
//                     <Carousel.Caption className='bg-light bg-opacity-50 rounded text-dark'>
//                         <h3>First slide label</h3>
//                         <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//                     </Carousel.Caption>
//                 </Carousel.Item>
//                 <Carousel.Item>
//                     <img src='/images/strip/neighborhood2.jpg' className='d-block w-100 rounded' style={{height:"50vh"}}></img>
//                     <Carousel.Caption className='bg-light bg-opacity-50 rounded text-dark'>
//                         <h3>Second slide label</h3>
//                         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//                     </Carousel.Caption>
//                 </Carousel.Item>
//                 <Carousel.Item>
//                     <img src='/images/strip/neighborhood3.jpg' className='d-block w-100 rounded' style={{height:"50vh"}}></img>

//                     <Carousel.Caption className='bg-light bg-opacity-50 rounded text-dark'>
//                         <h3>Third slide label</h3>
//                         <p>
//                             Praesent commodo cursus magna, vel scelerisque nisl consectetur.
//                         </p>
//                     </Carousel.Caption>
//                 </Carousel.Item>
//             </Carousel>
//             </div>
//         </div>
//     )
// }

"use client"
import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './style.css';
import { motion, useAnimation } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faSchool, faBaby, faTree, faSynagogue, faShoppingCart, faHospital, faRoad } from '@fortawesome/free-solid-svg-icons';

const CounterStatistic = ({ label, endValue, icon }:any) => {
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

export default function StripCarousel() {
    const carouselItems = [
        {
            image: 'ramot_view_ksfnft',
            title: '14/08/2024',
            description: 'טקס פתיחת שנת הלימודים בבית ספר רמות.'
        },
        {
            image: 'ramot_view3_yojt8w',
            title: '10/08/2024',
            description: 'עבודות תשתית ברחוב הרב אויערבך - צפויים שיבושי תנועה.'
        },
        {
            image: 'ramot_view2_bwqqhu',
            title: '05/08/2024',
            description: 'פתיחת ההרשמה לחוגי הספורט העירוניים לשנת תשפ\"ה.'
        }
    ];
    const statistics = [
        { label: 'תושבים', endValue: '50000', icon: faUsers },
        { label: 'בתי ספר', endValue: '15', icon: faSchool },
        { label: 'גני ילדים', endValue: '50', icon: faBaby },
        { label: 'פארקים', endValue: '10', icon: faTree },
        { label: 'בתי כנסת', endValue: '30', icon: faSynagogue },
        { label: 'מרכזי קניות', endValue: '5', icon: faShoppingCart },
        { label: 'מרפאות', endValue: '8', icon: faHospital },
        { label: 'קווי אוטובוס', endValue: '12', icon: faRoad }
    ];

    return (
        <div className='container strip px-0'>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='title text-center my-5'
            >
                <h1 className='display-4 fw-bold text-primary'>ברוכים הבאים לאתר שכונת רמות</h1>
                <p className='lead text-muted'>המקום לכל המידע והשירותים לתושבי השכונה</p>
            </motion.div>
            <div className='mt-2'>
                <Carousel className='carousel-responsive rounded shadow mx-auto'>
                    {carouselItems.map((item, index) => (
                        <Carousel.Item key={index}>
                            <div className="carousel-image-container">
                                <CldImage
                                    src={item.image}
                                    width="800"
                                    height="400"
                                    sizes="100vw"
                                    crop="fill"
                                    className="d-block w-100 rounded carousel-image"
                                    alt='נוף שכונת רמות'
                                    priority
                                />

                                {/* <img 
                                    src={item.image} 
                                    className='d-block w-100 rounded carousel-image' 
                                    alt={`Slide ${index + 1}`}
                                /> */}
                            </div>
                            <Carousel.Caption className='bg-light bg-opacity-75 rounded text-dark'>
                                <h3 className='font-bold text-4xl'>{item.title}</h3>
                                <p>{item.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
            <div className='mt-5 statistics-section'>
                <h2 className='text-center text-primary text-4xl mb-4'>סטטיסטיקות שכונת רמות</h2>
                <div className='statistics-container'>
                    {statistics.map((stat, index) => (
                        <CounterStatistic key={index} label={stat.label} endValue={stat.endValue} icon={stat.icon} />
                    ))}
                </div>
            </div>
        </div >
    )
}