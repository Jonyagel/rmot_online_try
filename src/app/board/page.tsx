"use client"
import React, { useEffect, useRef, useState } from 'react'
import { CldImage } from 'next-cloudinary';
import { Card, Badge, Button, Modal, Form, Row, Col, Tabs, Tab, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHeart, faShare, faPlus } from '@fortawesome/free-solid-svg-icons';
import './board.css'; // נניח שיצרנו קובץ CSS נפרד
import { CldUploadButton } from 'next-cloudinary';
import { toast } from 'react-toastify';
import { faCloudUploadAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

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
  return (
    <div className='container mt-5'>
      <h1 className="mb-4 text-center text-7xl text-primary">לוח קהילתי</h1>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          הוסף פריט חדש
        </Button>
      </div>
      <div className="mb-4">
        <InputGroup>
          <FormControl
            placeholder="חיפוש..."
            aria-label="חיפוש"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputGroup.Text>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
        </InputGroup>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <Tabs
          activeKey={activeTab}
          onSelect={(k: any) => setActiveTab(k)}
          className="mb-3"
        >
          <Tab eventKey="all" title="הכל" />
          <Tab eventKey="sale" title="מכירה" />
          <Tab eventKey="lost-found" title="אבידה ומציאה" />
          <Tab eventKey="gmach" title='גמ"ח' />
          <Tab eventKey="class" title="חוגים" />
        </Tabs>

        <Form.Select
          style={{ width: 'auto' }}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'date' | 'likes')}
        >
          <option value="date">מיון לפי תאריך</option>
          <option value="likes">מיון לפי לייקים</option>
        </Form.Select>
      </div>

      <Row>
        {filteredAndSortedItems.map(item => (
          <Col key={item.id} md={4} className="mb-4">
            <Card className='shadow-sm hover-card h-100'>
              {item.image ? (
                <CldImage
                  src={item.image}
                  width="400"
                  height="300"
                  crop="fill"
                  alt={item.title}
                  className="card-img-top"
                />
              ) : (
                <div className="card-img-top d-flex align-items-center justify-content-center bg-light" style={{ height: '200px' }}>
                  <FontAwesomeIcon icon={faPlus} size="3x" color="#adb5bd" />
                </div>
              )}
              <Card.Body className="d-flex flex-column">
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                {item.price && <Card.Text>מחיר: {item.price} ₪</Card.Text>}
                <Badge bg="info" className="mb-2">
                  {getItemTypeName(item.type)}
                </Badge>
                <small className="text-muted mb-2">{new Date(Number(item.date)).toLocaleDateString('he-IL')}</small>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <Button variant="outline-primary" onClick={() => handleShow(item)}>
                    פרטים נוספים
                  </Button>
                  <div>
                    <Button variant="light" onClick={() => handleShare(item)}>
                      <FontAwesomeIcon icon={faShare} />
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedItem?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <>
              {selectedItem.image ? (
                <CldImage
                  src={selectedItem.image}
                  width="800"
                  height="600"
                  crop="fill"
                  alt={selectedItem.title}
                  className="img-fluid mb-3"
                />
              ) : (
                <div className="d-flex align-items-center justify-content-center bg-light mb-3" style={{ height: '300px' }}>
                  <FontAwesomeIcon icon={faPlus} size="5x" color="#adb5bd" />
                </div>
              )}
              <p><strong>סוג:</strong> {getItemTypeName(selectedItem.type)}</p>
              <p><strong>תיאור:</strong> {selectedItem.description}</p>
              {selectedItem.price && <p><strong>מחיר:</strong> {selectedItem.price} ₪</p>}
              <p><strong>יצירת קשר:</strong> {selectedItem.contact}</p>
              <p><strong>תאריך פרסום:</strong> {new Date(Number(selectedItem.date)).toLocaleDateString('he-IL')}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            סגור
          </Button>
          <Button variant="primary">
            יצירת קשר
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered size="lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>הוספת פריט חדש</Modal.Title>
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
              <div className="d-flex align-items-center">
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
              </div>
            </Form.Group>
            <div className="text-end">
              <Button variant="secondary" onClick={() => setShowAddModal(false)} className="me-2">
                ביטול
              </Button>
              <Button variant="primary" type="submit">
                הוסף פריט
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}



// const mockData: BoardItem[] = [
//     { id: 1, type: 'sale', title: 'אופניים למכירה', description: 'אופניים במצב מצוין', price: 500, contact: '050-1234567', image: 'bicycle_wvuwcc', date: '2024-07-28' },
//     { id: 2, type: 'lost-found', title: 'נמצא ארנק', description: 'נמצא ארנק ברחוב הרצל', contact: '052-7654321', image: 'Purse_hxsdo3', date: '2024-07-27' },
//     { id: 3, type: 'gmach', title: 'גמ"ח כלי עבודה', description: 'השאלת כלי עבודה לתושבי השכונה', contact: 'gmach@example.com', image: 'tools_hnozjm', date: '2024-07-26' },
//     { id: 4, type: 'class', title: 'חוג יוגה', description: 'חוג יוגה בימי שלישי בערב', price: 40, contact: '053-9876543', image: 'yoga_inydwp', date: '2024-07-25' },
//   ];