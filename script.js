//set score
let pWins = 0;
let cWins = 0;

//prep DOM elements
const pWinCount = document.createElement('span');
const cWinCount = document.createElement('span');
pWinCount.classList.add('wincount');
cWinCount.classList.add('wincount');

const body = document.querySelector('body');
const modal = document.querySelector('#modal');
const gameEndMessage = modal.querySelector('#game-end p');
const restartBtn = modal.querySelector('#restart');
const closeBtn = modal.querySelector('#close');
const playContainer = document.querySelector('#playcontainer')
const gameWindow = document.querySelector('.rules-result-container');
const turnResultText = gameWindow.querySelector('.turn-result');
const rules = document.querySelector('#rules')

restartBtn.addEventListener('click', () => window.location.reload());
closeBtn.addEventListener('click', () => {
	modal.style.display = 'none';
	playContainer.style.display = 'none';
});

//RNG computer play
function computerPlay() {
	numGen = Math.floor(Math.random() * 3);
	switch (true) {
		case numGen === 2:
			return 'rock';
		case numGen === 1:
			return 'paper';
		default:
			return 'scissors';
	}
}

function playRound(playerSelection, computerSelection) {
	let result;
	rules.remove();

	turnResultText.textContent = `You throw ${playerSelection}. Computer throws ${computerSelection}.`;
	
	const resultContainer = document.createElement('div');
	resultContainer.id = 'result';

	if (playerSelection === computerSelection) {
		result = `It's a tie!`;
	} else if (playerSelection === 'rock') {
		if (computerSelection === 'scissors') {
			pWins++;
			result = 'You win! Rock crushes scissors.';
		} else {
			cWins++;
			result = 'You lose. Paper covers rock.';
		}
	} else if (playerSelection === 'paper') {
		if (computerSelection === 'rock') {
			pWins++;
			result = 'You win! Paper covers rock.';
		} else {
			cWins++;
			result = 'You lose. Scissors cut paper.';
		}
	} else if (playerSelection === 'scissors') {
		if (computerSelection === 'paper') {
			pWins++;
			result = 'You win! Scissors cut paper.';
		} else {
			cWins++;
			result = 'You lose. Rock crushes scissors.';
		}
	} else {
		return 'error';
	}

	resultContainer.textContent = result;
	if (document.querySelector('#result')){
		gameWindow.removeChild(document.querySelector('#result'))
	}
	gameWindow.insertBefore(resultContainer, gameWindow.lastChild);
	//log the current win count
	pWinCount.textContent = `Your wins: ${pWins}`;
	cWinCount.textContent = `Computer wins: ${cWins}`;
	
	const resultCounter = document.createElement('div');
	resultCounter.id = 'resultcounter';
	
	gameWindow.appendChild(resultCounter);
	resultCounter.appendChild(pWinCount);
	resultCounter.appendChild(cWinCount);
	
	//win and lose condition with a reload to try again
	if (pWins == 5) {
		gameEndMessage.textContent = `You win, ${pWins} to ${cWins}! Rematch?`;
		modal.style.display = 'block';
	}
	if (cWins == 5) {
		gameEndMessage.textContent = `You lose, ${pWins} to ${cWins}. Try again?`;
		modal.style.display = 'block';
	}
}

//player selection, and begin the game.
const icons = document.querySelectorAll('.icon');
[...icons].forEach((item) => {
	item.addEventListener('click', (e) => {
		const playerSel = e.currentTarget.getAttribute('data-key');
		playRound(playerSel, computerPlay());
	});
});
