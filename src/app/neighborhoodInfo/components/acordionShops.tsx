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

"use client"
import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { motion, AnimatePresence } from 'framer-motion';
import './acordionShops.css';

export default function AcordionShops() {
    const shopData = [
        {
            id: "0",
            name: "אפקטיבי הדברות",
            description: "הדברת כל סוגי המזיקים",
            logo: "/images/strip/neighborhood1.jpg",
            content: "אנחנו באפקטיבי הדברות מתמחים בכל סוגי ההדברות לכל סוגי המזיקים. במידה והתעוררתם בבוקר, הרגשתם משהו על הרגל, הסתכלתם, קיווצתם, ואז גיליתם שיש לו רגליים או בעצם הוא מקק, אל תפחדו כמו מי שבחרדות מאז ולא מעיז לישון עם שמיכה, פנו אלינו וקבלו את התשובה. אין מקקים!!! נשמח לעמוד לשרותכם",
            hours: "ימים א-ד בין השעות 9:00-16:00\nיום ה בין השעות 10:00-14:00\nיום ו, שבתות וחגים-סגור!",
            address: "יהלום 38, גבעת זאב",
            phone: "050-5232235",
            email: "yy0583223090@gmail.com",
            website: "www.jonyagel.co.il"
        },
        {
            id: "1",
            name: "אפקטיבי הדברות",
            description: "הדברת כל סוגי המזיקים",
            logo: "/images/strip/neighborhood1.jpg",
            content: "אנחנו באפקטיבי הדברות מתמחים בכל סוגי ההדברות לכל סוגי המזיקים. במידה והתעוררתם בבוקר, הרגשתם משהו על הרגל, הסתכלתם, קיווצתם, ואז גיליתם שיש לו רגליים או בעצם הוא מקק, אל תפחדו כמו מי שבחרדות מאז ולא מעיז לישון עם שמיכה, פנו אלינו וקבלו את התשובה. אין מקקים!!! נשמח לעמוד לשרותכם",
            hours: "ימים א-ד בין השעות 9:00-16:00\nיום ה בין השעות 10:00-14:00\nיום ו, שבתות וחגים-סגור!",
            address: "יהלום 38, גבעת זאב",
            phone: "050-5232235",
            email: "yy0583223090@gmail.com",
            website: "www.jonyagel.co.il"
        },
        // ... (יתר נתוני החנויות)
    ];

    return (
        <Accordion className="styled-accordion mt-5">
        <AnimatePresence>
            {shopData.map((shop) => (
                <motion.div
                    key={shop.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                >
                    <Accordion.Item eventKey={shop.id} className="styled-accordion-item">
                        <Accordion.Header className="styled-accordion-header bg-info">
                            <div className="shop-info justify-content-start">
                                <img src={shop.logo} width="60" height="60" alt={`${shop.name} logo`} className="shop-logo" />
                                <div className="shop-details">
                                    <h4 className="shop-name">{shop.name}</h4>
                                    <p className="shop-description d-none d-sm-block">{shop.description}</p>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body className="styled-accordion-body">
                                <div className='row'>
                                    <div className='col-12 col-md-4 mb-3 mb-md-0 text-end'>
                                        <p>{shop.content}</p>
                                    </div>
                                    <div className='col-12 col-md-4 mb-3 mb-md-0'>
                                        <p className='font-bold'>שעות פתיחה:</p>
                                        <p>{shop.hours}</p>
                                    </div>
                                    <div className='col-12 col-md-4'>
                                        <div className="contact-info-acordion">
                                            <i className="bi bi-geo-alt"></i>
                                            <p className='mb-0'>{shop.address}</p>
                                        </div>
                                        <div className="contact-info-acordion">
                                            <i className="bi bi-telephone"></i>
                                            <p className='mb-0'>{shop.phone}</p>
                                        </div>
                                        <div className="contact-info-acordion">
                                            <i className="bi bi-envelope"></i>
                                            <p className='mb-0'>{shop.email}</p>
                                        </div>
                                        <div className="contact-info-acordion">
                                            <i className="bi bi-globe"></i>
                                            <p className='mb-0'>{shop.website}</p>
                                        </div>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </motion.div>
                ))}
            </AnimatePresence>
        </Accordion>
    )
}