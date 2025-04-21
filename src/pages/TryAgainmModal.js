// TryAgainModal.js
import { Modal, Button } from 'react-bootstrap';

const tryAgainMessages = {
  english: {
    title: "Nice Try!",
    message: "You tried your best. Don’t worry, you can try again.",
    buttonText: "Try Again",
  },
  pidgin: {
    title: "No Worry!",
    message: "You try well well. No fear, you fit try again.",
    buttonText: "Try Again",
  },
  igbo: {
    title: "Nwaanyị oma!",
    message: "I mere nke ọma. Enweghị nsogbu, ị nwere ike ịnwale ọzọ.",
    buttonText: "Nwale Ọzọ",
  },
  yoruba: {
    title: "O ṣe daradara!",
    message: "O gbiyanju daradara. Maṣe yọ ara rẹ lẹnu, o le tun gbiyanju.",
    buttonText: "Tun Ṣe Igbiyanju",
  }
};

const TryAgainModal = ({ show, onClose, language, onRetry }) => {
  const messages = tryAgainMessages[language] || tryAgainMessages.english;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Body className="text-center p-4">
        <h3 className="text-warning">{messages.title}</h3>
        <p>{messages.message}</p>
        <Button onClick={onRetry} variant="warning" className="mt-3">
          {messages.buttonText}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default TryAgainModal;
