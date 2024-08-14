"use client"
import React, { useEffect, useRef, useState } from 'react'
import { CldImage, CldUploadButton } from 'next-cloudinary';
import { Card, Badge, Button, Modal, Form, Row, Col, Container, Carousel, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBuilding, faCalendarAlt, faCar, faCloudUploadAlt, faCouch, faElevator, faHome, faPhone, faRulerCombined, faSun, faTimes, faBell, faEye, faImage } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
// import 'bootstrap/dist/css/bootstrap.min.css';
import emailjs from '@emailjs/browser';
import './style.css'
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';


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

  useEffect(() => {
    const filteredProperties = properties.filter((property: Property) => {
      const typeMatch = filters.type === 'all' || property.type === filters.type;

      const roomsMatch = filters.rooms === 'all' ||
        (filters.rooms === '4' ? property.rooms >= 4 : property.rooms.toString() === filters.rooms);

      const priceMatch =
        filters.priceRange === 'all' ||
        (filters.priceRange === 'low' && property.price < 1000000) ||
        (filters.priceRange === 'medium' && property.price >= 1000000 && property.price < 2000000) ||
        (filters.priceRange === 'high' && property.price >= 2000000);

      return typeMatch && roomsMatch && priceMatch;
    });

    setNadlanAr(filteredProperties);
  }, [filters, properties]);

  const handleAddModalClose = () => {
    setShowAddModal(false);

  };

  const handleAddModalShow = () => {
    setShowAddModal(true);
  };




  const sendEmailToUser = async (dadaPosted: any, email: any) => {
    try {
      const templateParams = {
        to_email: email,
        from_name: "Ramot Online Try",
        property_type: dadaPosted.type,
        property_rooms: dadaPosted.rooms,
        property_price: dadaPosted.price,
        property_address: dadaPosted.address,
        // property_link: `${process.env.NEXT_PUBLIC_SITE_URL}/nadlan/${newProperty.id}` // Assuming you have a page for individual properties
      };

      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID2!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      console.log('Email sent successfully:', result.text);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };


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

  const removeImage = (index: any) => {
    setUploadedImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  // const handleAddProperty = () => {
  //   doApiPost()
  // };

  const doApiGetEmail = async () => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/alertMachingNadlan?rooms=${nadlanAr[0].rooms}&price=${nadlanAr[0].price}`;
    const resp = await fetch(url, { cache: 'no-store' })
    const data = await resp.json();
    console.log(data);
    console.log(data[0].to_email);
    setUserEmail(data[0].to_email);
    setSendemailAr(data)
    return data[0].to_email
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
      const email = await doApiGetEmail();
      sendEmailToUser(data, email);
      setStatus('הודעה נשלחה בהצלחה!');
      setShowAlert(true);
      handleAddModalClose();
      fetchProperties();
      router.push('/nadlan');
    } catch (error: any) {
      console.error('Error:', error);
      setStatus('אירעה שגיאה בשליחת ההודעה. אנא נסה שוב.');
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
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
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


  return (
    <div className='container-fluid'>
      {showAlert && (
        <Alert variant={status.includes('בהצלחה') ? "success" : "danger"} onClose={() => setShowAlert(false)} dismissible className="mb-4">
          <Alert.Heading>{status.includes('בהצלחה') ? "תודה שפנית אלינו!" : "שגיאה"}</Alert.Heading>
          <p>{status}</p>
        </Alert>
      )}
      <Container fluid className="content-container">
        <Row>
          <Col lg={2} className="d-none d-lg-block">
            {/* אזור פרסומות שמאלי */}
            <div className="ad-container">
              <div className="ad-space">
                <img src='/images/bookgif.webp' className='rounded' />
              </div>
            </div>
          </Col>
          <Col lg={8}>
            <h1 className="mb-4 text-3xl nadlan-title">נדל"ן בשכונה</h1>
            <div className='flex justify-content-between mb-2'>
              <Button variant="primary" className="mb-auto" onClick={() => setShowAlertForm(true)}>
                <FontAwesomeIcon icon={faBell} className="me-2" />
                הירשם להתראות
              </Button>
              <motion.button
                className="add-nadlan-button p-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddModalShow}
              >
                <FaPlus />
              </motion.button>
            </div>
            <Form className="mb-4 filter-nadlan">
              <Row>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>סוג עסקה</Form.Label>
                    <Form.Control
                      as="select"
                      name="type"
                      onChange={handleFilterChange}
                    >
                      <option value="all">הכל</option>
                      <option value="מכירה">מכירה</option>
                      <option value="השכרה">השכרה</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>מספר חדרים</Form.Label>
                    <Form.Control
                      as="select"
                      name="rooms"
                      onChange={handleFilterChange}
                    >
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
                    <Form.Control
                      as="select"
                      name="priceRange"
                      onChange={handleFilterChange}
                    >
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {nadlanAr.map((item: any, index: number) => (
                  <React.Fragment key={item._id}>
                    <div className="bg-white rounded border position-relative property-card">
                      <div className="relative">
                        {item.images[0] ? (
                          <CldImage
                            src={item.images[0]}
                            width="400"
                            height="250"
                            crop="fill"
                            alt={`תמונה של ${item.address}`}
                            className="w-full h-40 object-cover  rounded-b-none rounded-t"
                            loading="lazy"
                            format="webp"
                            quality="auto"
                          />
                        ) : (
                          <div className="w-full h-40 bg-gray-200 rounded-t flex items-center justify-center">
                            <FontAwesomeIcon icon={faImage} size="3x" color="#adb5bd" />
                          </div>
                        )}
                        <Badge bg='primary' className="ms-2 align-self-start top-0 end-10 translate-middle position-absolute">{item.type}</Badge>
                        {/* <div className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-bold px-2 py-1 rounded">
                        {item.type}
                      </div> */}
                      </div>
                      <div className="p-6">
                        <h5 className="font-bold  mb-3 text-gray-800 truncate">{item.address}</h5>
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-1xl font-bold text-blue-600">
                            {item.type === 'מכירה'
                              ? `${item.price.toLocaleString()} ₪`
                              : `${item.price.toLocaleString()} ₪ לחודש`}
                          </div>
                          {/* <div className="text-sm text-gray-500 flex items-center">
                          <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                          {item.entryDate}
                        </div> */}
                        </div>
                        <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faBed} className="mr-3 text-blue-500 w-5" />
                            <span>{item.rooms} חדרים</span>
                          </div>
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faRulerCombined} className="mr-3 text-blue-500 w-5" />
                            <span>{item.size} מ"ר</span>
                          </div>
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faBuilding} className="mr-3 text-blue-500 w-5" />
                            <span>קומה {item.floor}</span>
                          </div>
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faCar} className="mr-3 text-blue-500 w-5" />
                            <span>{item.parking ? 'חניה' : 'ללא חניה'}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleShow(item)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-lg transition duration-300 flex items-center justify-center"
                        >
                          צפה בפרטים נוספים
                        </button>
                      </div>
                    </div>

                    {/* פרסומת בין הכרטיסים במצב טלפון נייד */}
                    {(index + 1) % 3 === 0 && (
                      <div className="md:hidden col-span-1">
                        <div className="bg-gray-100 rounded-lg p-4 shadow-md">
                          <img
                            src={index % 2 === 0 ? "/images/bookgif.gif" : "/images/timegif.gif"}
                            alt="פרסומת"
                            className="w-full h-auto rounded"
                          />
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </Row>
          </Col>

          <Col lg={2} className="d-none d-lg-block ">
            {/* אזור פרסומות ימני */}
            <div className="ad-container">
              <div className="ad-space">
                <img src='/images/timegif.webp' className='rounded' />
                {/* כאן תוכל להוסיף את קוד הפרסומת שלך */}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {/* מודל לפרטי הנכס */}
      <Modal show={showModal} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton className="bg-primary text-white">
          <div className="w-100 d-flex justify-content-between align-items-start">
            <Modal.Title>{selectedProperty?.address}</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          {selectedProperty && (
            <div className="row">
              <div className="col-md-6">
                {selectedProperty.images[0] ? (
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
                          format="webp"
                          quality="auto"
                        />
                      </Carousel.Item>

                    ))}
                  </Carousel>
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                    <FontAwesomeIcon icon={faImage} size="3x" color="#adb5bd" />
                  </div>
                )}
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
          {/* <Button variant="secondary" onClick={handleClose}>
            סגור
          </Button> */}
          <Button variant="primary">
            <FontAwesomeIcon icon={faPhone} className="mr-2" /> צור קשר עם המוכר
          </Button>
        </Modal.Footer>
      </Modal>

      {/* מודל להוספת נכס חדש */}
      <Modal show={showAddModal} onHide={handleAddModalClose} centered size="lg" className='nadlan-modal'>
        <Modal.Header closeButton className=" bg-primary text-white">
          <div className="w-100 d-flex justify-content-between align-items-start">
            <Modal.Title>הוסף נכס חדש</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => {
            e.preventDefault();
            doApiPost()
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
            <div className='flex justify-content-between align-items-center'>
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
              <div className="text-end pt-2">
                <Button variant="secondary" onClick={handleAddModalClose} className="me-2">
                  ביטול
                </Button>
                <Button variant="primary" type="submit">
                  הוסף נכס
                </Button>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showAlertForm} onHide={() => setShowAlertForm(false)} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <div className="w-100 d-flex justify-content-between align-items-start">
            <Modal.Title>הרשמה לקבלת התראות</Modal.Title>
          </div>
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
            <div className='w-100  flex justify-content-end'>
              <Button variant="primary" type="submit" className="">
                הירשם להתראות
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div >
  )
}