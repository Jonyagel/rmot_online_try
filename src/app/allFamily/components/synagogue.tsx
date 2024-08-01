import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSynagogue, faMapMarkerAlt, faSun, faCloudSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { Card, Col, Form, ListGroup } from 'react-bootstrap';

const StyledCard = styled(Card)`
  border: none;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const CardHeader = styled(Card.Header)`
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  font-weight: bold;
  padding: 1rem;
`;

const SynagogueList = styled(ListGroup)`
  max-height: 500px;
  overflow-y: auto;
`;

const SynagogueItem = styled(ListGroup.Item)`
  border: none;
  border-bottom: 1px solid #ecf0f1;
  padding: 1rem;

  &:last-child {
    border-bottom: none;
  }
`;

const SynagogueName = styled.h4`
  color: #2c3e50;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const SynagogueAddress = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const PrayerTimes = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 0.5rem;
`;

const PrayerTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  span {
    font-size: 0.8rem;
    color: #7f8c8d;
    margin: 0.2rem 0;
  }

  strong {
    font-size: 1rem;
    color: #2c3e50;
  }
`;

const DaySelector = styled(Form.Select)`
  margin-bottom: 1rem;
`;

const SynagogueCard = (props:any) => {
  const [selectedDay, setSelectedDay] = useState('weekday');

  return (
    <Col md={6}>
      <StyledCard>
        <CardHeader>
          <FontAwesomeIcon icon={faSynagogue} className="mr-2" /> בתי כנסת באזור
        </CardHeader>
        <Card.Body>
          <DaySelector 
            value={selectedDay} 
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            <option value="weekday">יום חול</option>
            <option value="saturday">שבת</option>
          </DaySelector>
          <SynagogueList>
            {props.synagogues.map((synagogue:any, index:any) => (
              <SynagogueItem key={index}>
                <SynagogueName>{synagogue.name}</SynagogueName>
                <SynagogueAddress>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                  {synagogue.address}
                </SynagogueAddress>
                <PrayerTimes>
                  <PrayerTime>
                    <FontAwesomeIcon icon={faSun} />
                    <span>שחרית</span>
                    <strong>{synagogue.prayerTimes[selectedDay].shacharit}</strong>
                  </PrayerTime>
                  <PrayerTime>
                    <FontAwesomeIcon icon={faCloudSun} />
                    <span>מנחה</span>
                    <strong>{synagogue.prayerTimes[selectedDay].mincha}</strong>
                  </PrayerTime>
                  <PrayerTime>
                    <FontAwesomeIcon icon={faMoon} />
                    <span>ערבית</span>
                    <strong>{synagogue.prayerTimes[selectedDay].arvit}</strong>
                  </PrayerTime>
                </PrayerTimes>
              </SynagogueItem>
            ))}
          </SynagogueList>
        </Card.Body>
      </StyledCard>
    </Col>
  );
};

export default SynagogueCard;