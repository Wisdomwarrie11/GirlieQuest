import React from 'react';

const LanguageDropdown = ({ value, onChange }) => {
  const languages = [
    { label: 'English', value: 'English', disabled: false },
    { label: 'Pidgin', value: 'Pidgin', disabled: false },
    { label: 'Hausa', value: 'Hausa', disabled: true },
    { label: 'Yoruba', value: 'Yoruba', disabled: true },
    { label: 'Igbo', value: 'Igbo', disabled: true },
    { label: 'Efik', value: 'Efik', disabled: true },
  ];

  return (
    <select
      className="form-select w-50 mx-auto"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select Language</option>
      {languages.map((lang) => (
        <option key={lang.value} value={lang.value} disabled={lang.disabled}>
          {lang.label} {lang.disabled ? ' (Coming soon)' : ''}
        </option>
      ))}
    </select>
  );
};

export default LanguageDropdown;
