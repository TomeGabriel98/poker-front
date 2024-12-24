import React, { useEffect, useState } from "react";
import consumer from "../../services/cable";

const GameBoard = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [betAmount, setBetAmount] = useState("");

  useEffect(() => {
    const subscription = consumer.subscriptions.create(
      { channel: "GameChannel", room_id: roomId },
      {
        received: (data) => {
          setMessages((prev) => [...prev, data]);
        },
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [roomId]);

  const handleBet = () => {
    consumer.subscriptions.subscriptions[0].send({
      action: "bet",
      amount: betAmount,
    });
    setBetAmount("");
  };

  return (
    <div>
      <h2>Game Room: {roomId}</h2>
      <div>
        <h3>Messages</h3>
        <ul>
          {messages.map((msg, idx) => (
            <li key={idx}>{JSON.stringify(msg)}</li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          placeholder="Bet amount"
        />
        <button onClick={handleBet}>Bet</button>
      </div>
    </div>
  );
};

export default GameBoard;
