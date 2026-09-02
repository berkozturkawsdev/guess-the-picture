export interface PuzzleSet {
    id: string;
    title: {
        en: string;
        tr: string;
    };
    puzzleLabel: {
        en: string;
        tr: string;
    };
    levels: number[];
    image: string;
}

export const puzzleSets = {

    whatIsThisAnimal: {
        id: "what-is-this-animal",
        title: {
            en: "What Is This Animal?",
            tr: "Bu Hangi Hayvan?"
        },
        puzzleLabel: {
            en: "puzzles",
            tr: "bulmaca"
        },
        levels: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
        image: "/sets/animals.jpg"
    },

    whatIsThisFood: {
        id: "what-is-this-food",
        title: {
            en: "What Is This Food?",
            tr: "Bu Hangi Yemek?"
        },
        puzzleLabel: {
            en: "puzzles",
            tr: "bulmaca"
        },
        levels: [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
        image: "/sets/food.jpg"
    },

    prehistoricWorld: {
        id: "prehistoric-world",
        title: {
            en: "Prehistoric World",
            tr: "Tarih Öncesi Dünya"
        },
        puzzleLabel: {
            en: "puzzles",
            tr: "bulmaca"
        },
        levels: [51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
        image: "/sets/prehistoric.jpg"
    },
    pirateWorld: {
        id: "pirate-world",
        title: {
            en: "Pirate World",
            tr: "Korsan Dünyası"
        },
        puzzleLabel: {
            en: "puzzles",
            tr: "bulmaca"
        },
        levels: [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
        image: "/sets/pirate.png"
    }

};