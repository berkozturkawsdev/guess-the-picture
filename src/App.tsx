import { useEffect, useState } from 'react';
import './App.css'
import ImageGrid from './ImageGrid'
import LetterGrid from './LetterGrid'
import WordDisplay from './WordDisplay';
import levels from "./data/levels.json";
import WinModal from './WinModal';
import { shuffleLevels, getNextLevels } from "./utils/levelManager";
import { getLanguage, setLanguage, type Language } from './utils/getLanguage';
import { trackEvent } from './utils/analytics';
import playWinSound from './utils/playWinSound';
import { getCopy } from './data/copy';
import HomePage from './components/HomePage';
import ExitModal from './components/ExitModal';
import HelpModal from './components/HelpModal';
import SettingsModal from './components/SettingsModal';
import { getLevelsForSet } from './services/puzzleService';
import { usePuzzleGame } from './hooks/usePuzzleGame';
import { usePuzzleImages } from './hooks/usePuzzleImages';

function App() {
  const initialLevels = shuffleLevels(levels);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentLevel, setCurrentLevel] =
    useState(initialLevels[0]);
  const [language, setLanguageState] = useState<Language>(() => getLanguage());
  const copy = getCopy(language);

  const startPuzzleSet = (setId: string) => {
    const filteredLevels = getLevelsForSet(setId);

    if (filteredLevels.length === 0) {
      return;
    }

    const shuffled = shuffleLevels(filteredLevels);

    setSelectedPuzzleSet(setId);
    setRemainingLevels(shuffled.slice(1));
    setCurrentLevel(shuffled[0]);
    setHasStarted(true);
  };

  
  const {
    word,
    guessedLetters,
    availableLetters,
    roundStars,
    isCorrect,
    isWrong,
    handleLetterClick,
    handleRemoveLetter,
  } = usePuzzleGame(currentLevel, language);

  const {
    images,
    isLoading
  } = usePuzzleImages(
    currentLevel.id,
    hasStarted
  );

  const [selectedPuzzleSet, setSelectedPuzzleSet] = useState<string | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const [remainingLevels, setRemainingLevels] =
    useState(initialLevels.slice(1));



  useEffect(() => {
    if (!hasStarted) return;

    trackEvent("puzzle_started", {
      level_id: currentLevel.id,
      word: currentLevel.words[language]
    });
  }, [currentLevel.id, language, hasStarted]);


  useEffect(() => {
    setLanguage(language);
  }, [language]);

  // useEffect(() => {
  //   if (!hasStarted) return;

  //   let cancelled = false;

  //   // setIsLoading(true);
  //   // setImages([]);

  //   const minimumLoadingDelay = new Promise<void>((resolve) => {
  //     window.setTimeout(resolve, 1000);
  //   });

  //   trackEvent("puzzle_started", {
  //     level_id: currentLevel.id,
  //     word: currentLevel.words[language]
  //   });

  //   const path = `/levels/${currentLevel.id}`;
  //   const imagePaths = [1, 2, 3, 4].map(num => `${path}/${num}.webp`);

  //   const preloadImages = async () => {
  //     await Promise.all([
  //       Promise.all(
  //         imagePaths.map((src) => new Promise<void>((resolve) => {
  //           const img = new Image();
  //           img.src = src;
  //           img.onload = () => resolve();
  //           img.onerror = () => resolve();
  //         }))
  //       ),
  //       minimumLoadingDelay,
  //     ]);

  //     if (!cancelled) {
  //       // setImages(imagePaths);
  //       // setGuessedLetters(Array.from({ length: currentLevel.words[language].length }, () => ""));
  //       // setAvailableLetters(generateLetters(currentLevel.words[language], language));
  //       // setIsLoading(false);
  //     }
  //   };

  //   void preloadImages();

  //   return () => {
  //     cancelled = true;
  //   };
  // }, [currentLevel, language, hasStarted]);




  useEffect(() => {
    if (!isCorrect) return;
    playWinSound();
  }, [isCorrect]);



  if (!hasStarted) {
    return (
      <HomePage language={language}
        copy={copy}
        isSettingsOpen={isSettingsOpen}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onCloseSettings={() => setIsSettingsOpen(false)}
        onLanguageChange={setLanguageState}
        onStartPuzzleSet={startPuzzleSet}></HomePage>
    );
  }

  return (
    <main className="game-container">
      <div className="top-actions">
        <button
          className="settings-button"
          onClick={() => setIsExitModalOpen(true)}
          aria-label="Exit game"
          type="button"
        >
          ✕
        </button>
        <button
          className="settings-button"
          onClick={() => setIsSettingsOpen(true)}
          aria-label="Open settings"
          type="button"
        >
          ⚙
        </button>
        <button
          className="help-button"
          onClick={() => setIsHelpOpen(true)}
          aria-label="How to play"
          type="button"
        >
          ?
        </button>
      </div>

      {isLoading ? (
        <div className="loading-state" role="status" aria-live="polite">
          <div className="loading-spinner" />
          <p>{copy.loading}</p>
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
        language={language}
        stars={roundStars}
        onNext={() => {
          trackEvent("next_level_clicked");
          const next = getNextLevels(remainingLevels, levels);

          // setIsLoading(true);
          // setImages([]);
          // setGuessedLetters([]);
          // setAvailableLetters([]);
          // setRoundStars(5);
          setCurrentLevel(next.currentLevel);
          setRemainingLevels(next.remainingLevels);
        }}
      />

      {isHelpOpen && <HelpModal
        isOpen={isHelpOpen}
        copy={copy.help}
        onClose={() => setIsHelpOpen(false)}
      />}

      {isSettingsOpen && <SettingsModal
        isOpen={isSettingsOpen}
        language={language}
        copy={copy}
        onClose={() => setIsSettingsOpen(false)}
        onLanguageChange={setLanguageState}
      />}

      {isExitModalOpen && <ExitModal
        isOpen={isExitModalOpen}
        copy={copy.exitModal}
        onClose={() => setIsExitModalOpen(false)}
        onConfirm={() => {
          setIsExitModalOpen(false);
          setHasStarted(false);
        }}
      />}
    </main>
  );
}

export default App