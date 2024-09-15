'use client'
import React, { useState } from 'react';
import './allFamily.css';
import { FaPlay, FaPause, FaCalendarAlt, FaBook, FaClock, FaPodcast, FaNewspaper, FaGlassCheers, FaSearch } from 'react-icons/fa';
import PodcastPlayer from './components/podcast';
import ArticleCard from './components/newsCard';
import DailyHalacha from './components/DailyHalacha';
import ShabbatTimes from './components/ShabbatTimes';
import EngagementCard from './components/EngagementCard';
import EngagementForm from './components/EngagementForm';
import { motion } from 'framer-motion';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import EvelCard from './components/evelCard';

const JudaismContent = () => (
  <div className="judaism-content">
    <h2>יהדות</h2>
    <DailyHalacha
      title="הלכה יומית: ברכת אשר יצר"
      content="יש לברך ברכת 'אשר יצר' לאחר כל עשיית צרכים, אפילו הטיל מים בלבד. נוסח הברכה מופיע בסידור."
    />
    <WeeklyParasha />
    <ShabbatTimes />
  </div>
);

const WeeklyParasha = () => (
  <div className="card parasha">
    <h3><FaCalendarAlt /> פרשת השבוע: לך לך</h3>
    <p>"וַיֹּאמֶר ה' אֶל-אַבְרָם, לֶךְ-לְךָ מֵאַרְצְךָ וּמִמּוֹלַדְתְּךָ וּמִבֵּית אָבִיךָ, אֶל-הָאָרֶץ, אֲשֶׁר אַרְאֶךָּ"</p>
    <ul>
      <li>אברם יוצא מחרן לארץ כנען</li>
      <li>ברית בין הבתרים</li>
      <li>לידת ישמעאל</li>
    </ul>
    <a href="#" className="learn-more">קרא את הפרשה המלאה</a>
  </div>
);


const PublicationsContent = () => (
  <div className="publications-content">
    {/* <h2>פרסומים</h2> */}
    <div className="flex justify-content-around">
      {/* <h3><FaPodcast /> פודקאסטים</h3> */}
      <PodcastPlayer
        title="יונתן"
        artist="שי המבר"
        coverArt="/images/car1.jpg"
        src="/audio/שיר הפתעה.mp3"
      />
      <PodcastPlayer
        title="יונתן"
        artist="שי המבר"
        coverArt="/images/car1.jpg"
        src="/audio/שיר הפתעה.mp3"
      />
    </div>
    <div className="">
      <ArticlesSection />
    </div>
  </div>
);

const ArticlesSection = () => {
  const articles = [
    {
      title: "מסורת מול חדשנות: האתגר של היהדות במאה ה-21",
      author: "ד\"ר מיכל טיקוצ'ינסקי",
      date: "15 באוקטובר, 2023",
      imageUrl: "/images/car3.jpg",
      link: "#"
    },
    {
      title: "השפעת הטכנולוגיה על ההלכה: סקירה היסטורית ומבט לעתיד",
      author: "הרב ד\"ר יהודה ברנדס",
      date: "22 באוקטובר, 2023",
      imageUrl: "/path/to/article2-image.jpg",
      link: "#"
    },
    {
      title: "חינוך יהודי בתפוצות: אתגרים והזדמנויות",
      author: "פרופ' אליעזר שביד",
      date: "29 באוקטובר, 2023",
      imageUrl: "/path/to/article3-image.jpg",
      link: "#"
    }
  ];

  return (
    <div className="articles-section">
      <h2><FaNewspaper /> מאמרים</h2>
      <div className="articles-list">
        {articles.map((article, index) => (
          <ArticleCard key={index} {...article} />
        ))}
      </div>
    </div>
  );
};


const CelebrationsContent: React.FC = () => {
  const [engagements, setEngagements] = useState([
    {
      groomName: "אלי רוקובסקי",
      groomFather: "עקיבא שמחה",
      groomInstitution: "ישיבת קניין דעת",
      groomCity: "ירושלים",
      brideName: "נחמה כ\"ץ",
      brideFather: "משה חיים",
      brideInstitution: "סמינר מעלות",
      brideCity: "בית שמש",
      date: "בס\"ד יום שני ד' סיון תשפ\"ד"
    },
    {
      groomName: "אלי רוקובסקי",
      groomFather: "עקיבא שמחה",
      groomInstitution: "ישיבת קניין דעת",
      groomCity: "ירושלים",
      brideName: "נחמה כ\"ץ",
      brideFather: "משה חיים",
      brideInstitution: "סמינר מעלות",
      brideCity: "בית שמש",
      date: "בס\"ד יום שני ד' סיון תשפ\"ד"
    },
    {
      groomName: "אלי רוקובסקי",
      groomFather: "עקיבא שמחה",
      groomInstitution: "ישיבת קניין דעת",
      groomCity: "ירושלים",
      brideName: "נחמה כ\"ץ",
      brideFather: "משה חיים",
      brideInstitution: "סמינר מעלות",
      brideCity: "בית שמש",
      date: "בס\"ד יום שני ד' סיון תשפ\"ד"
    },
    {
      groomName: "אלי רוקובסקי",
      groomFather: "עקיבא שמחה",
      groomInstitution: "ישיבת קניין דעת",
      groomCity: "ירושלים",
      brideName: "נחמה כ\"ץ",
      brideFather: "משה חיים",
      brideInstitution: "סמינר מעלות",
      brideCity: "בית שמש",
      date: "בס\"ד יום שני ד' סיון תשפ\"ד"
    },
    // ... ניתן להוסיף עוד אירוסין כאן
  ]);
  const [showForm, setShowForm] = useState(false);

  const addEngagement = (newEngagement: any) => {
    setEngagements([...engagements, newEngagement]);
    setShowForm(false);
  };

  return (
    <div className="celebrations-content">
      {/* <h2><FaGlassCheers /> שמחות</h2> */}
      <button className="add-engagement-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'סגור טופס' : 'הוסף אירוסין חדשים'}
      </button>
      {showForm && <EngagementForm onSubmit={addEngagement} />}
      <div className="celebrations-grid flex flex-column">
        {engagements.map((engagement, index) => (
          <EngagementCard key={index} {...engagement} />
        ))}
      </div>
    </div>
  );
};

const EvelContent: React.FC = () => {
  const [announcements, setAnnouncements] = useState([
    {
      deceasedName: "משה כהן",
      deceasedDate: "15 באוקטובר, 2023",
      parentName: "אברהם כהן",
      funeralLocation: "בית העלמין בירושלים",
      shivaAddress: "רחוב השבעה 10, ירושלים"
    },
    {
      deceasedName: "שרה לוי",
      deceasedDate: "16 באוקטובר, 2023",
      parentName: "דוד לוי",
      funeralLocation: "בית העלמין בתל אביב",
      shivaAddress: "רחוב השבעה 5, תל אביב"
    },
    // ... ניתן להוסיף עוד הודעות פטירה כאן
  ]);
  const [showForm, setShowForm] = useState(false);

  const addAnnouncement = (newAnnouncement: any) => {
    setAnnouncements([...announcements, newAnnouncement]);
    setShowForm(false);
  };

  return (
    <div className="death-announcements-content">
      <button className="add-announcement-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'סגור טופס' : 'הוסף הודעת פטירה חדשה'}
      </button>
      {/* {showForm && <DeathAnnouncementForm onSubmit={addAnnouncement} />} */}
      <div className="announcements-grid flex flex-column">
        {announcements.map((announcement, index) => (
          <EvelCard key={index} {...announcement} />
        ))}
      </div>
    </div>
  );
};


const AllFamilyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'judaism' | 'publications' | 'celebrations'>('judaism');
  const [showCodes, setShowCodes] = useState(false);

  const toggleCodes = () => {
    setShowCodes(!showCodes);
  };
  return (
    <div className="container-fluid">
      <Row>
        <Col lg={2} className="d-none d-lg-block">
          <div className="ad-container">
            <div className="ad-space">
              <img src='/images/bookgif.webp' className='rounded' />
            </div>
          </div>
        </Col>
        <Col lg={8}>
          <motion.div
            className='text-center'
          >
            <div className="header-container text-white py-5 rounded-bottom shadow-sm">
              <h1 className="display-4">מידע שכונתי</h1>
            </div>
            <motion.div
              className="mb-4"
              initial={{ opacity: 1, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className=''>
                <div className='mt-3'>
                  <div className="search-bar-container bg-white shadow-sm  p-3 rounded-top align-items-center mx-auto">
                    <Row>

                      <Col lg={6} className='flex justify-content-start'>

                      </Col>
                      <Col lg={6} className=' d-flex justify-content-end align-content-center'>
                        <InputGroup className="shadow-sm rounded w-50">
                          <Form.Control
                            type="text"
                            placeholder="חיפוש חנויות..."
                            // value={inputValue}
                            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                            // onKeyDown={(e: any) => {
                            //   if (e.key === 'Enter') {
                            //     e.preventDefault();
                            //     setSearchTerm(inputValue);
                            //   }
                            // }}
                            className=""
                          />
                          <InputGroup.Text
                            className="search-button"
                            // onClick={() => {
                            //   setSearchTerm(inputValue);
                            // }}
                            style={{ cursor: 'pointer' }}
                          >
                            <FaSearch />
                          </InputGroup.Text>
                        </InputGroup>
                        <button
                          className="btn btn-add-shop rounded shadow-sm w-auto me-1"
                        // onClick={handleShowModal}
                        >
                          הוסף חנות
                        </button>
                      </Col>
                    </Row>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>

          <div className='mt-4'>
            <div className='border shadow-sm flex justify-content-between'>
              <div className='text-center'>
                <h4 className='font-bold'>זריחה</h4>
                <hr className='w-75 mx-auto' />
                <p className='>05:24</p>
              </div>
              <div>
                <h4 className='font-bold'>זריחה</h4>
                <hr className='w-75 mx-auto' />
                <p className='>05:24</p>
              </div>
            </div>
            <Row>
              <Col lg={3}>
                <div className='scroll-card shadow-sm text-center' style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  <h4 className='font-bold'>עיתונים</h4>
                  <div className='mt-2'>
                    <img src='/images/לוח קיר.png' className='w-50 mx-auto mt-2'></img>
                    <a href="/pdf/pdf1.pdf" target="_blank" rel="noopener noreferrer">
                      <button className='btn btn-outline-secondary border-0'>לצפייה</button>
                    </a>
                    <a href="/pdf/pdf1.pdf" download>
                      <button className='btn btn-outline-primary border-0 me-1 mt-2'>להורדה</button>
                    </a>
                  </div>
                  <hr className='w-75 mx-auto' />
                  <div className='mt-2'>
                    <img src='/images/קהילות רמות.png' className='w-50 mx-auto mt-2'></img>
                    <a href="/pdf/pdf1.pdf" target="_blank" rel="noopener noreferrer">
                      <button className='btn btn-outline-secondary border-0'>לצפייה</button>
                    </a>
                    <a href="/pdf/pdf1.pdf" download>
                      <button className='btn btn-outline-primary border-0 me-1 mt-2'>להורדה</button>
                    </a>
                  </div>
                  <hr className='w-75 mx-auto' />
                  <div className='mt-2'>
                    <img src='/images/קהילות רמות.png' className='w-50 mx-auto mt-2'></img>
                    <a href="/pdf/pdf1.pdf" target="_blank" rel="noopener noreferrer">
                      <button className='btn btn-outline-secondary border-0'>לצפייה</button>
                    </a>
                    <a href="/pdf/pdf1.pdf" download>
                      <button className='btn btn-outline-primary border-0 me-1 mt-2'>להורדה</button>
                    </a>
                  </div>
                  <hr className='w-75 mx-auto' />
                  <div className='mt-2'>
                    <img src='/images/קהילות רמות.png' className='w-50 mx-auto mt-2'></img>
                    <a href="/pdf/pdf1.pdf" target="_blank" rel="noopener noreferrer">
                      <button className='btn btn-outline-secondary border-0'>לצפייה</button>
                    </a>
                    <a href="/pdf/pdf1.pdf" download>
                      <button className='btn btn-outline-primary border-0 me-1 mt-2'>להורדה</button>
                    </a>
                  </div>
                </div>
                <div className='scroll-card shadow-sm text-center mt-3' style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  <h4 className='font-bold'>קופונים לחנויות</h4>
                  <div className='mt-2'>
                    <ul className='list-unstyled'>
                      <li className='mb-3 border-bottom pb-2'>
                        <p className='mb-1'><strong>קופון 1:</strong> <span>10% הנחה על רכישות מעל 100 ש"ח</span></p>
                        <button className='btn btn-link' onClick={toggleCodes}>
                          {showCodes ? 'הסתר קוד קופון' : 'הצג קוד קופון'}
                        </button>
                        {showCodes && <p className='text-muted'>קוד קופון: <strong>DISCOUNT10</strong></p>}
                      </li>
                      <li className='mb-3 border-bottom pb-2'>
                        <p className='mb-1'><strong>קופון 2:</strong> <span>15% הנחה על כל המוצרים</span></p>
                        <button className='btn btn-link' onClick={toggleCodes}>
                          {showCodes ? 'הסתר קוד קופון' : 'הצג קוד קופון'}
                        </button>
                        {showCodes && <p className='text-muted'>קוד קופון: <strong>SAVE15</strong></p>}
                      </li>
                      <li className='mb-3 border-bottom pb-2'>
                        <p className='mb-1'><strong>קופון 3:</strong> <span>קנה אחד קבל אחד חינם על פריטים נבחרים</span></p>
                        <button className='btn btn-link' onClick={toggleCodes}>
                          {showCodes ? 'הסתר קוד קופון' : 'הצג קוד קופון'}
                        </button>
                        {showCodes && <p className='text-muted'>קוד קופון: <strong>BOGOFREE</strong></p>}
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className="news-card shadow-sm p-3 mb-3 rounded">
                  <h4 className="font-bold text-center mb-3">חדשות</h4>
                  <div className="news-container">
                    <ul className="list-unstyled news-list">
                      <li className="mb-4 news-item border-bottom pb-3">
                        <h5 className="font-weight-bold">כותרת החדשה הראשונה</h5>
                        <p className="text-muted">תיאור קצר של החדשה הראשונה. זה יכול להיות עדכון חשוב או אירוע מעניין בקהילה.</p>
                        <div className="news-image">
                          <img src="/images/car1.jpg" alt="תמונת חדשות" className="img-fluid rounded" />
                        </div>
                      </li>
                      <li className="mb-4 news-item border-bottom pb-3">
                        <h5 className="font-weight-bold">כותרת החדשה השנייה</h5>
                        <p className="text-muted">תיאור קצר של החדשה השנייה. זה יכול להיות הודעה על אירוע קרוב או שינוי חשוב.</p>
                        <div className="news-image">
                          <img src="/images/car1.jpg" alt="תמונת חדשות" className="img-fluid rounded" />
                        </div>
                      </li>
                      <li className="news-item">
                        <h5 className="font-weight-bold">כותרת החדשה השלישית</h5>
                        <p className="text-muted">תיאור קצר של החדשה השלישית. זה יכול להיות סיפור מעניין או הישג של חבר קהילה.</p>
                        <div className="news-image">
                          <img src="/images/car1.jpg" alt="תמונת חדשות" className="img-fluid rounded" />
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="text-center mt-3">
                    <button className="btn btn-outline-primary">לכל החדשות</button>
                  </div>
                </div>
              </Col>
              <Col lg={3}>
                <div className='shadow-sm p-1 scroll-card mb-3' style={{ maxHeight: '500px', overflowY: 'auto' }}>
                  <CelebrationsContent />
                </div>
                <div className='shadow-sm p-1 scroll-card my-3' style={{ maxHeight: '500px', overflowY: 'auto' }}>
                  <EvelContent />
                </div>
              </Col>
            </Row>

          </div>
        </Col >
        <Col lg={2} className="d-none d-lg-block ">
          <div className="ad-container">
            <div className="ad-space">
              <img src='/images/timegif.webp' className='rounded' />
            </div>
          </div>
        </Col>
      </Row>
      {/* <div className="tab-buttons">
        <button className={`tab-button ${activeTab === 'judaism' ? 'active' : ''}`} onClick={() => setActiveTab('judaism')}>
          <FaBook /> יהדות
        </button>
        <button className={`tab-button ${activeTab === 'publications' ? 'active' : ''}`} onClick={() => setActiveTab('publications')}>
          <FaNewspaper /> פרסומים
        </button>
        <button className={`tab-button ${activeTab === 'celebrations' ? 'active' : ''}`} onClick={() => setActiveTab('celebrations')}>
          <FaGlassCheers /> שמחות
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'judaism' && <JudaismContent />}
        {activeTab === 'publications' && <PublicationsContent />}
        {activeTab === 'celebrations' && <CelebrationsContent />}
      </div> */}
    </div>
  );
};

export default AllFamilyPage;