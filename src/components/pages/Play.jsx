import React from "react";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, CardComp } from "../Card";
import ReactModal from "react-modal";
import { Routes, useNavigate } from "react-router-dom";

function Play({ licences, scorePlayer, setScorePlayer, scoreComp, setScoreComp }) {
    const navigate = useNavigate();

    const rounds = 10;
    const statsList = ["statCourage", "statForce", "statIntelligence"];

    window.onbeforeunload = function () {
        window.setTimeout(function () {
            window.location = "/";
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
    ReactModal.setAppElement("#root");

    const closeModal = () => {
        setModalOpen(false);
    };

    const openModal = (cardAvailable) => {
        setModalOpen(true);
    };

    const [stat, setStat] = useState("");

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

    console.log("playerDeck", playerDeck);
    console.log("compDeck", compDeck);

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
        afterChange: (current) => setActiveSlide2(current)
    };

    const [oldSlide, setOldSlide] = useState(0);
    const [activeSlide, setActiveSlide] = useState(0);
    const [activeSlide2, setActiveSlide2] = useState(0);

    const removeCard = (playerCard, compCard) => {
        setPlayerDeck((prevCards) => prevCards.filter((elem) => elem !== playerCard));
        setCompDeck((prevCards) => prevCards.filter((elem) => elem !== compCard));
    };

    const fight = () => {
        if (playerDeck.length === 1) {
            end();
            return;
        }

        switch (stat) {
            case statsList[0]:
                playerDeck[activeSlide].statCourage > compDeck[activeSlide].statCourage &&
                    setScorePlayer(scorePlayer + 1);
                playerDeck[activeSlide].statCourage < compDeck[activeSlide].statCourage &&
                    setScoreComp(scoreComp + 1);
                break;
            case statsList[1]:
                playerDeck[activeSlide].statForce > compDeck[activeSlide].statForce &&
                    setScorePlayer(scorePlayer + 1);
                playerDeck[activeSlide].statForce < compDeck[activeSlide].statForce &&
                    setScoreComp(scoreComp + 1);
                break;
            case statsList[2]:
                playerDeck[activeSlide].statIntelligence > compDeck[activeSlide].statIntelligence &&
                    setScorePlayer(scorePlayer + 1);
                playerDeck[activeSlide].statIntelligence < compDeck[activeSlide].statIntelligence &&
                    setScoreComp(scoreComp + 1);
                break;
            default:
                break;
        }
        removeCard(playerDeck[activeSlide], compDeck[activeSlide]);
        determineStat(); // Appelle determineStat après le combat
    };

    const determineStat = () => {
        if (playerDeck.length % 2 === 0) {
            const randomStat = statsList[Math.floor(Math.random() * statsList.length)];
            setStat(randomStat);
        } else {
            openModal();
        }
    };

    const end = () => {
        navigate("/end");
    };

    return (
        <>

            <strong>{`Stat sélectionnée : ${stat}`}</strong>

            <ReactModal
                isOpen={isModalOpen}
                className="w-fit h-fit border p-10 mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50"
            >
                <p>Choisissez la stat : </p>
                {statsList.map((elem) => (
                    <div key={elem} onClick={(e) => handleStat(e, elem)}>
                        {elem}
                    </div>
                ))}
                <br />
                <a href="/">Menu Principal</a>
            </ReactModal>
            <br />

            <div className="slider-container">
                <h2>beforeChange and afterChange hooks</h2>
                <p>
                    BeforeChange {"=>"} oldSlide: <strong>{oldSlide}</strong>
                </p>
                <p>
                    BeforeChange {"=>"} activeSlide: <strong>{activeSlide}</strong>
                </p>
                <p>
                    AfterChange {"=>"} activeSlide: <strong>{activeSlide2}</strong>
                </p>

                <div>
                    <h2>Computer Deck</h2>
                    {`ScoreComp : ${scoreComp}`}
                    <Slider infinite={false}>
                        {compDeck.map((card) => (
                            <div key={card.id}>
                                <div>
                                    <Card card={card} />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                <div>
                    <h2>Player Deck</h2>
                    {`ScorePlayer : ${scorePlayer}`}
                    <Slider {...settings}>
                        {playerDeck.map((card) => (
                            <div key={card.id}>
                                <Card card={card} />
                            </div>
                        ))}
                    </Slider>
                </div>

                <div className="btn" onClick={fight}>
                    FIGHT
                </div>
            </div>
        </>
    );
}

export default Play;
