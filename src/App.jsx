import React, { useState } from "react";
import GameBoard from "./components/GameBoard";
import ListRoom from "./components/ListRoom";

const App = () => {
  const [roomId, setRoomId] = useState(null);
  const [playerId, setPlayerId] = useState(null);

  const closeGameBoard = () => {
    setRoomId(null)
  }

  return (
    <div>
      {roomId ? (
        <GameBoard roomId={roomId} playerId={playerId} onCloseGame={closeGameBoard}/>
      ) : (
        <ListRoom getRoom={setRoomId} getPlayer={setPlayerId} />
      )}
    </div>
  );
};

export default App;
