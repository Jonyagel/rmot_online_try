'use client'
import React from 'react';


const EngagementCard = (props: any) => (
    <div className="engagement-card">
        <div className="card-header">
            <h2 className="engagement-title">מודעת מאורסים</h2>
        </div>
        <div className="card-body">
            <div className="couple-section">
                <div className="person-details groom-details">
                    <h3>{props.engagementData.groomName}</h3>
                    <p>{props.engagementData.groomFather}</p>
                    <p>{props.engagementData.groomInstitution}</p>
                    <p>{props.engagementData.groomCity}</p>
                </div>
                <div className="person-details bride-details">
                    <h3>{props.engagementData.brideName}</h3>
                    <p>{props.engagementData.brideFather}</p>
                    <p>{props.engagementData.brideInstitution}</p>
                    <p>{props.engagementData.brideCity}</p>
                </div>
            </div>
            <p className="engagement-date">{props.engagementData.date}</p>
        </div>
    </div>
);

export default EngagementCard;


import './smachot.css'