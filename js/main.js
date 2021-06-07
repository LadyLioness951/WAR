/*----- constants -----*/
const suits = ["d", "s", "h", "c"];
const ranks = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K", "A"];
const faceValues = {J: 11, Q: 12, K: 13, A: 14};
const howToWin;
const masterDeck = buildMasterDeck();

/*----- app's state (variables) -----*/
let shuffledDeck;
let gameStatus;
let cards;
let playerHand;
let computerHand;

/*----- cached element references -----*/
const msgEl = document.getElementById("msg");
const buttonEl = document.getElementById("replay");
const buttonEls = document.getElementById("start");
const player1El = document.querySelector("#player1 .hand");
const player2El = document.querySelector("#player2 .hand");
const score1El = document.querySelector("#player1 .score");
const score2El = document.querySelector("#player2 .score");


/*----- event listeners -----*/
document.getElementById("replay").addEventListener(click, renderNewShuffledDeck);
document.getElementById("start").addEventListener(click, renderNewShuffledDeck);
document.getElementById("board").addEventListener(click, renderCardClick);

/*----- functions -----*/
function init() {
    gameStatus = null;
    const player1Deck = newDeck.splice(0, 26);
    const player2Deck = newDeck;

    render();
}

function render() {
    buttonEl.style.visibility = gameStatus ? "hidden" : "visible";
    buttonEls.style.visibility = gameStatus ? "visible" : "hidden";

    renderMessage();
    renderCardClick();
}

function renderCardClick(){

}

function renderMessage() {
    if(gameStatus === "lose") {
        msgEl.innerText = "You Lose!";
    } else if(gameStatus === "win") {
        msgEl.innerText = "WINNER!";
    } else {
        msgEl.innerText = "Good Luck!";
    }
}

function getNewShuffledDeck() {
    const tempDeck = [...masterDeck];
    const newShuffledDeck = [];
    while (tempDeck.length) {
      const rndIdx = Math.floor(Math.random() * tempDeck.length);
      newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
    }
    return newShuffledDeck;
  }

function renderNewShuffledDeck() {
    shuffledDeck = getNewShuffledDeck();
}

function buildMasterDeck() {
    const deck = [];
    // Use nested forEach to generate card objects
    suits.forEach(function(suit) {
      ranks.forEach(function(rank) {
        deck.push({
          // The 'face' property maps to the library's CSS classes for cards
          face: `${suit}${rank}`,
          value: []
        });
    });
  });
  return deck;
}

renderNewShuffledDeck();

function battle() {
    if(!gameOver) {
        let playerHand = players[0].pop;
        let computerHand = players[1].pop;
        let pile = [playerHand, computerHand];
        player1El.innerHTML = showHand(playerHand, 0);
        player2El.innerHTML = showHand(computerHand, 0);
        checkWinner(playerHand, computerHand, pile);
        score1El.innerHTML = players[0].length;
        score2El.innerHTML = players[1].length;
    } else {
        msgEl === "Game Over!"
    }
}

function howToWin() {

}