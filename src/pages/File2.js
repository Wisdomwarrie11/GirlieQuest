import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { quizData } from './Dataquiz';
import '../styles/QuizPage.css';  // Assuming you add the styles here

const QuizPage = () => {
  const navigate = useNavigate();
  const { levelId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [language, setLanguage] = useState('english'); // Default language
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lifelines, setLifelines] = useState({ callAFriend: true, fiftyFifty: true });
  const [selectedOption, setSelectedOption] = useState(null);
  const [questionAnswered, setQuestionAnswered] = useState(false);

  useEffect(() => {
    const currentQuiz = quizData[levelId];
    if (currentQuiz) {
      setQuiz(currentQuiz);
    } else {
      navigate('/levels'); // Redirect if quiz not found
    }
  }, [levelId, navigate]);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    setCurrentQuestionIndex(0); // Reset question when language is changed
    setQuestionAnswered(false); // Reset the answer state
  };

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
    setQuestionAnswered(true);
    if (index === quiz.questions[language][currentQuestionIndex].answer) {
      setScore(score + 1);
    }
  };

  const useFiftyFifty = () => {
    // Logic to remove two wrong options
    if (lifelines.fiftyFifty) {
      const question = quiz.questions[language][currentQuestionIndex];
      const correctOption = question.answer;
      const newOptions = question.options.filter((_, idx) => idx === correctOption || idx === Math.floor(Math.random() * 3));
      setLifelines({ ...lifelines, fiftyFifty: false });
      // update question with 50/50 options
      setQuiz({
        ...quiz,
        questions: {
          ...quiz.questions,
          [language]: [
            ...quiz.questions[language].slice(0, currentQuestionIndex),
            { ...question, options: newOptions },
            ...quiz.questions[language].slice(currentQuestionIndex + 1),
          ],
        },
      });
    }
  };

  const callAFriend = () => {
    // Logic for Call a Friend (provide a hint or a hint message)
    if (lifelines.callAFriend) {
      alert(quiz.questions[language][currentQuestionIndex].hint);
      setLifelines({ ...lifelines, callAFriend: false });
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setQuestionAnswered(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (!quiz) return <div>Loading...</div>;

  const question = quiz.questions[language][currentQuestionIndex];
  const avatar = quiz.name;

  return (
    <div className="quiz-container">
      <div className="navbar">
        <button disabled={!lifelines.callAFriend} onClick={callAFriend}>
          Call a Friend
        </button>
        <button disabled={!lifelines.fiftyFifty} onClick={useFiftyFifty}>
          50/50
        </button>
        <div className="score">Score: {score}</div>
      </div>

      <div className="question-container">
        <h3>{question.question}</h3>
        <div className="avatar">
          <img src={`/avatars/${avatar}.jpg`} alt="avatar" />
        </div>

        <div className="options">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`option ${selectedOption === index ? (index === question.answer ? 'correct' : 'incorrect') : ''}`}
              onClick={() => handleOptionSelect(index)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>

      <div className="language-selector">
        <label htmlFor="language">Choose Language: </label>
        <select id="language" value={language} onChange={handleLanguageChange}>
          <option value="english">English</option>
          <option value="pidgin">Pidgin</option>
        </select>
      </div>

      <div className="next-button">
        {questionAnswered && currentQuestionIndex < quiz.questions[language].length - 1 ? (
          <button onClick={nextQuestion}>Next Question</button>
        ) : null}
      </div>
    </div>
  );
};

export default QuizPage;
