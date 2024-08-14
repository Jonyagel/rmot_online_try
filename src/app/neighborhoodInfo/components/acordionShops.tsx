"use client"
import React, { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaTimes, FaStar, FaTag, FaCreditCard, FaPlus, FaImage, FaUpload, FaSearch } from 'react-icons/fa';
import { Button, Modal, Form, InputGroup, Col, Container, Row } from 'react-bootstrap';
import { CldImage, CldUploadButton } from 'next-cloudinary';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './acordionShops.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { faFontAwesome, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const dynamic = 'force-dynamic';

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
    // categories: string[];
}

export default function ShopCards(props: any) {
    const router = useRouter();

    const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [logo, setLogo] = useState('');
    const [image, setImage] = useState('');
    const [shopsAr, setShopsAr] = useState(props.shopsData);


    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const hoursRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const websiteRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLInputElement>(null);

    // useEffect(() => {
    //     // setShopsAr(props.shopsData)
    //     // console.log(shopsAr)
    //     doApi();
    // }, []); 

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
    }, [searchTerm, selectedCategory, shopsAr]);

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
                body: JSON.stringify({ name, description, content, hours, address, phone, email, website, category, logo, image }),
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
        // <div className="shop-container" style={{ minHeight: '100vh' }}>
        <div className="shop-container px-3" style={{ minHeight: '100vh' }}>
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
                    <h1 className="mb-4 text-3xl neighborhoodInfo-title">מידע שכונתי</h1>

                    <div className='w-full flex justify-content-end'>
                        <motion.button
                            className="add-shop-button p-3"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleShowModal}
                        >
                            <FaPlus />
                        </motion.button>
                    </div>
                    <div className="search-container mb-3" >
                        <InputGroup style={{ direction: 'ltr' }}>
                            <Form.Control
                                type="text"
                                placeholder="חיפוש חנויות..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="rounded"

                            />
                            <InputGroup.Text
                                className="rounded-start search-button"
                            // onClick={() => handleSearch()}
                            >
                                <FaSearch />
                            </InputGroup.Text>
                        </InputGroup>
                    </div>

                    <div className="shop-grid">
                        {filteredShops.map((shop: Shop) => (
                            <motion.div
                                key={shop.id}
                                className="shop-card border"
                                whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                            // onClick={() => handleShopClick(shop)}
                            >
                                <div className="shop-card-content">
                                    <div className="shop-card-header">
                                        {shop.image ? (
                                            <CldImage
                                                src={shop.image}
                                                width="400"
                                                height="200"
                                                crop="fill"
                                                className="shop-image rounded-t"
                                                alt={shop.name}
                                            />
                                        ) : (
                                            <div className="w-full h-40 bg-gray-200 rounded-t flex items-center justify-center">
                                                <FontAwesomeIcon icon={faImage} size="3x" color="#adb5bd" />
                                            </div>
                                        )}
                                        <div className="shop-logo">
                                            {shop.logo ? (
                                                <CldImage
                                                    src={shop.logo}
                                                    width="50"
                                                    height="50"
                                                    crop="fill"
                                                    className="logo-image"
                                                    alt={`${shop.name} logo`}
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                    <FontAwesomeIcon icon={faFontAwesome} size="2x" color="#adb5bd" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="shop-description">
                                        <h3>{shop.name}</h3>
                                        <p>
                                            {shop.description.length > 100
                                                ? `${shop.description.substring(0, 100)}...`
                                                : shop.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="shop-card-footer">
                                    <button className="more-info-btn" onClick={() => handleShopClick(shop)}>למידע נוסף</button>
                                    <span className="shop-address"><FaMapMarkerAlt /> {shop.address}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>


                    <AnimatePresence>
                        {selectedShop && (
                            <motion.div
                                className="shop_detaile modal-overlay"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={closeModal}
                            >
                                <motion.div
                                    className="modal-content shop-detail-modal"
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 50, opacity: 0 }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="modal-header">
                                        <button className="close-button" onClick={closeModal}>
                                            <FaTimes />
                                        </button>
                                    </div>
                                    <div className="shop-details">
                                        <div className="shop-header">
                                            <CldImage
                                                src={selectedShop.image}
                                                width="800"
                                                height="400"
                                                crop="fill"
                                                className="shop-detail-image"
                                                alt={selectedShop.name}
                                            />
                                            <div className="shop-title-container">
                                                <h2>{selectedShop.name}</h2>
                                                {/* <div className="shop-categories">
                                            {selectedShop.categories.map((category, index) => (
                                                <span key={index} className="category-tag">{category}</span>
                                            ))}
                                        </div> */}
                                            </div>
                                        </div>
                                        <div className="shop-details-unique-container">
                                            <div className="shop-description-unique">
                                                <h3>אודות החנות</h3>
                                                <p className="shop-content-unique">{selectedShop.content}</p>
                                            </div>

                                            <div className="shop-info-grid-unique">
                                                <div className="info-item-unique">
                                                    <div className="icon-wrapper-unique">
                                                        <FaClock className="info-icon-unique" />
                                                    </div>
                                                    <div className="info-content-unique">
                                                        <h4>שעות פעילות</h4>
                                                        <p>{selectedShop.hours}</p>
                                                    </div>
                                                </div>
                                                <div className="info-item-unique">
                                                    <div className="icon-wrapper-unique">
                                                        <FaMapMarkerAlt className="info-icon-unique" />
                                                    </div>
                                                    <div className="info-content-unique">
                                                        <h4>כתובת</h4>
                                                        <p>{selectedShop.address}</p>
                                                    </div>
                                                </div>
                                                <div className="info-item-unique">
                                                    <div className="icon-wrapper-unique">
                                                        <FaPhone className="info-icon-unique" />
                                                    </div>
                                                    <div className="info-content-unique">
                                                        <h4>טלפון</h4>
                                                        <Link href={`tel:${selectedShop.phone}`}>{selectedShop.phone}</Link>
                                                    </div>
                                                </div>
                                                <div className="info-item-unique">
                                                    <div className="icon-wrapper-unique">
                                                        <FaEnvelope className="info-icon-unique" />
                                                    </div>
                                                    <div className="info-content-unique">
                                                        <h4>אימייל</h4>
                                                        <p>{selectedShop.email}</p>
                                                    </div>
                                                </div>
                                                <div className="info-item-unique">
                                                    <div className="icon-wrapper-unique">
                                                        <FaGlobe className="info-icon-unique" />
                                                    </div>
                                                    <div className="info-content-unique">
                                                        <h4>אתר אינטרנט</h4>
                                                        <Link href={selectedShop.website} target="_blank" rel="noopener noreferrer">{selectedShop.website}</Link>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="shop-ad-unique">
                                                <h3>מבצע מיוחד!</h3>
                                                <img src='./images/saleAds.gif' alt="Special offer" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Col >
                <Col lg={2} className="d-none d-lg-block ">
                    {/* אזור פרסומות ימני */}
                    <div className="ad-container">
                        <div className="ad-space">
                            <img src='/images/timegif.webp' className='rounded' />
                            {/* כאן תוכל להוסיף את קוד הפרסומת שלך */}
                        </div>
                    </div>
                </Col>
            </Row >


            <Modal show={showModal} onHide={handleCloseModal} centered className="shop-modal">
                <Modal.Header closeButton className="bg-primary text-white">
                    <div className="w-100 d-flex justify-content-between align-items-start">
                        <Modal.Title>הוספת עסק חדש</Modal.Title>
                    </div>
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
                                <Form.Label>שם העסק</Form.Label>
                                <Form.Control ref={nameRef} type="text" required />
                            </Form.Group>
                        </motion.div>

                        <motion.div variants={itemAnimation}>
                            <Form.Group className="mb-3">
                                <Form.Label>סלוגן</Form.Label>
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
                                {/* לשנות את זה לסלקט מתוך מבחר מסוים של קטגוריות */}
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
                                <Form.Label>תמונות (עד 4)</Form.Label>
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
                                שלח לאישור
                            </Button>
                        </motion.div>
                    </motion.form>
                </Modal.Body>
            </Modal>
            <ToastContainer position="bottom-center" theme="colored" />
            {/* </div > */}
        </div >
    )
}