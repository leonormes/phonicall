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
				console.log(task);
				createPage.setHeadingText(task);
				cards.cardDecks();
				break;
			case 'assess':
				console.log(task);
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
		console.log(card);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2NhcmRzLmpzIiwic3JjL2NyZWF0ZVBhZ2UuanMiLCJzcmMvcGhvbmVtZXMuanMiLCJzcmMvcmVtb3ZlRWxlbWVudHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQU0saUJBQWlCLFFBQVEsa0JBQVIsQ0FBdkI7QUFDQSxJQUFNLGFBQWEsUUFBUSxjQUFSLENBQW5CO0FBQ0EsSUFBTSxRQUFRLFFBQVEsU0FBUixDQUFkOztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVc7QUFDeEQ7O0FBQ0EsVUFBUyxJQUFULENBQWMsTUFBZCxHQUNBLFdBQVcsU0FBWCxFQURBO0FBRUEsWUFBVyxXQUFYO0FBQ0EsWUFBVyxZQUFYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFNLFFBQVEsQ0FBQyxPQUFELEVBQVUsU0FBVixDQUFkOztBQUVBLFVBQVMsUUFBVCxHQUFvQjtBQUNuQixRQUFNLE9BQU4sQ0FBYyxVQUFTLElBQVQsRUFBZTtBQUM1QixPQUFJLE9BQU8sU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQVg7QUFDQSxPQUFJLFdBQVcsU0FBUyxjQUFULENBQXdCLElBQXhCLENBQWY7QUFDQSxRQUFLLFlBQUwsQ0FBa0IsSUFBbEIsRUFBd0IsS0FBSyxXQUFMLEVBQXhCO0FBQ0EsUUFBSyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixZQUFXO0FBQ3pDLGFBQVMsS0FBSyxFQUFkO0FBQ0EsSUFGRDtBQUdBLFFBQUssV0FBTCxDQUFpQixRQUFqQjtBQUNBLFlBQVMsc0JBQVQsQ0FBZ0MsU0FBaEMsRUFBMkMsQ0FBM0MsRUFBOEMsV0FBOUMsQ0FBMEQsSUFBMUQ7QUFDQSxHQVREO0FBVUE7O0FBRUQsVUFBUyxVQUFULEdBQXNCO0FBQ3JCLE1BQUksVUFBVSxTQUFT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MUIsTUFBSSxXQUFXLFNBQVMsc0JBQVQsQ0FBZ0MsU0FBaEMsQ0FBZjtBQUNBLFNBQU8sU0FBUyxDQUFULEVBQVksVUFBbkIsRUFBK0I7QUFDOUIsWUFBUyxDQUFULEVBQVksV0FBWixDQUF3QixTQUFTLENBQVQsRUFBWSxVQUFwQztBQUNBO0FBQ0QsRUFOc0I7QUFPdEIsb0JBQW1CLDZCQUFXO0FBQzdCLE1BQUksV0FBVyxTQUFTLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBZjtBQUNBLFNBQU8sU0FBUyxVQUFoQixFQUE0QjtBQUMzQixZQUFTLFdBQVQsQ0FBcUIsU0FBUyxVQUE5QjtBQUNBO0FBQ0Q7QUFacUIsQ0FBdkI7QUFjQSxPQUFPLE9BQVAsR0FBaUIsY0FBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgcmVtb3ZlRWxlbWVudHMgPSByZXF1aXJlKCcuL3JlbW92ZUVsZW1lbnRzJyk7XG5jb25zdCBjcmVhdGVQYWdlID0gcmVxdWlyZSgnLi9jcmVhdGVQYWdlJyk7XG5jb25zdCBjYXJkcyA9IHJlcXVpcmUoJy4vY2FyZHMnKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdGRvY3VtZW50LmJvZHkub25sb2FkID1cblx0Y3JlYXRlUGFnZS5wYWdlRnJhbWUoKTtcblx0Y3JlYXRlUGFnZS5oZWFkZXJGcmFtZSgpO1xuXHRjcmVhdGVQYWdlLmNvbnRlbnRGcmFtZSgpO1xuXG5cdC8vIGlmKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IpIHtcblx0Ly8gXHRuYXZpZ2F0b3Iuc2VydmljZVdvcmtlclxuXHQvLyBcdC5yZWdpc3Rlcignc3cuanMnKVxuXHQvLyBcdC50aGVuKGZ1bmN0aW9uKCkge1xuXHQvLyBcdFx0Y29uc29sZS5sb2coJ1NlcnZpY2UgV29ya2VyIFJlZ2lzdGVyZWQnKTtcblx0Ly8gXHR9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcblx0Ly8gXHRcdGNvbnNvbGUubG9nKCdGYWlsZWQgdG8gcmVnaXN0ZXIgU2VydmljZSBXb3JrZXInKTtcblx0Ly8gXHR9KTtcblx0Ly8gfVxuXG5cdGNvbnN0IHRhc2tzID0gWydUZWFjaCcsICdBbmFseXNlJ107XG5cblx0ZnVuY3Rpb24gYWRkVGFza3MoKSB7XG5cdFx0dGFza3MuZm9yRWFjaChmdW5jdGlvbih0YXNrKSB7XG5cdFx0XHRsZXQgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRcdFx0bGV0IGxpbmtUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGFzayk7XG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaWQnLCB0YXNrLnRvTG93ZXJDYXNlKCkpO1xuXHRcdFx0bGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRlbnRlckFwcCh0aGlzLmlkKTtcblx0XHRcdH0pO1xuXHRcdFx0bGluay5hcHBlbmRDaGlsZChsaW5rVGV4dCk7XG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250ZW50JylbMF0uYXBwZW5kQ2hpbGQobGluayk7XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBhZGRIZWFkaW5nKCkge1xuXHRcdGxldCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcblx0XHRoZWFkaW5nLnNldEF0dHJpYnV0ZSgnaWQnLCAnaGVhZGluZycpO1xuXHRcdGhlYWRpbmcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdHJlbW92ZUVsZW1lbnRzLnJlbW92ZUNvbnRlbnQoKTtcblx0XHRcdGFkZFRhc2tzKCk7XG5cdFx0XHRjcmVhdGVQYWdlLnNldEhlYWRpbmdUZXh0KCdXaGF0IHRvIGRvPycpO1xuXHRcdH0pO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2hlYWRlcicpWzBdLmFwcGVuZENoaWxkKGhlYWRpbmcpO1xuXHRcdGNyZWF0ZVBhZ2Uuc2V0SGVhZGluZ1RleHQoJ1doYXQgdG8gZG8nKTtcblx0fVxuXG5cblx0YWRkSGVhZGluZygpO1xuXHRhZGRUYXNrcygpO1xuXG5cdGZ1bmN0aW9uIGVudGVyQXBwKHRhc2spIHtcblx0XHRyZW1vdmVFbGVtZW50cy5yZW1vdmVDb250ZW50KCk7XG5cdFx0c3dpdGNoICh0YXNrKSB7XG5cdFx0XHRjYXNlICd0ZWFjaCc6XG5cdFx0XHRjb25zb2xlLmxvZyh0YXNrKTtcblx0XHRcdGNyZWF0ZVBhZ2Uuc2V0SGVhZGluZ1RleHQodGFzayk7XG5cdFx0XHRjYXJkcy5jYXJkRGVja3MoKTtcblx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnYXNzZXNzJzpcblx0XHRcdGNvbnNvbGUubG9nKHRhc2spO1xuXHRcdFx0Y3JlYXRlQXNzZXNzbWVudENhcmRzKCk7XG5cdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ0FuYWx5c2UnOlxuXHRcdFx0ZGVmYXVsdDpcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBjcmVhdGVBc3Nlc3NtZW50Q2FyZHMoKSB7XG5cdFx0bGV0IHBob25lbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRsZXQgZ3JhcGhlbWUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnYScpO1xuXHRcdHBob25lbWUuYXBwZW5kQ2hpbGQoZ3JhcGhlbWUpO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbnRlbnQnKVswXS5hcHBlbmRDaGlsZChwaG9uZW1lKTtcblx0fTtcbn0pO1xuIiwiY29uc3QgcGhvbmVtZXMgPSByZXF1aXJlKCcuL3Bob25lbWVzJyk7XG5jb25zdCBjcmVhdGVQYWdlID0gcmVxdWlyZSgnLi9jcmVhdGVQYWdlJyk7XG5jb25zdCByZW1vdmVFbGVtZW50cyA9IHJlcXVpcmUoJy4vcmVtb3ZlRWxlbWVudHMnKTtcbmNvbnN0IGNhcmRzID0ge1xuXHRjYXJkU2V0OiBbXSxcblx0Y2FyZE51bWJlcjogMCxcblx0Zmxhc2hDYXJkU2V0OiBmdW5jdGlvbihzZXQpIHtcblx0XHR0aGlzLmNhcmRTZXQubGVuZ3RoID0gMDtcblx0XHRmb3IgKGxldCBzb3VuZCBpbiBwaG9uZW1lcykge1xuXHRcdFx0aWYgKHBob25lbWVzW3NvdW5kXS5Kb2xseVBob25pY3MgPT09IHBhcnNlSW50KHNldCkpXG5cdFx0XHR0aGlzLmNhcmRTZXQucHVzaChwaG9uZW1lc1tzb3VuZF0uZ3JhcGhlbWUubWFpbik7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmNhcmRTZXQ7XG5cdH0sXG5cblx0Y2FyZERlY2tzOiBmdW5jdGlvbigpIHtcblx0XHRsZXQgX3NlbGYgPSB0aGlzO1xuXHRcdGZvcihsZXQgaSA9IDE7IGkgPCA4OyBpKyspIHtcblx0XHRcdGxldCBkZWNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdFx0XHRsZXQgZGVja0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1NldCAnK2kpO1xuXHRcdFx0ZGVjay5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NhcmQtZGVjaycpO1xuXHRcdFx0ZGVjay5zZXRBdHRyaWJ1dGUoJ2lkJywgaSk7XG5cdFx0XHRkZWNrLmFwcGVuZENoaWxkKGRlY2tMYWJlbCk7XG5cdFx0XHRkZWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMuaWQpO1xuXHRcdFx0XHRfc2VsZi5jcmVhdGVGbGFzaENhcmQodGhpcy5pZCk7XG5cdFx0XHR9KTtcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbnRlbnQnKVswXS5hcHBlbmRDaGlsZChkZWNrKTtcblx0XHR9O1xuXHR9LFxuXG5cdGNyZWF0ZUZsYXNoQ2FyZDogZnVuY3Rpb24oc2V0SUQpIHtcblx0XHRsZXQgX3NlbGYgPSB0aGlzO1xuXHRcdGxldCBjYXJkID0gdGhpcy5mbGFzaENhcmRTZXQoc2V0SUQpO1xuXHRcdGNvbnNvbGUubG9nKGNhcmQpO1xuXHRcdGNyZWF0ZVBhZ2Uuc2V0SGVhZGluZ1RleHQoJ1BoYXNlICcgKyBzZXRJRCk7XG5cdFx0bGV0IHBob25lbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRwaG9uZW1lLnNldEF0dHJpYnV0ZSgnaWQnLCAnZmxhc2hjYXJkJyk7XG5cdFx0cGhvbmVtZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0X3NlbGYubmV4dENhcmQoKTtcblx0XHR9KTtcblx0XHRsZXQgZ3JhcGhlbWUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjYXJkW3RoaXMuY2FyZE51bWJlcl0pO1xuXHRcdHBob25lbWUuYXBwZW5kQ2hpbGQoZ3JhcGhlbWUpO1xuXHRcdHJlbW92ZUVsZW1lbnRzLnJlbW92ZUNvbnRlbnQoKTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250ZW50JylbMF0uYXBwZW5kQ2hpbGQocGhvbmVtZSk7XG5cdH0sXG5cblx0bmV4dENhcmQ6IGZ1bmN0aW9uKCkge1xuXHRcdGxldCBkZWNrU2l6ZSA9IHRoaXMuY2FyZFNldC5sZW5ndGg7XG5cdFx0aWYgKHRoaXMuY2FyZE51bWJlciA9PT0gZGVja1NpemUtMSkge1xuXHRcdFx0dGhpcy5jYXJkTnVtYmVyID0gMDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5jYXJkTnVtYmVyKys7XG5cdFx0fTtcblx0XHRsZXQgY2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmbGFzaGNhcmQnKTtcblx0XHRsZXQgZ3JhcGhlbWUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLmNhcmRTZXRbdGhpcy5jYXJkTnVtYmVyXSk7XG5cdFx0Y2FyZC5yZXBsYWNlQ2hpbGQoZ3JhcGhlbWUsIGNhcmQuY2hpbGROb2Rlc1swXSk7XG5cdH0sXG59O1xubW9kdWxlLmV4cG9ydHMgPSBjYXJkcztcbiIsImNvbnN0IHJlbW92ZUVsZW1lbnRzID0gcmVxdWlyZSgnLi9yZW1vdmVFbGVtZW50cycpO1xuY29uc3QgY3JlYXRlUGFnZSA9IHtcblx0cGFnZUZyYW1lOiBmdW5jdGlvbigpIHtcblx0XHRsZXQgb3V0ZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRvdXRlckRpdi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NvbnRhaW5lcicpO1xuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3V0ZXJEaXYpO1xuXHR9LFxuXG5cdGhlYWRlckZyYW1lOiBmdW5jdGlvbigpIHtcblx0XHRsZXQgaGVhZGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0aGVhZGVyRGl2LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaGVhZGVyJyk7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGFpbmVyJylbMF0uYXBwZW5kQ2hpbGQoaGVhZGVyRGl2KTtcblx0fSxcblxuXHRjb250ZW50RnJhbWU6IGZ1bmN0aW9uKCkge1xuXHRcdGxldCBjb250ZW50RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0Y29udGVudERpdi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NvbnRlbnQnKTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250YWluZXInKVswXS5hcHBlbmRDaGlsZChjb250ZW50RGl2KTtcblx0fSxcblxuXHRzZXRIZWFkaW5nVGV4dDogZnVuY3Rpb24odGV4dCkge1xuXHRcdHJlbW92ZUVsZW1lbnRzLnJlbW92ZUhlYWRpbmdUZXh0KCk7XG5cdFx0bGV0IHBhcmVudERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkaW5nJyk7XG5cdFx0bGV0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG5cdFx0cGFyZW50RGl2LmFwcGVuZENoaWxkKHRleHROb2RlKTtcblx0fSxcblxuXHRyZW1vdmVDb250ZW50OiBmdW5jdGlvbigpIHtcblx0bGV0IGNoaWxkcmVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGVudCcpO1xuXHR3aGlsZSAoY2hpbGRyZW5bMF0uZmlyc3RDaGlsZCkge1xuXHRcdGNoaWxkcmVuWzBdLnJlbW92ZUNoaWxkKGNoaWxkcmVuWzBdLmZpcnN0Q2hpbGQpO1xuXHR9XG59LFxuXHRyZW1vdmVIZWFkaW5nVGV4dDogZnVuY3Rpb24oKSB7XG5cdFx0bGV0IGhlYWRUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRpbmcnKTtcblx0XHR3aGlsZSAoaGVhZFRleHQuZmlyc3RDaGlsZCkge1xuXHRcdFx0aGVhZFRleHQucmVtb3ZlQ2hpbGQoaGVhZFRleHQuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXHR9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVQYWdlO1xuIiwiY29uc3QgcGhvbmVtZXMgPSB7XG4gICdMb25nIG9vJzoge1xuICAgICdKb2xseVBob25pY3MnOiA1LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ29vJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ29vJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2EnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDEsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnYScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogMSxcbiAgICAncGhvbmVtZSc6ICdhJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2FlJzoge1xuICAgICdKb2xseVBob25pY3MnOiA0LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2FlJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ2FlJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2Fpcic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdhaXInLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnYWlyJyxcbiAgICAndHlwZSc6IDMsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2FyJzoge1xuICAgICdKb2xseVBob25pY3MnOiA3LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2FyJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ2FyJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2InOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDMsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnYicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNSxcbiAgICAncGhvbmVtZSc6ICdiJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdjaCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdjaCcsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdjaCcsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnZCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnYWx0MSc6ICdkZCcsXG4gICAgICAnYWx0Mic6ICdlZCcsXG4gICAgICAnbWFpbic6ICdkJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiAyLFxuICAgICdwaG9uZW1lJzogJ2QnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ2UnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDIsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnZScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNCxcbiAgICAncGhvbmVtZSc6ICdlJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2Vhcic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdlYXInLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnZWFyJyxcbiAgICAndHlwZSc6IDMsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2VlJzoge1xuICAgICdKb2xseVBob25pY3MnOiA0LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2VlJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ2VlJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2VyJzoge1xuICAgICdKb2xseVBob25pY3MnOiA3LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2VyJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ2VyJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2YnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDMsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnZicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNSxcbiAgICAncGhvbmVtZSc6ICdmJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdnJzoge1xuICAgICdKb2xseVBob25pY3MnOiAzLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2cnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDMsXG4gICAgJ3Bob25lbWUnOiAnZycsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnaCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdoJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA1LFxuICAgICdwaG9uZW1lJzogJ2gnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ2knOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDEsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnaScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogMixcbiAgICAncGhvbmVtZSc6ICdpJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2lnaCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNCxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdpZ2gnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnaWdoJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2onOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDQsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnaicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNixcbiAgICAncGhvbmVtZSc6ICdqJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdrJzoge1xuICAgICdKb2xseVBob25pY3MnOiAyLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2snLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDMsXG4gICAgJ3Bob25lbWUnOiAnaycsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAna3MnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDYsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAna3MnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAna3MnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ2t3Jzoge1xuICAgICdKb2xseVBob25pY3MnOiA3LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2t3JyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ2t3JyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdsJzoge1xuICAgICdKb2xseVBob25pY3MnOiAzLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2wnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDUsXG4gICAgJ3Bob25lbWUnOiAnbCcsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnbG9uZyB0aCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICd0aCcsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICd0aCcsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnbSc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnYWx0MSc6ICdtbScsXG4gICAgICAnYWx0Mic6ICdtYicsXG4gICAgICAnYWx0Myc6ICdtbicsXG4gICAgICAnYWx0NCc6ICdsbScsXG4gICAgICAnbWFpbic6ICdtJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiAyLFxuICAgICdwaG9uZW1lJzogJ20nLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ24nOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDEsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ2FsdDEnOiAnbm4nLFxuICAgICAgJ2FsdDInOiAna24nLFxuICAgICAgJ2FsdDMnOiAnZ24nLFxuICAgICAgJ2FsdDQnOiAncG4nLFxuICAgICAgJ21haW4nOiAnbicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogMixcbiAgICAncGhvbmVtZSc6ICduJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICduZyc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICduZycsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICduZycsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnbyc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdvJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiAzLFxuICAgICdwaG9uZW1lJzogJ28nLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnb2EnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDQsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnb2EnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnb2EnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnb2knOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDcsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnb2knLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnb2knLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnb28nOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDUsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnb28nLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnb28nLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnb3InOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDQsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnb3InLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnb3InLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnb3cnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDcsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnb3cnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnb3cnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAncCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnYWx0MSc6ICdwcCcsXG4gICAgICAnbWFpbic6ICdwJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiAxLFxuICAgICdwaG9uZW1lJzogJ3AnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ3InOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDIsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAncicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNCxcbiAgICAncGhvbmVtZSc6ICdyJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdzJzoge1xuICAgICdKb2xseVBob25pY3MnOiAxLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdhbHQxJzogJ3NzJyxcbiAgICAgICdhbHQyJzogJ2MnLFxuICAgICAgJ2FsdDMnOiAnc2MnLFxuICAgICAgJ2FsdDQnOiAncHMnLFxuICAgICAgJ2FsdDUnOiAnc3QnLFxuICAgICAgJ2FsdDYnOiAnY2UnLFxuICAgICAgJ2FsdDcnOiAnc2UnLFxuICAgICAgJ21haW4nOiAncycsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogMSxcbiAgICAncGhvbmVtZSc6ICdzJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdzaCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdzaCcsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdzaCcsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAndCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnYWx0MSc6ICd0dCcsXG4gICAgICAnYWx0Mic6ICd0aCcsXG4gICAgICAnYWx0Myc6ICdlZCcsXG4gICAgICAnbWFpbic6ICd0JyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiAxLFxuICAgICdwaG9uZW1lJzogJ3QnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ3RoJzoge1xuICAgICdKb2xseVBob25pY3MnOiA2LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3RoJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ3RoJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICd1Jzoge1xuICAgICdKb2xseVBob25pY3MnOiAzLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3UnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDQsXG4gICAgJ3Bob25lbWUnOiAndScsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICd1ZSc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICd1ZScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICd1ZScsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICd1cic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICd1cicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICd1cicsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICd1cmUnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDcsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAndXJlJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ3VyZScsXG4gICAgJ3R5cGUnOiAzLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAndic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICd2JyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA2LFxuICAgICdwaG9uZW1lJzogJ3YnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ3cnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDUsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAndycsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNixcbiAgICAncGhvbmVtZSc6ICd3JyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICd5Jzoge1xuICAgICdKb2xseVBob25pY3MnOiA2LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3knLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAneScsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAneic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICd6JyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ3onLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ3poJzoge1xuICAgICdKb2xseVBob25pY3MnOiA3LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3poJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ3poJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG59O1xubW9kdWxlLmV4cG9ydHMgPSBwaG9uZW1lcztcbiIsImNvbnN0IHJlbW92ZUVsZW1lbnRzID0ge1xuXHRyZW1vdmVDb250ZW50OiBmdW5jdGlvbigpIHtcblx0bGV0IGNoaWxkcmVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGVudCcpO1xuXHR3aGlsZSAoY2hpbGRyZW5bMF0uZmlyc3RDaGlsZCkge1xuXHRcdGNoaWxkcmVuWzBdLnJlbW92ZUNoaWxkKGNoaWxkcmVuWzBdLmZpcnN0Q2hpbGQpO1xuXHR9XG59LFxuXHRyZW1vdmVIZWFkaW5nVGV4dDogZnVuY3Rpb24oKSB7XG5cdFx0bGV0IGhlYWRUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRpbmcnKTtcblx0XHR3aGlsZSAoaGVhZFRleHQuZmlyc3RDaGlsZCkge1xuXHRcdFx0aGVhZFRleHQucmVtb3ZlQ2hpbGQoaGVhZFRleHQuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXHR9LFxufTtcbm1vZHVsZS5leHBvcnRzID0gcmVtb3ZlRWxlbWVudHM7XG4iXX0=
