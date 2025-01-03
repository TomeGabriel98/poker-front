import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const fetchRooms = () => {
  return axios.get(`${API_BASE_URL}/rooms`);
};

export const createRoom = (name) => {
  return axios.post(`${API_BASE_URL}/rooms`, { name });
};

export const createPlayer = (name) => {
  return axios.post(`${API_BASE_URL}/players`, { name });
};

export const joinRoom = (roomId, playerId) => {
  return axios.post(`${API_BASE_URL}/rooms/${roomId}/join`, { player_id: playerId });
};

export const leaveRoom = (roomId, playerId) => {
  return axios.post(`${API_BASE_URL}/rooms/${roomId}/leave`, { player_id: playerId });
};

export const start = (roomId) => {
  return axios.post(`${API_BASE_URL}/rooms/${roomId}/start`);
}

export const action = (roomId, playerId, action, amount) => {
  return axios.post(`${API_BASE_URL}/rooms/${roomId}/action`, { player_id: playerId, player_action: action, amount: amount });
}

export const nextPhase = (roomId) => {
  return axios.post(`${API_BASE_URL}/rooms/${roomId}/next_phase`);
}

export const showdown = (roomId) => {
  return axios.post(`${API_BASE_URL}/rooms/${roomId}/end`);
}
