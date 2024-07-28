"use client"
import React, { useState } from 'react'
import { Form, Button, Card, Row, Col, Alert, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import './ContactUs.css';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactUs() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Container fluid className="contact-page-container p-0">
      <div className="contact-header text-center py-5">
        <h1 className="display-4 text-white mb-4">צור קשר עם מנהלי האתר</h1>
        <p className="lead text-white">נשמח לעמוד לרשותך בכל שאלה או בקשה</p>
      </div>

      <Container className="py-5">
        {showAlert && (
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible className="mb-4">
            <Alert.Heading>תודה שפנית אלינו!</Alert.Heading>
            <p>הודעתך נשלחה בהצלחה. נחזור אליך בהקדם האפשרי.</p>
          </Alert>
        )}

        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="shadow-lg border-0 rounded-lg">
              <Card.Body className="p-5">
                <Row>
                  <Col md={6} className="mb-4 mb-md-0">
                    <h3 className="h4 mb-4 text-primary">שלח לנו הודעה</h3>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>שם מלא</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="הכנס את שמך המלא"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="rounded-pill"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>כתובת אימייל</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="הכנס את כתובת האימייל שלך"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="rounded-pill"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formSubject">
                        <Form.Label>נושא</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="נושא ההודעה"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="rounded-pill"
                        />
                      </Form.Group>

                      <Form.Group className="mb-4" controlId="formMessage">
                        <Form.Label>תוכן ההודעה</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          placeholder="כתוב את הודעתך כאן"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          className="rounded"
                        />
                      </Form.Group>

                      <Button variant="primary" type="submit" className="w-100 rounded-pill py-2">
                        שלח הודעה
                      </Button>
                    </Form>
                  </Col>
                  <Col md={6}>
                    <h3 className="h4 mb-4 text-primary">פרטי התקשרות</h3>
                    <ul className="list-unstyled contact-info">
                      <li className="mb-3">
                        <FontAwesomeIcon icon={faEnvelope} className="me-2 text-primary" />
                        <strong>אימייל:</strong> contact@example.com
                      </li>
                      <li className="mb-3">
                        <FontAwesomeIcon icon={faPhone} className="me-2 text-primary" />
                        <strong>טלפון:</strong> 03-1234567
                      </li>
                      <li className="mb-3">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-primary" />
                        <strong>כתובת:</strong> רחוב הרצל 1, תל אביב
                      </li>
                      <li className="mb-3">
                        <FontAwesomeIcon icon={faClock} className="me-2 text-primary" />
                        <strong>שעות פעילות:</strong>
                        <br />
                        ימים א'-ה': 9:00-17:00
                        <br />
                        יום ו': 9:00-13:00
                        <br />
                        שבת: סגור
                      </li>
                    </ul>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <Card className="shadow-lg border-0 rounded-lg overflow-hidden">
              <Card.Body className="p-0">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.380753924691!2d34.77977881547096!3d32.06438358119007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4b82a6148a07%3A0x1074b63ef7e111be!2z16jXl9eV15Eg15TXqNeQ15w!5e0!3m2!1siw!2sil!4v1627910358029!5m2!1siw!2sil" 
                  width="100%" 
                  height="400" 
                  style={{border:0}} 
                  allowFullScreen={true} 
                  loading="lazy">
                </iframe>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}