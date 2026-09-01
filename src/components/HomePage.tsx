import heroImage from "../assets/hero.webp";
import type { Copy } from "../data/copy";
import { puzzleSets } from "../data/puzzle-sets";
import type { Language } from "../utils/getLanguage";
import PuzzleSets from "./PuzzleSets";
import SettingsModal from "./SettingsModal";

interface HomePageProps {
    language: Language;
    copy: Copy;
    isSettingsOpen: boolean;
    onOpenSettings: () => void;
    onCloseSettings: () => void;
    onLanguageChange: (language: Language) => void;
    onStartPuzzleSet: (setId: string) => void;
}

function HomePage({
    language,
    copy,
    isSettingsOpen,
    onOpenSettings,
    onCloseSettings,
    onLanguageChange,
    onStartPuzzleSet,
}: HomePageProps) {

    return (
        <main className="landing-page">

            {/* Top actions */}
            <div className="top-actions">
                <button
                    className="settings-button"
                    onClick={onOpenSettings}
                    aria-label="Open settings"
                    type="button"
                >
                    ⚙
                </button>
            </div>

            {/* Hero */}
            <section className="hero-card">
                <div className="hero-content">

                    <img
                        className="hero-image"
                        src={heroImage}
                        alt="Guess the Picture gameplay preview"
                    />

                    <div className="hero-text">
                        <p className="hero-badge">
                            {copy.badge}
                        </p>

                        <h1>
                            {copy.title}
                        </h1>

                        <p className="hero-copy">
                            {copy.intro}
                        </p>

                        <button
                            className="play-button"
                            type="button"
                            onClick={() => onStartPuzzleSet("what-is-this-animal")}
                        >
                            <span aria-hidden="true">▶</span>
                            {copy.playButton}
                        </button>
                    </div>

                </div>

                {/* Highlights */}
                <div className="hero-highlights">
                    {copy.highlights.map((item) => (
                        <div key={item.title}>
                            <strong>{item.title}</strong>
                            <span>{item.text}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Puzzle Sets */}
            <PuzzleSets
                puzzleSets={puzzleSets}
                language={language}
                copy={copy.puzzleSets}
                onSelect={onStartPuzzleSet}
            />

            {/* Settings */}
            {isSettingsOpen && <SettingsModal
                isOpen={isSettingsOpen}
                language={language}
                copy={copy}
                onClose={onCloseSettings}
                onLanguageChange={onLanguageChange}
            />
            }

        </main>
    );
}

export default HomePage;
