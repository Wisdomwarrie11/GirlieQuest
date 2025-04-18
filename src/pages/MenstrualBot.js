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
      return `👑 Your next period fit start around ${nextPeriodDate}. Make you ready, ok? 💖`;
    } else {
      return `🌸 Your next period will likely start on ${nextPeriodDate}. Stay prepared!`;
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f9d7f5, #c062df)',
      minHeight: '80vh',
      marginTop: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '30px 20px',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        fontFamily: `'Poppins', sans-serif`,
        animation: 'fadeIn 1s ease-in-out',
      }}>
        <h2 style={{
          color: '#c062df',
          marginBottom: '20px',
          fontWeight: '700',
        fontFamily: 'sans-serif' 
        }}>
          🩷 Menstrual Period Calculator
        </h2>

        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <label style={{ fontWeight: '500' }}>Pick Your Last Period Date:</label>
          <input
            type="date"
            value={lmpDate}
            onChange={(e) => setLmpDate(e.target.value)}
            style={{
              marginTop: '8px',
              width: '100%',
              padding: '10px',
              borderRadius: '10px',
              border: '1px solid #ddd',
              fontSize: '14px',
              marginTop: '5px'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <label style={{ fontWeight: '500' }}>Select Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              marginTop: '8px',
              width: '100%',
              padding: '10px',
              borderRadius: '10px',
              border: '1px solid #ddd',
              fontSize: '14px'
            }}
          >
            <option value="english">English</option>
            <option value="pidgin">Pidgin</option>
          </select>
        </div>

        <button
          onClick={calculateNextPeriod}
          style={{
            background: 'linear-gradient(135deg, #ff69b4, #c062df)',
            color: 'white',
            border: 'none',
            padding: '12px 25px',
            borderRadius: '30px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            marginTop: '10px',
            transition: 'background 0.3s',
          }}
          onMouseOver={(e) => e.target.style.background = 'linear-gradient(135deg, #c062df, #ff69b4)'}
          onMouseOut={(e) => e.target.style.background = 'linear-gradient(135deg, #ff69b4, #c062df)'}
        >
          🧮 Calculate
        </button>

        {nextPeriodDate && (
          <div style={{
            marginTop: '25px',
            backgroundColor: '#ffe4f2',
            padding: '15px',
            borderRadius: '15px',
            color: '#7d3570',
            fontWeight: '600',
            animation: 'fadeIn 1s ease-in-out',
          }}>
            {getBotMessage()}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenstrualBot;
