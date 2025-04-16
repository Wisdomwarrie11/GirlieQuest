import React from 'react';

const AvatarCard = ({ id, src, selected, onSelect }) => (
    <div
      className={`avatar-card ${selected ? 'selected-avatar' : ''}`}
      onClick={onSelect}
      style={{
        border: selected ? '3px solid #d63384' : '2px solid #ccc',
        borderRadius: '15px',
        padding: '8px',
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
        boxShadow: selected ? '0 0 10px #ff69b4' : '0 0 5px #ccc',
      }}
    >
      <img
        src={src}
        alt={`avatar-${id}`}
        style={{
          width: '100px',
          height: '100px',
          objectFit: 'cover',
          borderRadius: '50%',
        }}
      />
    </div>
  );
  

export default AvatarCard;
