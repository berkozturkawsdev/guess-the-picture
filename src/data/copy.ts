import type { Language } from "../utils/getLanguage";

export interface Copy {
    badge: string;
    title: string;
    intro: string;
    playButton: string;

    login: string;
    logout: string;
    player: string;

    loginModal: {
        title: string;
        message: string;
        googleButton: string;
        footer: string;
        heading: string;
    };

    highlights: {
        title: string;
        text: string;
    }[];

    loading: string;

    settingsTitle: string;
    languageLabel: string;
    english: string;
    turkish: string;
    close: string;

    puzzleSets: {
        title: string;
        puzzles: string;
    };

    exitModal: {
        title: string;
        message: string;
        cancel: string;
        confirm: string;
    };

    help: {
        title: string;
        body: string;
        list: string[];
        aboutTitle: string;
        aboutBody: string;
    };

    setCompleted: {
        title: string;
        message: string;
        button: string;
    };
}

export const getCopy = (language: Language): Copy =>
    language === "tr"
        ? {
            badge: "Ücretsiz Görsel Kelime Bulmaca",

            title: "Resme Bak ve Tahmin Et",

            intro:
                "Dört görsel ipucuyla tek bir kelimeyi bulduğun ücretsiz bir kelime bulmaca oyunu oyna. Kelime dağarcığını test et, gözlem becerilerini geliştir ve eğlenceli bir günlük meydan okuma yaşa.",

            playButton: "Başla",

            login: "Giriş Yap",
            logout: "Çıkış Yap",
            player: "Oyuncu",

            loginModal: {
                title: "OYUNA KATIL",
                message:
                    "İlerlemeni kaydetmek ve skor tablosunda yarışmak için giriş yap.",
                googleButton: "Google ile devam et",
                footer: "Oynaması ücretsiz",
                heading: "Oynamaya hazır mısın?",
            },

            highlights: [
                {
                    title: "4 görsel ipucu",
                    text: "Ortak kelimeyi bul",
                },
                {
                    title: "Hızlı ve eğlenceli",
                    text: "Kısa beyin egzersizleri için ideal",
                },
                {
                    title: "Ücretsiz",
                    text: "Sınırsız kelime tahmin eğlencesi",
                },
            ],

            loading: "Bulmaca yükleniyor...",

            settingsTitle: "Ayarlar",
            languageLabel: "Dil",
            english: "İngilizce",
            turkish: "Türkçe",
            close: "Kapat",

            puzzleSets: {
                title: "Bulmaca Setleri",
                puzzles: "bulmaca",
            },

            exitModal: {
                title: "Oyundan Çık?",
                message: "Bulmacayı bırakmak istediğinden emin misin?",
                cancel: "Devam Et",
                confirm: "Çık",
            },

            help: {
                title: "Nasıl Oynanır",
                body:
                    "Bu oyunda dört görsel tek bir kelimeye işaret eder. Harf butonlarını kullanarak kelimeyi tahmin et ve bulmacayı tamamla.",
                list: [
                    "Görsel ipuçlarını dikkatlice incele.",
                    "Cevabı oluşturacak harfleri seç.",
                    "Kelimeyi tamamlayarak bir sonraki bulmacaya geç.",
                ],
                aboutTitle: "Hakkında",
                aboutBody: "Berk Öztürk tarafından oluşturuldu.",
            },

            setCompleted: {
                title: "Bulmaca Seti Tamamlandı!",
                message: "Bu setteki tüm bulmacaları tamamladın.",
                button: "Bulmaca Setlerine Dön",
            },
        }
        : {
            badge: "Free Picture Word Puzzle",

            title: "Guess the Picture",

            intro:
                "Play an addictive word puzzle game where four picture clues lead to one hidden word. Test your vocabulary, sharpen your observation skills, and enjoy a fun daily challenge.",

            playButton: "Play Now",

            login: "Login",
            logout: "Logout",
            player: "Player",

            loginModal: {
                title: "JOIN THE GAME",
                message:
                    "Sign in to save your progress and compete on the scoreboard.",
                googleButton: "Continue with Google",
                footer: "Free to play",
                heading: "Ready to play?",
            },

            highlights: [
                {
                    title: "4 clue images",
                    text: "Find the shared word",
                },
                {
                    title: "Fast and fun",
                    text: "Great for quick brain breaks",
                },
                {
                    title: "Free to play",
                    text: "Enjoy endless word guessing fun",
                },
            ],

            loading: "Loading puzzle...",

            settingsTitle: "Settings",
            languageLabel: "Language",
            english: "English",
            turkish: "Turkish",
            close: "Close",

            puzzleSets: {
                title: "Puzzle Sets",
                puzzles: "puzzles",
            },

            exitModal: {
                title: "Exit Game?",
                message: "Are you sure you want to stop playing?",
                cancel: "Keep Playing",
                confirm: "Exit",
            },

            help: {
                title: "How to Play",
                body:
                    "This game shows you four pictures that hint at a single word. Use the letter buttons to guess the word and complete the puzzle.",
                list: [
                    "Look at the clue images carefully.",
                    "Pick the letters that form the answer.",
                    "Complete the word to move to the next puzzle.",
                ],
                aboutTitle: "About",
                aboutBody: "Built by Berk Öztürk.",
            },

            setCompleted: {
                title: "Puzzle Set Completed!",
                message: "You've completed all puzzles in this set.",
                button: "Back to Puzzle Sets",
            },
        };
