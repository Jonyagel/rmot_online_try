'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Image from 'next/image';
import { toast } from 'react-toastify';

interface BusinessForm {
  name: string;
  phone: string;
  email: string;
  category: string;
  description: string;
  address: string;
  openingHours: OpeningHours[];
  images: ImageFile[];
  location: {
    lat: number;
    lng: number;
  };
  logo?: string;
}

interface ImageFile {
  url: string;
  file?: File;
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
  onNext?: () => void;
  onBack?: () => void;
}

const INITIAL_FORM_DATA: BusinessForm = {
  name: '',
  phone: '',
  email: '',
  category: '',
  description: '',
  address: '',
  openingHours: [],
  images: [],
  location: { lat: 31.7683, lng: 35.2137 }
};

export default function BusinessForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BusinessForm>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedData = localStorage.getItem('businessFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('businessFormData', JSON.stringify(formData));
  }, [formData]);

  const validateForm = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1:
        if (!formData.name) newErrors.name = 'שם העסק הוא שדה חובה';
        if (!formData.phone) newErrors.phone = 'מספר טלפון הוא שדה חובה';
        if (!formData.email) {
          newErrors.email = 'כתובת אימייל היא שדה חובה';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'כתובת אימייל אינה תקינה';
        }
        if (!formData.category) newErrors.category = 'קטגוריה היא שדה חובה';
        break;

      case 2:
        if (!formData.address) newErrors.address = 'כתובת היא שדה חובה';
        break;

      case 3:
        if (formData.openingHours.length === 0) {
          newErrors.openingHours = 'יש להגדיר לפחות יום פעילות אחד';
        }
        break;

      case 4:
        // Optional validation for images
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm(step)) {
      if (step < 4) {
        setStep(prev => prev + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm(4)) return;

    try {
      setIsSubmitting(true);
      
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('data', JSON.stringify(formData));
      
      // Append images
      formData.images.forEach((image, index) => {
        if (image.file) {
          formDataToSend.append(`image_${index}`, image.file);
        }
      });

      // Append logo if exists
      if (formData.logo) {
        formDataToSend.append('logo', formData.logo);
      }

      // Replace with your API endpoint
      const response = await fetch('/api/businesses', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('שגיאה בשליחת הטופס');

      toast.success('העסק נשלח בהצלחה לאישור');
      localStorage.removeItem('businessFormData');
      setFormData(INITIAL_FORM_DATA);
      setStep(1);
      
    } catch (error) {
      toast.error('אירעה שגיאה בשליחת הטופס');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rtl max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">הוספת עסק חדש</h1>
        <button 
          className="text-gray-500 hover:text-gray-700"
          onClick={() => {
            if (confirm('האם אתה בטוח שברצונך לבטל? כל הנתונים שהזנת יאבדו')) {
              localStorage.removeItem('businessFormData');
              setFormData(INITIAL_FORM_DATA);
              // Add navigation logic here
            }
          }}
        >
          <span className="sr-only">סגור</span>
          ✕
        </button>
      </div>

      <div className="mb-8">
        <StepsIndicator currentStep={step} />
      </div>
      
      <div className="min-h-[400px]">
        {step === 1 && (
          <BusinessDetails 
            formData={formData} 
            setFormData={setFormData}
            onNext={handleNext}
            errors={errors}
          />
        )}
        {step === 2 && (
          <LocationStep 
            formData={formData} 
            setFormData={setFormData}
            onNext={handleNext}
            onBack={handleBack}
            errors={errors}
          />
        )}
        {step === 3 && (
          <OpeningHoursStep 
            formData={formData} 
            setFormData={setFormData}
            onNext={handleNext}
            onBack={handleBack}
            errors={errors}
          />
        )}
        {step === 4 && (
          <ImagesStep 
            formData={formData} 
            setFormData={setFormData}
            onBack={handleBack}
            errors={errors}
          />
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button 
          onClick={handleBack}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
          disabled={step === 1 || isSubmitting}
        >
          חזור
        </button>
        <button 
          onClick={handleNext}
          disabled={isSubmitting}
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'שולח...' : step === 4 ? 'שליחה לאישור' : 'המשך'}
        </button>
      </div>
    </div>
  );
}

function StepsIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { num: 1, label: 'פרטי העסק' },
    { num: 2, label: 'מיקום' },
    { num: 3, label: 'שעות פתיחה' },
    { num: 4, label: 'תמונות' },
  ];

  return (
    <div className="flex justify-between items-center">
      {steps.map((step, index) => (
        <div key={step.num} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${currentStep >= step.num ? 'bg-green-500 text-white' : 'bg-gray-200'}
            `}>
              {step.num}
            </div>
            <span className="text-sm mt-1">{step.label}</span>
          </div>
          {index < steps.length - 1 && (
            <div className={`h-1 flex-1 mx-2 
              ${currentStep > step.num ? 'bg-green-500' : 'bg-gray-200'}`} 
            />
          )}
        </div>
      ))}
    </div>
  );
}

function BusinessDetails({ formData, setFormData, errors }: StepProps & { errors: Record<string, string> }) {
  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      toast.error('הלוגו גדול מדי. גודל מקסימלי הוא 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, logo: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm mb-2">
            שם העסק
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full p-3 border rounded-md ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        
        {/* Add similar error handling for other fields */}
        
        <div className="col-span-2">
          <label className="block text-sm mb-2">לוגו העסק</label>
          <div className="border-2 border-dashed rounded-md p-4">
            {formData.logo ? (
              <div className="relative w-32 h-32">
                <Image
                  src={formData.logo}
                  alt="לוגו העסק"
                  layout="fill"
                  objectFit="contain"
                />
                <button
                  onClick={() => setFormData({ ...formData, logo: undefined })}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="cursor-pointer text-blue-500 hover:text-blue-600"
                >
                  + העלה לוגו (מומלץ)
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LocationStep({ formData, setFormData, errors }: StepProps & { errors: Record<string, string> }) {
  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        setFormData({
          ...formData,
          location: { lat: e.latlng.lat, lng: e.latlng.lng }
        });
      },
    });
    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm mb-2">
          כתובת
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className={`w-full p-3 border rounded-md ${errors.address ? 'border-red-500' : ''}`}
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
      </div>
      
      <div className="h-[400px] relative border rounded-md overflow-hidden">
        <MapContainer
          center={[formData.location.lat, formData.location.lng]}
          zoom={13}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[formData.location.lat, formData.location.lng]} />
          <MapEvents />
        </MapContainer>
        <div className="absolute top-2 right-2 z-[1000]">
          <div className="bg-white rounded-md shadow p-2">
            <p className="text-sm">לחץ על המפה לבחירת מיקום</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OpeningHoursStep({ formData, setFormData, errors }: StepProps & { errors: Record<string, string> }) {
  const days = [
    { id: 'sunday', label: 'ראשון' },
    { id: 'monday', label: 'שני' },
    { id: 'tuesday', label: 'שלישי' },
    { id: 'wednesday', label: 'רביעי' },
    { id: 'thursday', label: 'חמישי' },
    { id: 'friday', label: 'שישי' },
    { id: 'saturday', label: 'שבת' },
  ];

  const updateHours = (dayId: string, field: keyof OpeningHours, value: any) => {
    const updatedHours = [...formData.openingHours];
    const dayIndex = updatedHours.findIndex(h => h.day === dayId);
    
    if (dayIndex === -1) {
      updatedHours.push({
        day: dayId,
        isOpen: field === 'isOpen' ? value : true,
        openTime: field === 'openTime' ? value : '08:00',
        closeTime: field === 'closeTime' ? value :'17:00'
      });
    } else {
      updatedHours[dayIndex] = {
        ...updatedHours[dayIndex],
        [field]: value
      };
    }

    setFormData({ ...formData, openingHours: updatedHours });
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-medium">שעות פעילות</h3>
        {errors.openingHours && (
          <p className="text-red-500 text-sm mt-1">{errors.openingHours}</p>
        )}
      </div>

      {days.map(day => {
        const dayHours = formData.openingHours.find(h => h.day === day.id);
        
        return (
          <div key={day.id} className="flex items-center gap-6 py-2 border-b last:border-0">
            <div className="w-24">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={dayHours?.isOpen || false}
                  onChange={(e) => updateHours(day.id, 'isOpen', e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span>{day.label}</span>
              </label>
            </div>

            {(dayHours?.isOpen || false) && (
              <div className="flex items-center gap-4">
                <input
                  type="time"
                  value={dayHours?.openTime || '08:00'}
                  onChange={(e) => updateHours(day.id, 'openTime', e.target.value)}
                  className="p-2 border rounded-md"
                />
                <span>עד</span>
                <input
                  type="time"
                  value={dayHours?.closeTime || '17:00'}
                  onChange={(e) => updateHours(day.id, 'closeTime', e.target.value)}
                  className="p-2 border rounded-md"
                />
              </div>
            )}
          </div>
        );
      })}

      <div className="mt-6">
        <label className="block text-sm mb-2">הערות נוספות</label>
        <textarea
          placeholder="למשל: סגור בחגים, שעות משתנות בחגים וכו'"
          className="w-full p-3 border rounded-md h-24"
        />
      </div>
    </div>
  );
}

function ImagesStep({ formData, setFormData, errors }: StepProps & { errors: Record<string, string> }) {
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    
    const processFile = (file: File): Promise<ImageFile> => {
      return new Promise((resolve, reject) => {
        if (file.size > maxSize) {
          reject(`הקובץ ${file.name} גדול מדי. גודל מקסימלי הוא 5MB`);
          return;
        }
        
        if (!allowedTypes.includes(file.type)) {
          reject(`הקובץ ${file.name} אינו בפורמט תקין. יש להעלות תמונות JPG, PNG או WebP`);
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            url: reader.result as string,
            file
          });
        };
        reader.onerror = () => reject('שגיאה בקריאת הקובץ');
        reader.readAsDataURL(file);
      });
    };

    try {
      const newImages = await Promise.all(
        Array.from(files).map(processFile)
      );
      
      setFormData({
        ...formData,
        images: [...formData.images, ...newImages].slice(0, 9) // Maximum 9 images
      });
    } catch (error) {
      toast.error(error as string);
    }
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {formData.images.map((image, index) => (
          <div key={index} className="relative aspect-[4/3] group">
            <div className="absolute inset-0 border rounded-md overflow-hidden">
              <Image
                src={image.url}
                alt={`תמונה ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <button 
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeImage(index)}
            >
              <span className="sr-only">הסר תמונה</span>
              ✕
            </button>
          </div>
        ))}
        
        {formData.images.length < 9 && (
          <label className="border-2 border-dashed rounded-md aspect-[4/3] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageUpload}
              className="hidden"
            />
            <span className="text-2xl text-gray-400">+</span>
            <span className="text-sm text-gray-500 text-center px-4">
              העלאת תמונות
              <br />
              (עד 9 תמונות, מקסימום 5MB לתמונה)
            </span>
          </label>
        )}
      </div>

      {errors.images && (
        <p className="text-red-500 text-sm">{errors.images}</p>
      )}
    </div>
  );
}