import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LevelSelect.css';
import MenstrualBot from '../pages/MenstrualBot';
import InviteFriend from '../pages/InviteFriend';

const levels = [
  { id: 1, name: 'Miss Strength'},
  { id: 2, name: 'Miss Beauty'},
  { id: 3, name: 'Miss Purity'},
  { id: 4, name: 'Miss Charming'},
  { id: 5, name: 'Miss Amazing'},
  { id: 6, name: 'Miss Smart'},
  { id: 7, name: 'Miss Adorable'},
  { id: 8, name: 'Miss Caring'},
  { id: 9, name: 'Miss Bright'},
  { id: 10, name: 'Miss Confident'},
];

const LevelSelect = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [unlockedLevels, setUnlockedLevels] = useState([1]);
  const [scores, setScores] = useState({});
  const [totalScore, setTotalScore] = useState(0);

  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('girlieProfile'));
    const progress = JSON.parse(localStorage.getItem('girlieProgress')) || [1];
    const savedScores = JSON.parse(localStorage.getItem('girlieScores')) || {};

    if (!savedProfile) {
      navigate('/');
    } else {
      setProfile(savedProfile);

      // Voice reading
      const message = `Welcome ${savedProfile.name}. You can now start your quest`;

      const synth = window.speechSynthesis;
      let selectedVoice;

      const speak = () => {
        const utterance = new SpeechSynthesisUtterance(message);
        const voices = synth.getVoices();

        selectedVoice = voices.find(voice =>
          voice.name.toLowerCase().includes('female') ||
          voice.name.toLowerCase().includes('woman') ||
          voice.name.toLowerCase().includes('samantha') ||
          voice.name.toLowerCase().includes('zira')
        );

        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }

        utterance.pitch = 1.2;
        utterance.rate = 1;
        synth.speak(utterance);
      };

      if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = () => {
          speak();
        };
      } else {
        speak();
      }

      // Typing first line
      let i = 0;
      const textLine1 = `WWelcome ${savedProfile.name}!`;
      const typeText1 = setInterval(() => {
        setText1(prev => prev + textLine1.charAt(i));
        i++;
        if (i === textLine1.length) {
          clearInterval(typeText1);
          setTypingDone(true);
        }
      }, 100);

      setUnlockedLevels(progress);
      setScores(savedScores);
      const total = Object.values(savedScores).reduce((acc, score) => acc + score, 0);
      setTotalScore(total);
    }
  }, []);

  useEffect(() => {
    if (!typingDone) return;

    const textLine2 = 'YYou can now start your quest.';
    let j = 0;
    const typeText2 = setInterval(() => {
      setText2(prev => prev + textLine2.charAt(j));
      j++;
      if (j === textLine2.length) {
        clearInterval(typeText2);
      }
    }, 50);

    return () => clearInterval(typeText2);
  }, [typingDone]);

  const handleLevelClick = (levelId) => {
    if (unlockedLevels.includes(levelId)) {
      navigate(`/quiz/${levelId}`);
    } else {
      alert("Finish the previous level before this is unlocked 💅");
    }
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px', color: 'black', fontFamily: 'sans-serif' }} className="avatar-setup-wrapper mt-4 level">
      {profile && (
        <>
          <div className="text-center mb-4">
            <img src={profile.avatarSrc} alt="avatar" width="150px" height="150px" />
            <h4 style={{ fontFamily: 'sans-serif', color: 'white' }} className="fw-bold mt-2">
              Hi, my name is {profile.name}💖<br /> from {profile.state} State.
            </h4>
          </div>

          {/* Typing Texts */}
          <h3 style={{ fontFamily: 'sans-serif', color: 'white' }} className="fw-bold text-center mb-3">{text1}</h3>
          <h4 style={{ fontFamily: 'sans-serif', color: 'white' }} className="fw-bold text-center mb-3">{text2}</h4>

          <div className="row">
            {levels.map((level) => (
              <div className="col-6 col-md-4 mb-3" key={level.id}>
                <div
                  className={`level-card p-3 shadow-sm text-center ${unlockedLevels.includes(level.id) ? '' : 'locked'}`}
                  onClick={() => handleLevelClick(level.id)}
                >
                  <h5>{level.name}</h5>
                  {unlockedLevels.includes(level.id) ? (
                    <p className="score">⭐ {scores[level.id] || 0}/10</p>
                  ) : (
                    <span className="lock-icon">🔒</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <InviteFriend />
        </>
      )}
    </div>
  );
};

export default LevelSelect;
