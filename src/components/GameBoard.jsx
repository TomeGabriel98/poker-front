import React from "react";
import io from "socket.io-client";
import "../styles/GameBoard.css";

// Exemplo de estrutura básica para o SVG das cartas
import Card from "./Card"; // Componente para exibir uma carta específica
import Chat from "./Chat"; // Componente para o chat
import GameLog from "./GameLog"; // Componente para o log do jogo

const socket = io("http://localhost:3000");

const GameBoard = () => {
  return (
    <div className="poker-table">
      {/* Top menu */}
      <div className="top-menu">
        <button className="menu-button">Feedback</button>
        <button className="menu-button">Leaderboard</button>
        <button className="menu-button">Hand Rankings</button>
      </div>

      <div className="table">
        {/* Center area: Cards and Pot */}
        <div className="table-center">
          <div className="ablablue">
            <div className="pot-display">Pot: $2.00</div>
            <div className="table-cards">
              {/* Exemplo de cartas na mesa */}
              <Card suit="spades" value="6" />
              <Card suit="hearts" value="9" />
              <Card suit="hearts" value="Q" />
              <div className="empty-card" />
              <div className="empty-card" />
            </div>
          </div>
        </div>
      </div>

      {/*
      <div className="player-area">
        <div className="player-hand">
          <Card suit="hearts" value="3" />
          <Card suit="diamonds" value="4" />
        </div>
        <div className="player-info">
          <p>Your Turn</p>
          <p>$90.00 / High Card</p>
        </div>
      </div>

      <div className="opponent-area">
        <div className="opponent-hand">
          <div className="card-back" />
          <div className="card-back" />
        </div>
        <div className="opponent-info">
          <p>Friend</p>
          <p>$90.00</p>
        </div>
      </div>

      <div className="game-interactions">
        <Chat socket={socket} />
        <GameLog socket={socket} />
      </div>

      <div className="player-actions">
        <button className="action-button">Check</button>
        <button className="action-button">Bet</button>
        <button className="action-button">Fold</button>
      </div> */}
    </div>
  );
};

export default GameBoard;
