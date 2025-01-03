import Card from "./Card"

const OpponentHand = () => {
  return (
    <div className="opponent-hand">
      <Card card={'back'}/>
      <Card card={'back'}/>
    </div>
  );
};

export default OpponentHand;
