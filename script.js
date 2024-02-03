'use strict';
// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0')
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const winner = document.querySelector('#winner');



score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores, currentScore, activePlayer, playing;
const init = ()=>{
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    winner.textContent = '';

    diceEl.classList.add('hidden');
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
}
init();

const switchPlayer = () =>{
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
        currentScore = 0;
        document.querySelector('.player--0').classList.toggle('player--active');
        document.querySelector('.player--1').classList.toggle('player--active');
        activePlayer = activePlayer === 0 ? 1 : 0;
}

btnRoll.addEventListener('click', () =>{
    if (playing){ 
        const dice = Math.trunc(Math.random() * 6) + 1
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
      
        
        if(dice !== 1){
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        }
        else{
            switchPlayer()
        }

    }
   
} )

btnHold.addEventListener('click', () => {
    if(playing){
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];


        if(scores[activePlayer] >= 100){
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            winner.textContent = `Player ${activePlayer + 1} is the winner 🎉`;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            diceEl.classList.add('hidden');

        }
        else{
            switchPlayer()
        }
    }
    
})

btnNew.addEventListener('click', init);


