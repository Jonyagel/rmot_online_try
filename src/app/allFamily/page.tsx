"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Tabs, Tab, Modal, ListGroup, Form, Accordion } from 'react-bootstrap';
import { CldImage } from 'next-cloudinary';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faSynagogue, faClock, faPuzzlePiece, faLightbulb, faCalendarAlt, faQuestionCircle, faUtensils, faRunning, faGuitar, faSearch } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

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

    interface Recipe {
        name: string;
        ingredients: string[];
        instructions: string[];
    }

    interface LostFoundItem {
        type: 'מציאה' | 'אבידה';
        description: string;
        location: string;
        date: string;
        contact: string;
      }

    const [showAnswer, setShowAnswer] = useState(false);
    const [showSynagogueModal, setShowSynagogueModal] = useState(false);
    const [selectedSynagogue, setSelectedSynagogue] = useState<Synagogue | null>(null);
    const [recipe, setRecipe] = useState<Recipe>({
        name: '',
        ingredients: [],
        instructions: []
    });
    const [lostAndFound, setLostAndFound] = useState<LostFoundItem[]>([]);
    const [showLostFoundModal, setShowLostFoundModal] = useState(false);

    const itemTypeRef = useRef<HTMLSelectElement>(null);
    const itemDescriptionRef = useRef<HTMLTextAreaElement>(null);
    const itemLocationRef = useRef<HTMLInputElement>(null);
    const itemDateRef = useRef<HTMLInputElement >(null);
    const contactInfoRef = useRef<HTMLInputElement >(null);

    const handleAddLostFoundItem = () => {
        if (
          itemTypeRef.current &&
          itemDescriptionRef.current &&
          itemLocationRef.current &&
          itemDateRef.current &&
          contactInfoRef.current
        ) {
          const newItem: LostFoundItem = {
            type: itemTypeRef.current.value as 'מציאה' | 'אבידה',
            description: itemDescriptionRef.current.value,
            location: itemLocationRef.current.value,
            date: itemDateRef.current.value,
            contact: contactInfoRef.current.value
          };
          setLostAndFound(prevItems => [...prevItems, newItem]);
          setShowLostFoundModal(false);
        }
      };

    useEffect(() => {
        setRecipe({
            name: 'חלה מתוקה לשבת',
            ingredients: ['3 כוסות קמח', '1/4 כוס סוכר', '1 כף שמרים יבשים', '1 כוס מים פושרים', '1/4 כוס שמן', '1 ביצה', '1 כפית מלח'],
            instructions: ['ערבבו את כל המרכיבים היבשים', 'הוסיפו את הנוזלים וערבבו עד לקבלת בצק חלק', 'הניחו לתפיחה במשך שעה', 'צרו צמה מהבצק והניחו על תבנית אפייה', 'אפו ב-180 מעלות במשך 25-30 דקות']
        });
    }, []);

    const toggleAnswer = () => setShowAnswer(!showAnswer);


    const WeeklyTrivia = () => {
        const [question, setQuestion] = useState("מי היה הכהן הגדול הראשון?");
        const [options, setOptions] = useState(["משה", "אהרון", "יהושע", "שמואל"]);

        return (
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
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
            </motion.div>
        );
    };

    const HebrewCalendar = () => {
        return (
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Card className="custom-card">
                    <Card.Header as="h3" className="card-header-custom">
                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> לוח שנה עברי
                    </Card.Header>
                    <Card.Body>
                        <p>היום: כ"ג בתמוז תשפ"ג</p>
                        <p>פרשת השבוע: פנחס</p>
                        <p>חג קרוב: תשעה באב (01.08.2023)</p>
                    </Card.Body>
                </Card>
            </motion.div>
        );
    };

    const DailyLearning = () => {
        const [verse, setVerse] = useState("בראשית ברא אלוהים את השמים ואת הארץ");

        return (
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
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
            </motion.div>
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

    const FamilyActivities = () => (
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Card className="custom-card">
                <Card.Header as="h3" className="card-header-custom">
                    <FontAwesomeIcon icon={faRunning} className="mr-2" /> פעילויות משפחתיות
                </Card.Header>
                <Card.Body>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>טיול משפחתי</Accordion.Header>
                            <Accordion.Body>
                                מסלול מומלץ: נחל השופט - טיול קליל לכל המשפחה עם נקודות עניין רבות ומעיינות בדרך.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>ערב משחקי קופסה</Accordion.Header>
                            <Accordion.Body>
                                המלצה למשחק: "קטאן" - משחק אסטרטגיה מהנה לכל המשפחה, מגיל 10 ומעלה.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Card.Body>
            </Card>
        </motion.div>
    );

    const ShabbatRecipe = () => (
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Card className="custom-card">
                <Card.Header as="h3" className="card-header-custom">
                    <FontAwesomeIcon icon={faUtensils} className="mr-2" /> מתכון לשבת
                </Card.Header>
                <Card.Body>
                    <h4>{recipe.name}</h4>
                    <h5>מצרכים:</h5>
                    <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <h5>הוראות הכנה:</h5>
                    <ol>
                        {recipe.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ol>
                </Card.Body>
            </Card>
        </motion.div>
    );

    const WeeklyChallenge = () => (
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Card className="custom-card">
                <Card.Header as="h3" className="card-header-custom">
                    <FontAwesomeIcon icon={faLightbulb} className="mr-2" /> אתגר שבועי
                </Card.Header>
                <Card.Body>
                    <h5>השבוע: מעשה טוב יומי</h5>
                    <p>כל יום, עשו מעשה טוב אחד לפחות. בסוף השבוע, שתפו את המעשים הטובים שעשיתם עם המשפחה.</p>
                    <Form>
                        <Form.Group>
                            <Form.Control as="textarea" rows={3} placeholder="רשמו כאן את המעשים הטובים שלכם" />
                        </Form.Group>
                        <Button variant="primary" className="mt-3">שתפו את המעשים הטובים</Button>
                    </Form>
                </Card.Body>
            </Card>
        </motion.div>
    );

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
                    border-radius: 15px;
                    overflow: hidden;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                    transition: all 0.3s ease-in-out;
                }
                .custom-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.2);
                }
                .card-header-custom {
                    background: linear-gradient(45deg, ${colors.primary}, ${colors.secondary});
                    color: white;
                    padding: 15px;
                }
                .nav-tabs {
                    border-bottom: none;
                }
                .nav-tabs .nav-link {
                    border: none;
                    color: ${colors.text};
                    font-weight: 600;
                    padding: 15px 25px;
                    border-radius: 10px 10px 0 0;
                    transition: all 0.3s ease;
                }
                .nav-tabs .nav-link.active {
                    color: white;
                    background: linear-gradient(45deg, ${colors.primary}, ${colors.secondary});
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
                    gap: 25px;
                }
                @media (max-width: 768px) {
                    .grid-container {
                        grid-template-columns: 1fr;
                    }
                }
                .btn {
                    border-radius: 25px;
                    padding: 10px 20px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }
                .btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
                }
            `}</style>

            <motion.h1
                className="text-center mb-5 display-4"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                לכל המשפחה
            </motion.h1>

            <Tabs defaultActiveKey="activities" id="family-tabs" className="mb-4">
                <Tab eventKey="activities" title={<><FontAwesomeIcon icon={faPuzzlePiece} className="mr-2" /> פעילויות משפחתיות</>}>
                    <div className="grid-container">
                        <HebrewCalendar />
                        <DailyLearning />
                        <WeeklyTrivia />
                        <FamilyActivities />
                        <WeeklyChallenge />
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
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
                        </motion.div>
                    </div>
                </Tab>

                <Tab eventKey="stories" title={<><FontAwesomeIcon icon={faBook} className="mr-2" /> סיפורים וערכים</>}>
                    <div className="grid-container">
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                            <Card className="custom-card">
                                <Card.Header as="h3" className="card-header-custom">
                                    <FontAwesomeIcon icon={faBook} className="mr-2" /> סיפור לשבת
                                </Card.Header>
                                <Card.Body>
                                    <h4>מעשה בחסיד</h4>
                                    <p>
                                        מעשה בחסיד אחד שהיה רגיל לומר תהילים בכל יום. פעם אחת, בדרכו לבית המדרש, ראה אדם נופל ברחוב.
                                        במקום להמשיך בדרכו, עצר החסיד לעזור לאיש. בגלל זה, איחר לתפילה ולא הספיק לומר את התהילים כהרגלו.
                                        בלילה, חלם החסיד שאומרים לו מן השמיים: "דע לך, שהעזרה שהגשת לאותו אדם ברחוב שווה יותר מכל פרקי
                                        התהילים שהיית אומר באותו יום."
                                    </p>
                                    <Button variant="info">קרא עוד</Button>
                                </Card.Body>
                            </Card>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
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
                        </motion.div>
                        <ShabbatRecipe />
                    </div>
                </Tab>

                <Tab eventKey="community" title={<><FontAwesomeIcon icon={faSynagogue} className="mr-2" /> קהילה ומידע</>}>
                    <div className="grid-container">
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
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
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
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
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                            <Card className="custom-card">
                                <Card.Header as="h3" className="card-header-custom">
                                    <FontAwesomeIcon icon={faGuitar} className="mr-2" /> אירועים קהילתיים
                                </Card.Header>
                                <Card.Body>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <h5>ערב שירה בציבור</h5>
                                            <p>יום שלישי, 20:00, בגינה הקהילתית</p>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h5>שיעור תורה שבועי</h5>
                                            <p>יום חמישי, 19:30, בבית הכנסת המרכזי</p>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                            <Card className="custom-card">
                                <Card.Header as="h3" className="card-header-custom">
                                    <FontAwesomeIcon icon={faSearch} className="mr-2" /> מציאות ואבידות
                                </Card.Header>
                                <Card.Body>
                                    <ListGroup className="mb-3">
                                        {lostAndFound.map((item: any, index: any) => (
                                            <ListGroup.Item key={index}>
                                                <strong>{item.type}: </strong>{item.description}
                                                <br />
                                                <small>נמצא/אבד ב: {item.location}, {item.date}</small>
                                                <br />
                                                <Button variant="outline-info" size="sm" className="mt-2">
                                                    יצירת קשר
                                                </Button>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    <Button variant="primary" onClick={() => setShowLostFoundModal(true)}>
                                        הוסף פריט חדש
                                    </Button>
                                </Card.Body>
                            </Card>
                        </motion.div>
                    </div>
                </Tab>
            </Tabs>

            <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4"
            >
                <Card className="custom-card">
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
            </motion.div>

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
            <Modal show={showLostFoundModal} onHide={() => setShowLostFoundModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>הוספת פריט מציאה/אבידה</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="itemType">
                            <Form.Label>סוג</Form.Label>
                            <Form.Select ref={itemTypeRef}>
                                <option>מציאה</option>
                                <option>אבידה</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="itemDescription">
                            <Form.Label>תיאור הפריט</Form.Label>
                            <Form.Control as="textarea" rows={3} ref={itemDescriptionRef} />
                        </Form.Group>
                        <Form.Group controlId="itemLocation">
                            <Form.Label>מיקום</Form.Label>
                            <Form.Control type="text" ref={itemLocationRef} />
                        </Form.Group>
                        <Form.Group controlId="itemDate">
                            <Form.Label>תאריך</Form.Label>
                            <Form.Control type="date" ref={itemDateRef} />
                        </Form.Group>
                        <Form.Group controlId="contactInfo">
                            <Form.Label>פרטי התקשרות</Form.Label>
                            <Form.Control type="text" ref={contactInfoRef} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowLostFoundModal(false)}>
                        סגור
                    </Button>
                    <Button variant="primary" onClick={handleAddLostFoundItem}>
                        הוסף פריט
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default FamilyPage;