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

    licences.forEach(licence => {
        licence.cartes.forEach(carte => deck.push(carte));
    });
    shuffleArray(deck);
    console.log(deck);

    /* Distribution aléatoire à partir de allCards ? */
    let [playerDeck, setPlayerDeck] = useState([]);
    let [compDeck, setCompDeck] = useState([]);

    return(
        <>
          
        </>
    )
}

export default Play