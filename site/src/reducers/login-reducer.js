import { LOGIN_IN_PENDING, LOGIN_IN_FAIL, LOGIN_IN_SUCCESS } from "../actions/loginActions"

const initState = {
    wait: false,
    success: false,
    error: null
}

const loginReducer = (state = initState, action) => {
    switch(action.type) {
        case LOGIN_IN_PENDING: {
            return {
                ...state,
                wait: true,
                success: false,
                error: null
            };
        }
        case LOGIN_IN_SUCCESS: {
            return {
                ...state,
                success: true,
                wait: false,
                error: null
            };
        }
        case LOGIN_IN_FAIL: {
            const { error } = action;
            return {
                ...state,
                wait: false,
                success: false,
                error
            };
        }
        default: return state;
    }
}

export default loginReducer;