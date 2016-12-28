const removeElements = require('./removeElements');
const createPage = require('./createPage');
const cards = require('./cards');
const userChoices = require('./userChoices');

document.addEventListener('DOMContentLoaded', function() {
	'use strict';
	const tasks = ['Teach', 'Analyse'];
	document.body.onload =
	createPage.pageFrame();
	createPage.headerFrame();
	createPage.contentFrame();
	addHeading();
	addTasks();

	// if('serviceWorker' in navigator) {
	// 	navigator.serviceWorker
	// 	.register('sw.js')
	// 	.then(function() {
	// 		console.log('Service Worker Registered');
	// 	}).catch(function(err) {
	// 		console.log('Failed to register Service Worker');
	// 	});
	// }

	function addTasks() {
		tasks.forEach(function(task) {
			let link = document.createElement('button');
			let linkText = document.createTextNode(task);
			link.setAttribute('id', task.toLowerCase());
			link.addEventListener('click', function() {
				userChoices.enterApp(this.id);
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
});
