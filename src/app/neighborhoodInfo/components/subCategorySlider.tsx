'use client'
import React, { useRef, useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './subCategorySlider.css';

interface Category {
  name: string;
  icon: React.ReactNode;
}

interface CategoryRowProps {
  categories: Category[];
  activeSubcategory: string;
  setActiveSubcategory: (category: string) => void;
  doApi: (category: string | null) => void;
}

const CategoryRow: React.FC<CategoryRowProps> = ({
  categories,
  activeSubcategory,
  setActiveSubcategory,
  doApi,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (rowRef.current) {
        e.preventDefault();
        rowRef.current.scrollLeft += e.deltaY;
      }
    };

    const rowElement = rowRef.current;
    if (rowElement) {
      rowElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (rowElement) {
        rowElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - rowRef.current!.offsetLeft);
    setScrollLeft(rowRef.current!.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - rowRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    rowRef.current!.scrollLeft = scrollLeft - walk;
  };

  const handleCategoryClick = (categoryName: string) => {
    if (activeSubcategory === categoryName) {
      setActiveSubcategory('');
      doApi(null);
    } else {
      setActiveSubcategory(categoryName);
      doApi(categoryName);
    }
  };

  return (
    <div className="category-row-container">
      <button className="arrow-button left" onClick={() => scroll('left')}>
        <FaChevronLeft />
      </button>
      <div 
        className="category-row" 
        ref={rowRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category-item ${activeSubcategory === category.name ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category.name)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </div>
        ))}
      </div>
      <button className="arrow-button right" onClick={() => scroll('right')}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default CategoryRow;