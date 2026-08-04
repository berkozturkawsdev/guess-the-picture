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
import playWinSound from './utils/playWinSound';

function App() {
  const [language] = useState<"en" | "tr">(getLanguage());

  const initialLevels = shuffleLevels(levels);
  const [remainingLevels, setRemainingLevels] = useState(initialLevels.slice(1));

  const [currentLevel, setCurrentLevel] = useState(initialLevels[0]);
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [guessedLetters, setGuessedLetters] = useState<string[]>(
    Array.from({ length: currentLevel.words[language].length }, () => "")
  );

  const [availableLetters, setAvailableLetters] = useState(
    generateLetters(currentLevel.words[language], language)
  );

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setImages([]);

    const minimumLoadingDelay = new Promise<void>((resolve) => {
      window.setTimeout(resolve, 1000);
    });

    trackEvent("puzzle_started", {
      level_id: currentLevel.id,
      word: currentLevel.words[language]
    });

    const path = `/levels/${currentLevel.id}`;
    const imagePaths = [1, 2, 3, 4].map(num => `${path}/${num}.webp`);

    const preloadImages = async () => {
      await Promise.all([
        Promise.all(
          imagePaths.map((src) => new Promise<void>((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve();
            img.onerror = () => resolve();
          }))
        ),
        minimumLoadingDelay,
      ]);

      if (!cancelled) {
        setImages(imagePaths);
        setGuessedLetters(Array.from({ length: currentLevel.words[language].length }, () => ""));
        setAvailableLetters(generateLetters(currentLevel.words[language], language));
        setIsLoading(false);
      }
    };

    void preloadImages();

    return () => {
      cancelled = true;
    };
  }, [currentLevel, language]);

  const word = currentLevel.words[language];

  const isComplete = guessedLetters.every(letter => letter !== "");
  const guessedWord = guessedLetters.join("");

  const isCorrect = isComplete && guessedWord === word;
  const isWrong = isComplete && guessedWord !== word;

  useEffect(() => {
    if (!isCorrect) return;
    playWinSound();
  }, [isCorrect]);


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
      {isLoading ? (
        <div className="loading-state" role="status" aria-live="polite">
          <div className="loading-spinner" />
          <p>Loading puzzle...</p>
        </div>
      ) : (
        <>
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
        </>
      )}

      <WinModal
        isOpen={isCorrect}
        onNext={() => {
          trackEvent("next_level_clicked");
          const next = getNextLevels(remainingLevels, levels);

          setIsLoading(true);
          setImages([]);
          setGuessedLetters([]);
          setAvailableLetters([]);
          setCurrentLevel(next.currentLevel);
          setRemainingLevels(next.remainingLevels);
        }}
      />
    </main>
  )
}

export default App