"use client"
import React, { useEffect, useState } from 'react'
import { CldImage } from 'next-cloudinary';
import { Card, Badge, Button, Modal, Form, Row, Col, Container } from 'react-bootstrap';
import Link from 'next/link';

export const dynamic = 'auto';

export default function RealEstate() {
  interface Property {
    id: number;
    type: string;
    rooms: number;
    price: number;
    address: string;
    image: string;
  }
  const [properties, setProperties] = useState<Property[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filters, setFilters] = useState({
    type: 'all',
    rooms: 'all',
    priceRange: 'all'
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProperty, setNewProperty] = useState<Property>({
    id: 0,
    type: '',
    rooms: 0,
    price: 0,
    address: '',
    image: ''
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleAddModalClose = () => {
    setShowAddModal(false);
    setNewProperty({
      id: 0,
      type: '',
      rooms: 0,
      price: 0,
      address: '',
      image: ''
    });
  };

  const handleAddModalShow = () => {
    setShowAddModal(true);
  };

  const handleNewPropertyChange = (e: any) => {
    setNewProperty({ ...newProperty, [e.target.name]: e.target.value });
  };

  const handleAddProperty = () => {
    const newId = properties.length > 0 ? Math.max(...properties.map((p: any) => p.id)) + 1 : 1;
    const propertyToAdd: Property = {
      id: newId,
      type: newProperty.type,
      rooms: newProperty.rooms,
      price: newProperty.price,
      address: newProperty.address,
      image: newProperty.image
    };

    setProperties(prevProperties => [...prevProperties, propertyToAdd]);
  };

  const fetchProperties = async () => {
    const mockData: any = [
      { id: 1, type: 'מכירה', rooms: 3, price: 1500000, address: 'רחוב הרצל 10', image: 'house1_hsfjft' },
      { id: 2, type: 'השכרה', rooms: 2, price: 4000, address: 'רחוב ויצמן 5', image: 'house2_hgpkdz' },
    ];
    setProperties(mockData);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedProperty(null);
  };

  const handleShow = (property: any) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  const handleFilterChange = (e: any) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredProperties = properties.filter((property: any) => {
    return (filters.type === 'all' || property.type === filters.type) &&
      (filters.rooms === 'all' || property.rooms.toString() === filters.rooms) &&
      (filters.priceRange === 'all' ||
        (filters.priceRange === 'low' && property.price < 1000000) ||
        (filters.priceRange === 'medium' && property.price >= 1000000 && property.price < 2000000) ||
        (filters.priceRange === 'high' && property.price >= 2000000));
  });

  return (
    <div className='container-fluid'>
      <Row>
        {/* מקום לפרסומת בצד שמאל */}
        <Col md={2} className="d-none d-md-block">
          <div style={{
            position: 'sticky',
            top: '100px',
            overflowY: 'auto'
          }}>
            <div className="p-3">
              <img
                src="/images/bookgif.gif"
                alt="תיאור הפרסומת"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </Col>

        {/* תוכן ראשי */}
        <Col md={8}>
          <h1 className="mb-4 text-7xl text-primary">נדל"ן בשכונה</h1>
          <Button variant="primary" className="mb-3" onClick={handleAddModalShow}>
            הוסף נכס חדש
          </Button>
          <Form className="mb-4">
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>סוג עסקה</Form.Label>
                  <Form.Control as="select" name="type" onChange={handleFilterChange}>
                    <option value="all">הכל</option>
                    <option value="מכירה">מכירה</option>
                    <option value="השכרה">השכרה</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>מספר חדרים</Form.Label>
                  <Form.Control as="select" name="rooms" onChange={handleFilterChange}>
                    <option value="all">הכל</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4+</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>טווח מחירים</Form.Label>
                  <Form.Control as="select" name="priceRange" onChange={handleFilterChange}>
                    <option value="all">הכל</option>
                    <option value="low">עד מיליון ₪</option>
                    <option value="medium">1-2 מיליון ₪</option>
                    <option value="high">מעל 2 מיליון ₪</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Form>

          <Row>
            {filteredProperties.map((property, index) => (
              <React.Fragment key={property.id}>
                <Col md={4} className="mb-4">
                  <Card className='shadow-sm hover-card h-100'>
                    <CldImage
                      src={property.image}
                      width="400"
                      height="300"
                      crop="fill"
                      alt={`תמונה של ${property.address}`}
                      className="card-img-top"
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{property.address}</Card.Title>
                      <Card.Text>
                        {property.rooms} חדרים
                        <br />
                        מחיר: {property.type === 'מכירה' ?
                          `${property.price.toLocaleString()} ₪` :
                          `${property.price.toLocaleString()} ₪ לחודש`}
                      </Card.Text>
                      <Badge bg={property.type === 'מכירה' ? 'primary' : 'success'} className="mb-2">
                        {property.type}
                      </Badge>
                      <Button variant="outline-primary" className="mt-auto" onClick={() => handleShow(property)}>
                        פרטים נוספים
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                {/* הכנסת פרסומות בין הכרטיסים במסך קטן */}
                {(index + 1) % 3 === 0 && (
                  <Col xs={12} className="d-md-none mb-4">
                    <div className="text-center">
                      {index % 2 === 0 ? (
                        <img
                          src="/images/bookgif.gif"
                          alt="תיאור הפרסומת"
                          style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
                        />
                      ) : (
                        <img
                          src="/images/timegif.gif"
                          alt="תיאור הפרסומת השנייה"
                          style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
                        />
                      )}
                    </div>
                  </Col>
                )}
              </React.Fragment>
            ))}
          </Row>
        </Col>

        <Col md={2} className="d-none d-md-block">
          <div style={{
            position: 'sticky',
            top: '100px',
            overflowY: 'auto'
          }}>
            <div className="p-3">
              <img
                src="/images/timegif.gif"
                alt="תיאור הפרסומת השנייה"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </Col>
      </Row>

      {/* מודל לפרטי הנכס */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedProperty?.address}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProperty && (
            <>
              <CldImage
                src={selectedProperty.image}
                width="800"
                height="600"
                crop="fill"
                alt={`תמונה של ${selectedProperty.address}`}
                className="img-fluid mb-3"
              />
              <p><strong>סוג עסקה:</strong> {selectedProperty.type}</p>
              <p><strong>מספר חדרים:</strong> {selectedProperty.rooms}</p>
              <p><strong>מחיר:</strong> {selectedProperty.type === 'מכירה' ?
                `${selectedProperty.price.toLocaleString()} ₪` :
                `${selectedProperty.price.toLocaleString()} ₪ לחודש`}</p>
              <p><strong>כתובת:</strong> {selectedProperty.address}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            סגור
          </Button>
          <Button variant="primary">
            צור קשר עם המוכר
          </Button>
        </Modal.Footer>
      </Modal>

      {/* מודל להוספת נכס חדש */}
      <Modal show={showAddModal} onHide={handleAddModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className=''>הוסף נכס חדש</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>סוג עסקה</Form.Label>
              <Form.Control as="select" name="type" onChange={handleNewPropertyChange}>
                <option value="">בחר סוג עסקה</option>
                <option value="מכירה">מכירה</option>
                <option value="השכרה">השכרה</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>מספר חדרים</Form.Label>
              <Form.Control type="number" name="rooms" onChange={handleNewPropertyChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>מחיר</Form.Label>
              <Form.Control type="number" name="price" onChange={handleNewPropertyChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>כתובת</Form.Label>
              <Form.Control type="text" name="address" onChange={handleNewPropertyChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>קישור לתמונה</Form.Label>
              <Form.Control type="text" name="image" onChange={handleNewPropertyChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddModalClose}>
            ביטול
          </Button>
          <Button variant="primary" onClick={handleAddProperty}>
            הוסף נכס
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}