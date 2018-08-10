// card grabs all of the li's with class 'card'
let card = document.getElementsByClassName('card');
// cards uses the spread operator to represent all of the possible array elements
let cards = [...card];
console.log(cards);
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

// stars li
let starsList = document.querySelectorAll('.stars li');

// declare timeout variable to be used on timeout function
let timeout, interval;

// select restart button
const restart = document.querySelector('.restart');

// set modal variable
let modal = document.getElementById('window');

// close icon for modal popup box
let closeIcon = document.querySelector('.close');

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
    clearTimeout(timeout);
    openedCards = [];
    cards = shuffle(cards);
    // loop through for the length of the shuffled cards array
    for (let i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item){
            deck.appendChild(item);
        });
        cards[i].classList.remove('show', 'open', 'match', 'disabled', 'unmatched');
    }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    // reset star rating
    for (let i = 0; i < stars.length; i++){
        stars[i].classList.add('fa-star');
        stars[1].classList.remove('silver');
        stars[2].classList.remove('silver');
        stars[2].classList.remove('bronze');
    }
    // reset timer
    let timer = document.querySelector('.timer');
    timer.innerHTML = '0 hours 0 minutes 0 seconds';
    clearInterval(interval);
}

// triggers the 'startGame' function on body load
document.body.onload = startGame();

// event listener for restart button, calls startGame function
restart.addEventListener('click', startGame);

// toggle classes when card is displayed
const displayCard = function(){
    this.classList.toggle('open'); 
    this.classList.toggle('show');
    this.classList.toggle('disabled');
}

// loop through cards and add event listeners to each card
for (let i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener('click', displayCard);
    card.addEventListener('click', cardOpen);
    card.addEventListener('click', congrats);
};

// event listener for cards
for (let i = 0; i < cards.length; i++){
    cards[i].addEventListener('click', displayCard);
};

// function to determine card state
function cardOpen(){
    openedCards.push(this);
    let cardNumber = openedCards.length;
    if (cardNumber === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type) {
            matched();
        } else {
            unmatched();
        }
    }
}

// matched card function
function matched(){
    openedCards[0].classList.add('match', 'disabled');
    openedCards[1].classList.add('match', 'disabled');
    openedCards[0].classList.remove('show', 'open');
    openedCards[1].classList.remove('show', 'open');
    openedCards = [];
}

// unmatched card function
function unmatched(){
    openedCards[0].classList.add('unmatched');
    openedCards[1].classList.add('unmatched');
    disable();
    timeout = setTimeout(function(){
        openedCards[0].classList.remove('show', 'open', 'unmatched');
        openedCards[1].classList.remove('show', 'open', 'unmatched');
        enable();
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

// move counter
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    if (moves ===1){
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    // star rating based on moves inside moveCounter function
    if (moves > 8 && moves < 16){
        for (let i = 0; i < 3; i++){
            if(i === 0){
                stars[i].classList.remove('fa-star');
                stars[2].classList.add('silver');
                stars[1].classList.add('silver');
            }
        }
    } else if (moves >= 16){
        for (let i = 0; i <3; i++){
            if(i === 1){
                stars[i].classList.remove('fa-star');       
                stars[2].classList.remove('silver');
                stars[2].classList.add('bronze');   
            }
        }
    }
}

// game timer
let second = 0, minute = 0, hour = 0;
let timer = document.querySelector('.timer');
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = `${hour} hours ${minute} minutes ${second} seconds`;
        second++
        if(second === 60){
            minute++;
            second = 0;
        }
        if(minute === 60){
            hour++;
            minute = 0;
        }
        
    }, 1000);
}

// congrats modal
function congrats(){
    if(matchedCard.length === 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;
        // show congrats
        modal.classList.add('show');
        // star rating
        let starRating = document.querySelector('.stars').innerHTML;
        // display the stats
        document.getElementById('finalMove').innerHTML = moves;
        document.getElementById('starRating').innerHTML = starRating;
        document.getElementById('totalTime').innerHTML = finalTime;
        // close modal
        closeModal();
    };
}

// close modal function
function closeModal(){
    closeIcon.addEventListener('click', function(e){
    modal.classList.remove('show');
    });
}

// play again function for modal
function playAgain(){
    modal.classList.remove('show');
    startGame();
}