const phonemes = require('./phonemes.js');
const removeContent = require('./removeContent.js');
document.addEventListener('DOMContentLoaded', function() {
	'use strict';
	document.body.onload = createPage();

	// if('serviceWorker' in navigator) {
	// 	navigator.serviceWorker
	// 	.register('sw.js')
	// 	.then(function() {
	// 		console.log('Service Worker Registered');
	// 	}).catch(function(err) {
	// 		console.log('Failed to register Service Worker');
	// 	});
	// }

	const cardSet = [];
	let cardNumber = 0;

	function createPage() {
		const tasks = ['Teach', 'Assess', 'Analyse'];
		function pageFrame() {
			let outerDiv = document.createElement('div');
			outerDiv.setAttribute('class', 'container');
			document.body.appendChild(outerDiv);
		}

		function headerFrame() {
			let headerDiv = document.createElement('div');
			headerDiv.setAttribute('class', 'header');
			document.getElementsByClassName('container')[0].appendChild(headerDiv);
		}

		function contentFrame() {
			let contentDiv = document.createElement('div');
			contentDiv.setAttribute('class', 'content');
			document.getElementsByClassName('container')[0].appendChild(contentDiv);
		}

		function addTasks() {
			tasks.forEach(function(task) {
				let link = document.createElement('button');
				let linkText = document.createTextNode(task);
				link.setAttribute('id', task.toLowerCase());
				link.addEventListener('click', function() {
					enterApp(this.id);
				});
				link.appendChild(linkText);
				document.getElementsByClassName('content')[0].appendChild(link);
			});
		}

		function addHeading() {
			let heading = document.createElement('h1');
			let whatDoYouWantToDo =
			document.createTextNode('Flashcards with a memory');
			heading.addEventListener('click', function() {
				removeContent();
				addTasks();
			});
			heading.appendChild(whatDoYouWantToDo);
			document.getElementsByClassName('header')[0].appendChild(heading);
		}
		pageFrame();
		headerFrame();
		contentFrame();
		addHeading();
		addTasks();
	};

	function enterApp(task) {
		removeContent();
		switch (task) {
			case 'teach':
			console.log(task);
			cardDecks();
			break;
			case 'assess':
			console.log(task);
			createAssessmentCards();
			break;
			case 'Analyse':
			default:
		}
	}

	function cardDecks() {
		for(let i = 1; i < 8; i++) {
			let deck = document.createElement('div');
			let deckLabel = document.createTextNode('Set '+i);
			deck.setAttribute('class', 'card-deck');
			deck.setAttribute('id', i);
			deck.appendChild(deckLabel);
			deck.addEventListener('click', function() {
				createFlashCard(this.id);
			});
			document.getElementsByClassName('content')[0].appendChild(deck);
		};
	}

	function createFlashCard(setID) {
		let card = flashCardSet(setID);
		let phoneme = document.createElement('div');
		phoneme.setAttribute('id', 'flashcard');
		phoneme.addEventListener('click', function() {
			nextCard();
		});
		let grapheme = document.createTextNode(card[cardNumber]);
		phoneme.appendChild(grapheme);
		removeContent();
		document.getElementsByClassName('content')[0].appendChild(phoneme);
	};

	function createAssessmentCards() {
		let phoneme = document.createElement('div');
		let grapheme = document.createTextNode('a');
		phoneme.appendChild(grapheme);
		document.getElementsByClassName('content')[0].appendChild(phoneme);
	};


	function nextCard() {
		let deckSize = cardSet.length;
		if (cardNumber === deckSize-1) {
			cardNumber = 0;
		} else {
			cardNumber++;
			};
		let card = document.getElementById('flashcard');
		let grapheme = document.createTextNode(cardSet[cardNumber]);
		card.replaceChild(grapheme, card.childNodes[0]);
	}

	let flashCardSet = function(set) {
		cardSet.length = 0;
		for (let sound in phonemes) {
			if (phonemes[sound].JollyPhonics === parseInt(set))
			cardSet.push(phonemes[sound].grapheme.main);
		}
		console.log(cardSet);
		return cardSet;
	};
});
