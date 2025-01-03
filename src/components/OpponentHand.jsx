import Card from "./Card"
import "../styles/OpponentHand.css"

const OpponentHand = () => {
  return (
    <div className="opponent-hand">
      <Card card={'back'}/>
      <Card card={'back'}/>
    </div>
  );
};

export default OpponentHand;
