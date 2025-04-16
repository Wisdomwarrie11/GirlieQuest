import React from 'react';
import '../styles/AvatarCard.css';

const AvatarCard = ({ id, src, selected, onSelect }) => (
  <div
    className={`avatar-card ${selected ? 'selected-avatar' : ''}`}
    onClick={onSelect}
  >
    <img
      src={src}
      alt={`avatar-${id}`}
      className="avatar-img"
    />
  </div>
);

export default AvatarCard;
