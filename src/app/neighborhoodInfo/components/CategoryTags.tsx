'use client'
import React, { useState, useRef } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './CategoryTags.css';
import { useMediaQuery } from 'react-responsive';

interface Category {
  name: string;
  icon: React.ReactNode;
}

interface CategoryTagsProps {
  categories: Category[];
  activeSubcategory: string;
  setActiveSubcategory: (category: string) => void;
  doApi: (endpoint: string, category: string | null) => void;
  activeTab:string;
}

const CategoryTags: React.FC<CategoryTagsProps> = ({
  categories,
  activeSubcategory,
  setActiveSubcategory,
  doApi,
  activeTab,
}) => {
  const [expanded, setExpanded] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 }); // מזהה אם המכשיר הוא טלפון נייד

  const visibleCategories = isMobile ? 3 : 6; // מספר הקטגוריות המוצגות בהתחלה

  const handleCategoryClick = (categoryName: string) => {
    if (activeSubcategory === categoryName) {
      setActiveSubcategory('');
      doApi(activeTab,null);
    } else {
      setActiveSubcategory(categoryName);
      doApi(activeTab,categoryName);
    }
  };

  return (
    <div className="category-tags-container">
      <div className="category-tags">
        {categories.slice(0, expanded ? categories.length : visibleCategories).map((category, index) => (
          <button
            key={index}
            className={`category-tag border rounded ${activeSubcategory === category.name ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category.name)}
          >
            <span className="category-icon"><i className={`bi bi-${category.icon}`} ></i></span>
            <span className="category-name">{category.name}</span>
          </button>
        ))}
        {categories.length > visibleCategories && (
          <button
            className="expand-button rounded"
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? "הצג פחות קטגוריות" : "הצג עוד קטגוריות"}
          >
            <span className="expand-text ms-1">{expanded ? 'פחות' : 'עוד'}</span>
            {expanded ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryTags;
