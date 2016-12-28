const createPage = require('./createPage');
const removeElements = require('./removeElements');
const cards = require('./cards');
const userChoices = {
	enterApp: function(task) {
		removeElements.removeContent();
		switch (task) {
			case 'teach':
			createPage.setHeadingText(task);
			cards.cardDecks();
			break;
			case 'assess':
			createAssessmentCards();
			break;
			case 'Analyse':
			default:
		}
	},
};
module.exports = userChoices;
