let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
updateScoreElement();

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissor";
  }
  return computerMove;
}
function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses:${score.losses}, Ties: ${score.ties}`;
}
let isAutoPlaying = false;
let intervalID;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalID = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
  
    isAutoPlaying = true;
  
    document.querySelector('.js-play-button').innerText = 'Stop Play';
   
  } else {
    clearInterval(intervalID);
    isAutoPlaying = false;
   
    document.querySelector('.js-play-button').innerText = 'Auto Play';
  }
}

document.querySelector('.js-rock-button').addEventListener('click', ()=>{
  playGame('rock');
})
document.querySelector('.js-paper-button').addEventListener('click', () =>{
  playGame('paper');
})
document.querySelector('.js-scissor-button').addEventListener('click', () =>{
  playGame('scissor');
})
document.querySelector('.reset-score-button').addEventListener('click', () =>{
  resetScore();
})
document.querySelector('.js-play-button').addEventListener('click', () =>{
  autoPlay();
})


document.body.addEventListener('keydown', (event) => {
  
  if  (event.key === 'r'){
    playGame('rock');
  }
  else if(event.key === 'p'){
    playGame('paper');
  }
  else if (event.key === 's'){
    playGame('scissor');
  }
  else if (event.key === 'Enter'){
    autoPlay();
  }
  else if (event.key ==='Backspace'){
    resetScore();
  }

})
let confirmationMessage = document.querySelector('.confirmation-message');

function resetScore(){
  confirmationMessage.innerHTML = `
  <p> Are you fucking sure?
  <button class='yes'> Yes </button>
  <button class ='no'> No </button> </p>`;

  document.querySelector('.yes').addEventListener('click', ()=>{
    performScore();
  })
  document.querySelector('.no').addEventListener('click', ()=>{
    confirmationMessage.innerHTML ="";
  })
  document.addEventListener('keydown', (event) => {
    if (event.key === 'y'){
      performScore();
    }
    else if (event.key === 'n'){
      confirmationMessage.innerHTML ="";
    }
  })
}
function performScore(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
  confirmationMessage.innerHTML ="";
}



function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";
  if (playerMove === "scissor") {
    if (computerMove === "paper") {
      result = "You Win";
    } else if (computerMove === "scissor") {
      result = "Tie";
    } else if (computerMove === "rock") {
      result = "You Lose";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "scissor") {
      result = "You Win";
    } else if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "You Lose";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You Win";
    } else if (computerMove === "paper") {
      result = "Tie";
    } else if (computerMove === "scissor") {
      result = "You Lose";
    }
  }
  if (result === "You Win") {
    score.wins += 1;
  } else if (result === "You Lose") {
    score.losses += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  }
  localStorage.setItem("score", JSON.stringify(score));
  updateScoreElement();
  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(
    ".js-moves"
  ).innerHTML = ` You <img class="move-icon" src="./images/${playerMove}-emoji.png"> 
<img class="move-icon" src="./images/${computerMove}-emoji.png"> Computer`;
}
