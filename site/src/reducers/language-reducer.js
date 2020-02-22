import { CHANGE_LANGUAGE_SUCCESS } from "../actions/languageActions";

const initState = localStorage.getItem('language') || 'en';

const languageReducer = (state = initState, action) => {
    switch(action.type) {
        case CHANGE_LANGUAGE_SUCCESS: {
            const { language } = action;
            localStorage.setItem('language', language);
            return language;
        }
        default: return state;
    }
}

export default languageReducer;