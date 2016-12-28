const removeElements = require('./removeElements');
const userChoices = require('./userChoices');
const createPage = {
	tasks: ['Teach', 'Analyse'],
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
	addTasks: function() {
		this.tasks.forEach(function(task) {
			let link = document.createElement('button');
			let linkText = document.createTextNode(task);
			link.setAttribute('id', task.toLowerCase());
			link.addEventListener('click', function() {
				userChoices.enterApp(this.id);
			});
			link.appendChild(linkText);
			document.getElementsByClassName('content')[0].appendChild(link);
		});
	},

	addHeading: function() {
		let _self = this;
		let heading = document.createElement('h1');
		heading.setAttribute('id', 'heading');
		heading.addEventListener('click', function() {
			removeElements.removeContent();
			_self.addTasks();
			_self.setHeadingText('What to do?');
		});
		document.getElementsByClassName('header')[0].appendChild(heading);
		_self.setHeadingText('What to do?');
	},
};

module.exports = createPage;
