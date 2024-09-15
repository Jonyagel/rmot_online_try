import React from 'react';
import { FaBook } from 'react-icons/fa';
import './DailyHalacha.css';

interface DailyHalachaProps {
  title: string;
  content: string;
}

const DailyHalacha: React.FC<DailyHalachaProps> = ({ title, content }) => (
  <div className="daily-halacha">
    <div className="halacha-header">
      <FaBook className="halacha-icon" />
      <h3>{title}</h3>
    </div>
    <p>{content}</p>
    <a href="#" className="learn-more">למד עוד</a>
  </div>
);

export default DailyHalacha;