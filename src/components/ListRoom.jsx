import React, { useState, useEffect } from "react";
import { fetchRooms, createRoom, createPlayer, joinRoom } from "../services/api";
import "../styles/ListRoom.css";
import InputModal from "./InputModal";

const ListRoom = ({ getRoom, getPlayer }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
	const [rooms, setRooms] = useState([]);
	const [getPlayerModal, setGetPlayerModal] = useState(false);
  const [createPlayerModal, setCreatePlayerModal] = useState(false);
  const [createRoomModal, setCreateRoomModal] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [playerId, setPlayerId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [roomName, setRoomName] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openCreatePlayerModal = () => setCreatePlayerModal(true);
	const closeCreatePlayerModal = () => setCreatePlayerModal(false);
  const openCreateRoomModal = () => setCreateRoomModal(true);
	const closeCreateRoomModal = () => setCreateRoomModal(false);
  
  const openGetPlayerModal = (roomId) => {
    setSelectedRoomId(roomId);
    setGetPlayerModal(true);
  };

	const closeGetPlayerModal = () => {
    setGetPlayerModal(false);
    setSelectedRoomId(null);
  };

	useEffect(() => {
		openModal()
    setPlayerId("");
		fetchRooms().then((response) => setRooms(response.data));
	}, []);

	const handleJoinRoom = async () => {
    joinRoom(selectedRoomId, playerId).then(() => {
			getRoom(selectedRoomId)
      getPlayer(playerId)
			closeGetPlayerModal()
		})
  };

	const handleCreatePlayer = async () => {
    createPlayer(playerName).then(() => {
			closeCreatePlayerModal()
		})
  };

	const handleCreateRoom = async () => {
    createRoom(roomName).then(() => {
			closeCreateRoomModal()
      fetchRooms().then((response) => setRooms(response.data));
		})
  };

  return (
    <div className="page-container">
      {isModalOpen && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h1>Poker Game</h1>
            <h3>List of avaiable rooms</h3>
            <div className="modal-actions">
              {rooms.map((room) => (
                <div className="room-item" key={room.id}>
                  <div className="room-info">
                    <span className="room-name">{room.name}</span>
                  </div>
                  <button className="confirm-btn" onClick={() => openGetPlayerModal(room.id)}>Join</button>
                </div>
              ))}
            </div>
            <div>
              <button className="confirm-btn" onClick={openCreatePlayerModal}>Create player</button>
              <button className="confirm-btn" onClick={openCreateRoomModal}>Create room</button>
            </div>
          </div>
        </div>
      )}

      <InputModal 
        isOpen={createPlayerModal}
        title="Enter the Player Name"
        onClose={closeCreatePlayerModal}
        onConfirm={handleCreatePlayer}
      >
        <input
          type="text"
          placeholder="Player name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </InputModal>

      <InputModal 
        isOpen={getPlayerModal}
        title="Enter the Player Id"
        onClose={closeGetPlayerModal}
        onConfirm={handleJoinRoom}
      >
        <input
          type="text"
          placeholder="Player ID"
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
        />
      </InputModal>

      <InputModal 
        isOpen={createRoomModal}
        title="Enter the Room Name"
        onClose={closeCreateRoomModal}
        onConfirm={handleCreateRoom}
      >
        <input
          type="text"
          placeholder="Room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </InputModal>
    </div>
  );
};

export default ListRoom;
