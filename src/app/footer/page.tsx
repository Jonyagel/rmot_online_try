"use client"
import React from 'react';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import './footer.css'
import { useMemo } from 'react';

const Footer = () => {
  const quickLinks = useMemo(() => [
    { href: "/forum", text: "פורומים" },
    { href: "/nadlan", text: "נדל\"ן" },
    { href: "/board", text: "גמח\"ים" },
    { href: "/board", text: "אבידות ומציאות" },
  ], []);

  const communityServices = useMemo(() => [
    { icon: "bi-building", text: "זמני תפילה" },
    { icon: "bi-book", text: "שיעורי תורה" },
    { icon: "bi-people", text: "התנדבות" },
    { icon: "bi-calendar-event", text: "לוח אירועים" },
  ], []);

  return (
    <footer className="bg-dark text-light p-3 pt-5 pb-3">
      <Container>
        <Row className="gx-5">
          <Col md={3} className="mb-2">
            <h5 className="mb-3 fw-bold">ניווט מהיר</h5>
            <ul className="list-unstyled footer-links">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-light text-decoration-none" aria-label={link.text}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col md={3} className="mb-2">
            <h5 className="mb-3 fw-bold">שירותים קהילתיים</h5>
            <ul className="list-unstyled footer-links">
              {communityServices.map(service => (
                <li key={service.text}>
                  <i className={`bi ${service.icon} me-2`}></i>{service.text}
                </li>
              ))}
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
              <div className="input-group mb-3" style={{ direction: "ltr" }}>
                <input type="email" className="form-control" placeholder="אימייל" aria-label="אימייל" required />
                <button className="btn btn-primary" type="submit">הרשמה</button>
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