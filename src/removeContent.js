function removeContent() {
	let children = document.getElementsByClassName('content');
	while (children[0].firstChild) {
		children[0].removeChild(children[0].firstChild);
	}
}
module.exports = removeContent;
