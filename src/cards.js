const phonemes = require('./phonemes');
const createPage = require('./createPage');
const removeElements = require('./removeElements');
const cards = {
	cardSet: [],
	cardNumber: 0,
	flashCardSet: function(set) {
		this.cardSet.length = 0;
		for (let sound in phonemes) {
			if (phonemes[sound].JollyPhonics === parseInt(set))
			this.cardSet.push(phonemes[sound].grapheme.main);
		}
		return this.cardSet;
	},

	cardDecks: function() {
		let _self = this;
		for(let i = 1; i < 8; i++) {
			let deck = document.createElement('button');
			let deckLabel = document.createTextNode('Set '+i);
			deck.setAttribute('class', 'card-deck');
			deck.setAttribute('id', i);
			deck.appendChild(deckLabel);
			deck.addEventListener('click', function() {
				_self.createFlashCard(this.id);
			});
			document.getElementsByClassName('content')[0].appendChild(deck);
		};
	},

	createFlashCard: function(setID) {
		let _self = this;
		let card = this.flashCardSet(setID);
		createPage.setHeadingText('Phase ' + setID);
		let phoneme = document.createElement('div');
		phoneme.setAttribute('id', 'flashcard');
		phoneme.addEventListener('click', function() {
			_self.nextCard();
		});
		let grapheme = document.createTextNode(card[this.cardNumber]);
		phoneme.appendChild(grapheme);
		removeElements.removeContent();
		document.getElementsByClassName('content')[0].appendChild(phoneme);
	},

	nextCard: function() {
		let deckSize = this.cardSet.length;
		if (this.cardNumber === deckSize-1) {
			this.cardNumber = 0;
		} else {
			this.cardNumber++;
		};
		let card = document.getElementById('flashcard');
		let grapheme = document.createTextNode(this.cardSet[this.cardNumber]);
		card.replaceChild(grapheme, card.childNodes[0]);
	},
};
module.exports = cards;
