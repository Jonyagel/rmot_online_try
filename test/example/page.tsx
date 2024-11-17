"use client"
import React, { useEffect, useState } from 'react'
import { Card, Badge, Button, Modal, Form, Row, Col, Container, Carousel, Alert, Nav, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBuilding, faCalendarAlt, faCar, faCloudUploadAlt, faCouch, faElevator, faHome, faPhone, faRulerCombined, faSun, faTimes, faBell, faNewspaper, faMapMarkerAlt, faExclamationTriangle, faBus, faPoll, faMapMarkedAlt, faTools, faStore, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { CldImage, CldUploadButton } from 'next-cloudinary';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import emailjs from '@emailjs/browser';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export const dynamic = 'auto';

interface Event {
    id: number;
    title: string;
    date: string;
    location: string;
    description: string;
}

interface News {
    id: number;
    title: string;
    summary: string;
    content: string;
}

interface Report {
    id: number;
    title: string;
    description: string;
    status: 'פתוח' | 'בטיפול' | 'סגור';
}

interface Survey {
    id: number;
    title: string;
    description: string;
    questions: string[];
}

interface Service {
    id: number;
    name: string;
    category: string;
    contact: string;
}

interface TransportInfo {
    id: number;
    line: string;
    route: string;
    schedule: string;
}

export default function Neighborhood() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<string>('events');
    const [showEventModal, setShowEventModal] = useState<boolean>(false);
    const [showReportModal, setShowReportModal] = useState<boolean>(false);
    const [showSurveyModal, setShowSurveyModal] = useState<boolean>(false);
    const [events, setEvents] = useState<Event[]>([]);
    const [localNews, setLocalNews] = useState<News[]>([]);
    const [reports, setReports] = useState<Report[]>([]);
    const [surveys, setSurveys] = useState<Survey[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [transportInfo, setTransportInfo] = useState<TransportInfo[]>([]);

    useEffect(() => {
        fetchEvents();
        fetchLocalNews();
        fetchReports();
        fetchSurveys();
        fetchServices();
        fetchTransportInfo();
    }, []);

    const fetchEvents = async () => {
        // Simulating API call with sample data
        const sampleEvents: Event[] = [
            { id: 1, title: "פסטיבל אביב", date: "2024-04-15", location: "פארק רמות", description: "חגיגה קהילתית עם מוזיקה, אוכל ופעילויות לכל המשפחה" },
            { id: 2, title: "הרצאה: חינוך במאה ה-21", date: "2024-04-22", location: "מתנ\"ס רמות", description: "הרצאה מרתקת על אתגרי החינוך בעידן הדיגיטלי" },
            { id: 3, title: "יריד ספרים", date: "2024-05-01", location: "כיכר העיר", description: "יריד ספרים שנתי עם מבחר עצום של ספרים במחירים מוזלים" },
        ];
        setEvents(sampleEvents);
    };

    const fetchLocalNews = async () => {
        const sampleNews: News[] = [
            { id: 1, title: "שיפוץ גן השעשועים", summary: "עיריית ירושלים מתחילה בשיפוץ נרחב של גן השעשועים המרכזי ברמות", content: "..." },
            { id: 2, title: "פתיחת מרכז קהילתי חדש", summary: "מרכז קהילתי חדש נפתח ברחוב הרב גולד, מציע פעילויות לכל הגילאים", content: "..." },
        ];
        setLocalNews(sampleNews);
    };

    const fetchReports = async () => {
        const sampleReports: Report[] = [
            { id: 1, title: "בור בכביש", description: "בור גדול ברחוב הרימון פינת התאנה", status: 'פתוח' },
            { id: 2, title: "תאורת רחוב לא תקינה", description: "פנס רחוב מהבהב ברחוב האלון", status: 'בטיפול' },
            { id: 3, title: "גרפיטי על קיר ציבורי", description: "גרפיטי על קיר בית הספר היסודי", status: 'סגור' },
        ];
        setReports(sampleReports);
    };

    const fetchSurveys = async () => {
        const sampleSurveys: Survey[] = [
            { id: 1, title: "סקר שביעות רצון תושבים", description: "נשמח לשמוע את דעתכם על איכות החיים בשכונה", questions: ["מה דעתך על ניקיון הרחובות?", "האם את/ה מרוצה מהשירותים הקהילתיים?"] },
            { id: 2, title: "בחירת נושא להרצאה הבאה", description: "עזרו לנו לבחור את הנושא להרצאה הקהילתית הבאה", questions: ["איזה נושא מעניין אותך יותר?", "באיזה יום ושעה נוח לך להגיע להרצאה?"] },
        ];
        setSurveys(sampleSurveys);
    };

    const fetchServices = async () => {
        const sampleServices: Service[] = [
            { id: 1, name: "מרפאת שיניים ד\"ר כהן", category: "בריאות", contact: "02-5401234" },
            { id: 2, name: "מספרת יופי", category: "טיפוח", contact: "02-5405678" },
            { id: 3, name: "סופר מרקט רמות", category: "מזון", contact: "02-5409876" },
        ];
        setServices(sampleServices);
    };

    const fetchTransportInfo = async () => {
        const sampleTransportInfo: TransportInfo[] = [
            { id: 1, line: "32", route: "רמות - מרכז העיר", schedule: "כל 20 דקות מ-6:00 עד 23:00" },
            { id: 2, line: "67", route: "רמות - הר הצופים", schedule: "כל 30 דקות מ-7:00 עד 22:00" },
        ];
        setTransportInfo(sampleTransportInfo);
    };

    const handleAddEvent = (event: Event) => {
        setEvents([...events, { ...event, id: events.length + 1 }]);
        setShowEventModal(false);
        toast.success("האירוע נוסף בהצלחה!");
    };

    const handleAddReport = (report: Report) => {
        setReports([...reports, { ...report, id: reports.length + 1, status: 'פתוח' }]);
        setShowReportModal(false);
        toast.success("הדיווח התקבל ויטופל בהקדם!");
    };

    const handleAddSurvey = (survey: Survey) => {
        setSurveys([...surveys, { ...survey, id: surveys.length + 1 }]);
        setShowSurveyModal(false);
        toast.success("הסקר נוצר בהצלחה!");
    };

    return (
        <Container fluid className="py-5">
            <h1 className="text-center mb-5 text-primary">ברוכים הבאים לשכונת רמות</h1>

            <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k as string)}>
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="events">אירועים קהילתיים</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="news">חדשות מקומיות</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="reports">דיווח על מפגעים</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="surveys">סקרים ומשובים</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="map">מפת השכונה</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="services">שירותים מקומיים</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="transport">תחבורה ציבורית</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="events">
                                <h2 className="mb-4">אירועים קהילתיים</h2>
                                <Button variant="primary" className="mb-3" onClick={() => setShowEventModal(true)}>
                                    <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                                    הוסף אירוע חדש
                                </Button>
                                <Row>
                                    {events.map((event, index) => (
                                        <Col md={4} key={index} className="mb-4">
                                            <Card className='shadow-sm hover-card h-100'>
                                                <Card.Body>
                                                    <Card.Title>{event.title}</Card.Title>
                                                    <Card.Text>
                                                        <FontAwesomeIcon icon={faCalendarAlt} className="me-2 text-primary" /> {event.date}
                                                        <br />
                                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-primary" /> {event.location}
                                                    </Card.Text>
                                                    <Button variant="outline-primary">פרטים נוספים</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Tab.Pane>

                            <Tab.Pane eventKey="news">
                                <h2 className="mb-4">חדשות מקומיות</h2>
                                <Row>
                                    {localNews.map((news, index) => (
                                        <Col md={6} key={index} className="mb-4">
                                            <Card className='shadow-sm hover-card h-100'>
                                                <Card.Body>
                                                    <Card.Title>{news.title}</Card.Title>
                                                    <Card.Text>{news.summary}</Card.Text>
                                                    <Button variant="outline-primary">קרא עוד</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Tab.Pane>

                            <Tab.Pane eventKey="reports">
                                <h2 className="mb-4">דיווח על מפגעים</h2>
                                <Button variant="warning" className="mb-3" onClick={() => setShowReportModal(true)}>
                                    <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
                                    דווח על מפגע
                                </Button>
                                <Row>
                                    {reports.map((report, index) => (
                                        <Col md={4} key={index} className="mb-4">
                                            <Card className='shadow-sm hover-card h-100'>
                                                <Card.Body>
                                                    <Card.Title>{report.title}</Card.Title>
                                                    <Card.Text>{report.description}</Card.Text>
                                                    <Badge bg={report.status === 'פתוח' ? 'danger' : report.status === 'בטיפול' ? 'warning' : 'success'}>
                                                        {report.status}
                                                    </Badge>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Tab.Pane>

                            <Tab.Pane eventKey="surveys">
                                <h2 className="mb-4">סקרים ומשובים</h2>
                                <Button variant="info" className="mb-3" onClick={() => setShowSurveyModal(true)}>
                                    <FontAwesomeIcon icon={faPoll} className="me-2" />
                                    צור סקר חדש
                                </Button>
                                <Row>
                                    {surveys.map((survey, index) => (
                                        <Col md={6} key={index} className="mb-4">
                                            <Card className='shadow-sm hover-card h-100'>
                                                <Card.Body>
                                                    <Card.Title>{survey.title}</Card.Title>
                                                    <Card.Text>{survey.description}</Card.Text>
                                                    <Button variant="outline-info">השתתף בסקר</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Tab.Pane>

                            {/* <Tab.Pane eventKey="map">
                                <h2 className="mb-4">מפת השכונה</h2>
                                <div style={{ height: '400px', width: '100%' }}>
                                    <MapContainer center={[31.8020, 35.2140]} zoom={14} style={{ height: '100%', width: '100%' }}>
                                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                        Add markers for important locations
                                    </MapContainer>
                                </div>
                            </Tab.Pane> */}

                            <Tab.Pane eventKey="services">
                                <h2 className="mb-4">שירותים מקומיים</h2>
                                <Row>
                                    {services.map((service, index) => (
                                        <Col md={4} key={index} className="mb-4">
                                            <Card className='shadow-sm hover-card h-100'>
                                                <Card.Body>
                                                    <Card.Title>{service.name}</Card.Title>
                                                    <Card.Text>
                                                        <Badge bg="secondary" className="me-2">{service.category}</Badge>
                                                        <br />
                                                        <FontAwesomeIcon icon={faPhone} className="me-2" /> {service.contact}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Tab.Pane>

                            <Tab.Pane eventKey="transport">
                                <h2 className="mb-4">תחבורה ציבורית</h2>
                                <Row>
                                    {transportInfo.map((info, index) => (
                                        <Col md={6} key={index} className="mb-4">
                                            <Card className='shadow-sm hover-card h-100'>
                                                <Card.Body>
                                                    <Card.Title>קו {info.line}</Card.Title>
                                                    <Card.Text>
                                                        <strong>מסלול:</strong> {info.route}<br />
                                                        <strong>לוח זמנים:</strong> {info.schedule}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

            {/* Modals */}
            <Modal show={showEventModal} onHide={() => setShowEventModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>הוסף אירוע חדש</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target as HTMLFormElement);
                        handleAddEvent({
                            id: 0, // Will be set in handleAddEvent
                            title: formData.get('title') as string,
                            date: formData.get('date') as string,
                            location: formData.get('location') as string,
                            description: formData.get('description') as string,
                        });
                    }}>
                        <Form.Group className="mb-3">
                            <Form.Label>כותרת האירוע</Form.Label>
                            <Form.Control type="text" name="title" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>תאריך</Form.Label>
                            <Form.Control type="date" name="date" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>מיקום</Form.Label>
                            <Form.Control type="text" name="location" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>תיאור</Form.Label>
                            <Form.Control as="textarea" name="description" rows={3} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            הוסף אירוע
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}