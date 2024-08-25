import React, { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './subCategorySlider.css';

interface Category {
  name: string;
  icon: React.ReactNode;
}

interface CategorySliderProps {
  categories: Category[];
  activeSubcategory: string;
  setActiveSubcategory: (category: string) => void;
  doApi: (category: string) => void;
}

const CategorySlider: React.FC<CategorySliderProps> = ({
  categories,
  activeSubcategory,
  setActiveSubcategory,
  doApi,
}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkArrows = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeftArrow(scrollLeft > -1);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkArrows();
    window.addEventListener('resize', checkArrows);
    return () => window.removeEventListener('resize', checkArrows);
  }, [categories]);

  const scroll = (direction: 'left' | 'right') => {
    const container = sliderRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -container.clientWidth : container.clientWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkArrows, 300);
    }
  };

  return (
    <div className="category-slider-container">
      {showLeftArrow && (
        <button className="slider-arrow left" onClick={() => scroll('left')}>
          <FaChevronLeft />
        </button>
      )}
      <div className="category-slider" ref={sliderRef} onScroll={checkArrows}>
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category-item ${activeSubcategory === category.name ? 'active' : ''}`}
            onClick={() => {
              setActiveSubcategory(category.name);
              doApi(category.name);
            }}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </div>
        ))}
      </div>
      {showRightArrow && (
        <button className="slider-arrow right" onClick={() => scroll('right')}>
          <FaChevronRight />
        </button>
      )}
    </div>
  );
};

export default CategorySlider;