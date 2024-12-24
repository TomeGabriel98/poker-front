import React, { useState, useEffect } from "react";
import "../styles/GameLog.css";

const GameLog = ({ socket }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Escutar logs do WebSocket
    socket.on("game_log", (log) => {
      setLogs((prev) => [...prev, log]);
    });

    return () => {
      socket.off("game_log");
    };
  }, [socket]);

  return (
    <div className="game-log-container">
      <h3>Game Log</h3>
      <div className="game-log-messages">
        {logs.map((log, index) => (
          <div key={index} className="game-log-message">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameLog;
