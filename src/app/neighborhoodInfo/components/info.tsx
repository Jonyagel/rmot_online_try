"use client"
import React, { useState, useMemo, useEffect, useCallback, memo } from 'react'
import { motion } from 'framer-motion';
import { FaSearch, FaArrowUp, } from 'react-icons/fa';
import { Form, InputGroup, Col, Row, Nav, Card, Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './infoStyle.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useSession } from 'next-auth/react';
import { useMediaQuery } from 'react-responsive';
import { FaPlus } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { Metadata } from 'next';
import Loading from '../loading';
import SearchSuggestions from './SearchSuggestions';
import InfoCard from './infoCard';
import { categories } from '../data/infoCategory'
import { categoriesMosads } from '../data/infoCategory'
import { categoriesGmachim } from '../data/infoCategory'
import AdDisplay from '@/src/components/AdDisplay';
import CategorySlider from './CategoryTags';
import dynamic from 'next/dynamic';
import debounce from 'lodash.debounce';
import Image from 'next/image';
import { useAppContext } from '../../context/appContext';

const FormInfo = dynamic(() => import('./formInfo'), {
    loading: () => <Loading />,
    ssr: false
});

export const metadata: Metadata = {
    title: 'רמות - רמת שלמה - חנויות ועסקים',
    description: 'רשימת העסקים, החנויות והשירותים בשכונה',
    openGraph: {
        title: 'רמות - רמת שלמה - חנויות ועסקים',
        description: 'גלו את כל העסקים בשכונה',
        images: [{
            url: 'https://asset.cloudinary.com/dglbrzbi1/52834b06603fe25209ec481073d6b5aa',
            alt: 'רמות רמת שלמה'
        }],
    }
};

type TimeSlot = { open: string; close: string; note?: string };

type Day = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

type OpeningHours = { [key in Day]: TimeSlot[] };

interface Card {
    _id: string;
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

const getCurrentDay = (): Day => {
    const days: { [key: string]: Day } = {
        'sunday': 'sunday',
        'monday': 'monday',
        'tuesday': 'tuesday',
        'wednesday': 'wednesday',
        'thursday': 'thursday',
        'friday': 'friday',
        'saturday': 'saturday'
    };

    return days[new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()] || 'sunday';
};

export default function ShopCards(props: any) {
    const { data: session } = useSession();
    const [selectedCard, setSelectedCard] = useState<Card | null>(props.shop);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showModalDetailShop, setShowModalDetailShop] = useState(false);
    const [cardsAr, setCardsAr] = useState(props.doApi);
    const [gmachAr, setGmachAr] = useState([]);
    const [mosadsAr, setMosadsAr] = useState([]);
    const [activeTab, setActiveTab] = useState<string>('shops');
    const [activeSubcategory, setActiveSubcategory] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [signIn, setSignIn] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [itemsToShow, setItemsToShow] = useState(20); // מספר פריטים להצגה ראשונית
    const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
    const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null); // מצב לבחירה
    const [favorites, setFavorites] = useState<string[]>(() => {
        if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem('favorites') || '[]');
        }
        return [];
    });
    const searchParams = useSearchParams();
    const { openModalFromChat } = useAppContext();

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            setSearchTerm(value);
        }, 300),
        []
    );

    const loadMore = useCallback(() => {
        setItemsToShow(prev => prev + 12);
    }, []);

    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: false
    });

    useEffect(() => {
        fetchFavorites();
        if (itemsToShow === 20) {
            scrollToTop();
        }
    }, []);

    useEffect(() => {
        if (!isMobile) {
            setIsSearchOpen(true);
        }
    }, [isMobile]);

    useEffect(() => {
        scrollToTop();
        setItemsToShow(20);
    }, [activeTab]);

    useEffect(() => {
        if (searchTerm) {
            scrollToTop();
            setItemsToShow(20);
        }
    }, [searchTerm]);

    useEffect(() => {
        if (inView) {
            loadMore();
        }
    }, [inView, loadMore]);

    // useEffect(() => {
    //     const cardId = searchParams.get('cardId');

    //     if (cardId) {
    //         const foundCard = [...cardsAr, ...gmachAr, ...mosadsAr].find(
    //             (card: any) => card._id === cardId
    //         );
            
    //         if (openModalFromChat) {
    //             console.log(foundCard)
    //             setSelectedCard(foundCard);
    //             setShowModalDetailShop(true);
    //             // if (cardsAr.some((card: Card) => card._id === cardId)) {
    //             //     setActiveTab('shops');
    //             // } else if (gmachAr.some((card: Card) => card._id === cardId)) {
    //             //     setActiveTab('gmach');
    //             // } else if (mosadsAr.some((card: Card) => card._id === cardId)) {
    //             //     setActiveTab('mosads');
    //             // }
    //         }
    //     }
    // }, [openModalFromChat]);

    useEffect(() => {
        const cardId = searchParams.get('cardId');

        if (cardId) {
            const foundCard = [...cardsAr, ...gmachAr, ...mosadsAr].find(
                (card: any) => card._id === cardId
            );

            if (foundCard) {
                setSelectedCard(foundCard);
                setShowModalDetailShop(true);
                if (cardsAr.some((card: Card) => card._id === cardId)) {
                    setActiveTab('shops');
                } else if (gmachAr.some((card: Card) => card._id === cardId)) {
                    setActiveTab('gmach');
                } else if (mosadsAr.some((card: Card) => card._id === cardId)) {
                    setActiveTab('mosads');
                }
            }
        }
    }, [searchParams, cardsAr, gmachAr, mosadsAr]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const isBusinessOpen = (hours: OpeningHours): boolean => {
        const now = new Date();
        const currentDay = getCurrentDay();
        const currentTime = now.toLocaleTimeString('he-IL', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        if (!hours || !hours[currentDay]) return false;

        return hours[currentDay].some(slot => {
            return currentTime >= slot.open && currentTime <= slot.close;
        });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        setIsSuggestionsOpen(true);
        if (e.target.value === '') {
            setSelectedSuggestion(null);
        }
        debouncedSearch(e.target.value);
    };

    const handleSuggestionSelect = (suggestion: string) => {
        setSearchTerm(suggestion);
        setSelectedSuggestion(suggestion);
        setIsSuggestionsOpen(false);
    };

    const handleSearch = () => {
        setSearchTerm(inputValue);
        if (isMobile) {
            setIsSearchOpen(false);
        }
    };

    const fetchFavorites = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/favorite`);
        if (response.ok) {
            const data = await response.json();
            setFavorites(data.favorites);
            localStorage.setItem('favorites', JSON.stringify(data.favorites));
        } else {
            console.error('Error fetching favorites from server:', await response.json());
        }
    };

    const doApiCard = async (endpoint: string, subCategory: any) => {
        if (subCategory === null) {
            subCategory = '';
        }
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}?category=${subCategory}`;
        const resp = await fetch(url, { cache: 'no-store' })
        const data = await resp.json();
        console.log(data);
        if (endpoint === 'shops')
            setCardsAr(data)
        else if (endpoint === 'gmach')
            setGmachAr(data);
        else if (endpoint === 'mosads')
            setMosadsAr(data);
        console.log(`Fetching data for category: ${subCategory}`);

    }

    const notify = () => toast.error("נא להתחבר כדי להוסיף עסק", {
        position: 'top-center',
        theme: 'light',
        rtl: true,
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
        const filtered = cardsAr
            .filter((card: any) => (
                card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                card.description.toLowerCase().includes(searchTerm.toLowerCase())
            ))
            .map((card: any) => ({
                ...card,
                isOpen: isBusinessOpen(card.hours)
            }))
            .sort((a: any, b: any) => {
                // מיון: קודם פתוחים, אחר כך סגורים
                if (a.isOpen && !b.isOpen) return -1;
                if (!a.isOpen && b.isOpen) return 1;
                // אם שניהם באותו סטטוס, מיין לפי שם
                return a.name.localeCompare(b.name);
            });

        return filtered.slice(0, itemsToShow);
    }, [searchTerm, cardsAr, itemsToShow]);

    const filteredGmach = useMemo(() => {
        const gmachFiltered = gmachAr.filter((card: any) =>
        (card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        return gmachFiltered.slice(0, itemsToShow);
    }, [searchTerm, gmachAr, itemsToShow]);

    const filteredMosads = useMemo(() => {
        const mosadFiltered = mosadsAr.filter((card: any) =>
        (card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        return mosadFiltered.slice(0, itemsToShow);
    }, [searchTerm, mosadsAr, itemsToShow]);

    const handleShowModal = () => setShowModal(true);

    const ScrollToTopButton = () => {
        const [isVisible, setIsVisible] = useState(false);

        useEffect(() => {
            const toggleVisibility = () => {
                setIsVisible(window.pageYOffset > 500);
            };
            window.addEventListener('scroll', toggleVisibility);
            return () => window.removeEventListener('scroll', toggleVisibility);
        }, []);

        return isVisible ? (
            <motion.button
                className="fixed bottom-4 right-4 rounded-full p-3 shadow-sm"
                whileHover={{ scale: 1.1 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{ border: '#63bd57 2px solid', color: '#63bd57' }}
            >
                <FaArrowUp />
            </motion.button>
        ) : null;
    };

    return (
        <Container fluid className="">
            <Row>
                <Col lg={2} className="d-none d-lg-block">
                    <AdDisplay page={'neighborhoodInfo'} />
                </Col>
                <Col lg={8} className='px-0 px-md-3'>
                    <motion.div
                        className='text-center'
                    >
                        <ScrollToTopButton />
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
                                <div className=''>
                                    <div className="search-bar-container bg-white shadow-sm p-3 rounded-top align-items-center mx-auto">
                                        <Row className=" flex-row">
                                            <Col xs={8} lg={6} className='d-flex justify-content-start mt-0'>
                                                <Nav
                                                    activeKey={activeTab}
                                                    onSelect={(k: any) => {
                                                        setActiveTab(k);
                                                        if (k === 'gmach') {
                                                            doApiCard('gmach', '');
                                                        }
                                                        else if (k === 'shops') {
                                                            doApiCard("shops", '');
                                                            setActiveSubcategory('')
                                                        }
                                                        else if (k === 'mosads') {
                                                            doApiCard("mosads", '');
                                                            setActiveSubcategory('')
                                                        }
                                                    }}
                                                    className='justify-content-center'
                                                >
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="shops" className={`info-nav-link me-4 ${activeTab === 'shops' ? 'active' : ''}`}>עסקים</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="mosads" className={`info-nav-link me-4 ${activeTab === 'mosads' ? 'active' : ''}`}>מוסדות</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="gmach" className={`info-nav-link ${activeTab === 'gmach' ? 'active' : ''}`}>גמ״חים</Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                            </Col>
                                            <Col xs={4} lg={6} className='d-flex justify-content-end align-items-center'>
                                                <div className="search-container">
                                                    {(!isMobile || isSearchOpen) && (
                                                        <InputGroup className="border rounded" style={{ maxHeight: '36px', maxWidth: '200px' }}>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="חיפוש חנויות..."
                                                                value={inputValue}
                                                                onChange={handleSearchChange}
                                                                onKeyDown={(e: React.KeyboardEvent) => {
                                                                    if (e.key === 'Enter') {
                                                                        e.preventDefault();
                                                                        handleSearch();
                                                                    }
                                                                }}
                                                                onFocus={() => {
                                                                    if (searchTerm) {
                                                                        setIsSuggestionsOpen(true);
                                                                    }
                                                                }}
                                                            />
                                                            <SearchSuggestions
                                                                searchTerm={inputValue}
                                                                onSelect={handleSuggestionSelect}
                                                                isOpen={isSuggestionsOpen}
                                                                setIsOpen={setIsSuggestionsOpen}
                                                                selectedSuggestion={selectedSuggestion}
                                                                dataBusiness={cardsAr}
                                                            />
                                                            <InputGroup.Text
                                                                className="search-button"
                                                                onClick={handleSearch}
                                                                style={{ cursor: 'pointer' }}
                                                            >
                                                                <FaSearch />
                                                            </InputGroup.Text>
                                                        </InputGroup>
                                                    )}
                                                    {isMobile && !isSearchOpen && (
                                                        <button
                                                            onClick={() => setIsSearchOpen(true)}
                                                            className="search-icon-button border btn"
                                                            style={{
                                                                height: '36px',
                                                                fontSize: '13px',
                                                                whiteSpace: 'nowrap',
                                                                width: isMobile ? '36px' : 'auto'
                                                            }}
                                                        >
                                                            <FaSearch />
                                                        </button>
                                                    )}
                                                </div>
                                                <button
                                                    className="btn btn-add-shop rounded border ms-2 d-flex align-items-center justify-content-center"
                                                    onClick={checkSignIn}
                                                    style={{
                                                        height: '36px',
                                                        fontSize: '13px',
                                                        whiteSpace: 'nowrap',
                                                        width: isMobile ? '36px' : 'auto'
                                                    }}
                                                >
                                                    <FaPlus style={{ marginLeft: isMobile ? '0' : '5px' }} />
                                                    {!isMobile && <span>הוסף חנות</span>}
                                                </button>
                                            </Col>
                                        </Row>
                                    </div>

                                    {activeTab === 'shops' && (
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
                                                doApi={doApiCard}
                                                activeTab={activeTab}
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
                                                doApi={doApiCard}
                                                activeTab={activeTab}
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
                                                doApi={doApiCard}
                                                activeTab={activeTab}
                                            />
                                        </motion.div>
                                    )}

                                </div>

                            </div>
                        </motion.div>
                    </motion.div>
                    <InfoCard
                        activeTab={activeTab}
                        filteredCards={filteredCards}
                        filteredGmach={filteredGmach}
                        filteredMosads={filteredMosads}
                        setSelectedCard={setSelectedCard}
                        selectedCard={selectedCard}
                    />

                    {activeTab === 'shops' && filteredCards.length < cardsAr.length && (
                        <div ref={ref} className="loading-trigger py-4 text-center">
                            <Loading />
                        </div>
                    )}

                    {activeTab === 'gmach' && filteredGmach.length < gmachAr.length && (
                        <div ref={ref} className="loading-trigger py-4 text-center">
                            <Loading />
                        </div>
                    )}

                    {activeTab === 'mosads' && filteredMosads.length < mosadsAr.length && (
                        <div ref={ref} className="loading-trigger py-4 text-center">
                            <Loading />
                        </div>
                    )}

                </Col >
                <Col lg={2} className="d-none d-lg-block ">
                    <AdDisplay page={'neighborhoodInfo'} />
                </Col>
            </Row >
            <FormInfo
                activeTab={activeTab}
                showModal={showModal}
                setShowModal={setShowModal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="form-title"
            />
            <div aria-live="polite">
                <ToastContainer role="alert" aria-label="התראות מערכת" />
            </div>
        </Container >
    )
}