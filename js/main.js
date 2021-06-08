/*----- constants -----*/
const suits = ["d", "s", "h", "c"];
const ranks = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K", "A"];
const faceValues = {J: 11, Q: 12, K: 13, A: 14};
const masterDeck = buildMasterDeck();

/*----- app's state (variables) -----*/
let gameStatus;
let player1Hand;
let player2Hand;
let player1Deck;
let player2Deck;

/*----- cached element references -----*/
const msgEl = document.getElementById("msg");
const battleBtn = document.getElementById("battle");
const deck1countEl = document.getElementById("deck1-count")
const deck2countEl = document.getElementById("deck2-count")
const deck1El = document.getElementById("deck1")
const deck2El = document.getElementById("deck2")
const hand1countEl = document.getElementById("hand1-count")
const hand2countEl = document.getElementById("hand2-count")
const hand1El = document.getElementById("hand1");
const hand2El = document.getElementById("hand2");


/*----- event listeners -----*/
battleBtn.addEventListener("click", handleBattle);

/*----- functions -----*/
function init() {
    gameStatus = null;
    let shuffledDeck = getNewShuffledDeck();
    player1Deck = shuffledDeck.splice(0, 26);
    player2Deck = shuffledDeck;
    player1Hand = [];
    player2Hand = [];
    render();
}

function render() {
    hand1countEl.innerHTML = player1Hand.length ? `<div class="card ${player1Hand[0].face}"></div>` : "";
    hand2countEl.innerHTML = player2Hand.length ? `<div class="card ${player2Hand[0].face}"></div>` : "";
    buttonEl.style.visibility = gameStatus ? "hidden" : "visible";
    buttonEls.style.visibility = gameStatus ? "visible" : "hidden";

    renderMessage();
    renderCardClick();
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

function handleBattle() {
    if(!gameStatus) {
        player1Hand = player1Deck.shift();
        player2Hand = player2Deck.shift();
        player1El.innerHTML = showHand(player1Hand, 0);
        player2El.innerHTML = showHand(player2Hand, 0);
        howToWin();
        score1El.innerHTML = player1Deck.length;
        score2El.innerHTML = player2Deck.length;
    } else {
        gameStatus = "Game Over!"
    }
}

function howToWin() {
    if(player1Hand.ranks > player2Hand.ranks) {
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
   return war;
}

function showHand() {

}

