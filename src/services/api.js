import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const fetchRooms = () => {
  return axios.get(`${API_BASE_URL}/rooms`);
};

export const createRoom = (name) => {
  return axios.post(`${API_BASE_URL}/rooms`, { name });
};

export const joinRoom = (roomId, playerId) => {
  return axios.post(`${API_BASE_URL}/rooms/${roomId}/join`, { player_id: playerId });
};

export const leaveRoom = (roomId, playerId) => {
  return axios.post(`${API_BASE_URL}/rooms/${roomId}/leave`, { player_id: playerId });
};
