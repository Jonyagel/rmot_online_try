import React from 'react';
import './evelCard.css';

interface EvelCardProps {
  deceasedName: string; // שם הנפטר
  deceasedDate: string; // תאריך הפטירה
  parentName: string; // שם האב/אם
  funeralLocation: string; // מקום ההלוויה
  shivaAddress: string; // כתובת השבעה
}

const EvelCard: React.FC<EvelCardProps> = ({
  deceasedName,
  deceasedDate,
  parentName,
  funeralLocation,
  shivaAddress
}) => {
  return (
    <div className="news-card shadow-sm p-3 mb-3 rounded border border-dark">
      <h4 className="font-bold text-center mb-3 text-danger">בצער רב אנו מודיעים על פטירתו של</h4>
      <div className="news-container">
        <ul className="list-unstyled news-list">
          <li className="mb-4 news-item border-bottom pb-3">
            <h5 className="font-weight-bold">שם הנפטר: {deceasedName}</h5>
            <p className="text-muted">נפטר ביום: {deceasedDate}</p>
            <p className="text-muted">בן/בת: {parentName}</p>
            <p className="text-muted">ההלוויה תתקיים ב: {funeralLocation}</p>
            <p className="text-muted">שבעה ייערך ב: {shivaAddress}</p>
          </li>
        </ul>
      </div>
      <div className="text-center mt-3">
        <button className="btn btn-outline-danger">פרטים נוספים</button>
      </div>
    </div>
  );
};

export default EvelCard;