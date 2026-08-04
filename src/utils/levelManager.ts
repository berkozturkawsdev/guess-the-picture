export function shuffleLevels<T>(levels: T[]): T[] {
  return [...levels].sort(() => Math.random() - 0.5);
}

export function getNextLevels<T>(
  remainingLevels: T[],
  allLevels: T[]
): {
  currentLevel: T;
  remainingLevels: T[];
} {
  if (remainingLevels.length <= 1) {
    const reshuffled = shuffleLevels(allLevels);

    return {
      currentLevel: reshuffled[0],
      remainingLevels: reshuffled.slice(1),
    };
  }

  return {
    currentLevel: remainingLevels[1],
    remainingLevels: remainingLevels.slice(1),
  };
}