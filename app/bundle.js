(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var removeElements = require('./removeElements');
var createPage = require('./createPage');
var cards = require('./cards');

document.addEventListener('DOMContentLoaded', function () {
	'use strict';

	document.body.onload = createPage.pageFrame();
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

	var tasks = ['Teach', 'Analyse'];

	function addTasks() {
		tasks.forEach(function (task) {
			var link = document.createElement('button');
			var linkText = document.createTextNode(task);
			link.setAttribute('id', task.toLowerCase());
			link.addEventListener('click', function () {
				enterApp(this.id);
			});
			link.appendChild(linkText);
			document.getElementsByClassName('content')[0].appendChild(link);
		});
	}

	function addHeading() {
		var heading = document.createElement('h1');
		heading.setAttribute('id', 'heading');
		heading.addEventListener('click', function () {
			removeElements.removeContent();
			addTasks();
			createPage.setHeadingText('What to do?');
		});
		document.getElementsByClassName('header')[0].appendChild(heading);
		createPage.setHeadingText('What to do');
	}

	addHeading();
	addTasks();

	function enterApp(task) {
		removeElements.removeContent();
		switch (task) {
			case 'teach':
				createPage.setHeadingText(task);
				cards.cardDecks();
				break;
			case 'assess':
				createAssessmentCards();
				break;
			case 'Analyse':
			default:
		}
	}

	function createAssessmentCards() {
		var phoneme = document.createElement('div');
		var grapheme = document.createTextNode('a');
		phoneme.appendChild(grapheme);
		document.getElementsByClassName('content')[0].appendChild(phoneme);
	};
});

},{"./cards":2,"./createPage":3,"./removeElements":5}],2:[function(require,module,exports){
'use strict';

var phonemes = require('./phonemes');
var createPage = require('./createPage');
var removeElements = require('./removeElements');
var cards = {
	cardSet: [],
	cardNumber: 0,
	flashCardSet: function flashCardSet(set) {
		this.cardSet.length = 0;
		for (var sound in phonemes) {
			if (phonemes[sound].JollyPhonics === parseInt(set)) this.cardSet.push(phonemes[sound].grapheme.main);
		}
		return this.cardSet;
	},

	cardDecks: function cardDecks() {
		var _self = this;
		for (var i = 1; i < 8; i++) {
			var deck = document.createElement('button');
			var deckLabel = document.createTextNode('Set ' + i);
			deck.setAttribute('class', 'card-deck');
			deck.setAttribute('id', i);
			deck.appendChild(deckLabel);
			deck.addEventListener('click', function () {
				console.log(this.id);
				_self.createFlashCard(this.id);
			});
			document.getElementsByClassName('content')[0].appendChild(deck);
		};
	},

	createFlashCard: function createFlashCard(setID) {
		var _self = this;
		var card = this.flashCardSet(setID);
		createPage.setHeadingText('Phase ' + setID);
		var phoneme = document.createElement('div');
		phoneme.setAttribute('id', 'flashcard');
		phoneme.addEventListener('click', function () {
			_self.nextCard();
		});
		var grapheme = document.createTextNode(card[this.cardNumber]);
		phoneme.appendChild(grapheme);
		removeElements.removeContent();
		document.getElementsByClassName('content')[0].appendChild(phoneme);
	},

	nextCard: function nextCard() {
		var deckSize = this.cardSet.length;
		if (this.cardNumber === deckSize - 1) {
			this.cardNumber = 0;
		} else {
			this.cardNumber++;
		};
		var card = document.getElementById('flashcard');
		var grapheme = document.createTextNode(this.cardSet[this.cardNumber]);
		card.replaceChild(grapheme, card.childNodes[0]);
	}
};
module.exports = cards;

},{"./createPage":3,"./phonemes":4,"./removeElements":5}],3:[function(require,module,exports){
'use strict';

var removeElements = require('./removeElements');
var createPage = {
	pageFrame: function pageFrame() {
		var outerDiv = document.createElement('div');
		outerDiv.setAttribute('class', 'container');
		document.body.appendChild(outerDiv);
	},

	headerFrame: function headerFrame() {
		var headerDiv = document.createElement('div');
		headerDiv.setAttribute('class', 'header');
		document.getElementsByClassName('container')[0].appendChild(headerDiv);
	},

	contentFrame: function contentFrame() {
		var contentDiv = document.createElement('div');
		contentDiv.setAttribute('class', 'content');
		document.getElementsByClassName('container')[0].appendChild(contentDiv);
	},

	setHeadingText: function setHeadingText(text) {
		removeElements.removeHeadingText();
		var parentDiv = document.getElementById('heading');
		var textNode = document.createTextNode(text);
		parentDiv.appendChild(textNode);
	},

	removeContent: function removeContent() {
		var children = document.getElementsByClassName('content');
		while (children[0].firstChild) {
			children[0].removeChild(children[0].firstChild);
		}
	},
	removeHeadingText: function removeHeadingText() {
		var headText = document.getElementById('heading');
		while (headText.firstChild) {
			headText.removeChild(headText.firstChild);
		}
	}
};

module.exports = createPage;

},{"./removeElements":5}],4:[function(require,module,exports){
'use strict';

var phonemes = {
  'Long oo': {
    'JollyPhonics': 5,
    'grapheme': {
      'main': 'oo'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 7,
    'phoneme': 'oo',
    'type': 2,
    'vowel': true
  },
  'a': {
    'JollyPhonics': 1,
    'grapheme': {
      'main': 'a'
    },
    'lettersAndSoundsPhases': 2,
    'lettersAndSoundsSets': 1,
    'phoneme': 'a',
    'type': 1,
    'vowel': true
  },
  'ae': {
    'JollyPhonics': 4,
    'grapheme': {
      'main': 'ae'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 7,
    'phoneme': 'ae',
    'type': 2,
    'vowel': true
  },
  'air': {
    'JollyPhonics': 7,
    'grapheme': {
      'main': 'air'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 7,
    'phoneme': 'air',
    'type': 3,
    'vowel': true
  },
  'ar': {
    'JollyPhonics': 7,
    'grapheme': {
      'main': 'ar'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 7,
    'phoneme': 'ar',
    'type': 2,
    'vowel': true
  },
  'b': {
    'JollyPhonics': 3,
    'grapheme': {
      'main': 'b'
    },
    'lettersAndSoundsPhases': 2,
    'lettersAndSoundsSets': 5,
    'phoneme': 'b',
    'type': 1,
    'vowel': false
  },
  'ch': {
    'JollyPhonics': 6,
    'grapheme': {
      'main': 'ch'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 7,
    'phoneme': 'ch',
    'type': 2,
    'vowel': false
  },
  'd': {
    'JollyPhonics': 2,
    'grapheme': {
      'alt1': 'dd',
      'alt2': 'ed',
      'main': 'd'
    },
    'lettersAndSoundsPhases': 2,
    'lettersAndSoundsSets': 2,
    'phoneme': 'd',
    'type': 1,
    'vowel': false
  },
  'e': {
    'JollyPhonics': 2,
    'grapheme': {
      'main': 'e'
    },
    'lettersAndSoundsPhases': 2,
    'lettersAndSoundsSets': 4,
    'phoneme': 'e',
    'type': 1,
    'vowel': true
  },
  'ear': {
    'JollyPhonics': 7,
    'grapheme': {
      'main': 'ear'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 7,
    'phoneme': 'ear',
    'type': 3,
    'vowel': true
  },
  'ee': {
    'JollyPhonics': 4,
    'grapheme': {
      'main': 'ee'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 7,
    'phoneme': 'ee',
    'type': 2,
    'vowel': true
  },
  'er': {
    'JollyPhonics': 7,
    'grapheme': {
      'main': 'er'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 7,
    'phoneme': 'er',
    'type': 2,
    'vowel': true
  },
  'f': {
    'JollyPhonics': 3,
    'grapheme': {
      'main': 'f'
    },
    'lettersAndSoundsPhases': 2,
    'lettersAndSoundsSets': 5,
    'phoneme': 'f',
    'type': 1,
    'vowel': false
  },
  'g': {
    'JollyPhonics': 3,
    'grapheme': {
      'main': 'g'
    },
    'lettersAndSoundsPhases': 2,
    'lettersAndSoundsSets': 3,
    'phoneme': 'g',
    'type': 1,
    'vowel': false
  },
  'h': {
    'JollyPhonics': 2,
    'grapheme': {
      'main': 'h'
    },
    'lettersAndSoundsPhases': 2,
    'lettersAndSoundsSets': 5,
    'phoneme': 'h',
    'type': 1,
    'vowel': false
  },
  'i': {
    'JollyPhonics': 1,
    'grapheme': {
      'main': 'i'
    },
    'lettersAndSoundsPhases': 2,
    'lettersAndSoundsSets': 2,
    'phoneme': 'i',
    'type': 1,
    'vowel': true
  },
  'igh': {
    'JollyPhonics': 4,
    'grapheme': {
      'main': 'igh'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 7,
    'phoneme': 'igh',
    'type': 2,
    'vowel': true
  },
  'j': {
    'JollyPhonics': 4,
    'grapheme': {
      'main': 'j'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 6,
    'phoneme': 'j',
    'type': 1,
    'vowel': false
  },
  'k': {
    'JollyPhonics': 2,
    'grapheme': {
      'main': 'k'
    },
    'lettersAndSoundsPhases': 2,
    'lettersAndSoundsSets': 3,
    'phoneme': 'k',
    'type': 1,
    'vowel': false
  },
  'ks': {
    'JollyPhonics': 6,
    'grapheme': {
      'main': 'ks'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 7,
    'phoneme': 'ks',
    'type': 1,
    'vowel': false
  },
  'kw': {
    'JollyPhonics': 7,
    'grapheme': {
      'main': 'kw'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 7,
    'phoneme': 'kw',
    'type': 2,
    'vowel': false
  },
  'l': {
    'JollyPhonics': 3,
    'grapheme': {
      'main': 'l'
    },
    'lettersAndSoundsPhases': 2,
    'lettersAndSoundsSets': 5,
    'phoneme': 'l',
    'type': 1,
    'vowel': false
  },
  'long th': {
    'JollyPhonics': 6,
    'grapheme': {
      'main': 'th'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 7,
    'phoneme': 'th',
    'type': 2,
    'vowel': false
  },
  'm': {
    'JollyPhonics': 2,
    'grapheme': {
      'alt1': 'mm',
      'alt2': 'mb',
      'alt3': 'mn',
      'alt4': 'lm',
      'main': 'm'
    },
    'lettersAndSoundsPhases': 2,
    'lettersAndSoundsSets': 2,
    'phoneme': 'm',
    'type': 1,
    'vowel': false
  },
  'n': {
    'JollyPhonics': 1,
    'grapheme': {
      'alt1': 'nn',
      'alt2': 'kn',
      'alt3': 'gn',
      'alt4': 'pn',
      'main': 'n'
    },
    'lettersAndSoundsPhases': 2,
    'lettersAndSoundsSets': 2,
    'phoneme': 'n',
    'type': 1,
    'vowel': false
  },
  'ng': {
    'JollyPhonics': 5,
    'grapheme': {
      'main': 'ng'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 7,
    'phoneme': 'ng',
    'type': 2,
    'vowel': false
  },
  'o': {
    'JollyPhonics': 3,
    'grapheme': {
      'main': 'o'
    },
    'lettersAndSoundsPhases': 2,
    'lettersAndSoundsSets': 3,
    'phoneme': 'o',
    'type': 1,
    'vowel': true
  },
  'oa': {
    'JollyPhonics': 4,
    'grapheme': {
      'main': 'oa'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 7,
    'phoneme': 'oa',
    'type': 2,
    'vowel': true
  },
  'oi': {
    'JollyPhonics': 7,
    'grapheme': {
      'main': 'oi'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 7,
    'phoneme': 'oi',
    'type': 2,
    'vowel': true
  },
  'oo': {
    'JollyPhonics': 5,
    'grapheme': {
      'main': 'oo'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 7,
    'phoneme': 'oo',
    'type': 2,
    'vowel': true
  },
  'or': {
    'JollyPhonics': 4,
    'grapheme': {
      'main': 'or'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 7,
    'phoneme': 'or',
    'type': 2,
    'vowel': true
  },
  'ow': {
    'JollyPhonics': 7,
    'grapheme': {
      'main': 'ow'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 7,
    'phoneme': 'ow',
    'type': 2,
    'vowel': true
  },
  'p': {
    'JollyPhonics': 1,
    'grapheme': {
      'alt1': 'pp',
      'main': 'p'
    },
    'lettersAndSoundsPhases': 2,
    'lettersAndSoundsSets': 1,
    'phoneme': 'p',
    'type': 1,
    'vowel': false
  },
  'r': {
    'JollyPhonics': 2,
    'grapheme': {
      'main': 'r'
    },
    'lettersAndSoundsPhases': 2,
    'lettersAndSoundsSets': 4,
    'phoneme': 'r',
    'type': 1,
    'vowel': false
  },
  's': {
    'JollyPhonics': 1,
    'grapheme': {
      'alt1': 'ss',
      'alt2': 'c',
      'alt3': 'sc',
      'alt4': 'ps',
      'alt5': 'st',
      'alt6': 'ce',
      'alt7': 'se',
      'main': 's'
    },
    'lettersAndSoundsPhases': 2,
    'lettersAndSoundsSets': 1,
    'phoneme': 's',
    'type': 1,
    'vowel': false
  },
  'sh': {
    'JollyPhonics': 6,
    'grapheme': {
      'main': 'sh'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 7,
    'phoneme': 'sh',
    'type': 2,
    'vowel': false
  },
  't': {
    'JollyPhonics': 1,
    'grapheme': {
      'alt1': 'tt',
      'alt2': 'th',
      'alt3': 'ed',
      'main': 't'
    },
    'lettersAndSoundsPhases': 2,
    'lettersAndSoundsSets': 1,
    'phoneme': 't',
    'type': 1,
    'vowel': false
  },
  'th': {
    'JollyPhonics': 6,
    'grapheme': {
      'main': 'th'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 7,
    'phoneme': 'th',
    'type': 2,
    'vowel': false
  },
  'u': {
    'JollyPhonics': 3,
    'grapheme': {
      'main': 'u'
    },
    'lettersAndSoundsPhases': 2,
    'lettersAndSoundsSets': 4,
    'phoneme': 'u',
    'type': 1,
    'vowel': true
  },
  'ue': {
    'JollyPhonics': 7,
    'grapheme': {
      'main': 'ue'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 7,
    'phoneme': 'ue',
    'type': 2,
    'vowel': true
  },
  'ur': {
    'JollyPhonics': 7,
    'grapheme': {
      'main': 'ur'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 7,
    'phoneme': 'ur',
    'type': 2,
    'vowel': true
  },
  'ure': {
    'JollyPhonics': 7,
    'grapheme': {
      'main': 'ure'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 7,
    'phoneme': 'ure',
    'type': 3,
    'vowel': false
  },
  'v': {
    'JollyPhonics': 5,
    'grapheme': {
      'main': 'v'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 6,
    'phoneme': 'v',
    'type': 1,
    'vowel': false
  },
  'w': {
    'JollyPhonics': 5,
    'grapheme': {
      'main': 'w'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 6,
    'phoneme': 'w',
    'type': 1,
    'vowel': false
  },
  'y': {
    'JollyPhonics': 6,
    'grapheme': {
      'main': 'y'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 7,
    'phoneme': 'y',
    'type': 1,
    'vowel': false
  },
  'z': {
    'JollyPhonics': 5,
    'grapheme': {
      'main': 'z'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 7,
    'phoneme': 'z',
    'type': 1,
    'vowel': false
  },
  'zh': {
    'JollyPhonics': 7,
    'grapheme': {
      'main': 'zh'
    },
    'lettersAndSoundsPhases': 3,
    'lettersAndSoundsSets': 7,
    'phoneme': 'zh',
    'type': 2,
    'vowel': false
  }
};
module.exports = phonemes;

},{}],5:[function(require,module,exports){
'use strict';

var removeElements = {
	removeContent: function removeContent() {
		var children = document.getElementsByClassName('content');
		while (children[0].firstChild) {
			children[0].removeChild(children[0].firstChild);
		}
	},
	removeHeadingText: function removeHeadingText() {
		var headText = document.getElementById('heading');
		while (headText.firstChild) {
			headText.removeChild(headText.firstChild);
		}
	}
};
module.exports = removeElements;

},{}]},{},[1,2,3,4,5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2NhcmRzLmpzIiwic3JjL2NyZWF0ZVBhZ2UuanMiLCJzcmMvcGhvbmVtZXMuanMiLCJzcmMvcmVtb3ZlRWxlbWVudHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQU0saUJBQWlCLFFBQVEsa0JBQVIsQ0FBdkI7QUFDQSxJQUFNLGFBQWEsUUFBUSxjQUFSLENBQW5CO0FBQ0EsSUFBTSxRQUFRLFFBQVEsU0FBUixDQUFkOztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVc7QUFDeEQ7O0FBQ0EsVUFBUyxJQUFULENBQWMsTUFBZCxHQUNBLFdBQVcsU0FBWCxFQURBO0FBRUEsWUFBVyxXQUFYO0FBQ0EsWUFBVyxZQUFYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFNLFFBQVEsQ0FBQyxPQUFELEVBQVUsU0FBVixDQUFkOztBQUVBLFVBQVMsUUFBVCxHQUFvQjtBQUNuQixRQUFNLE9BQU4sQ0FBYyxVQUFTLElBQVQsRUFBZTtBQUM1QixPQUFJLE9BQU8sU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQVg7QUFDQSxPQUFJLFdBQVcsU0FBUyxjQUFULENBQXdCLElBQXhCLENBQWY7QUFDQSxRQUFLLFlBQUwsQ0FBa0IsSUFBbEIsRUFBd0IsS0FBSyxXQUFMLEVBQXhCO0FBQ0EsUUFBSyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixZQUFXO0FBQ3pDLGFBQVMsS0FBSyxFQUFkO0FBQ0EsSUFGRDtBQUdBLFFBQUssV0FBTCxDQUFpQixRQUFqQjtBQUNBLFlBQVMsc0JBQVQsQ0FBZ0MsU0FBaEMsRUFBMkMsQ0FBM0MsRUFBOEMsV0FBOUMsQ0FBMEQsSUFBMUQ7QUFDQSxHQVREO0FBVUE7O0FBRUQsVUFBUyxVQUFULEdBQXNCO0FBQ3JCLE1BQUksVUFBVSxTQUFT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K0I7QUFDOUIsWUFBUyxDQUFULEVBQVksV0FBWixDQUF3QixTQUFTLENBQVQsRUFBWSxVQUFwQztBQUNBO0FBQ0QsRUFOc0I7QUFPdEIsb0JBQW1CLDZCQUFXO0FBQzdCLE1BQUksV0FBVyxTQUFTLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBZjtBQUNBLFNBQU8sU0FBUyxVQUFoQixFQUE0QjtBQUMzQixZQUFTLFdBQVQsQ0FBcUIsU0FBUyxVQUE5QjtBQUNBO0FBQ0Q7QUFacUIsQ0FBdkI7QUFjQSxPQUFPLE9BQVAsR0FBaUIsY0FBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgcmVtb3ZlRWxlbWVudHMgPSByZXF1aXJlKCcuL3JlbW92ZUVsZW1lbnRzJyk7XG5jb25zdCBjcmVhdGVQYWdlID0gcmVxdWlyZSgnLi9jcmVhdGVQYWdlJyk7XG5jb25zdCBjYXJkcyA9IHJlcXVpcmUoJy4vY2FyZHMnKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdGRvY3VtZW50LmJvZHkub25sb2FkID1cblx0Y3JlYXRlUGFnZS5wYWdlRnJhbWUoKTtcblx0Y3JlYXRlUGFnZS5oZWFkZXJGcmFtZSgpO1xuXHRjcmVhdGVQYWdlLmNvbnRlbnRGcmFtZSgpO1xuXG5cdC8vIGlmKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IpIHtcblx0Ly8gXHRuYXZpZ2F0b3Iuc2VydmljZVdvcmtlclxuXHQvLyBcdC5yZWdpc3Rlcignc3cuanMnKVxuXHQvLyBcdC50aGVuKGZ1bmN0aW9uKCkge1xuXHQvLyBcdFx0Y29uc29sZS5sb2coJ1NlcnZpY2UgV29ya2VyIFJlZ2lzdGVyZWQnKTtcblx0Ly8gXHR9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcblx0Ly8gXHRcdGNvbnNvbGUubG9nKCdGYWlsZWQgdG8gcmVnaXN0ZXIgU2VydmljZSBXb3JrZXInKTtcblx0Ly8gXHR9KTtcblx0Ly8gfVxuXG5cdGNvbnN0IHRhc2tzID0gWydUZWFjaCcsICdBbmFseXNlJ107XG5cblx0ZnVuY3Rpb24gYWRkVGFza3MoKSB7XG5cdFx0dGFza3MuZm9yRWFjaChmdW5jdGlvbih0YXNrKSB7XG5cdFx0XHRsZXQgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRcdFx0bGV0IGxpbmtUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGFzayk7XG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaWQnLCB0YXNrLnRvTG93ZXJDYXNlKCkpO1xuXHRcdFx0bGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRlbnRlckFwcCh0aGlzLmlkKTtcblx0XHRcdH0pO1xuXHRcdFx0bGluay5hcHBlbmRDaGlsZChsaW5rVGV4dCk7XG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250ZW50JylbMF0uYXBwZW5kQ2hpbGQobGluayk7XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBhZGRIZWFkaW5nKCkge1xuXHRcdGxldCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcblx0XHRoZWFkaW5nLnNldEF0dHJpYnV0ZSgnaWQnLCAnaGVhZGluZycpO1xuXHRcdGhlYWRpbmcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdHJlbW92ZUVsZW1lbnRzLnJlbW92ZUNvbnRlbnQoKTtcblx0XHRcdGFkZFRhc2tzKCk7XG5cdFx0XHRjcmVhdGVQYWdlLnNldEhlYWRpbmdUZXh0KCdXaGF0IHRvIGRvPycpO1xuXHRcdH0pO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2hlYWRlcicpWzBdLmFwcGVuZENoaWxkKGhlYWRpbmcpO1xuXHRcdGNyZWF0ZVBhZ2Uuc2V0SGVhZGluZ1RleHQoJ1doYXQgdG8gZG8nKTtcblx0fVxuXG5cblx0YWRkSGVhZGluZygpO1xuXHRhZGRUYXNrcygpO1xuXG5cdGZ1bmN0aW9uIGVudGVyQXBwKHRhc2spIHtcblx0XHRyZW1vdmVFbGVtZW50cy5yZW1vdmVDb250ZW50KCk7XG5cdFx0c3dpdGNoICh0YXNrKSB7XG5cdFx0XHRjYXNlICd0ZWFjaCc6XG5cdFx0XHRjcmVhdGVQYWdlLnNldEhlYWRpbmdUZXh0KHRhc2spO1xuXHRcdFx0Y2FyZHMuY2FyZERlY2tzKCk7XG5cdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ2Fzc2Vzcyc6XG5cdFx0XHRjcmVhdGVBc3Nlc3NtZW50Q2FyZHMoKTtcblx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnQW5hbHlzZSc6XG5cdFx0XHRkZWZhdWx0OlxuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGNyZWF0ZUFzc2Vzc21lbnRDYXJkcygpIHtcblx0XHRsZXQgcGhvbmVtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGxldCBncmFwaGVtZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdhJyk7XG5cdFx0cGhvbmVtZS5hcHBlbmRDaGlsZChncmFwaGVtZSk7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGVudCcpWzBdLmFwcGVuZENoaWxkKHBob25lbWUpO1xuXHR9O1xufSk7XG4iLCJjb25zdCBwaG9uZW1lcyA9IHJlcXVpcmUoJy4vcGhvbmVtZXMnKTtcbmNvbnN0IGNyZWF0ZVBhZ2UgPSByZXF1aXJlKCcuL2NyZWF0ZVBhZ2UnKTtcbmNvbnN0IHJlbW92ZUVsZW1lbnRzID0gcmVxdWlyZSgnLi9yZW1vdmVFbGVtZW50cycpO1xuY29uc3QgY2FyZHMgPSB7XG5cdGNhcmRTZXQ6IFtdLFxuXHRjYXJkTnVtYmVyOiAwLFxuXHRmbGFzaENhcmRTZXQ6IGZ1bmN0aW9uKHNldCkge1xuXHRcdHRoaXMuY2FyZFNldC5sZW5ndGggPSAwO1xuXHRcdGZvciAobGV0IHNvdW5kIGluIHBob25lbWVzKSB7XG5cdFx0XHRpZiAocGhvbmVtZXNbc291bmRdLkpvbGx5UGhvbmljcyA9PT0gcGFyc2VJbnQoc2V0KSlcblx0XHRcdHRoaXMuY2FyZFNldC5wdXNoKHBob25lbWVzW3NvdW5kXS5ncmFwaGVtZS5tYWluKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuY2FyZFNldDtcblx0fSxcblxuXHRjYXJkRGVja3M6IGZ1bmN0aW9uKCkge1xuXHRcdGxldCBfc2VsZiA9IHRoaXM7XG5cdFx0Zm9yKGxldCBpID0gMTsgaSA8IDg7IGkrKykge1xuXHRcdFx0bGV0IGRlY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0XHRcdGxldCBkZWNrTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnU2V0ICcraSk7XG5cdFx0XHRkZWNrLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY2FyZC1kZWNrJyk7XG5cdFx0XHRkZWNrLnNldEF0dHJpYnV0ZSgnaWQnLCBpKTtcblx0XHRcdGRlY2suYXBwZW5kQ2hpbGQoZGVja0xhYmVsKTtcblx0XHRcdGRlY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5pZCk7XG5cdFx0XHRcdF9zZWxmLmNyZWF0ZUZsYXNoQ2FyZCh0aGlzLmlkKTtcblx0XHRcdH0pO1xuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGVudCcpWzBdLmFwcGVuZENoaWxkKGRlY2spO1xuXHRcdH07XG5cdH0sXG5cblx0Y3JlYXRlRmxhc2hDYXJkOiBmdW5jdGlvbihzZXRJRCkge1xuXHRcdGxldCBfc2VsZiA9IHRoaXM7XG5cdFx0bGV0IGNhcmQgPSB0aGlzLmZsYXNoQ2FyZFNldChzZXRJRCk7XG5cdFx0Y3JlYXRlUGFnZS5zZXRIZWFkaW5nVGV4dCgnUGhhc2UgJyArIHNldElEKTtcblx0XHRsZXQgcGhvbmVtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdHBob25lbWUuc2V0QXR0cmlidXRlKCdpZCcsICdmbGFzaGNhcmQnKTtcblx0XHRwaG9uZW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRfc2VsZi5uZXh0Q2FyZCgpO1xuXHRcdH0pO1xuXHRcdGxldCBncmFwaGVtZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNhcmRbdGhpcy5jYXJkTnVtYmVyXSk7XG5cdFx0cGhvbmVtZS5hcHBlbmRDaGlsZChncmFwaGVtZSk7XG5cdFx0cmVtb3ZlRWxlbWVudHMucmVtb3ZlQ29udGVudCgpO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbnRlbnQnKVswXS5hcHBlbmRDaGlsZChwaG9uZW1lKTtcblx0fSxcblxuXHRuZXh0Q2FyZDogZnVuY3Rpb24oKSB7XG5cdFx0bGV0IGRlY2tTaXplID0gdGhpcy5jYXJkU2V0Lmxlbmd0aDtcblx0XHRpZiAodGhpcy5jYXJkTnVtYmVyID09PSBkZWNrU2l6ZS0xKSB7XG5cdFx0XHR0aGlzLmNhcmROdW1iZXIgPSAwO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmNhcmROdW1iZXIrKztcblx0XHR9O1xuXHRcdGxldCBjYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZsYXNoY2FyZCcpO1xuXHRcdGxldCBncmFwaGVtZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMuY2FyZFNldFt0aGlzLmNhcmROdW1iZXJdKTtcblx0XHRjYXJkLnJlcGxhY2VDaGlsZChncmFwaGVtZSwgY2FyZC5jaGlsZE5vZGVzWzBdKTtcblx0fSxcbn07XG5tb2R1bGUuZXhwb3J0cyA9IGNhcmRzO1xuIiwiY29uc3QgcmVtb3ZlRWxlbWVudHMgPSByZXF1aXJlKCcuL3JlbW92ZUVsZW1lbnRzJyk7XG5jb25zdCBjcmVhdGVQYWdlID0ge1xuXHRwYWdlRnJhbWU6IGZ1bmN0aW9uKCkge1xuXHRcdGxldCBvdXRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdG91dGVyRGl2LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY29udGFpbmVyJyk7XG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdXRlckRpdik7XG5cdH0sXG5cblx0aGVhZGVyRnJhbWU6IGZ1bmN0aW9uKCkge1xuXHRcdGxldCBoZWFkZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRoZWFkZXJEaXYuc2V0QXR0cmlidXRlKCdjbGFzcycsICdoZWFkZXInKTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250YWluZXInKVswXS5hcHBlbmRDaGlsZChoZWFkZXJEaXYpO1xuXHR9LFxuXG5cdGNvbnRlbnRGcmFtZTogZnVuY3Rpb24oKSB7XG5cdFx0bGV0IGNvbnRlbnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRjb250ZW50RGl2LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY29udGVudCcpO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbnRhaW5lcicpWzBdLmFwcGVuZENoaWxkKGNvbnRlbnREaXYpO1xuXHR9LFxuXG5cdHNldEhlYWRpbmdUZXh0OiBmdW5jdGlvbih0ZXh0KSB7XG5cdFx0cmVtb3ZlRWxlbWVudHMucmVtb3ZlSGVhZGluZ1RleHQoKTtcblx0XHRsZXQgcGFyZW50RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRpbmcnKTtcblx0XHRsZXQgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcblx0XHRwYXJlbnREaXYuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuXHR9LFxuXG5cdHJlbW92ZUNvbnRlbnQ6IGZ1bmN0aW9uKCkge1xuXHRsZXQgY2hpbGRyZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250ZW50Jyk7XG5cdHdoaWxlIChjaGlsZHJlblswXS5maXJzdENoaWxkKSB7XG5cdFx0Y2hpbGRyZW5bMF0ucmVtb3ZlQ2hpbGQoY2hpbGRyZW5bMF0uZmlyc3RDaGlsZCk7XG5cdH1cbn0sXG5cdHJlbW92ZUhlYWRpbmdUZXh0OiBmdW5jdGlvbigpIHtcblx0XHRsZXQgaGVhZFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGluZycpO1xuXHRcdHdoaWxlIChoZWFkVGV4dC5maXJzdENoaWxkKSB7XG5cdFx0XHRoZWFkVGV4dC5yZW1vdmVDaGlsZChoZWFkVGV4dC5maXJzdENoaWxkKTtcblx0XHR9XG5cdH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVBhZ2U7XG4iLCJjb25zdCBwaG9uZW1lcyA9IHtcbiAgJ0xvbmcgb28nOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDUsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnb28nLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnb28nLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnYSc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdhJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiAxLFxuICAgICdwaG9uZW1lJzogJ2EnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnYWUnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDQsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnYWUnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnYWUnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnYWlyJzoge1xuICAgICdKb2xseVBob25pY3MnOiA3LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2FpcicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdhaXInLFxuICAgICd0eXBlJzogMyxcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnYXInOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDcsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnYXInLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnYXInLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnYic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdiJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA1LFxuICAgICdwaG9uZW1lJzogJ2InLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ2NoJzoge1xuICAgICdKb2xseVBob25pY3MnOiA2LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2NoJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ2NoJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdkJzoge1xuICAgICdKb2xseVBob25pY3MnOiAyLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdhbHQxJzogJ2RkJyxcbiAgICAgICdhbHQyJzogJ2VkJyxcbiAgICAgICdtYWluJzogJ2QnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDIsXG4gICAgJ3Bob25lbWUnOiAnZCcsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnZSc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdlJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA0LFxuICAgICdwaG9uZW1lJzogJ2UnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnZWFyJzoge1xuICAgICdKb2xseVBob25pY3MnOiA3LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2VhcicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdlYXInLFxuICAgICd0eXBlJzogMyxcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnZWUnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDQsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnZWUnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnZWUnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnZXInOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDcsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnZXInLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnZXInLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnZic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdmJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA1LFxuICAgICdwaG9uZW1lJzogJ2YnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ2cnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDMsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnZycsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogMyxcbiAgICAncGhvbmVtZSc6ICdnJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdoJzoge1xuICAgICdKb2xseVBob25pY3MnOiAyLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2gnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDUsXG4gICAgJ3Bob25lbWUnOiAnaCcsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnaSc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdpJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiAyLFxuICAgICdwaG9uZW1lJzogJ2knLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnaWdoJzoge1xuICAgICdKb2xseVBob25pY3MnOiA0LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2lnaCcsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdpZ2gnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnaic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNCxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdqJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA2LFxuICAgICdwaG9uZW1lJzogJ2onLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ2snOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDIsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnaycsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogMyxcbiAgICAncGhvbmVtZSc6ICdrJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdrcyc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdrcycsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdrcycsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAna3cnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDcsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAna3cnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAna3cnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ2wnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDMsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnbCcsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNSxcbiAgICAncGhvbmVtZSc6ICdsJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdsb25nIHRoJzoge1xuICAgICdKb2xseVBob25pY3MnOiA2LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3RoJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ3RoJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdtJzoge1xuICAgICdKb2xseVBob25pY3MnOiAyLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdhbHQxJzogJ21tJyxcbiAgICAgICdhbHQyJzogJ21iJyxcbiAgICAgICdhbHQzJzogJ21uJyxcbiAgICAgICdhbHQ0JzogJ2xtJyxcbiAgICAgICdtYWluJzogJ20nLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDIsXG4gICAgJ3Bob25lbWUnOiAnbScsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnbic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnYWx0MSc6ICdubicsXG4gICAgICAnYWx0Mic6ICdrbicsXG4gICAgICAnYWx0Myc6ICdnbicsXG4gICAgICAnYWx0NCc6ICdwbicsXG4gICAgICAnbWFpbic6ICduJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiAyLFxuICAgICdwaG9uZW1lJzogJ24nLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ25nJzoge1xuICAgICdKb2xseVBob25pY3MnOiA1LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ25nJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ25nJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdvJzoge1xuICAgICdKb2xseVBob25pY3MnOiAzLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ28nLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDMsXG4gICAgJ3Bob25lbWUnOiAnbycsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdvYSc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNCxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdvYScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdvYScsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdvaSc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdvaScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdvaScsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdvbyc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdvbycsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdvbycsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdvcic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNCxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdvcicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdvcicsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdvdyc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdvdycsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdvdycsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdwJzoge1xuICAgICdKb2xseVBob25pY3MnOiAxLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdhbHQxJzogJ3BwJyxcbiAgICAgICdtYWluJzogJ3AnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDEsXG4gICAgJ3Bob25lbWUnOiAncCcsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAncic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdyJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA0LFxuICAgICdwaG9uZW1lJzogJ3InLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ3MnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDEsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ2FsdDEnOiAnc3MnLFxuICAgICAgJ2FsdDInOiAnYycsXG4gICAgICAnYWx0Myc6ICdzYycsXG4gICAgICAnYWx0NCc6ICdwcycsXG4gICAgICAnYWx0NSc6ICdzdCcsXG4gICAgICAnYWx0Nic6ICdjZScsXG4gICAgICAnYWx0Nyc6ICdzZScsXG4gICAgICAnbWFpbic6ICdzJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiAxLFxuICAgICdwaG9uZW1lJzogJ3MnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ3NoJzoge1xuICAgICdKb2xseVBob25pY3MnOiA2LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3NoJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ3NoJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICd0Jzoge1xuICAgICdKb2xseVBob25pY3MnOiAxLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdhbHQxJzogJ3R0JyxcbiAgICAgICdhbHQyJzogJ3RoJyxcbiAgICAgICdhbHQzJzogJ2VkJyxcbiAgICAgICdtYWluJzogJ3QnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDEsXG4gICAgJ3Bob25lbWUnOiAndCcsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAndGgnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDYsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAndGgnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAndGgnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ3UnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDMsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAndScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNCxcbiAgICAncGhvbmVtZSc6ICd1JyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ3VlJzoge1xuICAgICdKb2xseVBob25pY3MnOiA3LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3VlJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ3VlJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ3VyJzoge1xuICAgICdKb2xseVBob25pY3MnOiA3LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3VyJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ3VyJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ3VyZSc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICd1cmUnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAndXJlJyxcbiAgICAndHlwZSc6IDMsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICd2Jzoge1xuICAgICdKb2xseVBob25pY3MnOiA1LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3YnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDYsXG4gICAgJ3Bob25lbWUnOiAndicsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAndyc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICd3JyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA2LFxuICAgICdwaG9uZW1lJzogJ3cnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ3knOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDYsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAneScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICd5JyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICd6Jzoge1xuICAgICdKb2xseVBob25pY3MnOiA1LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3onLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAneicsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnemgnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDcsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnemgnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnemgnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHBob25lbWVzO1xuIiwiY29uc3QgcmVtb3ZlRWxlbWVudHMgPSB7XG5cdHJlbW92ZUNvbnRlbnQ6IGZ1bmN0aW9uKCkge1xuXHRsZXQgY2hpbGRyZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250ZW50Jyk7XG5cdHdoaWxlIChjaGlsZHJlblswXS5maXJzdENoaWxkKSB7XG5cdFx0Y2hpbGRyZW5bMF0ucmVtb3ZlQ2hpbGQoY2hpbGRyZW5bMF0uZmlyc3RDaGlsZCk7XG5cdH1cbn0sXG5cdHJlbW92ZUhlYWRpbmdUZXh0OiBmdW5jdGlvbigpIHtcblx0XHRsZXQgaGVhZFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGluZycpO1xuXHRcdHdoaWxlIChoZWFkVGV4dC5maXJzdENoaWxkKSB7XG5cdFx0XHRoZWFkVGV4dC5yZW1vdmVDaGlsZChoZWFkVGV4dC5maXJzdENoaWxkKTtcblx0XHR9XG5cdH0sXG59O1xubW9kdWxlLmV4cG9ydHMgPSByZW1vdmVFbGVtZW50cztcbiJdfQ==
