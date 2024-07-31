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
//     const shopsAr = [
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
//             {shopsAr.map((shop) => (
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
import React, { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaTimes, FaStar, FaTag, FaCreditCard, FaPlus, FaImage, FaUpload } from 'react-icons/fa';
import { Button, Modal, Form } from 'react-bootstrap';
import { CldUploadButton } from 'next-cloudinary';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './acordionShops.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
    features: string[];
    specialOffer: string;
    category: string;
    categories: string[];
}

export default function ShopCards() {
    const router = useRouter();

    const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [logo, setLogo] = useState('');
    const [image, setImage] = useState('');
    const [shopsAr, setShopsAr] = useState([]);


    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const hoursRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const websiteRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLInputElement>(null);

    // const shopsAr: Shop[] = [
    //     {
    //         id: "1",
    //         name: "מכולת השכונה",
    //         description: "מכולת קטנה עם מבחר גדול",
    //         logo: "/images/strip/neighborhood1.jpg",
    //         content: "מכולת השכונה היא חנות קטנה עם לב גדול. אנו מציעים מגוון רחב של מוצרים טריים ואיכותיים.",
    //         hours: "א'-ה': 7:00-22:00, ו': 7:00-15:00, שבת: סגור",
    //         address: "רחוב הראשונים 10, תל אביב",
    //         phone: "03-1234567",
    //         email: "info@neighborhood-grocery.com",
    //         website: "www.neighborhood-grocery.com",
    //         categories: ["מזון", "מוצרי ניקיון"],
    //         image: "/images/strip/neighborhood1.jpg",
    //         category: "foods",
    //         features: ["hello", "world",],
    //         specialOffer: "/images/saleAds.gif",
    //     },
    //     {
    //         id: "2",
    //         name: "מכולת השכונה",
    //         description: "מכולת קטנה עם מבחר גדול",
    //         logo: "/images/strip/neighborhood1.jpg",
    //         content: "מכולת השכונה היא חנות קטנה עם לב גדול. אנו מציעים מגוון רחב של מוצרים טריים ואיכותיים.",
    //         hours: "א'-ה': 7:00-22:00, ו': 7:00-15:00, שבת: סגור",
    //         address: "רחוב הראשונים 10, תל אביב",
    //         phone: "03-1234567",
    //         email: "info@neighborhood-grocery.com",
    //         website: "www.neighborhood-grocery.com",
    //         categories: ["מזון", "מוצרי ניקיון"],
    //         image: "/images/strip/neighborhood1.jpg",
    //         category: "foods",
    //         features: ["hello", "world",],
    //         specialOffer: "/images/saleAds.gif",
    //     },
    //     // ... הוסף עוד חנויות כאן
    // ];

    useEffect(() => {
        doApi();
    }, []);

    const doApi = async () => {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/shops`;
        const resp = await fetch(url, { cache: 'no-store' })
        const data = await resp.json();
        console.log(data);
        setShopsAr(data)
    }

    const formAnimation = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemAnimation = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const filteredShops = useMemo(() => {
        return shopsAr.filter((shop: any) =>
            (shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                shop.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (!selectedCategory || shop.categories.includes(selectedCategory))
        );
    }, [searchTerm, selectedCategory]);

    const allCategories = useMemo(() => {
        return Array.from(new Set(shopsAr.flatMap((shop: any) => shop.categories)));
    }, []);

    const handleShopClick = (shop: Shop) => {
        setSelectedShop(shop);
    };

    const closeModal = () => {
        setSelectedShop(null);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setLogo('');
        setImage('');
    };

    const handleUploadLogo = (result: any) => {
        setLogo(result.info.secure_url);
    };

    const handleUploadImage = (result: any) => {
        setImage(result.info.secure_url);
    };

    const handleAddShop = async (e: React.FormEvent) => {
        e.preventDefault();
        const name = nameRef.current?.value;
        const description = descriptionRef.current?.value;
        const content = contentRef.current?.value;
        const address = addressRef.current?.value;
        const hours = hoursRef.current?.value;
        const phone = phoneRef.current?.value;
        const email = emailRef.current?.value;
        const website = websiteRef.current?.value;
        const category = categoryRef.current?.value;
        try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shops`, {
                method: 'POST',
                body: JSON.stringify({ name, description, content, hours, address, phone, email, website, category,logo,image }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await resp.json();
            console.log(data);
            doApi();
            handleCloseModal();
            router.push('/neighborhoodInfo');
        } catch (error: any) {
            console.error('Error:', error);
        }
        toast.success('החנות נוספה בהצלחה!');
        handleCloseModal();
    };

    return (
        <div>
            <motion.button
                className="add-shop-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleShowModal}
            >
                <FaPlus />
            </motion.button>
            <div className="shop-container">
                <div className="shop-grid">
                    {shopsAr.map((shop: any) => (
                        <motion.div
                            key={shop.id}
                            className="shop-card"
                            whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                            onClick={() => setSelectedShop(shop)}
                        >
                            <div className="shop-card-content">
                                <div className="shop-card-header">
                                    <img src={shop.logo} alt={shop.name} className="shop-logo" />
                                </div>
                                <h3 className='text-center'>{shop.name}</h3>
                                <p className='text-center'>{shop.description}</p>
                                <div className="shop-card-footer">
                                    <span className="shop-category"><FaTag className="category-icon" /> {shop.category}</span>
                                </div>
                            </div>
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
                                <div className="shop-details">
                                    <img src={selectedShop.image} alt={selectedShop.name} className="shop-image" />
                                    <h2>{selectedShop.name}</h2>
                                    <p className="shop-content text-center">{selectedShop.content}</p>
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
                                            <Link href={`tel:${selectedShop.phone}`}>{selectedShop.phone}</Link>
                                        </div>
                                        <div className="info-item">
                                            <FaEnvelope className="info-icon" />
                                            <p>{selectedShop.email}</p>
                                        </div>
                                        <div className="info-item">
                                            <FaGlobe className="info-icon" />
                                            <Link href={selectedShop.website}>{selectedShop.website}</Link>
                                        </div>
                                    </div>
                                    <div className="shop-features">
                                        <h3>מה מיוחד אצלנו</h3>
                                        <ul>
                                            {selectedShop.features.map((feature: any, index: any) => (
                                                <li key={index}>{feature}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="shop-ad">
                                        <h3>מבצע מיוחד!</h3>
                                        <img src={selectedShop.specialOffer} />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <Modal show={showModal} onHide={handleCloseModal} centered className="custom-modal">
                <Modal.Header>
                    <Modal.Title>הוספת חנות חדשה</Modal.Title>
                    <Button variant="link" onClick={handleCloseModal} className="close-button">
                        <FaTimes />
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <motion.form
                        onSubmit={handleAddShop}
                        variants={formAnimation}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={itemAnimation}>
                            <Form.Group className="mb-3">
                                <Form.Label>שם החנות</Form.Label>
                                <Form.Control ref={nameRef} type="text" required />
                            </Form.Group>
                        </motion.div>

                        <motion.div variants={itemAnimation}>
                            <Form.Group className="mb-3">
                                <Form.Label>תיאור קצר</Form.Label>
                                <Form.Control ref={descriptionRef} as="textarea" rows={2} required />
                            </Form.Group>
                        </motion.div>
                        <motion.div variants={itemAnimation}>
                            <Form.Group className="mb-3">
                                <Form.Label>תוכן מפורט</Form.Label>
                                <Form.Control ref={contentRef} as="textarea" rows={3} required />
                            </Form.Group>
                        </motion.div>
                        <motion.div variants={itemAnimation}>
                            <Form.Group className="mb-3">
                                <Form.Label>שעות פעילות</Form.Label>
                                <Form.Control ref={hoursRef} type="text" required />
                            </Form.Group>
                        </motion.div>
                        <motion.div variants={itemAnimation}>
                            <Form.Group className="mb-3">
                                <Form.Label>כתובת</Form.Label>
                                <Form.Control ref={addressRef} type="text" required />
                            </Form.Group>
                        </motion.div>
                        <motion.div variants={itemAnimation}>
                            <Form.Group className="mb-3">
                                <Form.Label>טלפון</Form.Label>
                                <Form.Control ref={phoneRef} type="tel" required />
                            </Form.Group>
                        </motion.div>
                        <motion.div variants={itemAnimation}>
                            <Form.Group className="mb-3">
                                <Form.Label>אימייל</Form.Label>
                                <Form.Control ref={emailRef} type="email" required />
                            </Form.Group>
                        </motion.div>
                        <motion.div variants={itemAnimation}>
                            <Form.Group className="mb-3">
                                <Form.Label>אתר אינטרנט</Form.Label>
                                <Form.Control ref={websiteRef} type="url" required />
                            </Form.Group>
                        </motion.div>
                        <motion.div variants={itemAnimation}>
                            <Form.Group className="mb-3">
                                <Form.Label>קטגוריה</Form.Label>
                                <Form.Control ref={categoryRef} type="text" required />
                            </Form.Group>
                        </motion.div>
                        <motion.div variants={itemAnimation}>
                            <Form.Group className="mb-3">
                                <Form.Label>לוגו</Form.Label>
                                <div className="upload-container">
                                    <CldUploadButton
                                        className='btn btn-outline-primary me-2 mb-2'
                                        uploadPreset="my_upload_test"
                                        onSuccess={(result) => {
                                            handleUploadLogo(result);
                                        }}
                                        onError={(error) => {
                                            console.error('Upload error:', error);
                                            toast.error('העלאה נכשלה. ייתכן שהקובץ גדול מדי או בפורמט לא נתמך.');
                                        }}
                                        options={{
                                            sources: ['local'],
                                            maxFileSize: 5000000,
                                            maxImageWidth: 2000,
                                            maxImageHeight: 2000,
                                            clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
                                            multiple: true
                                        }}
                                    >
                                        <FaUpload /> העלאת לוגו
                                    </CldUploadButton>
                                    {logo && (
                                        <motion.img
                                            src={logo}
                                            alt="לוגו"
                                            className="uploaded-image"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </div>
                            </Form.Group>
                        </motion.div>

                        <motion.div variants={itemAnimation}>
                            <Form.Group className="mb-3">
                                <Form.Label>תמונה</Form.Label>
                                <div className="upload-container">
                                <CldUploadButton
                                        className='btn btn-outline-primary me-2 mb-2'
                                        uploadPreset="my_upload_test"
                                        onSuccess={(result) => {
                                            handleUploadImage(result);
                                        }}
                                        onError={(error) => {
                                            console.error('Upload error:', error);
                                            toast.error('העלאה נכשלה. ייתכן שהקובץ גדול מדי או בפורמט לא נתמך.');
                                        }}
                                        options={{
                                            sources: ['local'],
                                            maxFileSize: 5000000,
                                            maxImageWidth: 2000,
                                            maxImageHeight: 2000,
                                            clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
                                            multiple: true
                                        }}
                                    >
                                        <FaImage /> העלאת תמונה
                                    </CldUploadButton>
                                    {image && (
                                        <motion.img
                                            src={image}
                                            alt="תמונה"
                                            className="uploaded-image"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </div>
                            </Form.Group>
                        </motion.div>

                        <motion.div variants={itemAnimation}>
                            <Button type="submit" variant="primary" className="submit-button">
                                <FaPlus /> הוסף חנות
                            </Button>
                        </motion.div>
                    </motion.form>
                </Modal.Body>
            </Modal>
            <ToastContainer position="bottom-center" theme="colored" />
        </div>
    )
}