import React, { useState, useMemo } from 'react';
import './SuggestionsSearch.css';
import { debounce } from 'lodash';
import { PlacesService, Suggestion } from '../../services/PlacesService';

interface SuggestionsSearchProps {
    onSuggestionSelect: (suggestion: Suggestion) => void;
}

const SuggestionsSearch: React.FC<SuggestionsSearchProps> = ({ onSuggestionSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const fetchSuggestions = async (query: string) => {
        setLoading(true);
        try {
            const response = await PlacesService.getCitiesSuggestions(query);
            setSuggestions(response);
            setShowSuggestions(true);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        } finally {
            setLoading(false);
        }
    };

    const debouncedFetchSuggestions = useMemo(() => debounce(fetchSuggestions, 300), []);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchTerm(value);
        if (value.trim()) {
            debouncedFetchSuggestions(value);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion: Suggestion) => {
        console.log(suggestion);

        setSearchTerm(suggestion.city);
        setShowSuggestions(false);
        onSuggestionSelect(suggestion);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown' && activeIndex < suggestions.length - 1) {
            setActiveIndex((prevIndex) => prevIndex + 1);
        } else if (e.key === 'ArrowUp' && activeIndex > 0) {
            setActiveIndex((prevIndex) => prevIndex - 1);
        } else if (e.key === 'Enter' && activeIndex >= 0) {
            handleSuggestionClick(suggestions[activeIndex]);
        }
    };

    const clearInput = () => {
        setSearchTerm('');
        setSuggestions([]);
        setShowSuggestions(false);
    };

    return (
        <div className="suggestions-search">
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
                autoComplete="off"
            />
            {searchTerm && (
                <button
                    type="button"
                    onClick={clearInput}
                    className='clear-input'
                >
                    ✕
                </button>
            )}
            {loading && <div className="suggestions-list">Loading...</div>}
            {showSuggestions && suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={suggestion.id}
                            className={index === activeIndex ? 'active' : ''}
                            onClick={() => handleSuggestionClick(suggestion)}
                            onMouseEnter={() => setActiveIndex(index)}
                        >
                            {suggestion.city + ', ' + suggestion.country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SuggestionsSearch;
