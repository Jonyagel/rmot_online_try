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