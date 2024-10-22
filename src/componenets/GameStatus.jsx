// src/components/GameStatus.js
import React from 'react';

function GameStatus({ gameWon, correctChampion }) {
  return (
    <div>
      {gameWon && (
        <p className="victory-message">
          🎉 Congratulations! 🎉
        </p>
      )}
    </div>
  );
}

export default GameStatus;
