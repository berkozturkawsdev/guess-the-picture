import { useEffect, useState } from 'react';
import './App.css';

import ImageGrid from './ImageGrid';
import LetterGrid from './LetterGrid';
import WordDisplay from './WordDisplay';

import levels from "./data/levels.json";

import WinModal from './WinModal';

import { shuffleLevels } from "./utils/levelManager";
import { trackEvent } from './utils/analytics';
import playWinSound from './utils/playWinSound';
import { getCopy } from './data/copy';

import HomePage from './components/HomePage';
import SetCompletedModal from './components/SetCompletedModal';

import { usePuzzleGame } from './hooks/usePuzzleGame';
import { usePuzzleImages } from './hooks/usePuzzleImages';

import { puzzleSets } from './data/puzzle-sets';
import Navbar from './components/Navbar';
import { useLanguage } from './context/LanguageContext';


function App() {

  // Keep a shuffled order only for the general/default game.
  const [initialLevels] = useState(() => shuffleLevels(levels));

  const [hasStarted, setHasStarted] = useState(false);

  const [currentLevel, setCurrentLevel] =
    useState(initialLevels[0]);

  const { language } = useLanguage();

  const copy = getCopy(language);

  // ================================
  // PUZZLE SET STATE
  // ================================

  const [selectedPuzzleSet, setSelectedPuzzleSet] =
    useState<string | null>(null);

  const [currentSetIndex, setCurrentSetIndex] =
    useState(0);

  const [showSetCompleted, setShowSetCompleted] =
    useState(false);

  // ================================
  // GAME HOOK
  // ================================

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


  // ================================
  // IMAGES
  // ================================

  const {
    images,
    isLoading
  } = usePuzzleImages(
    currentLevel.id,
    hasStarted
  );


  // ================================
  // START PUZZLE SET
  // ================================

  const startPuzzleSet = (setId: string) => {

    const puzzleSet = Object.values(puzzleSets).find(
      set => set.id === setId
    );

    if (!puzzleSet || puzzleSet.levels.length === 0) {
      return;
    }

    // Remember which set we're playing
    setSelectedPuzzleSet(setId);

    // Always start from the FIRST level
    setCurrentSetIndex(0);

    setShowSetCompleted(false);

    // Get first level ID
    const firstLevelId = puzzleSet.levels[0];

    // Find actual puzzle from levels.json
    const firstLevel = levels.find(
      level => level.id === firstLevelId
    );

    if (!firstLevel) {
      console.error(
        `Level ${firstLevelId} was not found in levels.json`
      );

      return;
    }

    setCurrentLevel(firstLevel);
    setHasStarted(true);
  };


  // ================================
  // NEXT PUZZLE
  // ================================

  const handleNextPuzzle = () => {

    trackEvent("next_level_clicked");

    // Make sure we're playing a puzzle set
    if (!selectedPuzzleSet) {
      return;
    }

    const puzzleSet = Object.values(puzzleSets).find(
      set => set.id === selectedPuzzleSet
    );

    if (!puzzleSet) {
      return;
    }

    const nextIndex = currentSetIndex + 1;

    // ================================
    // SET IS FINISHED
    // ================================

    if (nextIndex >= puzzleSet.levels.length) {

      setShowSetCompleted(true);

      return;
    }

    // ================================
    // LOAD NEXT LEVEL
    // ================================

    const nextLevelId = puzzleSet.levels[nextIndex];

    const nextLevel = levels.find(
      level => level.id === nextLevelId
    );

    if (!nextLevel) {
      console.error(
        `Level ${nextLevelId} was not found in levels.json`
      );

      return;
    }

    setCurrentSetIndex(nextIndex);
    setCurrentLevel(nextLevel);
  };

  const isLastPuzzleInSet =
    selectedPuzzleSet !== null &&
    (() => {
      const puzzleSet = Object.values(puzzleSets).find(
        set => set.id === selectedPuzzleSet
      );

      return puzzleSet
        ? currentSetIndex === puzzleSet.levels.length - 1
        : false;
    })();


  // ================================
  // TRACK PUZZLE START
  // ================================

  useEffect(() => {

    if (!hasStarted) {
      return;
    }

    trackEvent("puzzle_started", {
      level_id: currentLevel.id,
      word: currentLevel.words[language]
    });

  }, [
    currentLevel.id,
    language,
    hasStarted
  ]);



  // ================================
  // WIN SOUND
  // ================================

  useEffect(() => {
    if (!isCorrect) {
      return;
    }

    playWinSound();

    if (isLastPuzzleInSet) {
      setShowSetCompleted(true);
    }
  }, [isCorrect, isLastPuzzleInSet]);


  // ================================
  // HOME
  // ================================

  if (!hasStarted) {

    return (
      <HomePage
        language={language}
        copy={copy}
        onStartPuzzleSet={startPuzzleSet}
      />
    );
  }


  // ================================
  // GAME
  // ================================

  return (
    <main className="game-container">

      {/* <div className="top-actions">

        <button
          className="settings-button"
          onClick={() =>
            setIsExitModalOpen(true)
          }
          aria-label="Exit game"
          type="button"
        >
          ✕
        </button>

        <button
          className="settings-button"
          onClick={() =>
            setIsSettingsOpen(true)
          }
          aria-label="Open settings"
          type="button"
        >
          ⚙
        </button>

        <button
          className="help-button"
          onClick={() =>
            setIsHelpOpen(true)
          }
          aria-label="How to play"
          type="button"
        >
          ?
        </button>

      </div> */}


      <Navbar
        copy={copy}
        onExitConfirm={() => {
          setHasStarted(false);
          setSelectedPuzzleSet(null);
          setCurrentSetIndex(0);
          setShowSetCompleted(false);
        }}
      />


      {/* ================================
          LOADING / GAME
      ================================= */}

      {isLoading ? (

        <div
          className="loading-state"
          role="status"
          aria-live="polite"
        >
          <div className="loading-spinner" />

          <p>
            {copy.loading}
          </p>
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


      {/* ================================
          WIN MODAL
      ================================= */}

      <WinModal
        isOpen={isCorrect && !isLastPuzzleInSet}
        language={language}
        stars={roundStars}
        onNext={handleNextPuzzle}
      />




      {/* ================================
          PUZZLE SET COMPLETED
      ================================= */}

      {showSetCompleted && (

        <SetCompletedModal
          copy={copy.setCompleted}
          onBackToPuzzleSets={() => {
            setShowSetCompleted(false);
            setHasStarted(false);
            setSelectedPuzzleSet(null);
            setCurrentSetIndex(0);
          }}
        />

      )}

    </main>
  );
}

export default App;