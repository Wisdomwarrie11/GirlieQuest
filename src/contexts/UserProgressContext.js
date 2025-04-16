import { createContext, useContext, useState } from 'react';

const UserProgressContext = createContext();

export const useUserProgress = () => useContext(UserProgressContext);

export const UserProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({
    unlockedLevel: 1,
    scores: {}, // e.g. { 1: 8, 2: 6 }
    totalScore: 0,
  });

  const completeLevel = (level, score) => {
    const updatedScores = { ...progress.scores, [level]: score };
    const highestUnlocked = Math.max(progress.unlockedLevel, level + 1);
    const totalScore = Object.values(updatedScores).reduce((acc, val) => acc + val, 0);

    setProgress({
      unlockedLevel: highestUnlocked > 10 ? 10 : highestUnlocked,
      scores: updatedScores,
      totalScore
    });
  };

  return (
    <UserProgressContext.Provider value={{ progress, completeLevel }}>
      {children}
    </UserProgressContext.Provider>
  );
};
