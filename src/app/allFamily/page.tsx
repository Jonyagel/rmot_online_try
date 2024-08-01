"use client"
import React, { useRef, useState } from 'react';
import { Container, Row, Col, Card, Button, Accordion, ListGroup, Form, Nav, Modal, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faBook, faSynagogue, faUtensils, faQuestionCircle, faRunning, faLightbulb, faSearch } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import SynagogueCard from './components/synagogue'

const SynagogueItem = styled.div`
  margin-bottom: 2rem;
`;

const SynagogueName = styled.h4`
  color: #2c3e50;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
`;

const SynagogueAddress = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const PrayerTimes = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
`;

const PrayerTimesTitle = styled.h5`
  color: #34495e;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const PrayerTimesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const PrayerTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  span {
    font-size: 0.9rem;
    color: #7f8c8d;
    margin: 0.3rem 0;
  }

  strong {
    font-size: 1.1rem;
    color: #2c3e50;
  }
`;

const SynagogueDivider = styled.hr`
  margin: 2rem 0;
  border-top: 1px solid #ecf0f1;
`;

const StyledContainer = styled(Container)`
  background-color: #f0f4f8;
  padding: 2rem 0;
`;

const StyledCard = styled(Card)`
  border: none;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  }
`;

const CardHeader = styled(Card.Header)`
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  font-weight: bold;
  padding: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;
  
  &:after {
    content: '';
    display: block;
    width: 50px;
    height: 3px;
    background: #3498db;
    margin: 10px auto;
  }
`;

const StyledNav = styled(Nav)`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;

  @media (max-width: 768px) {
  display: none;
  }

  .nav-link {
    color: #2c3e50;
    font-weight: bold;
    padding: 10px 15px;
    
    &:hover, &.active {
      color: #3498db;
    }
  }
`;
const StyledNavLink = styled(Nav.Link)`
  white-space: normal;
  word-wrap: break-word;
  max-width: 100%;
`;

const FamilyPage = () => {
    interface LostFoundItem {
        type: 'מציאה' | 'אבידה';
        description: string;
        location: string;
        date: string;
        contact: string;
    }
    const [showSynagogueModal, setShowSynagogueModal] = useState(false);
    const [lostAndFound, setLostAndFound] = useState<LostFoundItem[]>([]);
    const [showLostFoundModal, setShowLostFoundModal] = useState(false);
    // const [selectedSynagogue, setSelectedSynagogue] = useState(synagogues);
    const itemTypeRef = useRef<HTMLSelectElement>(null);
    const itemDescriptionRef = useRef<HTMLTextAreaElement>(null);
    const itemLocationRef = useRef<HTMLInputElement>(null);
    const itemDateRef = useRef<HTMLInputElement>(null);
    const contactInfoRef = useRef<HTMLInputElement>(null);

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


    const [activeTab, setActiveTab] = useState('daily');
    const [showAnswer, setShowAnswer] = useState(false);
    // const [lostAndFound, setLostAndFound] = useState([
    //     { type: 'מציאה', description: 'מפתחות עם מחזיק של אייפל', location: 'גן העיר', date: '2023-07-20' },
    //     { type: 'אבידה', description: 'תיק יד כחול', location: 'אוטובוס קו 5', date: '2023-07-19' }
    // ]);

    const toggleAnswer = () => setShowAnswer(!showAnswer);

    const synagogues = [
        {
            name: "בית הכנסת הגדול",
            address: "רחוב הרצל 1",
            prayerTimes: {
                weekday: { shacharit: "06:30", mincha: "13:30", arvit: "19:00" },
                saturday: { shacharit: "08:00", mincha: "17:30", arvit: "20:00" }
            }
        },
        {
            name: "בית כנסת אוהל יצחק",
            address: "רחוב בן גוריון 15",
            prayerTimes: {
                weekday: { shacharit: "07:00", mincha: "13:45", arvit: "19:15" },
                saturday: { shacharit: "08:30", mincha: "18:00", arvit: "20:15" }
            }
        },
        {
            name: "בית כנסת אוהל יצחק",
            address: "רחוב בן גוריון 15",
            prayerTimes: {
                weekday: { shacharit: "07:00", mincha: "13:45", arvit: "19:15" },
                saturday: { shacharit: "08:30", mincha: "18:00", arvit: "20:15" }
            }
        },
        {
            name: "בית כנסת אוהל יצחק",
            address: "רחוב בן גוריון 15",
            prayerTimes: {
                weekday: { shacharit: "07:00", mincha: "13:45", arvit: "19:15" },
                saturday: { shacharit: "08:30", mincha: "18:00", arvit: "20:15" }
            }
        },
        // ... יותר בתי כנסת
    ];

    const recipe = {
        name: "חלה מתוקה",
        ingredients: ["3 כוסות קמח", "1/4 כוס סוכר", "1 כף שמרים יבשים", "1 כוס מים פושרים", "1/4 כוס שמן", "1 ביצה", "1 כפית מלח"],
        instructions: [
            "ערבבו את הקמח, הסוכר והשמרים בקערה גדולה.",
            "הוסיפו את המים, השמן, הביצה והמלח וערבבו עד שנוצר בצק חלק.",
            "כסו את הקערה ותנו לבצק לתפוח במשך שעה.",
            "צרו צמה מהבצק והניחו בתבנית.",
            "הניחו לתפוח שוב למשך 30 דקות.",
            "אפו ב-180 מעלות למשך 25-30 דקות עד להזהבה."
        ]
    };

    return (
        <StyledContainer fluid>
            <Container>
                <SectionTitle>לכל המשפחה</SectionTitle>

                <StyledNav variant="pills" activeKey={activeTab} onSelect={(k: any) => setActiveTab(k)} className="flex-column flex-md-row">
                    <Nav.Item>
                        <Nav.Link eventKey="daily">
                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> יומי
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="weekly">
                            <FontAwesomeIcon icon={faRunning} className="mr-2" /> שבועי
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="community">
                            <FontAwesomeIcon icon={faSynagogue} className="mr-2" /> קהילה
                        </Nav.Link>
                    </Nav.Item>
                </StyledNav>
                <Dropdown className="d-md-none mb-3">
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {activeTab === 'daily' ? 'יומי' : activeTab === 'weekly' ? 'שבועי' : 'קהילה'}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setActiveTab('daily')}>יומי</Dropdown.Item>
                        <Dropdown.Item onClick={() => setActiveTab('weekly')}>שבועי</Dropdown.Item>
                        <Dropdown.Item onClick={() => setActiveTab('community')}>קהילה</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {activeTab === 'daily' && (
                    <Row>
                        <Col md={6}>
                            <StyledCard>
                                <CardHeader>
                                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> לוח שנה עברי
                                </CardHeader>
                                <Card.Body>
                                    <p>היום: כ"ג בתמוז תשפ"ג</p>
                                    <p>פרשת השבוע: פנחס</p>
                                    <p>חג קרוב: תשעה באב (01.08.2023)</p>
                                </Card.Body>
                            </StyledCard>
                        </Col>
                        <Col md={6}>
                            <StyledCard>
                                <CardHeader>
                                    <FontAwesomeIcon icon={faBook} className="mr-2" /> פינת לימוד יומית
                                </CardHeader>
                                <Card.Body>
                                    <blockquote className="blockquote">
                                        <p>"בראשית ברא אלוהים את השמים ואת הארץ"</p>
                                    </blockquote>
                                    <Button variant="outline-primary">דיון משפחתי</Button>
                                </Card.Body>
                            </StyledCard>
                        </Col>
                    </Row>
                )}

                {activeTab === 'weekly' && (
                    <Row>
                        <Col md={6}>
                            <StyledCard>
                                <CardHeader>
                                    <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" /> טריוויה שבועית
                                </CardHeader>
                                <Card.Body>
                                    <p>מה הולך על ארבע בבוקר, על שתיים בצהריים, ועל שלוש בערב?</p>
                                    <Button variant="outline-primary" onClick={toggleAnswer}>
                                        {showAnswer ? 'הסתר תשובה' : 'הצג תשובה'}
                                    </Button>
                                    {showAnswer && (
                                        <p className="mt-3 alert alert-success">
                                            התשובה: האדם. בילדותו הוא זוחל על ארבע, כמבוגר הוא הולך על שתיים, ובזקנתו נעזר במקל (שלוש).
                                        </p>
                                    )}
                                </Card.Body>
                            </StyledCard>
                        </Col>
                        <Col md={6}>
                            <StyledCard>
                                <CardHeader>
                                    <FontAwesomeIcon icon={faUtensils} className="mr-2" /> מתכון לשבת
                                </CardHeader>
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
                            </StyledCard>
                        </Col>
                        <Col md={12}>
                            <StyledCard>
                                <CardHeader>
                                    <FontAwesomeIcon icon={faLightbulb} className="mr-2" /> אתגר שבועי
                                </CardHeader>
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
                            </StyledCard>
                        </Col>
                    </Row>
                )}

                {activeTab === 'community' && (
                    <Row>

                        <SynagogueCard synagogues={synagogues} />
                        <Col md={6}>
                            <StyledCard>
                                <CardHeader>
                                    <FontAwesomeIcon icon={faSearch} className="mr-2" /> מציאות ואבידות
                                </CardHeader>
                                <Card.Body>
                                    <ListGroup>
                                        {lostAndFound.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <strong>{item.type}: </strong>{item.description}
                                                <br />
                                                <small>נמצא/אבד ב: {item.location}, {item.date}</small>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    <Button variant="outline-primary" className="mt-3" onClick={() => {
                                        setShowLostFoundModal(true)
                                    }}>הוסף פריט חדש</Button>
                                </Card.Body>
                            </StyledCard>
                        </Col>
                    </Row>
                )}
            </Container>
            {/* <Modal show={showSynagogueModal} onHide={() => setShowSynagogueModal(false)}>
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
            </Modal> */}
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
        </StyledContainer>
    );
};

export default FamilyPage;