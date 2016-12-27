const removeElements = {
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
module.exports = removeElements;
