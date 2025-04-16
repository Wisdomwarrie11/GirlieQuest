import React, { useState, useEffect } from 'react';

const Achievement = ({ levelCompleted }) => {
  const [voucherCode, setVoucherCode] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  useEffect(() => {
    if (levelCompleted) {
      // Generate a voucher code
      const code = 'GIRLIE' + Math.random().toString(36).substring(2, 8).toUpperCase();
      setVoucherCode(code);

      // Set expiry date to 7 days from now
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 7);
      setExpiryDate(expiry.toLocaleDateString());
    }
  }, [levelCompleted]);

  const handleClaimVoucher = () => {
    if (new Date() < new Date(expiryDate)) {
      alert(`Congrats! You received a voucher code: ${voucherCode}. Valid until ${expiryDate}`);
      // Unlock the next level
      // Logic to unlock the next level
    } else {
      alert("Sorry, your voucher has expired.");
    }
  };

  return (
    <div className={`achievement-message ${levelCompleted ? 'show' : 'hide'}`}>
      <h2>Congratulations, you completed this level! 🎉</h2>
      <p>Your reward: Voucher Code: <strong>{voucherCode}</strong></p>
      <p>This voucher expires on: <strong>{expiryDate}</strong></p>
      <button onClick={handleClaimVoucher}>Claim Voucher</button>
    </div>
  );
};

export default Achievement;
