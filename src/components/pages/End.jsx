import { useNavigate } from 'react-router-dom';

export const End = ({ scorePlayer, scoreComp }) => {
  const navigate = useNavigate();
  const redirect = () => {
    navigate('/');
  };

  return (
    <>
      <div>
        {scorePlayer > scoreComp && `Victoire ${scorePlayer} à ${scoreComp}`}
        {scorePlayer < scoreComp && `Défaite ${scorePlayer} à ${scoreComp}`}
        {scorePlayer === scoreComp && `Egalité ${scorePlayer} à ${scoreComp}`}
      </div>
      <div className="btn" onClick={redirect}>
        Réessayer
      </div>
    </>
  );
};
