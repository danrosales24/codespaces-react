// src/components/GuessHistory.js
import React from 'react';
import Hints from './Hints';

function GuessHistory({ history, newEntry }) {
  return (
    <div className="history-container">
      {history.map((entry, index) => (
        <div
          key={index}
          className={`history-entry ${index === newEntry ? 'new-entry' : ''}`}
        >
          <p><strong>Guess: {entry.guess}</strong></p>
          <Hints hints={entry.hints} />
        </div>
      ))}
    </div>
  );
}

export default GuessHistory;
