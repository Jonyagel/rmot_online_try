'use client'
import React, { useState } from 'react';
import './EngagementForm.css';

interface EngagementFormProps {
  onSubmit: (engagement: any) => void;
}

const EngagementForm: React.FC<EngagementFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    groomName: '',
    groomFather: '',
    groomInstitution: '',
    groomCity: '',
    brideName: '',
    brideFather: '',
    brideInstitution: '',
    brideCity: '',
    date: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      groomName: '',
      groomFather: '',
      groomInstitution: '',
      groomCity: '',
      brideName: '',
      brideFather: '',
      brideInstitution: '',
      brideCity: '',
      date: '',
    });
  };

  return (
    <form className="engagement-form" onSubmit={handleSubmit}>
      <h3>הוסף אירוסין חדשים</h3>
      <div className="form-group">
        <input
          type="text"
          name="groomName"
          value={formData.groomName}
          onChange={handleChange}
          placeholder="שם החתן"
          required
        />
        <input
          type="text"
          name="groomFather"
          value={formData.groomFather}
          onChange={handleChange}
          placeholder="שם אבי החתן"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="groomInstitution"
          value={formData.groomInstitution}
          onChange={handleChange}
          placeholder="מוסד החתן"
          required
        />
        <input
          type="text"
          name="groomCity"
          value={formData.groomCity}
          onChange={handleChange}
          placeholder="עיר החתן"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="brideName"
          value={formData.brideName}
          onChange={handleChange}
          placeholder="שם הכלה"
          required
        />
        <input
          type="text"
          name="brideFather"
          value={formData.brideFather}
          onChange={handleChange}
          placeholder="שם אבי הכלה"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="brideInstitution"
          value={formData.brideInstitution}
          onChange={handleChange}
          placeholder="מוסד הכלה"
          required
        />
        <input
          type="text"
          name="brideCity"
          value={formData.brideCity}
          onChange={handleChange}
          placeholder="עיר הכלה"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="date"
          value={formData.date}
          onChange={handleChange}
          placeholder="תאריך האירוסין"
          required
        />
      </div>
      <button type="submit">הוסף אירוסין</button>
    </form>
  );
};

export default EngagementForm;