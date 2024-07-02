// Generate a random number
// The user enters a number and clicks the "Go" button
// If the user guesses the random number, display "You guessed it!"
// If the random number is < user's number, display "Down!"
// If the random number is > user's number, display "Up!"
// When the "Reset" button is clicked, the game resets
// If the user uses up all 3 chances, the game ends (no more guesses allowed, button is disabled)
// If the user enters a number outside the range of 1~30, inform the user without deducting a chance
// If the user enters a number they have already guessed, inform the user without deducting a chance


let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 3;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];
let image = document.getElementById("image");
let answerArea = document.getElementById("answer-area");

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function(){userInput.value=""});


function pickRandomNum() {
    computerNum = Math.floor(Math.random()*30)+1;
    console.log("정답: ", computerNum);
    answerArea.textContent = `The answer: ${computerNum}`;
}

pickRandomNum();

function play() {
    let userValue = Number(userInput.value);

    if(userValue < 1 || userValue > 30) {
        resultArea.textContent = "Enter a number between 1 and 30";
        return;
    }

    if(history.includes(userValue)){
        resultArea.textContent = "You have already entered this number. Please enter a different number."
        return;
    }

    history.push(userValue);
    console.log(history);

    chances--;
    chanceArea.textContent = `Remaining chances: ${chances}`;
    console.log("chance", chances);

    if(userValue < computerNum) {
        resultArea.textContent = "UP!!!"
    } else if(userValue > computerNum) {
        resultArea.textContent = "DOWN!!!"
    } else {
        resultArea.textContent = "YOU GUESSED IT!!!"
        gameOver = true;
        image.src = "assets/right.jpg";
    }


    if(chances < 1 && userValue !== computerNum){
        gameOver = true;
        resultArea.textContent = `FAILED. The number was ${computerNum}`;
    }

    if(gameOver){
        playButton.disabled = true;
    }
}

function reset() {
    //user input 창이 깨끗하게 정리되고
    userInput.value = "";
    //새로운 번호가 생성되고
    pickRandomNum();
    chances = 3;
    //결과
    resultArea.textContent = "Result will be displayed here"
    playButton.disabled = false;
    gameOver = false;
    history = [];
    chanceArea.textContent = `Remaining chances: ${chances}`;
    image.src = "assets/questionMark.jpg";
}

function do_animation(event) {
    target = event.target;
    target.classList.remove('zoomSpin');
    setTimeout( () => {target.classList.add('zoomSpin');}, 0);
}