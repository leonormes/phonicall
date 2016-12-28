import {cards} from './cards';
import {createPage} from './createPage';
import {removeElements} from './removeElements';

const userChoices = {
	enterApp: function(task) {
		switch (task) {
			case 'teach':
			removeElements.removeContent();
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
export {userChoices};
