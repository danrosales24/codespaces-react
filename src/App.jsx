// src/App.js
import React, { useState, useRef } from 'react';
import { champions } from './data/champions'; // Import champions data
import './App.css'; // Import custom styles

function App() {
  const [correctChampion] = useState(
    champions[Math.floor(Math.random() * champions.length)]
  );
  const [guess, setGuess] = useState(''); // User input for the guess
  const [attempts, setAttempts] = useState(5); // Number of remaining attempts
  const [history, setHistory] = useState([]); // Array to store history of guesses and hints
  const [gameWon, setGameWon] = useState(false); // State to track if the game has been won
  const [suggestions, setSuggestions] = useState([]); // State to store matching suggestions
  const [guessedChampions, setGuessedChampions] = useState([]); // Track guessed champions
  const inputRef = useRef(null); // Ref for the input element

  // Function to handle user input and show suggestions
  const handleInputChange = (e) => {
    const input = e.target.value;
    setGuess(input);

    if (input.length > 0) {
      // Filter out champions that have already been guessed
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

  // Function to handle selecting a suggestion from the dropdown
  const handleSuggestionClick = (suggestion) => {
    setGuess(suggestion.name); // Set the input field to the selected suggestion
    setSuggestions([]); // Clear suggestions after selection
  };

  // Function to handle the user's guess submission
  const handleGuess = () => {
    if (gameWon || attempts === 0 || !guess.trim()) return;

    // Check if the champion has already been guessed (shouldn't happen because of the filter)
    if (guessedChampions.includes(guess.toLowerCase())) {
      setHistory([
        { guess: guess, hints: [<div key="duplicate" className="hint-box gray">Already Guessed!</div>] },
        ...history
      ]);
      setGuess(''); // Clear the input field
      return; // Exit the function to prevent further checks
    }

    const guessedChampion = champions.find(
      champ => champ.name.toLowerCase() === guess.toLowerCase()
    );

    if (!guessedChampion) {
      // If the guessed champion is not found in the list
      setHistory([
        { guess: guess, hints: [<div key="invalid" className="hint-box gray">Invalid Champion</div>] },
        ...history
      ]);
    } else if (guessedChampion.name === correctChampion.name) {
      // If the guess is correct
      setHistory([
        { guess: guessedChampion.name, hints: [<div key="correct" className="hint-box green">Correct!</div>] },
        ...history
      ]);
      setGameWon(true); // Set the game as won
    } else {
      // Generate hint boxes based on the guessed champion's attributes
      const newHints = [];

      // Hint 1: Compare roles
      if (guessedChampion.role === correctChampion.role) {
        newHints.push(
          <div key="role" className="hint-box green">Role: {guessedChampion.role}</div>
        );
      } else {
        newHints.push(
          <div key="role" className="hint-box gray">Role: {guessedChampion.role}</div>
        );
      }

      // Hint 2: Compare regions
      if (guessedChampion.region === correctChampion.region) {
        newHints.push(
          <div key="region" className="hint-box green">Region: {guessedChampion.region}</div>
        );
      } else {
        newHints.push(
          <div key="region" className="hint-box gray">Region: {guessedChampion.region}</div>
        );
      }

      // Hint 3: Compare letter count
      if (guessedChampion.letterCount === correctChampion.letterCount) {
        newHints.push(
          <div key="letters" className="hint-box green">Letters: {guessedChampion.letterCount}</div>
        );
      } else {
        newHints.push(
          <div key="letters" className="hint-box gray">Letters: {guessedChampion.letterCount}</div>
        );
      }

      // Add guess and hints to the history
      setHistory([
        { guess: guessedChampion.name, hints: newHints },
        ...history
      ]);

      // Add the guessed champion to the guessed list
      setGuessedChampions([...guessedChampions, guessedChampion.name.toLowerCase()]);
      setAttempts(attempts - 1); // Decrease attempts by 1
    }

    setGuess(''); // Clear the input field
    setSuggestions([]); // Clear suggestions after the guess
  };

  return (
    <div className="App">
      <h1>Loldle Clone</h1>
      <p>Attempts Left: {attempts}</p>

      <div className="input-wrapper" ref={inputRef}>
        <input
          type="text"
          value={guess}
          onChange={handleInputChange}
          placeholder="Guess a champion..."
          disabled={gameWon || attempts === 0}
        />

        {/* Show suggestions if there are any */}
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button onClick={handleGuess} disabled={gameWon || attempts === 0}>Submit</button>

      {gameWon && <p>Congratulations! You guessed the correct champion.</p>}
      {!gameWon && attempts === 0 && <p>No attempts left! The correct champion was {correctChampion.name}.</p>}

      <div className="history-container">
        {history.map((entry, index) => (
          <div key={index} className="history-entry">
            <p><strong>Guess: {entry.guess}</strong></p>
            <div className="hints-container">
              {entry.hints}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
