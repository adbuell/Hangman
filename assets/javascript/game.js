(function () {
    "use strict";
    var availableLetters, words, guessInput, guess, guessButton, lettersGuessed, lettersMatched, output, man, letters, lives, currentWord, numLettersMatched, messages;

    function setup() {
        /* start config options */
        availableLetters = "abcdefghijklmnopqrstuvwxyz";
        lives = 5;
        words = ["walter", "dude", "rug", "bowling"];
        messages = {
            win: 'You win!',
            lose: 'Game over!',
            guessed: ' already guessed, please try again...',
            validLetter: 'Please enter a letter from A-Z'
        };
        /* end config options */

        lettersGuessed = lettersMatched = '';
        numLettersMatched = 0;

        /* choose a word */
        currentWord = words[Math.floor(Math.random() * words.length)];

        /* make #man and #output blank*/
        output = document.getElementById("output");
        man = document.getElementById("man");
        guessInput = document.getElementById("letter");

        man.innerHTML = 'You have ' + lives + ' lives remaining';
        output.innerHTML = '';

        document.getElementById("letter").value = '';

        /* make sure guess button is enabled */
        guessButton = document.getElementById("guess");
        guessInput.style.display = 'inline';
        guessButton.style.display = 'inline';
 // console.log('inline');
        /* set up display of letters in current word */
        letters = document.getElementById("letters");
        // console.log("letters");
        letters.innerHTML = '<span class="current-word">Current word:</span>';

        var letter, i;
        for (i = 0; i < currentWord.length; i++) {
          // console.log(currentWord);
            letter = '<span class="letter letter' + currentWord.charAt(i).toUpperCase() + '">' + currentWord.charAt(i).toUpperCase() + '</span>';
            letters.insertAdjacentHTML('beforeend', letter);
            // console.log("beforeend");
        }
    }



    function gameOver(win) {
        if (win) {
            output.innerHTML = messages.win;
            output.classList.add('win');
        } else {
            output.innerHTML = messages.lose;
            output.classList.add('error');
        }

        guessInput.style.display = guessButton.style.display = 'none';
        guessInput.value = '';
    }

//start game

    window.onload = setup();


    document.getElementById("restart").onclick = setup;


    guessInput.onclick = function () {
        this.value = '';
    };

  
    document.getElementById('hangman').onsubmit = function (e) {
        if (e.preventDefault) e.preventDefault();
        output.innerHTML = '';
        output.classList.remove('error', 'warning');
        guess = guessInput.value;



        if (guess) {

            if (availableLetters.indexOf(guess) > -1) {

                if ((lettersMatched && lettersMatched.indexOf(guess) > -1) || (lettersGuessed && lettersGuessed.indexOf(guess) > -1)) {
                    output.innerHTML = '"' + guess.toUpperCase() + '"' + messages.guessed;
                    output.classList.add("warning");
                }

                else if (currentWord.indexOf(guess) > -1) {
                    var lettersToShow;
                    lettersToShow = document.querySelectorAll(".letter" + guess.toUpperCase());

                    for (var i = 0; i < lettersToShow.length; i++) {
                        lettersToShow[i].classList.add("correct");

                    }


                    for (var j = 0; j < currentWord.length; j++) {
                        if (currentWord.charAt(j) === guess) {
                            numLettersMatched += 1;
                        }
                    }

                    lettersMatched += guess;
                    if (numLettersMatched === currentWord.length) {
                        gameOver(true);
                    }
                }

                else {
                    lettersGuessed += guess;
                    lives--;
                    man.innerHTML = 'You have ' + lives + ' lives remaining';
                    if (lives === 0) gameOver();
                }
            }

            else {
                output.classList.add('error');
                output.innerHTML = messages.validLetter;
            }
        }

        else {
            output.classList.add('error');
            output.innerHTML = messages.validLetter;
        }
        return false;
    };
}());
