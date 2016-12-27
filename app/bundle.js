(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var phonemes = require('./phonemes');
var removeElements = require('./removeElements');
var createPage = require('./createPage');

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

	var cardSet = [];
	var cardNumber = 0;
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
			setHeadingText('What to do?');
		});
		document.getElementsByClassName('header')[0].appendChild(heading);
		setHeadingText('What to do');
	}

	function setHeadingText(text) {
		removeElements.removeHeadingText();
		var parentDiv = document.getElementById('heading');
		var textNode = document.createTextNode(text);
		parentDiv.appendChild(textNode);
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
		for (var i = 1; i < 8; i++) {
			var deck = document.createElement('div');
			var deckLabel = document.createTextNode('Set ' + i);
			deck.setAttribute('class', 'card-deck');
			deck.setAttribute('id', i);
			deck.appendChild(deckLabel);
			deck.addEventListener('click', function () {
				createFlashCard(this.id);
			});
			document.getElementsByClassName('content')[0].appendChild(deck);
		};
	}

	function createFlashCard(setID) {
		var card = flashCardSet(setID);
		setHeadingText('Phase ' + setID);
		var phoneme = document.createElement('div');
		phoneme.setAttribute('id', 'flashcard');
		phoneme.addEventListener('click', function () {
			nextCard();
		});
		var grapheme = document.createTextNode(card[cardNumber]);
		phoneme.appendChild(grapheme);
		removeElements.removeContent();
		document.getElementsByClassName('content')[0].appendChild(phoneme);
	};

	function createAssessmentCards() {
		var phoneme = document.createElement('div');
		var grapheme = document.createTextNode('a');
		phoneme.appendChild(grapheme);
		document.getElementsByClassName('content')[0].appendChild(phoneme);
	};

	function nextCard() {
		var deckSize = cardSet.length;
		if (cardNumber === deckSize - 1) {
			cardNumber = 0;
		} else {
			cardNumber++;
		};
		var card = document.getElementById('flashcard');
		var grapheme = document.createTextNode(cardSet[cardNumber]);
		card.replaceChild(grapheme, card.childNodes[0]);
	}

	var flashCardSet = function flashCardSet(set) {
		cardSet.length = 0;
		for (var sound in phonemes) {
			if (phonemes[sound].JollyPhonics === parseInt(set)) cardSet.push(phonemes[sound].grapheme.main);
		}
		console.log(cardSet);
		return cardSet;
	};
});

},{"./createPage":2,"./phonemes":3,"./removeElements":4}],2:[function(require,module,exports){
'use strict';

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
	}
};

module.exports = createPage;

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}]},{},[1,2,3,4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2NyZWF0ZVBhZ2UuanMiLCJzcmMvcGhvbmVtZXMuanMiLCJzcmMvcmVtb3ZlRWxlbWVudHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQU0sV0FBVyxRQUFRLFlBQVIsQ0FBakI7QUFDQSxJQUFNLGlCQUFpQixRQUFRLGtCQUFSLENBQXZCO0FBQ0EsSUFBTSxhQUFhLFFBQVEsY0FBUixDQUFuQjs7QUFFQSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFXO0FBQ3hEOztBQUNBLFVBQVMsSUFBVCxDQUFjLE1BQWQsR0FDQSxXQUFXLFNBQVgsRUFEQTtBQUVBLFlBQVcsV0FBWDtBQUNBLFlBQVcsWUFBWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBTSxVQUFVLEVBQWhCO0FBQ0EsS0FBSSxhQUFhLENBQWpCO0FBQ0EsS0FBTSxRQUFRLENBQUMsT0FBRCxFQUFVLFNBQVYsQ0FBZDs7QUFFQSxVQUFTLFFBQVQsR0FBb0I7QUFDbkIsUUFBTSxPQUFOLENBQWMsVUFBUyxJQUFULEVBQWU7QUFDNUIsT0FBSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFYO0FBQ0EsT0FBSSxXQUFXLFNBQVMsY0FBVCxDQUF3QixJQUF4QixDQUFmO0FBQ0EsUUFBSyxZQUFMLENBQWtCLElBQWxCLEVBQXdCLEtBQUssV0FBTCxFQUF4QjtBQUNBLFFBQUssZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBVztBQUN6QyxhQUFTLEtBQUssRUFBZDtBQUNBLElBRkQ7QUFHQSxRQUFLLFdBQUwsQ0FBaUIsUUFBakI7QUFDQSxZQUFTLHNCQUFULENBQWdDLFNBQWhDLEVBQTJDLENBQTNDLEVBQThDLFdBQTlDLENBQTBELElBQTFEO0FBQ0EsR0FURDtBQVVBOztBQUVELFVBQVMsVUFB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Siw4QkFBMEIsQ0FMdEI7QUFNSiw0QkFBd0IsQ0FOcEI7QUFPSixlQUFXLElBUFA7QUFRSixZQUFRLENBUko7QUFTSixhQUFTO0FBVEw7QUFoaEJTLENBQWpCO0FBNGhCQSxPQUFPLE9BQVAsR0FBaUIsUUFBakI7Ozs7O0FDNWhCQSxJQUFNLGlCQUFpQjtBQUN0QixnQkFBZSx5QkFBVztBQUMxQixNQUFJLFdBQVcsU0FBUyxzQkFBVCxDQUFnQyxTQUFoQyxDQUFmO0FBQ0EsU0FBTyxTQUFTLENBQVQsRUFBWSxVQUFuQixFQUErQjtBQUM5QixZQUFTLENBQVQsRUFBWSxXQUFaLENBQXdCLFNBQVMsQ0FBVCxFQUFZLFVBQXBDO0FBQ0E7QUFDRCxFQU5zQjtBQU90QixvQkFBbUIsNkJBQVc7QUFDN0IsTUFBSSxXQUFXLFNBQVMsY0FBVCxDQUF3QixTQUF4QixDQUFmO0FBQ0EsU0FBTyxTQUFTLFVBQWhCLEVBQTRCO0FBQzNCLFlBQVMsV0FBVCxDQUFxQixTQUFTLFVBQTlCO0FBQ0E7QUFDRDtBQVpxQixDQUF2QjtBQWNBLE9BQU8sT0FBUCxHQUFpQixjQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCBwaG9uZW1lcyA9IHJlcXVpcmUoJy4vcGhvbmVtZXMnKTtcbmNvbnN0IHJlbW92ZUVsZW1lbnRzID0gcmVxdWlyZSgnLi9yZW1vdmVFbGVtZW50cycpO1xuY29uc3QgY3JlYXRlUGFnZSA9IHJlcXVpcmUoJy4vY3JlYXRlUGFnZScpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0ZG9jdW1lbnQuYm9keS5vbmxvYWQgPVxuXHRjcmVhdGVQYWdlLnBhZ2VGcmFtZSgpO1xuXHRjcmVhdGVQYWdlLmhlYWRlckZyYW1lKCk7XG5cdGNyZWF0ZVBhZ2UuY29udGVudEZyYW1lKCk7XG5cblx0Ly8gaWYoJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvcikge1xuXHQvLyBcdG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyXG5cdC8vIFx0LnJlZ2lzdGVyKCdzdy5qcycpXG5cdC8vIFx0LnRoZW4oZnVuY3Rpb24oKSB7XG5cdC8vIFx0XHRjb25zb2xlLmxvZygnU2VydmljZSBXb3JrZXIgUmVnaXN0ZXJlZCcpO1xuXHQvLyBcdH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuXHQvLyBcdFx0Y29uc29sZS5sb2coJ0ZhaWxlZCB0byByZWdpc3RlciBTZXJ2aWNlIFdvcmtlcicpO1xuXHQvLyBcdH0pO1xuXHQvLyB9XG5cblx0Y29uc3QgY2FyZFNldCA9IFtdO1xuXHRsZXQgY2FyZE51bWJlciA9IDA7XG5cdGNvbnN0IHRhc2tzID0gWydUZWFjaCcsICdBbmFseXNlJ107XG5cblx0ZnVuY3Rpb24gYWRkVGFza3MoKSB7XG5cdFx0dGFza3MuZm9yRWFjaChmdW5jdGlvbih0YXNrKSB7XG5cdFx0XHRsZXQgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRcdFx0bGV0IGxpbmtUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGFzayk7XG5cdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaWQnLCB0YXNrLnRvTG93ZXJDYXNlKCkpO1xuXHRcdFx0bGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRlbnRlckFwcCh0aGlzLmlkKTtcblx0XHRcdH0pO1xuXHRcdFx0bGluay5hcHBlbmRDaGlsZChsaW5rVGV4dCk7XG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250ZW50JylbMF0uYXBwZW5kQ2hpbGQobGluayk7XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBhZGRIZWFkaW5nKCkge1xuXHRcdGxldCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcblx0XHRoZWFkaW5nLnNldEF0dHJpYnV0ZSgnaWQnLCAnaGVhZGluZycpO1xuXHRcdGhlYWRpbmcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdHJlbW92ZUVsZW1lbnRzLnJlbW92ZUNvbnRlbnQoKTtcblx0XHRcdGFkZFRhc2tzKCk7XG5cdFx0XHRzZXRIZWFkaW5nVGV4dCgnV2hhdCB0byBkbz8nKTtcblx0XHR9KTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdoZWFkZXInKVswXS5hcHBlbmRDaGlsZChoZWFkaW5nKTtcblx0XHRzZXRIZWFkaW5nVGV4dCgnV2hhdCB0byBkbycpO1xuXHR9XG5cblx0ZnVuY3Rpb24gc2V0SGVhZGluZ1RleHQodGV4dCkge1xuXHRcdHJlbW92ZUVsZW1lbnRzLnJlbW92ZUhlYWRpbmdUZXh0KCk7XG5cdFx0bGV0IHBhcmVudERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkaW5nJyk7XG5cdFx0bGV0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG5cdFx0cGFyZW50RGl2LmFwcGVuZENoaWxkKHRleHROb2RlKTtcblx0fTtcblx0YWRkSGVhZGluZygpO1xuXHRhZGRUYXNrcygpO1xuXG5cdGZ1bmN0aW9uIGVudGVyQXBwKHRhc2spIHtcblx0XHRyZW1vdmVFbGVtZW50cy5yZW1vdmVDb250ZW50KCk7XG5cdFx0c3dpdGNoICh0YXNrKSB7XG5cdFx0XHRjYXNlICd0ZWFjaCc6XG5cdFx0XHRjb25zb2xlLmxvZyh0YXNrKTtcblx0XHRcdHNldEhlYWRpbmdUZXh0KHRhc2spO1xuXHRcdFx0Y2FyZERlY2tzKCk7XG5cdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ2Fzc2Vzcyc6XG5cdFx0XHRjb25zb2xlLmxvZyh0YXNrKTtcblx0XHRcdGNyZWF0ZUFzc2Vzc21lbnRDYXJkcygpO1xuXHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdBbmFseXNlJzpcblx0XHRcdGRlZmF1bHQ6XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gY2FyZERlY2tzKCkge1xuXHRcdGZvcihsZXQgaSA9IDE7IGkgPCA4OyBpKyspIHtcblx0XHRcdGxldCBkZWNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRsZXQgZGVja0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1NldCAnK2kpO1xuXHRcdFx0ZGVjay5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NhcmQtZGVjaycpO1xuXHRcdFx0ZGVjay5zZXRBdHRyaWJ1dGUoJ2lkJywgaSk7XG5cdFx0XHRkZWNrLmFwcGVuZENoaWxkKGRlY2tMYWJlbCk7XG5cdFx0XHRkZWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNyZWF0ZUZsYXNoQ2FyZCh0aGlzLmlkKTtcblx0XHRcdH0pO1xuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGVudCcpWzBdLmFwcGVuZENoaWxkKGRlY2spO1xuXHRcdH07XG5cdH1cblxuXHRmdW5jdGlvbiBjcmVhdGVGbGFzaENhcmQoc2V0SUQpIHtcblx0XHRsZXQgY2FyZCA9IGZsYXNoQ2FyZFNldChzZXRJRCk7XG5cdFx0c2V0SGVhZGluZ1RleHQoJ1BoYXNlICcgKyBzZXRJRCk7XG5cdFx0bGV0IHBob25lbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRwaG9uZW1lLnNldEF0dHJpYnV0ZSgnaWQnLCAnZmxhc2hjYXJkJyk7XG5cdFx0cGhvbmVtZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0bmV4dENhcmQoKTtcblx0XHR9KTtcblx0XHRsZXQgZ3JhcGhlbWUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjYXJkW2NhcmROdW1iZXJdKTtcblx0XHRwaG9uZW1lLmFwcGVuZENoaWxkKGdyYXBoZW1lKTtcblx0XHRyZW1vdmVFbGVtZW50cy5yZW1vdmVDb250ZW50KCk7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGVudCcpWzBdLmFwcGVuZENoaWxkKHBob25lbWUpO1xuXHR9O1xuXG5cdGZ1bmN0aW9uIGNyZWF0ZUFzc2Vzc21lbnRDYXJkcygpIHtcblx0XHRsZXQgcGhvbmVtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGxldCBncmFwaGVtZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdhJyk7XG5cdFx0cGhvbmVtZS5hcHBlbmRDaGlsZChncmFwaGVtZSk7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGVudCcpWzBdLmFwcGVuZENoaWxkKHBob25lbWUpO1xuXHR9O1xuXG5cblx0ZnVuY3Rpb24gbmV4dENhcmQoKSB7XG5cdFx0bGV0IGRlY2tTaXplID0gY2FyZFNldC5sZW5ndGg7XG5cdFx0aWYgKGNhcmROdW1iZXIgPT09IGRlY2tTaXplLTEpIHtcblx0XHRcdGNhcmROdW1iZXIgPSAwO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjYXJkTnVtYmVyKys7XG5cdFx0fTtcblx0XHRsZXQgY2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmbGFzaGNhcmQnKTtcblx0XHRsZXQgZ3JhcGhlbWUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjYXJkU2V0W2NhcmROdW1iZXJdKTtcblx0XHRjYXJkLnJlcGxhY2VDaGlsZChncmFwaGVtZSwgY2FyZC5jaGlsZE5vZGVzWzBdKTtcblx0fVxuXG5cdGxldCBmbGFzaENhcmRTZXQgPSBmdW5jdGlvbihzZXQpIHtcblx0XHRjYXJkU2V0Lmxlbmd0aCA9IDA7XG5cdFx0Zm9yIChsZXQgc291bmQgaW4gcGhvbmVtZXMpIHtcblx0XHRcdGlmIChwaG9uZW1lc1tzb3VuZF0uSm9sbHlQaG9uaWNzID09PSBwYXJzZUludChzZXQpKVxuXHRcdFx0Y2FyZFNldC5wdXNoKHBob25lbWVzW3NvdW5kXS5ncmFwaGVtZS5tYWluKTtcblx0XHR9XG5cdFx0Y29uc29sZS5sb2coY2FyZFNldCk7XG5cdFx0cmV0dXJuIGNhcmRTZXQ7XG5cdH07XG59KTtcbiIsImNvbnN0IGNyZWF0ZVBhZ2UgPSB7XG5cdHBhZ2VGcmFtZTogZnVuY3Rpb24oKSB7XG5cdFx0bGV0IG91dGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0b3V0ZXJEaXYuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjb250YWluZXInKTtcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG91dGVyRGl2KTtcblx0fSxcblxuXHRoZWFkZXJGcmFtZTogZnVuY3Rpb24oKSB7XG5cdFx0bGV0IGhlYWRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGhlYWRlckRpdi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2hlYWRlcicpO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbnRhaW5lcicpWzBdLmFwcGVuZENoaWxkKGhlYWRlckRpdik7XG5cdH0sXG5cblx0Y29udGVudEZyYW1lOiBmdW5jdGlvbigpIHtcblx0XHRsZXQgY29udGVudERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGNvbnRlbnREaXYuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjb250ZW50Jyk7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGFpbmVyJylbMF0uYXBwZW5kQ2hpbGQoY29udGVudERpdik7XG5cdH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVBhZ2U7XG4iLCJjb25zdCBwaG9uZW1lcyA9IHtcbiAgJ0xvbmcgb28nOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDUsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnb28nLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnb28nLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnYSc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdhJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiAxLFxuICAgICdwaG9uZW1lJzogJ2EnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnYWUnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDQsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnYWUnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnYWUnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnYWlyJzoge1xuICAgICdKb2xseVBob25pY3MnOiA3LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2FpcicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdhaXInLFxuICAgICd0eXBlJzogMyxcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnYXInOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDcsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnYXInLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnYXInLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnYic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdiJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA1LFxuICAgICdwaG9uZW1lJzogJ2InLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ2NoJzoge1xuICAgICdKb2xseVBob25pY3MnOiA2LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2NoJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ2NoJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdkJzoge1xuICAgICdKb2xseVBob25pY3MnOiAyLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdhbHQxJzogJ2RkJyxcbiAgICAgICdhbHQyJzogJ2VkJyxcbiAgICAgICdtYWluJzogJ2QnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDIsXG4gICAgJ3Bob25lbWUnOiAnZCcsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnZSc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdlJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA0LFxuICAgICdwaG9uZW1lJzogJ2UnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnZWFyJzoge1xuICAgICdKb2xseVBob25pY3MnOiA3LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2VhcicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdlYXInLFxuICAgICd0eXBlJzogMyxcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnZWUnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDQsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnZWUnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnZWUnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnZXInOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDcsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnZXInLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnZXInLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnZic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdmJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA1LFxuICAgICdwaG9uZW1lJzogJ2YnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ2cnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDMsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnZycsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogMyxcbiAgICAncGhvbmVtZSc6ICdnJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdoJzoge1xuICAgICdKb2xseVBob25pY3MnOiAyLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2gnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDUsXG4gICAgJ3Bob25lbWUnOiAnaCcsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnaSc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdpJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiAyLFxuICAgICdwaG9uZW1lJzogJ2knLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnaWdoJzoge1xuICAgICdKb2xseVBob25pY3MnOiA0LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2lnaCcsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdpZ2gnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnaic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNCxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdqJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA2LFxuICAgICdwaG9uZW1lJzogJ2onLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ2snOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDIsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnaycsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogMyxcbiAgICAncGhvbmVtZSc6ICdrJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdrcyc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdrcycsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdrcycsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAna3cnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDcsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAna3cnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAna3cnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ2wnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDMsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnbCcsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNSxcbiAgICAncGhvbmVtZSc6ICdsJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdsb25nIHRoJzoge1xuICAgICdKb2xseVBob25pY3MnOiA2LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3RoJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ3RoJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdtJzoge1xuICAgICdKb2xseVBob25pY3MnOiAyLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdhbHQxJzogJ21tJyxcbiAgICAgICdhbHQyJzogJ21iJyxcbiAgICAgICdhbHQzJzogJ21uJyxcbiAgICAgICdhbHQ0JzogJ2xtJyxcbiAgICAgICdtYWluJzogJ20nLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDIsXG4gICAgJ3Bob25lbWUnOiAnbScsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnbic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnYWx0MSc6ICdubicsXG4gICAgICAnYWx0Mic6ICdrbicsXG4gICAgICAnYWx0Myc6ICdnbicsXG4gICAgICAnYWx0NCc6ICdwbicsXG4gICAgICAnbWFpbic6ICduJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiAyLFxuICAgICdwaG9uZW1lJzogJ24nLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ25nJzoge1xuICAgICdKb2xseVBob25pY3MnOiA1LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ25nJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ25nJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdvJzoge1xuICAgICdKb2xseVBob25pY3MnOiAzLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ28nLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDMsXG4gICAgJ3Bob25lbWUnOiAnbycsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdvYSc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNCxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdvYScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdvYScsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdvaSc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdvaScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdvaScsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdvbyc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdvbycsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdvbycsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdvcic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNCxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdvcicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdvcicsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdvdyc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdvdycsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdvdycsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdwJzoge1xuICAgICdKb2xseVBob25pY3MnOiAxLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdhbHQxJzogJ3BwJyxcbiAgICAgICdtYWluJzogJ3AnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDEsXG4gICAgJ3Bob25lbWUnOiAncCcsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAncic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdyJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA0LFxuICAgICdwaG9uZW1lJzogJ3InLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ3MnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDEsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ2FsdDEnOiAnc3MnLFxuICAgICAgJ2FsdDInOiAnYycsXG4gICAgICAnYWx0Myc6ICdzYycsXG4gICAgICAnYWx0NCc6ICdwcycsXG4gICAgICAnYWx0NSc6ICdzdCcsXG4gICAgICAnYWx0Nic6ICdjZScsXG4gICAgICAnYWx0Nyc6ICdzZScsXG4gICAgICAnbWFpbic6ICdzJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiAxLFxuICAgICdwaG9uZW1lJzogJ3MnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ3NoJzoge1xuICAgICdKb2xseVBob25pY3MnOiA2LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3NoJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ3NoJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICd0Jzoge1xuICAgICdKb2xseVBob25pY3MnOiAxLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdhbHQxJzogJ3R0JyxcbiAgICAgICdhbHQyJzogJ3RoJyxcbiAgICAgICdhbHQzJzogJ2VkJyxcbiAgICAgICdtYWluJzogJ3QnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDEsXG4gICAgJ3Bob25lbWUnOiAndCcsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAndGgnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDYsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAndGgnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAndGgnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ3UnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDMsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAndScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNCxcbiAgICAncGhvbmVtZSc6ICd1JyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ3VlJzoge1xuICAgICdKb2xseVBob25pY3MnOiA3LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3VlJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ3VlJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ3VyJzoge1xuICAgICdKb2xseVBob25pY3MnOiA3LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3VyJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ3VyJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ3VyZSc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICd1cmUnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAndXJlJyxcbiAgICAndHlwZSc6IDMsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICd2Jzoge1xuICAgICdKb2xseVBob25pY3MnOiA1LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3YnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDYsXG4gICAgJ3Bob25lbWUnOiAndicsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAndyc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICd3JyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA2LFxuICAgICdwaG9uZW1lJzogJ3cnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ3knOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDYsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAneScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICd5JyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICd6Jzoge1xuICAgICdKb2xseVBob25pY3MnOiA1LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3onLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAneicsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnemgnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDcsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnemgnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnemgnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHBob25lbWVzO1xuIiwiY29uc3QgcmVtb3ZlRWxlbWVudHMgPSB7XG5cdHJlbW92ZUNvbnRlbnQ6IGZ1bmN0aW9uKCkge1xuXHRsZXQgY2hpbGRyZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250ZW50Jyk7XG5cdHdoaWxlIChjaGlsZHJlblswXS5maXJzdENoaWxkKSB7XG5cdFx0Y2hpbGRyZW5bMF0ucmVtb3ZlQ2hpbGQoY2hpbGRyZW5bMF0uZmlyc3RDaGlsZCk7XG5cdH1cbn0sXG5cdHJlbW92ZUhlYWRpbmdUZXh0OiBmdW5jdGlvbigpIHtcblx0XHRsZXQgaGVhZFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGluZycpO1xuXHRcdHdoaWxlIChoZWFkVGV4dC5maXJzdENoaWxkKSB7XG5cdFx0XHRoZWFkVGV4dC5yZW1vdmVDaGlsZChoZWFkVGV4dC5maXJzdENoaWxkKTtcblx0XHR9XG5cdH0sXG59O1xubW9kdWxlLmV4cG9ydHMgPSByZW1vdmVFbGVtZW50cztcbiJdfQ==
