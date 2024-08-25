"use client"
import React, { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaTimes, FaStar, FaTag, FaCreditCard, FaPlus, FaImage, FaUpload, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Button, Modal, Form, InputGroup, Col, Container, Row, NavLink, Nav } from 'react-bootstrap';
import { CldImage, CldUploadButton } from 'next-cloudinary';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './infoStyle.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { faFontAwesome, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaShoppingBasket, FaTshirt, FaLaptop, FaHome, FaHeartbeat, FaFootballBall, FaBook, FaGamepad, FaGem, FaPaw, FaCar, FaPaintBrush, FaGift, FaCouch, FaUtensils } from 'react-icons/fa';
import CategorySlider from './subCategorySlider';

export const dynamic = 'force-dynamic';


interface Card {
    id: string;
    name: string;
    description: string;
    logo?: string;
    content: string;
    hours: string;
    address: string;
    phone: string;
    email: string;
    website?: string;
    image: string;
    features?: string[];
    specialOffer?: string;
    category: string;
    type: string;
}

interface Category {
    name: string;
    icon: React.ReactNode;
}

export default function ShopCards(props: any) {
    const router = useRouter();

    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [logo, setLogo] = useState('');
    const [image, setImage] = useState('');
    const [cardsAr, setCardsAr] = useState(props.shopsData);
    const [gmachAr, setGmachAr] = useState(props.gmachData);
    const [selectType, setSelectType] = useState(null);
    const [activeTab, setActiveTab] = useState<string>('shop');
    const [items, setItems] = useState<Card[]>(cardsAr);
    const [activeSubcategory, setActiveSubcategory] = useState('');
    // const [gmachitems, setGmachItems] = useState<Card[]>(gmachAr);



    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const hoursRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const websiteRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLInputElement>(null);

    const categories = [
        { name: "מזון וקמעונאות", icon: <FaShoppingBasket /> },
        { name: "אופנה והלבשה", icon: <FaTshirt /> },
        { name: "אלקטרוניקה וטכנולוגיה", icon: <FaLaptop /> },
        { name: "בית וגינון", icon: <FaHome /> },
        { name: "בריאות ויופי", icon: <FaHeartbeat /> },
        { name: "ספורט ופנאי", icon: <FaFootballBall /> },
        { name: "ספרים ומדיה", icon: <FaBook /> },
        { name: "צעצועים ומשחקים", icon: <FaGamepad /> },
        { name: "תכשיטים ואביזרים", icon: <FaGem /> },
        { name: "חיות מחמד", icon: <FaPaw /> },
        { name: "רכב ותחבורה", icon: <FaCar /> },
        { name: "אמנות ויצירה", icon: <FaPaintBrush /> },
        { name: "מתנות ומזכרות", icon: <FaGift /> },
        { name: "ריהוט ועיצוב פנים", icon: <FaCouch /> },
        { name: "כלי בית ומטבח", icon: <FaUtensils /> }
    ];

    const NextArrow = (props: any) => {
        const { className, onClick } = props;
        return (
            <div className={className} onClick={onClick}>
                <FaChevronLeft />
            </div>
        );
    };

    const PrevArrow = (props: any) => {
        const { className, onClick } = props;
        return (
            <div className={className} onClick={onClick}>
                <FaChevronRight />
            </div>
        );
    };

    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 3,
        rtl: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ]
    };


    const doApi = async (subCategory: any) => {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/shops?category=${subCategory}`;
        const resp = await fetch(url, { cache: 'no-store' })
        const data = await resp.json();
        console.log(data);
        setCardsAr(data)
        console.log(`Fetching data for category: ${subCategory}`);
    }

    const doApiGmach = async (subCategory: any) => {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/gmach?category=${subCategory}`;
        const resp = await fetch(url, { cache: 'no-store' })
        const data = await resp.json();
        console.log(data);
        // setCardsAr(data)
        setGmachAr(data);
        console.log(`Fetching Gmach data for category: ${subCategory}`);
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

    const filteredCards = useMemo(() => {
        return cardsAr.filter((card: any) =>
        (card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [searchTerm, cardsAr]);

    const filteredGmach = useMemo(() => {
        return gmachAr.filter((card: any) =>
        (card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [searchTerm, gmachAr]);

    // useEffect(() => {
    //     typeFilter();
    // },[]);

    const typeFilter = (typeActive: any) => {
        // doApiGmach();
        // const filteredAndSortedItems = items.filter((item: any) => item.type === typeActive)
        // console.log(filteredAndSortedItems)
        // setShopsAr(filteredAndSortedItems)
        // console.log(shopsAr);
    }


    const handleShopClick = (card: Card) => {
        setSelectedCard(card);
    };

    const closeModal = () => {
        setSelectedCard(null);
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

    const handleAddShop = async () => {
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
            doApi('');
            handleCloseModal();
            router.push('/neighborhoodInfo');
        } catch (error: any) {
            console.error('Error:', error);
        }
        toast.success('החנות נוספה בהצלחה!');
        handleCloseModal();
    };


    const handleAddGmach = async () => {
        const name = nameRef.current?.value;
        const description = descriptionRef.current?.value;
        const content = contentRef.current?.value;
        const address = addressRef.current?.value;
        const hours = hoursRef.current?.value;
        const phone = phoneRef.current?.value;
        const email = emailRef.current?.value;
        const category = categoryRef.current?.value;
        try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gmach`, {
                method: 'POST',
                body: JSON.stringify({ name, description, content, hours, address, phone, email, category, image }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await resp.json();
            console.log(data);
            doApiGmach('');
            handleCloseModal();
            router.push('/neighborhoodInfo');
        } catch (error: any) {
            console.error('Error:', error);
        }
        toast.success('הגמ"ח נוספה בהצלחה!');
        handleCloseModal();
    };


    return (
        <div className="shop-container px-3" style={{ minHeight: '100vh' }}>
            <Row>
                <Col lg={2} className="d-none d-lg-block">
                    <div className="ad-container">
                        <div className="ad-space">
                            <img src='/images/bookgif.webp' className='rounded' />
                        </div>
                    </div>
                </Col>
                <Col lg={8}>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className='title text-center mt-5'
                    >
                        <h1 className="my-4 text-3xl neighborhoodInfo-title">מידע שכונתי</h1>
                    </motion.div>
                    <div className='w-full flex justify-content-end'>
                        <motion.button
                            className="add-shop-button p-3 m-4"
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
                    <motion.div
                        className="navigation-container"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Nav
                            activeKey={activeTab}
                            onSelect={(k: any) => {
                                setActiveTab(k);
                                if (k === 'gmach') {
                                    doApiGmach('');
                                }
                                else if (k === 'shop') {
                                    doApi("");
                                    setActiveSubcategory('')
                                }
                            }}
                            className='main-nav'
                        >
                            <NavLink className={`nav-link ${activeTab === 'shop' ? 'active' : ''}`} eventKey="shop">חנויות</NavLink>
                            <NavLink className={`nav-link ${activeTab === 'mosdot' ? 'active' : ''}`} eventKey="mosdot">מוסדות</NavLink>
                            <NavLink className={`nav-link ${activeTab === 'gmach' ? 'active' : ''}`} eventKey="gmach">גמ״חים</NavLink>
                        </Nav>
                        {activeTab === 'shop' && (
                            <motion.div
                                className="subcategory-container"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <CategorySlider
                                    categories={categories}
                                    activeSubcategory={activeSubcategory}
                                    setActiveSubcategory={setActiveSubcategory}
                                    doApi={doApi}
                                />
                            </motion.div>
                        )}
                    </motion.div>
                    <div className="shop-grid">
                        {(activeTab === 'shop' ? filteredCards : filteredGmach).map((card: Card, index: number) => (
                            <React.Fragment key={card.id}>
                                <motion.div
                                    className="shop-card border"
                                    whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                                >
                                    <div className="shop-card-content">
                                        <div className="shop-card-header">
                                            {card.image ? (
                                                <CldImage
                                                    src={card.image}
                                                    width="400"
                                                    height="200"
                                                    crop="fill"
                                                    className="shop-image rounded-t"
                                                    alt={card.name}
                                                    loading='lazy'
                                                    format="auto"
                                                    quality="auto"
                                                />
                                            ) : (
                                                <div className="w-full bg-gray-200 rounded-t flex items-center justify-center" style={{ height: '150px' }}>
                                                    <FontAwesomeIcon icon={faImage} size="3x" color="#adb5bd" />
                                                </div>
                                            )}
                                            {activeTab === 'shop' && (
                                                <div className="shop-logo">
                                                    {card.logo ? (
                                                        <CldImage
                                                            src={card.logo}
                                                            width="50"
                                                            height="50"
                                                            crop="fill"
                                                            className="logo-image"
                                                            alt={`${card.name} logo`}
                                                            loading='lazy'
                                                            format="auto"
                                                            quality="auto"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                            <FontAwesomeIcon icon={faFontAwesome} size="2x" color="#adb5bd" />
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            {activeTab === 'gmach' && (
                                                <div></div>
                                            )}
                                        </div>

                                        <div className="shop-description">
                                            <h3>{card.name}</h3>
                                            <p>
                                                {card.description.length > 100
                                                    ? `${card.description.substring(0, 100)}...`
                                                    : card.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="shop-card-footer">
                                        <button className="more-info-btn" onClick={() => handleShopClick(card)}>למידע נוסף</button>
                                        <span className="shop-address"><FaMapMarkerAlt /> {card.address}</span>
                                    </div>
                                </motion.div>
                                {(index + 1) % 6 === 0 && (
                                    <motion.div
                                        className="shop-card border ad-card"
                                        whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                                    >
                                        <div className="ad-content">
                                            <img src="/images/timegif.webp" alt="פרסומת" className="ad-image" />
                                        </div>
                                    </motion.div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <AnimatePresence>
                        {selectedCard && (
                            <motion.div
                                className="ys-modal-overlay"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={closeModal}
                            >
                                <motion.div
                                    className="ys-modal-content ys-shop-detail-modal"
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 50, opacity: 0 }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <button className="ys-close-button" onClick={closeModal}>
                                        <FaTimes />
                                    </button>
                                    <div className="ys-modal-scroll-container">
                                        <div className="ys-modal-inner-content">
                                            <div className="ys-shop-image-container">
                                                <CldImage
                                                    src={selectedCard.image}
                                                    width="400"
                                                    height="300"
                                                    crop="fill"
                                                    className="ys-shop-detail-image"
                                                    alt={selectedCard.name}
                                                    loading='lazy'
                                                    format="auto"
                                                    quality="auto"
                                                />

                                            </div>
                                            <div className="ys-shop-details-content">
                                                <div className="ys-shop-info-grid">
                                                    <div className="ys-info-card">
                                                        <FaMapMarkerAlt className="ys-info-icon" />
                                                        <div className="ys-info-content">
                                                            <h4>כתובת</h4>
                                                            <p>{selectedCard.address}</p>
                                                        </div>
                                                    </div>
                                                    <div className="ys-info-card">
                                                        <FaPhone className="ys-info-icon" />
                                                        <div className="ys-info-content">
                                                            <h4>טלפון</h4>
                                                            <Link className=' link-underline link-underline-opacity-0' href={`tel:${selectedCard.phone}`}>{selectedCard.phone}</Link>
                                                        </div>
                                                    </div>
                                                    <div className="ys-info-card">
                                                        <FaEnvelope className="ys-info-icon" />
                                                        <div className="ys-info-content">
                                                            <h4>אימייל</h4>
                                                            <Link className=' link-underline link-underline-opacity-0' href={`mailto:${selectedCard.email}`}>{selectedCard.email}</Link>
                                                        </div>
                                                    </div>
                                                    {selectedCard.website && (
                                                        <div className="ys-info-card">
                                                            <FaGlobe className="ys-info-icon" />
                                                            <div className="ys-info-content">
                                                                <h4>אתר אינטרנט</h4>
                                                                <Link className=' link-underline link-underline-opacity-0' href={selectedCard.website} target="_blank" rel="noopener noreferrer">
                                                                    {selectedCard.website}
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="ys-info-card">
                                                        <FaClock className="ys-info-icon" />
                                                        <div className="ys-info-content" style={{ width: '90%' }}>
                                                            <h4>שעות פעילות</h4>
                                                            <p>{selectedCard.hours}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <h2 className="ys-shop-title">{selectedCard.name}</h2>
                                            <p className="ys-shop-description">{selectedCard.description}</p>
                                        </div>
                                        {/* {selectedCard.website && ( */}
                                        <div className="ys-shop-ad">
                                            <img src='./images/ads gif3.gif' alt="Special offer" />
                                        </div>
                                        {/* )} */}
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </Col >
                <Col lg={2} className="d-none d-lg-block ">
                    <div className="ad-container">
                        <div className="ad-space">
                            <img src='/images/timegif.webp' className='rounded' />
                        </div>
                    </div>
                </Col>
            </Row >


            <Modal show={showModal} onHide={handleCloseModal} centered className="shop-modal">
                <Modal.Header closeButton className="bg-primary text-white">
                    <div className="w-100 d-flex justify-content-between align-items-start">
                        {activeTab === 'shop' && (
                            <Modal.Title>הוספת עסק חדש</Modal.Title>
                        )}
                        {activeTab === 'gmach' && (
                            <Modal.Title>הוספת גמ"ח חדש</Modal.Title>
                        )}
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <motion.form
                        onSubmit={
                            (e: any) => {
                                e.preventDefault();
                                if (activeTab === 'shop') {
                                    handleAddShop()
                                }
                                else if (activeTab === 'gmach') {
                                    handleAddGmach()
                                }
                            }
                        }
                        variants={formAnimation}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={itemAnimation}>
                            <Form.Group className="mb-3">
                                {activeTab === 'shop' && (
                                    <Form.Label>שם העסק</Form.Label>
                                )}
                                {activeTab === 'gmach' && (
                                    <Form.Label>שם הגמ"ח</Form.Label>
                                )}
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
                        {activeTab === 'shop' && (
                            <motion.div variants={itemAnimation}>
                                <Form.Group className="mb-3">
                                    <Form.Label>אתר אינטרנט</Form.Label>
                                    <Form.Control ref={websiteRef} type="url" required />
                                </Form.Group>
                            </motion.div>
                        )}
                        <motion.div variants={itemAnimation}>
                            <Form.Group className="mb-3">
                                {/* לשנות את זה לסלקט מתוך מבחר מסוים של קטגוריות */}
                                <Form.Label>קטגוריה</Form.Label>
                                <Form.Control ref={categoryRef} type="text" required />
                            </Form.Group>
                        </motion.div>
                        {activeTab === 'shop' && (
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
                        )}
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
        </div >
    )
}