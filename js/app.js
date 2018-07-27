// card grabs all of the li's with class 'card'
const card = document.getElementsByClassName('card');
// cards uses the rest operator to represent all of the possible array elements
const cards = [...card];
// Deck of all cards in game
const deck = document.querySelector('.deck');

// startGame function that shuffles cards and makes deck of all cards
function startGame() {
    // create variable for shuffled cards that uses 'shuffle array' method, shuffling the 'cards' array
    const shuffledCards = shuffle(cards);
    // loop through for the length of the shuffled cards array
    for (let i = 0; i < shuffledCards.length; i++) {
        // 1. use forEach function (which takes function as input) on empty array
        // 2. use .call to take first argument and replace .this inside of the function, function takes arg (item)
        [].forEach.call(shuffledCards, function(item) {
            // 3. append item to the deck of cards
            // this is where the actual shuffle happens
            deck.appendChild(item);
        });
    }
}

// triggers the 'startGame' function on window.onload
window.onload = startGame();

// display the card's symbol (put this functionality in another function that you call from this one)
// set function to toggle card's classes - will be called upon by event listener when clicked
const displayCard = function() {
    // Toggle all 3 attributes that need to change at the same time
    // 'this' is set in the window creating a global variable within the function
    this.classList.toggle('open'); 
    this.classList.toggle('show');
    this.classList.toggle('disabled');
}

// this gives the primary toggle for the cards
// loop through cards array
for (let i = 0; i < cards.length; i++) {
    // add event listener to each card in cards array as it loops through the array of cards
    // pass 'displayCard' function to run when the click hapens
    cards[i].addEventListener('click', displayCard);
};

// Shuffle function "Knuth Shuffle"
function shuffle(array) {
    // modified var to let for ES6
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//   - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
//   - if the list already has another card, check to see if the two cards match
    // + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
    // + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
    // + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
    // + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)

