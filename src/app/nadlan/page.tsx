"use client"
import React, { useEffect, useState } from 'react'
import { CldImage } from 'next-cloudinary';
import { Card, Badge, Button, Modal, Form, Row, Col } from 'react-bootstrap';
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
  const [properties, setProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filters, setFilters] = useState({
    type: 'all',
    rooms: 'all',
    priceRange: 'all'
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    // כאן תוכל להוסיף קריאת API אמיתית
    const mockData :any = [
      { id: 1, type: 'מכירה', rooms: 3, price: 1500000, address: 'רחוב הרצל 10', image: 'house1_hsfjft' },
      { id: 2, type: 'השכרה', rooms: 2, price: 4000, address: 'רחוב ויצמן 5', image: 'house2_hgpkdz' },
      // ... עוד נכסים
    ];
    setProperties(mockData);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedProperty(null);
  };

  const handleShow = (property:any) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  const handleFilterChange = (e:any) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredProperties = properties.filter((property:any) => {
    return (filters.type === 'all' || property.type === filters.type) &&
           (filters.rooms === 'all' || property.rooms.toString() === filters.rooms) &&
           (filters.priceRange === 'all' || 
            (filters.priceRange === 'low' && property.price < 1000000) ||
            (filters.priceRange === 'medium' && property.price >= 1000000 && property.price < 2000000) ||
            (filters.priceRange === 'high' && property.price >= 2000000));
  });

  return (
    <div className='container mt-5'>
      <h1 className="mb-4">נדל"ן בשכונה</h1>
      
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
        {filteredProperties.map((property:any) => (
          <Col key={property.id} md={4} className="mb-4">
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
        ))}
      </Row>

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
              {/* כאן תוכל להוסיף פרטים נוספים על הנכס */}
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
    </div>
  )
}