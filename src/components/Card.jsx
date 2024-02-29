export const Card = ({ card }) => {
  return (
    <>
      <div className="card-container m-5">
        <div>Nom: {card.name}</div>
        <div>Description: {card.description}</div>
        <div>Courage: {card.statCourage}</div>
        <div>Force: {card.statForce}</div>
        <div>Intelligence: {card.statIntelligence}</div>
      </div>
    </>
  );
};

export const CardComp = () => {
  return (
    <>
      <div className="card-container m-5">
        <div>
          <img src="src/images/lorcana.jpg" alt="dos de carte" />
        </div>
      </div>
    </>
  );
};
