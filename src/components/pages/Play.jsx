import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card, CardComp } from '../Card';
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';

export const Play = ({
  licences,
  scorePlayer,
  setScorePlayer,
  scoreComp,
  setScoreComp,
}) => {
  const navigate = useNavigate();

  const statsList = ['statCourage', 'statForce', 'statIntelligence'];

  const statsEmoji = ['🗡️', '🥊', '🧠'];

  window.onbeforeunload = function () {
    window.setTimeout(function () {
      window.location = '/';
    }, 0);
    window.onbeforeunload = null;
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  const [isModalOpen, setModalOpen] = useState(true);
  ReactModal.setAppElement('#root');

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const [stat, setStat] = useState('');

  const handleStat = (e, elem) => {
    e.preventDefault();
    setStat(elem);
    closeModal();
  };

  let deck = [];

  licences.forEach((licence) => {
    licence.cartes.forEach((carte) => deck.push(carte));
  });
  shuffleArray(deck);
  console.log(deck);

  let [playerDeck, setPlayerDeck] = useState(deck.slice(0, 10));
  let [compDeck, setCompDeck] = useState(deck.slice(10, 20));

  console.log('playerDeck', playerDeck);
  console.log('compDeck', compDeck);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => {
      setOldSlide(current);
      setActiveSlide(next);
    },
  };

  // eslint-disable-next-line no-unused-vars
  const [oldSlide, setOldSlide] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  const removeCard = (playerCard, compCard) => {
    setPlayerDeck((prevCards) =>
      prevCards.filter((elem) => elem !== playerCard),
    );
    setCompDeck((prevCards) => prevCards.filter((elem) => elem !== compCard));
  };

  const fight = () => {
    if (playerDeck.length === 1) {
      end();
      return;
    }

    switch (stat) {
      case statsList[0]:
        playerDeck[activeSlide].statCourage >
          compDeck[activeSlide].statCourage && setScorePlayer(scorePlayer + 1);
        playerDeck[activeSlide].statCourage <
          compDeck[activeSlide].statCourage && setScoreComp(scoreComp + 1);
        break;
      case statsList[1]:
        playerDeck[activeSlide].statForce > compDeck[activeSlide].statForce &&
          setScorePlayer(scorePlayer + 1);
        playerDeck[activeSlide].statForce < compDeck[activeSlide].statForce &&
          setScoreComp(scoreComp + 1);
        break;
      case statsList[2]:
        playerDeck[activeSlide].statIntelligence >
          compDeck[activeSlide].statIntelligence &&
          setScorePlayer(scorePlayer + 1);
        playerDeck[activeSlide].statIntelligence <
          compDeck[activeSlide].statIntelligence && setScoreComp(scoreComp + 1);
        break;
      default:
        break;
    }
    removeCard(playerDeck[activeSlide], compDeck[activeSlide]);
    determineStat(); // Appelle determineStat après le combat
  };

  const determineStat = () => {
    if (playerDeck.length % 2 === 0) {
      const randomStat =
        statsList[Math.floor(Math.random() * statsList.length)];
      setStat(randomStat);
    } else {
      openModal();
    }
  };

  const end = () => {
    navigate('/end');
  };

  return (
    <>
      <div>
        <strong>{`Stat sélectionnée : ${stat.split('stat')[1]}`}</strong>

        <ReactModal
          isOpen={isModalOpen}
          className="w-fit h-fit border p-10 mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50"
        >
          <p>Choisissez la stat : </p>
          <br />
          {statsList.map((stat, index) => (
            <div key={stat} onClick={(e) => handleStat(e, stat)}>
              {statsEmoji[index]}
              {stat.split('stat')}
            </div>
          ))}
          <br />
          <a href="/">Menu Principal</a>
        </ReactModal>
        <br />

        <div className="slider-container">
          <h2>Computer Deck</h2>
          {`ScoreComp : ${scoreComp}`}
          <Slider infinite={false} slidesToShow={10} arrows={false}>
            {compDeck.map((card) => (
              <div key={card.id}>
                <div>
                  <CardComp />
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="slider-container">
          <h2>Player Deck</h2>
          {`ScorePlayer : ${scorePlayer}`}
          <Slider {...settings}>
            {playerDeck.map((card) => (
              <div key={card.id}>
                <Card
                  card={card}
                  licenceName={
                    licences.find((l) => l.id === card.licenceId).name
                  }
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="btnFight" onClick={fight}>
          FIGHT
        </div>
      </div>
    </>
  );
};
