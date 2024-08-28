'use client'
import React, { useState } from 'react';
import { Button, Badge, Collapse } from 'react-bootstrap';

const TagFilter = ({ getAllTags, handleTopicClick, selectedTopic, showAllQuestions }:any) => {
  const [showTags, setShowTags] = useState(false);

  return (
    <div className="my-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center">
        <div className="mb-3 mb-md-0">
          <Button 
            variant={showTags ? "primary" : "light"} 
            onClick={() => setShowTags(!showTags)} 
            className="border me-2"
          >
            {showTags ? "הסתר תגים" : "סנן לפי תגים"}
          </Button>
          {/* <Button variant="outline-primary" onClick={showAllQuestions}>
            הצג את כל השאלות
          </Button> */}
        </div>
      </div>
      
      <Collapse in={showTags}>
        <div className="mt-3">
          {getAllTags().map((tag:any) => (
            <Badge
              key={tag}
              bg={selectedTopic === tag ? "primary" : "secondary"}
              className="me-2 mb-2"
              style={{ cursor: 'pointer' }}
              onClick={() => handleTopicClick(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default TagFilter;