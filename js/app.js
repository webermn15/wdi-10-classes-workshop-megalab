console.log('Prepare for battle');

//built a player ship object
const playerShip = {
	playerName: '',
	shipName: 'USS Schwarzenegger',
	hull: 20,
	firepower: 5,
	accuracy: 0.7
}


//built a valueless alien ships object that will serve as the template for each alien ship
const alienShips = {
	name: 'Destroyer',
	hull: 0,
	firepower: 0,
	accuracy: 0
}


//created a gameplay object to house gameplay related information and processes
const gamePlay = {

	//alien ships left in play
	shipsRemaining: 6,

	//function that randomizes alien stats before each space battle
	randomizeAlien() {
		alienShips.hull = Math.floor(Math.random()*(6-3+1)+3);
		alienShips.firepower = Math.floor(Math.random()*(4-2+1)+2);
		alienShips.accuracy = (Math.floor(Math.random()*(8-6+1)+6) / 10);
		console.log(alienShips);
	},

	//prompt that displays when the game starts explaining the game to the player and getting their name
	introPrompt() {
		let begin = prompt('Good to have you on board, captain... what was your name again?');
		playerShip.playerName = begin;
		if (begin !== null && begin !== '') {
			alert("Captain "+playerShip.playerName+"! We've located the alien forces! But their formation is strange... they're lined up one by one instead of fanning out to flank. Shall we engage?");
			this.randomizeAlien();
			this.playerBattle();
		}
		else {
			this.introPrompt();
		}
	},

	//player battle logic function
	playerBattle() {
		console.log('Player hull: '+playerShip.hull+'  |  Player max damage: '+playerShip.firepower+'  |  Player accuracy: '+playerShip.accuracy);
		let hitOrMiss = Math.random();
		let playerDamage = Math.floor(Math.random()*(playerShip.firepower - 3 + 1) + 3);
		console.log('You deal: '+playerDamage+' damage.'	);
		alert('You fire at the enemy ship!');
		if (hitOrMiss > playerShip.accuracy) {
			alert('Your blasters missed! The alien ship is preparing a counter attack!');
			this.alienBattle();
		}
		else {
			if (playerDamage < alienShips.hull) {
				alienShips.hull -= playerDamage;
				alert('You land a direct hit, dealing '+playerDamage+' damage! The alien ship is still operational!');
				this.alienBattle();
			}
			else if (playerDamage >= alienShips.hull) {
				this.shipsRemaining--;
				alert('Your firepower is too much for the alien cruiser! You deal '+playerDamage+' damage to the enemy. It\'s hull crumbles under your laser fire, destroying it!');
				if (this.shipsRemaining > 0) {
					this.continuePrompt();
				}
				else {
					alert('You brace for the alien\'s return fire... but nothing happens. The last of the alien ships is disabled! You have successfully defended humanity!');
					this.endPrompt();
				}
			}
		}
	},

	//alien battle logic function
	alienBattle() {
		let hitOrMiss = Math.random();
		let alienDamage = Math.floor(Math.random()*(alienShips.firepower - 2 + 1) + 2);
		if (hitOrMiss > alienShips.accuracy) {
			alert('The alien ship fires, but your evasive maneuvers are too quick! Their attacks miss!');
			this.playerBattle();
		}
		else {
			if (alienDamage < playerShip.hull) {
				playerShip.hull -= alienDamage;
				alert('The alien\'s laser scores a direct hit on '+playerShip.shipName+'... your hull loses '+alienDamage+' armor!');
				this.playerBattle();
			}
			else if (alienDamage >= playerShip.hull) {
				alert("'There are too many of them!!', an ensign cries in terror. Your ship disabled, you can only grimace and watch as the alien weapons rain hell down upon you and your crew. Your shields fail. Your hull crumbles. The cold vaccuum of space tears into your ship, and you are destroyed.");
				this.endPrompt();
			}
		}
	},

	//battle prompt function
	battlePrompt() {
		alert('Another alien ship approaches!');
		this.randomizeAlien();
		this.playerBattle();

	},
	//function that prompts the player to keep fighting or retreat
	continuePrompt() {
		let keepGoingPrompt = confirm('There are '+this.shipsRemaining+' left in the alien fleet. Keep fighting or retreat? OK to keep fighting | CANCEL to retreat');
		keepGoingPrompt ? this.battlePrompt() : this.retreatPrompt();
	},

	//retreat prompt
	retreatPrompt() {
		alert('You run away like a baby! You bring shame to earth.');
	},

	//Prompts the player to start over from the intro again
	endPrompt() {
		let tryAgain = confirm('Try again?');
		tryAgain ? this.introPrompt() : alert('Thanks for playing!');
	}
}






























