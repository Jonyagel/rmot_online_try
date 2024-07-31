// "use client"
// import React from 'react'
// import Accordion from 'react-bootstrap/Accordion';

// export default function AcordionShops() {
//     return (
//         <div className='mt-5'>
//             <Accordion className='rounded-2xl'>
//                 <Accordion.Item eventKey="0" className='mb-3 border-0 shadow-sm'>
//                     <Accordion.Header>
//                         <div className='w-1/12 '>
//                             <img src='/images/strip/neighborhood1.jpg' className='rounded-full'></img>
//                         </div>
//                         <div className='w-4/12 ms-2 text-end '>
//                             <h4 className='font-bold'>אפקטיבי הדברות</h4>
//                             <p>הדברת כל סוגי המזיקים</p>
//                         </div>
//                         <div className='w-3/12'></div>
//                         <div className='w-3/12'>
//                             <div className='flex'>
//                                 <i className="bi bi-geo-alt"></i>
//                                 <p className='me-2'>יהלום 38, גבעת זאב</p>
//                             </div>
//                             <div className='flex'>
//                                 <i className="bi bi-telephone"></i>
//                                 <p className='me-2'>050-5232235</p>
//                             </div>
//                         </div>
//                     </Accordion.Header>
//                     <Accordion.Body>
//                         <div className='flex'>
//                             <div className='w-4/12 p-2 text-end'>
//                                 אנחנו באפקטיבי הדברות מתמחים בכל סוגי ההדברות לכל סוגי המזיקים. במידה והתעוררתם בבוקר, הרגשתם משהו על הרגל, הסתכלתם, קיווצתם, ואז גיליתם שיש לו רגליים או בעצם הוא מקק, אל תפחדו כמו מי שבחרדות מאז ולא מעיז לישון עם שמיכה, פנו אלינו וקבלו את התשובה. אין מקקים!!!
//                                 נשמח לעמוד לשרותכם
//                             </div>
//                             <div className='w-4/12 px-5 py-2'>
//                                 <p className='font-bold'>
//                                     שעות פתיחה:
//                                 </p>
//                                 ימים א-ד בין השעות 9:00-16:00
//                                 <br />
//                                 יום ה בין השעות 10:00-14:00
//                                 <br />
//                                 יום ו, שבתות וחגים-סגור!
//                             </div>
//                             <div className='w-4/12 p-2 flex flex-col justify-center'>
//                                 <div className='flex'>
//                                     <i className="bi bi-envelope"></i>
//                                     <p className='me-2'>yy0583223090@gmail.com</p>
//                                 </div>
//                                 <div className='flex'>
//                                     <i className="bi bi-globe"></i>
//                                     <p className='me-2'>www.jonyagel.co.il</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="1" className='mb-3 border-0 shadow-sm'>
//                     <Accordion.Header>
//                         <div className='w-1/12 '>
//                             <img src='/images/strip/neighborhood1.jpg' className='rounded-full'></img>
//                         </div>
//                         <div className='w-4/12 ms-2 text-end'>
//                             <h4 className='font-bold'>אפקטיבי הדברות</h4>
//                             <p>הדברת כל סוגי המזיקים</p>
//                         </div>
//                         <div className='w-3/12'></div>
//                         <div className='w-3/12'>
//                             <div className='flex'>
//                                 <i className="bi bi-geo-alt"></i>
//                                 <p className='me-2'>יהלום 38, גבעת זאב</p>
//                             </div>
//                             <div className='flex'>
//                                 <i className="bi bi-telephone"></i>
//                                 <p className='me-2'>050-5232235</p>
//                             </div>
//                         </div>
//                     </Accordion.Header>
//                     <Accordion.Body>
//                     <div className='flex'>
//                             <div className='w-4/12 p-2 text-end'>
//                                 אנחנו באפקטיבי הדברות מתמחים בכל סוגי ההדברות לכל סוגי המזיקים. במידה והתעוררתם בבוקר, הרגשתם משהו על הרגל, הסתכלתם, קיווצתם, ואז גיליתם שיש לו רגליים או בעצם הוא מקק, אל תפחדו כמו מי שבחרדות מאז ולא מעיז לישון עם שמיכה, פנו אלינו וקבלו את התשובה. אין מקקים!!!
//                                 נשמח לעמוד לשרותכם
//                             </div>
//                             <div className='w-4/12 px-5 py-2'>
//                                 <p className='font-bold'>
//                                     שעות פתיחה:
//                                 </p>
//                                 ימים א-ד בין השעות 9:00-16:00
//                                 <br />
//                                 יום ה בין השעות 10:00-14:00
//                                 <br />
//                                 יום ו, שבתות וחגים-סגור!
//                             </div>
//                             <div className='w-4/12 p-2 flex flex-col justify-center'>
//                                 <div className='flex'>
//                                     <i className="bi bi-envelope"></i>
//                                     <p className='me-2'>yy0583223090@gmail.com</p>
//                                 </div>
//                                 <div className='flex'>
//                                     <i className="bi bi-globe"></i>
//                                     <p className='me-2'>www.jonyagel.co.il</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </Accordion.Body>
//                 </Accordion.Item>
//             </Accordion>
//         </div>
//     )
// }

// "use client"
// import React from 'react'
// import Accordion from 'react-bootstrap/Accordion';
// import { motion, AnimatePresence } from 'framer-motion';
// import './acordionShops.css';

// export default function AcordionShops() {
//     const shopData = [
//         {
//             id: "0",
//             name: "אפקטיבי הדברות",
//             description: "הדברת כל סוגי המזיקים",
//             logo: "/images/strip/neighborhood1.jpg",
//             content: "אנחנו באפקטיבי הדברות מתמחים בכל סוגי ההדברות לכל סוגי המזיקים. במידה והתעוררתם בבוקר, הרגשתם משהו על הרגל, הסתכלתם, קיווצתם, ואז גיליתם שיש לו רגליים או בעצם הוא מקק, אל תפחדו כמו מי שבחרדות מאז ולא מעיז לישון עם שמיכה, פנו אלינו וקבלו את התשובה. אין מקקים!!! נשמח לעמוד לשרותכם",
//             hours: "ימים א-ד בין השעות 9:00-16:00\nיום ה בין השעות 10:00-14:00\nיום ו, שבתות וחגים-סגור!",
//             address: "יהלום 38, גבעת זאב",
//             phone: "050-5232235",
//             email: "yy0583223090@gmail.com",
//             website: "www.jonyagel.co.il"
//         },
//         {
//             id: "1",
//             name: "אפקטיבי הדברות",
//             description: "הדברת כל סוגי המזיקים",
//             logo: "/images/strip/neighborhood1.jpg",
//             content: "אנחנו באפקטיבי הדברות מתמחים בכל סוגי ההדברות לכל סוגי המזיקים. במידה והתעוררתם בבוקר, הרגשתם משהו על הרגל, הסתכלתם, קיווצתם, ואז גיליתם שיש לו רגליים או בעצם הוא מקק, אל תפחדו כמו מי שבחרדות מאז ולא מעיז לישון עם שמיכה, פנו אלינו וקבלו את התשובה. אין מקקים!!! נשמח לעמוד לשרותכם",
//             hours: "ימים א-ד בין השעות 9:00-16:00\nיום ה בין השעות 10:00-14:00\nיום ו, שבתות וחגים-סגור!",
//             address: "יהלום 38, גבעת זאב",
//             phone: "050-5232235",
//             email: "yy0583223090@gmail.com",
//             website: "www.jonyagel.co.il"
//         },
//         // ... (יתר נתוני החנויות)
//     ];

//     return (
//         <Accordion className="styled-accordion mt-5">
//         <AnimatePresence>
//             {shopData.map((shop) => (
//                 <motion.div
//                     key={shop.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ duration: 0.5 }}
//                 >
//                     <Accordion.Item eventKey={shop.id} className="styled-accordion-item">
//                         <Accordion.Header className="styled-accordion-header bg-info">
//                             <div className="shop-info justify-content-start">
//                                 <img src={shop.logo} width="60" height="60" alt={`${shop.name} logo`} className="shop-logo" />
//                                 <div className="shop-details">
//                                     <h4 className="shop-name">{shop.name}</h4>
//                                     <p className="shop-description d-none d-sm-block">{shop.description}</p>
//                                 </div>
//                             </div>
//                         </Accordion.Header>
//                         <Accordion.Body className="styled-accordion-body">
//                                 <div className='row'>
//                                     <div className='col-12 col-md-4 mb-3 mb-md-0 text-end'>
//                                         <p>{shop.content}</p>
//                                     </div>
//                                     <div className='col-12 col-md-4 mb-3 mb-md-0'>
//                                         <p className='font-bold'>שעות פתיחה:</p>
//                                         <p>{shop.hours}</p>
//                                     </div>
//                                     <div className='col-12 col-md-4'>
//                                         <div className="contact-info-acordion">
//                                             <i className="bi bi-geo-alt"></i>
//                                             <p className='mb-0'>{shop.address}</p>
//                                         </div>
//                                         <div className="contact-info-acordion">
//                                             <i className="bi bi-telephone"></i>
//                                             <p className='mb-0'>{shop.phone}</p>
//                                         </div>
//                                         <div className="contact-info-acordion">
//                                             <i className="bi bi-envelope"></i>
//                                             <p className='mb-0'>{shop.email}</p>
//                                         </div>
//                                         <div className="contact-info-acordion">
//                                             <i className="bi bi-globe"></i>
//                                             <p className='mb-0'>{shop.website}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </Accordion.Body>
//                         </Accordion.Item>
//                     </motion.div>
//                 ))}
//             </AnimatePresence>
//         </Accordion>
//     )
// }

"use client"
import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaTimes, FaStar, FaTag, FaCreditCard } from 'react-icons/fa';
import './acordionShops.css';

interface Shop {
  id: string;
  name: string;
  description: string;
  logo: string;
  content: string;
  hours: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  image: string;
  categories: string[];
}

export default function ShopCards() {
    const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const shopData: Shop[] = [
        {
            id: "1",
            name: "מכולת השכונה",
            description: "מכולת קטנה עם מבחר גדול",
            logo: "/images/strip/neighborhood1.jpg",
            content: "מכולת השכונה היא חנות קטנה עם לב גדול. אנו מציעים מגוון רחב של מוצרים טריים ואיכותיים.",
            hours: "א'-ה': 7:00-22:00, ו': 7:00-15:00, שבת: סגור",
            address: "רחוב הראשונים 10, תל אביב",
            phone: "03-1234567",
            email: "info@neighborhood-grocery.com",
            website: "www.neighborhood-grocery.com",
            categories: ["מזון", "מוצרי ניקיון"],
            image: "/images/strip/neighborhood1.jpg"
        },
        {
            id: "2",
            name: "מכולת השכונה",
            description: "מכולת קטנה עם מבחר גדול",
            logo: "/images/strip/neighborhood1.jpg",
            content: "מכולת השכונה היא חנות קטנה עם לב גדול. אנו מציעים מגוון רחב של מוצרים טריים ואיכותיים.",
            hours: "א'-ה': 7:00-22:00, ו': 7:00-15:00, שבת: סגור",
            address: "רחוב הראשונים 10, תל אביב",
            phone: "03-1234567",
            email: "info@neighborhood-grocery.com",
            website: "www.neighborhood-grocery.com",
            categories: ["מזון", "מוצרי ניקיון"],
            image: "/images/strip/neighborhood1.jpg"
        },
        // ... הוסף עוד חנויות כאן
    ];

    const handleShopClick = (shop: Shop) => {
        setSelectedShop(shop);
    };

    const closeModal = () => {
        setSelectedShop(null);
    };

    const filteredShops = useMemo(() => {
        return shopData.filter(shop => 
            (shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             shop.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (!selectedCategory || shop.categories.includes(selectedCategory))
        );
    }, [searchTerm, selectedCategory]);

    const allCategories = useMemo(() => {
        return Array.from(new Set(shopData.flatMap(shop => shop.categories)));
    }, []);

    return (
        <>
            <div className="shop-grid">
                {shopData.map((shop) => (
                    <motion.div
                        key={shop.id}
                        className="shop-card"
                        whileHover={{ y: -5 }}
                        onClick={() => setSelectedShop(shop)}
                    >
                        <img src={shop.logo} alt={shop.name} className="shop-logo" />
                        <h3>{shop.name}</h3>
                        <p>{shop.description}</p>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedShop && (
                    <motion.div 
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedShop(null)}
                    >
                        <motion.div 
                            className="modal-content"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="close-button" onClick={() => setSelectedShop(null)}>
                                <FaTimes />
                            </button>
                            <img src={selectedShop.image} alt={selectedShop.name} className="shop-image" />
                            <h2>{selectedShop.name}</h2>
                            <p className="shop-content">{selectedShop.content}</p>
                            <div className="shop-info">
                                <div className="info-item">
                                    <FaClock className="info-icon" />
                                    <p>{selectedShop.hours}</p>
                                </div>
                                <div className="info-item">
                                    <FaMapMarkerAlt className="info-icon" />
                                    <p>{selectedShop.address}</p>
                                </div>
                                <div className="info-item">
                                    <FaPhone className="info-icon" />
                                    <p>{selectedShop.phone}</p>
                                </div>
                                <div className="info-item">
                                    <FaEnvelope className="info-icon" />
                                    <p>{selectedShop.email}</p>
                                </div>
                                <div className="info-item">
                                    <FaGlobe className="info-icon" />
                                    <p>{selectedShop.website}</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}