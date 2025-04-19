import React, { useState } from 'react';
import AvatarCard from '../components/AvatarCard';
import { useNavigate } from 'react-router-dom';
import '../styles/AvatarSetup.css';
import avatar1 from '../assets/girlie1.jpg'
import avatar2 from '../assets/beauty.jpg'
import avatar3 from '../assets/girlie3.jpg'; 
import avatar4 from '../assets/girlie4.jpg'
const AvatarSetup = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatarName, setAvatarName] = useState('');
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState('');

  const avatars = [
    { id: 1, src: avatar1 },
    { id: 2, src: avatar2 },
    { id: 3, src: avatar3 },
    { id: 4, src: avatar4 },
  ];

  const nigerianStates = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", 
    "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT",
    "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", 
    "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", 
    "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAvatar || !avatarName || !selectedState) {
      alert('Ooops, your setup is not complete!');
      return;
    }
    const selectedAvatarData = avatars.find((a) => a.id === selectedAvatar);

    const profile = {
      avatarId: selectedAvatar,
      avatarSrc: selectedAvatarData.src,
      name: avatarName,
      state: selectedState,
    };

    localStorage.setItem('girlieProfile', JSON.stringify(profile));
    navigate('/levels');
  };

  

  return (
    <div style={{fontFamily: 'sans-serif'}} className="avatar-setup-wrapper">
      <div className="setup-header text-center">
        <h1 className='fw-bold' style={{fontFamily: 'sans-serif', color: 'white', marginTop : '50px', marginRight: '20px'}}>Choose your Girlie</h1>
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

      <form style={{fontFamily: 'sans-serif'}} onSubmit={handleSubmit} className="avatar-form text-center">
        <input
          type="text"
          placeholder="Give her a name 💕"
          className="avatar-name-input"
          value={avatarName}
          onChange={(e) => setAvatarName(e.target.value)}
        />
        <select
          className="form-select mb-3"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="">Select Your State 🌍</option>
          {nigerianStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <button style={{fontFamily: 'sans-serif'}} className="fw-bold start-button">Start your quest🚀</button>
      </form>
    </div>
  );
};

export default AvatarSetup;
