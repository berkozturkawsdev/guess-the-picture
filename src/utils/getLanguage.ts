export type Language = "en" | "tr";

const LANGUAGE_STORAGE_KEY = "guess-the-picture-language";

export const getLanguage = (): Language => {
  if (typeof window === "undefined") {
    return "en";
  }

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (storedLanguage === "en" || storedLanguage === "tr") {
    return storedLanguage;
  }

  const browserLanguage = window.navigator.language.toLowerCase();

  return browserLanguage.startsWith("tr") ? "tr" : "en";
};

export const setLanguage = (language: Language) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }
};