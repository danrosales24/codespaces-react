// src/components/GuessInput.js
import React, { useEffect, useState, useRef } from 'react';

function GuessInput({ guess, suggestions, onInputChange, onSubmit, gameWon }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null); // Reference to detect outside clicks

  // Handle input change directly without debounce
  const handleInputChange = (value) => {
    onInputChange(value);
    setShowSuggestions(true); // Show dropdown only if typing
  };

  // Close dropdown if clicking outside the input or dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false); // Close dropdown
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  // Handle selecting a suggestion (auto-submit)
  const handleSuggestionClick = (suggestion) => {
    onInputChange(suggestion.name); // Set the input field to the selected suggestion
    onSubmit(suggestion.name); // Automatically submit the selected champion
    setShowSuggestions(false); // Hide dropdown
  };

  return (
    <div className="input-wrapper" ref={wrapperRef}>
      <input
        type="text"
        value={guess}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Guess a champion..."
        disabled={gameWon}
      />

      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => onSubmit()} disabled={gameWon}>Submit</button>
    </div>
  );
}

export default GuessInput;
