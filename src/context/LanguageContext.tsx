import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import type { Language } from "../utils/getLanguage";

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
);

export function LanguageProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [language, setLanguageState] = useState<Language>(() => {
        const savedLanguage = localStorage.getItem("language");

        if (savedLanguage === "en" || savedLanguage === "tr") {
            return savedLanguage;
        }

        return "en";
    });

    const setLanguage = (language: Language) => {
        setLanguageState(language);
        localStorage.setItem("language", language);
    };

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error(
            "useLanguage must be used inside LanguageProvider"
        );
    }

    return context;
}
