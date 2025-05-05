import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const words = [
  "su", "ev", "el", "ay", "göl", "kar", "can", "dal", "ben", "sen", "kal",
  "masa", "yolcu", "kalem", "bahar", "ağaç", "kitap", "okuma", "yazma", "sabah",
  "anlamlı", "duygular", "gözlemci", "öğretmen", "çalışkan", "muhteşem", "kitaplık",
  "bilgisayar", "yaklaşımlar"
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [showWord, setShowWord] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [results, setResults] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    if (index < words.length) {
      setCurrentWord(words[index]);
      setShowWord(true);
      setTimeout(() => {
        setShowWord(false);
        inputRef.current?.focus();
      }, 500);
    }
  }, [index]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isCorrect = inputValue.trim().toLowerCase() === currentWord;
    setResults([...results, { word: currentWord, input: inputValue, correct: isCorrect }]);
    setFeedback(isCorrect ? '✔ Doğru!' : `✖ Yanlış! Doğrusu: "${currentWord}"`);
    setInputValue('');
    setTimeout(() => {
      setFeedback(null);
      setIndex(index + 1);
    }, 1000);
  };

  if (index >= words.length) {
    const correctCount = results.filter(r => r.correct).length;
    return (
      <div className="container">
        <h2>Egzersiz Tamamlandı!</h2>
        <p>Toplam Doğru: {correctCount}</p>
        <p>Toplam Yanlış: {results.length - correctCount}</p>
        <p>Başarı Oranı: {Math.round((correctCount / results.length) * 100)}%</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Tatistoskop Egzersizi</h1>
      {showWord ? (
        <div className="word">{currentWord}</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Kelimeyi yazın"
            autoFocus
          />
        </form>
      )}
      {feedback && <div className="feedback">{feedback}</div>}
    </div>
  );
}
