import React, { useState, useEffect } from "react";
import "../styles/Chat.css";

const Chat = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Escutar mensagens do WebSocket
    socket.on("chat_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("chat_message");
    };
  }, [socket]);

  const sendMessage = () => {
    if (input.trim() !== "") {
      socket.emit("chat_message", input);
      setInput("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            {msg}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
