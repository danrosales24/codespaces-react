// src/App.js
import React, { useState, useRef } from 'react';
import { champions } from './data/champions'; // Import champions data
import GuessInput from './componenets/GuessInput';
import GuessHistory from './componenets/GuessHistory';
import GameStatus from './componenets/GameStatus';
import './App.css'; // Import custom styles

function App() {
  const [correctChampion] = useState(
    champions[Math.floor(Math.random() * champions.length)]
  );
  const [guess, setGuess] = useState(''); // User input for the guess
  const [attemptCount, setAttemptCount] = useState(0); // Count attempts
  const [history, setHistory] = useState([]); // Array to store history of guesses and hints
  const [gameWon, setGameWon] = useState(false); // State to track if the game has been won
  const [suggestions, setSuggestions] = useState([]); // State to store matching suggestions
  const [guessedChampions, setGuessedChampions] = useState([]); // Track guessed champions
  const [newEntry, setNewEntry] = useState(null); // Track newly added entry for animation

  // Handle input change and update suggestions
  const handleInputChange = (input) => {
    setGuess(input);
    if (input.length > 0) {
      const filteredSuggestions = champions.filter(
        champ =>
          champ.name.toLowerCase().includes(input.toLowerCase()) &&
          !guessedChampions.includes(champ.name.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Handle guess submission
  const handleGuessSubmit = (selectedGuess = guess) => {
    if (gameWon || !selectedGuess.trim()) return;

    if (guessedChampions.includes(selectedGuess.toLowerCase())) {
      setHistory([{ guess: selectedGuess, hints: ['Already Guessed!'] }, ...history]);
      setNewEntry(0); // Apply animation class
      setTimeout(() => setNewEntry(null), 500); // Remove the class after the animation duration
      setGuess('');
      return;
    }

    const guessedChampion = champions.find(champ => champ.name.toLowerCase() === selectedGuess.toLowerCase());

    if (!guessedChampion) {
      setHistory([{ guess: selectedGuess, hints: ['Invalid Champion'] }, ...history]);
    } else if (guessedChampion.name === correctChampion.name) {
      setHistory([{ guess: guessedChampion.name, hints: ['Correct!'] }, ...history]);
      setNewEntry(0); // Apply animation class
      setTimeout(() => setNewEntry(null), 500); // Remove the class after the animation duration
      setGameWon(true); // Trigger the win animation
    } else {
      const newHints = [];
      newHints.push(guessedChampion.role === correctChampion.role ? 'Correct Role' : 'Wrong Role');
      newHints.push(guessedChampion.region === correctChampion.region ? 'Correct Region' : 'Wrong Region');
      newHints.push(guessedChampion.letterCount === correctChampion.letterCount ? 'Correct Letter Count' : 'Wrong Letter Count');

      setHistory([{ guess: guessedChampion.name, hints: newHints }, ...history]);
      setGuessedChampions([...guessedChampions, guessedChampion.name.toLowerCase()]);
      setAttemptCount(attemptCount + 1); // Increment the attempt counter
      setNewEntry(0); // Apply animation class
      setTimeout(() => setNewEntry(null), 500); // Remove the class after the animation duration
    }

    setGuess('');
    setSuggestions([]);
  };

  return (
    <div className="App">
      <h1>Loldle Clone</h1>
      <p>Attempts: {attemptCount}</p> {/* Display the attempt count */}

      <GuessInput
        guess={guess}
        suggestions={suggestions}
        onInputChange={handleInputChange}
        onSubmit={handleGuessSubmit}
        gameWon={gameWon}
      />

      <GameStatus gameWon={gameWon} correctChampion={correctChampion} />

      <GuessHistory history={history} newEntry={newEntry} />
    </div>
  );
}

export default App;