const phonemes = require('./phonemes');
const removeElements = require('./removeElements');
const createPage = require('./createPage');

document.addEventListener('DOMContentLoaded', function() {
	'use strict';
	document.body.onload =
	createPage.pageFrame();
	createPage.headerFrame();
	createPage.contentFrame();

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
	const tasks = ['Teach', 'Analyse'];
	let headText = 'Billy';

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
		heading.setAttribute('id', 'heading');
		heading.addEventListener('click', function() {
			removeElements.removeContent();
			addTasks();
		});
		document.getElementsByClassName('header')[0].appendChild(heading);
		setHeadingText('What to do');
	}

	function setHeadingText(text) {
		removeElements.removeHeadingText();
		let parentDiv = document.getElementById('heading');
		let textNode = document.createTextNode(text);
		parentDiv.appendChild(textNode);
		console.log(parentDiv, text);
	};
	addHeading();
	addTasks();

	function enterApp(task) {
		removeElements.removeContent();
		switch (task) {
			case 'teach':
			console.log(task);
			setHeadingText(task);
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
		setHeadingText(card);
		let phoneme = document.createElement('div');
		phoneme.setAttribute('id', 'flashcard');
		phoneme.addEventListener('click', function() {
			nextCard();
		});
		let grapheme = document.createTextNode(card[cardNumber]);
		phoneme.appendChild(grapheme);
		removeElements.removeContent();
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
