import React from "react";
import "../styles/Card.css";

const Card = ({ suit, value }) => {
  return (
    <div className="card">
      <img src={`/assets/cards/${value}_of_${suit}.svg`} alt={`${value} of ${suit}`} />
    </div>
  );
};

export default Card;
