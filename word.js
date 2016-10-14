var letter = require("./letter.js");

var Word = function(wrd){
	this.word = wrd,
	this.lets = [],
	this.found = false,
	this.getLetters = function(word) {
		for (var i = 0; i < this.word.length; i++) {
			this.lets.push(new letter.Letter(this.word[i]));
		}
	},
	this.wordFound = function() {
		var counter = 0;
		for (var i = 0; i < this.lets.length; i++) {
			if (this.lets[i].appear) {
				counter++;
			}
		}
		if (counter === this.lets.length) {
			this.found = true;
		}
		return this.found;
	},
	this.letterFound = function(guessLetter) {
		var letterReturn = 0;
		for (var i = 0; i < this.lets.length; i++) {
			if (this.lets[i].charac === guessLetter) {
				this.lets[i].appear = true;
				letterReturn++;
			}
		}
		return letterReturn;
	},
	this.wordDisplay = function() {
		var str = "";
		for (var i = 0; i < this.lets.length; i++) {
			str += this.lets[i].letterRender();
		}
		return str;
	}
}

exports.Word = Word;