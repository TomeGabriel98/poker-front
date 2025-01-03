import Card from "./Card"

const PokerTable = ({ pot, communityCards }) => {
  return (
    <div className="table-center">
      <div className="pot-display">Pot: R${pot}</div>
      <div className="table-cards">
        <Card card={communityCards.at(0)?.identifier || null} />
        <Card card={communityCards.at(1)?.identifier || null} />
        <Card card={communityCards.at(2)?.identifier || null} />
        <Card card={communityCards.at(3)?.identifier || null}/>
        <Card card={communityCards.at(4)?.identifier || null}/>
      </div>
    </div>
  );
};

export default PokerTable;
