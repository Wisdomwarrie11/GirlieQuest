import React, { useState, useEffect } from 'react';

const MenstrualBot = () => {
  const [lmpDate, setLmpDate] = useState('');
  const [language, setLanguage] = useState('english');
  const [nextPeriodDate, setNextPeriodDate] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const storedReminder = localStorage.getItem('nextPeriodReminder');

    if (storedReminder && today === storedReminder) {
      setTimeout(() => {
        alert('🌸 Friendly Reminder: Your period might start today. Stay ready and take care!');
      }, 1000);
    }
  }, []);

  const calculateNextPeriod = () => {
    if (!lmpDate) return;

    const lmp = new Date(lmpDate);
    const nextPeriod = new Date(lmp.setDate(lmp.getDate() + 28));
    const nextDateFormatted = nextPeriod.toISOString().split('T')[0];

    setNextPeriodDate(nextDateFormatted);
    localStorage.setItem('nextPeriodReminder', nextDateFormatted);
  };

  const getBotMessage = () => {
    if (!nextPeriodDate) return '';

    if (language === 'pidgin') {
      return `Your next period fit start around ${nextPeriodDate}. Make you ready, ok? 💖`;
    } else {
      return `Your next period will likely start on ${nextPeriodDate}. Stay prepared! 🌸`;
    }
  };

  return (
    <div style={{
      backgroundColor: '#c062df',
      padding: '20px',
      borderRadius: '12px',
      marginTop: '30px',
      textAlign: 'center',
    }}>
      <h4 className='fw-bold'  style={{fontFamily:'sans-serif'}}> Menstrual Period Calculator</h4>

      <div style={{ marginBottom: '10px' }}>
        <label>Pick Your Last Period Date:</label><br />
        <input
          type="date"
          value={lmpDate}
          onChange={(e) => setLmpDate(e.target.value)}
          style={{
            marginTop: '8px',
            padding: '8px',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Select Language:</label><br />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            marginTop: '8px',
            padding: '8px',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        >
          <option value="english">English</option>
          <option value="pidgin">Pidgin</option>
        </select>
      </div>

      <button
        onClick={calculateNextPeriod}
        style={{
          backgroundColor: '#ff69b4',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '20px',
          cursor: 'pointer',
          fontWeight: 'bold',
          marginBottom: '10px'
        }}
      >
        🧮 Calculate
      </button>

      {nextPeriodDate && (
        <div style={{
          marginTop: '15px',
          backgroundColor: '#fff0f5',
          padding: '10px',
          borderRadius: '10px'
        }}>
          {getBotMessage()}
        </div>
      )}
    </div>
  );
};

export default MenstrualBot;
