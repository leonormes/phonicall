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
	var headText = 'Billy';

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
		});
		document.getElementsByClassName('header')[0].appendChild(heading);
		setHeadingText('What to do');
	}

	function setHeadingText(text) {
		removeElements.removeHeadingText();
		var parentDiv = document.getElementById('heading');
		var textNode = document.createTextNode(text);
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
		setHeadingText(card);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2NyZWF0ZVBhZ2UuanMiLCJzcmMvcGhvbmVtZXMuanMiLCJzcmMvcmVtb3ZlRWxlbWVudHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQU0sV0FBVyxRQUFRLFlBQVIsQ0FBakI7QUFDQSxJQUFNLGlCQUFpQixRQUFRLGtCQUFSLENBQXZCO0FBQ0EsSUFBTSxhQUFhLFFBQVEsY0FBUixDQUFuQjs7QUFFQSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFXO0FBQ3hEOztBQUNBLFVBQVMsSUFBVCxDQUFjLE1BQWQsR0FDQSxXQUFXLFNBQVgsRUFEQTtBQUVBLFlBQVcsV0FBWDtBQUNBLFlBQVcsWUFBWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBTSxVQUFVLEVBQWhCO0FBQ0EsS0FBSSxhQUFhLENBQWpCO0FBQ0EsS0FBTSxRQUFRLENBQUMsT0FBRCxFQUFVLFNBQVYsQ0FBZDtBQUNBLEtBQUksV0FBVyxPQUFmOztBQUVBLFVBQVMsUUFBVCxHQUFvQjtBQUNuQixRQUFNLE9BQU4sQ0FBYyxVQUFTLElBQVQsRUFBZTtBQUM1QixPQUFJLE9BQU8sU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQVg7QUFDQSxPQUFJLFdBQVcsU0FBUyxjQUFULENBQXdCLElBQXhCLENBQWY7QUFDQSxRQUFLLFlBQUwsQ0FBa0IsSUFBbEIsRUFBd0IsS0FBSyxXQUFMLEVBQXhCO0FBQ0EsUUFBSyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixZQUFXO0FBQ3pDLGFBQVMsS0FBSyxFQUFkO0FBQ0EsSUFGRDtBQUdBLFFBQUssV0FBTCxDQUFpQixRQUFqQjtBQUNBLFlBQVMsc0JBQVQsQ0FBZ0MsU0FBaEMsRUFBMkMsQ0FBM0MsRUFBOEMsV0FBOUMsQ0FBMEQsSUFBMUQ7QUFDQSxHQVRE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O0FBRUosZ0JBQVk7QUFDVixjQUFRO0FBREUsS0FGUjtBQUtKLDhCQUEwQixDQUx0QjtBQU1KLDRCQUF3QixDQU5wQjtBQU9KLGVBQVcsSUFQUDtBQVFKLFlBQVEsQ0FSSjtBQVNKLGFBQVM7QUFUTDtBQWhoQlMsQ0FBakI7QUE0aEJBLE9BQU8sT0FBUCxHQUFpQixRQUFqQjs7Ozs7QUM1aEJBLElBQU0saUJBQWlCO0FBQ3RCLGdCQUFlLHlCQUFXO0FBQzFCLE1BQUksV0FBVyxTQUFTLHNCQUFULENBQWdDLFNBQWhDLENBQWY7QUFDQSxTQUFPLFNBQVMsQ0FBVCxFQUFZLFVBQW5CLEVBQStCO0FBQzlCLFlBQVMsQ0FBVCxFQUFZLFdBQVosQ0FBd0IsU0FBUyxDQUFULEVBQVksVUFBcEM7QUFDQTtBQUNELEVBTnNCO0FBT3RCLG9CQUFtQiw2QkFBVztBQUM3QixNQUFJLFdBQVcsU0FBUyxjQUFULENBQXdCLFNBQXhCLENBQWY7QUFDQSxTQUFPLFNBQVMsVUFBaEIsRUFBNEI7QUFDM0IsWUFBUyxXQUFULENBQXFCLFNBQVMsVUFBOUI7QUFDQTtBQUNEO0FBWnFCLENBQXZCO0FBY0EsT0FBTyxPQUFQLEdBQWlCLGNBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IHBob25lbWVzID0gcmVxdWlyZSgnLi9waG9uZW1lcycpO1xuY29uc3QgcmVtb3ZlRWxlbWVudHMgPSByZXF1aXJlKCcuL3JlbW92ZUVsZW1lbnRzJyk7XG5jb25zdCBjcmVhdGVQYWdlID0gcmVxdWlyZSgnLi9jcmVhdGVQYWdlJyk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHRkb2N1bWVudC5ib2R5Lm9ubG9hZCA9XG5cdGNyZWF0ZVBhZ2UucGFnZUZyYW1lKCk7XG5cdGNyZWF0ZVBhZ2UuaGVhZGVyRnJhbWUoKTtcblx0Y3JlYXRlUGFnZS5jb250ZW50RnJhbWUoKTtcblxuXHQvLyBpZignc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKSB7XG5cdC8vIFx0bmF2aWdhdG9yLnNlcnZpY2VXb3JrZXJcblx0Ly8gXHQucmVnaXN0ZXIoJ3N3LmpzJylcblx0Ly8gXHQudGhlbihmdW5jdGlvbigpIHtcblx0Ly8gXHRcdGNvbnNvbGUubG9nKCdTZXJ2aWNlIFdvcmtlciBSZWdpc3RlcmVkJyk7XG5cdC8vIFx0fSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG5cdC8vIFx0XHRjb25zb2xlLmxvZygnRmFpbGVkIHRvIHJlZ2lzdGVyIFNlcnZpY2UgV29ya2VyJyk7XG5cdC8vIFx0fSk7XG5cdC8vIH1cblxuXHRjb25zdCBjYXJkU2V0ID0gW107XG5cdGxldCBjYXJkTnVtYmVyID0gMDtcblx0Y29uc3QgdGFza3MgPSBbJ1RlYWNoJywgJ0FuYWx5c2UnXTtcblx0bGV0IGhlYWRUZXh0ID0gJ0JpbGx5JztcblxuXHRmdW5jdGlvbiBhZGRUYXNrcygpIHtcblx0XHR0YXNrcy5mb3JFYWNoKGZ1bmN0aW9uKHRhc2spIHtcblx0XHRcdGxldCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdFx0XHRsZXQgbGlua1RleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0YXNrKTtcblx0XHRcdGxpbmsuc2V0QXR0cmlidXRlKCdpZCcsIHRhc2sudG9Mb3dlckNhc2UoKSk7XG5cdFx0XHRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGVudGVyQXBwKHRoaXMuaWQpO1xuXHRcdFx0fSk7XG5cdFx0XHRsaW5rLmFwcGVuZENoaWxkKGxpbmtUZXh0KTtcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbnRlbnQnKVswXS5hcHBlbmRDaGlsZChsaW5rKTtcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFkZEhlYWRpbmcoKSB7XG5cdFx0bGV0IGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuXHRcdGhlYWRpbmcuc2V0QXR0cmlidXRlKCdpZCcsICdoZWFkaW5nJyk7XG5cdFx0aGVhZGluZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0cmVtb3ZlRWxlbWVudHMucmVtb3ZlQ29udGVudCgpO1xuXHRcdFx0YWRkVGFza3MoKTtcblx0XHR9KTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdoZWFkZXInKVswXS5hcHBlbmRDaGlsZChoZWFkaW5nKTtcblx0XHRzZXRIZWFkaW5nVGV4dCgnV2hhdCB0byBkbycpO1xuXHR9XG5cblx0ZnVuY3Rpb24gc2V0SGVhZGluZ1RleHQodGV4dCkge1xuXHRcdHJlbW92ZUVsZW1lbnRzLnJlbW92ZUhlYWRpbmdUZXh0KCk7XG5cdFx0bGV0IHBhcmVudERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkaW5nJyk7XG5cdFx0bGV0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG5cdFx0cGFyZW50RGl2LmFwcGVuZENoaWxkKHRleHROb2RlKTtcblx0XHRjb25zb2xlLmxvZyhwYXJlbnREaXYsIHRleHQpO1xuXHR9O1xuXHRhZGRIZWFkaW5nKCk7XG5cdGFkZFRhc2tzKCk7XG5cblx0ZnVuY3Rpb24gZW50ZXJBcHAodGFzaykge1xuXHRcdHJlbW92ZUVsZW1lbnRzLnJlbW92ZUNvbnRlbnQoKTtcblx0XHRzd2l0Y2ggKHRhc2spIHtcblx0XHRcdGNhc2UgJ3RlYWNoJzpcblx0XHRcdGNvbnNvbGUubG9nKHRhc2spO1xuXHRcdFx0c2V0SGVhZGluZ1RleHQodGFzayk7XG5cdFx0XHRjYXJkRGVja3MoKTtcblx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnYXNzZXNzJzpcblx0XHRcdGNvbnNvbGUubG9nKHRhc2spO1xuXHRcdFx0Y3JlYXRlQXNzZXNzbWVudENhcmRzKCk7XG5cdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ0FuYWx5c2UnOlxuXHRcdFx0ZGVmYXVsdDpcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBjYXJkRGVja3MoKSB7XG5cdFx0Zm9yKGxldCBpID0gMTsgaSA8IDg7IGkrKykge1xuXHRcdFx0bGV0IGRlY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdGxldCBkZWNrTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnU2V0ICcraSk7XG5cdFx0XHRkZWNrLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY2FyZC1kZWNrJyk7XG5cdFx0XHRkZWNrLnNldEF0dHJpYnV0ZSgnaWQnLCBpKTtcblx0XHRcdGRlY2suYXBwZW5kQ2hpbGQoZGVja0xhYmVsKTtcblx0XHRcdGRlY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y3JlYXRlRmxhc2hDYXJkKHRoaXMuaWQpO1xuXHRcdFx0fSk7XG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250ZW50JylbMF0uYXBwZW5kQ2hpbGQoZGVjayk7XG5cdFx0fTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNyZWF0ZUZsYXNoQ2FyZChzZXRJRCkge1xuXHRcdGxldCBjYXJkID0gZmxhc2hDYXJkU2V0KHNldElEKTtcblx0XHRzZXRIZWFkaW5nVGV4dChjYXJkKTtcblx0XHRsZXQgcGhvbmVtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdHBob25lbWUuc2V0QXR0cmlidXRlKCdpZCcsICdmbGFzaGNhcmQnKTtcblx0XHRwaG9uZW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRuZXh0Q2FyZCgpO1xuXHRcdH0pO1xuXHRcdGxldCBncmFwaGVtZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNhcmRbY2FyZE51bWJlcl0pO1xuXHRcdHBob25lbWUuYXBwZW5kQ2hpbGQoZ3JhcGhlbWUpO1xuXHRcdHJlbW92ZUVsZW1lbnRzLnJlbW92ZUNvbnRlbnQoKTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250ZW50JylbMF0uYXBwZW5kQ2hpbGQocGhvbmVtZSk7XG5cdH07XG5cblx0ZnVuY3Rpb24gY3JlYXRlQXNzZXNzbWVudENhcmRzKCkge1xuXHRcdGxldCBwaG9uZW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0bGV0IGdyYXBoZW1lID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ2EnKTtcblx0XHRwaG9uZW1lLmFwcGVuZENoaWxkKGdyYXBoZW1lKTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250ZW50JylbMF0uYXBwZW5kQ2hpbGQocGhvbmVtZSk7XG5cdH07XG5cblxuXHRmdW5jdGlvbiBuZXh0Q2FyZCgpIHtcblx0XHRsZXQgZGVja1NpemUgPSBjYXJkU2V0Lmxlbmd0aDtcblx0XHRpZiAoY2FyZE51bWJlciA9PT0gZGVja1NpemUtMSkge1xuXHRcdFx0Y2FyZE51bWJlciA9IDA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNhcmROdW1iZXIrKztcblx0XHR9O1xuXHRcdGxldCBjYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZsYXNoY2FyZCcpO1xuXHRcdGxldCBncmFwaGVtZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNhcmRTZXRbY2FyZE51bWJlcl0pO1xuXHRcdGNhcmQucmVwbGFjZUNoaWxkKGdyYXBoZW1lLCBjYXJkLmNoaWxkTm9kZXNbMF0pO1xuXHR9XG5cblx0bGV0IGZsYXNoQ2FyZFNldCA9IGZ1bmN0aW9uKHNldCkge1xuXHRcdGNhcmRTZXQubGVuZ3RoID0gMDtcblx0XHRmb3IgKGxldCBzb3VuZCBpbiBwaG9uZW1lcykge1xuXHRcdFx0aWYgKHBob25lbWVzW3NvdW5kXS5Kb2xseVBob25pY3MgPT09IHBhcnNlSW50KHNldCkpXG5cdFx0XHRjYXJkU2V0LnB1c2gocGhvbmVtZXNbc291bmRdLmdyYXBoZW1lLm1haW4pO1xuXHRcdH1cblx0XHRjb25zb2xlLmxvZyhjYXJkU2V0KTtcblx0XHRyZXR1cm4gY2FyZFNldDtcblx0fTtcbn0pO1xuIiwiY29uc3QgY3JlYXRlUGFnZSA9IHtcblx0cGFnZUZyYW1lOiBmdW5jdGlvbigpIHtcblx0XHRsZXQgb3V0ZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRvdXRlckRpdi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NvbnRhaW5lcicpO1xuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3V0ZXJEaXYpO1xuXHR9LFxuXG5cdGhlYWRlckZyYW1lOiBmdW5jdGlvbigpIHtcblx0XHRsZXQgaGVhZGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0aGVhZGVyRGl2LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaGVhZGVyJyk7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGFpbmVyJylbMF0uYXBwZW5kQ2hpbGQoaGVhZGVyRGl2KTtcblx0fSxcblxuXHRjb250ZW50RnJhbWU6IGZ1bmN0aW9uKCkge1xuXHRcdGxldCBjb250ZW50RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0Y29udGVudERpdi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NvbnRlbnQnKTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250YWluZXInKVswXS5hcHBlbmRDaGlsZChjb250ZW50RGl2KTtcblx0fSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlUGFnZTtcbiIsImNvbnN0IHBob25lbWVzID0ge1xuICAnTG9uZyBvbyc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdvbycsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdvbycsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdhJzoge1xuICAgICdKb2xseVBob25pY3MnOiAxLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2EnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDEsXG4gICAgJ3Bob25lbWUnOiAnYScsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdhZSc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNCxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdhZScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdhZScsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdhaXInOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDcsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnYWlyJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ2FpcicsXG4gICAgJ3R5cGUnOiAzLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdhcic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdhcicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdhcicsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdiJzoge1xuICAgICdKb2xseVBob25pY3MnOiAzLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2InLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDUsXG4gICAgJ3Bob25lbWUnOiAnYicsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnY2gnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDYsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnY2gnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnY2gnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ2QnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDIsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ2FsdDEnOiAnZGQnLFxuICAgICAgJ2FsdDInOiAnZWQnLFxuICAgICAgJ21haW4nOiAnZCcsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogMixcbiAgICAncGhvbmVtZSc6ICdkJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdlJzoge1xuICAgICdKb2xseVBob25pY3MnOiAyLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2UnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDQsXG4gICAgJ3Bob25lbWUnOiAnZScsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdlYXInOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDcsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnZWFyJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ2VhcicsXG4gICAgJ3R5cGUnOiAzLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdlZSc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNCxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdlZScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdlZScsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdlcic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdlcicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdlcicsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdmJzoge1xuICAgICdKb2xseVBob25pY3MnOiAzLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2YnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDUsXG4gICAgJ3Bob25lbWUnOiAnZicsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnZyc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdnJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiAzLFxuICAgICdwaG9uZW1lJzogJ2cnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ2gnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDIsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnaCcsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNSxcbiAgICAncGhvbmVtZSc6ICdoJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdpJzoge1xuICAgICdKb2xseVBob25pY3MnOiAxLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2knLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDIsXG4gICAgJ3Bob25lbWUnOiAnaScsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdpZ2gnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDQsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnaWdoJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ2lnaCcsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICdqJzoge1xuICAgICdKb2xseVBob25pY3MnOiA0LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2onLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDYsXG4gICAgJ3Bob25lbWUnOiAnaicsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnayc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdrJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiAzLFxuICAgICdwaG9uZW1lJzogJ2snLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ2tzJzoge1xuICAgICdKb2xseVBob25pY3MnOiA2LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2tzJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ2tzJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdrdyc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdrdycsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdrdycsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnbCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdsJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA1LFxuICAgICdwaG9uZW1lJzogJ2wnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ2xvbmcgdGgnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDYsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAndGgnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAndGgnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ20nOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDIsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ2FsdDEnOiAnbW0nLFxuICAgICAgJ2FsdDInOiAnbWInLFxuICAgICAgJ2FsdDMnOiAnbW4nLFxuICAgICAgJ2FsdDQnOiAnbG0nLFxuICAgICAgJ21haW4nOiAnbScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogMixcbiAgICAncGhvbmVtZSc6ICdtJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICduJzoge1xuICAgICdKb2xseVBob25pY3MnOiAxLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdhbHQxJzogJ25uJyxcbiAgICAgICdhbHQyJzogJ2tuJyxcbiAgICAgICdhbHQzJzogJ2duJyxcbiAgICAgICdhbHQ0JzogJ3BuJyxcbiAgICAgICdtYWluJzogJ24nLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDIsXG4gICAgJ3Bob25lbWUnOiAnbicsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnbmcnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDUsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnbmcnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnbmcnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ28nOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDMsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnbycsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogMyxcbiAgICAncGhvbmVtZSc6ICdvJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ29hJzoge1xuICAgICdKb2xseVBob25pY3MnOiA0LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ29hJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ29hJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ29pJzoge1xuICAgICdKb2xseVBob25pY3MnOiA3LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ29pJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ29pJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ29vJzoge1xuICAgICdKb2xseVBob25pY3MnOiA1LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ29vJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ29vJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ29yJzoge1xuICAgICdKb2xseVBob25pY3MnOiA0LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ29yJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ29yJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ293Jzoge1xuICAgICdKb2xseVBob25pY3MnOiA3LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ293JyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ293JyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ3AnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDEsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ2FsdDEnOiAncHAnLFxuICAgICAgJ21haW4nOiAncCcsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogMSxcbiAgICAncGhvbmVtZSc6ICdwJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdyJzoge1xuICAgICdKb2xseVBob25pY3MnOiAyLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3InLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDQsXG4gICAgJ3Bob25lbWUnOiAncicsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAncyc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnYWx0MSc6ICdzcycsXG4gICAgICAnYWx0Mic6ICdjJyxcbiAgICAgICdhbHQzJzogJ3NjJyxcbiAgICAgICdhbHQ0JzogJ3BzJyxcbiAgICAgICdhbHQ1JzogJ3N0JyxcbiAgICAgICdhbHQ2JzogJ2NlJyxcbiAgICAgICdhbHQ3JzogJ3NlJyxcbiAgICAgICdtYWluJzogJ3MnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDEsXG4gICAgJ3Bob25lbWUnOiAncycsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnc2gnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDYsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnc2gnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnc2gnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ3QnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDEsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ2FsdDEnOiAndHQnLFxuICAgICAgJ2FsdDInOiAndGgnLFxuICAgICAgJ2FsdDMnOiAnZWQnLFxuICAgICAgJ21haW4nOiAndCcsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogMSxcbiAgICAncGhvbmVtZSc6ICd0JyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICd0aCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICd0aCcsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICd0aCcsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAndSc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICd1JyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA0LFxuICAgICdwaG9uZW1lJzogJ3UnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAndWUnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDcsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAndWUnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAndWUnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAndXInOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDcsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAndXInLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAndXInLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAndXJlJzoge1xuICAgICdKb2xseVBob25pY3MnOiA3LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3VyZScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICd1cmUnLFxuICAgICd0eXBlJzogMyxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ3YnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDUsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAndicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNixcbiAgICAncGhvbmVtZSc6ICd2JyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICd3Jzoge1xuICAgICdKb2xseVBob25pY3MnOiA1LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3cnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDYsXG4gICAgJ3Bob25lbWUnOiAndycsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAneSc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICd5JyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ3knLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ3onOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDUsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAneicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICd6JyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICd6aCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICd6aCcsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICd6aCcsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxufTtcbm1vZHVsZS5leHBvcnRzID0gcGhvbmVtZXM7XG4iLCJjb25zdCByZW1vdmVFbGVtZW50cyA9IHtcblx0cmVtb3ZlQ29udGVudDogZnVuY3Rpb24oKSB7XG5cdGxldCBjaGlsZHJlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbnRlbnQnKTtcblx0d2hpbGUgKGNoaWxkcmVuWzBdLmZpcnN0Q2hpbGQpIHtcblx0XHRjaGlsZHJlblswXS5yZW1vdmVDaGlsZChjaGlsZHJlblswXS5maXJzdENoaWxkKTtcblx0fVxufSxcblx0cmVtb3ZlSGVhZGluZ1RleHQ6IGZ1bmN0aW9uKCkge1xuXHRcdGxldCBoZWFkVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkaW5nJyk7XG5cdFx0d2hpbGUgKGhlYWRUZXh0LmZpcnN0Q2hpbGQpIHtcblx0XHRcdGhlYWRUZXh0LnJlbW92ZUNoaWxkKGhlYWRUZXh0LmZpcnN0Q2hpbGQpO1xuXHRcdH1cblx0fSxcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHJlbW92ZUVsZW1lbnRzO1xuIl19
