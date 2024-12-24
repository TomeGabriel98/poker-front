import React, { useState, useEffect } from "react";
import { fetchRooms, createRoom, joinRoom } from "../services/api";
import "../styles/ListRoom.css";

const ListRoom = ({ onJoinRoom }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
	const [rooms, setRooms] = useState([]);
	const [getPlayerModal, setGetPlayerModal] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [playerId, setPlayerId] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

	useEffect(() => {
		openModal()
		fetchRooms().then((response) => setRooms(response.data));
	}, []);

	const openGetPlayerModal = (roomId) => {
    setSelectedRoomId(roomId);
    setGetPlayerModal(true);
  };

	const closeGetPlayerModal = () => {
    setGetPlayerModal(false);
    setSelectedRoomId(null);
    setPlayerId("");
  };

	const handleJoinRoom = async () => {
    joinRoom(selectedRoomId, playerId).then(() => {
			onJoinRoom(selectedRoomId)
			closeGetPlayerModal()
		})
  };

  return (
    <div className="page-container">
      {isModalOpen && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Evita fechar a modal ao clicar nela
          >
            <h2>Available Rooms</h2>
            <div className="room-list">
              {rooms.map((room) => (
                <div className="room-item" key={room.id}>
                  <div className="room-info">
                    <span className="room-name">{room.name}</span>
                  </div>
                  <button className="join-room-btn" onClick={() => openGetPlayerModal(room.id)}>Join</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

			{getPlayerModal && (
        <div className="modal-backdrop" onClick={closeGetPlayerModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Evita fechar a modal ao clicar nela
          >
            <h2>Enter Player ID</h2>
            <input
              type="text"
              placeholder="Task ID"
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
            />
            <div className="modal-actions">
              <button className="cancel-btn" onClick={closeGetPlayerModal}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={handleJoinRoom}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListRoom;
