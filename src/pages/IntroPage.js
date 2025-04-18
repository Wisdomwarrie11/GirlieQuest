import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../pages/IntroPage.css';
import introSound from '../assets/sounds/bg.mp3'; 

const IntroPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const handleStart = () => {
    if (!audioRef.current) {
      const audio = new Audio(introSound);
      audio.loop = true;
      audio.volume = 0.3;
      audio.play();
      audioRef.current = audio;
    }
  
    setLoading(true);
    setTimeout(() => {
      // Stop the audio before navigating
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      navigate('/avatarsetup');
    }, 7000);
  };
  

  return (
    <div className="intro-container">
      <div className="overlay">

        {!loading ? (
          <motion.button
            className="start-button"
            onClick={handleStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Quest
          </motion.button>
        ) : (
          <motion.div
            className="loading-bar"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5 }}
          >
            <div className="bar-fill" />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default IntroPage;
