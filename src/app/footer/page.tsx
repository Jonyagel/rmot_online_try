"use client"
import React from 'react';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import './footer.css'

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <Container>
        <Row className="gx-5">
          <Col md={3} className="mb-4">
            <h5 className="mb-3 text-primary fw-bold">ניווט מהיר</h5>
            <ul className="list-unstyled footer-links">
              <li><Link href="/forum" className="text-light text-decoration-none">פורומים</Link></li>
              <li><Link href="/nadlan" className="text-light text-decoration-none">נדל"ן</Link></li>
              <li><Link href="/board" className="text-light text-decoration-none">גמח"ים</Link></li>
              <li><Link href="/board" className="text-light text-decoration-none">אבידות ומציאות</Link></li>
            </ul>
          </Col>
          <Col md={3} className="mb-4">
            <h5 className="mb-3 text-primary fw-bold">שירותים קהילתיים</h5>
            <ul className="list-unstyled footer-links">
              <li><i className="bi bi-building me-2 text-primary"></i>זמני תפילה</li>
              <li><i className="bi bi-book me-2 text-primary"></i>שיעורי תורה</li>
              <li><i className="bi bi-people me-2 text-primary"></i>התנדבות</li>
              <li><i className="bi bi-calendar-event me-2 text-primary"></i>לוח אירועים</li>
            </ul>
          </Col>
          <Col md={3} className="mb-4">
            <h5 className="mb-3 text-primary fw-bold">צור קשר</h5>
            <p><i className="bi bi-telephone me-2 text-primary"></i>123-456-7890</p>
            <p><i className="bi bi-envelope me-2 text-primary"></i>info@shchuna.co.il</p>
            <div className="mt-3">
              <a href="#" className="text-light me-3"><i className="bi bi-facebook fs-4"></i></a>
              <a href="#" className="text-light me-3"><i className="bi bi-twitter fs-4"></i></a>
              <a href="#" className="text-light"><i className="bi bi-instagram fs-4"></i></a>
            </div>
          </Col>
          <Col md={3} className="mb-4">
            <h5 className="mb-3 text-primary fw-bold">הצטרפו אלינו</h5>
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
        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} אתר המידע השכונתי. כל הזכויות שמורות.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;