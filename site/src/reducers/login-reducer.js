import { LOGIN_IN_PENDING, LOGIN_IN_FAIL, LOGIN_IN_SUCCESS, EXIT_FROM_VERIFY, VERIFY_EMAIL_AGAIN_PENDING, VERIFY_EMAIL_AGAIN_SUCCESS } from "../actions/login-actions"

const initState = {
    wait: false,
    success: false,
    error: null
}

export default (state = initState, action) => {
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
        case EXIT_FROM_VERIFY: {
            return {
                ...state,
                error: null
            }
        }
        case VERIFY_EMAIL_AGAIN_PENDING: {
            return {
                ...state,
                wait: true
            }
        }
        case VERIFY_EMAIL_AGAIN_SUCCESS: {
            return {
                ...state,
                wait: false,
                error: null
            }
        }
        default: return state;
    }
}