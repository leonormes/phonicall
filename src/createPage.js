const removeElements = require('./removeElements');
const createPage = {
	pageFrame: function() {
		let outerDiv = document.createElement('div');
		outerDiv.setAttribute('class', 'container');
		document.body.appendChild(outerDiv);
	},

	headerFrame: function() {
		let headerDiv = document.createElement('div');
		headerDiv.setAttribute('class', 'header');
		document.getElementsByClassName('container')[0].appendChild(headerDiv);
	},

	contentFrame: function() {
		let contentDiv = document.createElement('div');
		contentDiv.setAttribute('class', 'content');
		document.getElementsByClassName('container')[0].appendChild(contentDiv);
	},

	setHeadingText: function(text) {
		removeElements.removeHeadingText();
		let parentDiv = document.getElementById('heading');
		let textNode = document.createTextNode(text);
		parentDiv.appendChild(textNode);
	},

	removeContent: function() {
	let children = document.getElementsByClassName('content');
	while (children[0].firstChild) {
		children[0].removeChild(children[0].firstChild);
	}
},
	removeHeadingText: function() {
		let headText = document.getElementById('heading');
		while (headText.firstChild) {
			headText.removeChild(headText.firstChild);
		}
	},
};

module.exports = createPage;
