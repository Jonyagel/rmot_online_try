'use client'
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './tagFilter.css';

interface TagFilterProps {
  getAllTags: string[];
  handleTopicClick: (tag: string) => void;
  selectedTopic: string;
}

const TagFilter: React.FC<TagFilterProps> = ({
  getAllTags,
  handleTopicClick,
  selectedTopic,
}) => {
  const [showTags, setShowTags] = useState(true);
  const [expanded, setExpanded] = useState(false);

  if (!getAllTags || !Array.isArray(getAllTags)) {
    return <div>אין תגים זמינים</div>;
  }

  return (
    <div className={`tag-list-container ${showTags ? 'show' : ''}`}>
      <div className="tag-list">
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
};

export default TagFilter;
