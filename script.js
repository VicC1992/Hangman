const lettersPlace = document.getElementById("letters");
const wordPlace = document.getElementById("hiddenWord");
const words = ["PROGRAMARE", "WELLCODE", "ROMANIA", "IASI"];
const outputMessage = document.querySelector(".message");
let wordLength;
let selectedWord;

window.onload = wordSelection;

function wordSelection() {
    const nrWords = words.length;
    const wordIndex = Math.floor((Math.random() * nrWords));
    selectedWord = words[wordIndex];
    if (selectedWord) {
        wordLength = selectedWord.length;
        for (let i = 1; i <= wordLength; ++i) {
            const hiddenLetter = document.createElement("button");
            hiddenLetter.textContent = "_";
            hiddenLetter.className = "btn btn-warning btn-lg";
            hiddenLetter.id = `b${i}`;
            wordPlace.appendChild(hiddenLetter);
        }
    }   
}
let firstLetter = "A";
createLetters();
function createLetters() {
    let indexAsciiOfA = firstLetter.charCodeAt(0);
    let nrOfLetters = 26;
    for (let i = 0; i < nrOfLetters; ++i) {
        const newBtn = document.createElement("button");
        newBtn.className = "btn btn-info";
        newBtn.style = "margin-right: 10px";
        newBtn.id = i + 1;
        newBtn.textContent = String.fromCharCode(i + indexAsciiOfA);
        newBtn.addEventListener("click", pressedLetter);
        newBtn.addEventListener("click", resultOfGame);
        lettersPlace.appendChild(newBtn);
    }
}

let guesses = 0;
let mistakes = 0;

function pressedLetter(e) {
    let letter = e.target.textContent;
    let x = selectedWord.indexOf(letter);
    if (x !== -1) {
        document.getElementById(e.target.id).disabled = true;
        document.getElementById(e.target.id).className = "btn btn-success";
        while (x !== -1) {
            ++guesses;
            document.getElementById(`b${x + 1}`).textContent = letter;
            x = selectedWord.indexOf(letter, x + 1);
        }
    } else {
        document.getElementById(e.target.id).disabled = true;
        document.getElementById(e.target.id).className = "btn btn-danger";
        ++mistakes;
    }
}

resultOfGame();
function resultOfGame() {
    if (guesses === wordLength ) {
        outputMessage.textContent = "Congratulations you win! ";
        createButtonNewGame();
    } else if (mistakes <= 0) {
        outputMessage.textContent = "You can make maximum 6 mistakes !";
    } else if (mistakes > 0 && mistakes < 6) {
        outputMessage.textContent = `You made ${mistakes} out 6 mistakes!`;
    } else {
        outputMessage.textContent = "You've just been hanged !";
        createButtonNewGame();        
    }
}

function createButtonNewGame() {
    const buttonStartNewGame = document.createElement("button");
        buttonStartNewGame.textContent = "Start new game !";
        buttonStartNewGame.className = "btn btn-success";
        buttonStartNewGame.addEventListener("click", restart);
        outputMessage.appendChild(buttonStartNewGame);
}

function restart() {
    location.reload();
}
