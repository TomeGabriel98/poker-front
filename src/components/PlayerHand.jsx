import Card from "./Card"

const PlayerHand = ({ players, currentPlayerId }) => {
  const player = players.find((p) => p.id === currentPlayerId);  

  return (
    <div className="player-hand">
      {player?.hand?.map((card, index) => (
        <Card key={index} card={card.identifier}/>
      ))}
    </div>
  );
};

export default PlayerHand;
