import React, { useState } from 'react';
import '../styles/JoinRoom.css';

const JoinRoomModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handlePlayClick = () => {
    console.log('Jogando...');
    closeModal(); // Fechar a modal ao clicar em Play
  };

  return (
    <div className="page-container">
      <button className="open-modal-btn" onClick={openModal}>
        Abrir Modal
      </button>

      {isModalOpen && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar dentro da modal
          >
            <h2>ENTER GAME</h2>
            <p>CHOOSE YOUR IN GAME NAME</p>
            <div className="form-group">
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="User Password (optional)" />
            </div>
            <div className="social-icons">
              <button className="twitter-btn">Twitter</button>
              <button className="patreon-btn">Patreon</button>
            </div>
            <div className="action-buttons">
              <button className="spectate-btn" onClick={closeModal}>
                SPECTATE
              </button>
              <button className="play-btn" onClick={handlePlayClick}>
                PLAY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinRoomModal;
