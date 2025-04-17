import React, { useState } from 'react';
import AvatarCard from '../components/AvatarCard';
import { useNavigate } from 'react-router-dom';
import '../styles/AvatarSetup.css';
import avatar1 from '../assets/avatar1.jpg';
import avatar2 from '../assets/avatar2.jpg';
import avatar3 from '../assets/avatar3.jpg'; 

const AvatarSetup = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatarName, setAvatarName] = useState('');
  const navigate = useNavigate();

  const avatars = [
    { id: 1, src: avatar1 },
    { id: 2, src: avatar2 },
    { id: 3, src: avatar3 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAvatar || !avatarName) {
      alert('Pick an avatar and name her first!');
      return;
    }
    const selectedAvatarData = avatars.find((a) => a.id === selectedAvatar);

    const profile = {
      avatarId: selectedAvatar,
      avatarSrc: selectedAvatarData.src,
      name: avatarName,
    };

    localStorage.setItem('girlieProfile', JSON.stringify(profile));
    navigate('/levels');
  };

  return (
    <div className="avatar-setup-wrapper">
      <div className="setup-header text-center">
        <h1>🎀 Welcome to Girlie Quest 🎀</h1>
        <p>Choose your avatar and name her to begin your journey!</p>
      </div>

      <div className="avatar-gallery">
        {avatars.map((avatar) => (
          <div className="col-4 col-md-2" key={avatar.id}>
<AvatarCard
            
            id={avatar.id}
            src={avatar.src}
            selected={selectedAvatar === avatar.id}
            onSelect={() => setSelectedAvatar(avatar.id)}
          />
          </div>
          
        ))}
      </div>

      <form onSubmit={handleSubmit} className="avatar-form text-center">
        <input
          type="text"
          placeholder="Give her a name 💕"
          className="avatar-name-input"
          value={avatarName}
          onChange={(e) => setAvatarName(e.target.value)}
        />
        <button className="start-button">Start the Adventure 🚀</button>
      </form>
    </div>
  );
};

export default AvatarSetup;
