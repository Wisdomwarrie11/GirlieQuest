// RewardCelebration.js
import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti'; // if installed
import celebrationSound from '../assets/sounds/celebration.wav'; // optional audio
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const congratulatoryMessages = {
  english: {
    title: "Congratulations! You've won a sanitary pad with a voucher code 🎉",
    voucherMessage: "🎁 Your Voucher Code: ",
    buttonText: "Proceed to Next Level"
  },
  pidgin: {
    title: "Congrats! You don win sanitary pad with voucher code! 🎉",
    voucherMessage: "🎁 Your Voucher Code: ",
    buttonText: "Go to Next Level"
  },
  igbo: {
    title: "Ekele! I meriri sanitary pad na voucher code 🎉",
    voucherMessage: "🎁 Koodu Voucher gị: ",
    buttonText: "Gaa na N'ọkwa Na-esote"
  },
  yoruba: {
    title: "E ku odun! O ti win sanitary pad pẹlu koodu voucher! 🎉",
    voucherMessage: "🎁 Koodu Voucher rẹ: ",
    buttonText: "Lọ si Ipele Tẹle"
  }
};

const RewardCelebration = ({ show, onClose, levelId, language }) => {
  const [voucherRevealed, setVoucherRevealed] = useState(false);
  const voucherCode = 'FEMCARE2025';
  const navigate = useNavigate(); // Create navigate function

  // Dynamically set the congratulatory messages based on the selected language
  const messages = congratulatoryMessages[language] || congratulatoryMessages['english'];

  useEffect(() => {
    if (show) {
      confetti(); // triggers when modal is shown
      const audio = new Audio(celebrationSound);
      audio.play().catch(() => {}); // play sound if available
    }
  }, [show]);

  const handleVoucherReveal = () => setVoucherRevealed(true);

  // Function to handle navigation to the next level
  const handleProceed = () => {
    onClose(); // Close the modal
    navigate(`/next-level/${levelId}`); // Navigate to the next level route
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdrop="static"
      size="lg"
      className="congrats-modal animate__animated animate__bounceIn"
    >
      <Modal.Body>
        <div className="text-center p-5">
          <h2 className="fw-bold text-success">{messages.title}</h2>

          <div
            onClick={handleVoucherReveal}
            className="reward-box mt-3 p-4 rounded shadow"
            style={{
              backgroundColor: '#fff0f6',
              border: '2px dashed deeppink',
              cursor: 'pointer',
              transition: 'transform 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {voucherRevealed ? (
              <h4 className="text-danger">
                {messages.voucherMessage} <strong>{voucherCode}</strong>
              </h4>
            ) : (
              <h5 className="text-primary">🎁 Click to Reveal Your Gift</h5>
            )}
          </div>

          <Button
            variant="success"
            onClick={handleProceed} // On click, navigate to next level
            size="lg"
            className="mt-4"
          >
            {messages.buttonText}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RewardCelebration;
