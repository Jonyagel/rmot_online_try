"use client"
import React, { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSearch, FaMedkit, FaGlassCheers, FaMoneyBillWave, FaBabyCarriage, FaTools, FaAppleAlt, FaScroll, FaHandHoldingUsd, FaWheelchair, FaRing } from 'react-icons/fa';
import { Button, Modal, Form, InputGroup, Col, Row, Nav, Card } from 'react-bootstrap';
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
import { useSession } from 'next-auth/react';
import Maps from './maps';



export const dynamic = 'force-dynamic';
export const revalidate = 86400;

type TimeSlot = { open: string; close: string; note?: string };
type Day = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
type OpeningHours = { [key in Day]: TimeSlot[] };
interface Card {
    id: string;
    name: string;
    description: string;
    logo?: string;
    hours: OpeningHours;
    address: string;
    phone: string;
    email: string;
    website?: string;
    images: string[];
    category: string;
    type: string;
    ad: string;
    adImage: string;
}

export default function ShopCards(props: any) {
    const router = useRouter();
    const { data: session } = useSession();
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showModalDetailShop, setShowModalDetailShop] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [logo, setLogo] = useState('');
    const [image, setImage] = useState('');
    const [cardsAr, setCardsAr] = useState(props.shopsData);
    const [gmachAr, setGmachAr] = useState(props.gmachData);
    const [mosadsAr, setMosadsAr] = useState(props.MosadsData);
    const [activeTab, setActiveTab] = useState<string>('shop');
    const [activeSubcategory, setActiveSubcategory] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [errors, setErrors] = useState<any>({});
    const [signIn, setSignIn] = useState(false);
    const [customTextHours, setCustomTextHours] = useState<{ [key in Day]: string }>({
        sunday: '',
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
    });



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

    const validateForm = () => {
        const formData = {
            name: nameRef.current?.value,
            description: descriptionRef.current?.value,
            address: addressRef.current?.value,
            hours: openingHours,
            phone: phoneRef.current?.value,
            email: emailRef.current?.value,
            website: websiteRef.current?.value,
            category: categoryRef.current?.value,
            images: image ? [image] : [],
            logo: logo
        };

        const newErrors: any = {};

        if (!formData.name || formData.name.length < 2 || formData.name.length > 50) {
            newErrors.name = 'שם חייב להיות בין 2 ל-50 תווים';
        }

        if (formData.description && (formData.description.length < 2 || formData.description.length > 700)) {
            newErrors.description = 'תיאור חייב להיות בין 2 ל-700 תווים';
        }

        if (formData.address && (formData.address.length < 2 || formData.address.length > 70)) {
            newErrors.address = 'כתובת חייבת להיות בין 2 ל-70 תווים';
        }

        if (formData.phone && formData.phone.length > 20) {
            newErrors.phone = 'טלפון חייב להיות עד 20 תווים';
        }

        if (formData.email && formData.email.length > 50) {
            newErrors.email = 'אימייל חייב להיות עד 50 תווים';
        }

        if (formData.website && (formData.website.length < 2 || formData.website.length > 150)) {
            newErrors.website = 'אתר אינטרנט חייב להיות בין 2 ל-150 תווים';
        }

        if (formData.category && (formData.category.length < 2 || formData.category.length > 500)) {
            newErrors.category = 'קטגוריה חייבת להיות בין 2 ל-500 תווים';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            if (activeTab === 'shop') {
                handleAddShop();
            } else if (activeTab === 'mosads') {
                handleAddMosads();
            } else if (activeTab === 'gmach') {
                handleAddGmach();
            }
        }
    };

    const notify = () => toast.error("אתה צריך להירשם", {
        position: 'top-left',
        theme: 'light'
    });

    const checkSignIn = async () => {
        if (session) {
            setSignIn(true);
            handleShowModal();
        }
        else {
            try {
                const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkLogin`);
                const data = await resp.json();
                if (data.status === 401) {
                    // console.log(session);
                    notify();
                    setSignIn(false);
                } else if (data.status === 200) {
                    setSignIn(true);
                    handleShowModal();
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

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
        setShowModalDetailShop(true)
    };

    const closeModal = () => {
        setSelectedCard(null);
        setShowModalDetailShop(false)
    };

    const handleShowModal = () => setShowModal(true);
    const handleShowMap = () => setShowMap(true);
    const handleCloseMap = () => setShowMap(false);

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
        // const hours = hoursRef.current?.value;
        const phone = phoneRef.current?.value;
        const email = emailRef.current?.value;
        const website = websiteRef.current?.value;
        const category = categoryRef.current?.value;
        try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shops`, {
                method: 'POST',
                body: JSON.stringify({ name, description, hours: openingHours, address, phone, email, website, category, logo, images: image }),
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

    const handleCustomTextChange = (day: Day, value: string) => {
        setOpeningHours(prev => ({
            ...prev,
            [day]: prev[day].map((slot, index) =>
                index === 0 ? { ...slot, note: value } : slot
            )
        }));
    };


    const [openingHours, setOpeningHours] = useState<OpeningHours>({
        sunday: [{ open: '', close: '', note: '' }],
        monday: [{ open: '', close: '', note: '' }],
        tuesday: [{ open: '', close: '', note: '' }],
        wednesday: [{ open: '', close: '', note: '' }],
        thursday: [{ open: '', close: '', note: '' }],
        friday: [{ open: '', close: '', note: '' }],
        saturday: [{ open: '', close: '', note: '' }],
    });

    const handleChange = (day: Day, index: number, field: 'open' | 'close' | 'note', value: string) => {
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
            [day]: [...prevHours[day], { open: '', close: '', note: '' }]
        }));
    };

    const removeTimeSlot = (day: Day, index: number) => {
        setOpeningHours(prevHours => ({
            ...prevHours,
            [day]: prevHours[day].filter((_, i) => i !== index)
        }));
    };


    const daysInHebrew: { [key in Day]: string } = {
        sunday: 'א',
        monday: 'ב',
        tuesday: 'ג',
        wednesday: 'ד',
        thursday: 'ה',
        friday: 'ו',
        saturday: 'שבת'
    };

    type DayKey = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

    function translateDay(day: DayKey): string {
        return daysInHebrew[day];
    }

    const isOpenNow = (hours: OpeningHours): boolean => {
        const now = new Date();
        const currentDay = now.toLocaleString('en-US', { weekday: 'long' }).toLowerCase() as Day;
        const currentTime = now.toTimeString().slice(0, 5);

        const todayHours = hours[currentDay] || [];
        return todayHours.some(hour => hour.open <= currentTime && hour.close >= currentTime);
    };

    const groupHours = (hours: OpeningHours) => {
        const daysOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as Day[];
        const grouped: { [key: string]: { days: Day[], note?: string }[] }[] = [];

        daysOrder.forEach((day) => {
            if (hours[day]) {
                hours[day].forEach(slot => {
                    const timeRange = `${slot.open} - ${slot.close}`;
                    const lastGroup = grouped[grouped.length - 1];

                    if (lastGroup && lastGroup[timeRange] && lastGroup[timeRange][lastGroup[timeRange].length - 1].days[lastGroup[timeRange][lastGroup[timeRange].length - 1].days.length - 1] === daysOrder[daysOrder.indexOf(day) - 1]) {
                        lastGroup[timeRange][lastGroup[timeRange].length - 1].days.push(day);
                        if (slot.note) {
                            lastGroup[timeRange][lastGroup[timeRange].length - 1].note = slot.note;
                        }
                    } else {
                        if (!grouped[grouped.length - 1] || !grouped[grouped.length - 1][timeRange]) {
                            grouped.push({ [timeRange]: [{ days: [day], note: slot.note }] });
                        } else {
                            grouped[grouped.length - 1][timeRange].push({ days: [day], note: slot.note });
                        }
                    }
                });
            }
        });

        return grouped;
    };

    const renderGroupedHours = (hours: OpeningHours) => {
        const groupedHours = groupHours(hours);

        return groupedHours.flatMap((group) =>
            Object.entries(group).flatMap(([timeRange, dayGroups]) =>
                dayGroups.map(({ days, note }) => ({
                    days: days.map(day => translateDay(day)).join(', '),
                    timeRange,
                    note
                }))
            )
        );
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    return (
        <div className="px-3" style={{ minHeight: '100vh' }}>
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
                            <p className="tittle-heeder">מידע שכונתי</p>
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
                                        <Row className="flex-column-reverse flex-lg-row">
                                            <Col xs={12} lg={6} className='d-flex justify-content-center justify-content-lg-start mt-3 mt-lg-0'>
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
                                                        <Nav.Link eventKey="gmach" className={`nav-link ${activeTab === 'gmach' ? 'active' : ''}`}>גמ״חים</Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                            </Col>
                                            <Col xs={12} lg={6} className='d-flex justify-content-center justify-content-lg-end align-items-center'>
                                                <div className="d-flex">
                                                    <InputGroup className="border rounded" style={{ maxHeight: '36px', maxWidth: '200px' }}>
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
                                                        className="btn btn-add-shop rounded border ms-2"
                                                        onClick={checkSignIn}
                                                        style={{ maxHeight: '36px', fontSize: '13px', whiteSpace: 'nowrap' }}
                                                    >
                                                        הוסף חנות
                                                    </button>
                                                </div>
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
                    <motion.div
                        className="shop-grid"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                    >
                        {(activeTab === 'shop' ? filteredCards :
                            activeTab === 'gmach' ? filteredGmach :
                                activeTab === 'mosads' ? filteredMosads :
                                    []).map((card: Card, index: number) => (
                                        <React.Fragment key={card.id}>
                                            <motion.div variants={itemVariants}>
                                                <div
                                                    className="shop-card shadow-sm rounded"
                                                >
                                                    <div className="shop-card-content" style={{ flex: 1 }}>
                                                        <div className="shop-card-header p-2">
                                                            {card.logo ? (
                                                                <CldImage
                                                                    src={card.logo}
                                                                    width="400"
                                                                    height="200"
                                                                    className="shop-image rounded"
                                                                    alt={`${card.name} logo`}
                                                                    loading='lazy'
                                                                    format="auto"
                                                                    quality="auto"
                                                                />
                                                            ) : (
                                                                <div className="w-full bg-gray-100 rounded flex items-center justify-center" style={{ height: '150px' }}>
                                                                    <FontAwesomeIcon icon={faFontAwesome} size="3x" color="#dce0e3" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="shop-description px-2">
                                                            <h3 className='font-bold'>{card.name}</h3>
                                                            <p>
                                                                {card.description.length > 100
                                                                    ? `${card.description.substring(0, 100)}...`
                                                                    : card.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="shop-card-footer mt-auto">
                                                        <button className="more-info-btn btn border w-100" onClick={() => handleShopClick(card)}>למידע נוסף</button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                            {(index + 1) % 7 === 0 && (
                                                <motion.div
                                                    key={`ad-${index}`}
                                                    variants={itemVariants}
                                                    className="rounded"
                                                >
                                                    <div className="ad-content">
                                                        <img src="/images/20off.gif" alt="פרסומת" className="shadow-sm rounded object-contain" />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </React.Fragment>
                                    ))}
                    </motion.div>

                    <Modal show={showModalDetailShop} onHide={closeModal} size='xl' className='rounded overflow-y-auto p-0'>
                        <Modal.Header closeButton className='header-modal-detail-shop'>
                            {selectedCard && (
                                <h2 className='text-3xl'>{selectedCard.name}</h2>
                            )}
                        </Modal.Header>
                        <Modal.Body className='rounded' style={{ maxHeight: '85vh', overflowY: 'auto' }}>
                            {selectedCard && (
                                <div className="p-2 rounded" style={{ background: '#fafcf9' }}>
                                    <div className="flex flex-col md:flex-row gap-8">

                                        <div className={`${selectedCard.images[0] ? 'md:w-1/2' : 'md:w-0/2'}`}>
                                            {selectedCard.images[0] && (
                                                <div className="mb-2 ys-shop-image-slider">
                                                    <Swiper
                                                        modules={[Pagination, Navigation]}
                                                        spaceBetween={20}
                                                        slidesPerView={1}
                                                        navigation
                                                        pagination={{ clickable: true }}
                                                    >
                                                        {selectedCard.images.map((image, index) => (
                                                            <SwiperSlide key={index}>
                                                                <CldImage
                                                                    src={image}
                                                                    width="600"
                                                                    height="400"
                                                                    crop="fill"
                                                                    gravity="auto"
                                                                    className="w-full object-cover rounded"
                                                                    alt={`${selectedCard.name} - תמונה ${index + 1}`}
                                                                    loading="lazy"
                                                                />
                                                            </SwiperSlide>
                                                        ))}
                                                    </Swiper>
                                                </div>
                                            )}
                                            {selectedCard.ad && (
                                                <div className="">
                                                    {selectedCard.adImage && (
                                                        <div className="mb-2">
                                                            <CldImage
                                                                src={selectedCard.adImage}
                                                                width="600"
                                                                height="700"
                                                                crop="fill"
                                                                gravity="auto"
                                                                className="object-contain rounded shadow-sm"
                                                                alt={`${selectedCard.name} - מודעה`}
                                                                loading="lazy"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <div className={`${selectedCard.images[0] ? 'md:w-1/2' : 'md:w-full'}`}>
                                            <div className="p-2 pt-0">
                                                <div className="flex items-center my-4">
                                                    {selectedCard.logo && (
                                                        <CldImage
                                                            src={selectedCard.logo}
                                                            width="50"
                                                            height="50"
                                                            className="rounded-circle"
                                                            alt={`${selectedCard.name} לוגו`}
                                                        />
                                                    )}
                                                    <div>
                                                        <span className="font-bold ms-2">{selectedCard.name}</span>
                                                        <p className="text-gray-600 ms-2">{selectedCard.description}</p>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <div className="">
                                                        <div className="flex align-items-center">
                                                            <div className='flex justify-content-center align-items-center' style={{ width: '50px', height: '50px' }}>
                                                                <i className="bi bi-geo-alt text-gray-600"></i>
                                                            </div>
                                                            {/* <a
                                                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedCard.address)}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="hover:text-green-500"
                                                                >
                                                                    {selectedCard.address}
                                                                </a> */}
                                                            <span className="hover:text-green-500 ms-2" style={{ cursor: 'pointer' }} onClick={() => handleShowMap()}>{selectedCard.address}</span>
                                                            <Modal show={showMap} onHide={() => handleCloseMap()}>
                                                                <Modal.Header closeButton onClick={() => handleCloseMap()}>{selectedCard.address}</Modal.Header>
                                                                <Modal.Body className='p-2'>
                                                                    <Maps card={selectedCard} />
                                                                </Modal.Body>
                                                            </Modal>
                                                        </div>
                                                        <div className="flex align-items-center">
                                                            <div className='flex justify-content-center align-items-center' style={{ width: '50px', height: '50px' }}>
                                                                <i className="bi bi-telephone text-gray-600"></i>
                                                            </div>
                                                            <Link href={`tel:${selectedCard.phone}`} className="hover:text-green-500 ms-2">{selectedCard.phone}</Link>
                                                        </div>
                                                        <div className="flex align-items-center ">
                                                            <div className='flex justify-content-center align-items-center' style={{ width: '50px', height: '50px' }}>
                                                                <i className="bi bi-envelope text-gray-600"></i>
                                                            </div>
                                                            <Link href={`mailto:${selectedCard.email}`} className="hover:text-green-500 ms-2">{selectedCard.email}</Link>
                                                        </div>
                                                        {selectedCard.website && (
                                                            <div className="flex align-items-center ">
                                                                <div className='flex justify-content-center align-items-center' style={{ width: '50px', height: '50px' }}>
                                                                    <i className="bi bi-globe text-gray-600"></i>
                                                                </div>
                                                                <Link href={selectedCard.website} target="_blank" rel="noopener noreferrer" className="hover:text-green-500  ms-2">
                                                                    {selectedCard.website}
                                                                </Link>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                {selectedCard.hours.sunday && (
                                                    <div className="">
                                                        <div className="flex align-items-center">
                                                            <div className='flex justify-content-center align-items-center' style={{ width: '50px', height: '50px' }}>
                                                                <i className="bi bi-clock text-gray-600"></i>
                                                            </div>
                                                            <span className='ms-2'>שעות פעילות</span>
                                                            <div className="ms-2 text-sm">
                                                                {isOpenNow(selectedCard.hours) ? (
                                                                    <span className="bg-green-500 px-1 text-white rounded">
                                                                        פתוח עכשיו
                                                                    </span>
                                                                ) : (
                                                                    <span className="bg-red-500 px-1 text-white rounded">
                                                                        סגור עכשיו
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <table className="md:w-50 text-gray-600">
                                                            <tbody>
                                                                {renderGroupedHours(selectedCard.hours).map((row, index) => (
                                                                    <React.Fragment key={index}>
                                                                        <tr>
                                                                            <td style={{ width: '50px', height: '50px' }}></td>
                                                                            <td className="ps-2 font-medium">{row.days}</td>
                                                                            <td className="ms-2">{row.timeRange}</td>
                                                                        </tr>
                                                                        {row.note && (
                                                                            <tr>
                                                                                <td style={{ width: '50px', height: '50px' }}></td>
                                                                                <td colSpan={2} className="text-sm text-gray-500 pb-1 ms-2">{row.note}</td>
                                                                            </tr>
                                                                        )}
                                                                    </React.Fragment>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )}
                                                <div className='md:w-50' style={{maxHeight:'300px'}}>
                                                <Maps card={selectedCard} />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )}
                        </Modal.Body>
                        {/* // </motion.div> */}
                    </Modal>

                </Col >
                <Col lg={2} className="d-none d-lg-block ">
                    <div className="ad-container">
                        <div className="ad-space">
                            <img src='/images/timegif.webp' className='rounded' />
                        </div>
                    </div>
                </Col>
            </Row >

            <AnimatePresence>
                {showModal && (
                    <Row>
                        <motion.div
                            className="ys-modal-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        // onClick={handleCloseModal}
                        >
                            <Card className="shop-modal" style={{ width: '80%', height: '90vh' }}>
                                <Card.Header className="add-shop-modal flex justify-content-between rounded-top p-4">
                                    <Card.Title className="font-bold text-2xl text-white">
                                        {activeTab === 'shop' && 'הוספת עסק חדש'}
                                        {activeTab === 'mosads' && 'הוספת מוסד חדש'}
                                        {activeTab === 'gmach' && 'הוספת גמ"ח חדש'}
                                    </Card.Title>
                                    <button
                                        className="text-white hover:text-gray-200 transition-colors duration-200"
                                        onClick={handleCloseModal}
                                    >
                                        <FaTimes size={24} />
                                    </button>
                                </Card.Header>
                                <Card.Body className="p-6 overflow-y-auto">
                                    <motion.form
                                        onSubmit={handleSubmit}
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
                                                        className={`border rounded form-control ${errors.name ? 'is-invalid' : ''}`}
                                                        placeholder="הזן שם..."
                                                    />
                                                    <label className="text-center">
                                                        {activeTab === 'shop' ? 'שם העסק' : activeTab === 'gmach' ? 'שם הגמ"ח' : 'שם המוסד'}
                                                    </label>
                                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                                </div>
                                            </motion.div>
                                            <motion.div>
                                                <div className='form-floating'>
                                                    <input
                                                        ref={addressRef}
                                                        type="text"
                                                        className={`border rounded form-control ${errors.address ? 'is-invalid' : ''}`}
                                                        placeholder="הזן כתובת מלאה..."
                                                    />
                                                    <label className="text-center">כתובת</label>
                                                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                                                </div>
                                            </motion.div>
                                            <motion.div>
                                                <div className='form-floating'>
                                                    <input
                                                        ref={phoneRef}
                                                        type="tel"
                                                        className={`border rounded form-control ${errors.phone ? 'is-invalid' : ''}`}
                                                        placeholder="הזן מספר טלפון..."
                                                    />
                                                    <label className="text-center">טלפון</label>
                                                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                                </div>
                                            </motion.div>
                                            <motion.div>
                                                <div className='form-floating'>
                                                    <input
                                                        ref={emailRef}
                                                        type="email"
                                                        className={`border rounded form-control ${errors.email ? 'is-invalid' : ''}`}
                                                        placeholder="הזן כתובת אימייל..."
                                                    />
                                                    <label className="text-center">אימייל</label>
                                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                                </div>
                                            </motion.div>
                                            <motion.div>
                                                <div className='form-floating'>
                                                    <input
                                                        ref={websiteRef}
                                                        type="url"
                                                        className={`border rounded form-control ${errors.website ? 'is-invalid' : ''}`}
                                                        placeholder="הזן כתובת אתר (אופציונלי)..."
                                                    />
                                                    <label className="text-center">אתר אינטרנט</label>
                                                    {errors.website && <div className="invalid-feedback">{errors.website}</div>}
                                                </div>
                                            </motion.div>
                                            <motion.div>
                                                <div className='form-floating'>
                                                    <input
                                                        ref={categoryRef}
                                                        type="text"
                                                        required
                                                        className={`border rounded form-control ${errors.category ? 'is-invalid' : ''}`}
                                                        placeholder="בחר קטגוריה..."
                                                    />
                                                    <label className="text-center">קטגוריה</label>
                                                    {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                                                </div>
                                            </motion.div>
                                        </div>

                                        <motion.div>
                                            <div className='form-floating'>
                                                <textarea
                                                    ref={descriptionRef}
                                                    rows={3}
                                                    className={`border rounded form-control ${errors.description ? 'is-invalid' : ''}`}
                                                    placeholder="הזן תיאור מפורט..."
                                                />
                                                <label className="text-center">תוכן מפורט</label>
                                                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                                            </div>
                                        </motion.div>
                                        <div className='flex'>
                                            <motion.div className="opening-hours-form w-full mx-auto mt-4">
                                                <h3 className="text-lg font-semibold mb-2">שעות פעילות</h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {(Object.entries(openingHours) as [Day, TimeSlot[]][]).map(([day, slots]) => (
                                                        <div key={day} className="mb-2 p-3 bg-gray-50 rounded-lg">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className="text-sm font-medium">{daysInHebrew[day]}</span>
                                                                <button
                                                                    className="text-xs text-white px-2 py-1 rounded"
                                                                    onClick={() => addTimeSlot(day)}
                                                                    style={{ background: '#00a35b' }}
                                                                >
                                                                    הוסף שעות
                                                                </button>
                                                            </div>
                                                            {slots.map((slot, index) => (
                                                                <div key={index} className="flex items-center mb-1">
                                                                    <input
                                                                        type="time"
                                                                        className="border rounded px-2 py-1 text-sm w-24"
                                                                        value={slot.open}
                                                                        onChange={(e) => handleChange(day, index, 'open', e.target.value)}
                                                                    />
                                                                    <span className="mx-2">-</span>
                                                                    <input
                                                                        type="time"
                                                                        className="border rounded px-2 py-1 text-sm w-24"
                                                                        value={slot.close}
                                                                        onChange={(e) => handleChange(day, index, 'close', e.target.value)}
                                                                    />
                                                                    {slots.length > 1 && (
                                                                        <button
                                                                            className="ml-2 text-red-500"
                                                                            onClick={() => removeTimeSlot(day, index)}
                                                                        >
                                                                            <FaTimes size={14} />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            ))}
                                                            <div className="mt-2">
                                                                <input
                                                                    type="text"
                                                                    className="border rounded px-2 py-1 text-sm w-full"
                                                                    value={openingHours[day][0].note}
                                                                    onChange={(e) => handleCustomTextChange(day, e.target.value)}
                                                                    placeholder="הוסף הערה (אופציונלי)"
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                            </motion.div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-50">
                                                {(activeTab === 'shop' || activeTab === 'mosads') && (
                                                    <motion.div>
                                                        <Form.Group>
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
                                                style={{ background: '#00a35b' }}

                                            >
                                                שלח לאישור
                                            </Button>
                                        </motion.div>
                                    </motion.form>
                                </Card.Body>
                            </Card>
                        </motion.div>
                    </Row>
                )}
            </AnimatePresence>
            <ToastContainer position="bottom-center" theme="colored" />
        </div >
    )
}