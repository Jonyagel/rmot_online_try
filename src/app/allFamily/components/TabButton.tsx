import React from 'react';

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const TabButton: React.FC<TabButtonProps> = ({ active, onClick, children }) => {
  return (
    <button
      className={`px-4 py-2 rounded ${active ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};