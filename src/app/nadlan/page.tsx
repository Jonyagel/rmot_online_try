"use client"
import React, { useEffect, useRef, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { CldImage, CldUploadButton } from 'next-cloudinary';
import { Card, Badge, Button, Modal, Form, Row, Col, Container, Carousel, Alert, Nav, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBuilding, faCalendarAlt, faCar, faCloudUploadAlt, faCouch, faElevator, faHome, faPhone, faRulerCombined, faSun, faTimes, faBell, faEye, faImage, faPaintRoller, faCompass, faCoins, faSearch, faKey, faHeart } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
// import 'bootstrap/dist/css/bootstrap.min.css';
import emailjs from '@emailjs/browser';
import './style.css'
import { motion, AnimatePresence } from 'framer-motion';
import { FaBed, FaBuilding, FaCalendarAlt, FaCar, FaCompass, FaHome, FaPlus, FaRulerCombined, FaSearch, FaTimes } from 'react-icons/fa';

// הוספת ייבוא Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';


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
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // מצב למעקב אחרי התמונה הנוכחית
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});

  const swiperRef = useRef<any>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const roomsRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const elevatorRef = useRef<HTMLInputElement>(null);
  const parkingRef = useRef<HTMLInputElement>(null);
  const tivuchRef = useRef<HTMLInputElement>(null);
  const sizeRef = useRef<HTMLInputElement>(null);
  const floorRef = useRef<HTMLInputElement>(null);
  const entryDateRef = useRef<HTMLInputElement>(null);
  const directionRef = useRef<HTMLInputElement>(null);
  const conditionRef = useRef<HTMLInputElement>(null);
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

  const handleFavorite = async (id: number) => {
    setFavorites(prev => {
        const isFavorite = prev[id] || false; // בדוק אם הנכס הוא מועדף
        const updatedFavorites = {
            ...prev,
        };

        if (isFavorite) {
            // אם הנכס הוא מועדף, הסר את ה-ID מהמארך
            delete updatedFavorites[id]; // מחק את ה-ID מהמארך
            // שלח בקשה להסרת ה-favorite במאגר הנתונים
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/nadlan`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }), // שלח את ה-ID להסרה
            });
        } else {
            // אם הנכס לא היה מועדף, הוסף את ה-ID למארך
            updatedFavorites[id] = true; // הוסף את ה-ID
            // שלח בקשה לעדכון ה-favorite במאגר הנתונים
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/nadlan`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, favorite: true }), // שלח את ה-ID ואת המצב המעודכן
            });
        }

        return updatedFavorites;
    });
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
    const tivuch = tivuchRef.current?.value;
    const entryDate = entryDateRef.current?.value;
    const direction = directionRef.current?.value;
    const condition = conditionRef.current?.value;
    const description = descriptionRef.current?.value;
    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/nadlan`, {
        method: 'POST',
        body: JSON.stringify({ type, rooms, price, address, images, size, floor, elevator, parking, entryDate, direction, condition, description, tivuch }),
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
      setUploadedImageUrls(prev => [...prev, result.info.secure_url]);
      toast.success('התמונה הועלתה בהצלחה');
    }
  };

  const InfoCard = ({ icon, title, value }: any) => (
    <div className="nadlan-info-card">
      {/* <FontAwesomeIcon icon={icon} className="nadlan-info-icon" /> */}
      <i className={`bi bi-${icon} me-1`} ></i>
      <div className="nadlan-info-content">
        <h4>{title}</h4>
        <p>{value}</p>
      </div>
    </div>
  );

  const getFilteredProperties = () => {
    return nadlanAr.filter((item: any) => {
      if (currentCategory === 'rent') return item.type === 'השכרה';
      if (currentCategory === 'sale') return item.type === 'מכירה';
      return true;
    });
  };


  return (
    <div className='container-fluid'>
      <div>
        <Row>
          <Col lg={2} className="d-none d-lg-block">
            {/* אזור פרסומות שמאלי */}
            <div className="sticky top-6 space-y-6">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src='/images/bookgif.webp' className='w-full h-auto' alt="פרסומת" />
              </div>
            </div>
          </Col>
          <Col lg={8} className="">
            <motion.div
              className='text-center'
            >
              <div className="header-container text-white my-auto rounded-bottom shadow-sm">
                <h1 className="display-6">נכסי דלא ניידי</h1>
              </div>
              <motion.div
                className="mb-4"
                initial={{ opacity: 1, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className=''>
                  <div className='mt-3'>
                    <div className="search-bar-container bg-white shadow-sm  p-3 rounded-top align-items-center mx-auto">
                      <Row className="align-items-center">
                        <Col lg={3}>
                          <Nav>
                            <Nav.Item>
                              <Nav.Link className={`nav-link-nadlan me-4 ${currentCategory === 'sale' ? 'active' : ''}`}
                                onClick={() => setCurrentCategory('sale')}>מכירה</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link className={`nav-link-nadlan me-4 ${currentCategory === 'rent' ? 'active' : ''}`}
                                onClick={() => setCurrentCategory('rent')}>השכרה</Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Col>
                        <Col lg={9} className='d-flex justify-content-end'>
                          <div className=''>
                            {/* <InputGroup className="border rounded w-50" style={{ maxHeight: '36px', maxWidth: '200px' }}>
                              <Form.Control
                                type="text"
                                placeholder="חיפוש חנויות..."
                                // value={inputValue}
                                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                                // onKeyDown={(e: any) => {
                                //   if (e.key === 'Enter') {
                                //     e.preventDefault();
                                //     setSearchTerm(inputValue);
                                //   }
                                // }}
                                className=""
                              />
                              <InputGroup.Text
                                className="search-button"
                                // onClick={() => {
                                //   setSearchTerm(inputValue);
                                // }}
                                style={{ cursor: 'pointer' }}
                              >
                                <FaSearch />
                              </InputGroup.Text>
                            </InputGroup> */}
                            <button
                              className="btn rounded border me-1"
                              onClick={() => setShowAlertForm(true)}
                            >
                              <i className="bi bi-bell me-1"></i>
                              <span className="">התראות</span>
                            </button>
                            <button
                              className="btn rounded border"
                              onClick={handleAddModalShow}
                            >
                              הוסף דירה
                            </button>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6} className='mt-4'>
                          <div className="flex">
                            <div className='me-1'>
                              <div className="">
                                <select
                                  name="rooms"
                                  onChange={handleFilterChange}
                                  className=" btn rounded border text-start"
                                >
                                  <option value="all">כל החדרים</option>
                                  <option value="1">חדר 1</option>
                                  <option value="2">2 חדרים</option>
                                  <option value="3">3 חדרים</option>
                                  <option value="4">4+ חדרים</option>
                                </select>
                              </div>
                            </div>
                            <div className=''>
                              <div className="">
                                <select
                                  name="priceRange"
                                  onChange={handleFilterChange}
                                  className="btn rounded border text-start"
                                >
                                  <option value="all">כל המחירים</option>
                                  <option value="low">עד מיליון ₪</option>
                                  <option value="medium">1-2 מיליון ₪</option>
                                  <option value="high">מעל 2 מיליון ₪</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>


            <div className="nadlan-grid">
              {getFilteredProperties().map((item: any, index: number) => (
                <div key={item._id} className='position-relative mt-2'>
                  <div
                    className="rounded shadow-sm border overflow-hidden transition-all duration-300"
                  // whileHover={{ y: -2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                  >

                    <div className="">
                      {item.images[0] ? (
                        <CldImage
                          width="400"
                          height="200"
                          src={item.images[0]}
                          crop="fill"
                          style={{ objectFit: 'cover', width: '100%', height: '150px' }}
                          alt={`תמונה של ${item.address}`}
                          loading='lazy'
                          format="auto"
                          quality="auto"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center" style={{ height: '150px' }}>
                          <FontAwesomeIcon icon={faHome} size="2x" className="text-gray-400" />
                        </div>
                      )}
                      {item.tivuch && (
                        <Badge bg='primary' className="ms-2 align-self-start top-0 end-5 translate-middle position-absolute">{`${item.tivuch}`}</Badge>
                      )}
                    </div>
                    <div className="nadlan-description mt-4 px-2 flex justify-content-between">
                      <h3 className='font-bold'>{item.address}</h3>
                      <button
                        className={`love-btn ${favorites[item._id] ? 'text-danger' : ''}`} // הוספת מחלקת טקסט אדום אם מועדף
                        onClick={() => handleFavorite(item._id)} // לוגיקת שמירה
                      >
                        <i className="bi bi-heart"></i>
                      </button>
                    </div>
                    <div className="m-4 flex justify-between">
                      <div className="flex flex-column text-sm text-gray-600 justify-content-between">
                        <span className='mb-2'><i className="bi bi-door-closed me-1"></i> {`${item.rooms ? item.rooms : ''} חד'`} </span>
                        <span><i className="bi bi-aspect-ratio me-1"></i>{`${item.size ? item.size : ''} מ"ר`}</span>
                      </div>
                      <div className="flex flex-column text-sm text-gray-600 justify-content-between">
                        <span className='mb-2'><i className="bi bi-arrows-vertical me-1"></i>קומה {item.floor}</span>
                        <span><i className="bi bi-house me-1"></i>{item.condition}</span>
                      </div>
                    </div>
                    <hr className='w-75 mx-auto' style={{ color: 'gray' }} />
                    <div className="flex align-items-center justify-content-between p-2 px-4">
                      <div className="nadlan-price">
                        <span>{`${item.price.toLocaleString()} ₪`}</span>
                      </div>
                      <button
                        className="more-nadlan-info btn rounded border"
                        onClick={() => handleShow(item)}
                      >
                        למידע נוסף
                      </button>
                    </div>

                  </div>

                  {(index + 1) % 8 === 0 && (
                    <motion.div
                      className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 bg-white rounded-lg shadow-md overflow-hidden"
                      whileHover={{ y: -2, boxShadow: '0 4px 8px rgba(13, 110, 253, 0.08)' }}
                    >
                      <div className="h-48 flex items-center justify-center">
                        <img
                          src={index % 2 === 0 ? "/images/bookgif.gif" : "/images/timegif.gif"}
                          alt="פרסומת"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </Col>

          <Col lg={2} className="d-none d-lg-block">
            {/* אזור פרסומות ימני */}
            <div className="sticky top-6 space-y-6">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src='/images/timegif.webp' className='w-full h-auto' alt="פרסומת" />
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {/* </Container> */}
      {/* מודל לפרטי הנכס */}
      <AnimatePresence>
        {showModal && selectedProperty && (
          <Row>
            <motion.div
              className="nadlan-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            >
              <motion.div
                className="nadlan-property-detail-modal rounded"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="nadlan-close-button" onClick={handleClose}>
                  <FaTimes />
                </button>
                <div className="flex flex-column justify-content-between" style={{ height: '90vh' }}>
                  <div className="nadlan-property-image-container p-2" style={{ height: '30%' }}>
                    {selectedProperty.images && selectedProperty.images.length > 0 ? (
                      <div className="flex">
                        {selectedProperty.images.length === 1 ? ( // אם יש תמונה אחת
                          <div className="mb-2 cursor-pointer w-full" onClick={() => setShowImageModal(true)}>
                            <CldImage
                              src={selectedProperty.images[0]}
                              width={300} // גובה קבוע
                              height={200} // גובה קבוע
                              crop="fill"
                              className="nadlan-property-detail-image shadow-sm rounded"
                              alt={`תמונה של ${selectedProperty.address}`}
                              loading="lazy"
                              format="auto"
                              quality="auto"
                            />
                          </div>
                        ) : (
                          <>
                            <div className="mb-2 cursor-pointer" onClick={() => setShowImageModal(true)}>
                              <CldImage
                                src={selectedProperty.images[0]}
                                width={300} // גודל מלא
                                height={200} // גובה מלא
                                crop="fill"
                                className="nadlan-property-detail-image shadow-sm rounded"
                                alt={`תמונה של ${selectedProperty.address}`}
                                loading="lazy"
                                format="auto"
                                quality="auto"
                              />
                            </div>
                            <div className="flex flex-col space-y-2 ml-2 ms-2">
                              {selectedProperty.images.slice(1, 3).map((image, index) => ( // הצגת עד 3 תמונות נוספות
                                <div key={index} onClick={() => setShowImageModal(true)} className="cursor-pointer">
                                  <CldImage
                                    src={image}
                                    width={100} // גודל קטן יותר
                                    height={75} // גובה קטן יותר
                                    crop="fill"
                                    className="nadlan-property-detail-image shadow-sm rounded"
                                    alt={`תמונה ${index + 1} של ${selectedProperty.address}`}
                                    loading="lazy"
                                    format="auto"
                                    quality="auto"
                                  />
                                </div>
                              ))}
                              {selectedProperty.images.length > 3 && ( // כפתור "הצג עוד" אם יש יותר מ-3 תמונות
                                <div onClick={() => setShowImageModal(true)} className="cursor-pointer text-gray-600 text-center">
                                  <span>הצג עוד</span>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded" style={{ height: '150%' }}>
                        <FontAwesomeIcon icon={faImage} size="2x" className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  {/* מודל לתצוגת תמונות גדולות */}
                  {showImageModal && (
                    <Modal show={showImageModal} onHide={() => setShowImageModal(false)} centered size="lg">
                      <Modal.Body>
                        <Swiper
                          ref={swiperRef} // הוספת הייחוס ל-Swiper
                          spaceBetween={10}
                          // pagination={{ clickable: true }}
                          navigation // הוספת ניווט
                          modules={[Navigation, Pagination]} // הוספת המודולים
                          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)} // עדכון המצב כאשר התמונה משתנה
                          style={{ height: '80vh' }} // גובה המודל
                        >
                          {selectedProperty.images.map((image, index) => (
                            <SwiperSlide key={index}>
                              <CldImage
                                src={image}
                                width="800"
                                height="600"
                                crop="fill"
                                className="nadlan-property-detail-image rounded"
                                alt={`תמונה ${index + 1} של ${selectedProperty.address}`}
                                loading="lazy"
                                format="auto"
                                quality="auto"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} // התאם את התמונה לגובה ולרוחב
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                        <div className="flex justify-center mt-2">
                          {selectedProperty.images.map((image, index) => (
                            <div key={index} className="thumbnail-container" onClick={() => swiperRef.current?.swiper.slideTo(index)}>
                              <CldImage
                                src={image}
                                width="100" // גודל קטן יותר לתמונות המוקטנות
                                height="75" // גובה קטן יותר לתמונות המוקטנות
                                crop="fill"
                                className={`rounded thumbnail ${index === currentIndex ? 'active' : ''}`} // הוספת מחלקת active לתמונה הנוכחית
                                alt={`תמונה ${index + 1} של ${selectedProperty.address}`}
                                loading="lazy"
                                format="auto"
                                quality="auto"
                                style={{ cursor: 'pointer', objectFit: 'cover' }} // התאם את התמונה לגובה ולרוחב
                              />
                            </div>
                          ))}
                        </div>
                      </Modal.Body>
                    </Modal>
                  )}

                  <div className="nadlan-property-details-content overflow-y-auto px-4 my-1">
                    <div className=''>
                      <div className='nadlan-property-title-div pb-2'>
                        <h2 className="nadlan-property-title m-0">{selectedProperty.address}</h2>
                        <p className="text-primary font-bold">
                          {selectedProperty.price
                            ? `${selectedProperty.price.toLocaleString()} ₪${selectedProperty.type === 'השכרה' ? ' לחודש' : ''}`
                            : 'מחיר לא צוין'}
                        </p>
                      </div>
                      {selectedProperty.description && (
                        <div className="nadlan-property-description pb-2">
                          <h3 className="nadlan-section-title font-bold">תיאור הנכס</h3>
                          <p>{selectedProperty.description}</p>
                        </div>
                      )}
                    </div>
                    <hr className='w-75 mx-auto' style={{ color: 'gray' }} />
                    <div className="nadlan-property-info-grid">
                      <InfoCard icon={'house'} title="סוג עסקה" value={selectedProperty.type || 'לא צוין'} />
                      <InfoCard icon={'door-closed'} title="חדרים" value={selectedProperty.rooms?.toString() || 'לא צוין'} />
                      <InfoCard icon={'aspect-ratio'} title="שטח" value={selectedProperty.size ? `${selectedProperty.size} מ"ר` : 'לא צוין'} />
                      <InfoCard icon={'arrows-vertical'} title="קומה" value={selectedProperty.floor?.toString() || 'לא צוין'} />
                      <InfoCard icon={'box-arrow-up'} title="מעלית" value={selectedProperty.elevator || 'לא צוין'} />
                      <InfoCard icon={'p-circle'} title="חניה" value={selectedProperty.parking || 'לא צוין'} />
                      <InfoCard icon={'calendar'} title="תאריך כניסה" value={selectedProperty.entryDate || 'לא צוין'} />
                      <InfoCard icon={'compass'} title="כיוון" value={selectedProperty.direction || 'לא צוין'} />
                      <InfoCard icon={'house'} title="מצב הנכס" value={selectedProperty.condition || 'לא צוין'} />
                    </div>

                  </div>
                </div>
                {/* <div className="nadlan-modal-footer">
                  <button className="nadlan-contact-button">
                    <FontAwesomeIcon icon={faPhone} className="nadlan-button-icon" /> צור קשר
                  </button>
                </div> */}
              </motion.div>
            </motion.div>
          </Row>
        )}
      </AnimatePresence>

      {/* מודל להוספת נכס חדש */}
      <Modal show={showAddModal} onHide={handleAddModalClose} centered size="xl" className='nadlan-modal'>
        <Modal.Header className="bg-primary text-white border-0 rounded-t-lg flex justify-between items-center">
          <Modal.Title className="font-bold text-xl">הוסף נכס חדש</Modal.Title>
          <button
            className="btn-close btn-close-white"
            onClick={handleAddModalClose}
            style={{ marginLeft: '-0.5rem' }}
          ></button>
        </Modal.Header>
        <Modal.Body className="p-4 bg-gradient-to-br from-white to-primary/5">
          <Form onSubmit={(e) => {
            e.preventDefault();
            doApiPost()
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Form.Group className='form-floating'>
                <Form.Control as="select" ref={typeRef} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-xs">
                  <option value="מכירה">מכירה</option>
                  <option value="השכרה">השכרה</option>
                </Form.Control>
                <Form.Label>סוג עסקה</Form.Label>
              </Form.Group>
              <Form.Group className='form-floating'>
                <Form.Control ref={roomsRef} type="number" name="rooms" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-xs" />
                <Form.Label>מספר חדרים</Form.Label>
              </Form.Group>
              <Form.Group className='form-floating'>
                <Form.Control type="number" name="price" required ref={priceRef} className="mt-1 block w-full pr-8 rounded-md border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-xs" />
                <Form.Label>מחיר</Form.Label>
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-xs">₪</span>
                </div>
              </Form.Group>
              <Form.Group className='form-floating'>
                <Form.Control type="text" name="address" required ref={addressRef} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-xs" />
                <Form.Label>כתובת</Form.Label>
              </Form.Group>
              <Form.Group className='form-floating'>
                <Form.Control type="number" name="size" required ref={sizeRef} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-xs" />
                <Form.Label>גודל במ"ר</Form.Label>
              </Form.Group>
              <Form.Group className='form-floating'>
                <Form.Control type="number" name="floor" required ref={floorRef} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-xs" />
                <Form.Label>קומה</Form.Label>
              </Form.Group>
              <Form.Group>
                <Form.Label className="text-xs font-semibold text-primary mb-1">מעלית</Form.Label>
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input type="checkbox" ref={elevatorRef} name="elevator" className="form-checkbox h-4 w-4 text-primary rounded" />
                    <span className="mr-2 text-gray-700 text-xs">יש מעלית</span>
                  </label>
                </div>
              </Form.Group>
              <Form.Group>
                <Form.Label className="text-xs font-semibold text-primary mb-1">חניה</Form.Label>
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input type="checkbox" ref={parkingRef} name="parking" className="form-checkbox h-4 w-4 text-primary rounded" />
                    <span className="mr-2 text-gray-700 text-xs">יש חניה</span>
                  </label>
                </div>
              </Form.Group>
              <Form.Group>
                <Form.Label className="text-xs font-semibold text-primary mb-1">תיווך</Form.Label>
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input type="checkbox" value={'תיווך'} ref={tivuchRef} name="tivuch" className="form-checkbox h-4 w-4 text-primary rounded" />
                    <span className="mr-2 text-gray-700 text-xs">תיווך</span>
                  </label>
                </div>
              </Form.Group>
              <Form.Group className='form-floating'>
                <Form.Control type="date" name="entryDate" required ref={entryDateRef} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-xs" />
                <Form.Label>תאריך כניסה</Form.Label>
              </Form.Group>
              <Form.Group className='form-floating'>
                <Form.Control type="text" name="direction" required ref={directionRef} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-xs" />
                <Form.Label>כיוון אוויר</Form.Label>
              </Form.Group>
            </div>
            <Form.Group className="mt-4">
              <Form.Label className="text-xs font-semibold text-primary mb-1">מצב הנכס</Form.Label>
              <div className="mt-1 flex flex-wrap gap-2">
                {['חדש', 'משופץ', 'במצב טוב', 'דורש שיפוץ'].map((condition) => (
                  <label key={condition} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="condition"
                      value={condition}
                      ref={condition === 'חדש' ? conditionRef : null}
                      className="form-radio h-3 w-3 text-primary"
                    />
                    <span className="mr-1 text-gray-700 text-xs">{condition}</span>
                  </label>
                ))}
              </div>
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label className="text-xs font-semibold text-primary mb-1">תיאור הנכס</Form.Label>
              <Form.Control as="textarea" rows={2} name="description" ref={descriptionRef} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-xs" />
            </Form.Group>
            <div className='mt-4'>
              <Form.Label className="text-xs font-semibold text-primary mb-1">תמונות</Form.Label>
              <div className="mt-1 flex items-center">
                <CldUploadButton
                  className='px-3 py-1 border border-transparent rounded-md shadow-sm text-xs font-medium text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-200'
                  uploadPreset="my_upload_test"
                  onSuccess={handleUploadSuccess}
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
                  <FontAwesomeIcon icon={faCloudUploadAlt} className="mr-1" />
                  העלאת תמונות
                </CldUploadButton>
              </div>
              <div className="mt-2 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {uploadedImageUrls.map((url: any, index: any) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`תמונה שהועלתה ${index + 1}`}
                      className="w-full h-16 object-cover rounded-md border border-primary/20"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-500"
                      onClick={() => removeImage(index)}
                    >
                      <FontAwesomeIcon icon={faTimes} className="w-2 h-2" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <Button variant="primary" type="submit" className="px-3 py-1 border border-transparent rounded-md shadow-sm text-xs font-medium text-white from-primary to-primary-dark hover:from-primary-dark hover:to-primary focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-primary transition duration-200">
                הוסף נכס
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showAlertForm} onHide={() => setShowAlertForm(false)} centered size="lg" className='nadlan-modal'>
        <Modal.Header className="bg-primary text-white border-0 rounded-t-lg flex justify-between items-center">
          <Modal.Title className="font-bold text-xl">הרשמה לקבלת התראות</Modal.Title>
          <button
            className="btn-close btn-close-white"
            onClick={() => setShowAlertForm(false)}
            style={{ marginLeft: '-0.5rem' }}
          ></button>
        </Modal.Header>
        <Modal.Body className="p-4 bg-gradient-to-br from-white to-primary/5">
          <Form onSubmit={handleAlertFormSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Group>
                <Form.Label className="text-xs font-semibold text-primary mb-1">כתובת אימייל</Form.Label>
                <Form.Control type="email" ref={emailAlertRef} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-1 text-xs" />
              </Form.Group>
              <Form.Group>
                <Form.Label className="text-xs font-semibold text-primary mb-1">סוג עסקה</Form.Label>
                <Form.Select ref={typeAlertRef} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-1 text-xs">
                  <option value="">כל הסוגים</option>
                  <option value="מכירה">מכירה</option>
                  <option value="השכרה">השכרה</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label className="text-xs font-semibold text-primary mb-1">מספר חדרים מינימלי</Form.Label>
                <Form.Control type="number" ref={roomsAlertRef} min="1" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-1 text-xs" />
              </Form.Group>
              <Form.Group>
                <Form.Label className="text-xs font-semibold text-primary mb-1">מחיר מקסימלי</Form.Label>
                <Form.Control type="number" ref={priceAlertRef} min="0" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-1 text-xs" />
              </Form.Group>
              <Form.Group className="md:col-span-2">
                <Form.Label className="text-xs font-semibold text-primary mb-1">אזור מבוקש</Form.Label>
                <Form.Control type="text" ref={addressAlertRef} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-1 text-xs" />
              </Form.Group>
            </div>
            <div className="mt-6 flex justify-end">
              <Button variant="primary" type="submit" className="px-3 py-1 border border-transparent rounded-md shadow-sm text-xs font-medium text-white hover:from-primary-dark hover:to-primary focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-primary transition duration-200">
                הירשם להתראות
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div >
  )
}