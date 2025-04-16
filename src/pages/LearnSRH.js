// SRHInfo.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SRHInfo = () => {
  const [language, setLanguage] = useState('english');
  const navigate = useNavigate();

  const content = {
    english: {
      title: 'Why Sexual and Reproductive Health (SRH) Matters',
      body: `
        Sexual and reproductive health is not just about avoiding diseases. 
        It is about understanding your body, making informed decisions, 
        and living a safe, healthy, and confident life. Knowing your rights 
        and choices helps you protect yourself, build healthy relationships, 
        and plan for your future.

        Some key benefits of SRH education include:
        - Preventing sexually transmitted infections (STIs)
        - Understanding consent and healthy boundaries
        - Avoiding unplanned pregnancies
        - Building self-confidence and body awareness
        - Accessing health services without shame or fear

        Everyone — especially young people — deserves access to safe and accurate information about their sexual and reproductive health.
      `
    },
    pidgin: {
      title: 'Why SRH (Sexual and Reproductive Health) dey Important',
      body: `
        Sexual and reproductive health no be only about how to avoid disease. 
        E dey help you sabi your body well-well, make better choice, and live 
        correct, safe, and confident life. When you get better knowledge, you fit 
        protect yourself, build better relationship, and plan your life well.

        Wetin SRH go help you do:
        - Avoid disease like STI (wey dem dey pass through sex)
        - Understand say consent na important — no be by force
        - Avoid belle wey you no plan for
        - Get confidence and know your body
        - Know say you fit go hospital without shame or fear

        Every person — especially young people — deserve correct info about their body and how to take care of am.
      `
    }
  };

  return (
    <div className="container mt-5">
      <button onClick={() => navigate(-1)} className="btn btn-outline-dark mb-3">← Go Back</button>

      <div className="d-flex justify-content-end mb-3">
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="form-select w-auto">
          <option value="english">English</option>
          <option value="pidgin">Pidgin</option>
        </select>
      </div>

      <h2 className="mb-3">{content[language].title}</h2>
      <p style={{ whiteSpace: 'pre-wrap' }}>{content[language].body}</p>
    </div>
  );
};

export default SRHInfo;
