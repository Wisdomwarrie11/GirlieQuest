import { useUserProgress } from '../context/UserProgressContext';

const QuizResult = ({ score, level }) => {
  const { completeLevel } = useUserProgress();

  useEffect(() => {
    completeLevel(level, score);
  }, []);

  return (
    <div>
      <h2>You scored {score}/10</h2>
      {/* Confetti and Continue button here */}
    </div>
  );
};
