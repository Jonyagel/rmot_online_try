'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Image from 'next/image';

interface BusinessForm {
  name: string;
  phone: string;
  email: string;
  category: string;
  description: string;
  address: string;
  openingHours: OpeningHours[];
  images: string[];
  location: {
    lat: number;
    lng: number;
  };
}

interface OpeningHours {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

interface StepProps {
  formData: BusinessForm;
  setFormData: (data: BusinessForm) => void;
}

export default function BusinessForm() {
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
    location: { lat: 31.7683, lng: 35.2137 }
  });

  const handleSubmit = async () => {
    try {
      console.log('Form submitted:', formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="rtl max-w-3xl mx-auto p-6 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">הוספת עסק חדש</h1>
        <button className="text-gray-500">X</button>
      </div>

      <div className="mb-8">
        <StepsIndicator currentStep={step} />
      </div>
      
      <div className="min-h-[400px]">
        {step === 1 && (
          <BusinessDetails 
            formData={formData} 
            setFormData={setFormData}
          />
        )}
        {step === 2 && (
          <LocationStep 
            formData={formData} 
            setFormData={setFormData}
          />
        )}
        {step === 3 && (
          <OpeningHoursStep 
            formData={formData} 
            setFormData={setFormData}
          />
        )}
        {step === 4 && (
          <ImagesStep 
            formData={formData} 
            setFormData={setFormData}
          />
        )}
      </div>

      <div className="flex gap-4 mt-6">
        <button 
          onClick={() => setStep(prev => prev - 1)}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          ביטול
        </button>
        <button 
          onClick={() => step < 4 ? setStep(prev => prev + 1) : handleSubmit()}
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          {step === 4 ? 'שליחה לאישור' : 'תצוגה מקדימה'}
        </button>
      </div>
    </div>
  );
}

function StepsIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex justify-between items-center">
      {[1, 2, 3, 4].map((num) => (
        <div key={num} className="flex items-center flex-1">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center
            ${currentStep >= num ? 'bg-green-500 text-white' : 'bg-gray-200'}
          `}>
            {num}
          </div>
          {num < 4 && (
            <div className={`h-1 flex-1 mx-2 
              ${currentStep > num ? 'bg-green-500' : 'bg-gray-200'}`} 
            />
          )}
        </div>
      ))}
    </div>
  );
}

function BusinessDetails({ formData, setFormData }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm mb-2">שם העסק</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">טלפון</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">קטגוריה</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-3 border rounded-md"
            placeholder="V"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">מייל</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">תוכן מפורט</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 border rounded-md h-24"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">אחר</label>
          <input
            type="text"
            className="w-full p-3 border rounded-md"
          />
        </div>
      </div>
      
      <div className="border p-4 rounded-md">
        <button className="text-sm text-gray-600">
          + העלה לוגו (מומלץ)
        </button>
      </div>
    </div>
  );
}

function LocationStep({ formData, setFormData }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm mb-2">כתובת</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full p-3 border rounded-md"
        />
      </div>
      <div className="h-[400px] relative border rounded-md overflow-hidden">
        <MapContainer
          center={[formData.location.lat, formData.location.lng]}
          zoom={13}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[formData.location.lat, formData.location.lng]} />
        </MapContainer>
        <div className="absolute top-2 right-2 z-[1000]">
          <div className="bg-white rounded-md shadow p-2">
            <p className="text-sm">בחר את מיקומך על המפה</p>
          </div>
        </div>
      </div>
    </div>
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

  const toggleDay = (dayId: string, isOpen: boolean) => {
    const updatedHours = [...formData.openingHours];
    const dayIndex = updatedHours.findIndex(h => h.day === dayId);
    
    if (dayIndex === -1) {
      updatedHours.push({
        day: dayId,
        isOpen,
        openTime: '08:00',
        closeTime: '17:00'
      });
    } else {
      updatedHours[dayIndex].isOpen = isOpen;
    }

    setFormData({ ...formData, openingHours: updatedHours });
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">שעות פעילות</h3>
      </div>

      {days.map(day => (
        <div key={day.id} className="flex items-center gap-6 py-2">
          <div className="w-24">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={(e) => toggleDay(day.id, e.target.checked)}
                className="w-4 h-4"
              />
              <span>{day.label}</span>
            </label>
          </div>

          <div className="flex gap-4">
            <input
              type="time"
              defaultValue="08:00"
              className="p-2 border rounded-md"
            />
            <input
              type="time"
              defaultValue="17:00"
              className="p-2 border rounded-md"
            />
          </div>
        </div>
      ))}

      <div className="mt-6">
        <textarea
          placeholder="הערה"
          className="w-full p-3 border rounded-md h-24"
        />
      </div>
    </div>
  );
}

function ImagesStep({ formData, setFormData }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {formData.images.map((image, index) => (
          <div key={index} className="relative aspect-[4/3] border rounded-md overflow-hidden">
            <Image
              src={image}
              alt={`תמונה ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
            <button 
              className="absolute top-2 right-2 bg-white rounded-full p-1"
              onClick={() => {
                const newImages = formData.images.filter((_, i) => i !== index);
                setFormData({ ...formData, images: newImages });
              }}
            >
              X
            </button>
          </div>
        ))}
        
        <label className="border-2 border-dashed rounded-md aspect-[4/3] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                const newImages = Array.from(files).map(file => URL.createObjectURL(file));
                setFormData({ ...formData, images: [...formData.images, ...newImages] });
              }
            }}
            className="hidden"
          />
          <span className="text-2xl text-gray-400">+</span>
          <span className="text-sm text-gray-500">העלאת תמונות / פרסומות</span>
          <span className="text-xs text-gray-400">(בתוספת תשלום)</span>
        </label>
      </div>
    </div>
  );
}