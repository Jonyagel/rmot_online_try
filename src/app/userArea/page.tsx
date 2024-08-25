
"use client"

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUser, faEnvelope, faCalendarAlt, faBed, faRulerCombined, faBuilding, faCar, faMapMarkerAlt, faClock, faComments, faHome } from '@fortawesome/free-solid-svg-icons';
import { CldImage } from 'next-cloudinary';
import { motion, AnimatePresence } from 'framer-motion';
import './userArea.css';

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
    image?: string;
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
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    avatar?: string;
}

export default function UserArea() {
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
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users`;
        const resp = await fetch(url, { cache: 'no-store' });
        const data = await resp.json();
        console.log(data);
        setUser(data);
        fetchNadlanPosts(data);
        fetchForumPosts(data);
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
        <Container fluid className="user-area-container">
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
                    <Card className="user-profile-card">
                        <Card.Body>
                            <Row className="align-items-center">
                                <Col md={4} className="text-center">
                                    <div className="avatar-container">
                                        {user.avatar ? (
                                            <CldImage
                                                src={user.avatar}
                                                width="200"
                                                height="200"
                                                crop="fill"
                                                alt="תמונת פרופיל"
                                                className="user-avatar"
                                            />
                                        ) : (
                                            <div className="avatar-placeholder">
                                                <FontAwesomeIcon icon={faUser} />
                                            </div>
                                        )}
                                    </div>
                                </Col>
                                <Col md={8}>
                                    <h2 className="user-name">{user.name}</h2>
                                    <div className="user-info">
                                        <p><FontAwesomeIcon icon={faEnvelope} /> {user.email}</p>
                                        <p><FontAwesomeIcon icon={faCalendarAlt} /> הצטרף/ה בתאריך: {new Date(user.createdAt).toLocaleDateString('he-IL')}</p>
                                    </div>
                                    <Button variant="outline-primary" className="mt-3">
                                        <FontAwesomeIcon icon={faEdit} /> ערוך פרופיל
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </motion.div>
            )}

            <div className="user-posts-nav">
                <Button
                    variant={activeTab === 'nadlan' ? 'primary' : 'light'}
                    onClick={() => setActiveTab('nadlan')}
                >
                    פוסטים של נדל"ן
                </Button>
                <Button
                    variant={activeTab === 'forum' ? 'primary' : 'light'}
                    onClick={() => setActiveTab('forum')}
                >
                    פוסטים בפורום
                </Button>
            </div>

            {activeTab === 'nadlan' && (
                <>
                    <h3 className="user-posts-title">הפוסטים שלי בנדל"ן</h3>
                    <div className="user-posts-grid">
                        {NadlanPosts ? NadlanPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="user-post-card">
                                    <Card.Header className={`post-type-${post.type}`}>
                                        {post.type}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>{post.title}</Card.Title>
                                        {post.image && (
                                            <div className="post-image-container">
                                                <CldImage
                                                    src={post.image}
                                                    width="300"
                                                    height="200"
                                                    crop="fill"
                                                    alt={post.title}
                                                    className="post-image"
                                                />
                                            </div>
                                        )}
                                        <Card.Text>{post.content}</Card.Text>
                                        {post.type && (
                                            <div className="nadlan-info">
                                                <div><FontAwesomeIcon icon={faBed} /> {post.rooms} חדרים</div>
                                                <div><FontAwesomeIcon icon={faRulerCombined} /> {post.size} מ"ר</div>
                                                <div><FontAwesomeIcon icon={faBuilding} /> קומה {post.floor}</div>
                                                <div><FontAwesomeIcon icon={faCar} /> {post.parking ? 'חניה' : 'ללא חניה'}</div>
                                            </div>
                                        )}
                                        <div className="post-meta">
                                            <span><FontAwesomeIcon icon={faMapMarkerAlt} /> {post.address}</span>
                                            <span><FontAwesomeIcon icon={faClock} /> {post.date.substring(0, 10)}</span>
                                        </div>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="outline-primary" onClick={() => handleEdit(post)} className="me-2">
                                            <FontAwesomeIcon icon={faEdit} /> ערוך
                                        </Button>
                                        <Button variant="outline-danger" onClick={() => handleDelete(post.id)}>
                                            <FontAwesomeIcon icon={faTrash} /> מחק
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </motion.div>
                        )) :
                            (<div></div>)}
                    </div>
                </>
            )}
            {activeTab === 'forum' && (
                <>
                    <h3 className="user-posts-title">הפוסטים שלי בפורום</h3>
                    <div className="user-posts-grid">
                        {forumPosts && forumPosts.map((post, index) => (
                            <motion.div
                                key={post._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="user-post-card">
                                    <Card.Header className={`post-type-${post.topic}`}>
                                        <FontAwesomeIcon icon={post.topic === 'nadlan' ? faHome : faComments} /> {post.topic}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>{post.tittle}</Card.Title>
                                        <Card.Text>{post.description}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="outline-primary" onClick={() => handleEdit(post)} className="me-2">
                                            <FontAwesomeIcon icon={faEdit} /> ערוך
                                        </Button>
                                        <Button variant="outline-danger" onClick={() => handleDelete(post._id)}>
                                            <FontAwesomeIcon icon={faTrash} /> מחק
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </>
            )}
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
        </Container>
    );
}
