import { useEffect, useState } from "react";
import type { Language } from "../utils/getLanguage";
import generateLetters from "../utils/shuffleLetters";

interface Level {
    id: number;
    words: {
        en: string;
        tr: string;
    };
}

export function usePuzzleGame(
    currentLevel: Level,
    language: Language
) {
    const word = currentLevel.words[language];

    const [guessedLetters, setGuessedLetters] = useState<string[]>(
        Array.from({ length: word.length }, () => "")
    );

    const [availableLetters, setAvailableLetters] = useState<string[]>(
        generateLetters(word, language)
    );

    const [roundStars, setRoundStars] = useState(5);

    // Reset puzzle state whenever the level or language changes
    useEffect(() => {
        setGuessedLetters(
            Array.from({ length: word.length }, () => "")
        );

        setAvailableLetters(
            generateLetters(word, language)
        );

        setRoundStars(5);
    }, [currentLevel.id, language, word]);

    const handleLetterClick = (
        letter: string,
        index: number
    ) => {
        const emptyIndex = guessedLetters.indexOf("");

        // No empty box → don't do anything
        if (emptyIndex === -1) {
            return;
        }

        if (!word.includes(letter)) {
            setRoundStars(prev => Math.max(1, prev - 1));
        }

        setAvailableLetters(prev => {
            const updated = [...prev];
            updated[index] = "";
            return updated;
        });

        setGuessedLetters(prev => {
            const updated = [...prev];
            updated[emptyIndex] = letter;
            return updated;
        });
    };

    const handleRemoveLetter = (
        _letter: string,
        index: number
    ) => {
        const removedLetter = guessedLetters[index];

        if (!removedLetter) {
            return;
        }

        // Remove letter from word display
        setGuessedLetters(prev => {
            const updated = [...prev];
            updated[index] = "";
            return updated;
        });

        // Return letter to available letters
        setAvailableLetters(prev => {
            const updated = [...prev];

            const emptyIndex = updated.indexOf("");

            if (emptyIndex !== -1) {
                updated[emptyIndex] = removedLetter;
            }

            return updated;
        });
    };

    const isComplete = guessedLetters.every(
        letter => letter !== ""
    );

    const guessedWord = guessedLetters.join("");

    const isCorrect =
        isComplete && guessedWord === word;

    const isWrong =
        isComplete && guessedWord !== word;

    return {
        word,
        guessedLetters,
        availableLetters,
        roundStars,
        isComplete,
        guessedWord,
        isCorrect,
        isWrong,
        handleLetterClick,
        handleRemoveLetter,
    };
}