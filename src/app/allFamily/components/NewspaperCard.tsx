'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
// import NewspaperViewer from './NewspaperViewer';
import './NewspaperCard.css';

interface NewspaperCardProps {
  title: string;
  imageUrl: string;
  distance: string;
  pdfUrl: string;
  onDownload: () => void;
}

const NewspaperCard: React.FC<NewspaperCardProps> = ({ title, imageUrl, distance, pdfUrl, onDownload }) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    console.log("PDF URL in NewspaperCard:", pdfUrl);
  }, [pdfUrl]);

  return (
    <>
      <div className="newspaper-card">
        <div className="newspaper-card-image">
          <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
        </div>
        <div className="newspaper-card-content">
          <h2 className="newspaper-card-title">{title}</h2>
          <div className="newspaper-card-footer">
            <span className="newspaper-card-distance">{distance}</span>
            <div className="newspaper-card-actions">
              <button className="newspaper-card-view" onClick={() => setIsViewerOpen(true)}>
                צפה בעיתון
              </button>
              <button className="newspaper-card-download" onClick={onDownload}>
                הורד עיתון
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* {isViewerOpen && (
        <NewspaperViewer
          pdfUrl={pdfUrl}
          onClose={() => setIsViewerOpen(false)}
        />
      )} */}
    </>
  );
};

export default NewspaperCard;