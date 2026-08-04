export const getLanguage = (): "en" | "tr" => {
  const language = navigator.language.toLowerCase();

  return language.startsWith("tr") ? "tr" : "en";
};