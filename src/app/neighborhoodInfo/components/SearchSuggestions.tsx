import React, { useState, useEffect, useRef } from 'react';
import './SearchSuggestions.css'
import { FaPlus } from 'react-icons/fa';

const SearchSuggestions = ({ searchTerm, onSelect, isOpen, setIsOpen, selectedSuggestion, dataBusiness }:any) => {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const suggestionsRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (searchTerm) {
            const filteredSuggestions = dataBusiness
                .filter((business:any) => 
                    business.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((business:any) => business.name);
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [searchTerm]);

    const handleClickOutside = (event: MouseEvent) => {
        if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        isOpen && (
            <ul className="suggestions-list" ref={suggestionsRef}>
                {suggestions.map((suggestion) => (
                    <li key={suggestion} className={selectedSuggestion === suggestion ? 'selected-suggestion' : ''}>
                        <span onClick={() => {
                            onSelect(suggestion);
                        }}>
                            {suggestion}
                        </span>
                        {selectedSuggestion === suggestion && (
                            <button onClick={() => {
                                onSelect(''); // לוגיקה לביטול הבחירה
                            }}>
                                <FaPlus />
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        )
    );
};

export default SearchSuggestions;
