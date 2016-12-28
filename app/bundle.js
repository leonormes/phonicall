(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createPage = require('./createPage');

document.addEventListener('DOMContentLoaded', function () {
	'use strict';

	document.body.onload = _createPage.createPage.pageFrame();
	_createPage.createPage.headerFrame();
	_createPage.createPage.contentFrame();
	_createPage.createPage.addHeading();
	_createPage.createPage.addTasks();

	// if('serviceWorker' in navigator) {
	// 	navigator.serviceWorker
	// 	.register('sw.js')
	// 	.then(function() {
	// 		console.log('Service Worker Registered');
	// 	}).catch(function(err) {
	// 		console.log('Failed to register Service Worker');
	// 	});
	// }
});

},{"./createPage":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.cards = undefined;

var _createPage = require('./createPage');

var _phonemes = require('./phonemes');

var _removeElements = require('./removeElements');

var cards = {
	cardSet: [],
	cardNumber: 0,
	flashCardSet: function flashCardSet(set) {
		this.cardSet.length = 0;
		for (var sound in _phonemes.phonemes) {
			if (_phonemes.phonemes[sound].JollyPhonics === parseInt(set)) this.cardSet.push(_phonemes.phonemes[sound].grapheme.main);
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
				_self.createFlashCard(this.id);
			});
			document.getElementsByClassName('content')[0].appendChild(deck);
		};
	},

	createFlashCard: function createFlashCard(setID) {
		var _self = this;
		var card = this.flashCardSet(setID);
		_createPage.createPage.setHeadingText('Phase ' + setID);
		var phoneme = document.createElement('div');
		phoneme.setAttribute('id', 'flashcard');
		phoneme.addEventListener('click', function () {
			_self.nextCard();
		});
		var grapheme = document.createTextNode(card[this.cardNumber]);
		phoneme.appendChild(grapheme);
		_removeElements.removeElements.removeContent();
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
exports.cards = cards;

},{"./createPage":3,"./phonemes":4,"./removeElements":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createPage = undefined;

var _removeElements = require('./removeElements');

var _userChoices = require('./userChoices');

var createPage = {
	tasks: ['Teach', 'Analyse'],
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
		_removeElements.removeElements.removeHeadingText();
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
	},
	addTasks: function addTasks() {
		this.tasks.forEach(function (task) {
			var link = document.createElement('button');
			var linkText = document.createTextNode(task);
			link.setAttribute('id', task.toLowerCase());
			link.addEventListener('click', function () {
				_userChoices.userChoices.enterApp(this.id);
			});
			link.appendChild(linkText);
			document.getElementsByClassName('content')[0].appendChild(link);
		});
	},

	addHeading: function addHeading() {
		var _self = this;
		var heading = document.createElement('h1');
		heading.setAttribute('id', 'heading');
		heading.addEventListener('click', function () {
			_removeElements.removeElements.removeContent();
			_self.addTasks();
			_self.setHeadingText('What to do?');
		});
		document.getElementsByClassName('header')[0].appendChild(heading);
		_self.setHeadingText('What to do?');
	}
};

exports.createPage = createPage;

},{"./removeElements":5,"./userChoices":6}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
exports.phonemes = phonemes;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
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
exports.removeElements = removeElements;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.userChoices = undefined;

var _cards = require('./cards');

var _createPage = require('./createPage');

var _removeElements = require('./removeElements');

var userChoices = {
	enterApp: function enterApp(task) {
		switch (task) {
			case 'teach':
				_removeElements.removeElements.removeContent();
				_createPage.createPage.setHeadingText(task);
				_cards.cards.cardDecks();
				break;
			case 'assess':
				createAssessmentCards();
				break;
			case 'Analyse':
			default:
		}
	}
};
exports.userChoices = userChoices;

},{"./cards":2,"./createPage":3,"./removeElements":5}]},{},[1,2,3,4,5,6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2NhcmRzLmpzIiwic3JjL2NyZWF0ZVBhZ2UuanMiLCJzcmMvcGhvbmVtZXMuanMiLCJzcmMvcmVtb3ZlRWxlbWVudHMuanMiLCJzcmMvdXNlckNob2ljZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVc7QUFDeEQ7O0FBQ0EsVUFBUyxJQUFULENBQWMsTUFBZCxHQUNBLHVCQUFXLFNBQVgsRUFEQTtBQUVBLHdCQUFXLFdBQVg7QUFDQSx3QkFBVyxZQUFYO0FBQ0Esd0JBQVcsVUFBWDtBQUNBLHdCQUFXLFFBQVg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FsQkQ7Ozs7Ozs7Ozs7QUNGQTs7QUFDQTs7QUFDQTs7QUFFQSxJQUFNLFFBQVE7QUFDYixVQUFTLEVBREk7QUFFYixhQUFZLENBRkM7QUFHYixlQUFjLHNCQUFTLEdBQVQsRUFBYztBQUMzQixPQUFLLE9BQUwsQ0FBYSxNQUFiLEdBQXNCLENBQXRCO0FBQ0EsT0FBSyxJQUFJLEtBQVQsd0JBQTRCO0FBQzNCLE9BQUksbUJBQVMsS0FBVCxFQUFnQixZQUFoQixLQUFpQyxTQUFTLEdBQVQsQ0FBckMsRUFDQSxLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLG1CQUFTLEtBQVQsRUFBZ0IsUUFBaEIsQ0FBeUIsSUFBM0M7QUFDQTtBQUNELFNBQU8sS0FBSyxPQUFaO0FBQ0EsRUFWWTs7QUFZYixZQUFXLHFCQUFXO0FBQ3JCLE1BQUksUUFBUSxJQUFaO0FBQ0EsT0FBSSxJQUFJLElBQUksQ0FBWixFQUFlLElBQUksQ0FBbkIsRUFBc0IsR0FBdEIsRUFBMkI7QUFDMUIsT0FBSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFYO0FBQ0EsT0FBSSxZQUFZ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bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQge2NyZWF0ZVBhZ2V9IGZyb20gJy4vY3JlYXRlUGFnZSc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHRkb2N1bWVudC5ib2R5Lm9ubG9hZCA9XG5cdGNyZWF0ZVBhZ2UucGFnZUZyYW1lKCk7XG5cdGNyZWF0ZVBhZ2UuaGVhZGVyRnJhbWUoKTtcblx0Y3JlYXRlUGFnZS5jb250ZW50RnJhbWUoKTtcblx0Y3JlYXRlUGFnZS5hZGRIZWFkaW5nKCk7XG5cdGNyZWF0ZVBhZ2UuYWRkVGFza3MoKTtcblxuXHQvLyBpZignc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKSB7XG5cdC8vIFx0bmF2aWdhdG9yLnNlcnZpY2VXb3JrZXJcblx0Ly8gXHQucmVnaXN0ZXIoJ3N3LmpzJylcblx0Ly8gXHQudGhlbihmdW5jdGlvbigpIHtcblx0Ly8gXHRcdGNvbnNvbGUubG9nKCdTZXJ2aWNlIFdvcmtlciBSZWdpc3RlcmVkJyk7XG5cdC8vIFx0fSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG5cdC8vIFx0XHRjb25zb2xlLmxvZygnRmFpbGVkIHRvIHJlZ2lzdGVyIFNlcnZpY2UgV29ya2VyJyk7XG5cdC8vIFx0fSk7XG5cdC8vIH1cbn0pO1xuIiwiaW1wb3J0IHtjcmVhdGVQYWdlfSBmcm9tICcuL2NyZWF0ZVBhZ2UnO1xuaW1wb3J0IHtwaG9uZW1lc30gZnJvbSAnLi9waG9uZW1lcyc7XG5pbXBvcnQge3JlbW92ZUVsZW1lbnRzfSBmcm9tICcuL3JlbW92ZUVsZW1lbnRzJztcblxuY29uc3QgY2FyZHMgPSB7XG5cdGNhcmRTZXQ6IFtdLFxuXHRjYXJkTnVtYmVyOiAwLFxuXHRmbGFzaENhcmRTZXQ6IGZ1bmN0aW9uKHNldCkge1xuXHRcdHRoaXMuY2FyZFNldC5sZW5ndGggPSAwO1xuXHRcdGZvciAobGV0IHNvdW5kIGluIHBob25lbWVzKSB7XG5cdFx0XHRpZiAocGhvbmVtZXNbc291bmRdLkpvbGx5UGhvbmljcyA9PT0gcGFyc2VJbnQoc2V0KSlcblx0XHRcdHRoaXMuY2FyZFNldC5wdXNoKHBob25lbWVzW3NvdW5kXS5ncmFwaGVtZS5tYWluKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuY2FyZFNldDtcblx0fSxcblxuXHRjYXJkRGVja3M6IGZ1bmN0aW9uKCkge1xuXHRcdGxldCBfc2VsZiA9IHRoaXM7XG5cdFx0Zm9yKGxldCBpID0gMTsgaSA8IDg7IGkrKykge1xuXHRcdFx0bGV0IGRlY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0XHRcdGxldCBkZWNrTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnU2V0ICcraSk7XG5cdFx0XHRkZWNrLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY2FyZC1kZWNrJyk7XG5cdFx0XHRkZWNrLnNldEF0dHJpYnV0ZSgnaWQnLCBpKTtcblx0XHRcdGRlY2suYXBwZW5kQ2hpbGQoZGVja0xhYmVsKTtcblx0XHRcdGRlY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0X3NlbGYuY3JlYXRlRmxhc2hDYXJkKHRoaXMuaWQpO1xuXHRcdFx0fSk7XG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250ZW50JylbMF0uYXBwZW5kQ2hpbGQoZGVjayk7XG5cdFx0fTtcblx0fSxcblxuXHRjcmVhdGVGbGFzaENhcmQ6IGZ1bmN0aW9uKHNldElEKSB7XG5cdFx0bGV0IF9zZWxmID0gdGhpcztcblx0XHRsZXQgY2FyZCA9IHRoaXMuZmxhc2hDYXJkU2V0KHNldElEKTtcblx0XHRjcmVhdGVQYWdlLnNldEhlYWRpbmdUZXh0KCdQaGFzZSAnICsgc2V0SUQpO1xuXHRcdGxldCBwaG9uZW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0cGhvbmVtZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2ZsYXNoY2FyZCcpO1xuXHRcdHBob25lbWUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdF9zZWxmLm5leHRDYXJkKCk7XG5cdFx0fSk7XG5cdFx0bGV0IGdyYXBoZW1lID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2FyZFt0aGlzLmNhcmROdW1iZXJdKTtcblx0XHRwaG9uZW1lLmFwcGVuZENoaWxkKGdyYXBoZW1lKTtcblx0XHRyZW1vdmVFbGVtZW50cy5yZW1vdmVDb250ZW50KCk7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGVudCcpWzBdLmFwcGVuZENoaWxkKHBob25lbWUpO1xuXHR9LFxuXG5cdG5leHRDYXJkOiBmdW5jdGlvbigpIHtcblx0XHRsZXQgZGVja1NpemUgPSB0aGlzLmNhcmRTZXQubGVuZ3RoO1xuXHRcdGlmICh0aGlzLmNhcmROdW1iZXIgPT09IGRlY2tTaXplLTEpIHtcblx0XHRcdHRoaXMuY2FyZE51bWJlciA9IDA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuY2FyZE51bWJlcisrO1xuXHRcdH07XG5cdFx0bGV0IGNhcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmxhc2hjYXJkJyk7XG5cdFx0bGV0IGdyYXBoZW1lID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5jYXJkU2V0W3RoaXMuY2FyZE51bWJlcl0pO1xuXHRcdGNhcmQucmVwbGFjZUNoaWxkKGdyYXBoZW1lLCBjYXJkLmNoaWxkTm9kZXNbMF0pO1xuXHR9LFxufTtcbmV4cG9ydCB7Y2FyZHN9O1xuIiwiaW1wb3J0IHtyZW1vdmVFbGVtZW50c30gZnJvbSAnLi9yZW1vdmVFbGVtZW50cyc7XG5pbXBvcnQge3VzZXJDaG9pY2VzfSBmcm9tICcuL3VzZXJDaG9pY2VzJztcblxuY29uc3QgY3JlYXRlUGFnZSA9IHtcblx0dGFza3M6IFsnVGVhY2gnLCAnQW5hbHlzZSddLFxuXHRwYWdlRnJhbWU6IGZ1bmN0aW9uKCkge1xuXHRcdGxldCBvdXRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdG91dGVyRGl2LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY29udGFpbmVyJyk7XG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdXRlckRpdik7XG5cdH0sXG5cblx0aGVhZGVyRnJhbWU6IGZ1bmN0aW9uKCkge1xuXHRcdGxldCBoZWFkZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRoZWFkZXJEaXYuc2V0QXR0cmlidXRlKCdjbGFzcycsICdoZWFkZXInKTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250YWluZXInKVswXS5hcHBlbmRDaGlsZChoZWFkZXJEaXYpO1xuXHR9LFxuXG5cdGNvbnRlbnRGcmFtZTogZnVuY3Rpb24oKSB7XG5cdFx0bGV0IGNvbnRlbnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRjb250ZW50RGl2LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY29udGVudCcpO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbnRhaW5lcicpWzBdLmFwcGVuZENoaWxkKGNvbnRlbnREaXYpO1xuXHR9LFxuXG5cdHNldEhlYWRpbmdUZXh0OiBmdW5jdGlvbih0ZXh0KSB7XG5cdFx0cmVtb3ZlRWxlbWVudHMucmVtb3ZlSGVhZGluZ1RleHQoKTtcblx0XHRsZXQgcGFyZW50RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRpbmcnKTtcblx0XHRsZXQgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcblx0XHRwYXJlbnREaXYuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuXHR9LFxuXG5cdHJlbW92ZUNvbnRlbnQ6IGZ1bmN0aW9uKCkge1xuXHRsZXQgY2hpbGRyZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250ZW50Jyk7XG5cdHdoaWxlIChjaGlsZHJlblswXS5maXJzdENoaWxkKSB7XG5cdFx0Y2hpbGRyZW5bMF0ucmVtb3ZlQ2hpbGQoY2hpbGRyZW5bMF0uZmlyc3RDaGlsZCk7XG5cdH1cbn0sXG5cdHJlbW92ZUhlYWRpbmdUZXh0OiBmdW5jdGlvbigpIHtcblx0XHRsZXQgaGVhZFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGluZycpO1xuXHRcdHdoaWxlIChoZWFkVGV4dC5maXJzdENoaWxkKSB7XG5cdFx0XHRoZWFkVGV4dC5yZW1vdmVDaGlsZChoZWFkVGV4dC5maXJzdENoaWxkKTtcblx0XHR9XG5cdH0sXG5cdGFkZFRhc2tzOiBmdW5jdGlvbigpIHtcblx0XHR0aGlzLnRhc2tzLmZvckVhY2goZnVuY3Rpb24odGFzaykge1xuXHRcdFx0bGV0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0XHRcdGxldCBsaW5rVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRhc2spO1xuXHRcdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2lkJywgdGFzay50b0xvd2VyQ2FzZSgpKTtcblx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0dXNlckNob2ljZXMuZW50ZXJBcHAodGhpcy5pZCk7XG5cdFx0XHR9KTtcblx0XHRcdGxpbmsuYXBwZW5kQ2hpbGQobGlua1RleHQpO1xuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGVudCcpWzBdLmFwcGVuZENoaWxkKGxpbmspO1xuXHRcdH0pO1xuXHR9LFxuXG5cdGFkZEhlYWRpbmc6IGZ1bmN0aW9uKCkge1xuXHRcdGxldCBfc2VsZiA9IHRoaXM7XG5cdFx0bGV0IGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuXHRcdGhlYWRpbmcuc2V0QXR0cmlidXRlKCdpZCcsICdoZWFkaW5nJyk7XG5cdFx0aGVhZGluZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0cmVtb3ZlRWxlbWVudHMucmVtb3ZlQ29udGVudCgpO1xuXHRcdFx0X3NlbGYuYWRkVGFza3MoKTtcblx0XHRcdF9zZWxmLnNldEhlYWRpbmdUZXh0KCdXaGF0IHRvIGRvPycpO1xuXHRcdH0pO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2hlYWRlcicpWzBdLmFwcGVuZENoaWxkKGhlYWRpbmcpO1xuXHRcdF9zZWxmLnNldEhlYWRpbmdUZXh0KCdXaGF0IHRvIGRvPycpO1xuXHR9LFxufTtcblxuZXhwb3J0IHtjcmVhdGVQYWdlfTtcbiIsImNvbnN0IHBob25lbWVzID0ge1xuICAnTG9uZyBvbyc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdvbycsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdvbycsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdhJzoge1xuICAgICdKb2xseVBob25pY3MnOiAxLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2EnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDEsXG4gICAgJ3Bob25lbWUnOiAnYScsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdhZSc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNCxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdhZScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdhZScsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdhaXInOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDcsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnYWlyJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ2FpcicsXG4gICAgJ3R5cGUnOiAzLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdhcic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdhcicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdhcicsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdiJzoge1xuICAgICdKb2xseVBob25pY3MnOiAzLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2InLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDUsXG4gICAgJ3Bob25lbWUnOiAnYicsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnY2gnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDYsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnY2gnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnY2gnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ2QnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDIsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ2FsdDEnOiAnZGQnLFxuICAgICAgJ2FsdDInOiAnZWQnLFxuICAgICAgJ21haW4nOiAnZCcsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogMixcbiAgICAncGhvbmVtZSc6ICdkJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdlJzoge1xuICAgICdKb2xseVBob25pY3MnOiAyLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2UnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDQsXG4gICAgJ3Bob25lbWUnOiAnZScsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdlYXInOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDcsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnZWFyJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ2VhcicsXG4gICAgJ3R5cGUnOiAzLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdlZSc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNCxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdlZScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdlZScsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdlcic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdlcicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdlcicsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdmJzoge1xuICAgICdKb2xseVBob25pY3MnOiAzLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2YnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDUsXG4gICAgJ3Bob25lbWUnOiAnZicsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnZyc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdnJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiAzLFxuICAgICdwaG9uZW1lJzogJ2cnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ2gnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDIsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnaCcsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNSxcbiAgICAncGhvbmVtZSc6ICdoJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdpJzoge1xuICAgICdKb2xseVBob25pY3MnOiAxLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2knLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDIsXG4gICAgJ3Bob25lbWUnOiAnaScsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdpZ2gnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDQsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnaWdoJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ2lnaCcsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdqJzoge1xuICAgICdKb2xseVBob25pY3MnOiA0LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2onLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDYsXG4gICAgJ3Bob25lbWUnOiAnaicsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnayc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdrJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiAzLFxuICAgICdwaG9uZW1lJzogJ2snLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ2tzJzoge1xuICAgICdKb2xseVBob25pY3MnOiA2LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2tzJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ2tzJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdrdyc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdrdycsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdrdycsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnbCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdsJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA1LFxuICAgICdwaG9uZW1lJzogJ2wnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ2xvbmcgdGgnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDYsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAndGgnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAndGgnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ20nOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDIsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ2FsdDEnOiAnbW0nLFxuICAgICAgJ2FsdDInOiAnbWInLFxuICAgICAgJ2FsdDMnOiAnbW4nLFxuICAgICAgJ2FsdDQnOiAnbG0nLFxuICAgICAgJ21haW4nOiAnbScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogMixcbiAgICAncGhvbmVtZSc6ICdtJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICduJzoge1xuICAgICdKb2xseVBob25pY3MnOiAxLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdhbHQxJzogJ25uJyxcbiAgICAgICdhbHQyJzogJ2tuJyxcbiAgICAgICdhbHQzJzogJ2duJyxcbiAgICAgICdhbHQ0JzogJ3BuJyxcbiAgICAgICdtYWluJzogJ24nLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDIsXG4gICAgJ3Bob25lbWUnOiAnbicsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnbmcnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDUsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnbmcnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnbmcnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ28nOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDMsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnbycsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogMyxcbiAgICAncGhvbmVtZSc6ICdvJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ29hJzoge1xuICAgICdKb2xseVBob25pY3MnOiA0LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ29hJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ29hJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ29pJzoge1xuICAgICdKb2xseVBob25pY3MnOiA3LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ29pJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ29pJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ29vJzoge1xuICAgICdKb2xseVBob25pY3MnOiA1LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ29vJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ29vJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ29yJzoge1xuICAgICdKb2xseVBob25pY3MnOiA0LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ29yJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ29yJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ293Jzoge1xuICAgICdKb2xseVBob25pY3MnOiA3LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ293JyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ293JyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ3AnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDEsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ2FsdDEnOiAncHAnLFxuICAgICAgJ21haW4nOiAncCcsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogMSxcbiAgICAncGhvbmVtZSc6ICdwJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdyJzoge1xuICAgICdKb2xseVBob25pY3MnOiAyLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3InLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDQsXG4gICAgJ3Bob25lbWUnOiAncicsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAncyc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnYWx0MSc6ICdzcycsXG4gICAgICAnYWx0Mic6ICdjJyxcbiAgICAgICdhbHQzJzogJ3NjJyxcbiAgICAgICdhbHQ0JzogJ3BzJyxcbiAgICAgICdhbHQ1JzogJ3N0JyxcbiAgICAgICdhbHQ2JzogJ2NlJyxcbiAgICAgICdhbHQ3JzogJ3NlJyxcbiAgICAgICdtYWluJzogJ3MnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDEsXG4gICAgJ3Bob25lbWUnOiAncycsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnc2gnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDYsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnc2gnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnc2gnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ3QnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDEsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ2FsdDEnOiAndHQnLFxuICAgICAgJ2FsdDInOiAndGgnLFxuICAgICAgJ2FsdDMnOiAnZWQnLFxuICAgICAgJ21haW4nOiAndCcsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogMSxcbiAgICAncGhvbmVtZSc6ICd0JyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICd0aCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICd0aCcsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICd0aCcsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAndSc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICd1JyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA0LFxuICAgICdwaG9uZW1lJzogJ3UnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAndWUnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDcsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAndWUnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAndWUnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAndXInOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDcsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAndXInLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAndXInLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAndXJlJzoge1xuICAgICdKb2xseVBob25pY3MnOiA3LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3VyZScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICd1cmUnLFxuICAgICd0eXBlJzogMyxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ3YnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDUsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAndicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNixcbiAgICAncGhvbmVtZSc6ICd2JyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICd3Jzoge1xuICAgICdKb2xseVBob25pY3MnOiA1LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3cnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDYsXG4gICAgJ3Bob25lbWUnOiAndycsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAneSc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICd5JyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ3knLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ3onOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDUsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAneicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICd6JyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICd6aCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICd6aCcsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICd6aCcsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxufTtcbmV4cG9ydCB7cGhvbmVtZXN9O1xuIiwiY29uc3QgcmVtb3ZlRWxlbWVudHMgPSB7XG5cdHJlbW92ZUNvbnRlbnQ6IGZ1bmN0aW9uKCkge1xuXHRsZXQgY2hpbGRyZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250ZW50Jyk7XG5cdHdoaWxlIChjaGlsZHJlblswXS5maXJzdENoaWxkKSB7XG5cdFx0Y2hpbGRyZW5bMF0ucmVtb3ZlQ2hpbGQoY2hpbGRyZW5bMF0uZmlyc3RDaGlsZCk7XG5cdH1cbn0sXG5cdHJlbW92ZUhlYWRpbmdUZXh0OiBmdW5jdGlvbigpIHtcblx0XHRsZXQgaGVhZFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGluZycpO1xuXHRcdHdoaWxlIChoZWFkVGV4dC5maXJzdENoaWxkKSB7XG5cdFx0XHRoZWFkVGV4dC5yZW1vdmVDaGlsZChoZWFkVGV4dC5maXJzdENoaWxkKTtcblx0XHR9XG5cdH0sXG59O1xuZXhwb3J0IHtyZW1vdmVFbGVtZW50c307XG4iLCJpbXBvcnQge2NhcmRzfSBmcm9tICcuL2NhcmRzJztcbmltcG9ydCB7Y3JlYXRlUGFnZX0gZnJvbSAnLi9jcmVhdGVQYWdlJztcbmltcG9ydCB7cmVtb3ZlRWxlbWVudHN9IGZyb20gJy4vcmVtb3ZlRWxlbWVudHMnO1xuXG5jb25zdCB1c2VyQ2hvaWNlcyA9IHtcblx0ZW50ZXJBcHA6IGZ1bmN0aW9uKHRhc2spIHtcblx0XHRzd2l0Y2ggKHRhc2spIHtcblx0XHRcdGNhc2UgJ3RlYWNoJzpcblx0XHRcdHJlbW92ZUVsZW1lbnRzLnJlbW92ZUNvbnRlbnQoKTtcblx0XHRcdGNyZWF0ZVBhZ2Uuc2V0SGVhZGluZ1RleHQodGFzayk7XG5cdFx0XHRjYXJkcy5jYXJkRGVja3MoKTtcblx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnYXNzZXNzJzpcblx0XHRcdGNyZWF0ZUFzc2Vzc21lbnRDYXJkcygpO1xuXHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdBbmFseXNlJzpcblx0XHRcdGRlZmF1bHQ6XG5cdFx0fVxuXHR9LFxufTtcbmV4cG9ydCB7dXNlckNob2ljZXN9O1xuIl19
