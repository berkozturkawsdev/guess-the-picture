import { useEffect, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import './App.css'
import ImageGrid from './ImageGrid'
import LetterGrid from './LetterGrid'
import WordDisplay from './WordDisplay';
import levels from "./data/levels.json";
import WinModal from './WinModal';
import generateLetters from './utils/shuffleLetters';
import { shuffleLevels, getNextLevels } from "./utils/levelManager";
import { getLanguage, setLanguage, type Language } from './utils/getLanguage';
import { trackEvent } from './utils/analytics';
import playWinSound from './utils/playWinSound';
import heroImage from './assets/hero.webp';

function App() {
  const [language, setLanguageState] = useState<Language>(() => getLanguage());
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const initialLevels = shuffleLevels(levels);
  const [remainingLevels, setRemainingLevels] = useState(initialLevels.slice(1));

  const [currentLevel, setCurrentLevel] = useState(initialLevels[0]);
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [roundStars, setRoundStars] = useState(5);

  const [guessedLetters, setGuessedLetters] = useState<string[]>(
    Array.from({ length: currentLevel.words[language].length }, () => "")
  );

  const [availableLetters, setAvailableLetters] = useState(
    generateLetters(currentLevel.words[language], language)
  );

  useEffect(() => {
    setLanguage(language);
  }, [language]);

  useEffect(() => {
    if (!hasStarted) return;

    let cancelled = false;

    setIsLoading(true);
    setImages([]);
    setRoundStars(5);

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
  }, [currentLevel, language, hasStarted]);

  const word = currentLevel.words[language];
  const copy = language === "tr"
    ? {
      badge: "Ücretsiz Görsel Kelime Bulmaca",
      title: "Resme Bak ve Tahmin Et",
      intro: "Dört görsel ipucuyla tek bir kelimeyi bulduğun ücretsiz bir kelime bulmaca oyunu oyna. Kelime dağarcığını test et, gözlem becerini geliştirmesini ve eğlenceli bir günlük meydan okuma yaşa.",
      playButton: "Başla",
      highlights: [
        { title: "4 görsel ipucu", text: "Ortak kelimeyi bul" },
        { title: "Hızlı ve eğlenceli", text: "Kısa beyin egzersizleri için ideal" },
        { title: "Ücretsiz", text: "Sınırsız kelime tahmin eğlencesi" },
      ],
      loading: "Bulmaca yükleniyor...",
      settingsTitle: "Ayarlar",
      languageLabel: "Dil",
      english: "İngilizce",
      turkish: "Türkçe",
      close: "Kapat",
      howToPlayTitle: "Nasıl Oynanır",
      howToPlayBody: "Bu oyunda dört görsel tek bir kelimeye işaret eder. Harf butonlarını kullanarak kelimeyi tahmin et ve bulmacayı tamamla.",
      howToPlayList: [
        "Görsel ipuçlarını dikkatlice incele.",
        "Cevabı oluşturacak harfleri seç.",
        "Kelimeyi tamamlayarak bir sonraki bulmacaya geç.",
      ],
      aboutTitle: "Hakkında",
      aboutBody: "Berk Öztürk tarafından oluşturuldu.",
    }
    : {
      badge: "Free Picture Word Puzzle",
      title: "Guess the Picture",
      intro: "Play an addictive word puzzle game where four picture clues lead to one hidden word. Test your vocabulary, sharpen your observation skills, and enjoy a fun daily challenge.",
      playButton: "Play Now",
      highlights: [
        { title: "4 clue images", text: "Find the shared word" },
        { title: "Fast and fun", text: "Great for quick brain breaks" },
        { title: "Free to play", text: "Enjoy endless word guessing fun" },
      ],
      loading: "Loading puzzle...",
      settingsTitle: "Settings",
      languageLabel: "Language",
      english: "English",
      turkish: "Turkish",
      close: "Close",
      howToPlayTitle: "How to Play",
      howToPlayBody: "This game shows you four pictures that hint at a single word. Use the letter buttons to guess the word and complete the puzzle.",
      howToPlayList: [
        "Look at the clue images carefully.",
        "Pick the letters that form the answer.",
        "Complete the word to move to the next puzzle.",
      ],
      aboutTitle: "About",
      aboutBody: "Built by Berk Öztürk.",
    };

  const isComplete = guessedLetters.every(letter => letter !== "");
  const guessedWord = guessedLetters.join("");

  const isCorrect = isComplete && guessedWord === word;
  const isWrong = isComplete && guessedWord !== word;

  useEffect(() => {
    if (!isCorrect) return;
    playWinSound();
  }, [isCorrect]);


  const handleLetterClick = (letter: string, index: number) => {
    if (!word.includes(letter)) {
      setRoundStars(prev => Math.max(1, prev - 1));
    }

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


  if (!hasStarted) {
    return (
      <main className="landing-page">
        <div className="top-actions">
          <button
            className="settings-button"
            onClick={() => setIsSettingsOpen(true)}
            aria-label="Open settings"
            type="button"
          >
            ⚙
          </button>
        </div>

        <section className="hero-card">
          <div className="hero-content">
            <img className="hero-image" src={heroImage} alt="Guess the Picture gameplay preview" />
            <div className="hero-text">
              <p className="hero-badge">{copy.badge}</p>
              <h1>{copy.title}</h1>
              <p className="hero-copy">{copy.intro}</p>

              <button className="play-button" type="button" onClick={() => setHasStarted(true)}>
                <span aria-hidden="true">▶</span>
                {copy.playButton}
              </button>
            </div>
          </div>

          <div className="hero-highlights">
            {copy.highlights.map((item) => (
              <div key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        {isSettingsOpen && (
          <div className="settings-modal-overlay" onClick={() => setIsSettingsOpen(false)}>
            <div className="settings-modal" onClick={(event) => event.stopPropagation()}>
              <button className="settings-modal-close" onClick={() => setIsSettingsOpen(false)} type="button">×</button>
              <h2>{copy.settingsTitle}</h2>
              <p className="settings-label">{copy.languageLabel}</p>
              <div className="settings-options">
                <button
                  className={`settings-option ${language === "en" ? "active" : ""}`}
                  type="button"
                  onClick={() => {
                    setLanguageState("en");
                    setIsSettingsOpen(false);
                  }}
                >
                  <span className="settings-flag" aria-hidden="true">
                    <ReactCountryFlag countryCode="US" svg />
                  </span>
                  {copy.english}
                </button>
                <button
                  className={`settings-option ${language === "tr" ? "active" : ""}`}
                  type="button"
                  onClick={() => {
                    setLanguageState("tr");
                    setIsSettingsOpen(false);
                  }}
                >
                  <span className="settings-flag" aria-hidden="true">
                    <ReactCountryFlag countryCode="TR" svg />
                  </span>
                  {copy.turkish}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
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

          setIsLoading(true);
          setImages([]);
          setGuessedLetters([]);
          setAvailableLetters([]);
          setRoundStars(5);
          setCurrentLevel(next.currentLevel);
          setRemainingLevels(next.remainingLevels);
        }}
      />

      {isHelpOpen && (
        <div className="help-modal-overlay" onClick={() => setIsHelpOpen(false)}>
          <div className="help-modal" onClick={(event) => event.stopPropagation()}>
            <button className="help-modal-close" onClick={() => setIsHelpOpen(false)} type="button">×</button>
            <h2>{copy.howToPlayTitle}</h2>
            <p>{copy.howToPlayBody}</p>
            <ul>
              {copy.howToPlayList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="help-about">
              <h3>{copy.aboutTitle}</h3>
              <p>{copy.aboutBody}</p>
              <div className="help-links">
                <a href="https://github.com/berkozturkawsdev" target="_blank" rel="noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/berk-ozturk-56a764a8/" target="_blank" rel="noreferrer">LinkedIn</a>
                <a href="https://berkozturk.bozapps.com" target="_blank" rel="noreferrer">Personal Website</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSettingsOpen && (
        <div className="settings-modal-overlay" onClick={() => setIsSettingsOpen(false)}>
          <div className="settings-modal" onClick={(event) => event.stopPropagation()}>
            <button className="settings-modal-close" onClick={() => setIsSettingsOpen(false)} type="button">×</button>
            <h2>{copy.settingsTitle}</h2>
            <p className="settings-label">{copy.languageLabel}</p>
            <div className="settings-options">
              <button
                className={`settings-option ${language === "en" ? "active" : ""}`}
                type="button"
                onClick={() => {
                  setLanguageState("en");
                  setIsSettingsOpen(false);
                }}
              >
                <span className="settings-flag" aria-hidden="true">
                  <ReactCountryFlag countryCode="US" svg />
                </span>
                {copy.english}
              </button>
              <button
                className={`settings-option ${language === "tr" ? "active" : ""}`}
                type="button"
                onClick={() => {
                  setLanguageState("tr");
                  setIsSettingsOpen(false);
                }}
              >
                <span className="settings-flag" aria-hidden="true">
                  <ReactCountryFlag countryCode="TR" svg />
                </span>
                {copy.turkish}
              </button>
            </div>
          </div>
        </div>
      )}

      {isExitModalOpen && (
        <div
          className="exit-modal-overlay"
          onClick={() => setIsExitModalOpen(false)}
        >
          <div
            className="exit-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <h2>{language === "tr" ? "Oyundan Çık?" : "Exit Game?"}</h2>

            <p>
              {language === "tr"
                ? "Bulmacayı bırakmak istediğinden emin misin?"
                : "Are you sure you want to stop playing?"}
            </p>

            <div className="exit-modal-actions">
              <button
                className="exit-cancel-button"
                type="button"
                onClick={() => setIsExitModalOpen(false)}
              >
                {language === "tr" ? "Devam Et" : "Keep Playing"}
              </button>

              <button
                className="exit-confirm-button"
                type="button"
                onClick={() => {
                  setIsExitModalOpen(false);
                  setHasStarted(false);
                }}
              >
                {language === "tr" ? "Çık" : "Exit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App