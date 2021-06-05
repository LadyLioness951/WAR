/*----- constants -----*/
const suits = ["d", "s", "h", "c"];
const rants = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K", "A"];

const masterDeck = buildMasterDeck();
renderDeckInContainer(masterDeck, document.getElementById("master-deck-container"));
/*----- app's state (variables) -----*/
let shuffledDeck;

/*----- cached element references -----*/
const shuffledContainer = document.getElementById("shuffled-deck-container");

/*----- event listeners -----*/
document.querySelector("button").addEventListener(click, renderNewShuffledDeck);

/*----- functions -----*/
function init() {
    const player1Deck = newDeck.splice(0, 26);
    const player2Deck = newDeck;

    render();
}

function renderNewShuffledDeck() {
    shuffledDeck = getNewShuffledDeck();
    renderDeckInContainer(shuffledDeck, shuffledContainer);
}

function renderDeckInContainer(deck, container) {
    container.innerHTML = "";
    let cardsHtml = "";
    deck.forEach(function(card) {
        cardsHtml += `div class="card ${card.face}"></div>`;
    });
    container.innerHTML = cardsHtml;
}

function buildMasterDeck() {
    const deck = [];
    suits.forEach(function(suit) {
        ranks.forEach(function(rank) {
            deck.push({
                face: `${suit}#{rank}`,
                value: 
            });
        });
    });
    return deck;
}