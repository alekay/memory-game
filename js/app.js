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
function startGame(){
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
        cards[i].classList.remove('show', 'open', 'match', 'disabled');
    }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
}

// triggers the 'startGame' function onload
document.body.onload = startGame();

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
    openedCards[0].classList.add('unmatched');
    openedCards[1].classList.add('unmatched');
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove('show', 'open', 'unmatched');
        openedCards[1].classList.remove('show', 'open', 'unmatched');
        enable();
        openedCards = [];
    }, 1200);
}

// disable cards when not matched
function disable(){
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

// + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
}
// + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)