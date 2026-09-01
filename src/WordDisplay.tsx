import "./WordDisplay.css";

interface WordDisplayProps {
    word: string;
    guessedLetters: string[];
    onLetterClick?: (letter: string, index: number) => void;
    status: "normal" | "correct" | "wrong";
}

const WordDisplay = ({
    word,
    guessedLetters,
    onLetterClick,
    status,
}: WordDisplayProps) => {
    return (
        <div className="word-display">
            {Array.from(word).map((character, index) => {
                // Space is only a visual separator
                if (character === " ") {
                    return (
                        <div
                            key={`space-${index}`}
                            className="word-space"
                        />
                    );
                }

                const guessedLetter = guessedLetters[index];
                const isFilled =
                    typeof guessedLetter === "string" &&
                    guessedLetter.trim().length > 0;

                return (
                    <div
                        key={index}
                        className={`letter-box ${status} ${isFilled ? "filled" : ""
                            }`}
                        style={{
                            animationDelay: `${index * 80}ms`,
                        }}
                        onClick={() => {
                            if (isFilled) {
                                onLetterClick?.(
                                    guessedLetter,
                                    index
                                );
                            }
                        }}
                    >
                        {isFilled ? guessedLetter : ""}
                    </div>
                );
            })}
        </div>
    );
};

export default WordDisplay;