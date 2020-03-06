import { UNLOGIN_SUCCESS, SET_DATA, FAIL_DATA, CHANGE_DATA_PENDING, CHANGE_DATA_SUCCESS, CHANGE_DATA_FAIL, GET_DATA_PENDING } from "../actions/user-actions";
import { CHANGED, IS_CHANGING, ERROR_CHANGING, WAITING, NOT_LOADED, LOADED, LOADED_ERROR, IS_LOADING } from "../constants";

const initState = {
    loggedIn: WAITING,
    username: "",
    email: "",
    loading: NOT_LOADED,
    changing: CHANGED,
    error: null
}

export default (state = initState, action) => {

    switch(action.type) {
        case UNLOGIN_SUCCESS: {
            return {
                ...state,
                loggedIn: false
            }
        }

        case GET_DATA_PENDING: {
            return {
                ...state,
                loading: IS_LOADING
            }
        }

        case SET_DATA: {
            const { username, email } = action;
            return {
                ...state,
                loggedIn: true,
                username,
                loading: LOADED,
                email
            }
        }
        case FAIL_DATA: {
            return {
                ...state,
                loading: LOADED,
                loggedIn: false
            }
        }

        case CHANGE_DATA_PENDING: {

            return {
                ...state,
                changing: IS_CHANGING
            }
        }

        case CHANGE_DATA_SUCCESS: {

            return {
                ...state,
                changing: CHANGED
            }
        }

        case CHANGE_DATA_FAIL: {
            const { error } = action;

            return {
                ...state,
                changing: ERROR_CHANGING,
                error
            }
        }
        

        default: return state;
    }
}