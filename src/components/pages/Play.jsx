import { useState } from "react";
import { Card } from "../Card";
import ReactModal from "react-modal";

function Play(licences) {

    const rounds = 10;
    const statsList = ["Courage", "Intelligence", "Force"];

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

    const handleStat = (e, elem) => {
        e.preventDefault;
        setStat(elem);
        closeModal();
    }

    let deck = [];

    // TODO chercher erreur imbrication
    licences.licences.forEach(licence => {
        licence.cartes.forEach(carte => deck.push(carte));
    });
    shuffleArray(deck);
    console.log(deck);

    /* Distribution aléatoire à partir de allCards ? */
    let [playerDeck, setPlayerDeck] = useState(deck.slice(0, 10));
    let [compDeck, setCompDeck] = useState(deck.slice(10, 20));

    console.log("playerDeck", playerDeck);
    console.log("compDeck", compDeck);

    return (
        <>
        {playerDeck.map(card =>
            <div
                key={card.id}
            >
                <Card card={card} />
            </div>
        )}
        <br/>
        {compDeck.map(card =>
            <div
                key={card.id}
            >
                <Card card={card} />
            </div>
        )}
        <br/>
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

export default Play