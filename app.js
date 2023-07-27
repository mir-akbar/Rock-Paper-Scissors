const rockPaperScissors = document.getElementById("allOptions");
const resultText = document.querySelector(".result");
const resultInfoText = document.querySelector(".result-info");
const scoreCardContainer = document.querySelector(".score_card-container");
const signs = document.querySelectorAll(".sign");
const choiceContainer = document.querySelector(".choice-container");
const choices = ["rock", "paper", "scissors"];
const buttons = document.querySelectorAll(".button");
const playerScoreElement = document.querySelector("#playerScore");
const computerScoreElement = document.querySelector("#computerScore");
const modal = document.querySelector(".modal");
const gameResult = document.querySelector(".gameResult");
const playAgainElement = document.querySelector(".playAgain");
const overlay = document.querySelector(".overlay");
const playerPoints = document.querySelector(".points");
const maxScore = 5;
let playerScore = 0;
let computerScore = 0;

// Get the initial text content of the result and result-info elements
const initialResultText = "Choose your weapon";
const initialResultInfoText = "First one to 5 points wins the game.";

const animationDelay = 100;
const typingSpeed = 100;

function typeText(element, text) {
  let currentCharIndex = 0;
  const typingInterval = setInterval(function () {
    if (currentCharIndex < text.length) {
      // Append the next character to the element's text content
      element.textContent += text.charAt(currentCharIndex);
      currentCharIndex++;
    } else {
      // Text typing is complete, clear the interval
      clearInterval(typingInterval);
    }
  }, typingSpeed);
}

function typeTextAnimation() {
  setTimeout(function () {
    typeText(resultText, initialResultText);
  }, animationDelay);

  setTimeout(function () {
    typeText(resultInfoText, initialResultInfoText);
  }, animationDelay + initialResultText.length * typingSpeed); // Add a delay to start the result-info typing after result typing is complete
  setTimeout(function () {
    scoreCardContainer.style.opacity = 1;
    choiceContainer.style.opacity = 1;
  }, animationDelay +
    initialResultText.length * typingSpeed +
    initialResultInfoText.length * typingSpeed +
    400);
}
// Start the typing animation after the ROCK PAPER SCISSORS animation is complete
rockPaperScissors.addEventListener("animationend", typeTextAnimation);

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    button.style.transform = "scale(0.95)";
    button.classList.add("clicked");
    const playerSelection = button.id;
    playRound(playerSelection);
    setTimeout(() => {
      button.style.transform = "scale(1)";
      button.classList.remove("clicked");
    }, 200);
  });
});

function getComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

function playRound(playerSelection) {
  const computerSelection = getComputerChoice();
  updateSign(playerSelection, computerSelection);
  if (playerSelection === computerSelection) {
    roundResult("It's a tie!", "You both chose the same!");
  } else if (
    (playerSelection === "rock" && computerSelection === "paper") ||
    (playerSelection === "paper" && computerSelection === "scissors") ||
    (playerSelection === "scissors" && computerSelection === "rock")
  ) {
    const result = "You lost!";
    roundResult(result, `${computerSelection} beats ${playerSelection}`);
    updateScore(result);
  } else {
    const result = "You won!";
    roundResult("You won!", `${playerSelection} beats ${computerSelection}`);
    updateScore(result);
  }
}

function updateSign(playerSelection, computerSelection) {
  const playerSign = document.querySelector("#playerSign");
  const computerSign = document.querySelector("#computerSign");
  playerSign.innerHTML = `<img src="assets/${playerSelection}.svg" class="choiceIcon" alt="${playerSelection}">`;
  computerSign.innerHTML = `<img src="assets/${computerSelection}.svg" class="choiceIcon" alt="${computerSelection}">`;
}

function roundResult(result, info) {
  resultText.textContent = result;
  resultInfoText.textContent = info.charAt(0).toUpperCase() + info.slice(1);
}

function updateScore(result) {
  if (result === "You lost!") {
    computerScore++;
  } else {
    playerScore++;
  }
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
  checkWinner();
}

function checkWinner() {
  if (playerScore === maxScore || computerScore === maxScore) {
    const winner =
      playerScore === maxScore ? "You won the game!" : "You lost the game!";
    showPopUp(winner);
    playerScore = 0;
    computerScore = 0;
  }
}

function showPopUp(winner) {
  modal.classList.add("active");
  overlay.classList.add("active");
  gameResult.textContent = winner;
  if (winner === "You lost the game!") {
    playerPoints.textContent = "Your score is: " + playerScore;
  } else {
    playerPoints.textContent = "Computer score is: " + computerScore;
  }
}

function playAgain() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
  signs.forEach((sign) => {
    sign.innerHTML = `<img src="assets/unavailable.svg" class="unavailable-sign" alt="">`;
  });
  playerScoreElement.textContent = 0;
  computerScoreElement.textContent = 0;
  resultText.textContent = "";
  resultInfoText.textContent = "";
  typeTextAnimation();
}

playAgainElement.addEventListener("click", playAgain);
