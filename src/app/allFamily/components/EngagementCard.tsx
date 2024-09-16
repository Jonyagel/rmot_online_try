import React from 'react';
import { FaRing, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import './EngagementCard.css';

interface EngagementCardProps {
  groomName: string;
  groomFather: string;
  groomInstitution: string;
  groomCity: string;
  brideName: string;
  brideFather: string;
  brideInstitution: string;
  brideCity: string;
  date: string;
}

const EngagementCard: React.FC<EngagementCardProps> = ({
  groomName,
  groomFather,
  groomInstitution,
  groomCity,
  brideName,
  brideFather,
  brideInstitution,
  brideCity,
  date
}) => {
  return (
    <div className="engagement-card border mt-2 ">
      <div className="card-header">
        {/* <FaRing className="card-icon" /> */}
        <h3 >מאורסים</h3>
      </div>
      <div className="couple-details">
        <div className="person-details">
          <h4>{groomName}</h4>
          <p>בן {groomFather}</p>
          <p>{groomInstitution}</p>
          <p> {groomCity}</p>
        </div>
        <div className="person-details">
          <h4>{brideName}</h4>
          <p>בת {brideFather}</p>
          <p>{brideInstitution}</p>
          <p> {brideCity}</p>
        </div>
      </div>
      <div className="card-footer">
        {/* <FaCalendarAlt /> */}
        <span>{date}</span>
      </div>
    </div>
  );
};

export default EngagementCard;