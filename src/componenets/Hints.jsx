// src/components/Hints.js
import React from 'react';

function Hints({ hints }) {
  return (
    <div className="hints-container">
      {hints.map((hint, index) => (
        <div key={index} className={`hint-box ${hint.includes('Wrong') ? 'gray' : 'green'}`}>
          {hint}
        </div>
      ))}
    </div>
  );
}

export default Hints;
