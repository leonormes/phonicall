(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createPage = require('./createPage');

var _createPage2 = _interopRequireDefault(_createPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
	'use strict';

	document.body.onload = _createPage2.default.pageFrame();
	_createPage2.default.headerFrame();
	_createPage2.default.contentFrame();
	_createPage2.default.addHeading();
	_createPage2.default.addTasks();

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

var _createPage = require('./createPage');

var _createPage2 = _interopRequireDefault(_createPage);

var _phonemes = require('./phonemes');

var _phonemes2 = _interopRequireDefault(_phonemes);

var _removeElements = require('./removeElements');

var _removeElements2 = _interopRequireDefault(_removeElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cards = {
	cardSet: [],
	cardNumber: 0,
	flashCardSet: function flashCardSet(set) {
		this.cardSet.length = 0;
		for (var sound in _phonemes2.default) {
			if (_phonemes2.default[sound].JollyPhonics === parseInt(set)) this.cardSet.push(_phonemes2.default[sound].grapheme.main);
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
		_createPage2.default.setHeadingText('Phase ' + setID);
		var phoneme = document.createElement('div');
		phoneme.setAttribute('id', 'flashcard');
		phoneme.addEventListener('click', function () {
			_self.nextCard();
		});
		var grapheme = document.createTextNode(card[this.cardNumber]);
		phoneme.appendChild(grapheme);
		_removeElements2.default.removeContent();
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

var _removeElements = require('./removeElements');

var _removeElements2 = _interopRequireDefault(_removeElements);

var _userChoices = require('./userChoices');

var _userChoices2 = _interopRequireDefault(_userChoices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
		_removeElements2.default.removeHeadingText();
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
				_userChoices2.default.enterApp(this.id);
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
			_removeElements2.default.removeContent();
			_self.addTasks();
			_self.setHeadingText('What to do?');
		});
		document.getElementsByClassName('header')[0].appendChild(heading);
		_self.setHeadingText('What to do?');
	}
};

module.exports = createPage;

},{"./removeElements":5,"./userChoices":6}],4:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
'use strict';

var _cards = require('./cards');

var _cards2 = _interopRequireDefault(_cards);

var _createPage = require('./createPage');

var _createPage2 = _interopRequireDefault(_createPage);

var _removeElements = require('./removeElements');

var _removeElements2 = _interopRequireDefault(_removeElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userChoices = {
	enterApp: function enterApp(task) {
		switch (task) {
			case 'teach':
				_removeElements2.default.removeContent();
				_createPage2.default.setHeadingText(task);
				_cards2.default.cardDecks();
				break;
			case 'assess':
				createAssessmentCards();
				break;
			case 'Analyse':
			default:
		}
	}
};
module.exports = userChoices;

},{"./cards":2,"./createPage":3,"./removeElements":5}]},{},[1,2,3,4,5,6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2NhcmRzLmpzIiwic3JjL2NyZWF0ZVBhZ2UuanMiLCJzcmMvcGhvbmVtZXMuanMiLCJzcmMvcmVtb3ZlRWxlbWVudHMuanMiLCJzcmMvdXNlckNob2ljZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFXO0FBQ3hEOztBQUNBLFVBQVMsSUFBVCxDQUFjLE1BQWQsR0FDQSxxQkFBVyxTQUFYLEVBREE7QUFFQSxzQkFBVyxXQUFYO0FBQ0Esc0JBQVcsWUFBWDtBQUNBLHNCQUFXLFVBQVg7QUFDQSxzQkFBVyxRQUFYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBbEJEOzs7OztBQ0ZBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTSxRQUFRO0FBQ2IsVUFBUyxFQURJO0FBRWIsYUFBWSxDQUZDO0FBR2IsZUFBYyxzQkFBUyxHQUFULEVBQWM7QUFDM0IsT0FBSyxPQUFMLENBQWEsTUFBYixHQUFzQixDQUF0QjtBQUNBLE9BQUssSUFBSSxLQUFULHdCQUE0QjtBQUMzQixPQUFJLG1CQUFTLEtBQVQsRUFBZ0IsWUFBaEIsS0FBaUMsU0FBUyxHQUFULENBQXJDLEVBQ0EsS0FBSyxPQUFMLENBQWEsSUFBYixDQUFrQixtQkFBUyxLQUFULEVBQWdCLFFBQWhCLENBQXlCLElBQTNDO0FBQ0E7QUFDRCxTQUFPLEtBQUssT0FBWjtBQUNBLEVBVlk7O0FBWWIsWUFBVyxxQkFBVztBQUNyQixNQUFJLFFBQVEsSUFBWjtBQUNBLE9BQUksSUFBSSxJQUFJLENBQVosRUFBZSxJQUFJLENBQW5CLEVBQXNCLEdBQXRCLEVBQTJCO0FBQzFCLE9BQUksT0FBTyxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBWDtBQUNBLE9B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aUIsV0FBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IGNyZWF0ZVBhZ2UgZnJvbSAnLi9jcmVhdGVQYWdlJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdGRvY3VtZW50LmJvZHkub25sb2FkID1cblx0Y3JlYXRlUGFnZS5wYWdlRnJhbWUoKTtcblx0Y3JlYXRlUGFnZS5oZWFkZXJGcmFtZSgpO1xuXHRjcmVhdGVQYWdlLmNvbnRlbnRGcmFtZSgpO1xuXHRjcmVhdGVQYWdlLmFkZEhlYWRpbmcoKTtcblx0Y3JlYXRlUGFnZS5hZGRUYXNrcygpO1xuXG5cdC8vIGlmKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IpIHtcblx0Ly8gXHRuYXZpZ2F0b3Iuc2VydmljZVdvcmtlclxuXHQvLyBcdC5yZWdpc3Rlcignc3cuanMnKVxuXHQvLyBcdC50aGVuKGZ1bmN0aW9uKCkge1xuXHQvLyBcdFx0Y29uc29sZS5sb2coJ1NlcnZpY2UgV29ya2VyIFJlZ2lzdGVyZWQnKTtcblx0Ly8gXHR9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcblx0Ly8gXHRcdGNvbnNvbGUubG9nKCdGYWlsZWQgdG8gcmVnaXN0ZXIgU2VydmljZSBXb3JrZXInKTtcblx0Ly8gXHR9KTtcblx0Ly8gfVxufSk7XG4iLCJpbXBvcnQgY3JlYXRlUGFnZSBmcm9tICcuL2NyZWF0ZVBhZ2UnO1xuaW1wb3J0IHBob25lbWVzIGZyb20gJy4vcGhvbmVtZXMnO1xuaW1wb3J0IHJlbW92ZUVsZW1lbnRzIGZyb20gJy4vcmVtb3ZlRWxlbWVudHMnO1xuXG5jb25zdCBjYXJkcyA9IHtcblx0Y2FyZFNldDogW10sXG5cdGNhcmROdW1iZXI6IDAsXG5cdGZsYXNoQ2FyZFNldDogZnVuY3Rpb24oc2V0KSB7XG5cdFx0dGhpcy5jYXJkU2V0Lmxlbmd0aCA9IDA7XG5cdFx0Zm9yIChsZXQgc291bmQgaW4gcGhvbmVtZXMpIHtcblx0XHRcdGlmIChwaG9uZW1lc1tzb3VuZF0uSm9sbHlQaG9uaWNzID09PSBwYXJzZUludChzZXQpKVxuXHRcdFx0dGhpcy5jYXJkU2V0LnB1c2gocGhvbmVtZXNbc291bmRdLmdyYXBoZW1lLm1haW4pO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5jYXJkU2V0O1xuXHR9LFxuXG5cdGNhcmREZWNrczogZnVuY3Rpb24oKSB7XG5cdFx0bGV0IF9zZWxmID0gdGhpcztcblx0XHRmb3IobGV0IGkgPSAxOyBpIDwgODsgaSsrKSB7XG5cdFx0XHRsZXQgZGVjayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRcdFx0bGV0IGRlY2tMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdTZXQgJytpKTtcblx0XHRcdGRlY2suc2V0QXR0cmlidXRlKCdjbGFzcycsICdjYXJkLWRlY2snKTtcblx0XHRcdGRlY2suc2V0QXR0cmlidXRlKCdpZCcsIGkpO1xuXHRcdFx0ZGVjay5hcHBlbmRDaGlsZChkZWNrTGFiZWwpO1xuXHRcdFx0ZGVjay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRfc2VsZi5jcmVhdGVGbGFzaENhcmQodGhpcy5pZCk7XG5cdFx0XHR9KTtcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbnRlbnQnKVswXS5hcHBlbmRDaGlsZChkZWNrKTtcblx0XHR9O1xuXHR9LFxuXG5cdGNyZWF0ZUZsYXNoQ2FyZDogZnVuY3Rpb24oc2V0SUQpIHtcblx0XHRsZXQgX3NlbGYgPSB0aGlzO1xuXHRcdGxldCBjYXJkID0gdGhpcy5mbGFzaENhcmRTZXQoc2V0SUQpO1xuXHRcdGNyZWF0ZVBhZ2Uuc2V0SGVhZGluZ1RleHQoJ1BoYXNlICcgKyBzZXRJRCk7XG5cdFx0bGV0IHBob25lbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRwaG9uZW1lLnNldEF0dHJpYnV0ZSgnaWQnLCAnZmxhc2hjYXJkJyk7XG5cdFx0cGhvbmVtZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0X3NlbGYubmV4dENhcmQoKTtcblx0XHR9KTtcblx0XHRsZXQgZ3JhcGhlbWUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjYXJkW3RoaXMuY2FyZE51bWJlcl0pO1xuXHRcdHBob25lbWUuYXBwZW5kQ2hpbGQoZ3JhcGhlbWUpO1xuXHRcdHJlbW92ZUVsZW1lbnRzLnJlbW92ZUNvbnRlbnQoKTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250ZW50JylbMF0uYXBwZW5kQ2hpbGQocGhvbmVtZSk7XG5cdH0sXG5cblx0bmV4dENhcmQ6IGZ1bmN0aW9uKCkge1xuXHRcdGxldCBkZWNrU2l6ZSA9IHRoaXMuY2FyZFNldC5sZW5ndGg7XG5cdFx0aWYgKHRoaXMuY2FyZE51bWJlciA9PT0gZGVja1NpemUtMSkge1xuXHRcdFx0dGhpcy5jYXJkTnVtYmVyID0gMDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5jYXJkTnVtYmVyKys7XG5cdFx0fTtcblx0XHRsZXQgY2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmbGFzaGNhcmQnKTtcblx0XHRsZXQgZ3JhcGhlbWUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLmNhcmRTZXRbdGhpcy5jYXJkTnVtYmVyXSk7XG5cdFx0Y2FyZC5yZXBsYWNlQ2hpbGQoZ3JhcGhlbWUsIGNhcmQuY2hpbGROb2Rlc1swXSk7XG5cdH0sXG59O1xubW9kdWxlLmV4cG9ydHMgPSBjYXJkcztcbiIsImltcG9ydCByZW1vdmVFbGVtZW50cyBmcm9tICcuL3JlbW92ZUVsZW1lbnRzJztcbmltcG9ydCB1c2VyQ2hvaWNlcyBmcm9tICcuL3VzZXJDaG9pY2VzJztcblxuY29uc3QgY3JlYXRlUGFnZSA9IHtcblx0dGFza3M6IFsnVGVhY2gnLCAnQW5hbHlzZSddLFxuXHRwYWdlRnJhbWU6IGZ1bmN0aW9uKCkge1xuXHRcdGxldCBvdXRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdG91dGVyRGl2LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY29udGFpbmVyJyk7XG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdXRlckRpdik7XG5cdH0sXG5cblx0aGVhZGVyRnJhbWU6IGZ1bmN0aW9uKCkge1xuXHRcdGxldCBoZWFkZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRoZWFkZXJEaXYuc2V0QXR0cmlidXRlKCdjbGFzcycsICdoZWFkZXInKTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250YWluZXInKVswXS5hcHBlbmRDaGlsZChoZWFkZXJEaXYpO1xuXHR9LFxuXG5cdGNvbnRlbnRGcmFtZTogZnVuY3Rpb24oKSB7XG5cdFx0bGV0IGNvbnRlbnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRjb250ZW50RGl2LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY29udGVudCcpO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbnRhaW5lcicpWzBdLmFwcGVuZENoaWxkKGNvbnRlbnREaXYpO1xuXHR9LFxuXG5cdHNldEhlYWRpbmdUZXh0OiBmdW5jdGlvbih0ZXh0KSB7XG5cdFx0cmVtb3ZlRWxlbWVudHMucmVtb3ZlSGVhZGluZ1RleHQoKTtcblx0XHRsZXQgcGFyZW50RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRpbmcnKTtcblx0XHRsZXQgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcblx0XHRwYXJlbnREaXYuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuXHR9LFxuXG5cdHJlbW92ZUNvbnRlbnQ6IGZ1bmN0aW9uKCkge1xuXHRsZXQgY2hpbGRyZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250ZW50Jyk7XG5cdHdoaWxlIChjaGlsZHJlblswXS5maXJzdENoaWxkKSB7XG5cdFx0Y2hpbGRyZW5bMF0ucmVtb3ZlQ2hpbGQoY2hpbGRyZW5bMF0uZmlyc3RDaGlsZCk7XG5cdH1cbn0sXG5cdHJlbW92ZUhlYWRpbmdUZXh0OiBmdW5jdGlvbigpIHtcblx0XHRsZXQgaGVhZFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGluZycpO1xuXHRcdHdoaWxlIChoZWFkVGV4dC5maXJzdENoaWxkKSB7XG5cdFx0XHRoZWFkVGV4dC5yZW1vdmVDaGlsZChoZWFkVGV4dC5maXJzdENoaWxkKTtcblx0XHR9XG5cdH0sXG5cdGFkZFRhc2tzOiBmdW5jdGlvbigpIHtcblx0XHR0aGlzLnRhc2tzLmZvckVhY2goZnVuY3Rpb24odGFzaykge1xuXHRcdFx0bGV0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0XHRcdGxldCBsaW5rVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRhc2spO1xuXHRcdFx0bGluay5zZXRBdHRyaWJ1dGUoJ2lkJywgdGFzay50b0xvd2VyQ2FzZSgpKTtcblx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0dXNlckNob2ljZXMuZW50ZXJBcHAodGhpcy5pZCk7XG5cdFx0XHR9KTtcblx0XHRcdGxpbmsuYXBwZW5kQ2hpbGQobGlua1RleHQpO1xuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGVudCcpWzBdLmFwcGVuZENoaWxkKGxpbmspO1xuXHRcdH0pO1xuXHR9LFxuXG5cdGFkZEhlYWRpbmc6IGZ1bmN0aW9uKCkge1xuXHRcdGxldCBfc2VsZiA9IHRoaXM7XG5cdFx0bGV0IGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuXHRcdGhlYWRpbmcuc2V0QXR0cmlidXRlKCdpZCcsICdoZWFkaW5nJyk7XG5cdFx0aGVhZGluZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0cmVtb3ZlRWxlbWVudHMucmVtb3ZlQ29udGVudCgpO1xuXHRcdFx0X3NlbGYuYWRkVGFza3MoKTtcblx0XHRcdF9zZWxmLnNldEhlYWRpbmdUZXh0KCdXaGF0IHRvIGRvPycpO1xuXHRcdH0pO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2hlYWRlcicpWzBdLmFwcGVuZENoaWxkKGhlYWRpbmcpO1xuXHRcdF9zZWxmLnNldEhlYWRpbmdUZXh0KCdXaGF0IHRvIGRvPycpO1xuXHR9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVQYWdlO1xuIiwiY29uc3QgcGhvbmVtZXMgPSB7XG4gICdMb25nIG9vJzoge1xuICAgICdKb2xseVBob25pY3MnOiA1LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ29vJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ29vJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2EnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDEsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnYScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogMSxcbiAgICAncGhvbmVtZSc6ICdhJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2FlJzoge1xuICAgICdKb2xseVBob25pY3MnOiA0LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2FlJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ2FlJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2Fpcic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdhaXInLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnYWlyJyxcbiAgICAndHlwZSc6IDMsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2FyJzoge1xuICAgICdKb2xseVBob25pY3MnOiA3LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2FyJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ2FyJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2InOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDMsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnYicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNSxcbiAgICAncGhvbmVtZSc6ICdiJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdjaCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdjaCcsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdjaCcsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnZCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnYWx0MSc6ICdkZCcsXG4gICAgICAnYWx0Mic6ICdlZCcsXG4gICAgICAnbWFpbic6ICdkJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiAyLFxuICAgICdwaG9uZW1lJzogJ2QnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ2UnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDIsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnZScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNCxcbiAgICAncGhvbmVtZSc6ICdlJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2Vhcic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdlYXInLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnZWFyJyxcbiAgICAndHlwZSc6IDMsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2VlJzoge1xuICAgICdKb2xseVBob25pY3MnOiA0LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2VlJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ2VlJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2VyJzoge1xuICAgICdKb2xseVBob25pY3MnOiA3LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2VyJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ2VyJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2YnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDMsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnZicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNSxcbiAgICAncGhvbmVtZSc6ICdmJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdnJzoge1xuICAgICdKb2xseVBob25pY3MnOiAzLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2cnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDMsXG4gICAgJ3Bob25lbWUnOiAnZycsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnaCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdoJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA1LFxuICAgICdwaG9uZW1lJzogJ2gnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ2knOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDEsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnaScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogMixcbiAgICAncGhvbmVtZSc6ICdpJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2lnaCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNCxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdpZ2gnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnaWdoJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2onOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDQsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnaicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNixcbiAgICAncGhvbmVtZSc6ICdqJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdrJzoge1xuICAgICdKb2xseVBob25pY3MnOiAyLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2snLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDMsXG4gICAgJ3Bob25lbWUnOiAnaycsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAna3MnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDYsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAna3MnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAna3MnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ2t3Jzoge1xuICAgICdKb2xseVBob25pY3MnOiA3LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2t3JyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ2t3JyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdsJzoge1xuICAgICdKb2xseVBob25pY3MnOiAzLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2wnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDUsXG4gICAgJ3Bob25lbWUnOiAnbCcsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnbG9uZyB0aCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICd0aCcsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICd0aCcsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnbSc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnYWx0MSc6ICdtbScsXG4gICAgICAnYWx0Mic6ICdtYicsXG4gICAgICAnYWx0Myc6ICdtbicsXG4gICAgICAnYWx0NCc6ICdsbScsXG4gICAgICAnbWFpbic6ICdtJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiAyLFxuICAgICdwaG9uZW1lJzogJ20nLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ24nOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDEsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ2FsdDEnOiAnbm4nLFxuICAgICAgJ2FsdDInOiAna24nLFxuICAgICAgJ2FsdDMnOiAnZ24nLFxuICAgICAgJ2FsdDQnOiAncG4nLFxuICAgICAgJ21haW4nOiAnbicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogMixcbiAgICAncGhvbmVtZSc6ICduJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICduZyc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICduZycsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICduZycsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnbyc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdvJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiAzLFxuICAgICdwaG9uZW1lJzogJ28nLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnb2EnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDQsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnb2EnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnb2EnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnb2knOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDcsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnb2knLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnb2knLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnb28nOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDUsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnb28nLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnb28nLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnb3InOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDQsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnb3InLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnb3InLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnb3cnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDcsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnb3cnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnb3cnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAncCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnYWx0MSc6ICdwcCcsXG4gICAgICAnbWFpbic6ICdwJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiAxLFxuICAgICdwaG9uZW1lJzogJ3AnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ3InOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDIsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAncicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNCxcbiAgICAncGhvbmVtZSc6ICdyJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdzJzoge1xuICAgICdKb2xseVBob25pY3MnOiAxLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdhbHQxJzogJ3NzJyxcbiAgICAgICdhbHQyJzogJ2MnLFxuICAgICAgJ2FsdDMnOiAnc2MnLFxuICAgICAgJ2FsdDQnOiAncHMnLFxuICAgICAgJ2FsdDUnOiAnc3QnLFxuICAgICAgJ2FsdDYnOiAnY2UnLFxuICAgICAgJ2FsdDcnOiAnc2UnLFxuICAgICAgJ21haW4nOiAncycsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogMSxcbiAgICAncGhvbmVtZSc6ICdzJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdzaCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdzaCcsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdzaCcsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAndCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnYWx0MSc6ICd0dCcsXG4gICAgICAnYWx0Mic6ICd0aCcsXG4gICAgICAnYWx0Myc6ICdlZCcsXG4gICAgICAnbWFpbic6ICd0JyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiAxLFxuICAgICdwaG9uZW1lJzogJ3QnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ3RoJzoge1xuICAgICdKb2xseVBob25pY3MnOiA2LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3RoJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ3RoJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICd1Jzoge1xuICAgICdKb2xseVBob25pY3MnOiAzLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3UnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDQsXG4gICAgJ3Bob25lbWUnOiAndScsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICd1ZSc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICd1ZScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICd1ZScsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICd1cic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICd1cicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICd1cicsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICd1cmUnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDcsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAndXJlJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ3VyZScsXG4gICAgJ3R5cGUnOiAzLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAndic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICd2JyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA2LFxuICAgICdwaG9uZW1lJzogJ3YnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ3cnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDUsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAndycsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNixcbiAgICAncGhvbmVtZSc6ICd3JyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICd5Jzoge1xuICAgICdKb2xseVBob25pY3MnOiA2LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3knLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAneScsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAneic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICd6JyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ3onLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ3poJzoge1xuICAgICdKb2xseVBob25pY3MnOiA3LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3poJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ3poJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG59O1xubW9kdWxlLmV4cG9ydHMgPSBwaG9uZW1lcztcbiIsImNvbnN0IHJlbW92ZUVsZW1lbnRzID0ge1xuXHRyZW1vdmVDb250ZW50OiBmdW5jdGlvbigpIHtcblx0bGV0IGNoaWxkcmVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGVudCcpO1xuXHR3aGlsZSAoY2hpbGRyZW5bMF0uZmlyc3RDaGlsZCkge1xuXHRcdGNoaWxkcmVuWzBdLnJlbW92ZUNoaWxkKGNoaWxkcmVuWzBdLmZpcnN0Q2hpbGQpO1xuXHR9XG59LFxuXHRyZW1vdmVIZWFkaW5nVGV4dDogZnVuY3Rpb24oKSB7XG5cdFx0bGV0IGhlYWRUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRpbmcnKTtcblx0XHR3aGlsZSAoaGVhZFRleHQuZmlyc3RDaGlsZCkge1xuXHRcdFx0aGVhZFRleHQucmVtb3ZlQ2hpbGQoaGVhZFRleHQuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXHR9LFxufTtcbm1vZHVsZS5leHBvcnRzID0gcmVtb3ZlRWxlbWVudHM7XG4iLCJpbXBvcnQgY2FyZHMgZnJvbSAnLi9jYXJkcyc7XG5pbXBvcnQgY3JlYXRlUGFnZSBmcm9tICcuL2NyZWF0ZVBhZ2UnO1xuaW1wb3J0IHJlbW92ZUVsZW1lbnRzIGZyb20gJy4vcmVtb3ZlRWxlbWVudHMnO1xuXG5jb25zdCB1c2VyQ2hvaWNlcyA9IHtcblx0ZW50ZXJBcHA6IGZ1bmN0aW9uKHRhc2spIHtcblx0XHRzd2l0Y2ggKHRhc2spIHtcblx0XHRcdGNhc2UgJ3RlYWNoJzpcblx0XHRcdHJlbW92ZUVsZW1lbnRzLnJlbW92ZUNvbnRlbnQoKTtcblx0XHRcdGNyZWF0ZVBhZ2Uuc2V0SGVhZGluZ1RleHQodGFzayk7XG5cdFx0XHRjYXJkcy5jYXJkRGVja3MoKTtcblx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnYXNzZXNzJzpcblx0XHRcdGNyZWF0ZUFzc2Vzc21lbnRDYXJkcygpO1xuXHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdBbmFseXNlJzpcblx0XHRcdGRlZmF1bHQ6XG5cdFx0fVxuXHR9LFxufTtcbm1vZHVsZS5leHBvcnRzID0gdXNlckNob2ljZXM7XG4iXX0=
