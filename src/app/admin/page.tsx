"use client"
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Nav, Tab, Alert, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faUsers, faHome, faComments, faSearch, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import './admin.css'

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

export default function AdminDashboard() {
    const [content, setContent] = useState<ContentItem[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [currentItem, setCurrentItem] = useState<ContentItem | null>(null);
    const [modalMode, setModalMode] = useState<'edit' | 'add'>('add');
    const [activeTab, setActiveTab] = useState('content');
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        checkAdminStatus();
    }, []);

    const checkAdminStatus = async() => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin`;
        const resp = await fetch(url);
        const data = await resp.json();
            try {

                if (data.role === 'admin') {
                    setIsAdmin(true);
                    fetchContent();
                    fetchUsers();
                } else {
                    router.push('/unauthorized');
                }
            } catch (error) {
                console.error('Invalid token:', error);
                router.push('/api/auth/signin');
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
        <Container fluid className="admin-dashboard">
            <h1 className="dashboard-title">לוח בקרה למנהל</h1>
            <Tab.Container id="admin-tabs" defaultActiveKey="content">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column side-nav">
                            <Nav.Item>
                                <Nav.Link eventKey="content" className="nav-link">
                                    <FontAwesomeIcon icon={faHome} className="me-2" />
                                    ניהול תוכן
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="users" className="nav-link">
                                    <FontAwesomeIcon icon={faUsers} className="me-2" />
                                    ניהול משתמשים
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="reports" className="nav-link">
                                    <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
                                    דוחות ותלונות
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="content">
                                <Card className="content-card">
                                    <Card.Body>
                                        <Card.Title className="card-title">ניהול תוכן</Card.Title>
                                        <Button variant="primary" className="add-button mb-3" onClick={handleAdd}>
                                            <FontAwesomeIcon icon={faPlus} className="me-2" />
                                            הוסף פריט חדש
                                        </Button>
                                        <Row>
                                            {content.map((item) => (
                                                <Col key={item.id} md={4} className="mb-3">
                                                    <Card className="item-card">
                                                        <Card.Body>
                                                            <Card.Title>{item.title}</Card.Title>
                                                            <Card.Text>{item.description}</Card.Text>
                                                            <Card.Subtitle className="mb-2 text-muted">{item.type}</Card.Subtitle>
                                                            <Card.Text>נוצר ב: {item.createdAt}</Card.Text>
                                                            <div className="card-actions">
                                                                <Button variant="outline-warning" className="me-2" onClick={() => handleEdit(item)}>
                                                                    <FontAwesomeIcon icon={faEdit} className="me-1" />
                                                                    ערוך
                                                                </Button>
                                                                <Button variant="outline-danger" onClick={() => handleDelete(item.id)}>
                                                                    <FontAwesomeIcon icon={faTrash} className="me-1" />
                                                                    מחק
                                                                </Button>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                            <Tab.Pane eventKey="users">
                                <Card className="content-card">
                                    <Card.Body>
                                        <Card.Title className="card-title">ניהול משתמשים</Card.Title>
                                        <Table striped bordered hover className="users-table">
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
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                            <Tab.Pane eventKey="reports">
                                <Card className="content-card">
                                    <Card.Body>
                                        <Card.Title className="card-title">דוחות ותלונות</Card.Title>
                                        <p>כאן יוצגו דוחות ותלונות מהמשתמשים.</p>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

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