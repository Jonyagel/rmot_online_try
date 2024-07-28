"use client"
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Tabs, Tab, Modal, ListGroup } from 'react-bootstrap';
import { CldImage } from 'next-cloudinary';

const FamilyPage = () => {

    interface PrayerTimes {
        shacharit: string;
        mincha: string;
        arvit: string;
    }

    interface Synagogue {
        name: string;
        address: string;
        prayerTimes: PrayerTimes;
    }

    const [showAnswer, setShowAnswer] = useState(false);
    const [showSynagogueModal, setShowSynagogueModal] = useState(false);
    const [selectedSynagogue, setSelectedSynagogue] = useState<Synagogue | null>(null);

    const toggleAnswer = () => setShowAnswer(!showAnswer);

    const synagogues = [
        {
            name: "בית הכנסת הגדול",
            address: "רחוב הרצל 1",
            prayerTimes: {
                shacharit: "06:30",
                mincha: "13:30",
                arvit: "19:00"
            }
        },
        {
            name: "בית כנסת אוהל יצחק",
            address: "רחוב בן גוריון 15",
            prayerTimes: {
                shacharit: "07:00",
                mincha: "13:45",
                arvit: "19:15"
            }
        },
        {
            name: "בית כנסת שערי רחמים",
            address: "רחוב ויצמן 8",
            prayerTimes: {
                shacharit: "06:45",
                mincha: "13:15",
                arvit: "18:45"
            }
        }
    ];

    const handleSynagogueClick = (synagogue: any) => {
        setSelectedSynagogue(synagogue);
        setShowSynagogueModal(true);
    };

    return (
        <Container className="my-5">
            <h1 className="text-center mb-5 display-4">לכל המשפחה</h1>

            <Tabs defaultActiveKey="activities" id="family-tabs" className="mb-4">
                <Tab eventKey="activities" title="פעילויות משפחתיות">
                    <Row>
                        <Col md={6} className="mb-4">
                            <Card className="h-100 shadow-sm">
                                <Card.Header as="h3" className="bg-primary text-white">חידה שבועית</Card.Header>
                                <Card.Body>
                                    <Card.Title>מה הולך על ארבע בבוקר, על שתיים בצהריים, ועל שלוש בערב?</Card.Title>
                                    <Button variant="outline-primary" onClick={toggleAnswer} className="mt-3">
                                        {showAnswer ? 'הסתר תשובה' : 'הצג תשובה'}
                                    </Button>
                                    {showAnswer && (
                                        <Card.Text className="mt-3 alert alert-success">
                                            התשובה: האדם. בילדותו הוא זוחל על ארבע, כמבוגר הוא הולך על שתיים, ובזקנתו נעזר במקל (שלוש).
                                        </Card.Text>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} className="mb-4">
                            <Card className="h-100 shadow-sm">
                                <Card.Header as="h3" className="bg-success text-white">תשבץ משפחתי</Card.Header>
                                <Card.Body>
                                    <p>השבוע: תשבץ בנושא חגי ישראל</p>
                                    {/* כאן תוכל להוסיף תשבץ אינטראקטיבי או תמונה של תשבץ */}
                                    <Button variant="success">התחל לפתור</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Tab>

                <Tab eventKey="stories" title="סיפורים וערכים">
                    <Card className="shadow-sm mb-4">
                        <Card.Header as="h3" className="bg-info text-white">סיפור לשבת</Card.Header>
                        <Card.Body>
                            <h4>מעשה בחסיד</h4>
                            <p>
                                מעשה בחסיד אחד שהיה רגיל לומר תהילים בכל יום. פעם אחת...
                                {/* המשך הסיפור כאן */}
                            </p>
                            <Button variant="info">קרא עוד</Button>
                        </Card.Body>
                    </Card>

                    <Card className="shadow-sm">
                        <Card.Header as="h3" className="bg-warning text-dark">טיפ יומי</Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <p>"אל תדון את חברך עד שתגיע למקומו"</p>
                                <footer className="blockquote-footer">פרקי אבות</footer>
                            </blockquote>
                        </Card.Body>
                    </Card>
                </Tab>

                <Tab eventKey="community" title="קהילה ומידע">
                    <Row>
                        <Col md={6} className="mb-4">
                            <Card className="shadow-sm h-100">
                                <Card.Header as="h3" className="bg-danger text-white">זמני שבת</Card.Header>
                                <Card.Body>
                                    <p><strong>כניסת השבת:</strong> 18:30</p>
                                    <p><strong>יציאת השבת:</strong> 19:45</p>
                                    <small className="text-muted">* הזמנים לפי אזור המרכז</small>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} className="mb-4">
                            <Card className="shadow-sm h-100">
                                <Card.Header as="h3" className="bg-secondary text-white">בתי כנסת באזור</Card.Header>
                                <Card.Body>
                                    <ListGroup>
                                        {synagogues.map((synagogue, index) => (
                                            <ListGroup.Item
                                                key={index}
                                                action
                                                onClick={() => handleSynagogueClick(synagogue)}
                                                className="d-flex justify-content-between align-items-center"
                                            >
                                                <span>🕍 {synagogue.name}</span>
                                                <Button variant="outline-primary" size="sm">זמני תפילות</Button>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Tab>
            </Tabs>

            <Card className="mt-4 shadow">
                <Card.Header as="h3" className="bg-dark text-white">תמונה מהפרשה</Card.Header>
                <Card.Body className="text-center">
                    <CldImage
                        src="url_to_your_image" // החלף זאת עם ה-public ID של התמונה שלך בCloudinary
                        width="400"
                        height="300"
                        alt="תמונה מפרשת השבוע"
                        className="img-fluid rounded"
                    />
                </Card.Body>
            </Card>

            <Modal show={showSynagogueModal} onHide={() => setShowSynagogueModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedSynagogue?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>כתובת:</strong> {selectedSynagogue?.address}</p>
                    <h5>זמני תפילות:</h5>
                    <ul>
                        <li><strong>שחרית:</strong> {selectedSynagogue?.prayerTimes.shacharit}</li>
                        <li><strong>מנחה:</strong> {selectedSynagogue?.prayerTimes.mincha}</li>
                        <li><strong>ערבית:</strong> {selectedSynagogue?.prayerTimes.arvit}</li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowSynagogueModal(false)}>
                        סגור
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default FamilyPage;