"use client"
import React from 'react';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import './footer.css'

const Footer = () => {
  return (
    <footer className="bg-light text-dark py-4 mt-5">
      <Container>
        <Row>
          <Col md={3} className="mb-3">
            <h5 className="mb-3">ניווט מהיר</h5>
            <ul className="list-unstyled">
              <li><Link href="/forums">פורומים</Link></li>
              <li><Link href="/real-estate">נדל"ן</Link></li>
              <li><Link href="/gemachs">גמח"ים</Link></li>
              <li><Link href="/lost-and-found">אבידות ומציאות</Link></li>
            </ul>
          </Col>
          <Col md={3} className="mb-3">
            <h5 className="mb-3">שירותים קהילתיים</h5>
            <ul className="list-unstyled">
              <li><i className="bi bi-building me-2"></i>זמני תפילה</li>
              <li><i className="bi bi-book me-2"></i>שיעורי תורה</li>
              <li><i className="bi bi-people me-2"></i>התנדבות</li>
              <li><i className="bi bi-calendar-event me-2"></i>לוח אירועים</li>
            </ul>
          </Col>
          <Col md={3} className="mb-3">
            <h5 className="mb-3">צור קשר</h5>
            <p><i className="bi bi-telephone me-2"></i>123-456-7890</p>
            <p><i className="bi bi-envelope me-2"></i>info@shchuna.co.il</p>
          </Col>
          <Col md={3} className="mb-3">
            <h5 className="mb-3">הצטרפו אלינו</h5>
            <p>הירשמו לניוזלטר שלנו לקבלת עדכונים שבועיים</p>
            <form>
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="אימייל" aria-label="אימייל" />
                <button className="btn btn-primary" type="button">הרשמה</button>
              </div>
            </form>
          </Col>
        </Row>
        <hr />
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} אתר המידע השכונתי. כל הזכויות שמורות.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;