import React, { useState, useEffect } from "react";
import "../styles/GameBoard.css";

import { createConsumer } from "@rails/actioncable";
import { start, action, leaveRoom } from "../services/api";
import WinnerModal from "./WinnerModal";
import InputModal from "./InputModal";
import PokerTable from "./PokerTable";
import PlayerHand from "./PlayerHand";
import OpponentHand from "./OpponentHand";

const GameBoard = ({ roomId, playerId, onCloseGame }) => {
  const [activeGame, setActiveGame] = useState(false);
  const [players, setPlayers] = useState([]);
  const [currentPlayerId, setCurrentPlayerId] = useState(0);
  const [currentPlayerTurn, setCurrentPlayerTurn] = useState(0);
  const [pot, setPot] = useState(0);
  const [communityCards, setCommunityCards] = useState([]);
  const [winner, setWinner] = useState('');
  const [hand, setHand] = useState('');
  const [amount, setAmount] = useState(0);
  const [insertAmountModal, setInsertAmountModal] = useState(false);

  const closeModal = () => {
    setWinner('');
    setHand('');
    removeAllPlayersFromRoom();
    onCloseGame();
  };
  const openAmountModal = () => setInsertAmountModal(true);
	const closeAmountModal = () => setInsertAmountModal(false);
  const isPlayerTurn = () => currentPlayerId === currentPlayerTurn;

  useEffect(() => {
    setCurrentPlayerId(parseInt(playerId));
    const cable = createConsumer('ws://localhost:3000/cable');
    const subscription = cable.subscriptions.create({ channel: 'RoomChannel', room_id: roomId }, {
      received: (data) => {
        switch (data.type) {
          case 'updatePlayers':
            setPlayers(data.players);
            break;
          case 'gameStarted':
            setActiveGame(true);
            setPlayers(data.players);
            setCurrentPlayerTurn(data.current_turn);
            break;
          case 'playerAction':
            setPot(data.pot);
            setPlayers(data.players);
            setCurrentPlayerTurn(data.current_turn);
            break;
          case 'phaseChanged':
            setCommunityCards(data.community_cards);
            setCurrentPlayerTurn(data.current_turn);
            break;
          case 'showdown':
            setWinner(data.winner);
            setHand(data.hand);
            setActiveGame(false);
            setPot(0);
            setCommunityCards([])
            break;
          default:
            console.error('Unknown data type:', data);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [roomId]);

  const startGame = () => {
    start(roomId);
  }

  const raiseBet = () => {
    action(roomId, currentPlayerId, "raise", parseInt(amount));

    closeAmountModal()
  }

  const callBet = () => {
    action(roomId, currentPlayerId, "call", parseInt(amount));
  }

  const foldHand = () => {
    action(roomId, currentPlayerId, "fold", parseInt(amount));
  }

  const removeAllPlayersFromRoom = () => {
    players.map((player) => {
      leaveRoom(roomId, player.id)
    })
  }

  return (
    <div className="poker-table">
      <WinnerModal
        winningPlayer={winner}
        winningHand={hand}
        onClose={closeModal}
      />

      <div className="top-menu">
        <button className="menu-button">Leaderboard</button>
      </div>

      <div className="table">
        <PokerTable pot={pot} communityCards={communityCards}/>

        {activeGame &&
          <PlayerHand players={players} currentPlayerId={currentPlayerId}/>
        }

        {activeGame &&
          <OpponentHand />
        }
      </div>

      {activeGame ? (
        <div className="footer">
          <button className="footer-button raise" onClick={openAmountModal} disabled={!isPlayerTurn}>RAISE TO</button>
          <button className="footer-button call" onClick={callBet} disabled={!isPlayerTurn}>CALL</button>
          <button className="footer-button fold" onClick={foldHand} disabled={!isPlayerTurn}>FOLD</button>
        </div>
      ) : (
        <div className="footer">
          <button className="footer-button start" onClick={startGame}>Start Game</button>
         </div>
      )}

      <InputModal 
        isOpen={insertAmountModal}
        title="Enter the amount to bet"
        onClose={closeAmountModal}
        onConfirm={raiseBet}
       >
         <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </InputModal>
    </div>
  );
};

export default GameBoard;
