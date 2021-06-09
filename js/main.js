/*----- constants -----*/
const suits = ["d", "s", "h", "c"];
const ranks = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K", "A"];
const faceValues = {J: 11, Q: 12, K: 13, A: 14};
const masterDeck = buildMasterDeck();
const status = {
    readyToBattle: 0, 
    gameOver: 1,
    battleDone: 2,
    goToWar: 3,
    warDone: 4,
    notEnoughCards: 5
};

/*----- app's state (variables) -----*/
let gameStatus;
let winner;
let player1Hand;
let player2Hand;
let player1Deck;
let player2Deck;

/*----- cached element references -----*/
const msgEl = document.getElementById("msg");
const battleBtn = document.getElementById("battle");
const replayBtn = document.getElementById("replay");
const readyBtn = document.getElementById("ready");
const warBtn = document.getElementById("war");
const deck1countEl = document.getElementById("deck1-count");
const deck2countEl = document.getElementById("deck2-count");
const deck1El = document.getElementById("deck1");
const deck2El = document.getElementById("deck2");
const hand1countEl = document.getElementById("hand1-count");
const hand2countEl = document.getElementById("hand2-count");
const hand1El = document.getElementById("hand1");
const hand2El = document.getElementById("hand2");
const bgInkWell = document.getElementById("bg-inkwell");
const bgAllyWay = document.getElementById("bg-allyway");
const bgStareDown = document.getElementById("bg-staredown");
const bgNoFace = document.getElementById("bg-noface");
const iwCheckbox = document.getElementById("iw")
const awCheckbox = document.getElementById("aw")
const sdCheckbox = document.getElementById("sd")
const nfCheckbox = document.getElementById("nf")


/*----- event listeners -----*/
battleBtn.addEventListener("click", handleBattle);
replayBtn.addEventListener("click", init);
readyBtn.addEventListener("click", handleReady);
warBtn.addEventListener("click", handleWar);
iwCheckbox.addEventListener("change", handleBgMusicIwChange);
awCheckbox.addEventListener("change", handleBgMusicAwChange);
sdCheckbox.addEventListener("change", handleBgMusicSdChange);
nfCheckbox.addEventListener("change", handleBgMusicNfChange);

/*----- functions -----*/
init();

function init() {
    gameStatus = status.readyToBattle;
    let shuffledDeck = getNewShuffledDeck();
    player1Deck = shuffledDeck.splice(0, 26);
    player2Deck = shuffledDeck;
    player1Hand = [];
    player2Hand = [];
    render();
}

function render() {
    if (player1Hand.length > 1) {
        let template1 = "";
        player1Hand.forEach(card => {
            template1 += `<div class="card ${card.face}"></div>`;
        })
        hand1El.innerHTML = template1
    } else {
        hand1El.innerHTML = player1Hand.length ? `<div class="card ${player1Hand[0].face}"></div>` : "";
    }

    if (player2Hand.length > 1) {
        let template2 = "";
        player2Hand.forEach(card => {
            template2 += `<div class="card ${card.face}"></div>`;
        })
        hand2El.innerHTML = template2
    } else {
        hand2El.innerHTML = player2Hand.length ? `<div class="card ${player2Hand[0].face}"></div>` : "";
    }

    deck1El.innerHTML = player1Deck.length ? '<div class="card back"></div>' : "";
    deck2El.innerHTML = player2Deck.length ? '<div class="card back"></div>' : "";
    deck1countEl.textContent = `Cards: ${player1Deck.length}`; 
    deck2countEl.textContent = `Cards: ${player2Deck.length}`; 
    hand1countEl.textContent = `Pile: ${player1Hand.length}`; 
    hand2countEl.textContent = `Pile: ${player2Hand.length}`; 
    renderMessage();
    renderButtons();
}

function renderButtons() {
    readyBtn.style.display = gameStatus === status.battleDone || gameStatus === status.warDone ? "inline-block" : "none";
    replayBtn.style.display = gameStatus === status.gameOver || gameStatus === status.notEnoughCards ? "inline-block" : "none";
    battleBtn.style.display = gameStatus === status.readyToBattle ? "inline-block" : "none";
    warBtn.style.display = gameStatus === status.goToWar ? "inline-block" : "none";

}

function renderMessage() {
    if (gameStatus === status.battleDone) {
        msgEl.innerText = `Player ${winner} Wins!`;
    } else if (gameStatus === status.gameOver) {
        msgEl.innerText = `Player ${winner} Wins the Game!`;
    } else if (gameStatus === status.readyToBattle) {
        msgEl.innerText = "Ready to Battle";
    } else if (gameStatus === status.goToWar) {
        msgEl.innerText = "Going to WAR!";
    } else if (gameStatus === status.notEnoughCards) {
        msgEl.innerText = `Not Enought Cards - Player ${winner} Wins!`;
    } else {
        msgEl.innerText = `Player ${winner} Wins the WAR!`;
    }
}

function handleBattle() {
    player1Hand.unshift(player1Deck.shift());
    player2Hand.unshift(player2Deck.shift());  
    if (player1Hand[0].value === player2Hand[0].value) {
        gameStatus = status.goToWar;
    } else {
        gameStatus = status.battleDone;
        winner = player1Hand[0].value > player2Hand[0].value ? 1 : 2;
    }
    render();
}

function handleReady() {
    const winningDeck = winner === 1 ? player1Deck : player2Deck;
    winningDeck.push(...player1Hand);
    winningDeck.push(...player2Hand);
    player1Hand = [];
    player2Hand = [];
    if (player1Deck.length === 52 || player2Deck.length === 52) {
        gameStatus = status.gameOver;
    } else {
        gameStatus = status.readyToBattle;
    }
    render();
}

function handleWar() {
    if (player1Deck.length < 4) {
        gameStatus = status.notEnoughCards;
        winner = 2;
    } else if (player2Deck.length < 4) {
        gameStatus = status.notEnoughCards;
        winner = 1;
    } else {
        player1Hand.unshift(...player1Deck.splice(0, 4));
        player2Hand.unshift(...player2Deck.splice(0, 4));
        if (player1Hand[0].value === player2Hand[0].value) {
            gameStatus = status.goToWar;
        } else {
            gameStatus = status.warDone;
            winner = player1Hand[0].value > player2Hand[0].value ? 1 : 2;
        }
    }
    render();
}

function handleBgMusicIwChange() {
    iwCheckbox.checked ? bgInkWell.play() : bgInkWell.pause();
}

function handleBgMusicAwChange() {
    awCheckbox.checked ? bgAllyWay.play() : bgAllyWay.pause();
}

function handleBgMusicSdChange() {
    sdCheckbox.checked ? bgStareDown.play() : bgStareDown.pause();
}

function handleBgMusicNfChange() {
    nfCheckbox.checked ? bgNoFace.play() : bgNoFace.pause();
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

