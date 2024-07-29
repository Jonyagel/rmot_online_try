"use client"
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Tabs, Tab, Modal, ListGroup } from 'react-bootstrap';
import { CldImage } from 'next-cloudinary';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faSynagogue, faClock, faPuzzlePiece, faLightbulb, faCalendarAlt, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';



const FamilyPage = () => {
    const colors = {
        primary: '#3498db',
        secondary: '#2ecc71',
        accent: '#e74c3c',
        background: '#f8f9fa',
        text: '#333333'
    };

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

    const WeeklyTrivia = () => {
        const [question, setQuestion] = useState("מי היה הכהן הגדול הראשון?");
        const [options, setOptions] = useState(["משה", "אהרון", "יהושע", "שמואל"]);

        return (
            <Card className="custom-card">
                <Card.Header as="h3" className="card-header-custom">
                    <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" /> טריוויה שבועית
                </Card.Header>
                <Card.Body>
                    <p>{question}</p>
                    {options.map((option, index) => (
                        <Button key={index} variant="outline-secondary" className="m-1">{option}</Button>
                    ))}
                </Card.Body>
            </Card>
        );
    };

    const HebrewCalendar = () => {
        // Implement Hebrew calendar logic here
        return (
            <Card className="custom-card">
                <Card.Header as="h3" className="card-header-custom">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> לוח שנה עברי
                </Card.Header>
                <Card.Body>
                    {/* Display Hebrew date, upcoming holidays, etc. */}
                </Card.Body>
            </Card>
        );
    };

    const DailyLearning = () => {
        const [verse, setVerse] = useState("בראשית ברא אלוהים את השמים ואת הארץ");

        return (
            <Card className="custom-card">
                <Card.Header as="h3" className="card-header-custom">
                    <FontAwesomeIcon icon={faBook} className="mr-2" /> פינת לימוד יומית
                </Card.Header>
                <Card.Body>
                    <blockquote className="blockquote">
                        <p>{verse}</p>
                    </blockquote>
                    <Button variant="outline-primary">דיון משפחתי</Button>
                </Card.Body>
            </Card>
        );
    };

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
            <style jsx global>{`
                body {
                    font-family: 'Heebo', sans-serif;
                    background-image: url('path_to_subtle_pattern.png');
                    background-repeat: repeat;
                    color: ${colors.text};
                }
                h1 { font-size: 2.5rem; font-weight: 700; }
                h2 { font-size: 2rem; font-weight: 600; }
                h3 { font-size: 1.75rem; font-weight: 600; }
                p { font-size: 1rem; line-height: 1.6; }
                .custom-card {
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    transition: transform 0.3s ease-in-out;
                }
                .custom-card:hover {
                    transform: translateY(-5px);
                }
                .card-header-custom {
                    background: linear-gradient(45deg, ${colors.primary}, ${colors.secondary});
                    color: white;
                }
                .nav-tabs .nav-link {
                    border: none;
                    color: ${colors.text};
                    font-weight: 600;
                    padding: 10px 20px;
                }
                .nav-tabs .nav-link.active {
                    color: ${colors.primary};
                    border-bottom: 3px solid ${colors.primary};
                }
                .modal-content {
                    border-radius: 15px;
                    overflow: hidden;
                }
                .modal-header {
                    background: linear-gradient(45deg, ${colors.primary}, ${colors.secondary});
                    color: white;
                }
                .grid-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 20px;
                }
                @media (max-width: 768px) {
                    .grid-container {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>

            <h1 className="text-center mb-5 display-4">לכל המשפחה</h1>

            <Tabs defaultActiveKey="activities" id="family-tabs" className="mb-4">
                <Tab eventKey="activities" title={<><FontAwesomeIcon icon={faPuzzlePiece} className="mr-2" /> פעילויות משפחתיות</>}>
                    <div className="grid-container">
                        <HebrewCalendar />
                        <DailyLearning />
                        <WeeklyTrivia />
                        <Card className="custom-card">
                            <Card.Header as="h3" className="card-header-custom">
                                <FontAwesomeIcon icon={faLightbulb} className="mr-2" /> חידה שבועית
                            </Card.Header>
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
                        <Card className="custom-card">
                            <Card.Header as="h3" className="card-header-custom">
                                <FontAwesomeIcon icon={faPuzzlePiece} className="mr-2" /> תשבץ משפחתי
                            </Card.Header>
                            <Card.Body>
                                <p>השבוע: תשבץ בנושא חגי ישראל</p>
                                <Button variant="success">התחל לפתור</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </Tab>

                <Tab eventKey="stories" title={<><FontAwesomeIcon icon={faBook} className="mr-2" /> סיפורים וערכים</>}>
                    <div className="grid-container">
                        <Card className="custom-card">
                            <Card.Header as="h3" className="card-header-custom">
                                <FontAwesomeIcon icon={faBook} className="mr-2" /> סיפור לשבת
                            </Card.Header>
                            <Card.Body>
                                <h4>מעשה בחסיד</h4>
                                <p>
                                    מעשה בחסיד אחד שהיה רגיל לומר תהילים בכל יום. פעם אחת...
                                    {/* המשך הסיפור כאן */}
                                </p>
                                <Button variant="info">קרא עוד</Button>
                            </Card.Body>
                        </Card>
                        <Card className="custom-card">
                            <Card.Header as="h3" className="card-header-custom">
                                <FontAwesomeIcon icon={faLightbulb} className="mr-2" /> טיפ יומי
                            </Card.Header>
                            <Card.Body>
                                <blockquote className="blockquote mb-0">
                                    <p>"אל תדון את חברך עד שתגיע למקומו"</p>
                                    <footer className="blockquote-footer">פרקי אבות</footer>
                                </blockquote>
                            </Card.Body>
                        </Card>
                    </div>
                </Tab>

                <Tab eventKey="community" title={<><FontAwesomeIcon icon={faSynagogue} className="mr-2" /> קהילה ומידע</>}>
                    <div className="grid-container">
                        <Card className="custom-card">
                            <Card.Header as="h3" className="card-header-custom">
                                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> זמני שבת
                            </Card.Header>
                            <Card.Body>
                                <p><strong>כניסת השבת:</strong> 18:30</p>
                                <p><strong>יציאת השבת:</strong> 19:45</p>
                                <small className="text-muted">* הזמנים לפי אזור המרכז</small>
                            </Card.Body>
                        </Card>
                        <Card className="custom-card">
                            <Card.Header as="h3" className="card-header-custom">
                                <FontAwesomeIcon icon={faSynagogue} className="mr-2" /> בתי כנסת באזור
                            </Card.Header>
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
                    </div>
                </Tab>
            </Tabs>

            <Card className="mt-4 custom-card">
                <Card.Header as="h3" className="card-header-custom">תמונה מהפרשה</Card.Header>
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