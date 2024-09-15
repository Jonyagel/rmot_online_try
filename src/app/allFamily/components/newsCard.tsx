'use client'
import React from 'react';
import './newsCard.css';

interface ArticleCardProps {
  title: string;
  author: string;
  date: string;
  imageUrl: string;
  link: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, author, date, imageUrl, link }) => {
  return (
    <div className="article-card me-2 shadow-sm">
      <img src={imageUrl} alt={title} className="article-image" />
      <div className="article-content">
        <h3 className="article-title">{title}</h3>
        <div className="article-meta">
          <img src="/images/car2.jpg" alt={author} className="author-avatar" />
          <span className="article-author">{author}</span>
          <span className="article-date">{date}</span>
        </div>
        <a href={link} className="read-more">קרא עוד</a>
      </div>
    </div>
  );
};

export default ArticleCard;