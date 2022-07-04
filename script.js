let blackjackGame = {
  // a key called "you" to give access to the score
  you: {
    scoreSpan: "#your-blackjack-result",
    div: "#your-box",
    boxSize: ".flex-blackjack-row-2 div",
    score: 0,
  },

  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    boxSize: ".flex-blackjack-row-2 div",
    score: 0,
  },

  cards: [
    "2-C",
    "2-D",
    "2-H",
    "2-S",
    "3-C",
    "3-D",
    "3-H",
    "3-S",
    "4-C",
    "4-D",
    "4-H",
    "4-S",
    "5-C",
    "5-D",
    "5-H",
    "5-S",
    "6-C",
    "6-D",
    "6-H",
    "6-S",
    "7-C",
    "7-D",
    "7-H",
    "7-S",
    "8-C",
    "8-D",
    "8-H",
    "8-S",
    "9-C",
    "9-D",
    "9-H",
    "9-S",
    "10-C",
    "10-D",
    "10-H",
    "10-S",
    "K-C",
    "K-D",
    "K-H",
    "K-S",
    "Q-C",
    "Q-D",
    "Q-H",
    "Q-S",
    "J-C",
    "J-D",
    "J-H",
    "J-S",
    "A-C",
    "A-D",
    "A-H",
    "A-S",
  ],

  cardsMap: {
    "2-C": 2,
    "2-D": 2,
    "2-H": 2,
    "2-S": 2,
    "3-C": 3,
    "3-D": 3,
    "3-H": 3,
    "3-S": 3,
    "4-C": 4,
    "4-D": 4,
    "4-H": 4,
    "4-S": 4,
    "5-C": 5,
    "5-D": 5,
    "5-H": 5,
    "5-S": 5,
    "6-C": 6,
    "6-D": 6,
    "6-H": 6,
    "6-S": 6,
    "7-C": 7,
    "7-D": 7,
    "7-H": 7,
    "7-S": 7,
    "8-C": 8,
    "8-D": 8,
    "8-H": 8,
    "8-S": 8,
    "9-C": 9,
    "9-D": 9,
    "9-H": 9,
    "9-S": 9,
    "10-C": 10,
    "10-D": 10,
    "10-H": 10,
    "10-S": 10,
    "K-C": 10,
    "K-D": 10,
    "K-H": 10,
    "K-S": 10,
    "Q-C": 10,
    "Q-D": 10,
    "Q-H": 10,
    "Q-S": 10,
    "J-C": 10,
    "J-D": 10,
    "J-H": 10,
    "J-S": 10,
    "A-C": [1, 11],
    "A-D": [1, 11],
    "A-H": [1, 11],
    "A-S": [1, 11],
  },

  wins: 0,
  losses: 0,
  draws: 0,
  //checking if person press button; stand
  isStand: false,
  //checking if pc finish with his cards
  isTurnsOver: false,
  //when pc is playing, prevent user to press
  pressOnce: false,
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];
const hitSound = new Audio("sounds/deal.mp3");
const winSound = new Audio("sounds/cash.mp3");
const loseSound = new Audio("sounds/aww.mp3");

//letting card resolution be adjustable to ipad or laptop reso
let windowWidth = window.screen.width;
let windowHeight = window.screen.height;
let winner;

//eventlistener to 'listen' to button clicks; trigger blackjack hit/stand/deal/restart fn to render cards/Button event
document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackjackHit);
document
  .querySelector("#blackjack-stand-button")
  .addEventListener("click", blackjackStand);
document
  .querySelector("#blackjack-deal-button")
  .addEventListener("click", blackjackDeal);
document
  .querySelector("#blackjack-restart-button")
  .addEventListener("click", blackjackRestart);

// test to see if someone press stand button
function blackjackHit() {
  if (blackjackGame["isStand"] === false) {
    // if false, get random card
    let card = randomCard();
    console.log(card);
    //take card and active player,
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
  }
}

// function to get random card. Variable inside the function random index will store result of computation
function randomCard() {
  let randomIndex = Math.floor(Math.random() * 52);
  //pointer in the array of cards, access dictionary blackjackGame, cards, access given card, final result is returned and store in card variable that we create earlier
  return blackjackGame["cards"][randomIndex];
}

// whether its active player or dealer it shows cards
function showCard(card, activePlayer) {
  // if score less than or equals to 21
  if (activePlayer["score"] <= 21) {
    //display cards, creating image element in "your box" of flex-blackjack-row-2
    let cardImage = document.createElement("img");
    // will go to images look for number and render image; $: string interpolation: dynamic not static
    cardImage.src = `images/${card}.png`;
    // return width depending on screen size
    cardImage.style = `width: ${widthSize()}; height: ${heightSize()};`;
    // append image to box. use querySelector to select active player's box and add image element
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
}

//rescaling width
function widthSize() {
  if (windowWidth > 1000) {
    let newWidthSize = window.screen.width * 0.1;
    return newWidthSize;
  } else {
    return screen.width * 0.18;
  }
}

//rescaling height
function heightSize() {
  if (windowHeight > 700) {
    let newHeightSize = window.screen.height * 0.18;
    return newHeightSize;
  } else {
    return screen.height * 0.15;
  }
}

//function updateScore
function updateScore(card, activePlayer) {
  // for the two cases of Ace = 1 and 11
  if (card === "A-S" || card === "A-C" || card === "A-H" || card === "A-D") {
    // taking value of ace as 11
    if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21) {
      // adding and returning result
      activePlayer["score"] += blackjackGame["cardsMap"][card][1];
    } else {
      // will take value of ace as 1
      activePlayer["score"] += blackjackGame["cardsMap"][card][0];
    }
  } else {
    activePlayer["score"] += blackjackGame["cardsMap"][card];
  }
  console.log(activePlayer["score"]);
}

//function showScore(activePLayer)
function showScore(activePLayer) {
  if (activePLayer["score"] > 21) {
    document.querySelector(activePLayer["scoreSpan"]).textContent = "BUST!";
    document.querySelector(activePLayer["scoreSpan"]).style.color = "pink";
  } else {
    document.querySelector(activePLayer["scoreSpan"]).textContent =
      activePLayer["score"];
  }
}

function blackjackStand() {
  // property in dict created earlier
  if (blackjackGame.pressOnce === false) {
    blackjackGame["isStand"] = true;
    // get same amount of cards both for dealer and user to simplify process
    let yourImages = document
      .querySelector("#your-box")
      .querySelectorAll("img");

    for (let i = 0; i < yourImages.length; i++) {
      let card = randomCard();
      showCard(card, DEALER);
      updateScore(card, DEALER);
      showScore(DEALER);
      //property of blackgame; dealer's turn is over
      blackjackGame["isTurnsOver"] = true;
    }
  }
  blackjackGame.pressOnce = true;

  computeWinner();
  showWinner(winner);
}

function computeWinner() {
  if (YOU["score"] <= 21) {
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      winner = YOU;
    } else if (YOU["score"] < DEALER["score"]) {
      winner = DEALER;
    } else if (YOU["score"] === DEALER["score"]) {
      winner = "Draw";
    }
  } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    winner = DEALER;
  } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
    winner = DEALER;
  }
  return winner;
}

function showWinner() {
  let message, messageColor;

  if (winner == YOU) {
    message = "You WON!";
    messageColor = "lightgreen";
    document.querySelector("#wins").textContent = blackjackGame["wins"] += 1;
    winSound.play();
  }

  if (winner == DEALER) {
    message = "You LOST!";
    messageColor = "orange";
    document.querySelector("#losses").textContent = blackjackGame[
      "losses"
    ] += 1;
    loseSound.play();
  }

  if (winner === "Draw") {
    message = "You DREW!";
    messageColor = "orange";
    document.querySelector("#draws").textContent = blackjackGame["draws"] += 1;
    loseSound.play();
  }

  if (winner == "None") {
    message = "You Both Busted!";
    messageColor = "white";
    loseSound.play();
  }

  document.querySelector("#blackjack-result").textcontent = message;
  document.querySelector("#blackjack-result").style.color = messageColor;
}

// All cards get remove and resets but scores of wins; losses and draws are still collected
function blackjackDeal() {
  if (blackjackGame["isTurnsOver"] === true) {
    let yourImages = document
      .querySelector("#your-box")
      .querySelectorAll("img");
    let dealerImages = document
      .querySelector("#dealer-box")
      .querySelectorAll("img");

    YOU["score"] = 0;
    DEALER["score"] = 0;
    document.querySelector("#your-blackjack-result").textContent = 0;
    document.querySelector("#dealer-blackjack-result").textContent = 0;

    document.querySelector("#your-blackjack-result").style.color = "white";
    document.querySelector("#dealer-blackjack-result").style.color = "white";

    document.querySelector("#blackjack-result").textContent = "Let's Play";
    document.querySelector("#blackjack-result").style.color = "white";

    for (let i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
      dealerImages[i].remove();
    }
    blackjackGame["isStand"] = false;
    blackjackGame.pressOnce = false;
    blackjackGame["isTurnsOver"] = false;
  }
}
// Restart function
function blackjackRestart() {
  blackjackDeal();
  document.querySelector("#wins").textContent = 0;
  document.querySelector("#losses").textContent = 0;
  document.querySelector("#draws").textContent = 0;

  blackjackGame.wins = 0;
  blackjackGame.losses = 0;
  blackjackGame.draws = 0;
}
