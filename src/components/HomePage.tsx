import "./HomePage.css"
import heroImage from "../assets/hero.webp";
import type { Copy } from "../data/copy";
import { puzzleSets } from "../data/puzzle-sets";
import type { Language } from "../utils/getLanguage";
import PuzzleSets from "./PuzzleSets";
import Navbar from "./Navbar";

interface HomePageProps {
    language: Language;
    copy: Copy;
    onStartPuzzleSet: (setId: string) => void;
}

function HomePage({
    language,
    copy,
    onStartPuzzleSet,
}: HomePageProps) {
    return (
        <main className="landing-page">

            <Navbar
                copy={copy}
            />
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



        </main>
    );
}

export default HomePage;
