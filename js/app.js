// card grabs all of the li's with class 'card'
let card = document.getElementsByClassName('card');
// cards uses the rest operator to represent all of the possible array elements
let cards = [...card];
// Deck of all cards in game
const deck = document.getElementById('card-deck');

// move variables
let moves = 0;
let counter = document.querySelector('.moves');

// matched card variable
let matchedCard = document.getElementsByClassName('match');

// array for opened cards
let openedCards = [];

// variable for star icon
const stars = document.querySelectorAll('.fa-star');

let starsLis

// declare timeout variable to be used on timeout function
let timeout;

// select restart button
const restart = document.querySelector('.restart');

// shuffle cards, take parameter array, return shuffled array
function shuffle(array){
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// startGame function that shuffles cards and makes deck of all cards
startGame = function startGame(){
    // clearTimeout on reset
    clearTimeout(timeout);
    // empty the openedCards array on reset
    openedCards = [];
    // create variable for shuffled cards that uses 'shuffle array' method, shuffling the 'cards' array
    cards = shuffle(cards);
    // loop through for the length of the shuffled cards array
    for (let i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        // 1. use forEach function (which takes function as input) on empty array
        // 2. use .call to take first argument and replace .this inside of the function, function takes arg (item)
        [].forEach.call(cards, function(item){
            // 3. append item to the deck of cards
            // this is where the actual shuffle happens
            deck.appendChild(item);
        });
        // remove all classes from cards on startGame
        cards[i].classList.remove('show', 'open', 'match', 'disabled', 'unmatched');
    }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
}

// triggers the 'startGame' function on body load
document.body.onload = startGame();

// event listener for restart button, calls startGame function
restart.addEventListener('click', startGame);

// display the card's symbol (put this functionality in another function that you call from this one)
// set function to toggle card's classes - will be called upon by event listener when clicked
const displayCard = function(){
    // Toggle all 3 attributes that need to change at the same time
    // 'this' is set in the window creating a global variable within the function
    this.classList.toggle('open'); 
    this.classList.toggle('show');
    this.classList.toggle('disabled');
}

// loop through cards and add event listeners to each card
for (let i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
};

// this gives the primary toggle for the cards
// loop through cards array
for (let i = 0; i < cards.length; i++){
    // add event listener to each card in cards array as it loops through the array of cards
    // pass 'displayCard' function to run when the click hapens
    cards[i].addEventListener('click', displayCard);
};

// open card fuction
function cardOpen(){
    //   - add the card to a *list* of "open" cards 
    openedCards.push(this);
    // set value for the cards open
    let cardNumber = openedCards.length;
    // if cards open is two, incriment the move throug its function
    if (cardNumber === 2){
        moveCounter();
        //   - if the list already has another card, check to see if the two cards match
        if(openedCards[0].type === openedCards [1].type) {
            matched();
        } else {
            unmatched();
        }
    }
}

// + if the cards do match, lock the cards in the open position
function matched(){
    openedCards[0].classList.add('match', 'disabled');
    openedCards[1].classList.add('match', 'disabled');
    openedCards[0].classList.remove('show', 'open');
    openedCards[1].classList.remove('show', 'open');
    openedCards = [];
}

// + if the cards do not match, remove the cards from the list and hide the card's symbol 
function unmatched(){
    // give card one and two 'unmatched' class
    openedCards[0].classList.add('unmatched');
    openedCards[1].classList.add('unmatched');
    // add disable function which adds 'disabled' class to the card
    disable();
    // assign timout variable to function to be used as callback
    timeout = setTimeout(function(){
        // first opened card added to array loses these classes
        openedCards[0].classList.remove('show', 'open', 'unmatched');
        // the second card added to array loses these classes
        openedCards[1].classList.remove('show', 'open', 'unmatched');
        enable();
        // opened cards now contains the cards added through their index number (0, 1)
        openedCards = [];
        // timout occurs so that the cards don't immediately flip back over
    }, 1200);
}

// disable cards when not matched
const disable = function disable(){
    Array.prototype.filter.call(cards, function(card) {
        card.classList.add('disabled');
    });
}

// enable cards when matched
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for (let i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add('disabled');
        }
    });
}

// + increment the move counter and display it on the page
function moveCounter(){
    moves++;
    counter.innerHTML = moves;

    // star rating based on moves inside moveCounter function
    if (moves > 8 && moves < 16){
        for (let i = 0; i < 3; i++){
            // if moves > 8 and < 19 and i index is 2 remove visibility of star index 2
            if(i === 2){
                stars[i].style.visibility = 'collapse';
            }
        }
    } else if (moves >= 16){
        for (let i = 0; i <3; i++){
            // if moves >= 16 and i index is 1 remove visibility of star index 1
            if(i === 1){
                stars[i].style.visibility = 'collapse';                
            }
        }
    }
}

// + if all cards have matched, display a message with the final score