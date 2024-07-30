// "use client"
// import React from 'react'
// import Accordion from 'react-bootstrap/Accordion';

// export default function AcordionShops() {
//     return (
//        <Accordion className="styled-accordion mt-5">
       //     <AnimatePresence>
        //        {shopData.map((shop) => (
      //              <motion.div
    //                    key={shop.id}
      //                  initial={{ opacity: 0, y: 20 }}
     //                   animate={{ opacity: 1, y: 0 }}
      //                  exit={{ opacity: 0, y: -20 }}
      //                  transition={{ duration: 0.3 }}
      //              >
      //                  <Accordion.Item eventKey={shop.id} className="styled-accordion-item mb-3">
     //                       <Accordion.Header className="styled-accordion-header">
     //                           <div className="shop-info d-flex align-items-center">
     //                               <img src={shop.logo} width="60" height="60" alt={`${shop.name} logo`} className="shop-logo me-3" />
    //                                <div className="shop-details">
      //                                  <h4 className="shop-name mb-0">{shop.name}</h4>
      //                                  <p className="shop-description mb-0 d-none d-sm-block">{shop.description}</p>
     //                               </div>
    //                            </div>
    //                        </Accordion.Header>
    //                        <Accordion.Body className="styled-accordion-body">
     //                           <div className='row'>
     //                               <div className='col-12 col-md-4 mb-3 mb-md-0'>
      //                                  <p className="shop-content">{shop.content}</p>
       //                             </div>
       //                             <div className='col-12 col-md-4 mb-3 mb-md-0'>
       //                                 <h5 className="font-weight-bold">שעות פתיחה:</h5>
       //                                 <p className="shop-hours">{shop.hours}</p>
         //                           </div>
           //                         <div className='col-12 col-md-4'>
             //                           <div className="contact-info">
               //                             <p><i className="bi bi-geo-alt-fill me-2"></i>{shop.address}</p>
                 //                           <p><i className="bi bi-telephone-fill me-2"></i>{shop.phone}</p>
                   //                         <p><i className="bi bi-envelope-fill me-2"></i>{shop.email}</p>
                     //                       <p><i className="bi bi-globe me-2"></i>{shop.website}</p>
                       //                 </div>
                           //         </div>
                         //       </div>
                  //          </Accordion.Body>
                  //      </Accordion.Item>
                //    </motion.div>
            //    ))}
         //   </AnimatePresence>
    //    </Accordion>
//     )
// }

"use client"
import React, { useState }  from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { motion, AnimatePresence } from 'framer-motion';
import './acordionShops.css';

export default function AcordionShops() {

       const [expandedShop, setExpandedShop] = useState(null);
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
           {
            id: "2",
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
            id: "3",
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
            id: "4",
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
            id: "5",
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

         const toggleExpand = (id:any) => {
        setExpandedShop(expandedShop === id ? null : id);
    }

    return (
           <div className="shop-cards-container">
            {shopData.map((shop) => (
                <motion.div
                    key={shop.id}
                    className={`shop-card ${expandedShop === shop.id ? 'expanded' : ''}`}
                    layoutId={`card-container-${shop.id}`}
                    onClick={() => toggleExpand(shop.id)}
                >
                    <motion.div className="card-header" layoutId={`card-header-${shop.id}`}>
                        <img src={shop.logo} alt={`${shop.name} logo`} className="shop-logo" />
                        <h3>{shop.name}</h3>
                        <p>{shop.description}</p>
                    </motion.div>
                    
                    <AnimatePresence>
                        {expandedShop === shop.id && (
                            <motion.div
                                className="card-content"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <div className="content-section">
                                    <h4>תיאור</h4>
                                    <p>{shop.content}</p>
                                </div>
                                <div className="content-section">
                                    <h4>שעות פתיחה</h4>
                                    <p>{shop.hours}</p>
                                </div>
                                <div className="content-section">
                                    <h4>פרטי התקשרות</h4>
                                    <p><i className="bi bi-geo-alt-fill"></i> {shop.address}</p>
                                    <p><i className="bi bi-telephone-fill"></i> {shop.phone}</p>
                                    <p><i className="bi bi-envelope-fill"></i> {shop.email}</p>
                                    <p><i className="bi bi-globe"></i> {shop.website}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    )
}
