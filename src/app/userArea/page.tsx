"use client"

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Alert, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUser, faEnvelope, faCalendarAlt, faBed, faRulerCombined, faBuilding, faCar, faMapMarkerAlt, faClock, faComments, faHome, faSignOutAlt, faHeart } from '@fortawesome/free-solid-svg-icons';
import { CldImage } from 'next-cloudinary';
import { motion, AnimatePresence } from 'framer-motion';
import './userArea.css';
import { signOut, useSession } from 'next-auth/react';

interface UserPost {
    id: string;
    type: string;
    title: string;
    content: string;
    date: string;
    price: number;
    address: string;
    image?: string;
    rooms?: number;
    size?: number;
    floor?: number;
    parking?: boolean;
}
interface nadlanPost {
    id: string;
    type: string;
    title: string;
    content: string;
    date: string;
    price: number;
    address: string;
    images?: [string];
    rooms?: number;
    size?: number;
    floor?: number;
    parking?: boolean;
}
interface ForumPost {
    _id: string;
    description: string;
    tittle: string;
    topic: string;
    date: string;
    numOfComments: number;
    createdAt: string;
}

interface User {
    _id?: string;
    name: string | null | undefined;
    email: string | null | undefined;
    createdAt?: string;
    avatar?: string;
    image?: string | null | undefined;
}

export default function UserArea() {
    const { data: session } = useSession();
    const [user, setUser] = useState<User | null>(null);
    const [NadlanPosts, setNadlanPosts] = useState<nadlanPost[]>([]);
    const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentEdit, setCurrentEdit] = useState<UserPost | null>(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [activeTab, setActiveTab] = useState('nadlan');

    useEffect(() => {
        fetchUserData();
        // fetchNadlanPosts();
    }, []);

    const fetchUserData = async () => {
        if (!session) {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users`;
            const resp = await fetch(url, { cache: 'no-store' });
            const data = await resp.json();
            console.log(data);
            setUser(data);
            fetchNadlanPosts(data);
            fetchForumPosts(data);
        }
        else if (session && session.user) {
            const userData: User = {
                name: session.user.name ?? '',
                email: session.user.email ?? '',
                image: session.user.image ?? undefined,
            };
            setUser(userData);
            fetchNadlanPosts(userData);
            fetchForumPosts(userData);
        }
    };

    const fetchNadlanPosts = async (user: any) => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/userArea/${user._id}`;
        const resp = await fetch(url, { cache: 'no-store' });
        const data = await resp.json();
        console.log(data.data);
        setNadlanPosts(data.data);
    };

    const fetchForumPosts = async (user: any) => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/forum/userAreaForum/${user._id}`;
        const resp = await fetch(url, { cache: 'no-store' });
        const data = await resp.json();
        console.log(data.data);
        setForumPosts(data.data);
    };

    const handleEdit = (post: UserPost) => {
        setCurrentEdit(post);
        setShowEditModal(true);
    };

    const handleDelete = async (postId: string) => {
        setNadlanPosts(NadlanPosts.filter(post => post.id !== postId));
        setAlertMessage('הפוסט נמחק בהצלחה');
    };

    const handleUpdatePost = async (updatedPost: UserPost) => {
        setNadlanPosts(NadlanPosts.map(post => post.id === updatedPost.id ? updatedPost : post));
        setShowEditModal(false);
        setAlertMessage('הפוסט עודכן בהצלחה');
    };
    const handleEditForum = (post: ForumPost) => {
        // Implement forum post editing logic
        console.log("Editing forum post:", post);
        // You might want to open a modal or navigate to an edit page
    };

    const handleDeleteForum = async (postId: string) => {
        // Implement forum post deletion logic
        console.log("Deleting forum post:", postId);
        // You should call an API to delete the post, then update the state
        setForumPosts(forumPosts.filter(post => post._id !== postId));
        setAlertMessage('הפורום נמחק בהצלחה');
    };

    return (
        <Container fluid className="user-area-container py-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <AnimatePresence>
                        {alertMessage && (
                            <motion.div
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                className="alert-container"
                            >
                                <Alert variant="success" onClose={() => setAlertMessage('')} dismissible>
                                    {alertMessage}
                                </Alert>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {user && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="user-profile-card mb-5">
                                <Card.Body>
                                    <Row className="align-items-center">
                                        <Col md={4} className="text-center mb-3 mb-md-0">
                                            <div className="avatar-container mx-auto">
                                                {user.image ? (
                                                    <img src={user.image} alt="user image" className="img-fluid rounded-circle" />
                                                ) : (
                                                    <div className="avatar-placeholder rounded-circle">
                                                        <FontAwesomeIcon icon={faUser} />
                                                    </div>
                                                )}
                                            </div>
                                        </Col>
                                        <Col md={8}>
                                            <h2 className="user-name mb-3">{user.name}</h2>
                                            <div className="user-info mb-3">
                                                <p className="mb-2"><FontAwesomeIcon icon={faEnvelope} className="me-2" /> {user.email}</p>
                                                <p className="mb-0"><FontAwesomeIcon icon={faCalendarAlt} className="me-2" /> הצטרף/ה בתאריך: {
                                                    user.createdAt ? new Date(user.createdAt).toLocaleDateString('he-IL') : 'אין תאריך'
                                                }</p>
                                            </div>
                                            <div className="d-flex flex-wrap">
                                                <Button variant="outline-primary" className="me-2 mb-2">
                                                    <FontAwesomeIcon icon={faEdit} className="me-2" /> ערוך פרופיל
                                                </Button>
                                                <Button variant="outline-dark" className="mb-2" onClick={() => signOut()}>
                                                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> התנתק מחשבון
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </motion.div>
                    )}

                    <Nav variant="pills" className="user-posts-nav mb-4 justify-content-center">
                        <Nav.Item>
                            <Nav.Link
                                active={activeTab === 'nadlan'}
                                onClick={() => setActiveTab('nadlan')}
                            >
                                <FontAwesomeIcon icon={faHome} className="me-2" /> פוסטים של נדל"ן
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                active={activeTab === 'forum'}
                                onClick={() => setActiveTab('forum')}
                            >
                                <FontAwesomeIcon icon={faComments} className="me-2" /> פוסטים בפורום
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <div className="user-posts-grid">
                        {activeTab === 'nadlan' ? (
                            NadlanPosts.length > 0 ? (
                                NadlanPosts.map((post, index) => (
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="nadlan-card"
                                    >
                                        <div className="nadlan-card-image">
                                            {post.images ? (
                                                <CldImage
                                                    src={post.images[0]}
                                                    width="400"
                                                    height="200"
                                                    crop="fill"
                                                    alt={post.title}
                                                />
                                            ) : (
                                                <div className="nadlan-image-placeholder">
                                                    <FontAwesomeIcon icon={faHome} size="2x" className="text-gray-400" />
                                                </div>
                                            )}
                                            <button className="favorite-button">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </button>
                                            <div className="nadlan-type-badge">{post.type === 'sale' ? 'למכירה' : 'להשכרה'}</div>
                                        </div>
                                        <div className="nadlan-card-content">
                                            <h3 className="nadlan-address">{post.address}</h3>
                                            <div className="nadlan-details">
                                                <span><FontAwesomeIcon icon={faBed} /> {post.rooms} חד'</span>
                                                <span><FontAwesomeIcon icon={faRulerCombined} /> {post.size} מ"ר</span>
                                                <span><FontAwesomeIcon icon={faBuilding} /> קומה {post.floor}</span>
                                            </div>
                                            <div className="nadlan-price">{post.price.toLocaleString()} ₪</div>
                                            <div className="nadlan-actions">
                                                <button className="edit-button" onClick={() => handleEdit(post)}>
                                                    <FontAwesomeIcon icon={faEdit} /> ערוך
                                                </button>
                                                <button className="delete-button" onClick={() => handleDelete(post.id)}>
                                                    <FontAwesomeIcon icon={faTrash} /> מחק
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-center">אין פוסטים להצגה</p>
                            )
                        ) : (
                            forumPosts.length > 0 ? (
                                forumPosts.map((post, index) => (
                                    <motion.div
                                        key={post._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Card className="user-post-card h-100">
                                            <Card.Header className={`post-type-${post.topic}`}>
                                                <FontAwesomeIcon icon={post.topic === 'nadlan' ? faHome : faComments} /> {post.topic}
                                            </Card.Header>
                                            <Card.Body>
                                                <Card.Title>{post.tittle}</Card.Title>

                                                <Card.Text>{post.description}</Card.Text>

                                            </Card.Body>
                                            <Card.Footer>
                                                <Button variant="outline-primary" className="me-2">
                                                    <FontAwesomeIcon icon={faEdit} /> ערוך
                                                </Button>
                                                <Button variant="outline-danger" onClick={() => handleDelete(post._id)}>
                                                    <FontAwesomeIcon icon={faTrash} /> מחק
                                                </Button>
                                            </Card.Footer>
                                        </Card>
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-center">אין פוסטים בפורום להצגה</p>
                            )
                        )}
                    </div>

                    <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered className="edit-post-modal">
                        <Modal.Header closeButton>
                            <Modal.Title>ערוך פוסט</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {currentEdit && (
                                <Form onSubmit={(e) => {
                                    e.preventDefault();
                                    if (currentEdit) handleUpdatePost(currentEdit);
                                }}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>כותרת</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={currentEdit.title}
                                            onChange={(e) => setCurrentEdit({ ...currentEdit, title: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>תוכן</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            value={currentEdit.content}
                                            onChange={(e) => setCurrentEdit({ ...currentEdit, content: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        עדכן
                                    </Button>
                                </Form>
                            )}
                        </Modal.Body>
                    </Modal>
                </Col>
            </Row>
        </Container>
    );
}