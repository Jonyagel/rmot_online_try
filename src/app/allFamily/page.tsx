"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Card, Button, Accordion, ListGroup, Form, Nav, Modal, Dropdown, Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faBook, faSynagogue, faUtensils, faQuestionCircle, faRunning, faLightbulb, faSearch, faPlus, faMapMarkerAlt, faHandHoldingHeart, faPhone, faClipboardList, faCheckSquare, faListUl, faClock, faUsers, faPiggyBank, faPoll, faMapMarkedAlt, faCamera } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import SynagogueCard from './components/synagogue'
import './familyPage.css'


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
    background: linear-gradient(135deg, #007bff, #6610f2);
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
    
    &:hover {
      color: #3498db;
    }

     &.active{
     color: #ffffff;
     }

  }
`;
const StyledNavLink = styled(Nav.Link)`
  white-space: normal;
  word-wrap: break-word;
  max-width: 100%;
`;

const FamilyPage = () => {
    interface Recipe {
        name: string;
        ingredients: string[];
        instructions: string[];
    }

    interface ActivityRecommendation {
        title: string;
        description: string;
    }
    interface LostFoundItem {
        id?: string;
        type: 'מציאה' | 'אבידה';
        description: string;
        location: string;
        date: string;
        contact: string;
        area?: 'ramot-a' | 'ramot-b' | 'ramot-c' | 'ramot-polin';
    }
    const [showAnswer2, setShowAnswer2] = useState<boolean>(false);
    const [hebDate, setHebDate] = useState('');
    const [recipe2, setRecipe2] = useState<Recipe>({ name: '', ingredients: [], instructions: [] });
    const [weeklyParasha, setWeeklyParasha] = useState<string>('');
    const [torahThought, setTorahThought] = useState<string>('');
    const [savingTip, setSavingTip] = useState<string>('');
    const [familyActivities, setFamilyActivities] = useState<string[]>([]);
    const [activityRecommendation, setActivityRecommendation] = useState<ActivityRecommendation>({ title: '', description: '' });
    const [photoChallengeTopic, setPhotoChallengeTopic] = useState<string>('');
    const [openContacts, setOpenContacts] = useState<{ [key: string]: boolean }>({});
    const [typeFilter, setTypeFilter] = useState<'all' | 'מציאה' | 'אבידה'>('all');
    const [areaFilter, setAreaFilter] = useState<AreaFilter>('all');
    const [filteredItems, setFilteredItems] = useState<LostFoundItem[]>([]);
    const [showSynagogueModal, setShowSynagogueModal] = useState(false);
    const [lostAndFound, setLostAndFound] = useState<LostFoundItem[]>([]);
    const [showLostFoundModal, setShowLostFoundModal] = useState(false);
    const [faithStories, setFaithStories] = useState<Array<{ author: string, story: string, date: string }>>([]);
    const [showFaithStoryModal, setShowFaithStoryModal] = useState(false);
    const storyAuthorRef = useRef<HTMLInputElement>(null);
    const storyContentRef = useRef<HTMLTextAreaElement>(null);
    // const [selectedSynagogue, setSelectedSynagogue] = useState(synagogues);
    const itemTypeRef = useRef<HTMLSelectElement>(null);
    const itemDescriptionRef = useRef<HTMLTextAreaElement>(null);
    const itemLocationRef = useRef<HTMLInputElement>(null);
    const itemDateRef = useRef<HTMLInputElement>(null);
    const contactInfoRef = useRef<HTMLInputElement>(null);
    const itemAreaRef = useRef<HTMLSelectElement>(null);

    const dateDoApi = async () => {
        const url = `https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&year=now&month=8&ss=on&mf=on&c=on&geo=geoname&geonameid=281184&M=on&s=on&d=on&lg=he&start=2024-08-15&end=2024-08-15`;
        const resp = await fetch(url);
        const data = await resp.json();
        console.log(data.items[0].heDateParts);
        setHebDate(data.items[0].heDateParts);
    }
    // useEffect(() => {
    //     console.log(hebDate);
    //   }, [hebDate]);


    const handleAddLostFoundItem = () => {
        const newItem: LostFoundItem = {
            type: itemTypeRef.current?.value as 'מציאה' | 'אבידה',
            description: itemDescriptionRef.current?.value || '',
            location: itemLocationRef.current?.value || '',
            date: itemDateRef.current?.value || '',
            contact: contactInfoRef.current?.value || '',
            area: itemAreaRef.current?.value as 'ramot-a' | 'ramot-b' | 'ramot-c' | 'ramot-polin'
        };
        setLostAndFound(prev => [...prev, newItem]);
        setShowLostFoundModal(false);
    };

    // הגדרת הטיפוס למסנן האזור
    type AreaFilter = 'all' | 'ramot-a' | 'ramot-b' | 'ramot-c' | 'ramot-polin';

    // הגדרת הטיפוס למסנן הסוג
    type TypeFilter = 'all' | 'מציאה' | 'אבידה';
    useEffect(() => {
        dateDoApi();
        // כאן תוכל לבצע קריאות API או לטעון מידע ממקור חיצוני
        fetchWeeklyData();

    }, []);
    useEffect(() => {
        const newFilteredItems = lostAndFound.filter(item => {
            const matchesType = typeFilter === 'all' || item.type === typeFilter;
            const matchesArea = areaFilter === 'all' || item.area === areaFilter;
            return matchesType && matchesArea;
        });
        setFilteredItems(newFilteredItems);
    }, [lostAndFound, typeFilter, areaFilter]);

    const handleAddFaithStory = () => {
        const newStory = {
            author: storyAuthorRef.current?.value || 'אנונימי',
            story: storyContentRef.current?.value || '',
            date: new Date().toLocaleDateString('he-IL')
        };
        setFaithStories(prevStories => [...prevStories, newStory]);
        setShowFaithStoryModal(false);
    };

    const fetchWeeklyData = async () => {
        // לדוגמה בלבד - במציאות, כאן תבצע קריאות API אמיתיות
        setRecipe2({
            name: 'עוגת שוקולד',
            ingredients: ['קמח', 'סוכר', 'ביצים', 'שוקולד'],
            instructions: ['ערבב את המרכיבים', 'אפה בתנור']
        });
        setWeeklyParasha('בראשית');
        setTorahThought('בראשית ברא אלוהים את השמים ואת הארץ');
        setSavingTip('כבה אורות כשאתה יוצא מהחדר');
        setFamilyActivities(['טיול בטבע', 'משחק קופסה', 'צפייה בסרט']);
        setActivityRecommendation({
            title: 'פיקניק בפארק',
            description: 'צאו לפיקניק משפחתי בפארק הסמוך'
        });
        setPhotoChallengeTopic('שקיעה');
    };


    const toggleAnswer2 = () => setShowAnswer2(!showAnswer);

    const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        // כאן תטפל בהעלאת התמונה
        console.log('תמונה הועלתה', event.target.files);
    };

    const handleFamilyActivityVote = (activity: string) => {
        // כאן תטפל בהצבעה לפעילות משפחתית
        console.log('הצבעה לפעילות:', activity);
    };
    const handleTypeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTypeFilter(event.target.value as 'all' | 'מציאה' | 'אבידה');
    };

    const handleAreaFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAreaFilter(event.target.value as AreaFilter);
    };

    const toggleContact = (itemId: string) => {
        setOpenContacts(prev => ({ ...prev, [itemId]: !prev[itemId] }));
    };

    const handleShowContact = (contact: string) => {
        alert(`פרטי התקשרות: ${contact}`);
        // או לחלופין, תוכל להשתמש במודל או בפופאובר להצגת הפרטים
    };

    const addNewItem = (newItem: LostFoundItem) => {
        setLostAndFound(prevItems => [...prevItems, newItem]);
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
        <Container fluid className="content-container p-3">
            <Row>
                <Col lg={2} className="d-none d-lg-block">
                    {/* אזור פרסומות שמאלי */}
                    <div className="ad-container">
                        <div className="ad-space">
                            <img src='/images/bookgif.webp' className='rounded' />
                        </div>
                    </div>
                </Col>
                <Col lg={8}>

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
                                            {hebDate &&
                                                <div>
                                                    <p><span>היום:</span>{hebDate.d} {hebDate.m} {hebDate.y} </p>
                                                    <p>פרשת השבוע: פנחס</p>
                                                </div>
                                            }
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
                                            <Button variant="outline-primary" onClick={toggleAnswer2}>
                                                {showAnswer ? 'הסתר תשובה' : 'הצג תשובה'}
                                            </Button>
                                            {showAnswer && (
                                                <p className="mt-3 alert alert-success">
                                                    התשובה: האדם. בילדותו הוא זוחל על ארבע, כמבוגר הוא הולך על שתיים, ובזקנתו נעזר במקל (שלוש).
                                                </p>
                                            )}
                                        </Card.Body>
                                    </StyledCard>

                                    <StyledCard className="mt-4">
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
                                    <StyledCard className="mt-4">
                                        <CardHeader>
                                            <FontAwesomeIcon icon={faBook} className="mr-2" /> דבר תורה שבועי
                                        </CardHeader>
                                        <Card.Body>
                                            <h5>פרשת השבוע: {weeklyParasha}</h5>
                                            <p>{torahThought}</p>
                                            <Button variant="outline-primary">קרא עוד</Button>
                                        </Card.Body>
                                    </StyledCard>
                                    <StyledCard className="mt-4">
                                        <CardHeader>
                                            <FontAwesomeIcon icon={faPiggyBank} className="mr-2" /> טיפ חיסכון שבועי
                                        </CardHeader>
                                        <Card.Body>
                                            <h5>חיסכון בחשבון החשמל</h5>
                                            <p>{savingTip}</p>
                                            <Button variant="outline-success">עוד טיפים לחיסכון</Button>
                                        </Card.Body>
                                    </StyledCard>

                                    <StyledCard className="mt-4">
                                        <CardHeader>
                                            <FontAwesomeIcon icon={faPoll} className="mr-2" /> סקר משפחתי
                                        </CardHeader>
                                        <Card.Body>
                                            <h5>מה נעשה בשבת הקרובה?</h5>
                                            <Form>
                                                {familyActivities.map((activity, index) => (
                                                    <Form.Check
                                                        type="radio"
                                                        id={`activity-${index}`}
                                                        label={activity}
                                                        name="familyActivity"
                                                        key={index}
                                                    />
                                                ))}
                                                <Button variant="primary" className="mt-3">הצבע</Button>
                                            </Form>
                                        </Card.Body>
                                    </StyledCard>
                                    <StyledCard>
                                        <CardHeader>
                                            <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" /> המלצה לבילוי משפחתי
                                        </CardHeader>
                                        <Card.Body>
                                            <h5>{activityRecommendation.title}</h5>
                                            <p>{activityRecommendation.description}</p>
                                            <Button variant="outline-info">פרטים נוספים</Button>
                                        </Card.Body>
                                    </StyledCard>
                                </Col>

                                <Col md={6}>
                                    <StyledCard>
                                        <CardHeader>
                                            <FontAwesomeIcon icon={faUtensils} className="mr-2" /> מתכון לשבת
                                        </CardHeader>
                                        <Card.Body className="recipe-card">
                                            <div className="recipe-content">
                                                <div className="recipe-header">
                                                    <h2 className="recipe-title text-4xl font-bold">{recipe.name}</h2>
                                                    <img src="/images/car3.jpg" alt={"food"} className="recipe-image" />
                                                </div>

                                                <div className="recipe-info">
                                                    <div className="recipe-meta">
                                                        <span><FontAwesomeIcon icon={faClock} /> זמן הכנה: {"1:30"}</span>
                                                        <span><FontAwesomeIcon icon={faUsers} /> מספר מנות: {"5"}</span>
                                                    </div>

                                                    <div className="recipe-description">
                                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sunt nostrum voluptatem sequi accusamus aperiam fuga laboriosam in consectetur unde optio, provident neque, magnam beatae amet aliquid qui architecto veritatis.</p>
                                                    </div>
                                                </div>

                                                <div className="recipe-main">
                                                    <div className="ingredients-section">
                                                        <h3><FontAwesomeIcon icon={faListUl} /> מצרכים</h3>
                                                        <ul className="ingredients-list">
                                                            {recipe.ingredients.map((ingredient, index) => (
                                                                <li key={index}>{ingredient}</li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    <div className="instructions-section">
                                                        <h3><FontAwesomeIcon icon={faClipboardList} /> הוראות הכנה</h3>
                                                        <ol className="instructions-list">
                                                            {recipe.instructions.map((instruction, index) => (
                                                                <li key={index}>{instruction}</li>
                                                            ))}
                                                        </ol>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </StyledCard>
                                    <StyledCard>
                                        <CardHeader>
                                            <FontAwesomeIcon icon={faCamera} className="mr-2" /> אתגר צילום שבועי
                                        </CardHeader>
                                        <Card.Body>
                                            <h5>נושא השבוע: {photoChallengeTopic}</h5>
                                            <p>צלמו תמונה בנושא השבועי ושתפו אותה כאן!</p>
                                            <Form.Group>
                                                {/* <Form.File id="photoUpload" label="העלו את התמונה שלכם" /> */}
                                            </Form.Group>
                                            <Button variant="primary" className="mt-3">שתף תמונה</Button>
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
                                            <FontAwesomeIcon icon={faLightbulb} className="mr-2" /> סיפורי השגחה פרטית ואמונה
                                        </CardHeader>
                                        <Card.Body>
                                            <ListGroup>
                                                {faithStories.map((story, index) => (
                                                    <ListGroup.Item key={index}>
                                                        <p><strong>{story.author}</strong> - {story.date}</p>
                                                        <p>{story.story}</p>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                            <Button variant="outline-primary" className="mt-3" onClick={() => setShowFaithStoryModal(true)}>
                                                <FontAwesomeIcon icon={faPlus} className="mr-2" /> הוסף סיפור חדש
                                            </Button>
                                        </Card.Body>
                                    </StyledCard>

                                    <StyledCard>
                                        <CardHeader>
                                            <FontAwesomeIcon icon={faSearch} className="mr-2" /> מציאות ואבידות
                                        </CardHeader>
                                        <Card.Body>
                                            <Form className="mb-3">
                                                <Form.Group as={Row}>
                                                    <Form.Label column sm={3}>מיון לפי:</Form.Label>
                                                    <Col sm={4}>
                                                        <Form.Select onChange={handleTypeFilter}>
                                                            <option value="all">הכל</option>
                                                            <option value="אבידה">אבידות</option>
                                                            <option value="מציאה">מציאות</option>
                                                        </Form.Select>
                                                    </Col>
                                                    <Col sm={5}>
                                                        <Form.Select onChange={handleAreaFilter}>
                                                            <option value="all">כל האזורים</option>
                                                            <option value="ramot-a">רמות א'</option>
                                                            <option value="ramot-b">רמות ב'</option>
                                                            <option value="ramot-c">רמות ג'</option>
                                                            <option value="ramot-polin">רמות פולין</option>
                                                        </Form.Select>
                                                    </Col>
                                                </Form.Group>
                                            </Form>

                                            <ListGroup>
                                                {filteredItems.map((item: any) => (
                                                    <ListGroup.Item key={item.id}>
                                                        <Row>
                                                            <Col xs={2} className="d-flex align-items-center justify-content-center">
                                                                <FontAwesomeIcon icon={item.type === 'אבידה' ? faSearch : faHandHoldingHeart} size="2x" />
                                                            </Col>
                                                            <Col xs={10}>
                                                                <strong>{item.type === 'אבידה' ? 'אבד' : 'נמצא'}: </strong>{item.description}
                                                                <br />
                                                                <small>
                                                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" /> {item.location},
                                                                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-1 ml-2" /> {item.date}
                                                                </small>
                                                                <br />
                                                                <Button
                                                                    variant="primary"
                                                                    className="p-1 mt-2"
                                                                    onClick={() => toggleContact(item.id)}
                                                                    aria-controls={`contact-${item.id}`}
                                                                    aria-expanded={openContacts[item.id]}
                                                                >
                                                                    {openContacts[item.id] ? 'הסתר פרטי התקשרות' : 'הצג פרטי התקשרות'}
                                                                </Button>
                                                                <Collapse in={openContacts[item.id]}>
                                                                    <div id={`contact-${item.id}`} className="mt-2">
                                                                        <FontAwesomeIcon icon={faPhone} className="mr-2" />
                                                                        {item.contact}
                                                                    </div>
                                                                </Collapse>
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))}

                                            </ListGroup>

                                            <div className="text-center mt-4">
                                                <Button variant="outline-primary" onClick={() => setShowLostFoundModal(true)}>
                                                    <FontAwesomeIcon icon={faPlus} className="mr-2" /> הוסף פריט חדש
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </StyledCard>
                                </Col>
                            </Row>
                        )}
                    </Container>
                </Col>

                <Col lg={2} className="d-none d-lg-block ">
                    {/* אזור פרסומות ימני */}
                    <div className="ad-container">
                        <div className="ad-space">
                            <img src='/images/timegif.webp' className='rounded' />
                            {/* כאן תוכל להוסיף את קוד הפרסומת שלך */}
                        </div>
                    </div>
                </Col>
            </Row>

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
            <Modal show={showFaithStoryModal} onHide={() => setShowFaithStoryModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>הוספת סיפור השגחה פרטית ואמונה</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="storyAuthor">
                            <Form.Label>שם (אופציונלי)</Form.Label>
                            <Form.Control type="text" ref={storyAuthorRef} />
                        </Form.Group>
                        <Form.Group controlId="storyContent">
                            <Form.Label>הסיפור שלך</Form.Label>
                            <Form.Control as="textarea" rows={5} ref={storyContentRef} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowFaithStoryModal(false)}>
                        סגור
                    </Button>
                    <Button variant="primary" onClick={handleAddFaithStory}>
                        הוסף סיפור
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
                        <Form.Group controlId="itemArea">
                            <Form.Label>אזור</Form.Label>
                            <Form.Select ref={itemAreaRef}>
                                <option value="ramot-a">רמות א'</option>
                                <option value="ramot-b">רמות ב'</option>
                                <option value="ramot-c">רמות ג'</option>
                                <option value="ramot-polin">רמות פולין</option>
                            </Form.Select>
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