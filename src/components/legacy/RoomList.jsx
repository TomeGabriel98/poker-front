import React, { useState, useEffect } from "react";
import { fetchRooms, createRoom, joinRoom } from "../../services/api";

const RoomList = ({ onJoinRoom }) => {
	const [rooms, setRooms] = useState([]);
	const [newRoomName, setNewRoomName] = useState("");

	useEffect(() => {
		fetchRooms().then((response) => setRooms(response.data));
	}, []);

	const handleCreateRoom = () => {
		createRoom(newRoomName).then(() => {
			setNewRoomName("");
			fetchRooms().then((response) => setRooms(response.data));
		});
	};

	const handleJoinRoom = (roomId) => {
		const playerId = prompt("Enter your Task ID to join:");
		joinRoom(roomId, playerId).then(() => onJoinRoom(roomId));
	};

	return (
		<div>
			<h2>Available Rooms</h2>
			<ul>
				{rooms.map((room) => (
					<li key={room.id}>
						{room.name} <button onClick={() => handleJoinRoom(room.id)}>Join</button>
					</li>
				))}
			</ul>
			<input
				type="text"
				value={newRoomName}
				onChange={(e) => setNewRoomName(e.target.value)}
				placeholder="New room name"
			/>
			<button onClick={handleCreateRoom}>Create Room</button>
		</div>
	);
};

export default RoomList;
