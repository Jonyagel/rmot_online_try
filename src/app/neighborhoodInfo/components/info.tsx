"use client"
import React, { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSearch, FaMedkit, FaGlassCheers, FaMoneyBillWave, FaBabyCarriage, FaTools, FaAppleAlt, FaScroll, FaHandHoldingUsd, FaWheelchair, FaRing } from 'react-icons/fa';
import { Button, Modal, Form, InputGroup, Col, Row, Nav } from 'react-bootstrap';
import { CldImage, CldUploadButton } from 'next-cloudinary';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './infoStyle.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { faFontAwesome, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaTshirt, FaLaptop, FaBook, FaCouch, FaUtensils } from 'react-icons/fa';
import CategorySlider from './CategoryTags';
import { FaSynagogue, FaUniversity, FaLandmark, FaChild, FaUserFriends, FaHandsHelping, FaSwimmer, FaTheaterMasks, FaMusic, FaBusAlt, FaStore, FaGavel } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



export const dynamic = 'force-dynamic';

interface Card {
    id: string;
    name: string;
    description: string;
    logo?: string;
    hours: string;
    address: string;
    phone: string;
    email: string;
    website?: string;
    images: string[];
    category: string;
    type: string;
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
    const [mosadsAr, setMosadsAr] = useState(props.MosadsData);
    const [activeTab, setActiveTab] = useState<string>('shop');
    const [activeSubcategory, setActiveSubcategory] = useState('');
    const [inputValue, setInputValue] = useState('');




    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const hoursRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const websiteRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLInputElement>(null);

    const categories = [
        { name: "חנויות מזון", icon: 'cart2' },
        { name: "מזון מהיר", icon: 'basket3' },
        { name: "הלבשה", icon: 'bag' },
        { name: "טכנולוגיה", icon: 'laptop' },
        { name: "אירועים", icon: 'stars' },
        { name: "נקיון", icon: 'droplet' },
        { name: "בית וגינון", icon: 'house' },
        { name: "טיפוח", icon: 'duffle' },
        { name: "בריאות", icon: 'heart-pulse' },
        { name: "ספורט ופנאי", icon: 'bicycle' },
        { name: "ספרים ומדיה", icon: 'book' },
        { name: "משחקים", icon: 'dice-3' },
        { name: "תכשיטים ואביזרים", icon: 'gem' },
        { name: "רכב", icon: 'car-front' },
        { name: "אמנות ויצירה", icon: 'brush' },
        { name: "מתנות ומזכרות", icon: 'gift' },
        { name: "כלי בית ומטבח", icon: 'cup-hot' }
    ];

    const categoriesMosads = [
        { name: "בתי ספר", icon: 'backpack' },
        { name: "בתי כנסת", icon: <FaSynagogue /> },
        { name: "מרפאות ובתי חולים", icon: 'h-circle' },
        { name: "מוסדות השכלה גבוהה", icon: <FaUniversity /> },
        { name: "ספריות", icon: 'book' },
        { name: "מוסדות ציבור", icon: <FaLandmark /> },
        { name: "גני ילדים", icon: <FaChild /> },
        { name: "מרכזים קהילתיים", icon: <FaUserFriends /> },
        { name: "ארגוני צדקה וחסד", icon: <FaHandsHelping /> },
        { name: "מרכזי ספורט", icon: <FaSwimmer /> },
        { name: "מוסדות תרבות", icon: <FaTheaterMasks /> },
        { name: "מוסדות מוזיקה", icon: <FaMusic /> },
        { name: "תחבורה ציבורית", icon: <FaBusAlt /> },
        { name: "שווקים וקניונים", icon: <FaStore /> },
        { name: "מוסדות משפטיים", icon: <FaGavel /> }
    ];

    const categoriesGmachim = [
        { name: "כלי בית", icon: <FaUtensils /> },
        { name: "בריאות", icon: <FaMedkit /> },
        { name: "אירועים", icon: <FaGlassCheers /> },
        { name: "חינוך", icon: <FaBook /> },
        { name: "כספים", icon: <FaMoneyBillWave /> },
        { name: "ביגוד", icon: <FaTshirt /> },
        { name: "ילדים", icon: <FaBabyCarriage /> },
        { name: "כלי עבודה", icon: <FaTools /> },
        { name: "מזון", icon: <FaAppleAlt /> },
        { name: "ספרי קודש", icon: <FaScroll /> },
        { name: "הלוואות", icon: <FaHandHoldingUsd /> },
        { name: "ציוד רפואי", icon: <FaWheelchair /> },
        { name: "חתונות", icon: <FaRing /> },
        { name: "ריהוט", icon: <FaCouch /> },
        { name: "מחשבים וטכנולוגיה", icon: <FaLaptop /> }
    ];

    const doApiShop = async (subCategory: any) => {
        if (subCategory === null) {
            subCategory = '';
        }
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

    const doApiMosads = async (subCategory: any) => {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/mosads?category=${subCategory}`;
        const resp = await fetch(url, { cache: 'no-store' })
        const data = await resp.json();
        console.log(data);
        // setCardsAr(data)
        setMosadsAr(data);
        console.log(`Fetching mosads data for category: ${subCategory}`);
    }

    const itemAnimation = {
        // hidden: { opacity: 0, y: 20 },
        // visible: { opacity: 1, y: 0 }
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

    const filteredMosads = useMemo(() => {
        return mosadsAr.filter((card: any) =>
        (card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [searchTerm, mosadsAr]);



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
        const address = addressRef.current?.value;
        const hours = hoursRef.current?.value;
        const phone = phoneRef.current?.value;
        const email = emailRef.current?.value;
        const website = websiteRef.current?.value;
        const category = categoryRef.current?.value;
        try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shops`, {
                method: 'POST',
                body: JSON.stringify({ name, description, hours, address, phone, email, website, category, logo, image }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await resp.json();
            console.log(data);
            doApiShop('');
            handleCloseModal();
            router.push('/neighborhoodInfo');
        } catch (error: any) {
            console.error('Error:', error);
        }
        toast.success('החנות נוספה בהצלחה!');
        handleCloseModal();
    };

    const handleAddMosads = async () => {
        const name = nameRef.current?.value;
        const description = descriptionRef.current?.value;
        const address = addressRef.current?.value;
        const hours = hoursRef.current?.value;
        const phone = phoneRef.current?.value;
        const email = emailRef.current?.value;
        const website = websiteRef.current?.value;
        const category = categoryRef.current?.value;
        try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mosads`, {
                method: 'POST',
                body: JSON.stringify({ name, description, hours, address, phone, email, website, category, logo, image }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await resp.json();
            console.log(data);
            doApiMosads('');
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
        const address = addressRef.current?.value;
        const hours = hoursRef.current?.value;
        const phone = phoneRef.current?.value;
        const email = emailRef.current?.value;
        const category = categoryRef.current?.value;
        try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gmach`, {
                method: 'POST',
                body: JSON.stringify({ name, description, hours, address, phone, email, category, image }),
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


    type TimeSlot = { open: string; close: string };
    type Day = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
    type OpeningHours = { [key in Day]: TimeSlot[] };

    const [openingHours, setOpeningHours] = useState<OpeningHours>({
        sunday: [{ open: '', close: '' }],
        monday: [{ open: '', close: '' }],
        tuesday: [{ open: '', close: '' }],
        wednesday: [{ open: '', close: '' }],
        thursday: [{ open: '', close: '' }],
        friday: [{ open: '', close: '' }],
        saturday: [{ open: '', close: '' }],
    });

    const handleChange = (day: Day, index: number, field: 'open' | 'close', value: string) => {
        setOpeningHours(prevHours => ({
            ...prevHours,
            [day]: prevHours[day].map((slot, i) =>
                i === index ? { ...slot, [field]: value } : slot
            )
        }));
    };

    const addTimeSlot = (day: Day) => {
        setOpeningHours(prevHours => ({
            ...prevHours,
            [day]: [...prevHours[day], { open: '', close: '' }]
        }));
    };

    const removeTimeSlot = (day: Day, index: number) => {
        setOpeningHours(prevHours => ({
            ...prevHours,
            [day]: prevHours[day].filter((_, i) => i !== index)
        }));
    };

    const daysInHebrew: { [key in Day]: string } = {
        sunday: 'ראשון',
        monday: 'שני',
        tuesday: 'שלישי',
        wednesday: 'רביעי',
        thursday: 'חמישי',
        friday: 'שישי',
        saturday: 'שבת',
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
                        className='text-center'
                    >
                        <div className="header-container text-white my-auto rounded-bottom shadow-sm">
                            <h1 className="display-6">מידע שכונתי</h1>
                        </div>
                        <motion.div
                            className="mb-4"
                            initial={{ opacity: 1, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className=''>
                                <div className='mt-3'>
                                    <div className="search-bar-container bg-white shadow-sm  p-3 rounded-top align-items-center mx-auto">
                                        <Row>

                                            <Col lg={6} className='flex justify-content-start'>
                                                <Nav
                                                    activeKey={activeTab}
                                                    onSelect={(k: any) => {
                                                        setActiveTab(k);
                                                        if (k === 'gmach') {
                                                            doApiGmach('');
                                                        }
                                                        else if (k === 'shop') {
                                                            doApiShop("");
                                                            setActiveSubcategory('')
                                                        }
                                                        else if (k === 'mosads') {
                                                            doApiMosads("");
                                                            setActiveSubcategory('')
                                                        }
                                                    }}
                                                    className='justify-content-center'
                                                >
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="shop" className={`nav-link me-4 ${activeTab === 'shop' ? 'active' : ''}`}>עסקים</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="mosads" className={`nav-link me-4 ${activeTab === 'mosads' ? 'active' : ''}`}>מוסדות</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="gmach" className={`nav-link me-4 ${activeTab === 'gmach' ? 'active' : ''}`}>גמ״חים</Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                            </Col>
                                            <Col lg={6} className=' d-flex justify-content-end align-content-center'>
                                                <InputGroup className="border rounded w-50" style={{ maxHeight: '36px', maxWidth: '200px' }}>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="חיפוש חנויות..."
                                                        value={inputValue}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                                                        onKeyDown={(e: any) => {
                                                            if (e.key === 'Enter') {
                                                                e.preventDefault();
                                                                setSearchTerm(inputValue);
                                                            }
                                                        }}
                                                        className=""
                                                    />
                                                    <InputGroup.Text
                                                        className="search-button"
                                                        onClick={() => {
                                                            setSearchTerm(inputValue);
                                                        }}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <FaSearch />
                                                    </InputGroup.Text>
                                                </InputGroup>
                                                <button
                                                    className="btn btn-add-shop rounded border w-auto ms-1"
                                                    onClick={handleShowModal}
                                                    style={{ maxHeight: '36px' }}
                                                >
                                                    הוסף חנות
                                                </button>
                                            </Col>
                                        </Row>
                                    </div>

                                    {activeTab === 'shop' && (
                                        <motion.div
                                            className="subcategory-container shadow-sm bg-white pb-3 pt-2 rounded-bottom  mx-auto align-items-center"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <CategorySlider
                                                categories={categories}
                                                activeSubcategory={activeSubcategory}
                                                setActiveSubcategory={setActiveSubcategory}
                                                doApi={doApiShop}
                                            />
                                        </motion.div>
                                    )}
                                    {activeTab === 'mosads' && (
                                        <motion.div
                                            className="subcategory-container shadow-sm bg-white pb-3 pt-2 rounded-bottom  mx-auto align-items-center"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <CategorySlider
                                                categories={categoriesMosads}
                                                activeSubcategory={activeSubcategory}
                                                setActiveSubcategory={setActiveSubcategory}
                                                doApi={doApiMosads}
                                            />
                                        </motion.div>
                                    )}
                                    {activeTab === 'gmach' && (
                                        <motion.div
                                            className="subcategory-container shadow-sm bg-white pb-3 pt-2 rounded-bottom  mx-auto align-items-center"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <CategorySlider
                                                categories={categoriesGmachim}
                                                activeSubcategory={activeSubcategory}
                                                setActiveSubcategory={setActiveSubcategory}
                                                doApi={doApiGmach}
                                            />
                                        </motion.div>
                                    )}

                                </div>

                            </div>
                        </motion.div>
                    </motion.div>
                    <div className="shop-grid">
                        {(activeTab === 'shop' ? filteredCards :
                            activeTab === 'gmach' ? filteredGmach :
                                activeTab === 'mosads' ? filteredMosads :
                                    []).map((card: Card, index: number) => (
                                        <React.Fragment key={card.id}>
                                            <motion.div
                                                className="shop-card shadow-sm border rounded"
                                                whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                                            >
                                                <div className="shop-card-content">
                                                    <div className="shop-card-header">
                                                        {card.images ? (
                                                            <CldImage
                                                                src={card.images[0]}
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
                                                <hr className='w-75 mx-auto' style={{ color: 'gray' }} />
                                                <div className="shop-card-footer">
                                                    <div className="shop-address">
                                                        <span>  <i className="bi bi-geo-alt" style={{ fontSize: '10px', marginLeft: '2px' }}></i>{card.address}</span>
                                                    </div>
                                                    <button className="more-info-btn btn border" onClick={() => handleShopClick(card)}>למידע נוסף</button>
                                                </div>
                                            </motion.div>
                                            {(index + 1) % 6 === 0 && (
                                                <motion.div className="shop-card shadow-sm border rounded">
                                                    <div className="ad-content">
                                                        <img src="/images/bookgif.webp" alt="פרסומת" className="rounded object-contain" />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </React.Fragment>
                                    ))}
                    </div>

                    <AnimatePresence>
                        {selectedCard && (
                            <Row>
                                <motion.div
                                    className="ys-modal-overlay"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={closeModal}
                                >
                                    <motion.div
                                        // className={`ys-modal-content ys-shop-detail-modal rounded ${activeTab !== 'shop' ? 'ys-half-width' : ''}`}
                                        className={`ys-modal-content ys-shop-detail-modal rounded`}
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 50, opacity: 0 }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <button className="ys-close-button" onClick={closeModal}>
                                            <FaTimes />
                                        </button>
                                        <div className="">
                                            {/* <Row> */}
                                            {/* <Col md={`${activeTab == 'shop' ? '6' : '12'}`} className="ys-left-column"> */}
                                            <div className="ys-shop-card-header" style={{ height: 'auto' }}>
                                                <Swiper
                                                    modules={[Pagination, Navigation]}
                                                    spaceBetween={30}
                                                    slidesPerView={1}
                                                    navigation
                                                    pagination={{ clickable: true }}
                                                    className="ys-shop-image-slider"
                                                >
                                                    {selectedCard.images.map((image: any, index: any) => (
                                                        <SwiperSlide key={index}>
                                                            <div className="ys-shop-image-wrapper">
                                                                <CldImage
                                                                    src={image}
                                                                    width="600"
                                                                    height="200"
                                                                    style={{
                                                                        objectFit: 'cover',
                                                                        objectPosition: 'center',
                                                                        height: '40vh'
                                                                    }}
                                                                    className="ys-shop-detail-image rounded-top"
                                                                    alt={`${selectedCard.name} - Image ${index + 1}`}
                                                                    loading='lazy'
                                                                    format="webp"
                                                                    quality="auto"
                                                                />
                                                            </div>
                                                        </SwiperSlide>
                                                    ))}
                                                </Swiper>
                                                {selectedCard.logo && (
                                                    <div className="ys-shop-logo">
                                                        <CldImage
                                                            src={selectedCard.logo}
                                                            width="80"
                                                            height="80"
                                                            crop="fill"
                                                            className="ys-logo-image"
                                                            alt={`${selectedCard.name} logo`}
                                                            loading='lazy'
                                                            format="auto"
                                                            quality="auto"
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="ys-shop-card-content overflow-y-auto px-4">
                                                <h1 className="ys-shop-title">{selectedCard.name}</h1>
                                                <div className="ys-shop-description">
                                                    <p>{selectedCard.description}</p>
                                                </div>
                                                <div className="ys-shop-info-grid">
                                                    <div className="ys-info-item">
                                                        <i className="bi bi-geo-alt ys-info-icon" ></i>
                                                        <div>
                                                            <h3>כתובת</h3>
                                                            <p>{selectedCard.address}</p>
                                                        </div>
                                                    </div>
                                                    <div className="ys-info-item">
                                                        <i className="bi bi-telephone ys-info-icon" ></i>
                                                        <div>
                                                            <h3>טלפון</h3>
                                                            <Link href={`tel:${selectedCard.phone}`}>{selectedCard.phone}</Link>
                                                        </div>
                                                    </div>
                                                    <div className="ys-info-item">
                                                        <i className="bi bi-envelope ys-info-icon" ></i>
                                                        <div>
                                                            <h3>אימייל</h3>
                                                            <Link href={`mailto:${selectedCard.email}`}>{selectedCard.email}</Link>
                                                        </div>
                                                    </div>
                                                    {selectedCard.website && (
                                                        <div className="ys-info-item">
                                                            <i className="bi bi-globe ys-info-icon" ></i>
                                                            <div>
                                                                <h3>אתר אינטרנט</h3>
                                                                <Link href={selectedCard.website} target="_blank" rel="noopener noreferrer">
                                                                    {selectedCard.website}
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="ys-info-item">
                                                        <i className="bi bi-clock ys-info-icon" ></i>
                                                        <div>
                                                            <h3>שעות פעילות</h3>
                                                            <p>{selectedCard.hours}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            {/* </Col> */}
                                            {/* {activeTab === 'shop' && (
                                                    <Col md={1} className="d-flex align-items-center justify-content-center">
                                                        <div style={{ width: '1px', backgroundColor: '#ccc', height: '90%' }}></div> {/* קו הפרדה */}
                                            {/* </Col> */}
                                            {/* )} */}
                                            {/* {activeTab === 'shop' && (
                                                    <Col md={5} className="ys-right-column">
                                                        {activeTab === 'shop' && (
                                                            <div className="ys-shop-ad p-md-2 pe-md-0" style={{ maxHeight: '90vh' }}>
                                                                <img src='./images/ads shop1.jpg' className='rounded' alt="Special offer" style={{ maxHeight: '85vh', objectFit: 'contain' }} />
                                                            </div>
                                                        )}
                                                    </Col>
                                                )} */}
                                            {/* </Row> */}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </Row>
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


            <Modal show={showModal} onHide={handleCloseModal} centered size="xl" className="shop-modal">
                <Modal.Header className="  rounded-top p-4">
                    <Modal.Title className="font-bold text-2xl">
                        {activeTab === 'shop' && 'הוספת עסק חדש'}
                        {activeTab === 'mosads' && 'הוספת מוסד חדש'}
                        {activeTab === 'gmach' && 'הוספת גמ"ח חדש'}
                    </Modal.Title>
                    <button
                        className="text-white hover:text-gray-200 transition-colors duration-200"
                        onClick={handleCloseModal}
                    >
                        <FaTimes size={24} />
                    </button>
                </Modal.Header>
                <Modal.Body className="p-6">
                    <motion.form
                        onSubmit={(e: React.FormEvent) => {
                            e.preventDefault();
                            if (activeTab === 'shop') {
                                handleAddShop()
                            } else if (activeTab === 'mosads') {
                                handleAddMosads()
                            } else if (activeTab === 'gmach') {
                                handleAddGmach()
                            }
                        }}
                        variants={{
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
                        }}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <motion.div>
                                <div className='form-floating'>
                                    <input
                                        ref={nameRef}
                                        type="text"
                                        required
                                        className=" border rounded form-control"
                                        placeholder="הזן שם..."
                                    />
                                    <label className="text-center">
                                        {activeTab === 'shop' ? 'שם העסק' : activeTab === 'gmach' ? 'שם הגמ"ח' : 'שם המוסד'}
                                    </label>
                                </div>
                            </motion.div>

                            {/* <motion.div>
                                <div className='form-floating'>
                                    <input
                                        ref={hoursRef}
                                        type="text"
                                        className=" border rounded form-control"
                                        placeholder="לדוגמה: א'-ה' 9:00-18:00"
                                    />
                                    <label className="text-center">שעות פעילות</label>
                                </div>
                            </motion.div> */}
                            <motion.div>
                                <div className='form-floating'>
                                    <input
                                        ref={addressRef}
                                        type="text"
                                        className=" border rounded form-control"
                                        placeholder="הזן כתובת מלאה..."
                                    />
                                    <label className="text-center">כתובת</label>
                                </div>
                            </motion.div>
                            <motion.div>
                                <div className='form-floating'>
                                    <input
                                        ref={phoneRef}
                                        type="tel"
                                        className=" border rounded form-control"
                                        placeholder="הזן מספר טלפון..."
                                    />
                                    <label className="text-center">טלפון</label>
                                </div>
                            </motion.div>
                            <motion.div>
                                <div className='form-floating'>
                                    <input
                                        ref={emailRef}
                                        type="email"
                                        className=" border rounded form-control"
                                        placeholder="הזן כתובת אימייל..."
                                    />
                                    <label className="text-center">אימייל</label>
                                </div>
                            </motion.div>
                            <motion.div>
                                <div className='form-floating'>
                                    <input
                                        ref={websiteRef}
                                        type="url"
                                        className=" border rounded form-control"
                                        placeholder="הזן כתובת אתר (אופציונלי)..."
                                    />
                                    <label className="text-center">אתר אינטרנט</label>
                                </div>
                            </motion.div>
                            <motion.div>
                                <div className='form-floating'>
                                    <input
                                        ref={categoryRef}
                                        type="text"
                                        required
                                        className=" border rounded form-control"
                                        placeholder="בחר קטגוריה..."
                                    />
                                    <label className="text-center">קטגוריה</label>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div>
                            <div className='form-floating'>
                                <textarea
                                    ref={descriptionRef}
                                    rows={3}
                                    className="border rounded form-control"
                                    placeholder="הזן תיאור מפורט..."
                                />
                                <label className="text-center">תוכן מפורט</label>
                            </div>
                        </motion.div>
                        <div className='flex'>
                            <motion.div className="opening-hours-form overflow-y-auto w-50 mx-auto" style={{ maxHeight: '300px' }}>
                                <h3>שעות פעילות</h3>
                                <div className="opening-hours-grid">
                                    {(Object.entries(openingHours) as [Day, TimeSlot[]][]).map(([day, slots]) => (
                                        <div key={day} className="day-container">
                                            <div className='day-header'>
                                                <div className="day-label">{daysInHebrew[day]}</div>
                                                <button className="add-button btn" onClick={() => addTimeSlot(day)}>
                                                    +
                                                </button>
                                            </div>
                                            {slots.map((slot, index) => (
                                                <div key={index} className="time-slot-container">
                                                    <input
                                                        type="time"
                                                        className="time-input"
                                                        value={slot.open}
                                                        onChange={(e) => handleChange(day, index, 'open', e.target.value)}
                                                        placeholder="שעת פתיחה"
                                                    />
                                                    <span className="separator">-</span>
                                                    <input
                                                        type="time"
                                                        className="time-input"
                                                        value={slot.close}
                                                        onChange={(e) => handleChange(day, index, 'close', e.target.value)}
                                                        placeholder="שעת סגירה"
                                                    />
                                                    {slots.length > 1 && (
                                                        <button className="remove-button btn" onClick={() => removeTimeSlot(day, index)}>
                                                            -
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-50">
                                {(activeTab === 'shop' || activeTab === 'mosads') && (
                                    <motion.div>
                                        <Form.Group>
                                            {/* <Form.Label className="text-sm font-semibold text-gray-700 mb-1 block">לוגו</Form.Label> */}
                                            <div className="mt-1 flex items-center space-x-4">
                                                <CldUploadButton
                                                    className='btn upload-logo border rounded  flex items-center'
                                                    uploadPreset="my_upload_test"
                                                    onSuccess={handleUploadLogo}
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
                                                    }}
                                                >
                                                    <i className="bi bi-brilliance me-2"></i> העלאת לוגו
                                                </CldUploadButton>
                                                {logo && (
                                                    <div className="relative">
                                                        <motion.img
                                                            src={logo}
                                                            alt="לוגו"
                                                            className="w-16 h-16 object-cover rounded-lg border border-primary shadow-sm me-3"
                                                            initial={{ opacity: 0, scale: 0.5 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ duration: 0.3 }}
                                                        />
                                                        <button
                                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                                                            onClick={() => setLogo('')}
                                                        >
                                                            <FaTimes size={12} />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </Form.Group>
                                    </motion.div>
                                )}

                                <motion.div>
                                    <Form.Group>
                                        {/* <Form.Label className="text-sm font-semibold text-gray-700 mb-1 block">תמונות (עד 4)</Form.Label> */}
                                        <div className="mt-1 flex items-center space-x-4">
                                            <CldUploadButton
                                                className='btn upload-image border rounded  flex items-center'
                                                uploadPreset="my_upload_test"
                                                onSuccess={handleUploadImage}
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
                                                <i className="bi bi-card-image me-2"></i> העלאת תמונות
                                            </CldUploadButton>
                                        </div>
                                        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
                                            {image && (
                                                <div className="relative">
                                                    <motion.img
                                                        src={image}
                                                        alt="תמונה"
                                                        className="w-full h-24 object-cover rounded-lg border border-primary shadow-sm me-3"
                                                        initial={{ opacity: 0, scale: 0.5 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ duration: 0.3 }}
                                                    />
                                                    <button
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                                                        onClick={() => setImage('')}
                                                    >
                                                        <FaTimes size={12} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </Form.Group>
                                </motion.div>
                            </div>
                        </div>



                        <motion.div className="flex justify-end mt-6">
                            <Button
                                type="submit"
                                // variant=""
                                className="btn border rounded"
                            >
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