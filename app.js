const rockPaperScissors = document.getElementById("allOptions");
const resultText = document.querySelector(".result");
const resultInfoText = document.querySelector(".result-info");
const scoreCardContainer = document.querySelector(".score_card-container");
const choiceContainer = document.querySelector(".choice-container");
const choices = ["rock", "paper", "scissors"];
const buttons = document.querySelectorAll(".button");

// Get the initial text content of the result and result-info elements
const initialResultText = resultText.textContent;
const initialResultInfoText = resultInfoText.textContent;

// Clear the text content of result and result-info elements
resultText.textContent = "";
resultInfoText.textContent = "";

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

// Start the typing animation after the ROCK PAPER SCISSORS animation is complete
rockPaperScissors.addEventListener("animationend", function () {
  setTimeout(function () {
    typeText(resultText, initialResultText);
  }, animationDelay);

  setTimeout(function () {
    typeText(resultInfoText, initialResultInfoText);
  }, animationDelay + initialResultText.length * typingSpeed); // Add a delay to start the result-info typing after result typing is complete
  setTimeout(function () {
    scoreCardContainer.style.opacity = 1;
    choiceContainer.style.opacity = 1;
  }, animationDelay + initialResultText.length * typingSpeed + initialResultInfoText.length * typingSpeed + 400); 
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    button.style.transform = "scale(0.95)";
    button.classList.add("clicked")
    const playerSelection = button.id;
    console.log(playerSelection);
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
  playerSelection = playerSelection.toLowerCase();
  const choices = ["rock", "paper", "scissors"];
  if (playerSelection === computerSelection) {
    return "The match is a tie!";
  } else if (playerSelection === "rock" && computerSelection === "paper") {
    return "You lose Paper beats Rock!";
  } else if (playerSelection === "paper" && computerSelection === "scissors") {
    return "You lose Scissors beats Paper!";
  } else if (playerSelection === "scissors" && computerSelection === "rock") {
    return "You lose Rock beats Scissors!";
  } else {
    return `You win ${playerSelection} beats ${computerSelection}`;
  }
}
