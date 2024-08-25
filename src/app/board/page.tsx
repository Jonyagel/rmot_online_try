"use client"
import React, { useEffect, useRef, useState } from 'react'
import { CldImage } from 'next-cloudinary';
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
import { FaPlus } from 'react-icons/fa';
import { auto } from '@popperjs/core';

export const dynamic = 'auto';

interface BoardItem {
  id: number;
  type: 'sale' | 'lost-found' | 'gmach' | 'class';
  title: string;
  description: string;
  price?: number;
  contact: string;
  image?: string;
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

  const StyledNav = styled(Nav)`
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
  
    @media (max-width: 768px) {
      display: none;
    }
  
    .nav-link {
      color: #2c3e50;
      font-weight: bold;
      padding: 10px 15px;
      
      &:hover {
        color: #3498db;
      }
  
      &.active {
        color: #3498db;
        position: relative;
  
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #3498db;
        }
      }
    }
  `;

  const StyledNavLink = styled(Nav.Link)`
    white-space: normal;
    word-wrap: break-word;
    max-width: 100%;
  `;

  const StyledSelect = styled.select`
    background-color: #f8f9fa;
    border: none;
    border-radius: 20px;
    padding: 0.5rem 1rem;
    font-weight: bold;
    color: #2c3e50;
    appearance: none;
    -webkit-appearance: none;
    background-image: url('data:image/svg+xml;utf8,<svg fill="%232c3e50" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
    background-repeat: no-repeat;
    background-position: right 0.7rem center;
    padding-right: 2rem;
  `;

  // const TabContent = ({ children, isActive }: any) => (
  //   <motion.div
  //   // initial={{ opacity: 0, y: 20 }}
  //   // animate={{ opacity: isActive ? 1 : 1, y: isActive ? 0 : 0 }}
  //   // transition={{ duration: 0.3 }}
  //   >
  //     {children}
  //   </motion.div>
  // );

  const InfoCard = ({ icon, title, value }: any) => (
    <div className="nadlan-info-card">
      <FontAwesomeIcon icon={icon} className="nadlan-info-icon" />
      <div className="nadlan-info-content">
        <h4>{title}</h4>
        <p>{value}</p>
      </div>
    </div>
  );

  return (
    <Container fluid className="content-container px-3">
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='title text-center mt-5'
          >
            <h1 className="my-4 text-3xl board-title">לוח קהילתי</h1>
          </motion.div>
          <div className="d-flex justify-content-end align-items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="add-board-button rounded-circle shadow-sm p-3 m-4 btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              <FaPlus />
            </motion.button>
            {/* <Button variant="primary" className="add-board-button rounded-circle shadow-sm p-3 m-4" onClick={() => setShowAddModal(true)}>
              <FaPlus />
            </Button> */}
            {/* <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <StyledSelect
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
          >
            <option value="date">מיון לפי תאריך</option>
            <option value="likes">מיון לפי לייקים</option>
          </StyledSelect>
        </motion.div> */}
          </div>
          <div className="mb-4 search-container-board">
            <InputGroup style={{ direction: 'ltr' }}>
              <FormControl
                className='rounded'
                placeholder="חיפוש..."
                aria-label="חיפוש"
                value={searchTerm}
                onChange={(e: any) => setSearchTerm(e.target.value)}
              />
              <InputGroup.Text className='rounded'>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
            </InputGroup>
          </div>

          <motion.div
            className="d-flex justify-content-between align-items-center mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StyledNav activeKey={activeTab} onSelect={(k: any) => setActiveTab(k)}>
              <StyledNavLink eventKey="all">הכל</StyledNavLink>
              <StyledNavLink eventKey="sale">מכירה</StyledNavLink>
              <StyledNavLink eventKey="lost-found">אבידה ומציאה</StyledNavLink>
              <StyledNavLink eventKey="gmach">גמ״ח</StyledNavLink>
              <StyledNavLink eventKey="class">חוגים</StyledNavLink>
            </StyledNav>
          </motion.div>

          <Row>
            {filteredAndSortedItems.map(item => (
              <Col key={item.id} md={4} lg={3} sm={6} className="mb-4">
                <motion.div
                  className="board-card border"
                  whileHover={{ y: -2, boxShadow: '0 4px 8px rgba(13, 110, 253, 0.08)' }}
                >
                  <div className="board-card-content">
                    <div className="board-card-header">
                      {item.image ? (
                        <CldImage
                          src={item.image}
                          width="400"
                          height="200"
                          crop="fill"
                          alt={item.title}
                          className="board-image"
                          loading="lazy"
                          format="auto"
                          quality="auto"
                        />
                      ) : (
                        <div className="board-image-placeholder">
                          <FontAwesomeIcon icon={faImage} size="lg" color="#0d6efd" />
                        </div>
                      )}
                      <div className="board-type-badge">
                        {getItemTypeName(item.type)}
                      </div>
                    </div>

                    <div className="board-description">
                      <h3 className="board-address">{item.title}</h3>
                      {item.price && (
                        <div className="board-price">
                          {item.price.toLocaleString()} ₪
                        </div>
                      )}
                      <p className="board-desc-text">{item.description}</p>
                      <div className="board-features">
                        <span><FontAwesomeIcon icon={faCalendarAlt} /> {new Date(Number(item.date)).toLocaleDateString('he-IL')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="board-card-footer">
                    <button className="board-more-info-btn" onClick={() => handleShow(item)}>פרטים נוספים</button>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
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
              className="board-modal-content board-item-detail-modal"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="board-close-button" onClick={handleClose}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <div className="board-modal-inner-content">
                <div className="board-item-image-container">
                  {selectedItem.image ? (
                    <CldImage
                      src={selectedItem.image}
                      width="800"
                      height="600"
                      crop="fill"
                      alt={selectedItem.title}
                      className="board-item-detail-image"
                    />
                  ) : (
                    <div className="board-no-image">
                      <FontAwesomeIcon icon={faImage} size="5x" />
                    </div>
                  )}
                </div>
                <div className="board-item-details-content">
                  <h2 className="board-item-title">{selectedItem.title}</h2>
                  <div className="board-item-info-grid">
                    <InfoCard icon={faTag} title="סוג" value={getItemTypeName(selectedItem.type)} />
                    {selectedItem.price && (
                      <InfoCard icon={faShekelSign} title="מחיר" value={`${selectedItem.price} ₪`} />
                    )}
                    <InfoCard icon={faInfoCircle} title="תיאור" value={selectedItem.description} />
                    <InfoCard icon={faPhone} title="יצירת קשר" value={selectedItem.contact} />
                    <InfoCard
                      icon={faCalendarAlt}
                      title="תאריך פרסום"
                      value={new Date(Number(selectedItem.date)).toLocaleDateString('he-IL')}
                    />
                  </div>
                </div>
              </div>
              <div className="board-modal-footer">
                {/* <button className="board-close-button-secondary" onClick={handleClose}>
                  <FontAwesomeIcon icon={faTimes} className="board-button-icon" /> סגור
                </button> */}
                <button className="board-contact-button">
                  <FontAwesomeIcon icon={faEnvelope} className="board-button-icon" /> יצירת קשר
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered size="lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <div className="w-100 d-flex justify-content-between align-items-start">
            <Modal.Title>הוספת פריט חדש</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => {
            e.preventDefault();
            // const formData = new FormData(e.currentTarget);
            // const newItem = {
            //   type: formData.get('type') as 'sale' | 'lost-found' | 'gmach' | 'class',
            //   title: formData.get('title') as string,
            //   description: formData.get('description') as string,
            //   price: formData.get('price') ? Number(formData.get('price')) : undefined,
            //   contact: formData.get('contact') as string,
            //   image: uploadedImageUrl
            // };
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
                  {/* <Button variant="secondary" onClick={() => setShowAddModal(false)} className="me-2">
                    ביטול
                  </Button> */}
                  <Button variant="primary" type="submit">
                    הוסף פריט
                  </Button>
                </div>
              </div>

            </Form.Group>

          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  )
}



// const mockData: BoardItem[] = [
//     { id: 1, type: 'sale', title: 'אופניים למכירה', description: 'אופניים במצב מצוין', price: 500, contact: '050-1234567', image: 'bicycle_wvuwcc', date: '2024-07-28' },
//     { id: 2, type: 'lost-found', title: 'נמצא ארנק', description: 'נמצא ארנק ברחוב הרצל', contact: '052-7654321', image: 'Purse_hxsdo3', date: '2024-07-27' },
//     { id: 3, type: 'gmach', title: 'גמ"ח כלי עבודה', description: 'השאלת כלי עבודה לתושבי השכונה', contact: 'gmach@example.com', image: 'tools_hnozjm', date: '2024-07-26' },
//     { id: 4, type: 'class', title: 'חוג יוגה', description: 'חוג יוגה בימי שלישי בערב', price: 40, contact: '053-9876543', image: 'yoga_inydwp', date: '2024-07-25' },
//   ];