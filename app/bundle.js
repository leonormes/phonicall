(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var phonemes = require('./phonemes.js');

document.addEventListener('DOMContentLoaded', function () {
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

	var cardSet = [];
	var cardNumber = 0;

	function createPage() {
		var tasks = ['Teach', 'Assess', 'Analyse'];
		function pageFrame() {
			var outerDiv = document.createElement('div');
			outerDiv.setAttribute('class', 'container');
			document.body.appendChild(outerDiv);
		}

		function headerFrame() {
			var headerDiv = document.createElement('div');
			headerDiv.setAttribute('class', 'header');
			document.getElementsByClassName('container')[0].appendChild(headerDiv);
		}

		function contentFrame() {
			var contentDiv = document.createElement('div');
			contentDiv.setAttribute('class', 'content');
			document.getElementsByClassName('container')[0].appendChild(contentDiv);
		}

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
			var whatDoYouWantToDo = document.createTextNode('Flashcards with a memory');
			heading.addEventListener('click', function () {
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
		var phoneme = document.createElement('div');
		phoneme.setAttribute('id', 'flashcard');
		phoneme.addEventListener('click', function () {
			nextCard();
		});
		var grapheme = document.createTextNode(card[cardNumber]);
		phoneme.appendChild(grapheme);
		removeContent();
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

	function removeContent() {
		var children = document.getElementsByClassName('content');
		while (children[0].firstChild) {
			children[0].removeChild(children[0].firstChild);
		}
	}
});

},{"./phonemes.js":2}],2:[function(require,module,exports){
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

},{}]},{},[1,2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL3Bob25lbWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLFdBQVcsUUFBUSxlQUFSLENBQWpCOztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVc7QUFDeEQ7O0FBQ0EsVUFBUyxJQUFULENBQWMsTUFBZCxHQUF1QixZQUF2Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBTSxVQUFVLEVBQWhCO0FBQ0EsS0FBSSxhQUFhLENBQWpCOztBQUVBLFVBQVMsVUFBVCxHQUFzQjtBQUNyQixNQUFNLFFBQVEsQ0FBQyxPQUFELEVBQVUsUUFBVixFQUFvQixTQUFwQixDQUFkO0FBQ0EsV0FBUyxTQUFULEdBQXFCO0FBQ3BCLE9BQUksV0FBVyxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBZjtBQUNBLFlBQVMsWUFBVCxDQUFzQixPQUF0QixFQUErQixXQUEvQjtBQUNBLFlBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsUUFBMUI7QUFDQTs7QUFFRCxXQUFTLFdBQVQsR0FBdUI7QUFDdEIsT0FBSSxZQUFZLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFoQjtBQUNBLGFBQVUsWUFBVixDQUF1QixPQUF2QixFQUFnQyxRQUFoQztBQUNBLFlBQVMsc0JBQVQsQ0FBZ0MsV0FBaEMsRUFBNkMsQ0FBN0MsRUFBZ0QsV0FBaEQsQ0FBNEQsU0FBNUQ7QUFDQTs7QUFFRCxXQUFTLFlBQVQsR0FBd0I7QUFDdkIsT0FBSSxhQUFhLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFqQjtBQUNBLGNBQVcsWUFBWCxDQUF3QixPQUF4QixFQUFpQyxTQUFqQztBQUNBLFlBQVMsc0JBQVQsQ0FBZ0MsV0FBaEMsRUFBNkMsQ0FBN0MsRUFBZ0QsV0FBaEQsQ0FBNEQsVUFBNUQ7QUFDQTs7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Ukg7QUFTTCxhQUFTO0FBVEosR0F6ZFE7QUFvZWYsT0FBSztBQUNILG9CQUFnQixDQURiO0FBRUgsZ0JBQVk7QUFDVixjQUFRO0FBREUsS0FGVDtBQUtILDhCQUEwQixDQUx2QjtBQU1ILDRCQUF3QixDQU5yQjtBQU9ILGVBQVcsR0FQUjtBQVFILFlBQVEsQ0FSTDtBQVNILGFBQVM7QUFUTixHQXBlVTtBQStlZixPQUFLO0FBQ0gsb0JBQWdCLENBRGI7QUFFSCxnQkFBWTtBQUNWLGNBQVE7QUFERSxLQUZUO0FBS0gsOEJBQTBCLENBTHZCO0FBTUgsNEJBQXdCLENBTnJCO0FBT0gsZUFBVyxHQVBSO0FBUUgsWUFBUSxDQVJMO0FBU0gsYUFBUztBQVROLEdBL2VVO0FBMGZmLE9BQUs7QUFDSCxvQkFBZ0IsQ0FEYjtBQUVILGdCQUFZO0FBQ1YsY0FBUTtBQURFLEtBRlQ7QUFLSCw4QkFBMEIsQ0FMdkI7QUFNSCw0QkFBd0IsQ0FOckI7QUFPSCxlQUFXLEdBUFI7QUFRSCxZQUFRLENBUkw7QUFTSCxhQUFTO0FBVE4sR0ExZlU7QUFxZ0JmLE9BQUs7QUFDSCxvQkFBZ0IsQ0FEYjtBQUVILGdCQUFZO0FBQ1YsY0FBUTtBQURFLEtBRlQ7QUFLSCw4QkFBMEIsQ0FMdkI7QUFNSCw0QkFBd0IsQ0FOckI7QUFPSCxlQUFXLEdBUFI7QUFRSCxZQUFRLENBUkw7QUFTSCxhQUFTO0FBVE4sR0FyZ0JVO0FBZ2hCZixRQUFNO0FBQ0osb0JBQWdCLENBRFo7QUFFSixnQkFBWTtBQUNWLGNBQVE7QUFERSxLQUZSO0FBS0osOEJBQTBCLENBTHRCO0FBTUosNEJBQXdCLENBTnBCO0FBT0osZUFBVyxJQVBQO0FBUUosWUFBUSxDQVJKO0FBU0osYUFBUztBQVRMO0FBaGhCUyxDQUFqQjtBQTRoQkEsT0FBTyxPQUFQLEdBQWlCLFFBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IHBob25lbWVzID0gcmVxdWlyZSgnLi9waG9uZW1lcy5qcycpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0ZG9jdW1lbnQuYm9keS5vbmxvYWQgPSBjcmVhdGVQYWdlKCk7XG5cblx0Ly8gaWYoJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvcikge1xuXHQvLyBcdG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyXG5cdC8vIFx0LnJlZ2lzdGVyKCdzdy5qcycpXG5cdC8vIFx0LnRoZW4oZnVuY3Rpb24oKSB7XG5cdC8vIFx0XHRjb25zb2xlLmxvZygnU2VydmljZSBXb3JrZXIgUmVnaXN0ZXJlZCcpO1xuXHQvLyBcdH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuXHQvLyBcdFx0Y29uc29sZS5sb2coJ0ZhaWxlZCB0byByZWdpc3RlciBTZXJ2aWNlIFdvcmtlcicpO1xuXHQvLyBcdH0pO1xuXHQvLyB9XG5cblx0Y29uc3QgY2FyZFNldCA9IFtdO1xuXHRsZXQgY2FyZE51bWJlciA9IDA7XG5cblx0ZnVuY3Rpb24gY3JlYXRlUGFnZSgpIHtcblx0XHRjb25zdCB0YXNrcyA9IFsnVGVhY2gnLCAnQXNzZXNzJywgJ0FuYWx5c2UnXTtcblx0XHRmdW5jdGlvbiBwYWdlRnJhbWUoKSB7XG5cdFx0XHRsZXQgb3V0ZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdG91dGVyRGl2LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY29udGFpbmVyJyk7XG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG91dGVyRGl2KTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBoZWFkZXJGcmFtZSgpIHtcblx0XHRcdGxldCBoZWFkZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdGhlYWRlckRpdi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2hlYWRlcicpO1xuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGFpbmVyJylbMF0uYXBwZW5kQ2hpbGQoaGVhZGVyRGl2KTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBjb250ZW50RnJhbWUoKSB7XG5cdFx0XHRsZXQgY29udGVudERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0Y29udGVudERpdi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NvbnRlbnQnKTtcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbnRhaW5lcicpWzBdLmFwcGVuZENoaWxkKGNvbnRlbnREaXYpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGFkZFRhc2tzKCkge1xuXHRcdFx0dGFza3MuZm9yRWFjaChmdW5jdGlvbih0YXNrKSB7XG5cdFx0XHRcdGxldCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdFx0XHRcdGxldCBsaW5rVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRhc2spO1xuXHRcdFx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaWQnLCB0YXNrLnRvTG93ZXJDYXNlKCkpO1xuXHRcdFx0XHRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0ZW50ZXJBcHAodGhpcy5pZCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRsaW5rLmFwcGVuZENoaWxkKGxpbmtUZXh0KTtcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGVudCcpWzBdLmFwcGVuZENoaWxkKGxpbmspO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gYWRkSGVhZGluZygpIHtcblx0XHRcdGxldCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcblx0XHRcdGxldCB3aGF0RG9Zb3VXYW50VG9EbyA9XG5cdFx0XHRkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnRmxhc2hjYXJkcyB3aXRoIGEgbWVtb3J5Jyk7XG5cdFx0XHRoZWFkaW5nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJlbW92ZUNvbnRlbnQoKTtcblx0XHRcdFx0YWRkVGFza3MoKTtcblx0XHRcdH0pO1xuXHRcdFx0aGVhZGluZy5hcHBlbmRDaGlsZCh3aGF0RG9Zb3VXYW50VG9Ebyk7XG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdoZWFkZXInKVswXS5hcHBlbmRDaGlsZChoZWFkaW5nKTtcblx0XHR9XG5cdFx0cGFnZUZyYW1lKCk7XG5cdFx0aGVhZGVyRnJhbWUoKTtcblx0XHRjb250ZW50RnJhbWUoKTtcblx0XHRhZGRIZWFkaW5nKCk7XG5cdFx0YWRkVGFza3MoKTtcblx0fTtcblxuXHRmdW5jdGlvbiBlbnRlckFwcCh0YXNrKSB7XG5cdFx0cmVtb3ZlQ29udGVudCgpO1xuXHRcdHN3aXRjaCAodGFzaykge1xuXHRcdFx0Y2FzZSAndGVhY2gnOlxuXHRcdFx0Y29uc29sZS5sb2codGFzayk7XG5cdFx0XHRjYXJkRGVja3MoKTtcblx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnYXNzZXNzJzpcblx0XHRcdGNvbnNvbGUubG9nKHRhc2spO1xuXHRcdFx0Y3JlYXRlQXNzZXNzbWVudENhcmRzKCk7XG5cdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ0FuYWx5c2UnOlxuXHRcdFx0ZGVmYXVsdDpcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBjYXJkRGVja3MoKSB7XG5cdFx0Zm9yKGxldCBpID0gMTsgaSA8IDg7IGkrKykge1xuXHRcdFx0bGV0IGRlY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdGxldCBkZWNrTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnU2V0ICcraSk7XG5cdFx0XHRkZWNrLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY2FyZC1kZWNrJyk7XG5cdFx0XHRkZWNrLnNldEF0dHJpYnV0ZSgnaWQnLCBpKTtcblx0XHRcdGRlY2suYXBwZW5kQ2hpbGQoZGVja0xhYmVsKTtcblx0XHRcdGRlY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y3JlYXRlRmxhc2hDYXJkKHRoaXMuaWQpO1xuXHRcdFx0fSk7XG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250ZW50JylbMF0uYXBwZW5kQ2hpbGQoZGVjayk7XG5cdFx0fTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNyZWF0ZUZsYXNoQ2FyZChzZXRJRCkge1xuXHRcdGxldCBjYXJkID0gZmxhc2hDYXJkU2V0KHNldElEKTtcblx0XHRsZXQgcGhvbmVtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdHBob25lbWUuc2V0QXR0cmlidXRlKCdpZCcsICdmbGFzaGNhcmQnKTtcblx0XHRwaG9uZW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRuZXh0Q2FyZCgpO1xuXHRcdH0pO1xuXHRcdGxldCBncmFwaGVtZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNhcmRbY2FyZE51bWJlcl0pO1xuXHRcdHBob25lbWUuYXBwZW5kQ2hpbGQoZ3JhcGhlbWUpO1xuXHRcdHJlbW92ZUNvbnRlbnQoKTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250ZW50JylbMF0uYXBwZW5kQ2hpbGQocGhvbmVtZSk7XG5cdH07XG5cblx0ZnVuY3Rpb24gY3JlYXRlQXNzZXNzbWVudENhcmRzKCkge1xuXHRcdGxldCBwaG9uZW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0bGV0IGdyYXBoZW1lID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ2EnKTtcblx0XHRwaG9uZW1lLmFwcGVuZENoaWxkKGdyYXBoZW1lKTtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb250ZW50JylbMF0uYXBwZW5kQ2hpbGQocGhvbmVtZSk7XG5cdH07XG5cblxuXHRmdW5jdGlvbiBuZXh0Q2FyZCgpIHtcblx0XHRsZXQgZGVja1NpemUgPSBjYXJkU2V0Lmxlbmd0aDtcblx0XHRpZiAoY2FyZE51bWJlciA9PT0gZGVja1NpemUtMSkge1xuXHRcdFx0Y2FyZE51bWJlciA9IDA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNhcmROdW1iZXIrKztcblx0XHRcdH07XG5cdFx0bGV0IGNhcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmxhc2hjYXJkJyk7XG5cdFx0bGV0IGdyYXBoZW1lID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2FyZFNldFtjYXJkTnVtYmVyXSk7XG5cdFx0Y2FyZC5yZXBsYWNlQ2hpbGQoZ3JhcGhlbWUsIGNhcmQuY2hpbGROb2Rlc1swXSk7XG5cdH1cblxuXHRsZXQgZmxhc2hDYXJkU2V0ID0gZnVuY3Rpb24oc2V0KSB7XG5cdFx0Y2FyZFNldC5sZW5ndGggPSAwO1xuXHRcdGZvciAobGV0IHNvdW5kIGluIHBob25lbWVzKSB7XG5cdFx0XHRpZiAocGhvbmVtZXNbc291bmRdLkpvbGx5UGhvbmljcyA9PT0gcGFyc2VJbnQoc2V0KSlcblx0XHRcdGNhcmRTZXQucHVzaChwaG9uZW1lc1tzb3VuZF0uZ3JhcGhlbWUubWFpbik7XG5cdFx0fVxuXHRcdGNvbnNvbGUubG9nKGNhcmRTZXQpO1xuXHRcdHJldHVybiBjYXJkU2V0O1xuXHR9O1xuXG5cdGZ1bmN0aW9uIHJlbW92ZUNvbnRlbnQoKSB7XG5cdFx0bGV0IGNoaWxkcmVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGVudCcpO1xuXHRcdHdoaWxlIChjaGlsZHJlblswXS5maXJzdENoaWxkKSB7XG5cdFx0XHRjaGlsZHJlblswXS5yZW1vdmVDaGlsZChjaGlsZHJlblswXS5maXJzdENoaWxkKTtcblx0XHR9XG5cdH1cbn0pO1xuIiwiY29uc3QgcGhvbmVtZXMgPSB7XG4gICdMb25nIG9vJzoge1xuICAgICdKb2xseVBob25pY3MnOiA1LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ29vJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ29vJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2EnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDEsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnYScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogMSxcbiAgICAncGhvbmVtZSc6ICdhJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2FlJzoge1xuICAgICdKb2xseVBob25pY3MnOiA0LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2FlJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ2FlJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2Fpcic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdhaXInLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnYWlyJyxcbiAgICAndHlwZSc6IDMsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2FyJzoge1xuICAgICdKb2xseVBob25pY3MnOiA3LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2FyJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ2FyJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2InOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDMsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnYicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNSxcbiAgICAncGhvbmVtZSc6ICdiJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdjaCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdjaCcsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdjaCcsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnZCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnYWx0MSc6ICdkZCcsXG4gICAgICAnYWx0Mic6ICdlZCcsXG4gICAgICAnbWFpbic6ICdkJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiAyLFxuICAgICdwaG9uZW1lJzogJ2QnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ2UnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDIsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnZScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNCxcbiAgICAncGhvbmVtZSc6ICdlJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2Vhcic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdlYXInLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnZWFyJyxcbiAgICAndHlwZSc6IDMsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2VlJzoge1xuICAgICdKb2xseVBob25pY3MnOiA0LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2VlJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ2VlJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2VyJzoge1xuICAgICdKb2xseVBob25pY3MnOiA3LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2VyJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ2VyJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2YnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDMsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnZicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNSxcbiAgICAncGhvbmVtZSc6ICdmJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdnJzoge1xuICAgICdKb2xseVBob25pY3MnOiAzLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2cnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDMsXG4gICAgJ3Bob25lbWUnOiAnZycsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnaCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdoJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA1LFxuICAgICdwaG9uZW1lJzogJ2gnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ2knOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDEsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnaScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogMixcbiAgICAncGhvbmVtZSc6ICdpJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2lnaCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNCxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdpZ2gnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnaWdoJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogdHJ1ZSxcbiAgfSxcbiAgJ2onOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDQsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnaicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNixcbiAgICAncGhvbmVtZSc6ICdqJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdrJzoge1xuICAgICdKb2xseVBob25pY3MnOiAyLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2snLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDMsXG4gICAgJ3Bob25lbWUnOiAnaycsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAna3MnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDYsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAna3MnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAna3MnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ2t3Jzoge1xuICAgICdKb2xseVBob25pY3MnOiA3LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2t3JyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ2t3JyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdsJzoge1xuICAgICdKb2xseVBob25pY3MnOiAzLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ2wnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDUsXG4gICAgJ3Bob25lbWUnOiAnbCcsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnbG9uZyB0aCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICd0aCcsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICd0aCcsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnbSc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnYWx0MSc6ICdtbScsXG4gICAgICAnYWx0Mic6ICdtYicsXG4gICAgICAnYWx0Myc6ICdtbicsXG4gICAgICAnYWx0NCc6ICdsbScsXG4gICAgICAnbWFpbic6ICdtJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiAyLFxuICAgICdwaG9uZW1lJzogJ20nLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ24nOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDEsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ2FsdDEnOiAnbm4nLFxuICAgICAgJ2FsdDInOiAna24nLFxuICAgICAgJ2FsdDMnOiAnZ24nLFxuICAgICAgJ2FsdDQnOiAncG4nLFxuICAgICAgJ21haW4nOiAnbicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogMixcbiAgICAncGhvbmVtZSc6ICduJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICduZyc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICduZycsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICduZycsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAnbyc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdvJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiAzLFxuICAgICdwaG9uZW1lJzogJ28nLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnb2EnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDQsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnb2EnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnb2EnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnb2knOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDcsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnb2knLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnb2knLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnb28nOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDUsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnb28nLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnb28nLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnb3InOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDQsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnb3InLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnb3InLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAnb3cnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDcsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAnb3cnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAnb3cnLFxuICAgICd0eXBlJzogMixcbiAgICAndm93ZWwnOiB0cnVlLFxuICB9LFxuICAncCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnYWx0MSc6ICdwcCcsXG4gICAgICAnbWFpbic6ICdwJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiAxLFxuICAgICdwaG9uZW1lJzogJ3AnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ3InOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDIsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAncicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNCxcbiAgICAncGhvbmVtZSc6ICdyJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdzJzoge1xuICAgICdKb2xseVBob25pY3MnOiAxLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdhbHQxJzogJ3NzJyxcbiAgICAgICdhbHQyJzogJ2MnLFxuICAgICAgJ2FsdDMnOiAnc2MnLFxuICAgICAgJ2FsdDQnOiAncHMnLFxuICAgICAgJ2FsdDUnOiAnc3QnLFxuICAgICAgJ2FsdDYnOiAnY2UnLFxuICAgICAgJ2FsdDcnOiAnc2UnLFxuICAgICAgJ21haW4nOiAncycsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDIsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogMSxcbiAgICAncGhvbmVtZSc6ICdzJyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICdzaCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNixcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICdzaCcsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICdzaCcsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAndCc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogMSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnYWx0MSc6ICd0dCcsXG4gICAgICAnYWx0Mic6ICd0aCcsXG4gICAgICAnYWx0Myc6ICdlZCcsXG4gICAgICAnbWFpbic6ICd0JyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMixcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiAxLFxuICAgICdwaG9uZW1lJzogJ3QnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ3RoJzoge1xuICAgICdKb2xseVBob25pY3MnOiA2LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3RoJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ3RoJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICd1Jzoge1xuICAgICdKb2xseVBob25pY3MnOiAzLFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3UnLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAyLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDQsXG4gICAgJ3Bob25lbWUnOiAndScsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICd1ZSc6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICd1ZScsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICd1ZScsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICd1cic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNyxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICd1cicsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNyxcbiAgICAncGhvbmVtZSc6ICd1cicsXG4gICAgJ3R5cGUnOiAyLFxuICAgICd2b3dlbCc6IHRydWUsXG4gIH0sXG4gICd1cmUnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDcsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAndXJlJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ3VyZScsXG4gICAgJ3R5cGUnOiAzLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAndic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICd2JyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA2LFxuICAgICdwaG9uZW1lJzogJ3YnLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ3cnOiB7XG4gICAgJ0pvbGx5UGhvbmljcyc6IDUsXG4gICAgJ2dyYXBoZW1lJzoge1xuICAgICAgJ21haW4nOiAndycsXG4gICAgfSxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1BoYXNlcyc6IDMsXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNTZXRzJzogNixcbiAgICAncGhvbmVtZSc6ICd3JyxcbiAgICAndHlwZSc6IDEsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG4gICd5Jzoge1xuICAgICdKb2xseVBob25pY3MnOiA2LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3knLFxuICAgIH0sXG4gICAgJ2xldHRlcnNBbmRTb3VuZHNQaGFzZXMnOiAzLFxuICAgICdsZXR0ZXJzQW5kU291bmRzU2V0cyc6IDcsXG4gICAgJ3Bob25lbWUnOiAneScsXG4gICAgJ3R5cGUnOiAxLFxuICAgICd2b3dlbCc6IGZhbHNlLFxuICB9LFxuICAneic6IHtcbiAgICAnSm9sbHlQaG9uaWNzJzogNSxcbiAgICAnZ3JhcGhlbWUnOiB7XG4gICAgICAnbWFpbic6ICd6JyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ3onLFxuICAgICd0eXBlJzogMSxcbiAgICAndm93ZWwnOiBmYWxzZSxcbiAgfSxcbiAgJ3poJzoge1xuICAgICdKb2xseVBob25pY3MnOiA3LFxuICAgICdncmFwaGVtZSc6IHtcbiAgICAgICdtYWluJzogJ3poJyxcbiAgICB9LFxuICAgICdsZXR0ZXJzQW5kU291bmRzUGhhc2VzJzogMyxcbiAgICAnbGV0dGVyc0FuZFNvdW5kc1NldHMnOiA3LFxuICAgICdwaG9uZW1lJzogJ3poJyxcbiAgICAndHlwZSc6IDIsXG4gICAgJ3Zvd2VsJzogZmFsc2UsXG4gIH0sXG59O1xubW9kdWxlLmV4cG9ydHMgPSBwaG9uZW1lcztcbiJdfQ==
