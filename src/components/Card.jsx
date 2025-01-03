import React from "react";
import "../styles/Card.css";

const Card = ({ card }) => {
  return (
    <div className={`card ${!card ? "empty" : ""}`}>
      {card? (
        <img src={`/assets/cards/${card}.svg`} alt={`${card} svg`} />
      ) : (
        <span />
      )}
    </div>
  );
};

export default Card;
