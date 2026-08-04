import "./WordDisplay.css";

interface WordDisplayProps {
    word: string;
    guessedLetters: string[];
    onLetterClick?: (letter: string, index: number) => void;
    status: "normal" | "correct" | "wrong";
}

const WordDisplay = ({ word, guessedLetters, onLetterClick, status }: WordDisplayProps) => {
    return (
        <div className="word-display">
            {Array.from({ length: word.length }, (_, index) => (
                <div style={{
                    animationDelay: `${index * 80}ms`
                }} key={index} className={`letter-box ${status} ${guessedLetters[index]?.length ? "filled" : ""}`} onClick={() => onLetterClick?.(guessedLetters[index], index)}>
                    {guessedLetters[index] ?? ""}
                </div>
            ))}
        </div>
    );
};

export default WordDisplay;