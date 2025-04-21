import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { quizData } from './Dataquiz';
import '../styles/QuizPage.css';
import { Modal, Button } from 'react-bootstrap'; 
import correctSound from '../assets/sounds/correct.mp3';
import wrongSound from '../assets/sounds/wrong.mp3';
import bgMusic from '../assets/sounds/bg.mp3';
import confetti from 'canvas-confetti';
import RewardCelebration from './RewardCelebration';
import TryAgainModal from './TryAgainmModal';


const QuizPage = () => {
  const navigate = useNavigate();
const [voices, setVoices] = useState([]);
const [selectedVoice, setSelectedVoice] = useState(null);
  const { levelId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [language, setLanguage] = useState('english');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lifelines, setLifelines] = useState({ callAFriend: true, fiftyFifty: true });
  const [selectedOption, setSelectedOption] = useState(null);
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [profile, setProfile] = useState(null);
const [isMuted, setIsMuted] = useState(false);
  const [fade, setFade] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
const bgAudio = useRef(new Audio(bgMusic));
  const correctAudio = useRef(new Audio(correctSound));
  const wrongAudio = useRef(new Audio(wrongSound));
  const [isSpeaking, setIsSpeaking] = useState(false);
const [isPaused, setIsPaused] = useState(false);
const [showLoseModal, setShowLoseModal] = useState(false);
const [questions, setQuestions] = useState([]);
const [showCongratsModal, setShowCongratsModal] = useState(false);
const [showReward, setShowReward] = useState(false); 
const [showTryAgainModal, setShowTryAgainModal] = useState(false);


const tryAgainMessages = {
  english: {
    message: "You tried your best. Don’t worry, you can try again.",
    buttonText: "Restart Quiz"
  },
  pidgin: {
    message: "You try well well. No fear, you fit try again.",
    buttonText: "Start Again"
  },
  igbo: {
    message: "I mere nke ọma. Enweghị nsogbu, ị nwere ike ịnwale ọzọ.",
    buttonText: "Bido ọzọ"
  },
  yoruba: {
    message: "O gbiyanju daradara. Maṣe yọ ara rẹ lẹnu, o le tun gbiyanju.",
    buttonText: "Tun ṣe Igbiyanju"
  }
};

  
  const currentQuestion = quizData[currentQuestionIndex];

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('girlieProfile'));
    if (!savedProfile) navigate('/');
    setProfile(savedProfile);
  }, [navigate]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      const femaleVoices = availableVoices.filter(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.gender === 'female' || 
        voice.name.toLowerCase().includes('zira') || // popular female voice names
        voice.name.toLowerCase().includes('susan') ||
        voice.name.toLowerCase().includes('linda')
      );
      setVoices(femaleVoices);
      if (femaleVoices.length > 0) {
        setSelectedVoice(femaleVoices[0]);
      }
    };
  
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();
  }, []);

  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  


  

  useEffect(() => {
    const currentQuiz = quizData[levelId];
   if (currentQuiz) {
      setQuiz(currentQuiz);
    } else {
      navigate('/levels');
    }
  }, [levelId, navigate]);

  // useEffect(() => {
  //   bgAudio.current.loop = true;
  //   bgAudio.current.volume = 0.3;
  //   bgAudio.current.play().catch(() => {});
  //   return () => bgAudio.current.pause();
  // }, []);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    setCurrentQuestionIndex(0);
    setQuestionAnswered(false);
  };


  const handleListen = () => {
    if (!question) return;
    
    const utterance = new SpeechSynthesisUtterance(`${question.question}. Options: ${question.options.join(", ")}`);
    utterance.lang = 'en-NG';
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
  
    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };
  
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
  
    speechSynthesis.speak(utterance);
  };
  
  const handleOptionSelect = (index) => {
    setSelectedOption(index);
    setQuestionAnswered(true);

    const isCorrect = index === quiz.questions[language][currentQuestionIndex].answer;
    if (isCorrect) {
      correctAudio.current.play().catch(() => {});
      setScore(score + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
     else {
      wrongAudio.current.play().catch(() => {});
    }
  };

  const useFiftyFifty = () => {
    if (lifelines.fiftyFifty) {
      const question = quiz.questions[language][currentQuestionIndex];
      const correctOption = question.answer;
      const newOptions = question.options.filter((_, idx) =>
        idx === correctOption || idx === Math.floor(Math.random() * 3)
      );
      setLifelines({ ...lifelines, fiftyFifty: false });
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
    if (lifelines.callAFriend) {
      alert(quiz.questions[language][currentQuestionIndex].hint);
      setLifelines({ ...lifelines, callAFriend: false });
    }
  };

  const nextQuestion = () => {
    setFade(true);
    setTimeout(() => {
      setSelectedOption(null);
      setQuestionAnswered(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setFade(false);
    }, 400);
  };

  const finishQuiz = () => {
    setQuizFinished(true);
    if (score === quiz.questions[language].length) {
      
      setShowCongratsModal(true); 
      setShowReward(true);
    } else   {
        setShowTryAgainModal(true);
      }  
  };

  const handleRetry = () => {
    setScore(0);
    setQuizFinished(false);
    setShowTryAgainModal(false);
    navigate(`/quiz/${levelId}`)  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setQuestionAnswered(false);
    setScore(0); 
    setQuizFinished(false); 
  };
  

  const handleCloseModal = () => {
    setShowCongratsModal(false);
    navigate(`/nextLevel/${parseInt(levelId) + 1}`); 
  };

  const handleModal = () => {
    setShowLoseModal(false);
    
  };

  if (!quiz) return <div>Loading...</div>;

  const question = quiz.questions[language][currentQuestionIndex];
  const avatar = quiz.name;

  const LoseMessage = language === 'english' 
    ? "PLEASE TRY AGAIN"
    : "ABEG TRY AGAIN";


 
  const congratsMessage = language === 'english' 
    ? "You got all the questions correct! You've earned a prize. Redeem a pack of Vivo sanitary pad from Livewell Clinic with the voucher code; 1298AF2."
    : "You don do am! You answer all di questions correct! You don win one pack of Vivo sanitary pad. Collect am for Livewell Clinic with this voucher code; 1298AF2.."
  return (
    <div className="quiz-container">
      {/* Navbar */}

      <div className="quiz-navbar d-flex justify-content-between align-items-center mb-4">
        <div>
          <button style={{ backgroundColor: '#800080', padding: '5px'}}  onClick={callAFriend} disabled={!lifelines.callAFriend}>Hint</button>
          <button style={{marginTop: '20px', padding: '5px', backgroundColor: '#800080'}}  onClick={useFiftyFifty} disabled={!lifelines.fiftyFifty}> 50/50</button>
        </div>
        <div style={{marginRight: '20px'}}> {score}💎</div>
        <div className="d-flex align-items-center gap-2">
          <select id="language" value={language} onChange={handleLanguageChange}>
            <option value="english">English</option>
            <option value="pidgin">Pidgin</option>
            <option value="yoruba">yoruba</option>
            <option value="igbo">igbo</option>

          </select>
          {/* <button onClick={() => {
            setIsMuted(!isMuted);
            bgAudio.current.muted = !isMuted;
            correctAudio.current.muted = !isMuted;
            wrongAudio.current.muted = !isMuted;
          }}>
            {isMuted ? '🔇' : '🔊'}
          </button> */}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress my-3">
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{ width: `${((currentQuestionIndex + 1) / quiz.questions[language].length) * 100}%` }}
          aria-valuenow={(currentQuestionIndex + 1)}
          aria-valuemin="0"
          aria-valuemax={quiz.questions[language].length}
        ></div>
      </div>

      {/* Avatar */}
      {profile?.avatarSrc && (
        <div className="text-center">
          <img
            style={{ width: '200px', height: '200px', borderRadius: '10px' }}
            src={profile.avatarSrc}
            alt="Avatar"
            className={`avatar-img mb-3 ${questionAnswered ? (selectedOption === question.answer ? 'correct' : 'incorrect') : ''}`}
          />
        </div>
      )}

      {/* Question Block with Animation */}
      <div  className={`question-container ${fade ? 'fade-out' : 'fade-in'}`}>
        <h3 style={{ fontFamily: 'sans-serif', color: 'white'}}>{question.question}</h3>
        <div className="options">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`option ${selectedOption === index ? (index === question.answer ? 'correct' : 'incorrect') : ''}`}
              onClick={() =>{ 
               if (!questionAnswered) handleOptionSelect(index) 
              }}
            >
              {option}
            </div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div style={{marginBottom: '5px'}} className="next-button">
        {questionAnswered && currentQuestionIndex < quiz.questions[language].length - 1 ? (
          <button onClick={nextQuestion}>Next Question</button>
        ) : null}
      </div>

    {/* 🔥 Action Bar */}
 <div style={{
  backgroundColor: '#ffccf9',
  padding: '10px',
  borderRadius: '12px',
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px'
}}>
  <button 
    onClick={handleListen}
    style={{
      backgroundColor: '#800080',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '20px',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer'
    }}
  >
    🎧 Listen to Question
  </button>
  {isSpeaking && (
  <button
    onClick={() => {
      if (speechSynthesis.speaking && !speechSynthesis.paused) {
        speechSynthesis.pause();
        setIsPaused(true);
      } else if (speechSynthesis.paused) {
        speechSynthesis.resume();
        setIsPaused(false);
      }
    }}
    style={{
      marginLeft: '10px',
      backgroundColor: isPaused ? '#800080' : '#800080',
      color: 'white',
      padding: '5px 10px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer'
    }}
  >
    {isPaused ? 'Resume' : 'Pause'}
  </button>
)}

</div>



      {/* Finish Quiz Button */}
      {currentQuestionIndex === quiz.questions[language].length - 1 && !quizFinished && (
        <div className="finish-button">
          <button onClick={finishQuiz}>Finish Quiz</button>
        </div>
      )}




      {/* Congratulations Modal from react-bootstrap */}
      {showCongratsModal && !showReward && (
  <div className="congrats-box" onClick={() => setShowReward(true)}>
    <h2>🎉 Congratulations!</h2>
    <p>You got all the answers right!</p>
    <p><strong>Click to reveal your reward 🎁</strong></p>
  </div>
)}

{showReward && (
 <RewardCelebration
 show={showCongratsModal}
 onClose={() => setShowCongratsModal(false)}
 levelId={levelId}
 language={language}
 centered
 size="lg"
 backdrop="static"
 className="congrats-modal animate__animated animate__bounceIn"
/>



)}
<TryAgainModal
        show={showTryAgainModal}
        onClose={() => setShowTryAgainModal(false)}
        language={language}
        onRetry={restartQuiz}
      />

    </div>
  );
};

 

export default QuizPage;
