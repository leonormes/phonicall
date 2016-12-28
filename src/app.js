const removeElements = require('./removeElements');
const createPage = require('./createPage');
const cards = require('./cards');

document.addEventListener('DOMContentLoaded', function() {
	'use strict';
	document.body.onload =
	createPage.pageFrame();
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

	const tasks = ['Teach', 'Analyse'];

	function addTasks() {
		tasks.forEach(function(task) {
			let link = document.createElement('button');
			let linkText = document.createTextNode(task);
			link.setAttribute('id', task.toLowerCase());
			link.addEventListener('click', function() {
				enterApp(this.id);
			});
			link.appendChild(linkText);
			document.getElementsByClassName('content')[0].appendChild(link);
		});
	}

	function addHeading() {
		let heading = document.createElement('h1');
		heading.setAttribute('id', 'heading');
		heading.addEventListener('click', function() {
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
		let phoneme = document.createElement('div');
		let grapheme = document.createTextNode('a');
		phoneme.appendChild(grapheme);
		document.getElementsByClassName('content')[0].appendChild(phoneme);
	};
});
