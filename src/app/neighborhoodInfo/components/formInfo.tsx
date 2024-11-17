'use client';

import { useState, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Image from 'next/image';
import { Card, Row, Modal, Button } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import './formInfo.css';
import 'leaflet-geosearch/dist/geosearch.css';
import { Icon, Marker as LeafletMarker, LatLng } from "leaflet";
import { CldUploadButton, CldImage } from 'next-cloudinary';
import { FaCrown, FaImages, FaCheckCircle } from 'react-icons/fa';

interface TimeSlot {
  openTime: string;
  closeTime: string;
}

interface OpeningHours {
  day: string;
  isOpen: boolean;
  timeSlots: TimeSlot[];
  notes?: string; // Optional notes for specific day
}

interface BusinessForm {
  name: string;
  phone: string;
  email: string;
  category: string;
  description: string;
  address: string;
  openingHours: OpeningHours[];
  openingHoursNotes?: string;
  images: string[];
  location: {
    lat: number;
    lng: number;
  };
  isPremium: boolean;  // Add this to track payment status
}

interface StepProps {
  formData: BusinessForm;
  setFormData: (data: BusinessForm) => void;
  errors?: { [key: string]: string };
}

interface FormInfoProps {

  activeTab: string;

  showModal: boolean;

  setShowModal: (show: boolean) => void;

  role?: string;

  'aria-modal'?: string;

  'aria-labelledby'?: string;

}

// Add step titles
const STEPS = [
  { number: 1, title: 'פרטי העסק' },
  { number: 2, title: 'מיקום' },
  { number: 3, title: 'שעות פעילות' },
  { number: 4, title: 'תמונות' }
];

function FormInfo({ showModal, setShowModal, activeTab }: FormInfoProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BusinessForm>({
    name: '',
    phone: '',
    email: '',
    category: '',
    description: '',
    address: '',
    openingHours: [],
    images: [],
    location: { lat: 31.7683, lng: 35.2137 },
    isPremium: false
  });

  const  handleAddCard = (activeTab:any) => {

  }
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
      <Row className="justify-content-center">
        <motion.div className="col-md-12">
          <Card>
            <Card.Body className="rtl p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold">הוספת עסק חדש</h1>
                <button onClick={() => setShowModal(false)} className="text-gray-500">X</button>
              </div>

              <StepsIndicator currentStep={step} />

              {/* Form Content */}
              <div className="min-h-[400px] mb-6">
                {step === 1 && (
                  <BusinessDetails formData={formData} setFormData={setFormData} />
                )}
                {step === 2 && (
                  <LocationStep formData={formData} setFormData={setFormData} />
                )}
                {step === 3 && (
                  <OpeningHoursStep formData={formData} setFormData={setFormData} />
                )}
                {step === 4 && (
                  <ImagesStep formData={formData} setFormData={setFormData} />
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => step > 1 ? setStep(prev => prev - 1) : setShowModal(false)}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md"
                >
                  {step === 1 ? 'ביטול' : 'חזרה'}
                </button>
                <button
                  onClick={() => step < 4 ? setStep(prev => prev + 1) : handleAddCard(activeTab)}
                  className="px-6 py-2 bg-green-500 text-white rounded-md"
                >
                  {step === 4 ? 'שליחה לאישור' : 'המשך'}
                </button>
              </div>
            </Card.Body>
          </Card>
        </motion.div>
      </Row>
    </Modal>
  );
}

function StepsIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex justify-between items-center mb-8">
      {STEPS.map((step) => (
        <div key={step.number} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{
                scale: currentStep >= step.number ? 1 : 0.8,
                backgroundColor: currentStep >= step.number ? '#10B981' : '#E5E7EB'
              }}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center mb-2
                ${currentStep >= step.number ? 'bg-green-500 text-white' : 'bg-gray-200'}
                transition-all duration-300
              `}
            >
              {currentStep > step.number ? '✓' : step.number}
            </motion.div>
            <span className="text-sm text-gray-600">{step.title}</span>
          </div>
          {step.number < 4 && (
            <motion.div
              className="h-[2px] flex-1 mx-4"
              initial={{ backgroundColor: '#E5E7EB' }}
              animate={{
                backgroundColor: currentStep > step.number ? '#10B981' : '#E5E7EB'
              }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function BusinessDetails({ formData, setFormData, errors }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm mb-2">שם העסק</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full p-3 border rounded-md ${errors?.name ? 'border-red-500' : ''}`}
          />
          {errors?.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>
        <div>
          <label className="block text-sm mb-2">טלפון</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`w-full p-3 border rounded-md ${errors?.phone ? 'border-red-500' : ''}`}
          />
          {errors?.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
        </div>
        <div>
          <label className="block text-sm mb-2">קטגוריה</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">מייל</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full p-3 border rounded-md ${errors?.email ? 'border-red-500' : ''}`}
          />
          {errors?.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>
        <div className="col-span-2">
          <label className="block text-sm mb-2">תוכן מפורט</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 border rounded-md h-24"
          />
        </div>
      </div>
    </div>
  );
}

function LocationStep({ formData, setFormData }: StepProps) {
  const [addressError, setAddressError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isUnverified, setIsUnverified] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const mapRef = useRef<any>(null);

  const myIcon = new Icon({
    iconUrl: "/images/icon-logo/מיקום.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const handleSearch = async (address: string) => {
    if (address.length < 3) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=il`
      );
      const data = await response.json();
      setSuggestions(data.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  };

  const selectLocation = (item: any) => {
    setFormData({
      ...formData,
      address: item.display_name,
      location: {
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon)
      }
    });
    setSuggestions([]);
    mapRef.current?.flyTo([item.lat, item.lon], 15);
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setFormData({
        ...formData,
        location: { lat: latitude, lng: longitude }
      });
      mapRef.current?.flyTo([latitude, longitude], 15);
    });
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <label className="block text-sm font-medium mb-1">כתובת העסק</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={formData.address}
              onChange={(e) => {
                setFormData({ ...formData, address: e.target.value });
                handleSearch(e.target.value);
              }}
              className="w-full p-2 border rounded-md pr-8"
              placeholder="הזן כתובת לחיפוש..."
            />
            {suggestions.length > 0 && (
              <div className="absolute z-[9999] w-full mt-1 bg-white border rounded-md shadow-lg" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {suggestions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => selectLocation(item)}
                    className="p-2 hover:bg-gray-50 cursor-pointer text-sm border-b last:border-b-0"
                  >
                    {item.display_name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={getCurrentLocation}
            className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
            title="מיקום נוכחי"
          >
            📍
          </button>
        </div>
      </div>

      <div className="h-[300px] relative border rounded-md overflow-hidden shadow-sm">
        <MapContainer
          ref={mapRef}
          center={[formData.location.lat, formData.location.lng]}
          zoom={13}
          className="h-full w-full"
          zoomControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ZoomControl position="bottomright" />
          <DraggableMarker
            position={[formData.location.lat, formData.location.lng]}
            icon={myIcon}
            setPosition={(pos: any) =>
              setFormData({
                ...formData,
                location: { lat: pos[0], lng: pos[1] }
              })
            }
          />
        </MapContainer>

        {isUnverified && (
          <div className="absolute top-2 right-2 bg-yellow-100 p-2 rounded-md z-[1000] text-xs">
            מיקום משוער
          </div>
        )}
      </div>
    </div>
  );
}

// Draggable marker component
interface DraggableMarkerProps {
  position: [number, number];
  setPosition: (position: [number, number]) => void;
  icon: Icon;
}

function DraggableMarker({ position, setPosition, icon }: DraggableMarkerProps) {
  const markerRef = useRef<LeafletMarker | null>(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const pos: LatLng = marker.getLatLng();
          setPosition([pos.lat, pos.lng]);
        }
      },
    }),
    [setPosition],
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={icon}
    />
  );
}

function OpeningHoursStep({ formData, setFormData }: StepProps) {
  const days = [
    { id: 'sunday', label: 'ראשון' },
    { id: 'monday', label: 'שני' },
    { id: 'tuesday', label: 'שלישי' },
    { id: 'wednesday', label: 'רביעי' },
    { id: 'thursday', label: 'חמישי' },
    { id: 'friday', label: 'שישי' },
    { id: 'saturday', label: 'שבת' },
  ];

  const copyToAllDays = (sourceDay: OpeningHours) => {
    const updatedHours = days.map(day => ({
      day: day.id,
      isOpen: sourceDay.isOpen,
      timeSlots: sourceDay.timeSlots.map(slot => ({ ...slot }))
    }));
    setFormData({ ...formData, openingHours: updatedHours });
  };

  const updateDayHours = (dayId: string, field: 'isOpen', value: boolean) => {
    const updatedHours = [...formData.openingHours];
    const dayIndex = updatedHours.findIndex(h => h.day === dayId);

    if (dayIndex === -1) {
      updatedHours.push({
        day: dayId,
        isOpen: field === 'isOpen' ? Boolean(value) : true,
        timeSlots: [{ openTime: '07:00', closeTime: '18:00' }]
      });
    } else {
      updatedHours[dayIndex] = {
        ...updatedHours[dayIndex],
        [field]: value
      };
    }

    setFormData({ ...formData, openingHours: updatedHours });
  };

  const getDayHours = (dayId: string): OpeningHours => {
    return formData.openingHours.find(h => h.day === dayId) || {
      day: dayId,
      isOpen: false,
      timeSlots: [{ openTime: '07:00', closeTime: '18:00' }]
    };
  };

  const addTimeSlot = (dayId: string) => {
    const updatedHours = [...formData.openingHours];
    const dayIndex = updatedHours.findIndex(h => h.day === dayId);

    if (dayIndex !== -1) {
      updatedHours[dayIndex].timeSlots.push({
        openTime: '07:00',
        closeTime: '18:00'
      });
      setFormData({ ...formData, openingHours: updatedHours });
    }
  };

  const removeTimeSlot = (dayId: string, slotIndex: number) => {
    const updatedHours = [...formData.openingHours];
    const dayIndex = updatedHours.findIndex(h => h.day === dayId);

    if (dayIndex !== -1) {
      updatedHours[dayIndex].timeSlots.splice(slotIndex, 1);
      setFormData({ ...formData, openingHours: updatedHours });
    }
  };

  const updateTimeSlot = (dayId: string, slotIndex: number, field: 'openTime' | 'closeTime', value: string) => {
    const updatedHours = [...formData.openingHours];
    const dayIndex = updatedHours.findIndex(h => h.day === dayId);

    if (dayIndex !== -1) {
      updatedHours[dayIndex].timeSlots[slotIndex][field] = value;
      setFormData({ ...formData, openingHours: updatedHours });
    }
  };

  const updateDayNotes = (dayId: string, notes: string) => {
    const updatedHours = [...formData.openingHours];
    const dayIndex = updatedHours.findIndex(h => h.day === dayId);

    if (dayIndex !== -1) {
      updatedHours[dayIndex] = {
        ...updatedHours[dayIndex],
        notes
      };
      setFormData({ ...formData, openingHours: updatedHours });
    }
  };

  return (
    <div>
      <div className="space-y-2 mb-4">
        {days.map(day => {
          const dayHours = getDayHours(day.id);

          return (
            <div key={day.id} className="flex items-start gap-3 py-2">
              <label className="flex items-center gap-2 w-20">
                <input
                  type="checkbox"
                  checked={dayHours.isOpen}
                  onChange={(e) => updateDayHours(day.id, 'isOpen', e.target.checked)}
                  className="w-4 h-4"
                />
                <span>{day.label}</span>
              </label>

              {dayHours.isOpen && (
                <div className="flex-1">
                  {dayHours.timeSlots.map((slot, index) => (
                    <div key={index} className="flex items-center gap-2 mb-1">
                      <input
                        type="time"
                        value={slot.openTime}
                        onChange={(e) => updateTimeSlot(day.id, index, 'openTime', e.target.value)}
                        className="p-1 border rounded w-28 text-sm"
                      />
                      <span className="text-sm">-</span>
                      <input
                        type="time"
                        value={slot.closeTime}
                        onChange={(e) => updateTimeSlot(day.id, index, 'closeTime', e.target.value)}
                        className="p-1 border rounded w-28 text-sm"
                      />
                      <button
                        onClick={() => removeTimeSlot(day.id, index)}
                        className="text-red-500 text-sm px-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addTimeSlot(day.id)}
                    className="text-blue-600 text-xs"
                  >
                    + משמרת נוספת
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <textarea
          value={formData.openingHoursNotes || ''}
          onChange={(e) => setFormData({ ...formData, openingHoursNotes: e.target.value })}
          placeholder="הערות כלליות לגבי שעות הפעילות..."
          className="w-full p-2 text-sm border rounded-md h-20 resize-none"
        />
      </div>
    </div>
  );
}

function ImagesStep({ formData, setFormData }: StepProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const maxImages = 9;

  const handleUpgradeClick = () => {
    if (!formData.isPremium) {
      setShowPaymentModal(true);
    }
  };

  const handleUpload = (result: any) => {
    if (formData.images.length + 1 > maxImages) {
      toast.error(`ניתן להעלות עד ${maxImages} תמונות`);
      return;
    }
    
    if (result?.info?.secure_url) {
      setFormData({
        ...formData,
        images: [...formData.images, result.info.secure_url]
      });
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      setFormData({
        ...formData,
        isPremium: true
      });
      
      setShowPaymentModal(false);
      toast.success('🎉 התשלום בוצע בהצלחה! כעת תוכל להעלות תמונות', {
        position: "top-center",
        autoClose: 3000,
        rtl: true
      });
    } catch (error) {
      toast.error('התשלום נכשל, אנא נסה שנית');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">תמונות העסק</h3>
      <p className="text-sm text-gray-500">
        העלה עד {maxImages} תמונות של העסק שלך
        {!formData.isPremium && ' (נדרש תשלום חד פעמי)'}
      </p>
      
      <div className="grid grid-cols-3 gap-4">
        <AnimatePresence>
          {formData.images.map((image, index) => (
            <motion.div
              key={image}  // Changed from index to image URL for unique key
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm hover:shadow-md"
            >
              <CldImage
                src={image}
                width="800"
                height="600"
                crop="fill"
                alt={`תמונה ${index + 1}`}
                loading="lazy"
                format="auto"
                quality="auto"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button
                className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1.5"
                onClick={() => {
                  const newImages = formData.images.filter(img => img !== image);
                  setFormData({ ...formData, images: newImages });
                }}
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {formData.images.length < maxImages && (
          <>
            {formData.isPremium ? (
              <CldUploadButton
                uploadPreset="my_upload_test"
                className="border-2 border-dashed rounded-lg aspect-[4/3] flex flex-col items-center justify-center cursor-pointer hover:border-gray-400"
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
                <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-sm text-gray-500">לחץ להעלאת תמונות</span>
                <span className="text-xs text-gray-400 mt-1">JPG, PNG עד 5MB</span>
              </CldUploadButton>
            ) : (
              <button
                onClick={handleUpgradeClick}
                className="border-2 border-dashed rounded-lg aspect-[4/3] flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50"
              >
                <FaCrown className="text-yellow-500 text-2xl mb-2" />
                <span className="text-sm text-gray-500">שדרג לפרימיום להעלאת תמונות</span>
                <span className="text-xs text-gray-400 mt-1">החל מ-₪99.90</span>
              </button>
            )}
          </>
        )}
      </div>

      <Modal 
        show={showPaymentModal} 
        onHide={() => setShowPaymentModal(false)}
        centered
        className="rtl"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="w-100 text-center">
            <FaCrown className="text-yellow-500 text-4xl mb-2" />
            <h3 className="font-bold text-xl">שדרוג לחשבון פרימיום</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-6 pt-0">
          <p className="text-center text-gray-600 mb-4">
            שדרג עכשיו וקבל גישה לכל היתרונות של חשבון פרימיום
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h4 className="font-medium mb-3">היתרונות שלך:</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <FaCheckCircle className="text-green-500 mr-2" />
                העלאת עד 9 תמונות איכותיות
              </li>
              <li className="flex items-center text-gray-700">
                <FaCheckCircle className="text-green-500 mr-2" />
                הצגה בולטת בתוצאות החיפוש
              </li>
              <li className="flex items-center text-gray-700">
                <FaCheckCircle className="text-green-500 mr-2" />
                תצוגה מקדימה איכותית
              </li>
            </ul>
          </div>

          <div className="text-center bg-blue-50 rounded-lg p-4 mb-4">
            <span className="text-2xl font-bold text-blue-600">₪99.90</span>
            <span className="text-gray-600"> / תשלום חד פעמי</span>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 justify-center pb-6">
          <button
            className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-all
              ${isProcessing 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'}`}
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                מעבד תשלום...
              </div>
            ) : (
              'המשך לתשלום'
            )}
          </button>
          <button
            className="mt-2 text-gray-500 hover:text-gray-700 transition-colors"
            onClick={() => setShowPaymentModal(false)}
          >
            ביטול
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FormInfo;