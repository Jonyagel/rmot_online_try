"use client"
import React from 'react';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import './footer.css'

const Footer = () => {
  return (
    <footer className="bg-dark text-light p-3 pt-5 pb-3">
      <Container>
        <Row className="gx-5">
          <Col md={3} className="mb-2">
            <h5 className="mb-3 fw-bold">ניווט מהיר</h5>
            <ul className="list-unstyled footer-links">
              <li><Link href="/forum" className="text-light text-decoration-none">פורומים</Link></li>
              <li><Link href="/nadlan" className="text-light text-decoration-none">נדל"ן</Link></li>
              <li><Link href="/board" className="text-light text-decoration-none">גמח"ים</Link></li>
              <li><Link href="/board" className="text-light text-decoration-none">אבידות ומציאות</Link></li>
            </ul>
          </Col>
          <Col md={3} className="mb-2">
            <h5 className="mb-3 fw-bold">שירותים קהילתיים</h5>
            <ul className="list-unstyled footer-links">
              <li><i className="bi bi-building me-2"></i>זמני תפילה</li>
              <li><i className="bi bi-book me-2"></i>שיעורי תורה</li>
              <li><i className="bi bi-people me-2"></i>התנדבות</li>
              <li><i className="bi bi-calendar-event me-2"></i>לוח אירועים</li>
            </ul>
          </Col>
          <Col md={3} className="mb-2">
            <h5 className="mb-3 fw-bold">צור קשר</h5>
            <p><i className="bi bi-telephone me-2"></i>123-456-7890</p>
            <p><i className="bi bi-envelope me-2"></i>info@shchuna.co.il</p>
          </Col>
          <Col md={3} className="mb-2">
            <h5 className="mb-3 fw-bold">הצטרפו אלינו</h5>
            <p>הירשמו לניוזלטר שלנו לקבלת עדכונים שבועיים</p>
            <form>
              <div className="input-group mb-3" style={{direction:"ltr"}}>
                <input type="email" className="form-control" placeholder="אימייל" aria-label="אימייל" />
                <button className="btn btn-primary" type="button">הרשמה</button>
              </div>
            </form>
          </Col>
        </Row>
        <hr className="mt-4 mb-3 border-secondary" />
        <div className="text-center mb-0">
          <p className="mb-0">&copy; {new Date().getFullYear()} אתר המידע השכונתי רמות אונליין. כל הזכויות שמורות.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;