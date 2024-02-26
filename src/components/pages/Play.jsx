import React from "react";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Card } from "../Card";

function Play(licences) {
  const rounds = 10;

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  let deck = [];

  licences.licences.forEach((licence) => {
    licence.cartes.forEach((carte) => deck.push(carte));
  });
  shuffleArray(deck);
  console.log(deck);

  /* Distribution aléatoire à partir de allCards ? */
  let [playerDeck, setPlayerDeck] = useState(deck.slice(0, 10));
  let [compDeck, setCompDeck] = useState(deck.slice(10, 20));

  console.log("playerDeck", playerDeck);
  console.log("compDeck", compDeck);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div>
        <h2>Player Deck</h2>
        <Slider {...settings}>
          {playerDeck.map((card) => (
            <div key={card.id}>
              <Card card={card} />
            </div>
          ))}
        </Slider>
      </div>
      <br />
      <div>
        <h2>Computer Deck</h2>
        <Slider {...settings}>
          {compDeck.map((card) => (
            <div key={card.id}>
              <Card card={card} />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default Play;
