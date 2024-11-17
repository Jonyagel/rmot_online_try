"use client"
import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Nav, Tab, Alert, Table, Badge, ButtonGroup, Spinner, Pagination } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faUsers, faHome, faComments, faExclamationTriangle, faAd, faBuildingUser, faNewspaper, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import './admin.css'
import '../nadlan/nadlanStyle.css'
import AdManager from '@/src/components/AdManager';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { motion } from 'framer-motion';
import { CldImage } from 'next-cloudinary';

interface ForumPost {
    id: string;
    title: string;
    author: string;
    date: string;
    category: string;
    status: 'active' | 'inactive';
    content: string;
}
interface ContentItem {
    id: string;
    type: 'forum' | 'property' | 'lostFound';
    title: string;
    description: string;
    createdAt: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface DashboardStats {
    totalUsers: number;
    totalPosts: number;
    totalProperties: number;
    totalAds: number;
    totalReports: number;
}

const dashboardChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Example Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
        },
    ],
};

export default function AdminDashboard() {
    const [content, setContent] = useState<ContentItem[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [forum, setForum] = useState<any>();
    const [nadlan, setNadlan] = useState<any>();
    const [ads, setAds] = useState<any>();
    const [showModal, setShowModal] = useState(false);
    const [currentItem, setCurrentItem] = useState<ContentItem | null>(null);
    const [modalMode, setModalMode] = useState<'edit' | 'add'>('add');
    const [activeTab, setActiveTab] = useState('content');
    const [isAdmin, setIsAdmin] = useState(false);
    const [stats, setStats] = useState<DashboardStats>({
        totalUsers: 0,
        totalPosts: 0,
        totalProperties: 0,
        totalAds: 0,
        totalReports: 0
    });
    const [posts, setPosts] = useState<ForumPost[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    const filteredPosts = useMemo(() => {
        return posts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [posts, searchTerm]);
    const router = useRouter();

    useEffect(() => {
        checkAdminStatus();
    }, []);

    useEffect(() => {
        if (isAdmin) {
            fetchDashboardStats();
        }
    }, [isAdmin]);

    useEffect(() => {
        console.log("Active Tab:", activeTab);
    }, [activeTab]);

    useEffect(() => {
        console.log("Dashboard Chart Data:", dashboardChartData);
    }, []);

    const checkAdminStatus = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin`;
        const resp = await fetch(url);
        const data = await resp.json();
        try {
            if (data.role === 'admin') {
                setIsAdmin(true);
                fetchContent();
                fetchUsers();
                fetchForum();
                fetchNadlan();
                fetchAds();
            } else {
                router.push('/unauthorized');
            }
        } catch (error) {
            console.error('Invalid token:', error);
            router.push('/api/auth/signin');
        }
    };

    const handleEditPost = (id: string) => {
        // Add edit logic
    };

    const handleDeletePost = (id: string) => {
        // Add delete logic with confirmation
        if (window.confirm('האם אתה בטוח שברצונך למחוק פוסט זה?')) {
            // Delete logic
        }
    };

    const fetchContent = async () => {
        console.log("Fetching content...");
        // Implement API call to fetch content
        const mockData: ContentItem[] = [
            { id: '1', type: 'forum', title: 'פורום שכונתי', description: 'דיון על נושאים שכונתיים', createdAt: '2024-03-01' },
            { id: '2', type: 'property', title: 'דירה למכירה', description: '3 חדרים, קומה 2', createdAt: '2024-03-02' },
            { id: '3', type: 'lostFound', title: 'אבד כלב', description: 'כלב לברדור שחור', createdAt: '2024-03-03' },
        ];
        setContent(mockData);
    };

    const fetchUsers = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/allUsers`;
        const resp = await fetch(url);
        const data = await resp.json();
        console.log(data);
        console.log("Fetching users...");
        setUsers(data);
    };

    const fetchForum = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/forum/allForum`;
        const resp = await fetch(url);
        const data = await resp.json();
        console.log(data);
        console.log("Fetching users...");
        setPosts(data)
        setForum(data);
    };

    const fetchNadlan = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/nadlan`;
        const resp = await fetch(url);
        const data = await resp.json();
        console.log(data);
        console.log("Fetching users...");
        setNadlan(data);
    };
    const fetchAds = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/ads`;
        const resp = await fetch(url);
        const data = await resp.json();
        console.log(data);
        console.log("Fetching users...");
        setAds(data);
    };

    const fetchDashboardStats = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats`);
            const data = await response.json();
            console.log(data + 'hbtbfnbft');
            setStats({
                totalUsers: data.totalUsers,
                totalPosts: data.totalPosts,
                totalProperties: data.totalProperties,
                totalAds: data.totalAds,
                totalReports: data.totalReports
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const handleEdit = (item: ContentItem) => {
        setCurrentItem(item);
        setModalMode('edit');
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        // Implement API call to delete item
        setContent(content.filter(item => item.id !== id));
        toast.success('הפריט נמחק בהצלחה');
    };

    const handleAdd = () => {
        setCurrentItem(null);
        setModalMode('add');
        setShowModal(true);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const newItem: ContentItem = {
            id: currentItem?.id || Date.now().toString(),
            type: formData.get('type') as 'forum' | 'property' | 'lostFound',
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            createdAt: new Date().toISOString().split('T')[0],
        };

        if (modalMode === 'edit') {
            // Implement API call to update item
            setContent(content.map(item => item.id === newItem.id ? newItem : item));
            toast.success('הפריט עודכן בהצלחה');
        } else {
            // Implement API call to add new item
            setContent([...content, newItem]);
            toast.success('הפריט נוסף בהצלחה');
        }

        setShowModal(false);
    };

    if (!isAdmin) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
                    אין לך הרשאה לצפות בעמוד זה. רק מנהלים מורשים יכולים לגשת ללוח הבקרה.
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="">
            <Row>
                <Col lg={2} className="d-none d-lg-block">
                    {/* <div className="ad-container">
                        <div className="ad-space">
                            <img src='/images/bookgif.webp' className='rounded' />
                        </div>
                    </div> */}
                    {/* <AdDisplay page={'neighborhoodInfo'}/> */}
                </Col>
                <Col lg={8} className='px-0 px-md-3'>
                    <motion.div
                        className='text-center'
                    >
                        <div className="header-container text-white my-auto rounded-bottom shadow-sm">
                            <p className="tittle-heeder">ניהול אתר</p>
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
                                            <Col xs={8} lg={8} className='d-flex justify-content-start mt-0'>
                                                <Nav
                                                    activeKey={activeTab}
                                                    onSelect={(k: any) => {
                                                        setActiveTab(k);
                                                        // if (k === 'dashboard') {
                                                        //     // doApiCard('gmach','');
                                                        // }
                                                        // else if (k === 'shops') {
                                                        //     doApiCard("shops",'');
                                                        //     setActiveSubcategory('')
                                                        // }
                                                        // else if (k === 'mosads') {
                                                        //     doApiCard("mosads",'');
                                                        //     setActiveSubcategory('')
                                                        // }
                                                    }}
                                                    className='justify-content-center'
                                                >
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="dashboard" className={`info-nav-link me-4 ${activeTab === 'shops' ? 'active' : ''}`}>דשבורד</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="forum" className={`info-nav-link me-4 ${activeTab === 'mosads' ? 'active' : ''}`}>פרומוים</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="nadlan" className={`info-nav-link me-4 ${activeTab === 'gmach' ? 'active' : ''}`}>נדלן</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="board" className={`info-nav-link me-4 ${activeTab === 'gmach' ? 'active' : ''}`}>לוח</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="users" className={`info-nav-link me-4 ${activeTab === 'gmach' ? 'active' : ''}`}>משתמשים</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="ads" className={`info-nav-link me-4 ${activeTab === 'gmach' ? 'active' : ''}`}>פרסומות</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="reports" className={`info-nav-link me-4 ${activeTab === 'gmach' ? 'active' : ''}`}>דוחות</Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                            </Col>
                                            <Col xs={4} lg={6} className='d-flex justify-content-end align-items-center'>
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
                                            {/* <CategorySlider
                                                categories={categories}
                                                activeSubcategory={activeSubcategory}
                                                setActiveSubcategory={setActiveSubcategory}
                                                doApi={doApiCard}
                                                activeTab={activeTab}
                                            /> */}
                                        </motion.div>
                                    )}
                                    {activeTab === 'mosads' && (
                                        <motion.div
                                            className="subcategory-container shadow-sm bg-white pb-3 pt-2 rounded-bottom  mx-auto align-items-center"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {/* <CategorySlider
                                                categories={categoriesMosads}
                                                activeSubcategory={activeSubcategory}
                                                setActiveSubcategory={setActiveSubcategory}
                                                doApi={doApiCard}
                                                activeTab={activeTab}
                                            /> */}
                                        </motion.div>
                                    )}
                                    {activeTab === 'gmach' && (
                                        <motion.div
                                            className="subcategory-container shadow-sm bg-white pb-3 pt-2 rounded-bottom  mx-auto align-items-center"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {/* <CategorySlider
                                                categories={categoriesGmachim}
                                                activeSubcategory={activeSubcategory}
                                                setActiveSubcategory={setActiveSubcategory}
                                                doApi={doApiCard}
                                                activeTab={activeTab}
                                            /> */}
                                        </motion.div>
                                    )}

                                </div>

                            </div>
                        </motion.div>
                    </motion.div>
                </Col >
                <Col lg={2} className="d-none d-lg-block ">
                    {/* <div className="ad-container">
                        <div className="ad-space">
                            <img src='/images/timegif.webp' className='rounded' />
                        </div>
                    </div> */}
                </Col>
            </Row >


            <Row className='border rounded mb-4 p-2' style={{ background: '#d2f0e4' }}>
                <Col>
                    {activeTab === 'dashboard' && (
                        <div className="dashboard-content">
                            <Card className="chart-card">
                                <Card.Body>
                                    <Row className="mb-4">
                                        <Col md={2}>
                                            <Card className="stats-card">
                                                <Card.Body>
                                                    <h3>משתמשים</h3>
                                                    <div className="stats-number">{users.length}</div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={2}>
                                            <Card className="stats-card">
                                                <Card.Body>
                                                    <h3>פוסטים</h3>
                                                    {forum && <div className="stats-number">{forum.length}</div>}
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={2}>
                                            <Card className="stats-card">
                                                <Card.Body>
                                                    <h3>נכסים</h3>
                                                    {nadlan && <div className="stats-number">{nadlan.length}</div>}
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={2}>
                                            <Card className="stats-card">
                                                <Card.Body>
                                                    <h3>מודעות</h3>
                                                    {ads && <div className="stats-number">{ads.length}</div>}
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={2}>
                                            <Card className="stats-card">
                                                <Card.Body>
                                                    <h3>דיווחים</h3>
                                                    <div className="stats-number">{stats.totalReports}</div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Line data={dashboardChartData} />
                                </Card.Body>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'forum' && (
                        <Card className="shadow-sm">
                            <Card.Header className="bg-white py-3">
                                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                                    <h3 className="mb-0">ניהול פורום</h3>
                                    <div className="d-flex gap-3">
                                        <Form.Control
                                            type="text"
                                            placeholder="חיפוש..."
                                            className="search-input"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            style={{ width: '250px' }}
                                        />
                                        {/* <Button variant="primary" onClick={() => handleAddPost()}>
                                       <FontAwesomeIcon icon={faPlus} className="me-2" />
                                       הוסף פוסט חדש
                                   </Button> */}
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body className="p-0">
                                {isLoading ? (
                                    <div className="text-center py-5">
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">טוען...</span>
                                        </Spinner>
                                    </div>
                                ) : (
                                    <Table responsive hover className="mb-0">
                                        <thead className="bg-light">
                                            <tr>
                                                <th className="py-3">#</th>
                                                <th className="py-3">כותרת</th>
                                                <th className="py-3">מחבר</th>
                                                <th className="py-3">תאריך</th>
                                                <th className="py-3">קטגוריה</th>
                                                <th className="py-3">סטטוס</th>
                                                <th className="py-3">פעולות</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredPosts
                                                .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
                                                .map((post, index) => (
                                                    <tr key={post.id}>
                                                        <td className="align-middle">{index + 1}</td>
                                                        <td className="align-middle">
                                                            <div className="text-truncate" style={{ maxWidth: '200px' }}>
                                                                {post.title}
                                                            </div>
                                                        </td>
                                                        <td className="align-middle">{post.author}</td>
                                                        <td className="align-middle">
                                                            {new Date(post.date).toLocaleDateString('he-IL')}
                                                        </td>
                                                        <td className="align-middle">
                                                            <Badge bg="info" className="category-badge">
                                                                {post.category}
                                                            </Badge>
                                                        </td>
                                                        <td className="align-middle">
                                                            <Badge
                                                                bg={post.status === 'active' ? 'success' : 'danger'}
                                                                className="status-badge"
                                                            >
                                                                {post.status === 'active' ? 'פעיל' : 'לא פעיל'}
                                                            </Badge>
                                                        </td>
                                                        <td className="align-middle">
                                                            <ButtonGroup size="sm">
                                                                <Button
                                                                    variant="outline-primary"
                                                                    onClick={() => handleEditPost(post.id)}
                                                                    title="ערוך"
                                                                >
                                                                    <FontAwesomeIcon icon={faEdit} />
                                                                </Button>
                                                                <Button
                                                                    variant="outline-danger"
                                                                    onClick={() => handleDeletePost(post.id)}
                                                                    title="מחק"
                                                                >
                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                </Button>
                                                            </ButtonGroup>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </Table>
                                )}
                            </Card.Body>
                            <Card.Footer className="bg-white">
                                <Pagination className="mb-0 justify-content-end">
                                    {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }).map((_, index) => (
                                        <Pagination.Item
                                            key={index + 1}
                                            active={index + 1 === currentPage}
                                            onClick={() => setCurrentPage(index + 1)}
                                        >
                                            {index + 1}
                                        </Pagination.Item>
                                    ))}
                                </Pagination>
                            </Card.Footer>
                        </Card>
                    )}

                    {activeTab === 'nadlan' && (
                        <Card className="">
                            <Card.Body>
                                {/* <div className="d-flex justify-content-between align-items-center mb-4">
                                    <Button variant="primary" onClick={handleAdd}>
                                        <FontAwesomeIcon icon={faPlus} className="me-2" />
                                        הוסף נכס חדש
                                    </Button>
                                </div> */}
                                <div className="nadlan-grid px-0">
                                    {nadlan && nadlan.map((item: any, index: number) => (
                                        <div key={item._id} className='position-relative mt-2'>
                                            <div
                                                className="rounded shadow-sm overflow-hidden transition-all duration-300 p-2"
                                            // whileHover={{ y: -2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                                            >

                                                <div className="">
                                                    {item.images[0] ? (
                                                        <CldImage
                                                            width="400"
                                                            height="200"
                                                            src={item.images[0]}
                                                            crop="fill"
                                                            style={{ objectFit: 'cover', width: '100%', height: '150px' }}
                                                            alt={`תמונה של ${item.address}`}
                                                            loading='lazy'
                                                            format="auto"
                                                            quality="auto"
                                                            className='rounded'
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded" style={{ height: '150px' }}>
                                                            <FontAwesomeIcon icon={faHome} size="2x" className="text-gray-400" />
                                                        </div>
                                                    )}
                                                    {item.tivuch && (
                                                        <Badge bg='white' className="ms-2 text-primary border shadow-sm align-self-start top-0 end-0 translate-middle position-absolute">{`${item.tivuch}`}</Badge>
                                                    )}
                                                </div>
                                                <div className="nadlan-description mt-2 px-3 flex justify-content-between">
                                                    <h3 className='font-bold' style={{ fontSize: '13px' }}>{item.address}</h3>
                                                    {/* <button
                                                    className={`love-btn ${favorites[item._id] ? 'text-danger' : ''}`} // הוספת מחלקת טקסט אדום אם מועדף
                                                    onClick={() => handleFavorite(item._id)} // לוגיקת שמירה
                                                >
                                                    <i className="bi bi-heart"></i>
                                                </button> */}
                                                </div>
                                                <div className="p-3 flex justify-between">
                                                    <div className="flex flex-column text-sm text-gray-600 justify-content-between align-items-start w-50">
                                                        <span className='mb-2'><i className="bi bi-door-closed me-1"></i> {`${item.rooms ? item.rooms : ''} חד'`} </span>
                                                        <span><i className="bi bi-aspect-ratio me-1"></i>{`${item.size ? item.size : ''} מ"ר`}</span>
                                                    </div>
                                                    <div className="flex flex-column text-sm text-gray-600 justify-content-between align-items-start w-50">
                                                        <span className='mb-2'><i className="bi bi-arrows-vertical me-1"></i>קומה {item.floor}</span>
                                                        <span><i className="bi bi-house me-1"></i>{item.condition}</span>
                                                    </div>
                                                </div>
                                                <hr className='w-75 mx-auto' style={{ color: 'gray' }} />
                                                <div className="flex p-3 py-2">
                                                    <div className="nadlan-price w-50">
                                                        <span>{`${item.price.toLocaleString()} ₪`}</span>
                                                    </div>
                                                    <div className='w-50'>
                                                        <button
                                                            className="more-nadlan-info btn rounded border w-full"
                                                        // onClick={() => handleShow(item)}
                                                        >
                                                            למידע נוסף
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>

                                            {(index + 1) % 8 === 0 && (
                                                <motion.div
                                                    className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 bg-white rounded-lg shadow-md overflow-hidden"
                                                    whileHover={{ y: -2, boxShadow: '0 4px 8px rgba(13, 110, 253, 0.08)' }}
                                                >
                                                    <div className="h-48 flex items-center justify-center">
                                                        <img
                                                            src={index % 2 === 0 ? "/images/bookgif.gif" : "/images/timegif.gif"}
                                                            alt="פרסומת"
                                                            className="max-h-full max-w-full object-contain"
                                                        />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    ))
                                    }
                                </div>
                            </Card.Body>
                        </Card>
                    )}

                    {activeTab === 'content' && (
                        <div className="content-grid">
                            <Button variant="primary" className="add-button mb-4" onClick={handleAdd}>
                                <FontAwesomeIcon icon={faPlus} className="me-2" />
                                הוסף פריט חדש
                            </Button>
                            <Row>
                                {content.map((item) => (
                                    <Col key={item.id} lg={4} md={6} className="mb-4">
                                        <Card className="content-item">
                                            <Card.Body>
                                                <div className="item-type">{item.type}</div>
                                                <Card.Title>{item.title}</Card.Title>
                                                <Card.Text>{item.description}</Card.Text>
                                                <div className="item-date">{item.createdAt}</div>
                                                <div className="item-actions">
                                                    <Button variant="light" onClick={() => handleEdit(item)}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>
                                                    <Button variant="light" onClick={() => handleDelete(item.id)}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <Card className="users-card">
                            <Card.Body>
                                <div className="table-responsive">
                                    <Table className="users-table">
                                        <thead>
                                            <tr>
                                                <th>שם</th>
                                                <th>אימייל</th>
                                                <th>תפקיד</th>
                                                <th>פעולות</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user) => (
                                                <tr key={user.id}>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.role}</td>
                                                    <td>
                                                        <Button variant="outline-warning" size="sm" className="me-2">
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </Button>
                                                        <Button variant="outline-danger" size="sm">
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>
                        </Card>
                    )}

                    {activeTab === 'reports' && (
                        <Card className="content-card">
                            <Card.Body>
                                <Card.Title className="card-title">דוחות ותלונות</Card.Title>
                                <p>כאן יוצגו דוחות ותלונות מהמשתמשים.</p>
                            </Card.Body>
                        </Card>
                    )}

                    {activeTab === 'ads' && (
                        <Card className="content-card">
                            <Card.Body>
                                <Card.Title className="card-title">דף ניהול פרסומות</Card.Title>
                                <AdManager />
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalMode === 'edit' ? 'ערוך פריט' : 'הוסף פריט חדש'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>סוג</Form.Label>
                            <Form.Select name="type" defaultValue={currentItem?.type || ''}>
                                <option value="forum">פורום</option>
                                <option value="property">נדל"ן</option>
                                <option value="lostFound">אבידות ומציאות</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>כותרת</Form.Label>
                            <Form.Control type="text" name="title" defaultValue={currentItem?.title || ''} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>תיאור</Form.Label>
                            <Form.Control as="textarea" name="description" rows={3} defaultValue={currentItem?.description || ''} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {modalMode === 'edit' ? 'עדכן' : 'הוסף'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <ToastContainer position="bottom-right" />
        </Container>
    );
}