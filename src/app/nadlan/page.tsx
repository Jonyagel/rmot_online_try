"use client"
import React, { useEffect, useRef, useState } from 'react'
import { CldImage, CldUploadButton } from 'next-cloudinary';
import { Card, Badge, Button, Modal, Form, Row, Col, Container, Carousel, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBuilding, faCalendarAlt, faCar, faCloudUploadAlt, faCouch, faElevator, faHome, faPhone, faRulerCombined, faSun, faTimes, faBell, faEye, faImage, faPaintRoller, faCompass, faCoins, faSearch, faKey } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
// import 'bootstrap/dist/css/bootstrap.min.css';
import emailjs from '@emailjs/browser';
import './style.css'
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTimes } from 'react-icons/fa';


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
  const [currentCategory, setCurrentCategory] = useState<'rent' | 'sale'>('sale');

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

  const InfoCard = ({ icon, title, value }: any) => (
    <div className="nadlan-info-card">
      <FontAwesomeIcon icon={icon} className="nadlan-info-icon" />
      <div className="nadlan-info-content">
        <h4>{title}</h4>
        <p>{value}</p>
      </div>
    </div>
  );

  const getFilteredProperties = () => {
    return nadlanAr.filter((item: any) => {
      // if (currentCategory === 'all') return true;
      if (currentCategory === 'rent') return item.type === 'השכרה';
      if (currentCategory === 'sale') return item.type === 'מכירה';
      return true;
    });
  };


  return (
    <div className='container-fluid'>
      {/* {showAlert && (
        <Alert variant={status.includes('בהצלחה') ? "success" : "danger"} onClose={() => setShowAlert(false)} dismissible className="mb-4">
          <Alert.Heading>{status.includes('בהצלחה') ? "תודה שפנית אלינו!" : "שגיאה"}</Alert.Heading>
          <p>{status}</p>
        </Alert>
      )} */}
      {/* <Container fluid className="content-container bg-red-500"> */}
      <div>
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
            <div className="nadlan-filter-section mb-4 ">
              <div className="category-buttons d-flex justify-content-center mb-3 ">
                <Button
                  variant={currentCategory === 'sale' ? "primary" : "outline-primary"}
                  onClick={() => setCurrentCategory('sale')}
                  className="me-2 btn-sm"
                >
                  למכירה
                </Button>
                <Button
                  variant={currentCategory === 'rent' ? "primary" : "outline-primary"}
                  onClick={() => setCurrentCategory('rent')}
                  className="btn-sm"
                >
                  להשכרה
                </Button>
              </div>

              <Form className="filter-nadlan  flex justify-content-around">
                {/* <Row className="g-2"> */}
                {/* <Col sm={6} md={4}> */}
                <Form.Group className='w-2/6'>
                  <Form.Label className="small text-muted">מספר חדרים</Form.Label>
                  <Form.Select
                    name="rooms"
                    onChange={handleFilterChange}
                    size="sm"
                  >
                    <option value="all">הכל</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4+</option>
                  </Form.Select>
                </Form.Group>
                {/* </Col> */}
                {/* <Col sm={6} md={4}> */}
                <Form.Group className='w-2/6'>
                  <Form.Label className="small text-muted">טווח מחירים</Form.Label>
                  <Form.Select
                    name="priceRange"
                    onChange={handleFilterChange}
                    size="sm"
                  >
                    <option value="all">הכל</option>
                    <option value="low">עד מיליון ₪</option>
                    <option value="medium">1-2 מיליון ₪</option>
                    <option value="high">מעל 2 מיליון ₪</option>
                  </Form.Select>
                </Form.Group>
                {/* </Col> */}
                {/* </Row> */}
              </Form>
            </div>
            <Row>
              <div className="nadlan-ar-grid">
                {getFilteredProperties().map((item: any, index: number) => (
                  <React.Fragment key={item._id}>
                    <motion.div
                      className="nadlan-ar-card border"
                      whileHover={{ y: -2, boxShadow: '0 4px 8px rgba(13, 110, 253, 0.08)' }}
                    >
                      <div className="nadlan-ar-card-content">
                        <div className="nadlan-ar-card-header">
                          {item.images[0] ? (
                            <CldImage
                              src={item.images[0]}
                              width="400"
                              height="200"
                              crop="fill"
                              className="nadlan-ar-image"
                              alt={`תמונה של ${item.address}`}
                              loading='lazy'
                              format="auto"
                              quality="auto"
                            />
                          ) : (
                            <div className="nadlan-ar-image-placeholder">
                              <FontAwesomeIcon icon={faImage} size="lg" color="#0d6efd" />
                            </div>
                          )}
                          <div className="nadlan-ar-type-badge">
                            {item.type}
                          </div>
                        </div>

                        <div className="nadlan-ar-description">
                          <h3 className="nadlan-ar-address">{item.address}</h3>
                          <div className="nadlan-ar-price">
                            {item.type === 'מכירה'
                              ? `${item.price.toLocaleString()} ₪`
                              : `${item.price.toLocaleString()} ₪ לחודש`}
                          </div>
                          <div className="nadlan-ar-features">
                            <span><FontAwesomeIcon icon={faBed} /> {item.rooms}</span>
                            <span><FontAwesomeIcon icon={faRulerCombined} /> {item.size} מ"ר</span>
                            <span><FontAwesomeIcon icon={faBuilding} /> {item.floor}</span>
                            <span><FontAwesomeIcon icon={faCar} /> {item.parking ? 'חניה' : 'אין'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="nadlan-ar-card-footer">
                        <button className="nadlan-ar-more-info-btn" onClick={() => handleShow(item)}>פרטים נוספים</button>
                      </div>
                    </motion.div>

                    {(index + 1) % 5 === 0 && (
                      <motion.div
                        className="nadlan-ar-ad-card"
                        whileHover={{ y: -2, boxShadow: '0 4px 8px rgba(13, 110, 253, 0.08)' }}
                      >
                        <div className="nadlan-ar-ad-content">
                          <img src={index % 2 === 0 ? "/images/bookgif.gif" : "/images/timegif.gif"} alt="פרסומת" className="nadlan-ar-ad-image" />
                        </div>
                      </motion.div>
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
      </div>
      {/* </Container> */}
      {/* מודל לפרטי הנכס */}
      <AnimatePresence>
        {showModal && selectedProperty && (
          <motion.div
            className="nadlan-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div
              className="nadlan-modal-content nadlan-property-detail-modal"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="nadlan-close-button" onClick={handleClose}>
                <FaTimes />
              </button>
              <div className="nadlan-modal-inner-content">
                <div className="nadlan-property-image-container">
                  {selectedProperty.images && selectedProperty.images.length > 0 ? (
                    <Carousel>
                      {selectedProperty.images.map((image, index) => (
                        <Carousel.Item key={index}>
                          <CldImage
                            src={image}
                            width="400"
                            height="300"
                            crop="fill"
                            className="nadlan-property-detail-image"
                            alt={`תמונה ${index + 1} של ${selectedProperty.address}`}
                            loading="lazy"
                            format="auto"
                            quality="auto"
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  ) : (
                    <div className="nadlan-no-image">
                      <FontAwesomeIcon icon={faImage} size="2x" />
                    </div>
                  )}

                </div>

                <div className="nadlan-property-details-content">

                  <div className="nadlan-property-info-grid">
                    <InfoCard icon={faHome} title="סוג עסקה" value={selectedProperty.type || 'לא צוין'} />
                    <InfoCard icon={faBed} title="חדרים" value={selectedProperty.rooms?.toString() || 'לא צוין'} />
                    <InfoCard icon={faRulerCombined} title="שטח" value={selectedProperty.size ? `${selectedProperty.size} מ"ר` : 'לא צוין'} />
                    <InfoCard icon={faBuilding} title="קומה" value={selectedProperty.floor?.toString() || 'לא צוין'} />
                    <InfoCard icon={faElevator} title="מעלית" value={selectedProperty.elevator || 'לא צוין'} />
                    <InfoCard icon={faCar} title="חניה" value={selectedProperty.parking || 'לא צוין'} />
                    <InfoCard icon={faCalendarAlt} title="תאריך כניסה" value={selectedProperty.entryDate || 'לא צוין'} />
                    <InfoCard icon={faCompass} title="כיוון" value={selectedProperty.direction || 'לא צוין'} />
                    <InfoCard icon={faPaintRoller} title="מצב הנכס" value={selectedProperty.condition || 'לא צוין'} />
                  </div>

                </div>
              </div>
              <div className='nadlan-property-title-and-description'>
                <div className='nadlan-property-title-div'>
                  <h2 className="nadlan-property-title m-0">{selectedProperty.address}</h2>
                  <p className="nadlan-price">
                    {selectedProperty.price
                      ? `${selectedProperty.price.toLocaleString()} ₪${selectedProperty.type === 'השכרה' ? ' לחודש' : ''}`
                      : 'מחיר לא צוין'}
                  </p>
                </div>
                {selectedProperty.description && (
                  <div className="nadlan-property-description">
                    <h3 className="nadlan-section-title">תיאור הנכס</h3>
                    <p>{selectedProperty.description}</p>
                  </div>
                )}
              </div>
              <div className="nadlan-modal-footer">
                <button className="nadlan-contact-button">
                  <FontAwesomeIcon icon={faPhone} className="nadlan-button-icon" /> צור קשר
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                    <option value="יש">יש</option>
                    <option value="אין">אין</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>חניה</Form.Label>
                  <Form.Select name="parking" required className="form-control-lg" ref={parkingRef}>
                    <option value="יש">יש</option>
                    <option value="אין">אין</option>
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