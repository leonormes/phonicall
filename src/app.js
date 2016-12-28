import {createPage} from './createPage';

document.addEventListener('DOMContentLoaded', function() {
	'use strict';
	document.body.onload =
	createPage.pageFrame();
	createPage.headerFrame();
	createPage.contentFrame();
	createPage.addHeading();
	createPage.addTasks();

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
