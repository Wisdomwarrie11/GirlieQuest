import React, { useEffect } from 'react';
import useSound from 'use-sound';
import bgMusic from '../assets/sounds/bg.mp3';
import correct from '../assets/sounds/correct.mp3';
import wrong from '../assets/sounds/wrong.mp3';

const SoundManager = ({ onCorrect, onWrong }) => {
  const [playBg] = useSound(bgMusic, { volume: 0.3, loop: true });
  const [playCorrect] = useSound(correct, { volume: 0.6 });
  const [playWrong] = useSound(wrong, { volume: 0.6 });

  useEffect(() => {
    playBg();
  }, []);

  useEffect(() => {
    if (onCorrect) playCorrect();
    if (onWrong) playWrong();
  }, [onCorrect, onWrong]);

  return null;
};

export default SoundManager;
