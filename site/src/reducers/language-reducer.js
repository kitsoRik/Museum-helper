import { CHANGE_LANGUAGE_SUCCESS } from "../actions/language-actions";

const initState = localStorage.getItem("language") || "en";

document.documentElement.lang = initState;
export default (state = initState, action) => {
	switch (action.type) {
		case CHANGE_LANGUAGE_SUCCESS: {
			const { language } = action;
			document.documentElement.lang = language;
			localStorage.setItem("language", language);
			return language;
		}
		default:
			return state;
	}
};
