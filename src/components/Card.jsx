export const Card = ({card}) => {
    return (
      <>
      <div className="card-container">
      <div className="flex flex-col items-stretch py-12"></div>
        <td>Nom: {card.name}</td>
        <td>Description: {card.description}</td>
        <td>Courage: {card.statCourage}</td>
        <td>Force: {card.statForce}</td>
        <td>Intelligence: {card.statIntelligence}</td>
      </div>
      </>
    );
}
