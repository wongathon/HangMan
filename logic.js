
//Game data collection
var wordArray = ["onesie", "blue", "shakira", "penelope", "cyprus", "ingot", "herring", "fortitude", "muskrats", "mustache", "cobbler", "moron", "appendix", "royal", "nuance", "illiad", "moneyed", "monkeys", "forebearance", "crude"]


//contain guessed letters
var guessesLeft = 7;
var numberBlank = 0;
var blanksOrLetters = [];
var wrongGuesses = [];
var lettersInChosen = [];
var currentWord = "";

var winCounter = 0;
var lossCounter = 0;

var hangy = [":(<br>/|\\<br>/\\","O<br>/|\\<br>/\\", "O<br>/|\\<br>/", "O<br>/|\\", "O<br>/|", "O<br>/", "O", "" ]

var game = document.getElementById("gameInfo");
var gallowy = document.getElementById("noosee");

function gameStart(){

	guessesLeft = 7;
	blanksOrLetters = [];
	wrongGuesses = [];

	currentWord = wordArray[Math.floor(Math.random() * wordArray.length)];
	console.log("Computer chooses: " + currentWord);
	lettersInChosen = currentWord.split("");
	numberBlank = lettersInChosen.length;

	for (var i=0; i<numberBlank; i++){
		blanksOrLetters.push("_ ");
	}

	//refresh game page with content

	gallowy.innerHTML = hangy[guessesLeft];

	game.innerHTML = "<br> Guesses Left: " + guessesLeft + "<br>" + blanksOrLetters.join(" ") + "<br><br> Wrongly guessed letters: "+ wrongGuesses.join("") + "<br>Wins: " + winCounter + " Losses: "+ lossCounter;

}



function checkLetter(letter){

	var letterInWord = false;

	for(var i = 0; i<numberBlank; i++){
		if(lettersInChosen[i] === letter){
			letterInWord = true
		}
	}

	//local function to check guessed/answer arrays for item
	function isInArray(item, arr){
		return item.indexOf(arr) > -1;
	}


	//check to make sure userGuess is a letter key
	//check to make sure hasn't been pressed, else "already guessed!"

	if(letterInWord){

		if(isInArray(blanksOrLetters, letter)){
			alert("Already guessed!")
		} else {
			for (i=0; i<numberBlank; i++){
				if (letter === lettersInChosen[i]){
					blanksOrLetters[i] = letter;
				}
				console.log(blanksOrLetters + " is our answer so far.")
			}
		}
		//see if guess is in the guessed-list (lol)
	} else {
		if (isInArray(wrongGuesses, letter)){
			alert("Already guessed!")
		} else {
			wrongGuesses.push(letter);
			guessesLeft--;

		}
	}

}

function roundOver(){

	gallowy.innerHTML = hangy[guessesLeft];
	game.innerHTML = "<br> Guesses Left: " + guessesLeft + "<br>" + blanksOrLetters.join(" ") + "<br><br> Wrongly guessed letters: "+ wrongGuesses.join(" ") + "<br>Wins: " + winCounter + " Losses: "+ lossCounter;

	function winOrLose(){
		setTimeout(function(){
			
		if(lettersInChosen.join("") == blanksOrLetters.join("")){
			alert("You correctly guessed \"" + blanksOrLetters.join("") + "\" and escaped...justice? :)");
			winCounter++;
			playAgain();
		} else if (guessesLeft == 0) {
			alert("You've been HANGED! \n :( G A M E  O V E R :(")
			lossCounter++;
			playAgain();
		}
		
		}, 1500);
	}
	
	winOrLose();
	


}

gameStart();

function playAgain(){
	var playGain = confirm("Play again?")

	if (playGain){
		gameStart();
	} else {
		location.reload();
	}
}

document.onkeyup = function(event){

	//pull a word from the word bank
	var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
	console.log("User guess:" + (userGuess) +".");
	checkLetter(userGuess);
	roundOver();

}
