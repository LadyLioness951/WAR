/*----- constants -----*/
const suits = ["d", "s", "h", "c"];
const ranks = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K", "A"];
const faceValues = {J: 11, Q: 12, K: 13, A: 14};
const cards = 52;
const gameOver = false;
// const howToWin;
const masterDeck = buildMasterDeck();

/*----- app's state (variables) -----*/
let shuffledDeck;
let gameStatus;
let player1Hand;
let player2Hand;
let player1Deck;
let player2Deck;

/*----- cached element references -----*/
const msgEl = document.getElementById("msg");
const buttonEl = document.getElementById("replay");
const buttonEls = document.getElementById("start");
const player1El = document.getElementById("hand1");
const player2El = document.getElementById("hand2");
const score1El = document.querySelector("#player1 .score");
const score2El = document.querySelector("#player2 .score");
const deckHolder = document.getElementById("master-deck-holder");


/*----- event listeners -----*/
document.getElementById("replay").addEventListener("click", init);
document.getElementById("start").addEventListener("click", init);
document.getElementById("board").addEventListener("click", renderCardClick);

/*----- functions -----*/
function init() {
    gameStatus = null;
    shuffledDeck = getNewShuffledDeck();
    player1Deck = shuffledDeck.splice(0, 26);
    player2Deck = shuffledDeck;
    player1Hand = player1Deck.shift();
    player2Hand = player2Deck.shift();

    render();
}

function render() {
    player1El.innerHTML = `<div class="card ${player1Hand.face}"></div>`;
    player2El.innerHTML = `<div class="card ${player2Hand.face}"></div>`;
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

function buildMasterDeck() {
    const deck = [];
    // Use nested forEach to generate card objects
    suits.forEach(function(suit) {
      ranks.forEach(function(rank) {
        deck.push({
          // The 'face' property maps to the library's CSS classes for cards
          face: `${suit}${rank}`,
          value: Number(rank) || faceValues[rank]
        });
    });
  });
  return deck;
}

function battle() {
    if(!gameStatus) {
        player1Hand = player1Deck.shift();
        player2Hand = player2Deck.shift();
        player1El.innerHTML = showHand(player1Hand, 0);
        player2El.innerHTML = showHand(player2Hand, 0);
        howToWin(player1Hand, player2Hand);
        score1El.innerHTML = player1Deck.length;
        score2El.innerHTML = player2Deck.length;
    } else {
        gameStatus = "Game Over!"
    }
}

function howToWin(player1Hand, player2Hand) {
    if((player1Hand === cards) || (player2Hand === cards)) {
        gameOver = true;
    } if(player1Hand.ranks > player2Hand.ranks) {
        gameStatus = "Player 1 Wins!";
    } else if(player1Hand.ranks < player2Hand.ranks) {
        gameStatus = "Player 2 Wins!";
    } else {
        war();
        gameStatus = "Time for War!";
    }
}

function war() {
   if(player1Hand.value === player2Hand.value) {
       let pile1 = player1Deck.splice(0, 4); 
       let pile2 = player2Deck.splice(0, 4);
   }
}


function showHand() {

}

