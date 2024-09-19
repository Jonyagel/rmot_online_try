"use client"
import React, { useEffect, useRef, useState } from 'react'
import { CldImage } from 'next-cloudinary';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Card, Badge, Button, Modal, Form, Row, Col, Tabs, Tab, InputGroup, FormControl, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHeart, faShare, faPlus, faCalendarAlt, faEnvelope, faPhone, faShekelSign, faInfoCircle, faTag, faImage } from '@fortawesome/free-solid-svg-icons';
import './board.css';
import { CldUploadButton } from 'next-cloudinary';
import { toast } from 'react-toastify';
import { faCloudUploadAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { auto } from '@popperjs/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';


export const dynamic = 'auto';

interface BoardItem {
  id: number;
  type: 'sale' | 'lost-found' | 'gmach' | 'class';
  title: string;
  description: string;
  price?: number;
  contact: string;
  image?: [string];
  date: string;
}

export default function CommunityBoard() {
  const [items, setItems] = useState<BoardItem[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<BoardItem | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<'date' | 'likes'>('date');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  // const [fileName, setFileName] = useState<string>("");
  const [image, setImage] = useState("");
  // const [boardAr, setBoardAr] = useState([]);
  const router = useRouter();
  useEffect(() => {
    fetchItems();
  }, []);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // מצב למעקב אחרי התמונה הנוכחית

  const swiperRef = useRef<any>(null);

  const typeRef = useRef<HTMLSelectElement>(null);
  const tittleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);

  const fetchItems = async () => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/board`;
    const resp = await fetch(url, { cache: 'no-store' })
    const data = await resp.json();
    console.log(data);
    setItems(data);

  };

  const handleAddItem = () => {
    doApiPost();
    setShowAddModal(false);
  };

  const doApiPost = async () => {
    const type = typeRef.current?.value;
    const tittle = tittleRef.current?.value;
    const description = descriptionRef.current?.value;
    const price = priceRef.current?.value;
    const contact = contactRef.current?.value;

    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/board`, {
        method: 'POST',
        body: JSON.stringify({ type, tittle, description, price, contact, image }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await resp.json();
      console.log(data);
      handleClose();
      fetchItems();
      router.push('/board');
    } catch (error: any) {
      console.error('Error:', error);
    }
  }

  const handleUpload = (result: any) => {
    if (result.event === 'success') {
      const publicId = result.info.public_id;
      const fileName = publicId.split('/').pop();
      setImage(fileName);
      setUploadedImageUrl(result.info.secure_url);
      // setImage(result.info.original_filename);
      toast.success('התמונה הועלתה בהצלחה');
    }
  };


  const handleClose = () => {
    setShowModal(false);
    setSelectedItem(null);
  };



  const handleShow = (item: BoardItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const getItemTypeName = (type: string) => {
    switch (type) {
      case 'sale': return 'מכירה';
      case 'lost-found': return 'אבידה ומציאה';
      case 'gmach': return 'גמ"ח';
      case 'class': return 'חוג';
      default: return type;
    }
  };

  // const handleLike = (id: number) => {
  //   setItems(prevItems =>
  //     prevItems.map(item =>
  //       item.id === id ? { ...item, likes: item.likes + 1 } : item
  //     )
  //   );
  // };

  const handleShare = (item: BoardItem) => {
    // כאן תוכל להוסיף לוגיקה לשיתוף, לדוגמה:
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.href,
      }).then(() => {
        console.log('Successful share');
      }).catch((error) => {
        console.log('Error sharing', error);
      });
    } else {
      console.log('Web Share API not supported');
      // כאן תוכל להוסיף אלטרנטיבה לדפדפנים שלא תומכים ב-Web Share API
    }
  };

  const filteredAndSortedItems = items
    // סינון לפי הלשונית הפעילה
    .filter(item => activeTab === 'all' || item.type === activeTab)

    // סינון לפי מונחי החיפוש
    .filter(item => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        (item.title && item.title.toLowerCase().includes(searchTermLower)) ||
        (item.description && item.description.toLowerCase().includes(searchTermLower))
      );
    })

    // מיון לפי תאריך או לייקים
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });




  const InfoCard = ({ icon, title, value }: any) => (
    <div className="board-info-card">
      <i className={`bi bi-${icon} me-1`} ></i>
      <div className="board-info-content">
        <h4>{title}</h4>
        <p>{value}</p>
      </div>
    </div>
  );

  return (
    <Container fluid className="px-3">
      <Row>
        <Col lg={2} className="d-none d-lg-block">
          {/* אזור פרסומות שמאלי */}
          <div className="ad-container">
            <div className="ad-space">
              <img src='/images/bookgif.webp' width={auto} height={auto} className='rounded' />
            </div>
          </div>
        </Col>
        <Col lg={8}>
          <motion.div
            className='text-center'
          >
            <div className="header-container text-white my-auto rounded-bottom shadow-sm">
              <h1 className="display-6">לוח קהילתי</h1>
            </div>
            <motion.div
              className="mb-4"
              initial={{ opacity: 1, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className=''>
                <div className=''>
                  <div className="search-bar-container bg-white shadow-sm  p-3 rounded-top align-items-center mx-auto">
                    <Row className="align-items-center">
                      <Col lg={8}>
                        <Nav>
                          <Nav.Item>
                            <Nav.Link className={`nav-link-board me-3 ${activeTab === 'all' ? 'active' : ''}`}
                              onClick={() => setActiveTab('all')}>הכל</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link className={`nav-link-board me-3 ${activeTab === 'sale' ? 'active' : ''}`}
                              onClick={() => setActiveTab('sale')}>מכירה</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link className={`nav-link-board me-3 ${activeTab === 'rent' ? 'active' : ''}`}
                              onClick={() => setActiveTab('rent')}>השכרה</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link className={`nav-link-board me-3 ${activeTab === 'delivery' ? 'active' : ''}`}
                              onClick={() => setActiveTab('delivery')}>מסירה</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link className={`nav-link-board me-3 ${activeTab === 'needed' ? 'active' : ''}`}
                              onClick={() => setActiveTab('needed')}>דרושים</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link className={`nav-link-board me-3 ${activeTab === 'work' ? 'active' : ''}`}
                              onClick={() => setActiveTab('work')}>עבודה</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link className={`nav-link-board me-3 ${activeTab === 'lost-found' ? 'active' : ''}`}
                              onClick={() => setActiveTab('lost-found')}>השבת אבידה</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link className={`nav-link-board me-3 ${activeTab === 'Transportation' ? 'active' : ''}`}
                              onClick={() => setActiveTab('Transportation')}>הסעות</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link className={`nav-link-board me-3 ${activeTab === 'variance' ? 'active' : ''}`}
                              onClick={() => setActiveTab('variance')}>שונות</Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Col>
                      <Col lg={4} className=''>
                        <div className='d-flex justify-content-end'>
                          <InputGroup className="border rounded w-50 me-1" style={{ maxHeight: '36px', maxWidth: '200px' }}>
                            <Form.Control
                              type="text"
                              placeholder="חיפוש בלוח..."
                              value={searchTerm}
                              // onChange={(e: any) => setSearchTerm(e.target.value)}
                              onKeyDown={(e: any) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  setSearchTerm(e.target.value);
                                }
                              }}
                              className=""
                            />
                            <InputGroup.Text
                              className="search-button"
                              onClick={(e: any) => setSearchTerm(e.target.value)}
                              style={{ cursor: 'pointer' }}
                            >
                              <FaSearch />
                            </InputGroup.Text>
                          </InputGroup>
                          <button
                            className="btn rounded border"
                            onClick={() => setShowAddModal(true)}
                          >
                            הוסף כרטיס
                          </button>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6} className='mt-4'>
                        <div className="flex">
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="board-grid">
            {filteredAndSortedItems.map(item => (
              <div key={item.id} className="position-relative mt-2">
                <div
                  className="board-card shadow-sm border rounded"
                >
                  <div className="board-card-content">

                    <div className="board-description">
                      <h3 className="board-title">{item.title}</h3>
                      <p className="board-desc-text">
                        {item.description.length > 100
                          ? `${item.description.substring(0, 100)}...`
                          : item.description}</p>
                      <Badge className="ms-2 align-self-start top-0 end-5 translate-middle position-absolute">{item.type}</Badge>
                    </div>
                  </div>
                  <hr className='w-75 mx-auto' />
                  <div className="board-card-footer flex justify-content-between align-items-center">
                    <div className="board-date">
                      <span>  <i className='bi bi-calendar me-1' ></i>{new Date(Number(item.date)).toLocaleDateString('he-IL')}</span>
                    </div>
                    <button className="board-more-info-btn btn border rounded" onClick={() => handleShow(item)}>מידע נוסף</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Col>

        <Col lg={2} className="d-none d-lg-block ">
          {/* אזור פרסומות ימני */}
          <div className="ad-container">
            <div className="ad-space">
              <img src='/images/timegif.webp' width={auto} height={auto} className='rounded' />
              {/* כאן תוכל להוסיף את קוד הפרסומת שלך */}
            </div>
          </div>
        </Col>
      </Row>

      <AnimatePresence>
        {showModal && selectedItem && (
          <motion.div
            className="board-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div
              className="board-item-detail-modal rounded relative"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Badge className="ms-2 align-self-start top-0 end-5 translate-middle position-absolute">{selectedItem.type}</Badge>
              <button className="board-close-button" onClick={handleClose}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <div className="flex flex-column justify-content-between" style={{ height: 'auto' }}>
                <div className="board-item-image-container p-2">
                  {selectedItem.image && selectedItem.image.length > 0 ? (
                    <div className="flex">
                      {selectedItem.image.length === 1 ? ( // אם יש תמונה אחת
                        <div className="mb-2 cursor-pointer w-full" onClick={() => setShowImageModal(true)}>
                          <CldImage
                            src={selectedItem.image[0]}
                            width={300} // גובה קבוע
                            height={200} // גובה קבוע
                            crop="fill"
                            className="board-item-detail-image shadow-sm rounded"
                            alt={`תמונה של ${selectedItem.title}`}
                            loading="lazy"
                            format="auto"
                            quality="auto"
                          />
                        </div>
                      ) : (
                        <>
                          <div className="mb-2 cursor-pointer" onClick={() => setShowImageModal(true)}>
                            <CldImage
                              src={selectedItem.image[0]}
                              width={300} // גודל מלא
                              height={200} // גובה מלא
                              crop="fill"
                              className="board-item-detail-image shadow-sm rounded"
                              alt={`תמונה של ${selectedItem.title}`}
                              loading="lazy"
                              format="auto"
                              quality="auto"
                            />
                          </div>
                          <div className="flex flex-col space-y-2 ms-2">
                            {selectedItem.image.slice(1, 3).map((image: any, index: any) => ( // הצגת עד 3 תמונות נוספות
                              <div key={index} onClick={() => setShowImageModal(true)} className="cursor-pointer">
                                <CldImage
                                  src={image}
                                  width={100} // גודל קטן יותר
                                  height={75} // גובה קטן יותר
                                  crop="fill"
                                  className="board-item-detail-image shadow-sm rounded"
                                  alt={`תמונה ${index + 1} של ${selectedItem.title}`}
                                  loading="lazy"
                                  format="auto"
                                  quality="auto"
                                />
                              </div>
                            ))}
                            {selectedItem.image.length > 3 && ( // כפתור "הצג עוד" אם יש יותר מ-3 תמונות
                              <div onClick={() => setShowImageModal(true)} className="cursor-pointer text-gray-600 text-center">
                                <span>הצג עוד</span>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="">
                    </div>
                  )}
                </div>
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
                        {selectedItem.image?.map((image: any, index: any) => (
                          <SwiperSlide key={index}>
                            <CldImage
                              src={image}
                              width="800"
                              height="600"
                              crop="fill"
                              className="nadlan-property-detail-image rounded"
                              alt={`תמונה ${index + 1} של ${selectedItem.title}`}
                              loading="lazy"
                              format="auto"
                              quality="auto"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }} // התאם את התמונה לגובה ולרוחב
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      <div className="flex justify-center mt-2">
                        {selectedItem.image?.map((image: any, index: any) => (
                          <div key={index} className="thumbnail-container" onClick={() => swiperRef.current?.swiper.slideTo(index)}>
                            <CldImage
                              src={image}
                              width="100" // גודל קטן יותר לתמונות המוקטנות
                              height="75" // גובה קטן יותר לתמונות המוקטנות
                              crop="fill"
                              className={`rounded thumbnail ${index === currentIndex ? 'active' : ''}`} // הוספת מחלקת active לתמונה הנוכחית
                              alt={`תמונה ${index + 1} של ${selectedItem.title}`}
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
                <div className="overflow-y-auto px-4 my-1" style={{ height: '55%' }}>
                  <div className=''>
                    <h2 className="board-item-title">{selectedItem.title}</h2>
                    <p>{selectedItem.description}</p>
                  </div>
                  <hr className='w-75 mx-auto my-4' style={{ color: 'gray' }} />
                  <div className="board-item-info-grid">
                    <InfoCard icon={'tag'} title="סוג" value={getItemTypeName(selectedItem.type)} />
                    {selectedItem.price && (
                      <InfoCard icon={"receipt"} title="מחיר" value={`${selectedItem.price.toLocaleString()} ₪`} />
                    )}
                    <InfoCard icon={'telephone'} title="יצירת קשר" value={selectedItem.contact} />
                    <InfoCard
                      icon={'calendar'}
                      title="תאריך פרסום"
                      value={new Date(Number(selectedItem.date)).toLocaleDateString('he-IL')}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )
        }
      </AnimatePresence >


      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered size="lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <div className="w-100 d-flex justify-content-between align-items-start">
            <Modal.Title>הוספת פריט חדש</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => {
            e.preventDefault();
            handleAddItem();
          }}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>סוג</Form.Label>
                  <Form.Select ref={typeRef} name="type" required className="form-control-lg">
                    <option value="sale">מכירה</option>
                    <option value="lost-found">אבידה ומציאה</option>
                    <option value="gmach">גמ"ח</option>
                    <option value="class">חוג</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>כותרת</Form.Label>
                  <Form.Control ref={tittleRef} type="text" name="title" required className="form-control-lg" />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>תיאור</Form.Label>
              <Form.Control ref={descriptionRef} as="textarea" rows={3} name="description" required className="form-control-lg" />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>מחיר (אופציונלי)</Form.Label>
                  <Form.Control ref={priceRef} type="number" name="price" className="form-control-lg" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>פרטי התקשרות</Form.Label>
                  <Form.Control ref={contactRef} type="text" name="contact" required className="form-control-lg" />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>תמונה</Form.Label>
              <div className="d-flex align-items-center justify-content-between">
                <CldUploadButton
                  className='btn btn-outline-primary me-2'
                  uploadPreset="my_upload_test"
                  onSuccess={handleUpload}
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
                        setUploadedImageUrl("");
                        setImage("");
                      }}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  </div>
                )}
                <div className="text-end">
                  <Button variant="primary" type="submit">
                    הוסף פריט
                  </Button>
                </div>
              </div>

            </Form.Group>

          </Form>
        </Modal.Body>
      </Modal>
    </Container >
  )
}