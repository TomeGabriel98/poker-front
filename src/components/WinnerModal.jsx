import React from "react";
import "../styles/WinnerModal.css";

const WinnerModal = ({ winningPlayer, winningHand, onClose }) => {
  if (!winningPlayer) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Congratulations!</h2>
        <p>
          <strong>Winner:</strong> {winningPlayer.name}
        </p>
        <p>
          <strong>Winning Hand:</strong> {winningHand}
        </p>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default WinnerModal;
