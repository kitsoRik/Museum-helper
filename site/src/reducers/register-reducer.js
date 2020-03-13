import { WAITING, NOT_WAITING } from '../constants';
import { REGISTER_IN_PENDING, REGISTER_IN_SUCCESS, REGISTER_IN_ERROR, CLEAR_REGISTER } from '../actions/register-actions';

const initState = {
    waiting: NOT_WAITING,
    error: null,
    registered: false,
    verifyLink: "" // FIXIT
}

export default (state = initState, action) => {
    switch(action.type) {
        case REGISTER_IN_PENDING: {
            return {
                ...state,
                waiting: WAITING
            }
        }
        case REGISTER_IN_SUCCESS: {
            const { verifyLink } = action;
            return {
                ...state,
                error: null,
                registered: true,
                waiting: NOT_WAITING,
                verifyLink
            }
        }
        case REGISTER_IN_ERROR: {
            const { error } = action;
            return {
                ...state,
                waiting: NOT_WAITING,
                error
            }
        }
        case CLEAR_REGISTER: {
            return initState;
        }

        default: return state;
    }
};
