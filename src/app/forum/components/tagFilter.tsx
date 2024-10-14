'use client'
import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { createRoot } from 'react-dom/client';
import './tagFilter.css';

// הוסף את ההגדרה של TagFilterProps
interface TagFilterProps {
  getAllTags: string[];
  handleTopicClick: (tag: string) => void;
  selectedTopic: string;
  // showAllQuestions: boolean;
}

const TagFilter: React.FC<TagFilterProps> = ({
  getAllTags,
  handleTopicClick,
  selectedTopic,
  // showAllQuestions,
}) => {
  const [showTags, setShowTags] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const tagsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tagListContainer = document.getElementById('tagListContainer');
    if (tagListContainer) {
      const root = createRoot(tagListContainer);
      root.render(
        <div className={`tag-list-container ${showTags ? 'show' : ''}`}>
          <div className="tag-list" ref={tagsRef}>
            {getAllTags.slice(0, expanded ? getAllTags.length : 6).map((tag: any, index: number) => (
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
          {getAllTags.length > 6 && (
            <button
              className="expand-button rounded"
              onClick={() => setExpanded(!expanded)}
              aria-label={expanded ? "הצג פחות תגים" : "הצג עוד תגים"}
            >
              <span className="expand-text me-1">{expanded ? 'פחות' : 'עוד'}</span>
              {expanded ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          )}
        </div>
      );

      return () => {
        root.unmount();
      };
    }
  }, [showTags, getAllTags, selectedTopic, handleTopicClick, expanded]);

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
