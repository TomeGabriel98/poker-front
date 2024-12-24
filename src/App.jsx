import React, { useState } from "react";
import RoomList from "./components/legacy/RoomList";
import GameBoard from "./components/GameBoard";
import JoinRoom from "./components/JoinRoom";
import ListRoom from "./components/ListRoom";

const App = () => {
  const [roomId, setRoomId] = useState(null);

  return (
    <div>
      {roomId ? (
        <GameBoard />
      ) : (
        <ListRoom onJoinRoom={setRoomId} />
      )}
    </div>
  );
};

export default App;
