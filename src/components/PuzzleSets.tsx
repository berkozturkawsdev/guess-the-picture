import type { Language } from "../utils/getLanguage";

interface PuzzleSet {
    id: string;
    title: {
        en: string;
        tr: string;
    };
    levels: number[];
}

interface PuzzleSetsProps {
    puzzleSets: Record<string, PuzzleSet>;
    language: Language;
    copy: {
        title: string;
        puzzles: string;
    };
    onSelect: (setId: string) => void;
}

function PuzzleSets({
    puzzleSets,
    language,
    copy,
    onSelect,
}: PuzzleSetsProps) {
    return (
        <section className="puzzle-sets">
            <h2>{copy.title}</h2>

            <div className="puzzle-set-grid">
                {Object.values(puzzleSets).map((set) => (
                    <button
                        key={set.id}
                        className="puzzle-set-card"
                        type="button"
                        onClick={() => onSelect(set.id)}
                    >
                        <span className="puzzle-set-icon">🐾</span>

                        <strong>
                            {set.title[language]}
                        </strong>

                        <span>
                            {set.levels.length} {copy.puzzles}
                        </span>
                    </button>
                ))}
            </div>
        </section>
    );
}

export default PuzzleSets;