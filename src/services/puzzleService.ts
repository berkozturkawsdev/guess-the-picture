import levels from "../data/levels.json";
import { puzzleSets } from "../data/puzzle-sets";

export function getLevelsForSet(setId: string | null) {
    if (!setId) {
        return levels;
    }

    const puzzleSet = Object.values(puzzleSets).find(
        set => set.id === setId
    );

    if (!puzzleSet) {
        return levels;
    }

    return levels.filter(level =>
        puzzleSet.levels.includes(level.id)
    );
}