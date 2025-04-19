import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './IntroPage.css'; // We’ll handle styling there

const IntroPage = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate('/avatarsetup'), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 50); // Adjust speed here
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="intro-page">
      <div className="overlay">
        <div className="loading-container">
          <div className="loading-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
