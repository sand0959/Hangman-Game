/* The theme of my hangman will be famous tragic literary figures */
//This variable creates the wins for counters and the answers and hints
var hangman = {
    hint: "",
    currentAnswer: "",
    wins: 0,
    guessesLeft: 10,
    lettersUsed: "",
    answerDiv: "",
    targetArray: [],
    victoryCounter: 0,
    answerArray: ["NED-STARK", "ANNA-KARENINA", "JAY-GATSBY", "PRIMROSE-EVERDEEN", "KING-LEAR", "SIRIUS-BLACK", "TOM-ROBINSON", "CHARLIE-GORDON", "OLD-YELLER"],
    hintArray: ["Winter is coming....", "Russian aristocate who threw herself infront of a train...", "Only di Caprio could do this character justice...", "Her sister sacrificed everything to save her....oops", "Nothing can come of nothing, speak again...", "The boy who lived's Godfather...", "Harper Lee's most tragic character...", "He asked for flowers to be laid on Algernon's grave as he left..", "A dog lovers worst fear..."],
// generate a random answer and corresponding hint
    generateAnswerAndHint: function() {
        var randomNumber = Math.floor(Math.random() * 9);
        this.hint = this.hintArray[randomNumber];
        hangman.currentAnswer = this.answerArray[randomNumber];
    },

    genTargetArray: function() {
        this.targetArray = this.currentAnswer.split("");
    },

    generateAnswerDiv: function() {
        for (var i = 0; i < this.targetArray.length; i++) {
            if (this.targetArray[i] === "-") {
                console.log(hangman.targetArray);
                this.answerDiv += "<p class='target-letters'>" + "-" + "</p>";
            } else {
                this.answerDiv += "<p class='target-letters'>" + "_" + "</p>";
            }
        }
    },
    resetHangman: function() {
        this.victoryCounter = 0;
        this.lettersUsed = "";
        this.answerDiv = "";
        this.guessesLeft = 10;
        // This line prepares the answer and hint.
        this.generateAnswerAndHint();
        // This line generates the target Array, which holds the answer.
        this.genTargetArray();
        // This line gets the data from the first and second line and the puts it down in the HTML.
        this.generateAnswerDiv();
        // this should generate the starter HTML
        hangman.updateHTML();
        var html2 = this.answerDiv;
        document.querySelector("#gameAnswerField").innerHTML = html2;
    },
    updateHTML: function() {
        var html =
            "<h2>Here, is your clue: " + hangman.hint + "</h2>" +
            "<p>Correct Guesses: " + hangman.wins + "</p>" +
            "<p>Chances Remaining: " + hangman.guessesLeft + "</p>" +
            "<p>You Guesses so far: " + hangman.lettersUsed + "</p>";
        document.querySelector("#game").innerHTML = html;
    }
};

// This line prepares the answer and hint.
hangman.generateAnswerAndHint();
// This line generates the target array, which holds the answers.
hangman.genTargetArray();
// This line creates the answer div.
hangman.generateAnswerDiv();

// this should generate the initial HTML for the lines before the answerDiv.
hangman.updateHTML();

var html2 = hangman.answerDiv;

document.querySelector("#gameAnswerField").innerHTML = html2;

hangman.updateHTML();

// Sound links, not working yet. :(
var cheeringAudio = new Audio("../hangman-game/assets/sounds/cheer.wav");
var booingAudio = new Audio("../hangman-game/assets/sounds/boo.wav");
var userGuess;
// THis captures key clicks
document.onkeyup = function(event) {
    // Sets a counter, if counter is 0, that means the user's guess did not match :(
    var counter = 0;
    // This determines which exact key was selected. Makes uppercase
    userGuess = String.fromCharCode(event.keyCode).toUpperCase();
    var par = document.getElementsByClassName("target-letters");

    // This SHOULD stop people from entering previously entered letters
    if (hangman.lettersUsed.indexOf(userGuess) < 0) {
        for (var i = 0; i < hangman.targetArray.length; i++) {
            if (userGuess === hangman.targetArray[i]) {
                console.log(hangman.targetArray[i] + "this is a match");
                hangman.victoryCounter++;
                console.log(hangman.victoryCounter);
                counter++;
                hangman.lettersUsed += userGuess;
                par[i].innerHTML = userGuess;
                console.log((hangman.targetArray.length -1), hangman.victoryCounter);
                if (hangman.victoryCounter === (hangman.targetArray.length - 1)) {
                    hangman.wins++;
                    cheeringAudio.play();
                    alert("Your score is " + hangman.wins + ". THAT'S AMAZING!!!");
                    hangman.resetHangman();
                }
            }
        }
        if (counter === 0) {
            hangman.guessesLeft = hangman.guessesLeft - 1;
            hangman.lettersUsed += userGuess;
            hangman.updateHTML();
        }
        counter = 0;

        hangman.updateHTML();
        if (hangman.guessesLeft === 0) {
            booingAudio.play();
            alert("Sorry, you've lost, try again!");
            hangman.resetHangman();
        }
    }
};
