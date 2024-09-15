import React from 'react';
import { FaClock } from 'react-icons/fa';
import './ShabbatTimes.css';

interface CityTime {
  city: string;
  enter: string;
  exit: string;
}

const ShabbatTimes: React.FC = () => {
  const times: CityTime[] = [
    { city: 'ירושלים', enter: '16:21', exit: '17:40' },
    { city: 'תל אביב', enter: '16:39', exit: '17:41' },
    { city: 'חיפה', enter: '16:29', exit: '17:39' },
    { city: 'באר שבע', enter: '16:42', exit: '17:42' },
  ];

  return (
    <div className="shabbat-times">
      <div className="shabbat-header">
        <FaClock className="shabbat-icon" />
        <h3>זמני כניסת ויציאת השבת</h3>
      </div>
      <div className="times-grid">
        {times.map((time, index) => (
          <div key={index} className="city-time">
            <span className="city">{time.city}</span>
            <span className="time">
              <span className="enter">{time.enter}</span>
              <span className="exit">{time.exit}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShabbatTimes;