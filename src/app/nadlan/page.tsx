"use client"
import React, { useEffect, useRef, useState } from 'react'
import { CldImage, CldUploadButton } from 'next-cloudinary';
import { Card, Badge, Button, Modal, Form, Row, Col, Container, Carousel, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBuilding, faCalendarAlt, faCar, faCloudUploadAlt, faCouch, faElevator, faHome, faPhone, faRulerCombined, faSun, faTimes, faBell } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import emailjs from '@emailjs/browser';


export const dynamic = 'auto';

export default function RealEstate() {
  const router = useRouter();
  interface Property {
    id: number;
    type: string;
    rooms: number;
    price: number;
    address: string;
    size: number;
    floor: number;
    elevator: string;
    parking: string;
    entryDate: string;
    direction: string;
    condition: string;
    description: string;
    images: [string];
  }
  interface NadlanItem {
    rooms: number;
    price: number;
    type: string;
    address: string;
    // הוסף שדות נוספים אם יש
  }
  const [properties, setProperties] = useState<Property[]>([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [sendemailAr, setSendemailAr] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [nadlanAr, setNadlanAr] = useState<NadlanItem[]>([]);
  const [filters, setFilters] = useState({
    type: 'all',
    rooms: 'all',
    priceRange: 'all'
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAlertForm, setShowAlertForm] = useState(false);
  const [userEmail, setUserEmail] = useState([]);
  const [nadlanPosted, setNadlanPosted] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [status, setStatus] = useState<string>('');

  const typeRef = useRef<HTMLSelectElement>(null);
  const roomsRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const elevatorRef = useRef<HTMLSelectElement>(null);
  const parkingRef = useRef<HTMLSelectElement>(null);
  const sizeRef = useRef<HTMLInputElement>(null);
  const floorRef = useRef<HTMLInputElement>(null);
  const entryDateRef = useRef<HTMLInputElement>(null);
  const directionRef = useRef<HTMLInputElement>(null);
  const conditionRef = useRef<HTMLSelectElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const emailAlertRef = useRef<HTMLInputElement>(null);
  const typeAlertRef = useRef<HTMLSelectElement>(null);
  const roomsAlertRef = useRef<HTMLInputElement>(null);
  const priceAlertRef = useRef<HTMLInputElement>(null);
  const addressAlertRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
    fetchProperties();
  }, []);

  const handleAddModalClose = () => {
    setShowAddModal(false);

  };

  const handleAddModalShow = () => {
    setShowAddModal(true);
  };

  // const handleNewPropertyChange = (e: any) => {

  // };


 const sendEmailToUser = async (dadaPosted: any, emails: string[]) => {
  try {
    const uniqueEmails = [...new Set(emails)]; // Remove duplicates
    
    for (const email of uniqueEmails) {
      const templateParams = {
        to_email: email,
        from_name: "Ramot Online Try",
        property_type: dadaPosted.type,
        property_rooms: dadaPosted.rooms,
        property_price: dadaPosted.price,
        property_address: dadaPosted.address,
      };

      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID2!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      console.log('Email sent successfully to:', email, result.text);
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

  // const checkAndSendAlerts = async (newProperty: any) => {
  //   try {
  //     const response = await fetch('/api/matchingAlerts', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(newProperty),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const matchingUsers = await response.json();

  //     // Send email to each matching user
  //     for (const user of matchingUsers) {
  //       await sendEmailToUser(user.to_email, newProperty);
  //     }

  //     console.log(`Sent alerts to ${matchingUsers.length} users`);
  //   } catch (error) {
  //     console.error('Error checking and sending alerts:', error);
  //   }
  // };

  const handleAlertFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const alertData = {
      to_email: emailAlertRef.current?.value,
      type: typeAlertRef.current?.value,
      rooms: roomsAlertRef.current?.value,
      price: priceAlertRef.current?.value,
      address: addressAlertRef.current?.value,
    };
    console.log(alertData);
    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/alertMachingNadlan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alertData),
      });


      setStatus('הודעה נשלחה בהצלחה!');
      setShowAlert(true);
      setShowAlertForm(false);
    } catch (error) {
      console.error('Error submitting alert form:', error);
      setStatus('אירעה שגיאה בשליחת ההודעה. אנא נסה שוב.');
      setShowAlert(true);
    }
    setTimeout(() => setShowAlert(false), 5000);
  };


  // const handleUploadSuccess = (result:any) => {
  //   setUploadedImageUrls(prev => [...prev, result.info.secure_url]);
  // };

  const removeImage = (index: any) => {
    setUploadedImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddProperty = () => {
    doApiPost()
  };

 const doApiGetEmail = async () => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/alertMachingNadlan?rooms=${nadlanAr[0].rooms}&price=${nadlanAr[0].price}`;
  const resp = await fetch(url, { cache: 'no-store' })
  const data = await resp.json();
  console.log(data);
  const emails = data.map(item => item.to_email);
  setSendemailAr(data)
  return emails;
};

  const fetchProperties = async () => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/nadlan`;
    const resp = await fetch(url, { cache: 'no-store' })
    const data = await resp.json();
    console.log(data);
    setNadlanAr(data)
    setProperties(data);
  };

  const doApiPost = async () => {
    const type = typeRef.current?.value;
    const rooms = roomsRef.current?.value;
    const price = priceRef.current?.value;
    const address = addressRef.current?.value;
    const size = sizeRef.current?.value;
    const floor = floorRef.current?.value;
    const elevator = elevatorRef.current?.value;
    const parking = parkingRef.current?.value;
    const entryDate = entryDateRef.current?.value;
    const direction = directionRef.current?.value;
    const condition = conditionRef.current?.value;
    const description = descriptionRef.current?.value;
     try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/nadlan`, {
      method: 'POST',
      body: JSON.stringify({ type, rooms, price, address, images, size, floor, elevator, parking, entryDate, direction, condition, description }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await resp.json();
    console.log(data);
    setNadlanPosted(data);
    const emails = await doApiGetEmail();
    await sendEmailToUser(data, emails);
    setStatus('הודעות נשלחו בהצלחה!');
    setShowAlert(true);
    handleAddModalClose();
    fetchProperties();
    router.push('/nadlan');
  } catch (error: any) {
    console.error('Error:', error);
    setStatus('אירעה שגיאה בשליחת ההודעות. אנא נסה שוב.');
    setShowAlert(true);
  }
  setTimeout(() => setShowAlert(false), 5000);
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
      setImages(prev => [...prev, fileName]);
      setUploadedImageUrls(prev => [...prev, result.info.secure_url]); // שמירת ה-URL של התמונה שהועלתה
      toast.success('התמונה הועלתה בהצלחה');
    }
  };



  // const checkAndSendAlerts = async (newProperty:any) => {
  //   try {
  //     const response = await fetch('/api/matchingAlerts', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(newProperty),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const matchingUsers = await response.json();

  //     // שליחת מייל לכל משתמש מתאים
  //     for (const user of matchingUsers) {
  //       await (user.to_email, newProperty);
  //     }
  //   } catch (error) {
  //     console.error('Error checking and sending alerts:', error);
  //   }
  // };

  return (
    <div className='container-fluid'>
      {showAlert && (
          <Alert variant={status.includes('בהצלחה') ? "success" : "danger"} onClose={() => setShowAlert(false)} dismissible className="mb-4">
            <Alert.Heading>{status.includes('בהצלחה') ? "תודה שפנית אלינו!" : "שגיאה"}</Alert.Heading>
            <p>{status}</p>
          </Alert>
        )}
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
          <Button variant="info" className="mb-3" onClick={() => setShowAlertForm(true)}>
            <FontAwesomeIcon icon={faBell} className="me-2" />
            הירשם להתראות
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
            {nadlanAr.map((item: any, index: any) => (
              <React.Fragment key={item._id}>
                <Col md={4} className="mb-4">
                  <Card className='shadow-sm hover-card h-100 transition-all duration-300 transform hover:scale-105'>
                    <CldImage
                      src={item.images[0]} // השתמש בתמונה הראשונה מהמערך
                      width="400"
                      height="300"
                      crop="fill"
                      alt={`תמונה של ${item.address}`}
                      className="card-img-top"
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="font-bold text-xl mb-2">{item.address}</Card.Title>
                      <Card.Text>
                        <div className="grid grid-cols-2 gap-2">
                          <div><FontAwesomeIcon icon={faBed} className="mr-2 text-primary" /> {item.rooms} חדרים</div>
                          <div><FontAwesomeIcon icon={faRulerCombined} className="mr-2 text-primary" /> {item.size} מ"ר</div>
                          <div><FontAwesomeIcon icon={faBuilding} className="mr-2 text-primary" /> קומה {item.floor}</div>
                          <div><FontAwesomeIcon icon={faElevator} className="mr-2 text-primary" /> {item.elevator == "true" ? 'יש מעלית' : 'אין מעלית'}</div>
                          <div><FontAwesomeIcon icon={faCar} className="mr-2 text-primary" /> {item.parking == "true" ? 'יש חניה' : 'אין חניה'}</div>
                          <div><FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-primary" /> כניסה: {item.entryDate}</div>
                        </div>
                        <div className="mt-2 font-bold text-lg text-primary">
                          מחיר: {item.type === 'מכירה' ?
                            `${item.price.toLocaleString()} ₪` :
                            `${item.price.toLocaleString()} ₪ לחודש`}
                        </div>
                      </Card.Text>
                      <Badge bg={item.type === 'מכירה' ? 'primary' : 'success'} className="mb-2 text-sm">
                        {item.type}
                      </Badge>
                      <Button variant="outline-primary" className="mt-auto hover:bg-primary hover:text-white transition-all duration-300" onClick={() => handleShow(item)}>
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
      <Modal show={showModal} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>{selectedProperty?.address}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProperty && (
            <div className="row">
              <div className="col-md-6">
                <Carousel>
                  {selectedProperty.images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <CldImage
                        src={image}
                        width={600}
                        height={400}
                        crop="fill"
                        alt={`תמונה ${index + 1} של ${selectedProperty.address}`}
                        className="img-fluid rounded shadow"
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
              <div className="col-md-6">
                <h3 className="mb-4 text-primary">פרטי הנכס</h3>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <p><FontAwesomeIcon icon={faHome} className="mr-2 text-primary" /> <strong>סוג עסקה:</strong> {selectedProperty.type}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <p><FontAwesomeIcon icon={faBed} className="mr-2 text-primary" /> <strong>מספר חדרים:</strong> {selectedProperty.rooms}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <p><FontAwesomeIcon icon={faRulerCombined} className="mr-2 text-primary" /> <strong>שטח:</strong> {selectedProperty.size} מ"ר</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <p><FontAwesomeIcon icon={faBuilding} className="mr-2 text-primary" /> <strong>קומה:</strong> {selectedProperty.floor}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <p><FontAwesomeIcon icon={faElevator} className="mr-2 text-primary" /> <strong>מעלית:</strong> {selectedProperty.elevator ? 'יש' : 'אין'}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <p><FontAwesomeIcon icon={faCar} className="mr-2 text-primary" /> <strong>חניה:</strong> {selectedProperty.parking ? 'יש' : 'אין'}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <p><FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-primary" /> <strong>תאריך כניסה:</strong> {selectedProperty.entryDate}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <p><FontAwesomeIcon icon={faSun} className="mr-2 text-primary" /> <strong>כיוון אוויר:</strong> {selectedProperty.direction}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <p><FontAwesomeIcon icon={faCouch} className="mr-2 text-primary" /> <strong>מצב הנכס:</strong> {selectedProperty.condition}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-primary mb-3">תיאור הנכס</h4>
                  <p>{selectedProperty.description}</p>
                </div>
                <div className="mt-4">
                  <h4 className="text-primary mb-3">מחיר</h4>
                  <p className="h3 text-success">
                    {selectedProperty.type === 'מכירה'
                      ? `${selectedProperty.price.toLocaleString()} ₪`
                      : `${selectedProperty.price.toLocaleString()} ₪ לחודש`}
                  </p>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            סגור
          </Button>
          <Button variant="primary">
            <FontAwesomeIcon icon={faPhone} className="mr-2" /> צור קשר עם המוכר
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
                  <Form.Select ref={typeRef} name="type" required className="form-control-lg">
                    <option value="">בחר סוג עסקה</option>
                    <option value="מכירה">מכירה</option>
                    <option value="השכרה">השכרה</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>מספר חדרים</Form.Label>
                  <Form.Control ref={roomsRef} type="number" name="rooms" required className="form-control-lg" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>מחיר</Form.Label>
                  <Form.Control type="number" name="price" required className="form-control-lg" ref={priceRef} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>כתובת</Form.Label>
                  <Form.Control type="text" name="address" required className="form-control-lg" ref={addressRef} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>גודל במ"ר</Form.Label>
                  <Form.Control type="number" name="size" required className="form-control-lg" ref={sizeRef} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>קומה</Form.Label>
                  <Form.Control type="number" name="floor" required className="form-control-lg" ref={floorRef} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>מעלית</Form.Label>
                  <Form.Select name="elevator" required className="form-control-lg" ref={elevatorRef}>
                    <option value="true">יש</option>
                    <option value="false">אין</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>חניה</Form.Label>
                  <Form.Select name="parking" required className="form-control-lg" ref={parkingRef}>
                    <option value="true">יש</option>
                    <option value="false">אין</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>תאריך כניסה</Form.Label>
                  <Form.Control type="date" name="entryDate" required className="form-control-lg" ref={entryDateRef} />
                </Form.Group>
              </Col>
              <Col md={6}>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>כיוון אוויר</Form.Label>
              <Form.Control type="text" name="direction" required className="form-control-lg" ref={directionRef} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>מצב הנכס</Form.Label>
              <Form.Select name="condition" required className="form-control-lg" ref={conditionRef}>
                <option value="">בחר מצב</option>
                <option value="חדש">חדש</option>
                <option value="משופץ">משופץ</option>
                <option value="במצב טוב">במצב טוב</option>
                <option value="דורש שיפוץ">דורש שיפוץ</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>תיאור הנכס</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" className="form-control-lg" ref={descriptionRef} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>תמונות</Form.Label>
              <div className="d-flex flex-wrap align-items-center">
                <CldUploadButton
                  className='btn btn-outline-primary me-2 mb-2'
                  uploadPreset="my_upload_test"
                  onSuccess={(result) => {
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
                    multiple: true
                  }}
                >
                  <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" />
                  העלאת תמונות
                </CldUploadButton>
                {uploadedImageUrls.map((url: any, index: any) => (
                  <div key={index} className="position-relative me-2 mb-2">
                    <img
                      src={url}
                      alt={`תמונה שהועלתה ${index + 1}`}
                      className="img-thumbnail"
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      className="position-absolute top-0 start-100 translate-middle rounded-circle p-1"
                      onClick={() => removeImage(index)}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  </div>
                ))}
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
      <Modal show={showAlertForm} onHide={() => setShowAlertForm(false)} centered>
        <Modal.Header closeButton className="bg-info text-white">
          <Modal.Title>הרשמה לקבלת התראות</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAlertFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>כתובת אימייל</Form.Label>
              <Form.Control type="email" ref={emailAlertRef} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>סוג עסקה</Form.Label>
              <Form.Select ref={typeAlertRef}>
                <option value="">כל הסוגים</option>
                <option value="מכירה">מכירה</option>
                <option value="השכרה">השכרה</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>מספר חדרים מינימלי</Form.Label>
              <Form.Control type="number" ref={roomsAlertRef} min="1" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>מחיר מקסימלי</Form.Label>
              <Form.Control type="number" ref={priceAlertRef} min="0" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>אזור מבוקש</Form.Label>
              <Form.Control type="text" ref={addressAlertRef} />
            </Form.Group>
            <Button variant="info" type="submit" className="w-100">
              הירשם להתראות
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}
