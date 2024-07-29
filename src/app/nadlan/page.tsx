"use client"
import React, { useEffect, useRef, useState } from 'react'
import { CldImage } from 'next-cloudinary';
import { Card, Badge, Button, Modal, Form, Row, Col, Container } from 'react-bootstrap';
import Link from 'next/link';
import { faCloudUploadAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CldUploadButton } from 'next-cloudinary';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export const dynamic = 'auto';

export default function RealEstate() {
  const router = useRouter();
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
  const [image, setImage] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [nadlanAr, setNadlanAr] = useState([]);
  const [filters, setFilters] = useState({
    type: 'all',
    rooms: 'all',
    priceRange: 'all'
  });
  const [showAddModal, setShowAddModal] = useState(false);
  // const [newProperty, setNewProperty] = useState<Property>({
  //   id: 0,
  //   type: '',
  //   rooms: 0,
  //   price: 0,
  //   address: '',
  //   image: ''
  // });
  const typeRef = useRef<HTMLSelectElement>(null);
  const roomsRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  // const imageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleAddModalClose = () => {
    setShowAddModal(false);
    // setNewProperty({
    //   id: 0,
    //   type: '',
    //   rooms: 0,
    //   price: 0,
    //   address: '',
    //   image: ''
    // });
  };

  const handleAddModalShow = () => {
    setShowAddModal(true);
  };

  const handleNewPropertyChange = (e: any) => {
    // setNewProperty({ ...newProperty, [e.target.name]: e.target.value });
  };

  const handleAddProperty = () => {
    //  e.preventDefault();
    doApiPost()
    // const newId = properties.length > 0 ? Math.max(...properties.map((p: any) => p.id)) + 1 : 1;
    // const propertyToAdd: Property = {
    //   id: newId,
    //   type: newProperty.type,
    //   rooms: newProperty.rooms,
    //   price: newProperty.price,
    //   address: newProperty.address,
    //   image: newProperty.image
    // };

    // setProperties(prevProperties => [...prevProperties, propertyToAdd]);
    // doApiPost()
  };

  const fetchProperties = async () => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/nadlan`;
    const resp = await fetch(url, { cache: 'no-store' })
    const data = await resp.json();
    console.log(data);
    // const mockData: any = [
    //   { id: 1, type: 'מכירה', rooms: 3, price: 1500000, address: 'רחוב הרצל 10', image: 'house1_hsfjft' },
    //   { id: 2, type: 'השכרה', rooms: 2, price: 4000, address: 'רחוב ויצמן 5', image: 'house2_hgpkdz' },
    // ];
    setNadlanAr(data)
    setProperties(data);
    
  };

  const doApiPost = async () => {
    // e.preventDefault();

    const type = typeRef.current?.value;
    const rooms = roomsRef.current?.value;
    const price = priceRef.current?.value;
    const address = addressRef.current?.value;
    // const image = imageRef.current?.value;

    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/nadlan`, {
        method: 'POST',
        body: JSON.stringify({ type, rooms, price, address, image }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await resp.json();
      console.log(data);
      handleClose();
      // props.doApi();
      fetchProperties();
      router.push('/nadlan');
      // props.setAddForum(!props.addForum);
    } catch (error: any) {
      console.error('Error:', error);
    }
  }

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

  const handleUploadSuccess = (result: any) => {
    if (result.event === 'success') {
      const publicId = result.info.public_id;
      const fileName = publicId.split('/').pop();
      setImage(fileName);
      setUploadedImageUrl(result.info.secure_url); // שמירת ה-URL של התמונה שהועלתה
      toast.success('התמונה הועלתה בהצלחה');
    }
    // setNewProperty(prev => ({ ...prev, image: result.info.secure_url }));
  };

  // const handleRemoveImage = () => {
  
  //   // setNewProperty(prev => ({ ...prev, image: '' }));
  // };

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
            {nadlanAr.map((item:any, index:any) => (
              <React.Fragment key={item._id}>
                <Col md={4} className="mb-4">
                  <Card className='shadow-sm hover-card h-100'>
                    <CldImage
                      src={item.image}
                      width="400"
                      height="300"
                      crop="fill"
                      alt={`תמונה של ${item.address}`}
                      className="card-img-top"
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{item.address}</Card.Title>
                      <Card.Text>
                        {item.rooms} חדרים
                        <br />
                        מחיר: {item.type === 'מכירה' ?
                          `${item.price.toLocaleString()} ₪` :
                          `${item.price.toLocaleString()} ₪ לחודש`}
                      </Card.Text>
                      <Badge bg={item.type === 'מכירה' ? 'primary' : 'success'} className="mb-2">
                        {item.type}
                      </Badge>
                      <Button variant="outline-primary" className="mt-auto" onClick={() => handleShow(item)}>
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
      <Modal show={showAddModal} onHide={handleAddModalClose} centered size="lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>הוסף נכס חדש</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => {
            e.preventDefault();
            handleAddProperty();
          }}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>סוג עסקה</Form.Label>
                  <Form.Select ref={typeRef} name="type" required className="form-control-lg" onChange={handleNewPropertyChange}>
                    <option value="">בחר סוג עסקה</option>
                    <option value="מכירה">מכירה</option>
                    <option value="השכרה">השכרה</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>מספר חדרים</Form.Label>
                  <Form.Control ref={roomsRef} type="number" name="rooms" required className="form-control-lg" onChange={handleNewPropertyChange} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>מחיר</Form.Label>
                  <Form.Control type="number" name="price" required className="form-control-lg" ref={priceRef} onChange={handleNewPropertyChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>כתובת</Form.Label>
                  <Form.Control type="text" name="address" required className="form-control-lg" ref={addressRef} onChange={handleNewPropertyChange} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>תמונה</Form.Label>
              <div className="d-flex align-items-center">
                <CldUploadButton
                  className='btn btn-outline-primary me-2'
                  uploadPreset="my_upload_test"
                  onSuccess={(result) => {
                    // הנח שיש לך פונקציה שמטפלת בהצלחת ההעלאה
                    handleUploadSuccess(result);
                  }}
                  onError={(error) => {
                    console.error('Upload error:', error);
                    toast.error('העלאה נכשלה. ייתכן שהקובץ גדול מדי או בפורמט לא נתמך.');
                  }}
                  options={{
                    sources: ['local'],
                    maxFileSize: 5000000,
                    maxImageWidth: 2000,
                    maxImageHeight: 2000,
                    clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
                  }}
                >
                  <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" />
                  העלאת תמונה
                </CldUploadButton>
                {uploadedImageUrl && (
                  <div className="position-relative ms-2">
                    <img
                      src={uploadedImageUrl}
                      alt="תמונה שהועלתה"
                      className="img-thumbnail"
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      className="position-absolute top-0 start-100 translate-middle rounded-circle p-1"
                      onClick={() => {
                        // הנח שיש לך פונקציה שמטפלת במחיקת התמונה
                        setUploadedImageUrl("");
                        setImage("");
                      }}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  </div>
                )}
              </div>
            </Form.Group>
            <div className="text-end">
              <Button variant="secondary" onClick={handleAddModalClose} className="me-2">
                ביטול
              </Button>
              <Button variant="primary" type="submit">
                הוסף נכס
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}
