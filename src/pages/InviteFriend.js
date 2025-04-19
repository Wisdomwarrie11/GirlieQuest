import React from 'react';

const InviteFriend = () => {
  const inviteLink = `${window.location.origin}/join-quiz?referral=girlie123`; 

  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    alert('✅ Invite link copied! Share it with your friends to earn points.');
  };

  return (
    <div style={{
      backgroundColor: '#d8bfd8',
      padding: '20px',
      borderRadius: '12px',
      marginTop: '30px',
      textAlign: 'center'
    }}>
      <h4 style={{ fontFamily: 'sans-serif'}}>💌 Invite a Friend & Earn Points!</h4>
      <p>Share with your girls and get bonus points when they join!</p>
      
      <button
        onClick={copyLink}
        style={{
          backgroundColor: '#800080',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '20px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        📋 Copy Invite Link
      </button>
    </div>
  );
};

export default InviteFriend;
