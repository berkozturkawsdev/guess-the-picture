import "./LetterGrid.css";

interface LetterGridProps {
    letters: string[];
    onLetterClick?: (letter: string, index: number) => void;
}

const LetterGrid = ({ letters, onLetterClick }: LetterGridProps) => {
    return (
        <div className="letter-grid">
            {letters.map((letter, index) => (
                <button
                    key={index}
                    className="letter-button"
                    disabled={!letter}
                    onClick={() => onLetterClick?.(letter, index)}
                >
                    {letter}
                </button>
            ))}
        </div>
    );
};

export default LetterGrid;