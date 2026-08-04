import { useEffect, useState } from 'react';
import './App.css'
import ImageGrid from './ImageGrid'
import LetterGrid from './LetterGrid'
import WordDisplay from './WordDisplay';
import levels from "./data/levels.json";
import WinModal from './WinModal';
import generateLetters from './utils/shuffleLetters';
import { shuffleLevels, getNextLevels } from "./utils/levelManager";
import { getLanguage } from './utils/getLanguage';
import { trackEvent } from './utils/analytics';

function App() {
  const [language] = useState<"en" | "tr">(getLanguage());

  const initialLevels = shuffleLevels(levels);
  const [remainingLevels, setRemainingLevels] = useState(initialLevels.slice(1));

  const [currentLevel, setCurrentLevel] = useState(initialLevels[0]);

  const [images, setImages] = useState<string[]>([]);;

  useEffect(() => {
    trackEvent("puzzle_started", {
      level_id: currentLevel.id,
      word: currentLevel.words[language]
    });
    const path = `/levels/${currentLevel.id}`;
    setImages([1, 2, 3, 4].map(num => `${path}/${num}.webp`));
    // Reset guessed letters and available letters when level changes
    setGuessedLetters(Array.from({ length: currentLevel.words[language].length }, () => ""));
    setAvailableLetters(generateLetters(currentLevel.words[language], language));
  }, [currentLevel]);

  const [guessedLetters, setGuessedLetters] = useState<string[]>(
    Array.from({ length: currentLevel.words[language].length }, () => "")
  );

  const [availableLetters, setAvailableLetters] = useState(
    generateLetters(currentLevel.words[language], language)
  );

  const word = currentLevel.words[language];

  const isComplete = guessedLetters.every(letter => letter !== "");
  const guessedWord = guessedLetters.join("");

  const isCorrect = isComplete && guessedWord === word;
  const isWrong = isComplete && guessedWord !== word;


  const handleLetterClick = (letter: string, index: number) => {

    // remove from available letters
    setAvailableLetters(prev => {
      const updated = [...prev];
      updated[index] = "";
      return updated;
    });


    // add to first empty slot
    setGuessedLetters(prev => {
      const updated = [...prev];

      const emptyIndex = updated.indexOf("");

      if (emptyIndex !== -1) {
        updated[emptyIndex] = letter;
      }

      return updated;
    });
  };


  const handleRemoveLetter = (_letter: string, index: number) => {

    const removedLetter = guessedLetters[index];


    // remove from word display
    setGuessedLetters(prev => {
      const updated = [...prev];
      updated[index] = "";
      return updated;
    });


    // return letter back to available grid
    setAvailableLetters(prev => {
      const updated = [...prev];

      const emptyIndex = updated.indexOf("");

      if (emptyIndex !== -1) {
        updated[emptyIndex] = removedLetter;
      }

      return updated;
    });
  };


  return (
    <main className="game-container">

      <ImageGrid images={images} />


      <WordDisplay
        word={word}
        guessedLetters={guessedLetters}
        status={
          isCorrect
            ? "correct"
            : isWrong
              ? "wrong"
              : "normal"
        }
        onLetterClick={handleRemoveLetter}
      />


      <LetterGrid
        letters={availableLetters}
        onLetterClick={handleLetterClick}
      />

      <WinModal
        isOpen={isCorrect}
        onNext={() => {

          trackEvent("next_level_clicked");
          const next = getNextLevels(remainingLevels, levels);

          setCurrentLevel(next.currentLevel);
          setRemainingLevels(next.remainingLevels);

        }}
      />

    </main>
  )
}

export default App