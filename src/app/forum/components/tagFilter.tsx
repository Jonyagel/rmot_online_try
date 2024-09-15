'use client'
import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { createRoot } from 'react-dom/client';
import './tagFilter.css';

const TagFilter = ({ getAllTags, handleTopicClick, selectedTopic, showAllQuestions }: any) => {
  const [showTags, setShowTags] = useState(true);

  useEffect(() => {
    const tagListContainer = document.getElementById('tagListContainer');
    if (tagListContainer) {
      const root = createRoot(tagListContainer);
      root.render(
        <div className={`tag-list-container ${showTags ? 'show' : ''}`}>
          <div className="tag-list">
            {getAllTags.map((tag: any, index: number) => (
              <button
                key={tag}
                className={`category-tag rounded border ${selectedTopic === tag ? 'active' : ''}`}
                onClick={() => handleTopicClick(tag)}
                style={{ "--tag-index": index } as React.CSSProperties}
              >
                <span className="category-name">{tag}</span>
              </button>
            ))}
          </div>
        </div>
      );

      return () => {
        root.unmount();
      };
    }
  }, [showTags, getAllTags, selectedTopic, handleTopicClick]);

  return (
    <div></div>
    // <div className="tag-filter-container border rounded">
      // <button
      //   className={`expand-button rounded btn border w-100 ${showTags ? 'active' : ''}`}
      //   onClick={() => setShowTags(!showTags)}
      // >
      //   <span className="expand-text me-1">{showTags ? 'הסתר תגים' : 'סנן לפי תגים'}</span>
      //   <i className={`bi ${showTags ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
      // </button>
    // </div>
  );
};

export default TagFilter;