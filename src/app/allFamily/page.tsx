'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col, Card, Button, Nav, Badge, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faHeart, faSadTear, faTicketAlt, faCalendarAlt, faChevronRight, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './communityPage.css';
import { CldImage } from 'next-cloudinary';
import EngagementCard from './components/smachot';

const engagementData = {
  id: 1,
  groomName: "אלי רוקובסקי",
  groomFather: "ב\"ר עקיבא שמחה הי\"ו",
  groomInstitution: "ישיבת קניין דעת",
  groomCity: "ירושלים",
  brideName: "נחמה כ\"ץ",
  brideFather: "ב\"ר משה חיים הי\"ו",
  brideInstitution: "סמינר מעלות",
  brideCity: "בית שמש",
  date: "בס\"ד יום שני ד' סיון תשפ\"ד"
};

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('news');

  const renderNews = () => (
    <div className="news-section">
      <div className="main-news">
        <div className="main-news-image">
          <CldImage
            src={'work_street_mo1w1b'}
            width="400"
            height="200"
            crop="fill"
            className="shop-image rounded-t"
            alt="כותרת החדשות הראשית"
            loading='lazy'
            format="auto"
            quality="auto"
          />
          <span className="category">חדשות ראשיות</span>
        </div>
        <div className="main-news-content">
          <h2>כותרת החדשות הראשית</h2>
          <p>תקציר מורחב של החדשות הראשיות...</p>
          <a href="#" className="read-more">קרא עוד <i className="fas fa-chevron-right"></i></a>
        </div>
      </div>
      <div className="secondary-news">
        {[1, 2].map((item) => (
          <div key={item} className="secondary-news-item">
            <div className="secondary-news-image">
              <CldImage
                src={'work_street_mo1w1b'}
                width="400"
                height="200"
                crop="fill"
                className="shop-image rounded-t"
                alt={`כותרת חדשות משנית ${item}`}
                loading='lazy'
                format="auto"
                quality="auto"
              />
            </div>
            <div className="secondary-news-content">
              <span className="category">חדשות</span>
              <h3>כותרת חדשות משנית {item}</h3>
              <p>תקציר קצר של החדשות...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );



  const renderCondolences = () => (
    <Row className="condolences-section">
      {[1, 2, 3, 4].map((item) => (
        <Col lg={3} md={6} key={item} className="mb-4">
          <Card className="condolence-card">
            <Card.Body>
              <Badge bg="secondary" className="mb-2">תנחומים</Badge>
              <Card.Title>משתתפים בצערכם</Card.Title>
              <Card.Text>משפחת לוי על מות יקירם</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted"><FontAwesomeIcon icon={faCalendarAlt} className="me-2" />אתמול</small>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );

  const renderCoupons = () => (
    <Row className="coupons-section">
      {[1, 2, 3].map((item) => (
        <Col lg={4} md={6} key={item} className="mb-4">
          <Card className="coupon-card">
            <Card.Body>
              <Badge bg="warning" text="dark" className="mb-2">קופון</Badge>
              <Card.Title>הנחה {item * 10}%</Card.Title>
              <Card.Text>בחנות {item} - תוקף עד סוף החודש</Card.Text>
              <Button variant="outline-primary" className="mt-2">הצג קופון</Button>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted"><FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />רחוב הראשי {item}</small>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );

  return (
    <Container className="community-container ">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='title text-center mt-5'
      >
        <h1 className="section-title my-4 text-3xl">חיי הקהילה שלנו</h1>
      </motion.div>

      <Nav className="community-nav mb-4" activeKey={activeTab} onSelect={(selectedKey: any) => setActiveTab(selectedKey)}>
        <Nav.Item>
          <Nav.Link eventKey="news"> כתבות</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="celebrations"> שמחות</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="condolences"> תנחומים</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="coupons"> קופונים</Nav.Link>
        </Nav.Item>
      </Nav>

      <section className="content-section">
        {activeTab === 'news' && renderNews()}
        {activeTab === 'celebrations' && <EngagementCard engagementData={engagementData}/>}
        {activeTab === 'condolences' && renderCondolences()}
        {activeTab === 'coupons' && renderCoupons()}
      </section>
    </Container>
  );
};

export default CommunityPage;