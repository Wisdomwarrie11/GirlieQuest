import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LevelSelect.css';
import MenstrualBot from '../pages/MenstrualBot';
import InviteFriend from '../pages/InviteFriend';

const levels = [
  { id: 1, name: 'Strength', topic: 'Unsafe Abortion' },
  { id: 2, name: 'Beauty', topic: 'Contraceptive Use' },
  { id: 3, name: 'Purity', topic: 'Sexual Abstinence' },
  { id: 4, name: 'Bold', topic: 'Gender-Based Violence' },
  { id: 5, name: 'Faith', topic: 'Sexual Abuse Awareness' },
  { id: 6, name: 'Smart', topic: 'Period & Puberty' },
  { id: 7, name: 'Adorable', topic: 'Consent & Boundaries' },
  { id: 8, name: 'Caring', topic: 'Relationships' },
  { id: 9, name: 'Bright', topic: 'Peer Pressure' },
  { id: 10, name: 'Confident', topic: 'SRH Self-Advocacy' },
];

const LevelSelect = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [unlockedLevels, setUnlockedLevels] = useState([1]);
  const [scores, setScores] = useState({});
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('girlieProfile'));
    const progress = JSON.parse(localStorage.getItem('girlieProgress')) || [1];
    const savedScores = JSON.parse(localStorage.getItem('girlieScores')) || {};

    if (!savedProfile) {
      navigate('/');
    } else {
      setProfile(savedProfile);
      setUnlockedLevels(progress);
      setScores(savedScores);

      const total = Object.values(savedScores).reduce((acc, score) => acc + score, 0);
      setTotalScore(total);
    }
  }, []);

  const handleLevelClick = (levelId) => {
    if (unlockedLevels.includes(levelId)) {
      navigate(`/quiz/${levelId}`);
    } else {
      alert("Finish the previous level before this is unlocked 💅");
    }
  };

  return (
    <div  style={{paddingTop: '100px', paddingBottom: '100px', color: 'black', fontFamily: 'sans-serif'}} className="container mt-4 level">
      {profile && (
        <>
          <div className="text-center mb-4">
            <img src={profile.avatarSrc} alt="avatar" width="150px" height= "150px" />
            <h4 style={{fontFamily: 'sans-serif', color: 'white'}} className="fw-bold mt-2"> Hi, my name is {profile.name}💖<br /> from {profile.state} State. </h4>
            {/* <p style={{color: 'white'}} className="text-muted">Total Score: ⭐ {totalScore} / {levels.length * 10}</p> */}
          </div>

          <h3 style={{ fontFamily: 'sans-serif', color: 'white'}} className="fw-bold text-center mb-3">Welcome {profile.name}. You can now start your quest</h3>

          <div className="row">
            {levels.map((level) => (
              <div className="col-6 col-md-4 mb-3" key={level.id}>
                <div
                  className={`level-card p-3 shadow-sm text-center ${unlockedLevels.includes(level.id) ? '' : 'locked'}`}
                  onClick={() => handleLevelClick(level.id)}
                >
                  <h5>{level.name}</h5>
                  <p>{level.topic}</p>
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
