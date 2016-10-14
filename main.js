var prompt = require("prompt");
var Word = require("./word.js");
var Game = require("./game.js");

var schema = {
    properties: {
        guessLetter: {
            pattern: /[a-zA-Z]/,
            message: "Please enter only letters.",
            required: true
        }
    }
};

prompt.start();

game = {
    wordBank: Game.Game.wordBank,
    wordsWon: 0,
    guessesRemaining: 10,
    userGuessedLetters: [],
    currentWrd: null,
    startGame: function(wrd) {
        this.resetGuessesRemaining();
        this.currentWrd = new Word.Word(this.wordBank[Math.floor(Math.random() * this.wordBank.length)]);
        this.currentWrd.getLetters();
        console.log("Want to play Hangman?\n");
        console.log(this.currentWrd.wordDisplay() + "\n");
        this.cliPromptPlayer();
    },
    resetGuessesRemaining: function() {
        this.guessRemaining = 10;
    },
    cliPromptPlayer: function() {
        var self = this;
        prompt.get(schema, function(err, result) {
        	console.log("\n---------------------------------------------------------");
            console.log("You guessed: " + result.guessLetter);
            console.log("---------------------------------------------------------\n");
            var findHowManyOfUserGuess = self.currentWrd.letterFound(result.guessLetter);
            if (findHowManyOfUserGuess === 0) {
                if (self.userGuessedLetters.indexOf(result.guessLetter) < 0) {
                    self.userGuessedLetters.push(result.guessLetter);
                    self.guessesRemaining--;
                    console.log("*********************************************************");
                    console.log("Sorry-that guess was incorrect!");
                    console.log("********************************************************* \n");
                } else {
                    console.log("You guessed this letter already!");
                }
            } else {
                if (self.userGuessedLetters.indexOf(result.guessLetter) < 0) {
                    self.userGuessedLetters.push(result.guessLetter);
                    console.log("*********************************************************");
                    console.log("Your guess is correct!");
                    console.log("*********************************************************\n");
                } else {
                    console.log("You guessed this letter already!");
                }
                if (self.currentWrd.wordFound()) {
                    console.log("You Won!!!");
                    return; //end game
                }
            }
            console.log("Guesses remaining: " + self.guessesRemaining + "\n");
            console.log(self.currentWrd.wordDisplay());
            console.log("\nThese are the letters you guessed already: " + self.userGuessedLetters);
            if ((self.guessesRemaining > 0) && (self.currentWrd.found === false)) {
                self.cliPromptPlayer();
            } else if (self.guessesRemaining === 0) {
                console.log("The fat lady has sung ", self.currentWrd.word);
                console.log("Say what?");
            } else {
                console.log(self.currentWrd.wordDisplay());
            }
        });
    }
};

game.startGame();