const alphabets = {
  en: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  tr: "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ"
};

export default function generateLetters(word: string, language: "en" | "tr") {
  const letters = word.toUpperCase().split("");
  const alphabet = alphabets[language];

  while (letters.length < 12) {
    letters.push(
      alphabet[Math.floor(Math.random() * alphabet.length)]
    );
  }

  // Shuffle
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }

  return letters;
}