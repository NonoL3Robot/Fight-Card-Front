import React from "react";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "../Card";
import ReactModal from "react-modal";

function Play(licences) {

    const rounds = 10;
    const statsList = ["statCourage", "statForce", "statIntelligence"];

    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    const [isModalOpen, setModalOpen] = useState(true);
    ReactModal.setAppElement('#root');

    const closeModal = () => {
        setModalOpen(false)
    }

    const openModal = () => {
        setModalOpen(true)
    }

    const [stat, setStat] = useState('');

    // TODO ajouter switch case pour mapper les stats
    const handleStat = (e, elem) => {
        e.preventDefault;
        setStat(elem);
        closeModal();
    }
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
            <br />
            {`Stat sélectionnée : ${stat}`}

            <ReactModal
                isOpen={isModalOpen}
                className="w-fit h-fit border p-10 mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50"
            >
                <p>Choisissez la stat : </p>
                {statsList.map(elem =>
                    <div
                        key={elem}
                        onClick={(e) => handleStat(e, elem)}
                    >
                        {elem}
                    </div>
                )}
            </ReactModal>
        </>
    )
}

export default Play;
