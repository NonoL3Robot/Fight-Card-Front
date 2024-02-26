import { useState } from "react";
import { Card } from "../Card";

function Play(licences) {

    const rounds = 10;

    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
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
        </>
    )
}

export default Play